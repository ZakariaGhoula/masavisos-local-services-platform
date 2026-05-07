import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { locations } from "@/lib/locations";

const BASE_URL = "https://masavisos.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/pro`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/como-funciona`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/${s.slug}-madrid`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    locations.map((l) => ({
      url: `${BASE_URL}/${s.slug}-${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...servicePages, ...locationPages];
}
