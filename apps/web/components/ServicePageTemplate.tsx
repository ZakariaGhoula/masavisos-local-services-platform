import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { Service } from "@/lib/services";
import { getServiceWhatsAppUrl } from "@/lib/whatsapp";
import { servicePageJsonLd, breadcrumbJsonLd, BASE_URL_EXPORT } from "@/lib/seo";
import { locations } from "@/lib/locations";

interface ServicePageTemplateProps {
  service: Service;
  city?: string;
  citySlug?: string;
}

const sectionTag = (text: string) => (
  <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--yellow)", marginBottom: "0.8rem" }}>
    {text}
  </div>
);

export default function ServicePageTemplate({ service, city = "Madrid", citySlug = "madrid" }: ServicePageTemplateProps) {
  const pagePath = `/${service.slug}-${citySlug}`;
  const pageUrl = `${BASE_URL_EXPORT}${pagePath}`;
  const isMain = city === "Madrid";
  const waMessage = `Hola, necesito un ${service.name.toLowerCase()} en ${city}. Mi aviso es:`;

  const jsonLd = [
    ...servicePageJsonLd(service.name, city, pageUrl, service.faqs),
    breadcrumbJsonLd([
      { name: "Inicio", url: "/" },
      { name: `${service.name} Madrid`, url: `/${service.slug}-madrid` },
      ...(!isMain ? [{ name: `${service.name} ${city}`, url: pagePath }] : []),
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <Breadcrumbs items={[
        { label: "Inicio", href: "/" },
        ...(isMain
          ? [{ label: `${service.name} Madrid` }]
          : [{ label: `${service.name} Madrid`, href: `/${service.slug}-madrid` }, { label: `${service.name} ${city}` }]
        ),
      ]} />

      {/* Hero */}
      <div style={{ padding: "3rem 2.5rem 6rem", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const,
          color: "var(--yellow)", border: "1px solid rgba(255,209,0,0.3)",
          padding: "0.4rem 1rem", borderRadius: "100px", marginBottom: "2rem",
        }}>
          <span style={{ width: 6, height: 6, background: "var(--yellow)", borderRadius: "50%", display: "inline-block" }} aria-hidden="true" />
          {service.urgentKeyword} en {city}
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.4rem,5vw,4rem)", lineHeight: 1.0, letterSpacing: "-0.03em",
          marginBottom: "1.5rem",
        }}>
          {service.name} {service.urgentKeyword} en {city}
        </h1>

        <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: "rgba(245,243,238,0.55)", maxWidth: "52ch", fontWeight: 300, lineHeight: 1.65, marginBottom: "2.5rem" }}>
          Envía tu aviso por WhatsApp y ponemos en contacto con {service.namePlural.toLowerCase()} disponibles en {city}. Rápido, sin complicaciones.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
          <WhatsAppButton message={waMessage} label={`Pedir ${service.name.toLowerCase()} por WhatsApp`} variant="primary" className="pulse-wa" />
          <Link href="/como-funciona" style={{
            background: "transparent", color: "var(--white)", fontWeight: 500, fontSize: "1rem",
            padding: "1rem 2.2rem", borderRadius: "100px", textDecoration: "none",
            display: "inline-flex", alignItems: "center",
            border: "1px solid rgba(255,255,255,0.15)",
          }} className="btn-secondary-hover">
            Cómo funciona →
          </Link>
        </div>
      </div>

      {/* Problems grid */}
      <div style={{ background: "var(--dark)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "5rem 2.5rem" }}>
          {sectionTag("Servicios")}
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
            ¿Qué resuelve un {service.name.toLowerCase()} en {city}?
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "1.5px", background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden",
          }}>
            {service.problems.map((problem) => (
              <div key={problem} className="stat-card" style={{ background: "var(--dark)", padding: "1.8rem 1.5rem", transition: "background 0.3s", display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                <span style={{ color: "var(--yellow)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "0.92rem", color: "rgba(245,243,238,0.75)", lineHeight: 1.45 }}>{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: "5rem 2.5rem", maxWidth: 1080, margin: "0 auto" }}>
        {sectionTag("Proceso")}
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
          Cómo pedir un {service.name.toLowerCase()} en {city}
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "1.5px", background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden",
        }}>
          {[
            { num: "01", title: "Envías tu aviso", desc: `Mándanos un WhatsApp contando qué necesitas en ${city}.` },
            { num: "02", title: `Buscamos ${service.name.toLowerCase()}`, desc: `Enviamos tu aviso a ${service.namePlural.toLowerCase()} disponibles.` },
            { num: "03", title: "Te contactan", desc: "El profesional te confirma precio y disponibilidad." },
          ].map((step) => (
            <div key={step.num} className="step-card" style={{ background: "var(--black)", padding: "2.5rem 2rem", transition: "background 0.3s" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, color: "rgba(255,209,0,0.15)", lineHeight: 1, marginBottom: "1rem" }}>{step.num}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,243,238,0.5)", lineHeight: 1.55 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location links on main page */}
      {isMain && (
        <div style={{ background: "var(--dark)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "4rem 2.5rem" }}>
            {sectionTag("Comunidad de Madrid")}
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2rem)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              {service.name} en toda la Comunidad de Madrid
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.6rem" }}>
              {locations.map((loc) => (
                <Link key={loc.slug} href={`/${service.slug}-${loc.slug}`} style={{
                  fontSize: "0.85rem", color: "var(--yellow)", border: "1px solid rgba(255,209,0,0.25)",
                  padding: "0.5rem 1.1rem", borderRadius: "100px", textDecoration: "none", transition: "background 0.2s",
                }} className="location-pill">
                  {service.name} {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Internal links */}
      <div style={{ padding: "3rem 2.5rem", maxWidth: 1080, margin: "0 auto" }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(245,243,238,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>Otros servicios en Madrid</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
          {["fontanero", "electricista", "cerrajero", "pintor", "reformas"]
            .filter((s) => s !== service.slug)
            .map((s) => (
              <Link key={s} href={`/${s}-madrid`} style={{
                fontSize: "0.82rem", color: "rgba(245,243,238,0.4)", border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.4rem 1rem", borderRadius: "100px", textDecoration: "none",
              }} className="btn-secondary-hover">
                {s.charAt(0).toUpperCase() + s.slice(1)} Madrid
              </Link>
            ))}
        </div>
      </div>

      <FAQ items={service.faqs} title={`Preguntas sobre ${service.name.toLowerCase()} en ${city}`} />
      <CTASection
        title={`¿Necesitas un ${service.name.toLowerCase()} en ${city}?`}
        subtitle={`Mándanos tu aviso y te conectamos con ${service.namePlural.toLowerCase()} disponibles ahora.`}
        message={waMessage}
        buttonLabel={`Pedir ${service.name.toLowerCase()} ahora`}
      />
    </>
  );
}
