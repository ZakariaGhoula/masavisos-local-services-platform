import Link from "next/link";

interface BreadcrumbItem { label: string; href?: string; }
interface BreadcrumbsProps { items: BreadcrumbItem[]; }

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Ruta de navegación" style={{ padding: "1.2rem 2.5rem", paddingTop: "6rem" }}>
      <ol style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "center", gap: "0.4rem", listStyle: "none", fontSize: "0.8rem", color: "rgba(245,243,238,0.3)" }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            {i > 0 && <span aria-hidden="true" style={{ color: "rgba(255,209,0,0.3)" }}>/</span>}
            {item.href ? (
              <Link href={item.href} style={{ color: "rgba(245,243,238,0.4)", textDecoration: "none" }} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: "var(--yellow)" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
