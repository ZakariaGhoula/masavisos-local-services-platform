import os
import json
import logging
import re
from dataclasses import dataclass
from hashlib import sha256
from threading import Lock
from typing import Any

from openai import OpenAI

from app.conversation_store import run_with_phone_context
from app.lead_store import (
    _normalize as normalize,
    find_coverage_gap,
    save_lead,
    save_unhandled_request,
)

logger = logging.getLogger(__name__)

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    timeout=30.0,
    max_retries=2,
)

MODEL_ID = os.getenv("OPENAI_MODEL", "gpt-5-nano")

saved_lead_ids = set()
saved_lead_ids_lock = Lock()

SYSTEM_PROMPT = """
# ROL Y IDENTIDAD
Eres el asistente virtual por WhatsApp de MasAvisos. Conectamos a usuarios con profesionales de reparaciones y servicios técnicos ÚNICAMENTE en la Comunidad de Madrid.

## ESTILO Y TONO
- Tono: Cercano, educado, natural y profesional (español de España, tratando de "tú").
- Formato: Mensajes MUY CORTOS (máximo una o dos frases breves). Realiza SOLO UNA PREGUNTA por mensaje.
- Eficiencia: Ve directo al grano. NO repitas ni confirmes los datos recibidos (Prohibido: "Entendido, fontanero en Madrid. ¿Qué necesitas?"). Pide directamente el siguiente dato pendiente.
- Variedad: NO uses muletillas repetitivas para iniciar cada mensaje (evita empezar siempre con "Perfecto", "De acuerdo" o "Entendido").

---

# FLUJO 1: CLIENTES (Buscan un servicio)

Obtén únicamente los siguientes 3 datos (uno a la vez, omitiendo los que el usuario ya haya mencionado):

1. Profesional / Servicio: Dedúcelo del problema (ej. "fuga" -> fontanero). Si no se puede deducir, pregunta: "¿Qué profesional necesitas?"
2. Detalle del problema: "¿Qué necesitas exactamente?" (Acepta cualquier respuesta simple sin pedir más detalles, marcas ni urgencias).
3. Ubicación: "¿En qué zona estás?" (Acepta barrio, ciudad, calle o código postal de la Comunidad de Madrid).

 Al completar los 3 datos, responde EXACTAMENTE:
"De acuerdo, envío tu aviso a 3 profesionales. Se pondrán en contacto contigo directamente."

### Clientes recurrentes (Ya recibieron la confirmación previamente):
- Si saludan o su mensaje es ambiguo: "¡Hola de nuevo! ¿Fue todo bien o necesitas que te busquemos otro profesional?"
- Si todo fue bien: "¡Nos alegramos mucho! Quedamos a tu disposición para cualquier otra ocasión. ¡Un saludo!"
- Si no le contactaron / necesita otro profesional para lo mismo: "Vaya, lo siento. Envío tu aviso a otros 3 profesionales para que te contacten lo antes posible."
- Si es un trabajo nuevo: Inicia el flujo normal de clientes.

---

# FLUJO 2: PROFESIONALES (Ofrecen sus servicios)

Identifica este rol si mencionan querer trabajar, recibir avisos o darse de alta (ej. "quiero avisos", "soy electricista", "busco trabajo", "ofrezco servicios").

Obtén los siguientes 5 datos en este orden estricto (omitiendo los que ya hayan proporcionado):

1. Especialidad: "¿Cuál es tu especialidad?"
2. Nombre: "¿Cuál es tu nombre?"
3. Zonas de cobertura: "¿En qué zonas de Madrid trabajas?"
4. Teléfono: "¿Cuál es tu teléfono de contacto?"
5. Experiencia: "¿Cuántos años de experiencia tienes: menos de 2, de 2 a 5, de 5 a 10 o más de 10?"

 Al completar los 5 datos, responde EXACTAMENTE:
"Perfecto, te añadimos a nuestro sistema. En cuanto tengamos nuevos avisos de tu especialidad en tu zona, te contactaremos directamente."

---

# REGLAS Y RESTRICCIONES (GUARDRAILS)

1. Fuera de Cobertura (Fuera de la Comunidad de Madrid):
   - Primera detección: "Lo sentimos, de momento solo trabajamos en la Comunidad de Madrid."
   - Si el usuario insiste: Escucha el mensaje, responde brevemente aclarando que no operamos allí y no vuelvas a pedir datos.

2. Consultas de Precios, Presupuestos y Garantías:
   - NO des presupuestos, precios, plazos ni estimaciones.
   - Responde: "Nosotros no gestionamos los precios: el presupuesto y los detalles los acordáis directamente tú y el profesional." A continuación, retoma la pregunta pendiente del flujo.

3. Dudas e Información General:
   - Responde de forma concisa sobre cómo funciona el servicio y retoma inmediatamente el dato pendiente por pedir.

4. Mensajes iniciales o ambiguos:
   - Si el usuario saluda o pide información sin aclarar si es cliente o profesional, responde adaptándote a su saludo: "Hola [o Buenos días], gracias por tu mensaje. ¿En qué podemos ayudarte?"

---

# EJEMPLOS DE CONVERSACIÓN

Ejemplo 1 (Cliente con datos parciales):
Usuario: "Tengo una fuga"
Asistente: "¿En qué zona estás?"
Usuario: "Getafe"
Asistente: "De acuerdo, envío tu aviso a 3 profesionales. Se pondrán en contacto contigo directamente."

Ejemplo 2 (Cliente especificando ubicación):
Usuario: "Necesito un electricista en Móstoles"
Asistente: "¿Qué necesitas exactamente?"
Usuario: "Arreglar un enchufe"
Asistente: "De acuerdo, envío tu aviso a 3 profesionales. Se pondrán en contacto contigo directamente."

Ejemplo 3 (Fuera de cobertura):
Usuario: "Necesito un fontanero en Córdoba"
Asistente: "Lo sentimos, de momento solo trabajamos en la Comunidad de Madrid."
Usuario: "Vaya, ¿y no vais a ir allí?"
Asistente: "De momento no, lo siento. Si alguna vez necesitas algo en la Comunidad de Madrid, aquí estamos."

Ejemplo 4 (Registro de Profesional):
Usuario: "Hola, soy fontanero, ¿cómo puedo recibir avisos?"
Asistente: "¡Hola! ¿Cuál es tu nombre?"
Usuario: "Javier García"
Asistente: "¿En qué zonas de Madrid trabajas?"
"""

