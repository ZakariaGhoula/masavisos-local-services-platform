import type { Metadata } from "next";

const BASE_URL = "https://masavisos.es";
const SITE_NAME = "MasAvisos";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`;

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex,
}: SeoConfig): Metadata {
  const url = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MasAvisos",
    url: BASE_URL,
    telephone: "+34612208911",
    description:
      "Plataforma que conecta clientes con profesionales locales en Madrid por WhatsApp.",
    areaServed: {
      "@type": "City",
      name: "Madrid",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Comunidad de Madrid",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34612208911",
      contactType: "customer service",
      availableLanguage: "Spanish",
      contactOption: "TollFree",
    },
    sameAs: [],
  };
}

export function servicePageJsonLd(
  serviceName: string,
  city: string,
  url: string,
  faqs: { q: string; a: string }[]
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${serviceName} en ${city}`,
      provider: {
        "@type": "LocalBusiness",
        name: "MasAvisos",
        url: BASE_URL,
        telephone: "+34612208911",
        areaServed: city,
      },
      areaServed: {
        "@type": "City",
        name: city,
      },
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export const BASE_URL_EXPORT = BASE_URL;
