import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { services, getServiceBySlug } from "@/lib/services";
import { locations, getLocationBySlug } from "@/lib/locations";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate all valid service-location combinations
export async function generateStaticParams() {
  const paths: { slug: string }[] = [];
  for (const service of services) {
    for (const location of locations) {
      paths.push({ slug: `${service.slug}-${location.slug}` });
    }
  }
  return paths;
}

function parseSlug(slug: string): { service: ReturnType<typeof getServiceBySlug>; location: ReturnType<typeof getLocationBySlug> } | null {
  // Try to match service-location pattern
  for (const service of services) {
    if (slug.startsWith(`${service.slug}-`)) {
      const locationSlug = slug.slice(service.slug.length + 1);
      const location = getLocationBySlug(locationSlug);
      if (location) {
        return { service, location };
      }
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed || !parsed.service || !parsed.location) return {};
  const { service, location } = parsed as {
    service: NonNullable<ReturnType<typeof getServiceBySlug>>;
    location: NonNullable<ReturnType<typeof getLocationBySlug>>;
  };

  return {
    title: `${service.name} en ${location.name} — Avisos por WhatsApp`,
    description: `${service.name} en ${location.name} disponible por WhatsApp. Sin registro. Profesionales locales en ${location.name}, ${location.province}.`,
    alternates: { canonical: `https://masavisos.es/${slug}` },
    openGraph: {
      title: `${service.name} en ${location.name} | MasAvisos`,
      description: `${service.name} en ${location.name} por WhatsApp.`,
      url: `https://masavisos.es/${slug}`,
    },
  };
}

export default async function LocationServicePage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed || !parsed.service || !parsed.location) {
    notFound();
  }

  const { service, location } = parsed as {
    service: NonNullable<ReturnType<typeof getServiceBySlug>>;
    location: NonNullable<ReturnType<typeof getLocationBySlug>>;
  };

  return (
    <ServicePageTemplate
      service={service}
      city={location.name}
      citySlug={location.slug}
    />
  );
}
