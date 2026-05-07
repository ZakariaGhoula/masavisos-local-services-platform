import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Fontanero urgente en Madrid — Avisos por WhatsApp",
  description:
    "Fontanero urgente en Madrid disponible ahora. Fugas, atascos, calderas y más. Envía tu aviso por WhatsApp y recibe respuesta en minutos. Sin registro.",
  alternates: { canonical: "https://masavisos.es/fontanero-madrid" },
  openGraph: {
    title: "Fontanero urgente en Madrid | MasAvisos",
    description: "Fontanero urgente en Madrid disponible ahora. Envía tu aviso por WhatsApp.",
    url: "https://masavisos.es/fontanero-madrid",
  },
};

export default function FontaneroMadridPage() {
  const service = getServiceBySlug("fontanero")!;
  return <ServicePageTemplate service={service} />;
}