STRUCTURED_OUTPUT_PROMPT = """
Además de responder al usuario, genera datos internos estructurados para guardar avisos y gestiones de seguimiento.

Devuelve SIEMPRE un JSON con:
- response: texto exacto que se enviará por WhatsApp al usuario.
- record: datos internos extraídos de toda la conversación.

Reglas para record:
- kind debe ser "client", "returning_client", "professional" o "unknown".

- complete solo debe ser true cuando el flujo actual ha finalizado (ej. el aviso de un cliente nuevo ha sido tramitado, la consulta del cliente recurrente queda resuelta/re-enviada, o el alta del profesional está confirmada).

- Para clientes nuevos (kind="client"), rellena phone, specialty_needed (dedúcelo del problema si es evidente), message_reason (el problema o trabajo a realizar) y location. Si alguien describe un problema o pide un servicio, es kind="client". Si quiere recibir avisos, darse de alta o trabajar con nosotros, es kind="professional" (nunca "unknown" ni "client").

- location y service_area: SOLO lo que el usuario haya escrito. Nunca inventes ni supongas una zona.

- Para clientes recurrentes (kind="returning_client"), rellena phone, specialty_needed, location, e indica en message_reason el estado del reenganche (ej. "checking_status", "resolved", "needs_new_pros", "new_request"). Si solo estás preguntando si fue todo bien o necesita otro profesional, usa complete=false y re_sent=false. Marca re_sent=true solo si se tramitó un reenvío a nuevos profesionales.

- Para profesionales (kind="professional"), rellena phone, professional_name, professional_specialty, professional_specialties, service_area, contact_phone y professional_experience. Usa message_reason para explicar que quiere registrarse/recibir avisos. La zona de trabajo del profesional va en service_area; deja location en null.

- Si el profesional menciona varias especialidades, ponlas todas en professional_specialties (array de strings) y usa professional_specialty para la primera/principal.

- professional_experience debe ser exactamente uno de estos valores si se puede inferir: "Menos de 2 años", "2 a 5 años", "5 a 10 años" o "Más de 10 años". Si no se ha indicado aún, usa null.

- Para profesionales, complete solo puede ser true si professional_specialty, professional_name, service_area, contact_phone y professional_experience están completos.

- Si alguien dice que es profesional pero todavía no indica especialidad/oficio, usa kind="professional", professional_specialty=null, professional_specialties=[] y complete=false.

- Si falta un dato necesario para completar la solicitud actual, usa null y complete=false.

- out_of_area debe ser true si la última ubicación o zona indicada está fuera de la Comunidad de Madrid; en ese caso deja location y service_area en null y complete=false. En cualquier otro caso, false.

- No inventes datos. Usa solo lo que aparece en la conversación o en el contexto del sistema.
"""

