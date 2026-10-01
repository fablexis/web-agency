export type Project = {
  slug: string;
  name: string;
  client: string;
  category: string;
  services: string[];
  status: string;
  live: boolean;
  year: string;
  summary: string;
  challenge: string;
  whatWeDid: { title: string; text: string }[];
  impact: string[];
  numbers: { value: string; label: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  images: { src: string; alt: string; kind: "desktop" | "phone" }[];
  icon?: string;
  effect: "palette" | "translate" | "phone";
  accent: string;
  palette: string[];
};

export const projects: Project[] = [
  {
    slug: "simply-andy",
    name: "Simply Andy",
    client: "Andreina Luna · UGC Creator",
    category: "Marca personal · Web · Sistema de marca",
    services: ["branding", "web"],
    status: "En entorno de prueba",
    live: false,
    year: "2026",
    summary:
      "Identidad, portafolio bilingüe y un brand kit interactivo para una creadora de UGC en español: un sistema visual que ella misma usa para jugar con su paleta, su logo y hasta su firma de correo.",
    challenge:
      "Andreina crea contenido UGC en español para TikTok e Instagram Reels. Su diferencial es que su contenido no se siente como un anuncio, pero no tenía un lugar propio que transmitiera esa voz ni una identidad coherente para presentarse ante marcas locales e internacionales.",
    whatWeDid: [
      { title: "Logo y wordmark", text: "Diseñamos el wordmark “andy” con el descriptor UGC CREATOR y un punto de firma, en tres combinaciones aprobadas de fondo." },
      { title: "Paleta con nombre y rol", text: "Siete colores con nombre propio (Eggshell, Cuero, Terracota, Oliva, Tinta, Bordó e Índigo), cada uno con un trabajo y una proporción de uso." },
      { title: "Sistema tipográfico", text: "Big Shoulders para titulares y Manrope para lectura, con jerarquías definidas para web y redes." },
      { title: "Portafolio bilingüe", text: "Un sitio de una página en español e inglés con reels, marcas, su historia y un camino directo al contacto." },
      { title: "Brand kit interactivo", text: "Once secciones con playground de paleta, selector de logo según fondo, reglas, errores comunes y ejemplos en acción." },
      { title: "Generador de firma de correo", text: "Andreina elige colores aprobados, edita sus datos y exporta su firma lista para Gmail o en HTML." },
    ],
    impact: [
      "Un sistema de marca que Andreina usa sola: cambia colores, prueba el logo sobre distintos fondos y crea piezas nuevas sin depender de un diseñador.",
      "Presencia propia y bilingüe para presentarse ante marcas hispanohablantes y globales.",
      "Consistencia en cada pieza: todo sale de las mismas reglas de color, tipografía y contraste.",
    ],
    numbers: [
      { value: "7", label: "colores con rol" },
      { value: "3", label: "variantes de logo" },
      { value: "11", label: "secciones de brand kit" },
      { value: "2", label: "idiomas" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "i18n ES/EN", "GitHub Pages"],
    links: [
      { label: "Ver portafolio", href: "https://fpdev47.github.io/simply-andy-portfolio/" },
      { label: "Ver brand kit", href: "https://fpdev47.github.io/simply-andy-brand-kit/" },
    ],
    images: [
      { src: "projects/simply-andy-portfolio.webp", alt: "Portada del portafolio de Simply Andy con el titular “Hi, I'm Andy, a UGC Content Creator” y una tarjeta de reel", kind: "desktop" },
      { src: "projects/simply-andy-brand-kit.webp", alt: "Sección de paleta del brand kit de Simply Andy con siete colores y sus códigos HEX", kind: "desktop" },
      { src: "projects/simply-andy-brand-kit-logo.webp", alt: "Tres combinaciones aprobadas del logo andy sobre fondos Índigo, Blanco y Bordó", kind: "desktop" },
      { src: "projects/simply-andy-brand-kit-firma.webp", alt: "Generador de firma de correo del brand kit con controles de color", kind: "desktop" },
    ],
    effect: "palette",
    accent: "#C9824F",
    palette: ["#E9E2D0", "#864C24", "#8F3F23", "#61603A", "#2A2620", "#51091B", "#1F2C44"],
  },
  {
    slug: "your-english-buddy",
    name: "Your English Buddy",
    client: "Academia de inglés online",
    category: "Web · Educación",
    services: ["web", "seo"],
    status: "En entorno de prueba",
    live: false,
    year: "2026",
    summary:
      "El sitio de una academia que enseña inglés práctico a hispanohablantes: cercano, claro y pensado para convertir visitas en clases diagnósticas.",
    challenge:
      "La academia enseña inglés para la vida real a hispanohablantes en Estados Unidos y Latinoamérica. Necesitaba un sitio que transmitiera confianza, explicara su método personalizado y llevara a cada visitante a reservar una clase diagnóstica.",
    whatWeDid: [
      { title: "Arquitectura del sitio", text: "Inicio, Nosotros, Blog, Cursos y Contacto, con un recorrido que siempre termina en una acción clara." },
      { title: "Propuesta de valor", text: "Mensajes centrados en clases personalizadas, a tu ritmo y con material disponible 24/7." },
      { title: "Prueba social real", text: "Reseñas de estudiantes reales en Indianápolis, Florida, Virginia y Texas con frases que de verdad usan en su día a día." },
      { title: "Conversión directa", text: "Llamados a la acción hacia la clase diagnóstica y un canal directo por WhatsApp." },
      { title: "Identidad amable", text: "Verde fresco, ilustración 3D del personaje y tarjetas flotantes que hacen el aprendizaje menos intimidante." },
    ],
    impact: [
      "Un embudo claro: visita, clase diagnóstica y conversación por WhatsApp.",
      "Testimonios reales como prueba social, con resultados concretos en el trabajo y la vida social de los estudiantes.",
      "Una base lista para crecer con blog y cursos, preparada para posicionarse en búsquedas de inglés práctico.",
    ],
    numbers: [
      { value: "5", label: "secciones" },
      { value: "4", label: "historias reales" },
      { value: "1", label: "CTA principal" },
      { value: "24/7", label: "material offline" },
    ],
    stack: ["Vite", "SPA", "Vercel", "Diseño responsivo", "WhatsApp"],
    links: [{ label: "Ver sitio", href: "https://fabio-english-academy.vercel.app/" }],
    images: [
      { src: "projects/your-english-buddy.webp", alt: "Portada de Your English Buddy con el titular “Bienvenido a Your English Buddy” y un personaje 3D estudiando", kind: "desktop" },
      { src: "projects/your-english-buddy-2.webp", alt: "Sección de reseñas de estudiantes de Your English Buddy", kind: "desktop" },
    ],
    effect: "translate",
    accent: "#3DDC84",
    palette: ["#185C60", "#C8E47C", "#3DDC84", "#F3F7F6"],
  },
  {
    slug: "lyapp",
    name: "Lyapp",
    client: "Producto propio · iOS",
    category: "App iOS · Familia y salud",
    services: ["apps"],
    status: "Disponible en App Store",
    live: true,
    year: "2026",
    summary:
      "El diario cálido y privado del primer año de un bebé: sueño, tomas, sólidos, citas, vacunas y medicación en una sola app iOS, personalizada según la edad.",
    challenge:
      "A las 3 de la mañana nadie quiere abrir una hoja de cálculo. Madres y padres primerizos anotan sueño, tomas y citas en notas sueltas y no saben si lo que ven es normal para la edad de su bebé. Queríamos algo rápido de usar con una mano, cálido y 100% privado.",
    whatWeDid: [
      { title: "Temporizador de sueño en vivo", text: "Un toque para iniciar la siesta o la noche. El temporizador vive en la pantalla de bloqueo y en la Dynamic Island con Live Activities." },
      { title: "Registro de alimentación", text: "Pecho con cronómetro por lado, biberón con mililitros ofrecidos y tomados, y sólidos con alimentos y cantidades." },
      { title: "Resumen frente a rangos pediátricos", text: "Gráficos semanales comparados con los rangos típicos por edad según las guías de la American Academy of Pediatrics." },
      { title: "Coach con IA opcional", text: "Detecta patrones en los registros y responde preguntas solo si el usuario lo autoriza de forma explícita." },
      { title: "Agenda de salud y reportes", text: "Citas, vacunas y medicación con dosis programadas, más reportes PDF para compartir con el pediatra." },
      { title: "Privacidad por diseño", text: "Sin cuentas, sin nube, sin anuncios y sin rastreadores: todos los datos viven en el teléfono." },
    ],
    impact: [
      "Publicada en la App Store: versión 1.0 el 29 de agosto y versión 1.1 el 21 de septiembre.",
      "La versión 1.1 sumó varios bebés, registro de temperatura con umbrales de fiebre pediátricos y temporizador con pausa.",
      "Disponible en inglés y español, pensada para familias de cualquier país.",
    ],
    numbers: [
      { value: "1.1", label: "versión publicada" },
      { value: "0", label: "cuentas o rastreadores" },
      { value: "2", label: "idiomas" },
      { value: "iOS", label: "nativa" },
    ],
    stack: ["iOS nativo", "Live Activities", "Dynamic Island", "PDF", "IA opcional"],
    links: [{ label: "Ver en App Store", href: "https://apps.apple.com/us/app/lyapp-baby-tracker-sleep/id6805567858" }],
    images: [
      { src: "projects/lyapp-hoy.webp", alt: "Pantalla de inicio de Lyapp con el anillo de sueño de 12.5 horas y el botón para iniciar el temporizador", kind: "phone" },
      { src: "projects/lyapp-resumen.webp", alt: "Pantalla de resumen semanal de Lyapp con barras de sueño comparadas con el rango típico", kind: "phone" },
      { src: "projects/lyapp-coach.webp", alt: "Pantalla Coach de Lyapp con tarjetas de patrones detectados en los registros", kind: "phone" },
    ],
    icon: "projects/lyapp-icon.webp",
    effect: "phone",
    accent: "#E8805A",
    palette: ["#F7F1EA", "#E8805A", "#5B6B95", "#A9C79B"],
  },
];

export const upcoming = [
  { name: "Tu e-commerce aquí", category: "Web · E-commerce", note: "Agenda abierta" },
  { name: "Proyecto en desarrollo", category: "Plataforma SaaS", note: "Bajo NDA · próximamente" },
];

export const serviceNames: Record<string, string> = {
  apps: "Apps móviles",
  web: "Desarrollo web",
  seo: "SEO & GEO",
  branding: "Sistemas de marca",
};
