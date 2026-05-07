import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Pintor profesional en Madrid — Presupuesto gratis por WhatsApp",
  description:
    "Pintor profesional en Madrid para pisos, locales y comunidades. Presupuesto sin compromiso por WhatsApp. Pintores locales de confianza en Madrid.",
  alternates: { canonical: "https://masavisos.es/pintor-madrid" },
  openGraph: {
    title: "Pintor profesional en Madrid | MasAvisos",
    description: "Pintor profesional en Madrid. Presupuesto gratis por WhatsApp.",
    url: "https://masavisos.es/pintor-madrid",
  },
};

export default function PintorMadridPage() {
  const service = getServiceBySlug("pintor")!;
  return <ServicePageTemplate service={service} />;
}
