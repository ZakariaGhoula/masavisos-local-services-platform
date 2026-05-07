import Link from "next/link";

interface ServiceCardProps {
  emoji: string;
  name: string;
  description: string;
  href: string;
}

export default function ServiceCard({ emoji, name, description, href }: ServiceCardProps) {
  return (
    <Link href={href} className="service-card-link" style={{
      background: "var(--dark)", padding: "2rem 1.5rem",
      display: "flex", flexDirection: "column" as const, gap: "0.5rem",
      transition: "background 0.3s", textDecoration: "none", color: "var(--white)",
    }}>
      <span style={{ fontSize: "1.8rem" }} aria-hidden="true">{emoji}</span>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>{name}</h3>
      <p style={{ fontSize: "0.8rem", color: "rgba(245,243,238,0.4)", lineHeight: 1.4 }}>{description}</p>
    </Link>
  );
}
