import type { L } from "../i18n";

export type Project = {
  slug: string;
  name: string;
  client: L;
  category: L;
  services: string[];
  status: L;
  live: boolean;
  year: string;
  summary: L;
  challenge: L;
  whatWeDid: { title: L; text: L }[];
  impact: L[];
  numbers: { value: string; label: L }[];
  stack: string[];
  links: { label: L; href: string }[];
  images: { src: string; alt: L; kind: "desktop" | "phone" }[];
  icon?: string;
  effect: "palette" | "translate" | "phone";
  accent: string;
  palette: string[];
  repo: string;
};

const testEnv: L = { en: "In staging", es: "En entorno de prueba" };

const list: Project[] = [
  {
    slug: "simply-andy",
    name: "Simply Andy",
    repo: "simply-andy",
    client: { en: "Andreina Luna · UGC Creator", es: "Andreina Luna · UGC Creator" },
    category: { en: "Personal brand · Web · Brand system", es: "Marca personal · Web · Sistema de marca" },
    services: ["branding", "web", "seo"],
    status: testEnv,
    live: false,
    year: "2026",
    summary: {
      en: "Identity, bilingual portfolio and an interactive brand kit for a Spanish-language UGC creator: a visual system she uses herself to play with her palette, her logo and even her email signature.",
      es: "Identidad, portafolio bilingüe y un brand kit interactivo para una creadora de UGC en español: un sistema visual que ella misma usa para jugar con su paleta, su logo y hasta su firma de correo.",
    },
    challenge: {
      en: "Andreina creates Spanish-language UGC for TikTok and Instagram Reels. Her edge is that her content doesn't feel like an ad, but she had no place of her own that carried that voice, and no consistent identity to pitch local and international brands.",
      es: "Andreina crea contenido UGC en español para TikTok e Instagram Reels. Su diferencial es que su contenido no se siente como un anuncio, pero no tenía un lugar propio que transmitiera esa voz ni una identidad coherente para presentarse ante marcas locales e internacionales.",
    },
    whatWeDid: [
      { title: { en: "Logo & wordmark", es: "Logo y wordmark" }, text: { en: "We designed the “andy” wordmark with the UGC CREATOR descriptor and a signature dot, in three approved background combinations.", es: "Diseñamos el wordmark “andy” con el descriptor UGC CREATOR y un punto de firma, en tres combinaciones aprobadas de fondo." } },
      { title: { en: "A palette with names and roles", es: "Paleta con nombre y rol" }, text: { en: "Seven named colors (Eggshell, Cuero, Terracota, Oliva, Tinta, Bordó and Índigo), each with a job and a usage ratio.", es: "Siete colores con nombre propio (Eggshell, Cuero, Terracota, Oliva, Tinta, Bordó e Índigo), cada uno con un trabajo y una proporción de uso." } },
      { title: { en: "Type system", es: "Sistema tipográfico" }, text: { en: "Big Shoulders for headlines and Manrope for reading, with defined hierarchies for web and social.", es: "Big Shoulders para titulares y Manrope para lectura, con jerarquías definidas para web y redes." } },
      { title: { en: "Bilingual portfolio", es: "Portafolio bilingüe" }, text: { en: "A one-page site in Spanish and English with reels, brands, her story and a direct path to contact.", es: "Un sitio de una página en español e inglés con reels, marcas, su historia y un camino directo al contacto." } },
      { title: { en: "Interactive brand kit", es: "Brand kit interactivo" }, text: { en: "Eleven sections with a palette playground, a logo switcher per background, rules, common mistakes and in-context examples.", es: "Once secciones con playground de paleta, selector de logo según fondo, reglas, errores comunes y ejemplos en acción." } },
      { title: { en: "SEO & bilingual indexing", es: "SEO e indexación bilingüe" }, text: { en: "Clean semantic markup, metadata, sitemap and robots.txt so brands searching for Spanish-language UGC can find her portfolio.", es: "Marcado semántico, metadatos, sitemap y robots.txt para que las marcas que buscan UGC en español encuentren su portafolio." } },
      { title: { en: "Email signature generator", es: "Generador de firma de correo" }, text: { en: "Andreina picks approved colors, edits her details and exports a signature ready for Gmail or as HTML.", es: "Andreina elige colores aprobados, edita sus datos y exporta su firma lista para Gmail o en HTML." } },
    ],
    impact: [
      { en: "A brand system Andreina runs on her own: she swaps colors, tests the logo on different backgrounds and creates new pieces without waiting on a designer.", es: "Un sistema de marca que Andreina usa sola: cambia colores, prueba el logo sobre distintos fondos y crea piezas nuevas sin depender de un diseñador." },
      { en: "Her own bilingual home to pitch Spanish-speaking and global brands.", es: "Presencia propia y bilingüe para presentarse ante marcas hispanohablantes y globales." },
      { en: "Consistency in every piece: everything comes from the same color, type and contrast rules.", es: "Consistencia en cada pieza: todo sale de las mismas reglas de color, tipografía y contraste." },
    ],
    numbers: [
      { value: "7", label: { en: "colors with a role", es: "colores con rol" } },
      { value: "3", label: { en: "logo variants", es: "variantes de logo" } },
      { value: "11", label: { en: "brand kit sections", es: "secciones de brand kit" } },
      { value: "2", label: { en: "languages", es: "idiomas" } },
    ],
    stack: ["HTML", "CSS", "JavaScript", "i18n ES/EN", "GitHub Pages"],
    links: [
      { label: { en: "View portfolio", es: "Ver portafolio" }, href: "https://fpdev47.github.io/simply-andy-portfolio/" },
      { label: { en: "View brand kit", es: "Ver brand kit" }, href: "https://fpdev47.github.io/simply-andy-brand-kit/" },
    ],
    images: [
      { src: "projects/simply-andy-portfolio.webp", alt: { en: "Simply Andy portfolio hero with the headline “Hi, I'm Andy, a UGC Content Creator” and a reel card", es: "Portada del portafolio de Simply Andy con el titular “Hi, I'm Andy, a UGC Content Creator” y una tarjeta de reel" }, kind: "desktop" },
      { src: "projects/simply-andy-brand-kit.webp", alt: { en: "Palette section of the Simply Andy brand kit with seven colors and their HEX codes", es: "Sección de paleta del brand kit de Simply Andy con siete colores y sus códigos HEX" }, kind: "desktop" },
      { src: "projects/simply-andy-brand-kit-logo.webp", alt: { en: "Three approved andy logo combinations on Índigo, White and Bordó backgrounds", es: "Tres combinaciones aprobadas del logo andy sobre fondos Índigo, Blanco y Bordó" }, kind: "desktop" },
      { src: "projects/simply-andy-brand-kit-firma.webp", alt: { en: "Email signature generator in the brand kit with color controls", es: "Generador de firma de correo del brand kit con controles de color" }, kind: "desktop" },
    ],
    effect: "palette",
    accent: "#C9824F",
    palette: ["#E9E2D0", "#864C24", "#8F3F23", "#61603A", "#2A2620", "#51091B", "#1F2C44"],
  },
  {
    slug: "your-english-buddy",
    name: "Your English Buddy",
    repo: "your-english-buddy",
    client: { en: "Online English academy", es: "Academia de inglés online" },
    category: { en: "Web · Education", es: "Web · Educación" },
    services: ["web", "seo"],
    status: testEnv,
    live: false,
    year: "2026",
    summary: {
      en: "The website of an academy teaching practical English to Spanish speakers: warm, clear and designed to turn visits into diagnostic classes.",
      es: "El sitio de una academia que enseña inglés práctico a hispanohablantes: cercano, claro y pensado para convertir visitas en clases diagnósticas.",
    },
    challenge: {
      en: "The academy teaches real-life English to Spanish speakers in the US and Latin America. It needed a site that built trust, explained its personalized method and led every visitor to book a diagnostic class.",
      es: "La academia enseña inglés para la vida real a hispanohablantes en Estados Unidos y Latinoamérica. Necesitaba un sitio que transmitiera confianza, explicara su método personalizado y llevara a cada visitante a reservar una clase diagnóstica.",
    },
    whatWeDid: [
      { title: { en: "Site architecture", es: "Arquitectura del sitio" }, text: { en: "Home, About, Blog, Courses and Contact, with a journey that always ends in a clear action.", es: "Inicio, Nosotros, Blog, Cursos y Contacto, con un recorrido que siempre termina en una acción clara." } },
      { title: { en: "Value proposition", es: "Propuesta de valor" }, text: { en: "Messaging focused on personalized classes, at your own pace, with materials available 24/7.", es: "Mensajes centrados en clases personalizadas, a tu ritmo y con material disponible 24/7." } },
      { title: { en: "Real social proof", es: "Prueba social real" }, text: { en: "Reviews from real students in Indianapolis, Florida, Virginia and Texas, quoting phrases they actually use day to day.", es: "Reseñas de estudiantes reales en Indianápolis, Florida, Virginia y Texas con frases que de verdad usan en su día a día." } },
      { title: { en: "Direct conversion", es: "Conversión directa" }, text: { en: "Calls to action toward the diagnostic class and a direct WhatsApp channel.", es: "Llamados a la acción hacia la clase diagnóstica y un canal directo por WhatsApp." } },
      { title: { en: "Friendly identity", es: "Identidad amable" }, text: { en: "Fresh green, a 3D character illustration and floating cards that make learning feel less intimidating.", es: "Verde fresco, ilustración 3D del personaje y tarjetas flotantes que hacen el aprendizaje menos intimidante." } },
    ],
    impact: [
      { en: "A clear funnel: visit, diagnostic class and a WhatsApp conversation.", es: "Un embudo claro: visita, clase diagnóstica y conversación por WhatsApp." },
      { en: "Real testimonials as social proof, with concrete results in students' work and social lives.", es: "Testimonios reales como prueba social, con resultados concretos en el trabajo y la vida social de los estudiantes." },
      { en: "A foundation ready to grow with blog and courses, set up to rank for practical-English searches.", es: "Una base lista para crecer con blog y cursos, preparada para posicionarse en búsquedas de inglés práctico." },
    ],
    numbers: [
      { value: "5", label: { en: "sections", es: "secciones" } },
      { value: "4", label: { en: "real stories", es: "historias reales" } },
      { value: "1", label: { en: "primary CTA", es: "CTA principal" } },
      { value: "24/7", label: { en: "offline materials", es: "material offline" } },
    ],
    stack: ["Vite", "SPA", "Vercel", "Responsive design", "WhatsApp"],
    links: [{ label: { en: "View site", es: "Ver sitio" }, href: "https://fabio-english-academy.vercel.app/" }],
    images: [
      { src: "projects/your-english-buddy.webp", alt: { en: "Your English Buddy hero with the headline “Bienvenido a Your English Buddy” and a 3D character studying", es: "Portada de Your English Buddy con el titular “Bienvenido a Your English Buddy” y un personaje 3D estudiando" }, kind: "desktop" },
      { src: "projects/your-english-buddy-2.webp", alt: { en: "Student reviews section of Your English Buddy", es: "Sección de reseñas de estudiantes de Your English Buddy" }, kind: "desktop" },
    ],
    effect: "translate",
    accent: "#3DDC84",
    palette: ["#185C60", "#C8E47C", "#3DDC84", "#F3F7F6"],
  },
  {
    slug: "lyapp",
    name: "Lyapp",
    repo: "lyapp-ios",
    client: { en: "In-house product · iOS", es: "Producto propio · iOS" },
    category: { en: "iOS app · Family & health", es: "App iOS · Familia y salud" },
    services: ["apps"],
    status: { en: "Live on the App Store", es: "Disponible en App Store" },
    live: true,
    year: "2026",
    summary: {
      en: "The warm, private diary of a baby's first year: sleep, feeds, solids, appointments, vaccines and medications in one iOS app, personalized to their age.",
      es: "El diario cálido y privado del primer año de un bebé: sueño, tomas, sólidos, citas, vacunas y medicación en una sola app iOS, personalizada según la edad.",
    },
    challenge: {
      en: "At 3 a.m. nobody wants to open a spreadsheet. New parents jot down sleep, feeds and appointments in scattered notes and can't tell whether what they see is normal for their baby's age. We wanted something fast to use one-handed, warm and 100% private.",
      es: "A las 3 de la mañana nadie quiere abrir una hoja de cálculo. Madres y padres primerizos anotan sueño, tomas y citas en notas sueltas y no saben si lo que ven es normal para la edad de su bebé. Queríamos algo rápido de usar con una mano, cálido y 100% privado.",
    },
    whatWeDid: [
      { title: { en: "Live sleep timer", es: "Temporizador de sueño en vivo" }, text: { en: "One tap starts a nap or the night. The timer lives on the Lock Screen and in the Dynamic Island with Live Activities.", es: "Un toque para iniciar la siesta o la noche. El temporizador vive en la pantalla de bloqueo y en la Dynamic Island con Live Activities." } },
      { title: { en: "Feeding log", es: "Registro de alimentación" }, text: { en: "Breastfeeding with a per-side stopwatch, bottles with milliliters offered and taken, and solids with foods and amounts.", es: "Pecho con cronómetro por lado, biberón con mililitros ofrecidos y tomados, y sólidos con alimentos y cantidades." } },
      { title: { en: "Summary vs. pediatric ranges", es: "Resumen frente a rangos pediátricos" }, text: { en: "Weekly charts compared with typical ranges by age, based on American Academy of Pediatrics guidelines.", es: "Gráficos semanales comparados con los rangos típicos por edad según las guías de la American Academy of Pediatrics." } },
      { title: { en: "Optional AI coach", es: "Coach con IA opcional" }, text: { en: "Spots patterns in the logs and answers questions only if the user explicitly allows it.", es: "Detecta patrones en los registros y responde preguntas solo si el usuario lo autoriza de forma explícita." } },
      { title: { en: "Health agenda & reports", es: "Agenda de salud y reportes" }, text: { en: "Appointments, vaccines and medication with scheduled doses, plus PDF reports to share with the pediatrician.", es: "Citas, vacunas y medicación con dosis programadas, más reportes PDF para compartir con el pediatra." } },
      { title: { en: "Privacy by design", es: "Privacidad por diseño" }, text: { en: "No accounts, no cloud, no ads and no trackers: all data lives on the phone.", es: "Sin cuentas, sin nube, sin anuncios y sin rastreadores: todos los datos viven en el teléfono." } },
    ],
    impact: [
      { en: "Live on the App Store: version 1.0 on August 29 and version 1.1 on September 21.", es: "Publicada en la App Store: versión 1.0 el 29 de agosto y versión 1.1 el 21 de septiembre." },
      { en: "Version 1.1 added multiple babies, temperature logging with pediatric fever thresholds and a timer with pause.", es: "La versión 1.1 sumó varios bebés, registro de temperatura con umbrales de fiebre pediátricos y temporizador con pausa." },
      { en: "Available in English and Spanish, built for families in any country.", es: "Disponible en inglés y español, pensada para familias de cualquier país." },
    ],
    numbers: [
      { value: "1.1", label: { en: "version shipped", es: "versión publicada" } },
      { value: "0", label: { en: "accounts or trackers", es: "cuentas o rastreadores" } },
      { value: "2", label: { en: "languages", es: "idiomas" } },
      { value: "iOS", label: { en: "React Native", es: "React Native" } },
    ],
    stack: ["React Native", "Live Activities", "Dynamic Island", "PDF", "Optional AI"],
    links: [{ label: { en: "View on the App Store", es: "Ver en App Store" }, href: "https://apps.apple.com/us/app/lyapp-baby-tracker-sleep/id6805567858" }],
    images: [
      { src: "projects/lyapp-hoy.webp", alt: { en: "Lyapp home for Lay at 6 months, with an empty sleep ring and the button to start the timer", es: "Inicio de Lyapp para Lay a los 6 meses, con el anillo de sueño vacío y el botón para iniciar el temporizador" }, kind: "phone" },
      { src: "projects/lyapp-resumen.webp", alt: { en: "Lyapp weekly summary screen with sleep bars compared with the typical range", es: "Pantalla de resumen semanal de Lyapp con barras de sueño comparadas con el rango típico" }, kind: "phone" },
      { src: "projects/lyapp-coach.webp", alt: { en: "Lyapp Coach screen with cards of patterns found in the logs", es: "Pantalla Coach de Lyapp con tarjetas de patrones detectados en los registros" }, kind: "phone" },
    ],
    icon: "projects/lyapp-icon.webp",
    effect: "phone",
    accent: "#E8805A",
    palette: ["#F7F1EA", "#E8805A", "#5B6B95", "#A9C79B"],
  },
];

