import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/aviso-legal", "/privacidad", "/cookies"],
      },
    ],
    sitemap: "https://masavisos.es/sitemap.xml",
  };
}
