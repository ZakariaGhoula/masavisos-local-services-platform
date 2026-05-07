const defaultSteps = [
  { num: "01", title: "Escribes por WhatsApp", desc: "Nos dices qué necesitas, tu zona y si es urgente." },
  { num: "02", title: "Buscamos disponibilidad", desc: "Seleccionamos profesionales según oficio, zona y urgencia." },
  { num: "03", title: "Te contactan directamente", desc: "Hablas con el profesional y acordáis precio y horario." },
];

interface Step { num: string; title: string; desc: string; }
interface HowItWorksProps { steps?: Step[]; title?: string; subtitle?: string; }

export default function HowItWorks({
  steps = defaultSteps,
  title = "Un mensaje. Un profesional.",
  subtitle = "Sin apps, sin registros, sin esperas. Solo WhatsApp.",
}: HowItWorksProps) {
  return (
    <div id="como-funciona" style={{ padding: "6rem 2.5rem", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--yellow)", marginBottom: "0.8rem" }}>
        Cómo funciona
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "0.8rem" }}>
        {title}
      </h2>
      <p style={{ fontSize: "1rem", color: "rgba(245,243,238,0.5)", maxWidth: "50ch", fontWeight: 300, lineHeight: 1.6, marginBottom: "3rem" }}>
        {subtitle}
      </p>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "1.5px", background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden",
      }}>
        {steps.map((step) => (
          <div key={step.num} className="step-card" style={{
            background: "var(--black)", padding: "2.5rem 2rem", transition: "background 0.3s",
          }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800,
              color: "rgba(255,209,0,0.15)", lineHeight: 1, marginBottom: "1rem",
            }}>
              {step.num}
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>
              {step.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(245,243,238,0.5)", lineHeight: 1.55 }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
