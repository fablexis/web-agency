export const site = {
  name: "Forklia",
  legalName: "Forklia Studio",
  url: "https://fablexis.github.io/web-agency/",
  email: "hola@vertice.studio",
  whatsapp: "https://wa.me/",
  title: "Forklia — Estudio de apps, webs, SEO y sistemas de marca",
  description:
    "Forklia diseña y desarrolla apps móviles, sitios web, estrategias SEO y sistemas de marca interactivos para marcas de cualquier país, en español e inglés.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
  ],
};

export const nav = [
  { label: "Superpoderes", hint: "soluciones", href: "soluciones/" },
  { label: "En producción", hint: "proyectos", href: "proyectos/" },
  { label: "Mentes detrás", hint: "nosotros", href: "nosotros/" },
  { label: "Bitácora", hint: "blog", href: "blog/" },
];

export const tech = ["Swift", "React", "Next.js", "Astro", "Node.js", "Supabase", "Vercel", "Figma", "Google Search Console", "Schema.org", "OpenAI", "GitHub Actions"];

export const steps = [
  { title: "Descubrimiento", c: "#5EE3FF", text: "Entendemos tu negocio, tus objetivos y a tu audiencia para convertirlos en una especificación clara y accionable.", icon: '<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line>' },
  { title: "Diseño", c: "#B58CFF", text: "Prototipamos la experiencia y la interfaz, validando cada decisión con datos y feedback real.", icon: '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>' },
  { title: "Desarrollo", c: "#7CA0FF", text: "Construimos con código limpio y escalable, con entregas continuas y total transparencia en cada deploy.", icon: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' },
  { title: "Crecimiento", c: "#4BE3A0", text: "Lanzamos, medimos y optimizamos. Posicionamos tu marca y la hacemos crecer mes a mes.", icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>' },
];

export type Testimonial = { q: string; n: string; r: string; i: string; g: string; real?: boolean; project?: string };

export const testimonials: Testimonial[] = [
  {
    q: "Quería una web que se sintiera como yo: cercana, cálida y sin filtro. Forklia no solo la construyó, me dio un sistema de marca con el que juego todos los días, desde mis colores hasta la firma de mi correo.",
    n: "Andreina Luna",
    r: "UGC Creator · Simply Andy",
    i: "AL",
    g: "linear-gradient(120deg,#864C24,#E9E2D0)",
    real: true,
    project: "simply-andy",
  },
  { q: "Nuestra tienda por fin se ve tan premium como nuestro producto, y carga en un segundo desde el celular.", n: "Fundadora", r: "Marca de skincare · E-commerce", i: "SK", g: "linear-gradient(120deg,#45E0FF,#9B6BFF)" },
  { q: "Pasamos de una app que nadie abría a una que nuestros clientes usan cada mañana para pedir su café.", n: "Head of Product", r: "Cadena de café de especialidad · App", i: "CF", g: "linear-gradient(120deg,#9B6BFF,#3B6BFF)" },
  { q: "El SEO técnico que hicieron nos puso en el top 3 para las búsquedas que de verdad traen clientes.", n: "Director comercial", r: "Clínica dental · Web + SEO", i: "CD", g: "linear-gradient(120deg,#3B6BFF,#45E0FF)" },
  { q: "Nos entregaron un design system que nuestro equipo interno puede extender sin romper nada.", n: "CTO", r: "Startup fintech · Sistema de marca", i: "FT", g: "linear-gradient(120deg,#4BE3A0,#45E0FF)" },
  { q: "Trabajamos desde tres zonas horarias distintas y nunca se sintió así. Comunicación impecable.", n: "COO", r: "SaaS B2B · Plataforma web", i: "SB", g: "linear-gradient(120deg,#9B6BFF,#45E0FF)" },
];

export const faqs = [
  { q: "¿Trabajan con clientes de cualquier país?", a: "Sí. Somos un estudio 100% remoto y trabajamos con marcas de cualquier país, en español o en inglés. No importa dónde estés: adaptamos reuniones a tu zona horaria y aseguramos al menos unas horas de solapamiento diario." },
  { q: "¿Cómo nos comunicamos si estamos en zonas horarias distintas?", a: "Una llamada semanal de seguimiento, un canal directo (Slack, WhatsApp o el que prefieras) y actualizaciones por escrito en cada entrega. Respondemos en menos de 24 horas hábiles." },
  { q: "¿En qué moneda cotizan y cómo se paga desde otro país?", a: "Cotizamos en dólares estadounidenses y aceptamos pagos internacionales por transferencia, tarjeta o plataformas como Wise o PayPal. Trabajamos con un anticipo y pagos por hitos claros." },
  { q: "¿Cuánto tarda un proyecto típico?", a: "Una landing de alto impacto toma de 2 a 3 semanas; un sitio corporativo o e-commerce, de 4 a 8; un sistema de marca, de 3 a 5; una app móvil o plataforma a medida, de 8 a 16 semanas. Te damos un calendario detallado desde la propuesta." },
  { q: "¿Cómo se define el presupuesto?", a: "Después de una llamada de descubrimiento gratuita te enviamos una propuesta con alcance, entregables y precio cerrado en menos de 48 horas. Sin letra pequeña ni cobros sorpresa." },
  { q: "¿Necesito tener todo definido para empezar?", a: "No. Muchos proyectos empiezan con una idea y una necesidad. La fase de descubrimiento existe justamente para convertirla en un plan concreto contigo." },
  { q: "¿El código, los diseños y las cuentas son míos?", a: "Sí. Al cerrar el proyecto te transferimos el repositorio, los archivos de diseño, los dominios y todos los accesos. Nada queda atado a nosotros." },
  { q: "¿Firman acuerdos de confidencialidad?", a: "Sí, firmamos un NDA antes de conocer los detalles de tu idea si lo necesitas." },
  { q: "¿Qué pasa después del lanzamiento?", a: "Ofrecemos planes mensuales de evolución: SEO continuo, mejoras de conversión, nuevas funcionalidades y soporte técnico con tiempos de respuesta garantizados." },
];

export const founders = [
  {
    name: "Fabian Pernía",
    initials: "Fabian",
    photo: "team/fabian-pernia.webp",
    role: "Co-founder · Full Stack Engineer",
    bio: "Diseña la arquitectura de cada producto de punta a punta: desde la base de datos hasta la última microinteracción. Rendimiento, código limpio y sistemas que escalan sin drama.",
    skills: ["TypeScript", "React / Next.js", "Node.js", "Cloud & DevOps"],
    accent: "cyan",
  },
  {
    name: "Fabio Pernía",
    initials: "Fabio",
    photo: "team/fabio-pernia.webp",
    role: "Co-founder · Creative Director & Head of Sales",
    bio: "Define cómo se ve, se siente y se vende cada proyecto. Traduce objetivos de negocio en marcas memorables, experiencias que convierten y relaciones de largo plazo con cada cliente.",
    skills: ["Dirección creativa", "Branding", "Estrategia comercial", "Growth"],
    accent: "violet",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  hue: number;
  placeholder?: boolean;
};

export const posts: Post[] = [
  {
    slug: "como-lanzar-un-mvp-en-30-dias",
    title: "Cómo lanzar un MVP en 30 días sin sacrificar calidad",
    excerpt: "El framework que usamos para pasar de idea a producto en producción, con alcance claro y cero sorpresas.",
    category: "Producto",
    date: "2026-09-18",
    readTime: "6 min",
    author: "Fabian Pernía",
    hue: 190,
    placeholder: true,
  },
  {
    slug: "seo-tecnico-en-2026",
    title: "SEO técnico en 2026: lo que realmente mueve la aguja",
    excerpt: "Core Web Vitals, contenido para motores de respuesta y arquitectura de información explicados sin humo.",
    category: "SEO",
    date: "2026-09-04",
    readTime: "8 min",
    author: "Fabio Pernía",
    hue: 262,
    placeholder: true,
  },
  {
    slug: "microinteracciones-que-venden",
    title: "Microinteracciones que venden: diseño con intención",
    excerpt: "Pequeños detalles de movimiento que aumentan la confianza, la retención y la conversión.",
    category: "Diseño",
    date: "2026-08-21",
    readTime: "5 min",
    author: "Fabio Pernía",
    hue: 225,
    placeholder: true,
  },
  {
    slug: "stack-moderno-para-startups",
    title: "El stack moderno que recomendamos a startups",
    excerpt: "Qué elegimos, por qué, y cuándo tiene sentido romper la regla.",
    category: "Ingeniería",
    date: "2026-08-07",
    readTime: "7 min",
    author: "Fabian Pernía",
    hue: 170,
    placeholder: true,
  },
  {
    slug: "de-visitas-a-clientes",
    title: "De visitas a clientes: anatomía de un embudo que convierte",
    excerpt: "Cómo alinear marca, contenido y producto para que cada visita tenga un siguiente paso claro.",
    category: "Growth",
    date: "2026-07-24",
    readTime: "6 min",
    author: "Fabio Pernía",
    hue: 280,
    placeholder: true,
  },
  {
    slug: "apps-que-se-sienten-vivas",
    title: "Apps que se sienten vivas: estados, feedback y ritmo",
    excerpt: "Principios de motion para interfaces móviles que la gente disfruta usar todos los días.",
    category: "Mobile",
    date: "2026-07-10",
    readTime: "5 min",
    author: "Fabian Pernía",
    hue: 205,
    placeholder: true,
  },
];

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
