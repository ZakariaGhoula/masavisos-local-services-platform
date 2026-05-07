import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceCard from "@/components/ServiceCard";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/services";
import { organizationJsonLd } from "@/lib/seo";
import { clientWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "MasAvisos — Encuentra un profesional en Madrid",
  description: "Encuentra un fontanero, electricista, cerrajero o reformista en Madrid. Escríbenos por WhatsApp y te conectamos con un profesional disponible.",
  alternates: { canonical: "https://masavisos.es" },
};

const homeFaqs = [
  { q: "¿Cuánto cuesta usar MasAvisos?", a: "Para los clientes es completamente gratuito. Sin registro, sin comisiones. Solo WhatsApp." },
  { q: "¿En qué zonas de Madrid operáis?", a: "Empezamos en Madrid capital y nos expandimos por la Comunidad de Madrid: Alcorcón, Getafe, Leganés, Móstoles, Fuenlabrada y más." },
  { q: "¿Cuánto tarda en llegar un profesional?", a: "Para urgencias, menos de 60 minutos en Madrid capital. Para trabajos programados, el profesional te confirma hora." },
  { q: "¿Son profesionales de confianza?", a: "Trabajamos con profesionales verificados. Si algo no va bien, te ayudamos a resolverlo." },
  { q: "¿Qué servicios cubre MasAvisos?", a: "Fontanería, electricidad, cerrajería, pintura y reformas. Próximamente más servicios." },
];

