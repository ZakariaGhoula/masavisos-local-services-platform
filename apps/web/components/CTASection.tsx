import WhatsAppButton from "./WhatsAppButton";
import { WA_MSG_CLIENT } from "@/lib/whatsapp";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  message?: string;
  buttonLabel?: string;
}

export default function CTASection({
  title = "¿Necesitas a alguien hoy?",
  subtitle = "Mándanos un mensaje. Te conectamos con un profesional disponible en tu zona.",
  message = WA_MSG_CLIENT,
  buttonLabel = "Hablar por WhatsApp",
}: CTASectionProps) {
  return (
    <div style={{ padding: "6rem 2.5rem" }}>
      <div style={{
        maxWidth: 1080, margin: "0 auto",
        background: "var(--yellow)", borderRadius: 24, padding: "4rem",
        display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center",
      }}
        className="cta-block-inner">
        <div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em",
            lineHeight: 1.05, color: "var(--black)",
          }}>
            {title}
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(0,0,0,0.6)", fontWeight: 300, lineHeight: 1.6, marginTop: "0.8rem", maxWidth: "44ch" }}>
            {subtitle}
          </p>
        </div>
        <WhatsAppButton message={message} label={buttonLabel} variant="dark" />
      </div>
    </div>
  );
}
