export interface Service {
  slug: string;
  name: string;
  namePlural: string;
  emoji: string;
  description: string;
  urgentKeyword: string;
  problems: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "fontanero",
    name: "Fontanero",
    namePlural: "Fontaneros",
    emoji: "🔧",
    description: "Reparación de averías, tuberías, grifos y más",
    urgentKeyword: "urgente",
    problems: [
      "Fuga de agua o tubería rota",
      "Atasco en desagüe o WC",
      "Grifo que gotea o no cierra",
      "Caldera sin agua caliente",
      "Instalación de electrodomésticos",
      "Revisión de instalación de agua",
    ],
    faqs: [
      {
        q: "¿Cuánto tarda en llegar un fontanero?",
        a: "En urgencias, en menos de 60 minutos en Madrid capital. Para trabajos programados, te confirmamos hora por WhatsApp.",
      },
      {
        q: "¿Hay coste por el desplazamiento?",
        a: "Depende del profesional. Te lo indica antes de empezar, sin sorpresas.",
      },
      {
        q: "¿Atienden fuera de horario?",
        a: "Sí, disponemos de fontaneros 24 horas para emergencias en Madrid.",
      },
      {
        q: "¿Cómo funciona MasAvisos?",
        a: "Envías tu aviso por WhatsApp, nosotros lo mandamos a fontaneros disponibles y uno te contacta directamente.",
      },
    ],
  },
  {
    slug: "electricista",
    name: "Electricista",
    namePlural: "Electricistas",
    emoji: "⚡",
    description: "Instalaciones, averías eléctricas y cuadros eléctricos",
    urgentKeyword: "disponible",
    problems: [
      "Corte de luz o disyuntor disparado",
      "Enchufe o interruptor averiado",
      "Instalación de puntos de luz",
      "Cuadro eléctrico antiguo o dañado",
      "Certificado eléctrico para alquiler",
      "Instalación de climatización",
    ],
    faqs: [
      {
        q: "¿Pueden hacer el certificado eléctrico?",
        a: "Sí, nuestros electricistas están homologados y pueden emitir certificados oficiales para alquiler o venta.",
      },
      {
        q: "¿Atienden emergencias eléctricas?",
        a: "Sí, disponemos de electricistas para urgencias en Madrid capital las 24 horas.",
      },
      {
        q: "¿Cobran por la visita?",
        a: "Cada profesional tiene su tarifa. Te la confirman antes de ir, sin compromisos.",
      },
      {
        q: "¿Cómo contacto con un electricista?",
        a: "Envíanos tu aviso por WhatsApp y te ponemos en contacto con un electricista disponible.",
      },
    ],
  },
  {
    slug: "cerrajero",
    name: "Cerrajero",
    namePlural: "Cerrajeros",
    emoji: "🔑",
    description: "Apertura de puertas, cambio de cerraduras y más",
    urgentKeyword: "24 horas",
    problems: [
      "Puerta bloqueada o sin llaves",
      "Cambio de cerradura por seguridad",
      "Cerradura rota o forzada",
      "Apertura sin daños (no destructiva)",
      "Instalación de cerradura de seguridad",
      "Duplicado de llaves especiales",
    ],
    faqs: [
      {
        q: "¿Abren sin romper la puerta?",
        a: "En la mayoría de casos sí, mediante apertura no destructiva. Si no es posible, te informan antes de actuar.",
      },
      {
        q: "¿Cuánto cuesta una apertura de puerta?",
        a: "Entre 50€ y 120€ según el tipo de cerradura y hora. El cerrajero te confirma el precio antes de empezar.",
      },
      {
        q: "¿Cuánto tardan en llegar?",
        a: "En urgencias, entre 15 y 45 minutos en Madrid capital.",
      },
      {
        q: "¿Son cerrajeros de confianza?",
        a: "Trabajamos solo con profesionales verificados. Sin engaños ni precios abusivos.",
      },
    ],
  },
  {
    slug: "pintor",
    name: "Pintor",
    namePlural: "Pintores",
    emoji: "🎨",
    description: "Pintura de pisos, locales y comunidades en Madrid",
    urgentKeyword: "profesional",
    problems: [
      "Pintura de piso completo",
      "Pintado de habitaciones o salón",
      "Reparación de goteras y humedades",
      "Pintura de fachada o exterior",
      "Pintura de local o negocio",
      "Presupuesto sin compromiso",
    ],
    faqs: [
      {
        q: "¿Hacen presupuesto gratuito?",
        a: "Sí, puedes pedir presupuesto sin compromiso por WhatsApp. El pintor lo prepara según tus medidas.",
      },
      {
        q: "¿Incluye materiales?",
        a: "Puedes pedirlo con o sin materiales. El pintor te indica las opciones y precios.",
      },
      {
        q: "¿Cuánto tarda en pintar un piso?",
        a: "Un piso de 70-90 m² suele tardar entre 2 y 4 días según estado y trabajo.",
      },
      {
        q: "¿Trabajan en comunidades?",
        a: "Sí, contamos con pintores para zonas comunes, fachadas y garajes en Madrid.",
      },
    ],
  },
  {
    slug: "reformas",
    name: "Reformas",
    namePlural: "Reformas",
    emoji: "🏠",
    description: "Reformas integrales y parciales en Madrid",
    urgentKeyword: "de confianza",
    problems: [
      "Reforma integral de piso",
      "Reforma de baño o cocina",
      "Suelo nuevo o parquet",
      "Tabiques y distribución interior",
      "Reforma de local comercial",
      "Presupuesto sin compromiso",
    ],
    faqs: [
      {
        q: "¿Hacen presupuesto gratuito?",
        a: "Sí, manda tu aviso por WhatsApp con fotos y medidas y te enviamos presupuesto sin compromiso.",
      },
      {
        q: "¿Cuánto cuesta reformar un baño?",
        a: "Una reforma de baño completa en Madrid parte desde 3.000€ según materiales y acabados.",
      },
      {
        q: "¿Gestionan permisos y licencias?",
        a: "Sí, nuestros profesionales te asesoran sobre permisos necesarios según el tipo de reforma.",
      },
      {
        q: "¿Trabajan en toda la Comunidad de Madrid?",
        a: "Principalmente en Madrid capital, pero también cubrimos municipios de la Comunidad de Madrid.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
