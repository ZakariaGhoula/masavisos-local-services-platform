import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Cerrajero 24 horas Madrid — Apertura urgente por WhatsApp",
  description:
    "Cerrajero 24 horas en Madrid. Apertura de puertas, cambio de cerraduras y emergencias. Envía tu aviso por WhatsApp. En 15-45 minutos en Madrid capital.",
  alternates: { canonical: "https://masavisos.es/cerrajero-madrid" },
  openGraph: {
    title: "Cerrajero 24 horas Madrid | MasAvisos",
    description: "Cerrajero 24 horas en Madrid. Apertura urgente por WhatsApp.",
    url: "https://masavisos.es/cerrajero-madrid",
  },
};

export default function CerrajeroMadridPage() {
  const service = getServiceBySlug("cerrajero")!;
  return <ServicePageTemplate service={service} />;
}
