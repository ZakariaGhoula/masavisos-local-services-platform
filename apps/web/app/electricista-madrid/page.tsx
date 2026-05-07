import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Electricista disponible en Madrid — Avisos por WhatsApp",
  description:
    "Electricista disponible en Madrid para averías, instalaciones y certificados. Envía tu aviso por WhatsApp y recibe respuesta rápida. Sin registro.",
  alternates: { canonical: "https://masavisos.es/electricista-madrid" },
  openGraph: {
    title: "Electricista disponible en Madrid | MasAvisos",
    description: "Electricista disponible en Madrid. Avisos por WhatsApp.",
    url: "https://masavisos.es/electricista-madrid",
  },
};

export default function ElectricistaMadridPage() {
  const service = getServiceBySlug("electricista")!;
  return <ServicePageTemplate service={service} />;
}
