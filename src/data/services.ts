export type Service = {
  id: string;
  file: string;
  name: string;
  title: string;
  lead: string;
  icon: string;
  tone: "cyan" | "violet" | "blue" | "green";
  includes: string[];
  forWho: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  timeline: string;
  project?: string;
  viz: "phone" | "code" | "ranks" | "palette";
};

export const services: Service[] = [
  {
    id: "apps",
    file: "apps.swift",
    name: "Apps móviles",
    title: "Apps que la gente abre todos los días",
    lead: "Diseñamos y construimos apps iOS nativas y multiplataforma con estados claros, animaciones con intención y la velocidad que hace que una app se sienta tuya.",
    icon: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"></rect><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"></line>',
    tone: "violet",
    includes: [
      "Descubrimiento de producto y mapa de funcionalidades del MVP",
      "Diseño UX/UI en Figma con prototipos navegables",
      "Desarrollo iOS nativo o multiplataforma",
      "Widgets, Live Activities, notificaciones y modo offline",
      "Integraciones con IA cuando suman valor real",
      "Publicación en App Store y Google Play",
    ],
    forWho: "Startups que lanzan su primer producto y marcas que quieren una app que sus clientes usen de verdad.",
    outcomes: [
      { value: "8–16", label: "semanas al lanzamiento" },
      { value: "60 fps", label: "como estándar" },
    ],
    stack: ["Swift", "SwiftUI", "React Native", "Supabase", "App Store Connect"],
    timeline: "8 a 16 semanas",
    project: "lyapp",
    viz: "phone",
  },
  {
    id: "web",
    file: "web.tsx",
    name: "Desarrollo web",
    title: "Webs rápidas que convierten",
    lead: "Landing pages, sitios corporativos, e-commerce y plataformas a medida. Código limpio, carga instantánea y un recorrido pensado para que cada visita tenga un siguiente paso.",
    icon: '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"></path>',
    tone: "cyan",
    includes: [
      "Arquitectura de información y copy orientado a conversión",
      "Diseño responsivo con sistema de componentes",
      "Desarrollo con Astro, Next.js o React según el caso",
      "CMS para que edites contenido sin tocar código",
      "Core Web Vitals en verde y accesibilidad WCAG AA",
      "Analítica, formularios e integraciones",
    ],
    forWho: "Marcas, profesionales y academias que necesitan una web que trabaje por ellos las 24 horas.",
    outcomes: [
      { value: "<2s", label: "tiempo de carga objetivo" },
      { value: "90+", label: "Lighthouse en móvil" },
    ],
    stack: ["Astro", "Next.js", "React", "Vercel", "Headless CMS"],
    timeline: "2 a 8 semanas",
    project: "your-english-buddy",
    viz: "code",
  },
  {
    id: "seo",
    file: "seo.json",
    name: "SEO & GEO",
    title: "Que te encuentren en Google y en las IA",
    lead: "SEO técnico, contenido y datos estructurados para posicionarte en buscadores y aparecer citado en respuestas de ChatGPT, Perplexity y AI Overviews.",
    icon: '<circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="21" y1="21" x2="15.3" y2="15.3"></line><polyline points="7.8 11.5 9.8 9 11.8 11 13.3 8.3"></polyline>',
    tone: "blue",
    includes: [
      "Auditoría técnica: rastreo, indexación, velocidad y Core Web Vitals",
      "Investigación de palabras clave e intención de búsqueda",
      "Datos estructurados Schema.org y sitemaps",
      "Arquitectura de contenido y plan editorial",
      "Optimización para motores de respuesta con IA (GEO)",
      "Reportes mensuales con Search Console y Analytics",
    ],
    forWho: "Negocios que ya tienen web pero no reciben tráfico, y marcas que quieren crecer sin depender solo de anuncios.",
    outcomes: [
      { value: "3–6", label: "meses para tracción orgánica" },
      { value: "100%", label: "páginas con schema" },
    ],
    stack: ["Search Console", "GA4", "Schema.org", "PageSpeed Insights", "llms.txt"],
    timeline: "Auditoría en 2 semanas, plan continuo mensual",
    viz: "ranks",
  },
  {
    id: "branding",
    file: "brand.css",
    name: "Sistemas de marca",
    title: "Marcas que puedes usar, no solo mirar",
    lead: "Logo, paleta, tipografía y reglas convertidas en un brand kit interactivo: tu equipo prueba combinaciones, descarga recursos y crea piezas nuevas sin romper la marca.",
    icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
    tone: "green",
    includes: [
      "Logo, wordmark e isotipo con variantes aprobadas",
      "Paleta con nombre, rol y proporción de uso de cada color",
      "Sistema tipográfico para web y redes",
      "Brand kit web interactivo con playground de paleta",
      "Generador de firma de correo y plantillas",
      "Guía de errores comunes y reglas de uso",
    ],
    forWho: "Creadores, marcas personales y equipos que necesitan consistencia sin depender de un diseñador para cada pieza.",
    outcomes: [
      { value: "3–5", label: "semanas" },
      { value: "1", label: "fuente de verdad para tu marca" },
    ],
    stack: ["Figma", "SVG", "Design tokens", "HTML / CSS", "GitHub Pages"],
    timeline: "3 a 5 semanas",
    project: "simply-andy",
    viz: "palette",
  },
];