AI_OUTPUT_SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "required": ["response", "record"],
    "properties": {
        "response": {
            "type": "string",
        },
        "record": {
            "type": "object",
            "additionalProperties": False,
            "required": [
                "kind",
                "complete",
                "phone",
                "specialty_needed",
                "message_reason",
                "location",
                "re_sent",
                "professional_name",
                "professional_specialty",
                "professional_specialties",
                "service_area",
                "contact_phone",
                "professional_experience",
                "out_of_area",
            ],
            "properties": {
                "kind": {
                    "type": "string",
                    "enum": ["client", "returning_client", "professional", "unknown"],
                },
                "complete": {
                    "type": "boolean",
                },
                "phone": {
                    "type": ["string", "null"],
                },
                "specialty_needed": {
                    "type": ["string", "null"],
                },
                "message_reason": {
                    "type": ["string", "null"],
                },
                "location": {
                    "type": ["string", "null"],
                },
                "re_sent": {
                    "type": ["boolean", "null"],
                },
                "professional_name": {
                    "type": ["string", "null"],
                },
                "professional_specialty": {
                    "type": ["string", "null"],
                },
                "professional_specialties": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "service_area": {
                    "type": ["string", "null"],
                },
                "contact_phone": {
                    "type": ["string", "null"],
                },
                "professional_experience": {
                    "type": ["string", "null"],
                    "enum": ["Menos de 2 años", "2 a 5 años", "5 a 10 años", "Más de 10 años", None]
                },
                "out_of_area": {
                    "type": "boolean",
                },
            },
        },
    },
}


@dataclass(frozen=True)
class AIResult:
    response: str
    record: dict[str, Any] | None = None
    saved_path: str | None = None


@dataclass(frozen=True)
class AICompletion:
    response: str
    user_content: str
    record: dict[str, Any]
    # Set only the first time, so repeated messages don't create duplicates.
    new_unhandled_reason: str | None = None


EMPTY_VALUES = (None, "", [])
# Polite replies for requests we can't serve; these get stored in ai_unhandled_requests.
UNHANDLED_MESSAGES = {
    "out_of_area": (
        "Lo sentimos, de momento solo trabajamos en la Comunidad de Madrid."
    ),
    "no_profession": (
        "Lo sentimos, de momento no ofrecemos este servicio. "
        "Hemos guardado tu solicitud y te escribiremos si lo incorporamos."
    ),
    "no_professional": (
        "Lo sentimos, ahora mismo no tenemos profesionales disponibles para "
        "este servicio en tu zona. Hemos guardado tu solicitud y te "
        "escribiremos en cuanto tengamos uno."
    ),
}
# Asked one at a time, in this order. Same wording as the prompt.
QUESTIONS = {
    "client": {
        "specialty_needed": "¿Qué profesional necesitas?",
        "message_reason": "¿Qué necesitas exactamente?",
        "location": "¿En qué zona estás?",
    },
    "professional": {
        "professional_specialty": "¿Cuál es tu especialidad?",
        "professional_name": "¿Cuál es tu nombre?",
        "service_area": "¿En qué zonas de Madrid trabajas?",
        "contact_phone": "¿Cuál es tu teléfono de contacto?",
        "professional_experience": (
            "¿Cuántos años de experiencia tienes: "
            "menos de 2, de 2 a 5, de 5 a 10 o más de 10?"
        ),
    },
}
CONFIRMATIONS = {
    "client": (
        "De acuerdo, envío tu aviso a 3 profesionales. "
        "Se pondrán en contacto contigo directamente."
    ),
    "professional": (
        "Perfecto, te añadimos a nuestro sistema. En cuanto tengamos nuevos "
        "avisos de tu especialidad en tu zona, te contactaremos directamente."
    ),
}


