import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal — MasAvisos",
  description: "Aviso legal y condiciones de uso de MasAvisos, servicio operado por Palm Grove Ventures SL (CIF: B19956911).",
  alternates: { canonical: "https://masavisos.es/aviso-legal" },
  robots: { index: false, follow: true },
};

const pStyle: React.CSSProperties = { fontSize:"0.95rem", color:"rgba(245,243,238,0.55)", lineHeight:1.75, marginBottom:"1rem", fontWeight:300 };
const strongStyle: React.CSSProperties = { color:"rgba(245,243,238,0.85)", fontWeight:500 };

const sections = [
  {
    num: "01 — Titular del servicio",
    title: "Quién opera MasAvisos",
    content: (
      <>
        <p style={pStyle}>El sitio web <strong style={strongStyle}>masavisos.es</strong> y el servicio de conexión entre clientes y profesionales bajo la marca MasAvisos es operado por:</p>
        <table style={{ width:"100%", borderCollapse:"collapse", marginTop:"0.5rem" }}>
          <tbody>
            {[
              ["Razón social","Palm Grove Ventures SL"],
              ["CIF","B19956911"],
              ["Domicilio social","Madrid, España"],
              ["Actividad","Intermediación digital entre particulares y profesionales del hogar"],
              ["Contacto","hola@masavisos.es"],
              ["Canal principal","WhatsApp · +34 612 208 911"],
            ].map(([k,v]) => (
              <tr key={k} style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <td style={{ padding:"0.8rem 1.5rem 0.8rem 0", fontSize:"0.78rem", fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase", color:"rgba(245,243,238,0.3)", width:"38%", verticalAlign:"top", lineHeight:1.6 }}>{k}</td>
                <td style={{ padding:"0.8rem 0", fontSize:"0.9rem", color:"rgba(245,243,238,0.65)", verticalAlign:"top", lineHeight:1.6 }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    num: "02 — Naturaleza del servicio",
    title: "Qué es y qué no es MasAvisos",
    content: (
      <>
        <p style={pStyle}>MasAvisos es un <strong style={strongStyle}>servicio de intermediación y puesta en contacto</strong>. Su función consiste exclusivamente en recibir solicitudes de clientes particulares y ponerles en contacto con profesionales autónomos o empresas del sector del hogar y la reforma en Madrid.</p>
        <div style={{ background:"rgba(255,209,0,0.05)", border:"1px solid rgba(255,209,0,0.15)", borderLeft:"3px solid var(--yellow)", borderRadius:12, padding:"1.5rem 1.8rem", margin:"1.5rem 0" }}>
          <p style={{ ...pStyle, marginBottom:0, color:"rgba(245,243,238,0.7)" }}><strong style={strongStyle}>MasAvisos no es una empresa de servicios del hogar.</strong> No ejecuta, supervisa ni garantiza ningún trabajo o intervención. No es parte del contrato que pueda formalizarse entre el cliente y el profesional.</p>
        </div>
        <p style={pStyle}>La relación contractual por cualquier trabajo, presupuesto, intervención o reparación se establece <strong style={strongStyle}>directa y exclusivamente entre el cliente y el profesional</strong> que haya aceptado el encargo. Palm Grove Ventures SL es ajena a dicha relación.</p>
      </>
    ),
  },
  {
    num: "03 — Límites de responsabilidad",
    title: "Lo que MasAvisos no puede garantizar",
    content: (
      <>
        <p style={pStyle}>Palm Grove Ventures SL, como titular de MasAvisos, <strong style={strongStyle}>no asume responsabilidad alguna</strong> por los siguientes aspectos:</p>
        {[
          ["Calidad de los trabajos.", "La ejecución, calidad, plazo y resultado de cualquier servicio prestado por un profesional es responsabilidad exclusiva de dicho profesional. MasAvisos no supervisa, inspecciona ni garantiza el trabajo realizado."],
          ["Presupuestos y precios.", "Los precios, tarifas y condiciones económicas son acordados libremente entre el cliente y el profesional. MasAvisos no interviene en la negociación ni fija precios de referencia."],
          ["Daños derivados de la intervención.", "Cualquier daño material, personal o económico derivado de la actuación de un profesional contactado a través de MasAvisos es responsabilidad del profesional en cuestión, no de Palm Grove Ventures SL."],
          ["Disponibilidad del servicio.", "MasAvisos no garantiza tiempos de respuesta concretos ni la disponibilidad ininterrumpida del servicio de conexión."],
          ["Veracidad de la información.", "Los datos facilitados tanto por clientes como por profesionales son declarados bajo su propia responsabilidad. Palm Grove Ventures SL no verifica la totalidad de la información proporcionada."],
        ].map(([k,v]) => (
          <p key={k} style={pStyle}><strong style={strongStyle}>{k}</strong> {v}</p>
        ))}
      </>
    ),
  },
  {
    num: "04 — Profesionales en la plataforma",
    title: "Relación con los profesionales",
    content: (
      <>
        <p style={pStyle}>Los profesionales que participan en MasAvisos son <strong style={strongStyle}>autónomos o empresas independientes</strong>. No existe relación laboral, mercantil de subordinación ni de agencia entre Palm Grove Ventures SL y los profesionales incluidos en el servicio.</p>
        <p style={pStyle}>Palm Grove Ventures SL realiza un proceso básico de validación para incorporar profesionales, pero dicho proceso <strong style={strongStyle}>no constituye una certificación, habilitación profesional ni garantía de calidad</strong> en los términos previstos por ninguna normativa sectorial.</p>
        <p style={pStyle}>Cada profesional actúa bajo su propia responsabilidad civil y, cuando proceda, deberá contar con los seguros, licencias y habilitaciones exigidos por la normativa aplicable a su actividad.</p>
      </>
    ),
  },
  {
    num: "05 — Uso aceptable",
    title: "Condiciones de uso del servicio",
    content: (
      <>
        <p style={pStyle}>El uso de MasAvisos implica la aceptación de las presentes condiciones. El usuario se compromete a:</p>
        <p style={pStyle}><strong style={strongStyle}>Facilitar información veraz.</strong> Las solicitudes realizadas a través de WhatsApp deben corresponder a necesidades reales. El uso del servicio para fines fraudulentos, de acoso o contrarios a la legalidad vigente queda expresamente prohibido.</p>
        <p style={pStyle}><strong style={strongStyle}>Uso personal.</strong> El servicio está destinado a particulares que buscan profesionales para trabajos en su domicilio o inmuebles de los que son responsables.</p>
        <p style={pStyle}>Palm Grove Ventures SL se reserva el derecho de <strong style={strongStyle}>bloquear o excluir</strong> a cualquier usuario o profesional que haga un uso indebido del servicio, sin necesidad de justificación previa.</p>
      </>
    ),
  },
  {
    num: "06 — Protección de datos",
    title: "Tratamiento de datos personales",
    content: (
      <>
        <p style={pStyle}>Los datos personales facilitados a través del servicio (nombre, teléfono, descripción del trabajo, zona) son tratados por <strong style={strongStyle}>Palm Grove Ventures SL</strong> como responsable del tratamiento, con la finalidad de gestionar la conexión entre clientes y profesionales.</p>
        <p style={pStyle}>La base jurídica del tratamiento es la <strong style={strongStyle}>ejecución de la relación de servicio</strong> solicitada por el propio usuario. Los datos no son cedidos a terceros ajenos al servicio, salvo a los profesionales seleccionados para atender cada solicitud, lo cual es la finalidad inherente al servicio.</p>
        <p style={pStyle}>El usuario puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad dirigiéndose a <strong style={strongStyle}>hola@masavisos.es</strong>.</p>
      </>
    ),
  },
  {
    num: "07 — Propiedad intelectual",
    title: "Derechos sobre el contenido",
    content: (
      <p style={pStyle}>Todos los contenidos del sitio <strong style={strongStyle}>masavisos.es</strong> — incluyendo textos, diseño, marca, logotipos y código — son propiedad de Palm Grove Ventures SL o han sido licenciados para su uso. Queda prohibida su reproducción total o parcial sin autorización expresa por escrito.</p>
    ),
  },
  {
    num: "08 — Legislación aplicable",
    title: "Jurisdicción y ley aplicable",
    content: (
      <>
        <p style={pStyle}>El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada del uso del servicio, las partes se someten, con renuncia expresa a cualquier otro fuero, a los <strong style={strongStyle}>juzgados y tribunales de Madrid</strong>.</p>
        <p style={pStyle}>En caso de discrepancia entre versiones de este aviso en distintos idiomas, prevalecerá la versión en español.</p>
      </>
    ),
  },
];

export default function AvisoLegalPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{ padding:"9rem 2.5rem 4rem", maxWidth:860, margin:"0 auto", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--yellow)", marginBottom:"1rem" }}>Legal</p>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.2rem,5vw,3.5rem)", lineHeight:1.0, letterSpacing:"-0.03em", marginBottom:"1rem" }}>
          Aviso legal
        </h1>
        <p style={{ fontSize:"1rem", color:"rgba(245,243,238,0.45)", fontWeight:300, lineHeight:1.65, maxWidth:"52ch" }}>
          Información sobre el titular del servicio, condiciones de uso y límites de responsabilidad de MasAvisos.
        </p>
        <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap", marginTop:"2rem", paddingTop:"2rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          {[
            { label:"Titular", value:"Palm Grove Ventures SL" },
            { label:"Servicio", value:"MasAvisos · masavisos.es" },
            { label:"Última actualización", value:"Mayo 2026" },
          ].map(item => (
            <div key={item.label} style={{ display:"flex", flexDirection:"column", gap:"0.2rem" }}>
              <span style={{ fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(245,243,238,0.25)" }}>{item.label}</span>
              <span style={{ fontSize:"0.9rem", color:"rgba(245,243,238,0.6)" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"4rem 2.5rem 6rem" }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom:"3.5rem", paddingBottom:"3.5rem", borderBottom: i < sections.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,209,0,0.5)", marginBottom:"0.6rem" }}>
              {section.num}
            </p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.3rem", letterSpacing:"-0.01em", marginBottom:"1.2rem", color:"var(--white)" }}>
              {section.title}
            </h2>
            {section.content}
          </div>
        ))}
      </div>
    </>
  );
}
