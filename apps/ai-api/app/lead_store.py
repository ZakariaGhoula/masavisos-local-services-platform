import json
import os
from hashlib import sha256
import unicodedata
from difflib import SequenceMatcher
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock
from typing import Any

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb


DATA_DIR = Path(os.getenv("LEADS_DATA_DIR", "data"))
CLIENT_LEADS_PATH = DATA_DIR / "client_leads.jsonl"
PROFESSIONAL_LEADS_PATH = DATA_DIR / "professional_leads.jsonl"
UNHANDLED_REQUESTS_PATH = DATA_DIR / "unhandled_requests.jsonl"
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("NEON_DATABASE_URL")
PROFESSIONAL_EXPERIENCE_VALUES = {
    "Menos de 2 años",
    "2 a 5 años",
    "5 a 10 años",
    "Más de 10 años",
}
MATCH_SCORE = 30
# Stricter, to decide we don't offer a service ("jardinero" scores 73 vs "Carpintero").
COVERAGE_MATCH_SCORE = 80

store_lock = Lock()
schema_ready = False
mapping_cache: dict[str, list[dict[str, Any]]] = {}


def _connect():
    if not DATABASE_URL:
        return None

    return psycopg.connect(
        DATABASE_URL,
        row_factory=dict_row,
    )


