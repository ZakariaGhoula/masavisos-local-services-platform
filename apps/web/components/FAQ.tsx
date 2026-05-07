"use client";
import { useState } from "react";

interface FAQItem { q: string; a: string; }
interface FAQProps { items: FAQItem[]; title?: string; }

export default function FAQ({ items, title = "Preguntas frecuentes" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ padding: "6rem 2.5rem", maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--yellow)", marginBottom: "0.8rem" }}>
        FAQ
      </div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: "2.5rem" }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: "var(--black)", transition: "background 0.3s" }} className="faq-item">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1.8rem 2rem", textAlign: "left" as const, background: "none", border: "none",
                color: "var(--white)", fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "1rem", cursor: "pointer", gap: "1rem",
              }}
            >
              <span>{item.q}</span>
              <span style={{ color: "var(--yellow)", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 2rem 1.8rem", fontSize: "0.92rem", color: "rgba(245,243,238,0.55)", lineHeight: 1.65, fontWeight: 300 }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
