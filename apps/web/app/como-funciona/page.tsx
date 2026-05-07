import type { Metadata } from "next";
import { clientWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cómo funciona — MasAvisos Madrid",
  description: "Descubre cómo MasAvisos conecta a clientes con profesionales del hogar en Madrid a través de WhatsApp. Rápido, simple y gratuito para el cliente.",
  alternates: { canonical: "https://masavisos.es/como-funciona" },
  openGraph: {
    title: "Cómo funciona MasAvisos — Profesionales por WhatsApp en Madrid",
    description: "Conectamos clientes con fontaneros, electricistas y otros profesionales del hogar en Madrid. Respuesta en minutos, sin formularios.",
    url: "https://masavisos.es/como-funciona",
  },
};

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const S = {
  sectionTag: { fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"var(--yellow)", marginBottom:"0.8rem" },
  h2: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-0.02em", lineHeight:1.05, marginBottom:"0.8rem" },
  sectionDesc: { fontSize:"1rem", color:"rgba(245,243,238,0.5)", maxWidth:"50ch", fontWeight:300, lineHeight:1.6, marginBottom:"3rem" } as React.CSSProperties,
  section: { padding:"6rem 2.5rem", maxWidth:1080, margin:"0 auto" } as React.CSSProperties,
};

const clientSteps = [
  { num:"01", title:"Escríbenos por WhatsApp", desc:"Cuéntanos qué necesitas: fontanero, electricista, cerrajero, reformas... No hace falta rellenar nada.", tag:"Gratis para ti", tagStyle:{ background:"rgba(37,211,102,0.1)", color:"#25D366" } },
  { num:"02", title:"Tres preguntas rápidas", desc:"¿Qué necesitas exactamente? ¿En qué barrio estás? ¿Es urgente o puede esperar? Nada más." },
  { num:"03", title:"Buscamos al profesional", desc:"Encontramos al más adecuado en tu zona según disponibilidad y tipo de trabajo.", tag:"Respuesta en minutos", tagStyle:{ background:"rgba(255,209,0,0.1)", color:"var(--yellow)" } },
  { num:"04", title:"El profesional te contacta", desc:"Te llama o escribe directamente para confirmar disponibilidad y darte un presupuesto. Sin intermediarios." },
];

const proSteps = [
  { num:"01", title:"Alta en 5 minutos", desc:"Registramos tu oficio, zona de trabajo y disponibilidad. Un solo proceso, una sola vez.", tag:"Gratis durante el lanzamiento", tagStyle:{ background:"rgba(37,211,102,0.1)", color:"#25D366" } },
  { num:"02", title:"Recibes el aviso por WhatsApp", desc:"Te enviamos los datos del cliente: qué necesita, dónde y cuándo. Con barrio, urgencia y descripción." },
  { num:"03", title:"Decides si lo aceptas", desc:"Tú tienes el control. Si el trabajo encaja, contactas al cliente directamente. Si no, no pasa nada." },
  { num:"04", title:"Trato directo con el cliente", desc:"La conversación es entre tú y él. Tú pones el precio. Nosotros no intervenimos.", tag:"Sin comisiones", tagStyle:{ background:"rgba(255,209,0,0.1)", color:"var(--yellow)" } },
];

const matchCards = [
  { icon:"📍", title:"Zona de trabajo", desc:"El profesional opera en el barrio o municipio donde está el cliente. Nada de desplazamientos inútiles." },
  { icon:"⚡", title:"Urgencia", desc:"Si es urgente, priorizamos a quienes pueden ir hoy. Si no, buscamos al más adecuado sin prisas." },
  { icon:"✔", title:"Disponibilidad real", desc:"Solo enviamos avisos a profesionales activos en ese momento, no a quien no puede atender." },
];

