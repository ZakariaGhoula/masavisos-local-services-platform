import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import { WA_NUMBER_DISPLAY, WA_MSG_PRO } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto — MasAvisos Madrid",
  description: "Contacta con MasAvisos por WhatsApp. Estamos en Madrid y respondemos en minutos.",
  alternates: { canonical: "https://masavisos.es/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]} />

      <div style={{ padding: "2rem 2.5rem 8rem", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--yellow)", marginBottom: "0.8rem" }}>Contacto</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "4rem" }}>
          Hablamos por WhatsApp
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
          {/* Client */}
          <div className="step-card" style={{ background: "var(--dark)", padding: "3rem 2.5rem", transition: "background 0.3s" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }} aria-hidden="true">💬</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.8rem" }}>Soy cliente</h2>
            <p style={{ fontSize: "0.92rem", color: "rgba(245,243,238,0.5)", lineHeight: 1.65, marginBottom: "2rem", fontWeight: 300 }}>
              Necesito un profesional. Escríbenos por WhatsApp y te conectamos con alguien disponible en Madrid.
            </p>
            <WhatsAppButton label="Pedir profesional" variant="primary" />
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "rgba(245,243,238,0.3)" }}>{WA_NUMBER_DISPLAY}</p>
          </div>

          {/* Pro */}
          <div className="step-card" style={{ background: "var(--dark)", padding: "3rem 2.5rem", transition: "background 0.3s" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }} aria-hidden="true">🔧</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "0.8rem" }}>Soy profesional</h2>
            <p style={{ fontSize: "0.92rem", color: "rgba(245,243,238,0.5)", lineHeight: 1.65, marginBottom: "2rem", fontWeight: 300 }}>
              Quiero darme de alta y recibir avisos de clientes en Madrid. Alta gratuita durante el lanzamiento.
            </p>
            <WhatsAppButton message={WA_MSG_PRO} label="Darme de alta gratis" variant="yellow" />
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "rgba(245,243,238,0.3)" }}>{WA_NUMBER_DISPLAY}</p>
          </div>

          {/* Info */}
          <div style={{ background: "var(--black)", padding: "3rem 2.5rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }} aria-hidden="true">📍</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.5rem" }}>Información</h2>
            <dl style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
              {[
                { dt: "Plataforma", dd: "MasAvisos" },
                { dt: "Zona activa", dd: "Madrid capital y Comunidad de Madrid" },
                { dt: "WhatsApp", dd: WA_NUMBER_DISPLAY },
                { dt: "Estado", dd: "✓ Activo — Lanzamiento en Madrid" },
              ].map((item) => (
                <div key={item.dt} style={{ display: "flex", gap: "1rem" }}>
                  <dt style={{ fontSize: "0.82rem", color: "rgba(245,243,238,0.35)", width: 90, flexShrink: 0, fontWeight: 300 }}>{item.dt}</dt>
                  <dd style={{ fontSize: "0.92rem", color: item.dt === "Estado" ? "var(--yellow)" : "var(--white)", fontWeight: 500 }}>{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
