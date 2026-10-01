import type { L } from "../i18n";

export type Service = {
  id: string;
  file: string;
  name: L;
  title: L;
  lead: L;
  icon: string;
  tone: "cyan" | "violet" | "blue" | "green";
  includes: L[];
  forWho: L;
  outcomes: { value: string; label: L }[];
  stack: string[];
  timeline: L;
  project?: string;
  viz: "phone" | "code" | "ranks" | "palette";
};

export const services: Service[] = [
  {
    id: "apps",
    file: "apps.swift",
    name: { en: "Mobile apps", es: "Apps móviles" },
    title: { en: "Apps people open every day", es: "Apps que la gente abre todos los días" },
    lead: {
      en: "We design and build native iOS and cross-platform apps with clear states, purposeful motion and the speed that makes an app feel like yours.",
      es: "Diseñamos y construimos apps iOS nativas y multiplataforma con estados claros, animaciones con intención y la velocidad que hace que una app se sienta tuya.",
    },
    icon: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"></rect><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"></line>',
    tone: "violet",
    includes: [
      { en: "Product discovery and an MVP feature map", es: "Descubrimiento de producto y mapa de funcionalidades del MVP" },
      { en: "UX/UI design in Figma with clickable prototypes", es: "Diseño UX/UI en Figma con prototipos navegables" },
      { en: "Native iOS or cross-platform development", es: "Desarrollo iOS nativo o multiplataforma" },
      { en: "Widgets, Live Activities, notifications and offline mode", es: "Widgets, Live Activities, notificaciones y modo offline" },
      { en: "AI integrations when they add real value", es: "Integraciones con IA cuando suman valor real" },
      { en: "Publishing to the App Store and Google Play", es: "Publicación en App Store y Google Play" },
    ],
    forWho: {
      en: "Startups launching their first product and brands that want an app their customers actually use.",
      es: "Startups que lanzan su primer producto y marcas que quieren una app que sus clientes usen de verdad.",
    },
    outcomes: [
      { value: "8–16", label: { en: "weeks to launch", es: "semanas al lanzamiento" } },
      { value: "60 fps", label: { en: "as the standard", es: "como estándar" } },
    ],
    stack: ["Swift", "SwiftUI", "React Native", "Supabase", "App Store Connect"],
    timeline: { en: "8 to 16 weeks", es: "8 a 16 semanas" },
    project: "lyapp",
    viz: "phone",
  },
  {
    id: "web",
    file: "web.tsx",
    name: { en: "Web development", es: "Desarrollo web" },
    title: { en: "Fast websites that convert", es: "Webs rápidas que convierten" },
    lead: {
      en: "Landing pages, company sites, e-commerce and custom platforms. Clean code, instant loads and a journey where every visit has a next step.",
      es: "Landing pages, sitios corporativos, e-commerce y plataformas a medida. Código limpio, carga instantánea y un recorrido pensado para que cada visita tenga un siguiente paso.",
    },
    icon: '<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z"></path>',
    tone: "cyan",
    includes: [
      { en: "Information architecture and conversion-focused copy", es: "Arquitectura de información y copy orientado a conversión" },
      { en: "Responsive design built on a component system", es: "Diseño responsivo con sistema de componentes" },
      { en: "Built with Astro, Next.js or React depending on the case", es: "Desarrollo con Astro, Next.js o React según el caso" },
      { en: "A CMS so you can edit content without touching code", es: "CMS para que edites contenido sin tocar código" },
      { en: "Green Core Web Vitals and WCAG AA accessibility", es: "Core Web Vitals en verde y accesibilidad WCAG AA" },
      { en: "Analytics, forms and integrations", es: "Analítica, formularios e integraciones" },
    ],
    forWho: {
      en: "Brands, professionals and academies that need a website working for them around the clock.",
      es: "Marcas, profesionales y academias que necesitan una web que trabaje por ellos las 24 horas.",
    },
    outcomes: [
      { value: "<2s", label: { en: "target load time", es: "tiempo de carga objetivo" } },
      { value: "90+", label: { en: "mobile Lighthouse", es: "Lighthouse en móvil" } },
    ],
    stack: ["Astro", "Next.js", "React", "Vercel", "Headless CMS"],
    timeline: { en: "2 to 8 weeks", es: "2 a 8 semanas" },
    project: "your-english-buddy",
    viz: "code",
  },
  {
    id: "seo",
    file: "seo.json",
    name: { en: "SEO & GEO", es: "SEO & GEO" },
    title: { en: "Get found on Google and in AI answers", es: "Que te encuentren en Google y en las IA" },
    lead: {
      en: "Technical SEO, content and structured data to rank in search engines and get cited in ChatGPT, Perplexity and AI Overviews answers.",
      es: "SEO técnico, contenido y datos estructurados para posicionarte en buscadores y aparecer citado en respuestas de ChatGPT, Perplexity y AI Overviews.",
    },
    icon: '<circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="21" y1="21" x2="15.3" y2="15.3"></line><polyline points="7.8 11.5 9.8 9 11.8 11 13.3 8.3"></polyline>',
    tone: "blue",
    includes: [
      { en: "Technical audit: crawling, indexing, speed and Core Web Vitals", es: "Auditoría técnica: rastreo, indexación, velocidad y Core Web Vitals" },
      { en: "Keyword research and search intent", es: "Investigación de palabras clave e intención de búsqueda" },
      { en: "Schema.org structured data and sitemaps", es: "Datos estructurados Schema.org y sitemaps" },
      { en: "Content architecture and an editorial plan", es: "Arquitectura de contenido y plan editorial" },
      { en: "Optimization for AI answer engines (GEO)", es: "Optimización para motores de respuesta con IA (GEO)" },
      { en: "Monthly reports with Search Console and Analytics", es: "Reportes mensuales con Search Console y Analytics" },
    ],
    forWho: {
      en: "Businesses that already have a website but get no traffic, and brands that want to grow without relying only on ads.",
      es: "Negocios que ya tienen web pero no reciben tráfico, y marcas que quieren crecer sin depender solo de anuncios.",
    },
    outcomes: [
      { value: "3–6", label: { en: "months to organic traction", es: "meses para tracción orgánica" } },
      { value: "100%", label: { en: "pages with schema", es: "páginas con schema" } },
    ],
    stack: ["Search Console", "GA4", "Schema.org", "PageSpeed Insights", "llms.txt"],
    timeline: { en: "2-week audit, then an ongoing monthly plan", es: "Auditoría en 2 semanas, plan continuo mensual" },
    viz: "ranks",
  },
  {
    id: "branding",
    file: "brand.css",
    name: { en: "Brand systems", es: "Sistemas de marca" },
    title: { en: "Brands you can use, not just look at", es: "Marcas que puedes usar, no solo mirar" },
    lead: {
      en: "Logo, palette, type and rules turned into an interactive brand kit: your team tries combinations, downloads assets and creates new pieces without breaking the brand.",
      es: "Logo, paleta, tipografía y reglas convertidas en un brand kit interactivo: tu equipo prueba combinaciones, descarga recursos y crea piezas nuevas sin romper la marca.",
    },
    icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
    tone: "green",
    includes: [
      { en: "Logo, wordmark and symbol with approved variants", es: "Logo, wordmark e isotipo con variantes aprobadas" },
      { en: "A palette with a name, role and usage ratio for every color", es: "Paleta con nombre, rol y proporción de uso de cada color" },
      { en: "Type system for web and social", es: "Sistema tipográfico para web y redes" },
      { en: "Interactive web brand kit with a palette playground", es: "Brand kit web interactivo con playground de paleta" },
      { en: "Email signature generator and templates", es: "Generador de firma de correo y plantillas" },
      { en: "Common-mistakes guide and usage rules", es: "Guía de errores comunes y reglas de uso" },
    ],
    forWho: {
      en: "Creators, personal brands and teams that need consistency without a designer for every piece.",
      es: "Creadores, marcas personales y equipos que necesitan consistencia sin depender de un diseñador para cada pieza.",
    },
    outcomes: [
      { value: "3–5", label: { en: "weeks", es: "semanas" } },
      { value: "1", label: { en: "source of truth for your brand", es: "fuente de verdad para tu marca" } },
    ],
    stack: ["Figma", "SVG", "Design tokens", "HTML / CSS", "GitHub Pages"],
    timeline: { en: "3 to 5 weeks", es: "3 a 5 semanas" },
    project: "simply-andy",
    viz: "palette",
  },
];