const marqueeItems = [
  "Fontanero urgente", "Electricista Madrid", "Cerrajero 24h", "Reformas baño",
  "Pintor Madrid", "Fuga de agua", "Aire acondicionado", "Avería eléctrica",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* ── HERO ── */}
      <div className="hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "8rem 2.5rem 5rem", position: "relative", overflow: "hidden",
      }}>
        {/* Hero background glow */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 70% 60% at 65% 35%, rgba(255,209,0,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(255,209,0,0.05) 0%, transparent 60%)
          `,
        }} />

        <div style={{
          maxWidth: 1080, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "5rem", alignItems: "center",
        }} className="hero-inner">

          {/* Left */}
          <div>
            {/* Badge */}
            <div className="animate-fade-up" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--yellow)", border: "1px solid rgba(255,209,0,0.3)",
              padding: "0.4rem 1rem", borderRadius: "100px", marginBottom: "2rem", width: "fit-content",
            }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, background: "var(--yellow)", borderRadius: "50%", display: "inline-block" }} aria-hidden="true" />
              Madrid · Respuesta rápida por WhatsApp
            </div>

            <h1 className="animate-fade-up-1" style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em",
            }}>
              ¿Necesitas un profesional en Madrid?
            </h1>

            <p className="animate-fade-up-2" style={{
              fontSize: "clamp(1rem,2vw,1.15rem)", color: "rgba(245,243,238,0.55)",
              maxWidth: "48ch", marginTop: "1.5rem", fontWeight: 300, lineHeight: 1.65,
            }}>
              Escríbenos por WhatsApp y te conectamos con un fontanero, electricista, cerrajero o reformista disponible cerca de ti.
            </p>

            <div className="animate-fade-up-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
              <WhatsAppButton label="Hablar por WhatsApp" variant="primary" className="pulse-wa" />
              <a href="#como-funciona" style={{
                background: "transparent", color: "var(--white)", fontWeight: 500, fontSize: "1rem",
                padding: "1rem 2.2rem", borderRadius: "100px", textDecoration: "none",
                display: "inline-flex", alignItems: "center",
                border: "1px solid rgba(255,255,255,0.15)", transition: "border-color 0.2s, background 0.2s",
              }} className="btn-secondary-hover">
                Ver cómo funciona
              </a>
            </div>

            <div className="animate-fade-up-4" style={{
              display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center",
              marginTop: "1.8rem", fontSize: "0.85rem", color: "rgba(245,243,238,0.4)",
            }}>
              <span>Gratis para el cliente</span>
              <span style={{ color: "rgba(255,209,0,0.4)" }}>·</span>
              <span>32 profesionales activos</span>
              <span style={{ color: "rgba(255,209,0,0.4)" }}>·</span>
              <span>Sin formularios</span>
            </div>
          </div>

          {/* Right — Chat preview */}
          <div className="animate-fade-up-3 chat-wrap-desktop" style={{ position: "relative" }}>
            <div style={{
              background: "var(--gray)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, padding: "1.2rem",
            }}>
              <div style={{ background: "var(--black)", borderRadius: 16, padding: "1.2rem" }}>
                {/* Chat header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.8rem",
                  paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: "1rem",
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", background: "#25D366",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", fontWeight: 700, color: "#fff", fontFamily: "'Syne', sans-serif",
                  }}>✓</div>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>MasAvisos</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(245,243,238,0.4)" }}>Disponible ahora</p>
                  </div>
                </div>
                {/* Messages */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {[
                    { them: true,  text: "Hola, ¿qué necesitas y en qué zona de Madrid?" },
                    { them: false, text: "Necesito un electricista en Chamberí. Es urgente." },
                    { them: true,  text: "Perfecto. Buscamos un profesional disponible cerca de ti." },
                    { them: true,  text: "Te contactará directamente por WhatsApp o llamada." },
                  ].map((msg, i) => (
                    <div key={i} style={{
                      fontSize: "0.88rem", lineHeight: 1.5, padding: "0.65rem 1rem", maxWidth: "88%",
                      background: msg.them ? "rgba(255,255,255,0.08)" : "#25D366",
                      borderRadius: msg.them ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                      alignSelf: msg.them ? "flex-start" : "flex-end",
                      color: msg.them ? "rgba(245,243,238,0.85)" : "#fff",
                    }}>{msg.text}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* Badge */}
            <div style={{
              position: "absolute", bottom: "-1.8rem", left: "-1.2rem",
              background: "var(--gray)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, padding: "0.8rem 1.2rem",
            }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1, color: "var(--yellow)" }}>&lt;15'</p>
              <p style={{ fontSize: "0.78rem", color: "rgba(245,243,238,0.45)", marginTop: "0.2rem" }}>respuesta media</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "1rem 0", background: "rgba(255,209,0,0.03)",
      }}>
        <div style={{
          display: "flex", gap: "3rem", animation: "marquee 22s linear infinite",
          whiteSpace: "nowrap", width: "max-content",
        }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.85rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(245,243,238,0.25)",
            }}>
              {item}
              <span style={{ color: "var(--yellow)", marginRight: "3rem" }}> ·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── SERVICES ── */}
      <div id="servicios" style={{ background: "var(--dark)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "6rem 2.5rem" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            gap: "2rem", flexWrap: "wrap", marginBottom: "3rem",
          }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: "0.8rem" }}>
                Servicios
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Lo que más se pide en Madrid.
              </h2>
            </div>
            <WhatsAppButton label="Pedir profesional" variant="yellow" />
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "1.5px", background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden",
          }}>
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                emoji={s.emoji}
                name={s.name}
                description={s.description}
                href={`/${s.slug}-madrid`}
              />
            ))}
            <a
              href={clientWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="service-card-link"
              style={{
                background: "var(--dark)", padding: "2rem 1.5rem",
                display: "flex", flexDirection: "column", gap: "0.5rem",
                transition: "background 0.3s", textDecoration: "none", color: "var(--white)",
              }}
            >
              <span style={{ fontSize: "1.8rem" }} aria-hidden="true">➕</span>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>Otro servicio</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(245,243,238,0.4)", lineHeight: 1.4 }}>Albañil, aire acondicionado, muebles.</p>
            </a>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ padding: "6rem 2.5rem", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "1.5px", background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden",
        }}>
          {[
            { num: "32+", label: "profesionales activos" },
            { num: "0€",  label: "para el cliente" },
            { num: "WA",  label: "sin apps ni registros" },
            { num: "MAD", label: "Madrid capital y Comunidad" },
          ].map((s) => (
            <div key={s.num} className="stat-card" style={{ background: "var(--black)", padding: "2.5rem 2rem", transition: "background 0.3s" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "3rem", color: "var(--yellow)", lineHeight: 1, marginBottom: "0.4rem" }}>{s.num}</p>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,243,238,0.45)", fontWeight: 300 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQ items={homeFaqs} />

      {/* ── CTA FINAL ── */}
      <CTASection />

      {/* ── WA MOBILE FLOAT ── */}
      <a
        href={clientWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-mobile-float"
        aria-label="Hablar por WhatsApp"
        style={{
          display: "none",
          position: "fixed", bottom: "1rem", left: "1rem", right: "1rem", zIndex: 999,
          background: "#25D366", color: "#fff", textAlign: "center" as const,
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem",
          padding: "1.1rem", borderRadius: "100px", textDecoration: "none",
          boxShadow: "0 4px 24px rgba(37,211,102,0.5)",
        }}
      >
        Hablar por WhatsApp
      </a>
    </>
  );
}