def _lead_id(record: dict[str, Any]) -> str:
    values = [
        record.get("kind"),
        record.get("phone"),
        record.get("specialty_needed"),
        record.get("professional_name"),
        record.get("professional_specialty"),
        ",".join(record.get("professional_specialties") or []),
        record.get("message_reason"),
        record.get("location"),
        record.get("service_area"),
        record.get("contact_phone"),
        record.get("professional_experience"),
    ]
    raw = "|".join(value or "" for value in values)
    return sha256(raw.encode("utf-8")).hexdigest()


def _should_save(record: dict[str, Any]) -> bool:
    if record.get("unhandled_reason"):
        return False

    kind = record.get("kind")
    if kind == "returning_client":
        # Re-sending the request to 3 new professionals is a new lead.
        return bool(record.get("re_sent"))
    if kind in {"client", "professional"}:
        return bool(record.get("complete"))
    return False


def _save_completed_lead(record: dict[str, Any]) -> str | None:
    if not _should_save(record):
        return None

    lead_id = _lead_id(record)

    with saved_lead_ids_lock:
        if lead_id in saved_lead_ids:
            return None
        saved_lead_ids.add(lead_id)

    try:
        path = save_lead({**record, "id": lead_id})
    except Exception:
        # Allow a retry on the next message instead of silently dropping the lead.
        with saved_lead_ids_lock:
            saved_lead_ids.discard(lead_id)
        raise

    return str(path)


def _merge_record(
    previous: dict[str, Any] | None,
    record: dict[str, Any],
) -> dict[str, Any]:
    """Carry forward data the model forgot to repeat this turn."""
    if not previous:
        return record

    # A finished client request shouldn't leak into the next one;
    # a registered professional keeps their profile.
    if previous.get("complete") and previous.get("kind") != "professional":
        return record

    kind = record.get("kind")
    if kind == "unknown":
        kind = previous.get("kind")
    if kind != previous.get("kind"):
        return record

    merged = {**record, "kind": kind}
    for key, value in previous.items():
        if merged.get(key) in EMPTY_VALUES:
            merged[key] = value
    return merged


def _next_field(record: dict[str, Any] | None) -> str | None:
    questions = QUESTIONS.get((record or {}).get("kind"), {})
    return next((field for field in questions if not record.get(field)), None)


def _mentioned(value: str, message: str) -> bool:
    text = normalize(message)
    return bool(re.search(r"\d{5}", message)) or any(
        len(word) >= 4 and word in text
        for word in normalize(value).split()
    )


# Clear signs that someone wants to receive jobs, not hire someone.
PROFESSIONAL_INTENT = re.compile(
    r"recibir (?:los )?avisos|(?:darme|dar|darse) de alta|registrarme|apuntarme"
    r"|trabajar con vosotros|busco trabajo|ofrezco mis servicios"
    r"|soy (?:profesional|autonomo|tecnico)|me dedico a|trabajo como"
)


def _detect_professional(record: dict[str, Any], message: str) -> dict[str, Any]:
    """Don't let the model treat "quiero recibir avisos" as unknown or a client."""
    is_undecided = record.get("kind") == "unknown" or (
        record.get("kind") == "client" and not record.get("specialty_needed")
    )
    if is_undecided and PROFESSIONAL_INTENT.search(normalize(message)):
        return {**record, "kind": "professional", "message_reason": "quiere recibir avisos"}
    return record


def _drop_invented_places(
    previous: dict[str, Any] | None,
    record: dict[str, Any],
    message: str,
) -> dict[str, Any]:
    """The model sometimes makes up a zone ("Tengo una fuga" -> "Madrid Centro")."""
    record = dict(record)
    for field in ("location", "service_area"):
        value = record.get(field)
        if value and value != (previous or {}).get(field) and not _mentioned(value, message):
            record[field] = None
    return record


