import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Reformas de confianza en Madrid — Presupuesto gratis por WhatsApp",
  description:
    "Reformas integrales y parciales en Madrid. Baños, cocinas, suelos y más. Presupuesto sin compromiso por WhatsApp. Empresas de reformas locales en Madrid.",
  alternates: { canonical: "https://masavisos.es/reformas-madrid" },
  openGraph: {
    title: "Reformas de confianza en Madrid | MasAvisos",
    description: "Reformas en Madrid. Presupuesto gratis por WhatsApp.",
    url: "https://masavisos.es/reformas-madrid",
  },
};

export default function ReformasMadridPage() {
  const service = getServiceBySlug("reformas")!;
  return <ServicePageTemplate service={service} />;
}
