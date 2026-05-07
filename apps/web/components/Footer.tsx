import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.07)",
      padding: "1.8rem 2.5rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap" as const, gap: "1rem",
      fontSize: "0.82rem", color: "rgba(245,243,238,0.3)",
    }}>
      <Link href="/" style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem",
        letterSpacing: "-0.02em", color: "var(--white)", textDecoration: "none",
      }}>
        Mas<span style={{ color: "var(--yellow)" }}>Avisos</span>
      </Link>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" as const }}>
        {[
          { href: "/como-funciona", label: "Cómo funciona" },
          { href: "/pro", label: "Para profesionales" },
          { href: "/fontanero-madrid", label: "Fontanero Madrid" },
          { href: "/electricista-madrid", label: "Electricista Madrid" },
          { href: "/cerrajero-madrid", label: "Cerrajero Madrid" },
          { href: "/aviso-legal", label: "Aviso legal" },
          { href: "/privacidad", label: "Privacidad" },
        ].map((l) => (
          <Link key={l.href} href={l.href} style={{
            color: "rgba(245,243,238,0.3)", textDecoration: "none",
            transition: "color 0.2s",
          }}
            className="footer-link">
            {l.label}
          </Link>
        ))}
      </div>

      <div>© 2026 MasAvisos Madrid</div>
    </footer>
  );
}
