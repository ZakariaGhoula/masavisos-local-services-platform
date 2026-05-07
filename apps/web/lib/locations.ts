export interface Location {
  slug: string;
  name: string;
  province: string;
  description: string;
  problems?: string[];
}

export const locations: Location[] = [
  {
    slug: "alcorcon",
    name: "Alcorcón",
    province: "Madrid",
    description: "municipio del suroeste de la Comunidad de Madrid",
    problems: ["Urbanizaciones antiguas con tuberías deterioradas", "Bloques de los años 70 con instalaciones obsoletas"],
  },
  {
    slug: "getafe",
    name: "Getafe",
    province: "Madrid",
    description: "ciudad industrial al sur de Madrid",
    problems: ["Viviendas industriales con instalaciones eléctricas antiguas", "Zonas de polígono con necesidades de reforma"],
  },
  {
    slug: "leganes",
    name: "Leganés",
    province: "Madrid",
    description: "municipio al sur de Madrid con gran densidad residencial",
    problems: ["Barrios residenciales con muchos pisos en alquiler", "Comunidades de vecinos con necesidades de mantenimiento"],
  },
  {
    slug: "mostoles",
    name: "Móstoles",
    province: "Madrid",
    description: "segunda ciudad más poblada de la Comunidad de Madrid",
    problems: ["Urbanizaciones de los 80 con infraestructura envejecida", "Alta demanda de servicios de fontanería y electricidad"],
  },
  {
    slug: "fuenlabrada",
    name: "Fuenlabrada",
    province: "Madrid",
    description: "municipio en el sur metropolitano de Madrid",
    problems: ["Bloques de pisos con sistemas de calefacción antiguos", "Necesidades frecuentes de cerrajería y reforma"],
  },
  {
    slug: "alcobendas",
    name: "Alcobendas",
    province: "Madrid",
    description: "municipio al norte de Madrid conocido por sus empresas",
    problems: ["Zonas empresariales con necesidades de electricidad e instalaciones", "Urbanizaciones premium con altas exigencias de calidad"],
  },
  {
    slug: "pozuelo",
    name: "Pozuelo de Alarcón",
    province: "Madrid",
    description: "municipio residencial al oeste de Madrid",
    problems: ["Chalets y viviendas unifamiliares con jardín", "Alta demanda de reformas integrales y acabados de calidad"],
  },
  {
    slug: "majadahonda",
    name: "Majadahonda",
    province: "Madrid",
    description: "municipio residencial al noroeste de Madrid",
    problems: ["Urbanizaciones de alto standing con necesidades específicas", "Demanda de profesionales de confianza para segundas residencias"],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function generateLocationPaths(serviceSlug: string) {
  return locations.map((loc) => ({
    params: { location: loc.slug },
    service: serviceSlug,
  }));
}