/** Display order: Lyapp, Simply Andy, Your English Buddy. */
export const projects: Project[] = ["lyapp", "simply-andy", "your-english-buddy"].map((slug) => list.find((p) => p.slug === slug)!);

/** "Your project here" card: one per filter, each with its own call to action. */
export const ctaCards: { key: string; module: string; name: L; category: L; text: L; cta: L; note: L }[] = [
  { key: "all", module: "", name: { en: "Your project here", es: "Tu proyecto aquí" }, category: { en: "App · Web · E-commerce · SaaS", es: "App · Web · E-commerce · SaaS" }, text: { en: "An e-commerce, a SaaS platform, an app or a brand system: this slot is still compiling. It could be yours.", es: "Un e-commerce, una plataforma SaaS, una app o un sistema de marca: este espacio se está compilando. Podría ser el tuyo." }, cta: { en: "Start a project", es: "Iniciar proyecto" }, note: { en: "Booking now", es: "Agenda abierta" } },
  { key: "apps", module: "apps", name: { en: "Your app here", es: "Tu app aquí" }, category: { en: "Mobile apps", es: "Apps móviles" }, text: { en: "From idea to the App Store and Google Play, with the polish of Lyapp.", es: "De la idea a la App Store y Google Play, con el nivel de detalle de Lyapp." }, cta: { en: "Build my app", es: "Construir mi app" }, note: { en: "iOS · Android", es: "iOS · Android" } },
  { key: "web", module: "web", name: { en: "Your website here", es: "Tu web aquí" }, category: { en: "Web development", es: "Desarrollo web" }, text: { en: "A fast website that turns visits into customers, from landing page to platform.", es: "Una web rápida que convierte visitas en clientes, de landing page a plataforma." }, cta: { en: "Launch my website", es: "Lanzar mi web" }, note: { en: "Landing · E-commerce · SaaS", es: "Landing · E-commerce · SaaS" } },
  { key: "seo", module: "seo", name: { en: "Your rankings here", es: "Tu posicionamiento aquí" }, category: { en: "SEO & GEO", es: "SEO & GEO" }, text: { en: "Get found on Google and cited in AI answers. We start with a technical audit.", es: "Que te encuentren en Google y te citen las IA. Empezamos con una auditoría técnica." }, cta: { en: "Get an SEO audit", es: "Pedir auditoría SEO" }, note: { en: "Audit in 2 weeks", es: "Auditoría en 2 semanas" } },
  { key: "branding", module: "branding", name: { en: "Your brand system here", es: "Tu sistema de marca aquí" }, category: { en: "Brand systems", es: "Sistemas de marca" }, text: { en: "A brand kit your team can actually use, like the one we built for Simply Andy.", es: "Un brand kit que tu equipo pueda usar de verdad, como el que hicimos para Simply Andy." }, cta: { en: "Build my brand kit", es: "Crear mi brand kit" }, note: { en: "3–5 weeks", es: "3–5 semanas" } },
];

export const serviceNames: Record<string, L> = {
  apps: { en: "Mobile apps", es: "Apps móviles" },
  web: { en: "Web development", es: "Desarrollo web" },
  seo: { en: "SEO & GEO", es: "SEO & GEO" },
  branding: { en: "Brand systems", es: "Sistemas de marca" },
};