const faqs = [
  { q:"¿Es gratis para el cliente?", a:"Sí, completamente. El cliente no paga nada por ser conectado con un profesional. MasAvisos es y será siempre gratuito para quien busca ayuda." },
  { q:"¿Cuánto tarda en responder un profesional?", a:"La mayoría de solicitudes reciben respuesta en menos de 15 minutos durante el horario habitual. En urgencias nocturnas puede tardar algo más." },
  { q:"¿Quién me contacta, MasAvisos o el profesional?", a:"El profesional directamente. Nosotros hacemos la conexión, pero la conversación sobre el trabajo, precio y horario es entre tú y él." },
  { q:"¿Puedo elegir al profesional yo mismo?", a:"No funciona como un catálogo o marketplace. Nosotros buscamos por ti al más adecuado según tu necesidad, zona y urgencia. Esto garantiza rapidez y calidad." },
  { q:"¿Cuánto cuesta para los profesionales?", a:"Gratis durante el lanzamiento. Después del lanzamiento, habrá una cuota mensual reducida que comunicaremos con suficiente antelación y sin sorpresas." },
  { q:"¿En qué zonas de Madrid operáis?", a:"Madrid capital y los principales municipios de la Comunidad: Alcobendas, Pozuelo, Majadahonda, Las Rozas, Getafe, Leganés, Alcorcón, Torrejón y más." },
];