def _fill_pending_answer(
    previous: dict[str, Any] | None,
    record: dict[str, Any],
    message: str,
) -> dict[str, Any]:
    """The user is answering the question we asked last; use the reply as-is
    if the model failed to extract it (e.g. "trabajo en todo Madrid")."""
    field = _next_field(previous)
    if (
        not field
        or record.get("kind") != previous.get("kind")
        or record.get(field)
        # A question back ("¿cuánto cuesta?") is not an answer.
        or message.strip().endswith("?")
        or _asks_price(message)
    ):
        return record

    if field == "contact_phone":
        digits = re.sub(r"[^\d+]", "", message)
        return {**record, field: digits} if len(digits) >= 9 else record
    if field == "professional_experience":
        return record  # Must be one of the enum values; leave it to the model.
    if field == "professional_name":
        message = re.sub(
            r"^\s*(?:me llamo|soy|mi nombre es)\s+",
            "",
            message,
            flags=re.IGNORECASE,
        )
    return {**record, field: message.strip(" .!") or None}


def _finalize_record(record: dict[str, Any]) -> dict[str, Any]:
    """Normalize the record and don't trust the model's `complete` flag on its own."""
    record = dict(record)

    if record.get("kind") == "unknown" and record.get("specialty_needed"):
        record["kind"] = "client"

    if record.get("out_of_area"):
        # Never keep (or save a lead with) a location outside the Comunidad de Madrid.
        record["location"] = record["service_area"] = None

    if record.get("kind") == "professional":
        # A professional's work area belongs in service_area, not location.
        if record.get("location") and not record.get("service_area"):
            record["service_area"], record["location"] = record["location"], None

        specialties = list(dict.fromkeys(
            specialty.strip()
            for specialty in [
                record.get("professional_specialty"),
                *(record.get("professional_specialties") or []),
            ]
            if specialty and specialty.strip()
        ))
        record["professional_specialty"] = specialties[0] if specialties else None
        record["professional_specialties"] = specialties

    if record.get("kind") in QUESTIONS:
        record["complete"] = _next_field(record) is None
    return record


def _unhandled_reason(record: dict[str, Any]) -> str | None:
    if record.get("out_of_area"):
        return "out_of_area"

    # Only check once the client request is ready to be sent to professionals.
    # (Ignore a reason carried over from the previous turn.)
    record = {**record, "unhandled_reason": None}
    if record.get("kind") == "professional" or not _should_save(record):
        return None

    try:
        return find_coverage_gap(record)
    except Exception:
        logger.exception("Coverage check failed; sending the lead anyway")
        return None


def _greeting(message: str) -> str:
    """Mirror "Buenos días" / "Buenas tardes"; default to "Hola"."""
    text = normalize(message)
    for prefix, greeting in (
        ("buenos dias", "Buenos días"),
        ("buenas tardes", "Buenas tardes"),
        ("buenas noches", "Buenas noches"),
        ("buenas", "Buenas"),
    ):
        if text.startswith(prefix):
            return greeting
    return "Hola"


GREETING_SUFFIX = ", gracias por tu mensaje."
PRICE_MESSAGE = (
    "Nosotros no gestionamos los precios: el presupuesto y los detalles "
    "los acordáis directamente tú y el profesional."
)
PRICE_QUESTION = re.compile(
    r"precio|presupuesto|tarifa|coste|cuanto (?:cuesta|vale|cobr|sale|seria)"
    r"|cobrais|cobran|es caro|es gratis"
)


def _asks_price(message: str) -> bool:
    return bool(PRICE_QUESTION.search(normalize(message)))


def _scripted_answer(
    previous: dict[str, Any] | None,
    record: dict[str, Any],
    message: str,
    is_first_reply: bool,
) -> str | None:
    """Fixed wording for the flow steps; None lets the model answer freely."""
    answer = _flow_answer(previous, record, message, is_first_reply)

    # Clients asking about price: we don't handle it; then carry on with the flow.
    if (
        _asks_price(message)
        and record["kind"] != "professional"
        and not record["unhandled_reason"]
    ):
        field = _next_field(record)
        if answer is None and field:
            answer = QUESTIONS[record["kind"]][field]
        if answer is None and record["kind"] == "unknown":
            answer = "¿En qué podemos ayudarte?"
        # Keep "Hola, gracias por tu mensaje." first.
        greeting, _, rest = (answer or "").rpartition(GREETING_SUFFIX)
        return " ".join(filter(None, [greeting + _, PRICE_MESSAGE, rest.strip()]))

    return answer