def _ensure_schema(conn) -> None:
    global schema_ready

    if schema_ready:
        return

    with store_lock:
        if schema_ready:
            return

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS ai_client_leads (
                id TEXT PRIMARY KEY,
                phone TEXT NOT NULL,
                profession_id BIGINT REFERENCES public.professions(id),
                location_id BIGINT REFERENCES public.locations(id),
                specialty_needed TEXT,
                message_reason TEXT,
                location TEXT,
                raw_record JSONB NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """
        )
        conn.execute(
            """
            ALTER TABLE ai_client_leads
            ADD COLUMN IF NOT EXISTS profession_id
            BIGINT REFERENCES public.professions(id)
            """
        )
        conn.execute(
            """
            ALTER TABLE ai_client_leads
            ADD COLUMN IF NOT EXISTS location_id
            BIGINT REFERENCES public.locations(id)
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS ai_unhandled_requests (
                id TEXT PRIMARY KEY,
                phone TEXT NOT NULL,
                kind TEXT,
                reason TEXT NOT NULL,
                specialty TEXT,
                location TEXT,
                message TEXT NOT NULL,
                raw_record JSONB NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """
        )
        conn.commit()
        schema_ready = True


def _normalize(value: str | None) -> str:
    if not value:
        return ""

    normalized = unicodedata.normalize("NFKD", value.casefold())
    without_accents = "".join(
        char
        for char in normalized
        if not unicodedata.combining(char)
    )
    return " ".join(without_accents.split())


def _score_match(needle: str, candidate: str) -> int:
    if not needle or not candidate:
        return 0

    if needle == candidate:
        return 100

    if needle in candidate or candidate in needle:
        return 80 + min(len(needle), len(candidate))

    needle_words = set(needle.split())
    candidate_words = set(candidate.split())
    shared_words = needle_words & candidate_words

    if not shared_words:
        return int(SequenceMatcher(None, needle, candidate).ratio() * 100)

    return max(
        10 * len(shared_words),
        int(SequenceMatcher(None, needle, candidate).ratio() * 100),
    )


def _fetch_professions(conn) -> list[dict[str, Any]]:
    if "professions" not in mapping_cache:
        mapping_cache["professions"] = conn.execute(
            """
            SELECT
                id,
                name,
                display_name,
                group_name,
                sort_order,
                is_active
            FROM public.professions
            WHERE is_active = true
            ORDER BY sort_order, name
            """
        ).fetchall()

    return mapping_cache["professions"]


def _fetch_locations(conn) -> list[dict[str, Any]]:
    if "locations" not in mapping_cache:
        mapping_cache["locations"] = conn.execute(
            """
            SELECT
                id,
                name,
                display_name,
                group_name,
                sort_order,
                location_type,
                is_active
            FROM public.locations
            WHERE is_active = true
            AND location_type <> 'region'
            ORDER BY
                sort_order,
                name
            """
        ).fetchall()

    return mapping_cache["locations"]


def _best_match(rows: list[dict[str, Any]], value: str | None) -> tuple[int | None, int]:
    needle = _normalize(value)
    best_score = 0
    best_id = None

    for row in rows:
        score = max(
            _score_match(needle, _normalize(row.get(column)))
            for column in ("name", "display_name")
        )
        if score > best_score:
            best_score = score
            best_id = row["id"]

    return best_id, best_score


def _match_profession_id(conn, value: str | None) -> int | None:
    best_id, score = _best_match(_fetch_professions(conn), value)
    return best_id if score >= MATCH_SCORE else None


def _professional_specialties(record: dict[str, Any]) -> list[str]:
    values = []

    if record.get("professional_specialty"):
        values.append(record["professional_specialty"])

    for specialty in record.get("professional_specialties") or []:
        if specialty:
            values.append(specialty)

    deduped = []
    seen = set()
    for value in values:
        key = _normalize(value)
        if key and key not in seen:
            seen.add(key)
            deduped.append(value)

    return deduped


def _match_profession_ids(
    conn,
    record: dict[str, Any],
) -> list[int]:
    ids = []
    for specialty in _professional_specialties(record):
        profession_id = _match_profession_id(conn, specialty)
        if profession_id and profession_id not in ids:
            ids.append(profession_id)

    return ids


def _match_location_id(conn, value: str | None) -> int | None:
    best_id, score = _best_match(_fetch_locations(conn), value)
    return best_id if score >= MATCH_SCORE else None


def _has_professional(conn, profession_id: int, location_id: int) -> bool:
    # A professional covers the client if they work in the client's location,
    # a wider area containing it, or a part of it (when the client is vague).
    row = conn.execute(
        """
        WITH RECURSIVE ancestors AS (
            SELECT id, parent_id FROM public.locations WHERE id = %(location)s
            UNION
            SELECT l.id, l.parent_id
            FROM public.locations l
            JOIN ancestors a ON l.id = a.parent_id
        ),
        descendants AS (
            SELECT id FROM public.locations WHERE id = %(location)s
            UNION
            SELECT l.id
            FROM public.locations l
            JOIN descendants d ON l.parent_id = d.id
        )
        SELECT EXISTS (
            SELECT 1
            FROM public.professional_professions pp
            JOIN public.professional_locations pl
                ON pl.professional_id = pp.professional_id
            WHERE pp.profession_id = %(profession)s
            AND (
                pl.location_id IN (SELECT id FROM ancestors)
                OR pl.location_id IN (SELECT id FROM descendants)
            )
        ) AS covered
        """,
        {"profession": profession_id, "location": location_id},
    ).fetchone()
    return bool(row and row["covered"])


def find_coverage_gap(record: dict[str, Any]) -> str | None:
    """Return why we can't serve a client request, or None if we can (or can't tell)."""
    conn = _connect()
    if conn is None:
        return None

    with conn:
        profession_id, score = _best_match(
            _fetch_professions(conn),
            record.get("specialty_needed"),
        )
        if score < COVERAGE_MATCH_SCORE:
            return "no_profession"

        location_id, score = _best_match(
            _fetch_locations(conn),
            record.get("location"),
        )
        if score < COVERAGE_MATCH_SCORE:
            # e.g. a street, postcode or barrio we can't map; let the lead through.
            return None

        if not _has_professional(conn, profession_id, location_id):
            return "no_professional"

    return None


def _register_professional(
    conn,
    record: dict[str, Any],
    profession_ids: list[int],
    location_id: int | None,
) -> None:
    if not profession_ids:
        raise ValueError(
            "Could not map professional specialties to professions.id"
        )

    if location_id is None:
        raise ValueError(
            "Could not map professional service area to locations.id"
        )

    experience = record.get("professional_experience")
    if experience not in PROFESSIONAL_EXPERIENCE_VALUES:
        raise ValueError(
            "Professional experience must match register_professional values"
        )

    whatsapp = record.get("contact_phone") or record["phone"]
    name = (
        record.get("professional_name")
        or record.get("name")
        or f"Profesional WhatsApp {whatsapp}"
    )
    payload = {
        "nombre": name,
        "whatsapp": whatsapp,
        "profession_id": str(profession_ids[0]),
        "location_id": str(location_id),
        "experiencia": experience,
        "consent": True,
    }

    result = conn.execute(
        "SELECT public.register_professional(p_payload := %s) AS result",
        (Jsonb(payload),),
    ).fetchone()

    rpc_result = result["result"] if result else None
    if isinstance(rpc_result, dict) and rpc_result.get("saved") is True:
        notification = rpc_result.get("notification")
        saved_phone = (
            notification.get("whatsapp")
            if isinstance(notification, dict)
            else None
        )
        if saved_phone:
            conn.execute(
                """
                UPDATE public.professionals
                SET origin = %s
                WHERE whatsapp = %s
                """,
                ("ai whatsapp", saved_phone),
            )
            professional = conn.execute(
                """
                SELECT id
                FROM public.professionals
                WHERE whatsapp = %s
                """,
                (saved_phone,),
            ).fetchone()
            if professional:
                for profession_id in profession_ids[1:]:
                    conn.execute(
                        """
                        INSERT INTO public.professional_professions (
                            professional_id,
                            profession_id
                        )
                        VALUES (%s, %s)
                        ON CONFLICT DO NOTHING
                        """,
                        (professional["id"], profession_id),
                    )
        return

    if isinstance(rpc_result, dict) and rpc_result.get("error"):
        raise RuntimeError(rpc_result["error"])

    raise RuntimeError("register_professional did not confirm saved=true")


def _save_neon_lead(record: dict[str, Any]) -> str | None:
    conn = _connect()
    if conn is None:
        return None

    with conn:
        _ensure_schema(conn)

        if record["kind"] != "professional":
            profession_id = _match_profession_id(
                conn,
                record.get("specialty_needed"),
            )
            location_id = _match_location_id(
                conn,
                record.get("location"),
            )
            conn.execute(
                """
                INSERT INTO ai_client_leads (
                    id,
                    phone,
                    profession_id,
                    location_id,
                    specialty_needed,
                    message_reason,
                    location,
                    raw_record
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING
                """,
                (
                    record["id"],
                    record["phone"],
                    profession_id,
                    location_id,
                    record.get("specialty_needed"),
                    record.get("message_reason"),
                    record.get("location"),
                    Jsonb(record),
                ),
            )
            return "neon:ai_client_leads"

        profession_ids = _match_profession_ids(
            conn,
            record,
        )
        location_id = _match_location_id(
            conn,
            record.get("service_area"),
        )
        _register_professional(
            conn,
            record,
            profession_ids,
            location_id,
        )
        return "neon:professionals"


def save_lead(record: dict[str, Any]) -> str:
    kind = record.get("kind")
    if kind in {"client", "returning_client"}:
        path = CLIENT_LEADS_PATH
    elif kind == "professional":
        path = PROFESSIONAL_LEADS_PATH
    else:
        raise ValueError(f"Unsupported lead kind: {kind}")

    neon_path = _save_neon_lead(record)
    if neon_path:
        return neon_path

    payload = {
        **record,
        "saved_at": datetime.now(timezone.utc).isoformat(),
    }

    with store_lock:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as file:
            file.write(json.dumps(payload, ensure_ascii=False) + "\n")

    return str(path)


def save_unhandled_request(
    record: dict[str, Any],
    reason: str,
    message: str,
) -> str:
    specialty = record.get("specialty_needed") or record.get("professional_specialty")
    location = record.get("location") or record.get("service_area")
    raw = "|".join(
        value or ""
        for value in (record.get("phone"), reason, specialty, location, message)
    )
    request_id = sha256(raw.encode("utf-8")).hexdigest()

    conn = _connect()
    if conn is None:
        payload = {
            **record,
            "id": request_id,
            "reason": reason,
            "message": message,
            "saved_at": datetime.now(timezone.utc).isoformat(),
        }
        with store_lock:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            with UNHANDLED_REQUESTS_PATH.open("a", encoding="utf-8") as file:
                file.write(json.dumps(payload, ensure_ascii=False) + "\n")
        return str(UNHANDLED_REQUESTS_PATH)

    with conn:
        _ensure_schema(conn)
        conn.execute(
            """
            INSERT INTO ai_unhandled_requests (
                id,
                phone,
                kind,
                reason,
                specialty,
                location,
                message,
                raw_record
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (id) DO NOTHING
            """,
            (
                request_id,
                record["phone"],
                record.get("kind"),
                reason,
                specialty,
                location,
                message,
                Jsonb(record),
            ),
        )
    return "neon:ai_unhandled_requests"