export default function ComoFuncionaPage() {
  const marqueeItems = ["Fontanero","Electricista","Cerrajero","Pintor","Reformas","Albañil","Carpintero","Aire acondicionado"];

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ padding:"9rem 2.5rem 5rem", position:"relative", overflow:"hidden" }}>
        <div aria-hidden="true" style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255,209,0,0.08) 0%, transparent 70%), radial-gradient(ellipse 35% 35% at 10% 85%, rgba(255,209,0,0.04) 0%, transparent 60%)" }} />
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div className="animate-fade-up" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--yellow)", border:"1px solid rgba(255,209,0,0.3)", padding:"0.4rem 1rem", borderRadius:"100px", marginBottom:"1.8rem", width:"fit-content" }}>
            <span style={{ width:6, height:6, background:"var(--yellow)", borderRadius:"50%", display:"inline-block" }} aria-hidden="true" />
            Transparente · Simple · Rápido
          </div>
          <h1 className="animate-fade-up-1" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.6rem,6vw,4.5rem)", lineHeight:1.0, letterSpacing:"-0.03em", maxWidth:"16ch" }}>
            Cómo <em style={{ fontStyle:"normal", color:"var(--yellow)" }}>conectamos</em> clientes y profesionales.
          </h1>
          <p className="animate-fade-up-2" style={{ fontSize:"clamp(1rem,2vw,1.1rem)", color:"rgba(245,243,238,0.5)", maxWidth:"52ch", marginTop:"1.2rem", fontWeight:300, lineHeight:1.65 }}>
            Sin anuncios, sin catálogos, sin perfiles. Solo WhatsApp y una respuesta en minutos.
          </p>
          <div className="animate-fade-up-3" style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginTop:"2.2rem" }}>
            <a href={clientWhatsAppUrl} target="_blank" rel="noopener noreferrer"
              style={{ background:"var(--yellow)", color:"var(--black)", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", padding:"1rem 2.2rem", borderRadius:"100px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.5rem", transition:"transform 0.2s, box-shadow 0.2s" }}
              className="btn-yellow-hover">
              {WA_ICON} Necesito un profesional
            </a>
            <a href="/pro" style={{ background:"transparent", color:"var(--white)", fontWeight:500, fontSize:"1rem", padding:"1rem 2.2rem", borderRadius:"100px", textDecoration:"none", display:"inline-flex", alignItems:"center", border:"1px solid rgba(255,255,255,0.15)", transition:"border-color 0.2s" }} className="btn-secondary-hover">
              Soy profesional →
            </a>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.07)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"1rem 0", background:"rgba(255,209,0,0.03)" }}>
        <div style={{ display:"flex", gap:"3rem", animation:"marquee 24s linear infinite", whiteSpace:"nowrap", width:"max-content" }}>
          {[...marqueeItems,...marqueeItems].map((item,i) => (
            <span key={i} style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(245,243,238,0.25)" }}>
              {item}<span style={{ color:"var(--yellow)", marginRight:"3rem" }}> ·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── AUDIENCE INTRO ── */}
      <div style={S.section}>
        <div style={S.sectionTag}>La plataforma</div>
        <h2 style={S.h2}>Un sistema pensado para los dos.</h2>
        <p style={S.sectionDesc}>MasAvisos conecta a quien necesita ayuda con quien puede dársela — de forma directa, sin intermediarios y sin apps nuevas que instalar.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", marginBottom:"3rem" }} className="audience-wrap">
          {[
            { labelClass:"client", label:"Para clientes", title:"Encuentra un profesional en minutos", desc:"Escríbenos por WhatsApp, cuéntanos qué necesitas, y te conectamos con el profesional adecuado en tu zona. Gratis, siempre." },
            { labelClass:"pro", label:"Para profesionales", title:"Recibe solicitudes reales sin buscarlas", desc:"Cuando hay un cliente que encaja con tu oficio y zona, te enviamos el aviso por WhatsApp. Tú decides si lo aceptas." },
          ].map(c => (
            <div key={c.label} className="step-card" style={{ background:"var(--black)", padding:"2.5rem 2rem" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"0.3rem 0.8rem", borderRadius:"100px", marginBottom:"1rem", background: c.labelClass==="client" ? "rgba(255,209,0,0.12)" : "rgba(37,211,102,0.12)", color: c.labelClass==="client" ? "var(--yellow)" : "#25D366" }}>
                {c.label}
              </span>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.2rem", marginBottom:"0.4rem" }}>{c.title}</h3>
              <p style={{ fontSize:"0.9rem", color:"rgba(245,243,238,0.5)", lineHeight:1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CLIENT STEPS ── */}
      <div style={{ background:"rgba(255,255,255,0.02)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={S.section}>
          <div style={S.sectionTag}>Para clientes</div>
          <h2 style={S.h2}>Cuatro pasos. Menos de dos minutos.</h2>
          <p style={S.sectionDesc}>Sin formularios, sin registros, sin esperas. Solo WhatsApp.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.5px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
            {clientSteps.map(step => (
              <div key={step.num} className="step-card" style={{ background:"var(--black)", padding:"2.5rem 2rem", transition:"background 0.3s", position:"relative" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"3.5rem", fontWeight:800, color:"rgba(255,209,0,0.12)", lineHeight:1, marginBottom:"1rem" }}>{step.num}</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", marginBottom:"0.5rem" }}>{step.title}</h3>
                <p style={{ fontSize:"0.88rem", color:"rgba(245,243,238,0.5)", lineHeight:1.55 }}>{step.desc}</p>
                {step.tag && <span style={{ display:"inline-block", marginTop:"1rem", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", padding:"0.25rem 0.75rem", borderRadius:"100px", ...step.tagStyle }}>{step.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRO STEPS ── */}
      <div style={S.section}>
        <div style={S.sectionTag}>Para profesionales</div>
        <h2 style={S.h2}>Recibe avisos. Decide si aceptas.</h2>
        <p style={S.sectionDesc}>Sin plataformas nuevas, sin perfiles públicos, sin comisiones. Solo WhatsApp.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1.5px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
          {proSteps.map(step => (
            <div key={step.num} className="step-card" style={{ background:"var(--black)", padding:"2.5rem 2rem", transition:"background 0.3s" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"3.5rem", fontWeight:800, color:"rgba(255,209,0,0.12)", lineHeight:1, marginBottom:"1rem" }}>{step.num}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", marginBottom:"0.5rem" }}>{step.title}</h3>
              <p style={{ fontSize:"0.88rem", color:"rgba(245,243,238,0.5)", lineHeight:1.55 }}>{step.desc}</p>
              {step.tag && <span style={{ display:"inline-block", marginTop:"1rem", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.07em", textTransform:"uppercase", padding:"0.25rem 0.75rem", borderRadius:"100px", ...step.tagStyle }}>{step.tag}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── MATCHING ── */}
      <div style={{ background:"rgba(255,255,255,0.02)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={S.section}>
          <div style={S.sectionTag}>Cómo seleccionamos</div>
          <h2 style={S.h2}>No contactamos a todos. Solo al adecuado.</h2>
          <p style={S.sectionDesc}>Elegimos entre 2 y 5 profesionales por solicitud para garantizar calidad tanto al cliente como al profesional.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.5rem" }}>
            {matchCards.map(card => (
              <div key={card.title} style={{ background:"var(--gray)", border:"1px solid rgba(255,255,255,0.07)", borderLeft:"3px solid var(--yellow)", borderRadius:12, padding:"2rem" }}
                className="match-card-hover">
                <div style={{ fontSize:"1.6rem", marginBottom:"0.8rem" }}>{card.icon}</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", marginBottom:"0.4rem" }}>{card.title}</h3>
                <p style={{ fontSize:"0.88rem", color:"rgba(245,243,238,0.5)", lineHeight:1.5 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={S.section}>
        <div style={S.sectionTag}>Preguntas frecuentes</div>
        <h2 style={S.h2}>Lo que más nos preguntan.</h2>
        <p style={S.sectionDesc}>Si tienes más dudas, escríbenos por WhatsApp y te respondemos en minutos.</p>
        <FaqList faqs={faqs} />
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ padding:"6rem 2.5rem" }}>
        <div style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }} className="cta-dual-wrap">
          {/* Client card — yellow highlight */}
          <div style={{ padding:"3rem 2.5rem", background:"var(--yellow)" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"0.3rem 0.8rem", borderRadius:"100px", marginBottom:"1.2rem", background:"rgba(255,209,0,0.12)", color:"var(--black)" }}>Para clientes</span>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.4rem", marginBottom:"0.5rem", color:"var(--black)" }}>Necesitas un profesional ahora.</h3>
            <p style={{ fontSize:"0.95rem", lineHeight:1.6, marginBottom:"2rem", color:"rgba(0,0,0,0.6)" }}>Escríbenos y te conectamos en minutos. Gratis, sin registro.</p>
            <a href={clientWhatsAppUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:"#25D366", color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", padding:"0.9rem 1.8rem", borderRadius:"100px", textDecoration:"none", transition:"transform 0.2s, box-shadow 0.2s" }}
              className="btn-wa-hover">
              {WA_ICON} Abrir WhatsApp
            </a>
          </div>
          {/* Pro card */}
          <div className="step-card" style={{ padding:"3rem 2.5rem", background:"var(--black)", transition:"background 0.3s" }}>
            <span style={{ display:"inline-flex", alignItems:"center", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"0.3rem 0.8rem", borderRadius:"100px", marginBottom:"1.2rem", background:"rgba(37,211,102,0.12)", color:"#25D366" }}>Para profesionales</span>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.4rem", marginBottom:"0.5rem" }}>Únete y recibe clientes.</h3>
            <p style={{ fontSize:"0.95rem", lineHeight:1.6, marginBottom:"2rem", color:"rgba(245,243,238,0.5)" }}>Alta gratuita. Sin apps. Sin comisiones. Solo WhatsApp y clientes reales en tu zona.</p>
            <a href="/pro#registro" style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:"var(--black)", color:"var(--yellow)", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", padding:"0.9rem 1.8rem", borderRadius:"100px", textDecoration:"none", border:"1px solid rgba(255,209,0,0.3)", transition:"opacity 0.2s" }} className="btn-dark-hover">
              Registrarme gratis →
            </a>
          </div>
        </div>
      </div>

      {/* WA Float */}
      <a href={clientWhatsAppUrl} target="_blank" rel="noopener noreferrer"
        style={{ position:"fixed", bottom:"1.8rem", right:"1.8rem", zIndex:999, display:"flex", alignItems:"center", gap:"0.65rem", background:"#25D366", color:"#fff", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.88rem", padding:"0.75rem 1.4rem 0.75rem 1rem", borderRadius:"100px", textDecoration:"none", boxShadow:"0 4px 24px rgba(37,211,102,0.45)", animation:"waPop 0.5s 1.5s ease both, waPulse 3s 4s ease-in-out infinite" }}>
        {WA_ICON} Hablar por WhatsApp
      </a>
    </>
  );
}

function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
      {faqs.map((faq, i) => <FaqItem key={i} faq={faq} />)}
    </div>
  );
}

// Server-compatible FAQ items using CSS only
function FaqItem({ faq }: { faq: { q: string; a: string } }) {
  return (
    <details style={{ background:"var(--black)" }} className="faq-details">
      <summary style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", padding:"1.8rem 2rem", cursor:"pointer", listStyle:"none" }}>
        {faq.q}
        <span style={{ color:"var(--yellow)", fontSize:"1.3rem", flexShrink:0, transition:"transform 0.2s" }} className="faq-icon">+</span>
      </summary>
      <div style={{ padding:"0 2rem 1.8rem", fontSize:"0.9rem", color:"rgba(245,243,238,0.5)", lineHeight:1.6 }}>{faq.a}</div>
    </details>
  );
}