def _flow_answer(
    previous: dict[str, Any] | None,
    record: dict[str, Any],
    message: str,
    is_first_reply: bool,
) -> str | None:
    previous = previous or {}
    greeting = _greeting(message)

    # We don't know yet if it's a client or a professional (or what they need).
    undecided = record["kind"] == "unknown" or (
        record["kind"] == "client"
        and not record.get("specialty_needed")
        and not record.get("message_reason")
    )
    if undecided:
        if is_first_reply and "?" not in message:
            return f"{greeting}{GREETING_SUFFIX} ¿En qué podemos ayudarte?"
        return None

    reason = record["unhandled_reason"]
    field = _next_field(record)
    question = QUESTIONS[record["kind"]][field] if field else None

    if reason:
        if previous.get("unhandled_reason") == reason:
            # Already told them; let the model listen instead of looping.
            return None
        if record["kind"] == "professional" and question:
            # They may also work in Madrid; ask for a zone here.
            return f"{UNHANDLED_MESSAGES[reason]} {question}"
        return UNHANDLED_MESSAGES[reason]

    if question:
        if field == _next_field(previous) and previous.get("kind") == record["kind"]:
            # They didn't answer our last question; let the model reply to
            # what they said (it re-asks the question itself).
            return None
        return f"{greeting}{GREETING_SUFFIX} {question}" if is_first_reply else question

    if record.get("complete") and (
        not previous.get("complete") or _lead_id(previous) != _lead_id(record)
    ):
        return CONFIRMATIONS.get(record["kind"])

    return None


def _state_message(record: dict[str, Any] | None) -> list[dict[str, str]]:
    if not record:
        return []
    return [
        {
            "role": "developer",
            "content": (
                "Datos ya recogidos de este usuario. Consérvalos en record "
                "salvo que el usuario los corrija:\n"
                + json.dumps(record, ensure_ascii=False)
            ),
        }
    ]


def generate_ai_result(phone: str, message: str) -> AIResult:
    user_content = f"phone={phone}\nmessage={message}"

    def complete(
        previous_messages: list[dict[str, str]],
        previous_record: dict[str, Any] | None,
    ) -> AICompletion:
        response = client.responses.create(
            model=MODEL_ID,
            instructions=SYSTEM_PROMPT + "\n\n" + STRUCTURED_OUTPUT_PROMPT,
            input=[
                *previous_messages,
                *_state_message(previous_record),
                {"role": "user", "content": user_content},
            ],
            reasoning={
                "effort": "minimal",
            },
            # Reasoning tokens count towards this limit; 600 could cut the JSON off.
            max_output_tokens=1500,
            text={
                "format": {
                    "type": "json_schema",
                    "name": "masavisos_ai_output",
                    "strict": True,
                    "schema": AI_OUTPUT_SCHEMA,
                }
            },
            store=False,
        )

        if response.status == "incomplete":
            reason = getattr(response.incomplete_details, "reason", None)
            raise RuntimeError(f"Incomplete AI response: {reason}")
        if not response.output_text:
            raise RuntimeError("Empty AI output (possibly a refusal)")

        output = json.loads(response.output_text)
        answer = output["response"].strip()
        if not answer:
            raise RuntimeError("Empty AI response")

        # The sender's WhatsApp number is known; don't rely on the model for it.
        record = {**output["record"], "phone": phone}
        record = _detect_professional(record, message)
        record = _drop_invented_places(previous_record, record, message)
        record = _merge_record(previous_record, record)
        record = _fill_pending_answer(previous_record, record, message)
        record = _finalize_record(record)
        record["unhandled_reason"] = _unhandled_reason(record)

        is_first_reply = not any(
            msg.get("role") == "assistant" for msg in previous_messages
        )
        answer = _scripted_answer(previous_record, record, message, is_first_reply) or answer

        reason = record["unhandled_reason"]
        is_new_reason = reason != (previous_record or {}).get("unhandled_reason")
        return AICompletion(
            response=answer,
            user_content=user_content,
            record=record,
            new_unhandled_reason=reason if is_new_reason else None,
        )

    completion = run_with_phone_context(phone, complete)

    reason = completion.new_unhandled_reason
    if reason:
        try:
            save_unhandled_request(completion.record, reason, message)
        except Exception:
            # The polite reply matters more than the bookkeeping.
            logger.exception("Failed to save unhandled request")

    return AIResult(
        response=completion.response,
        record=completion.record,
        saved_path=_save_completed_lead(completion.record),
    )


def generate_response(phone: str, message: str) -> str:
    return generate_ai_result(phone, message).response
