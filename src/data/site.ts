import type { L, Lang } from "../i18n";

export const site = {
  name: "Forklia",
  legalName: "Forklia Studio",
  url: "https://fablexis.github.io/web-agency/",
  email: "hola@vertice.studio",
  whatsapp: "https://wa.me/",
  title: {
    en: "Forklia — App, web, SEO & brand system studio",
    es: "Forklia — Estudio de apps, webs, SEO y sistemas de marca",
  } as L,
  description: {
    en: "Forklia designs and codes mobile apps, websites, SEO strategies and interactive brand systems for teams anywhere in the world, in English and Spanish.",
    es: "Forklia diseña y programa apps móviles, sitios web, estrategias SEO y sistemas de marca interactivos para equipos de cualquier país, en español e inglés.",
  } as L,
  socials: [
    { label: "LinkedIn", handle: "/company/forklia", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", handle: "@forklia", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "TikTok", handle: "@forklia", href: "https://www.tiktok.com/", icon: "tiktok" },
  ],
};

export const tech = ["React Native", "React", "Next.js", "Astro", "Node.js", "Supabase", "Vercel", "Figma", "Google Search Console", "Schema.org", "OpenAI", "GitHub Actions"];

export const steps = [
  { title: { en: "Discovery", es: "Descubrimiento" }, c: "#5EE3FF", text: { en: "We learn your business, goals and audience and turn them into a clear, actionable spec.", es: "Entendemos tu negocio, tus objetivos y a tu audiencia para convertirlos en una especificación clara y accionable." }, icon: '<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line>' },
  { title: { en: "Design", es: "Diseño" }, c: "#B58CFF", text: { en: "We prototype the experience and the interface, validating every decision with data and real feedback.", es: "Prototipamos la experiencia y la interfaz, validando cada decisión con datos y feedback real." }, icon: '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>' },
  { title: { en: "Build", es: "Desarrollo" }, c: "#7CA0FF", text: { en: "We write clean, scalable code with continuous delivery and full transparency on every deploy.", es: "Construimos con código limpio y escalable, con entregas continuas y total transparencia en cada deploy." }, icon: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' },
  { title: { en: "Growth", es: "Crecimiento" }, c: "#4BE3A0", text: { en: "We launch, measure and optimize, growing your brand month after month.", es: "Lanzamos, medimos y optimizamos. Posicionamos tu marca y la hacemos crecer mes a mes." }, icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>' },
];

export type Testimonial = { q: L; n: L; r: L; seed: number; colors: string[]; real?: boolean; project?: string; sha: string };

export const testimonials: Testimonial[] = [
  {
    q: {
      en: "I wanted a website that felt like me: close, warm and unfiltered. Forklia didn't just build it, they gave me a brand system I play with every day, from my colors to my email signature.",
      es: "Quería una web que se sintiera como yo: cercana, cálida y sin filtro. Forklia no solo la construyó, me dio un sistema de marca con el que juego todos los días, desde mis colores hasta la firma de mi correo.",
    },
    n: { en: "Andreina Luna", es: "Andreina Luna" },
    r: { en: "UGC Creator · Simply Andy", es: "UGC Creator · Simply Andy" },
    seed: 7,
    colors: ["#E9E2D0", "#864C24", "#51091B"],
    real: true,
    project: "simply-andy",
    sha: "a17f3c9",
  },
  {
    q: { en: "Our store finally looks as premium as our product, and it loads in a second on mobile.", es: "Nuestra tienda por fin se ve tan premium como nuestro producto, y carga en un segundo desde el celular." },
    n: { en: "Founder", es: "Fundadora" },
    r: { en: "Skincare brand · E-commerce", es: "Marca de skincare · E-commerce" },
    seed: 3,
    colors: ["#45E0FF", "#9B6BFF", "#E8E4F0"],
    sha: "4be21d0",
  },
  {
    q: { en: "We went from an app nobody opened to one our customers use every morning to order their coffee.", es: "Pasamos de una app que nadie abría a una que nuestros clientes usan cada mañana para pedir su café." },
    n: { en: "Head of Product", es: "Head of Product" },
    r: { en: "Specialty coffee chain · App", es: "Cadena de café de especialidad · App" },
    seed: 11,
    colors: ["#9B6BFF", "#3B6BFF", "#F2D3B3"],
    sha: "9c0a7e2",
  },
  {
    q: { en: "Their technical SEO put us in the top 3 for the searches that actually bring in patients.", es: "El SEO técnico que hicieron nos puso en el top 3 para las búsquedas que de verdad traen pacientes." },
    n: { en: "Commercial director", es: "Director comercial" },
    r: { en: "Dental clinic · Web + SEO", es: "Clínica dental · Web + SEO" },
    seed: 5,
    colors: ["#3B6BFF", "#45E0FF", "#D9E6FF"],
    sha: "e31b58f",
  },
  {
    q: { en: "They delivered a design system our in-house team can extend without breaking anything.", es: "Nos entregaron un design system que nuestro equipo interno puede extender sin romper nada." },
    n: { en: "CTO", es: "CTO" },
    r: { en: "Fintech startup · Brand system", es: "Startup fintech · Sistema de marca" },
    seed: 13,
    colors: ["#4BE3A0", "#45E0FF", "#DFF7EC"],
    sha: "06d9f44",
  },
  {
    q: { en: "We worked across three time zones and it never felt like it. Flawless communication.", es: "Trabajamos desde tres zonas horarias distintas y nunca se sintió así. Comunicación impecable." },
    n: { en: "COO", es: "COO" },
    r: { en: "B2B SaaS · Web platform", es: "SaaS B2B · Plataforma web" },
    seed: 2,
    colors: ["#B58CFF", "#45E0FF", "#ECE3FF"],
    sha: "7f88b31",
  },
];

export const faqs = [
  {
    q: { en: "Do you work with clients outside your country?", es: "¿Trabajan con clientes fuera de su país?" },
    a: {
      en: "Yes. We're fully remote and work with brands anywhere, in English or Spanish. We plan meetings around your time zone and keep a few overlapping hours every working day.",
      es: "Sí. Somos un estudio 100% remoto y trabajamos con marcas de cualquier país, en español o en inglés. Planificamos las reuniones según tu zona horaria y mantenemos unas horas en común cada día hábil.",
    },
  },
  {
    q: { en: "How long does a project take?", es: "¿Cuánto tarda un proyecto?" },
    a: {
      en: "It depends on what we're building and what you need from it. A focused landing page can go live in a couple of weeks; an app or a custom platform takes a few months. After the discovery call we give you a timeline built around your scope and your deadlines, not a generic estimate.",
      es: "Depende de lo que vamos a construir y de lo que necesitas lograr con ello. Una landing enfocada puede estar en línea en un par de semanas; una app o una plataforma a medida toma algunos meses. Después de la llamada de descubrimiento te damos un calendario hecho a la medida de tu alcance y tus fechas, no un estimado genérico.",
    },
  },
  {
    q: { en: "What currency do you quote in?", es: "¿En qué moneda cotizan?" },
    a: {
      en: "We quote in US dollars. Clients in Colombia and Argentina can also pay in Colombian pesos (COP) or Argentine pesos (ARS), converted at the US dollar exchange rate on the day of each payment.",
      es: "Cotizamos en dólares estadounidenses (USD). Si estás en Colombia o Argentina también puedes pagar en pesos colombianos (COP) o pesos argentinos (ARS), convertidos según la cotización del dólar en tu país el día de cada pago.",
    },
  },
  {
    q: { en: "How do payments work?", es: "¿Cómo funcionan los pagos?" },
    a: {
      en: "A deposit to book the start date, then payments tied to milestones you can see and approve. We accept bank transfers, cards and platforms like Wise or PayPal.",
      es: "Un anticipo para reservar la fecha de inicio y luego pagos ligados a entregas que puedes ver y aprobar. Aceptamos transferencias, tarjetas y plataformas como Wise o PayPal.",
    },
  },
  {
    q: { en: "How is the price defined?", es: "¿Cómo se define el precio?" },
    a: {
      en: "After a free 30-minute call we send a proposal with scope, deliverables, timeline and a fixed price in under 48 hours. If the scope changes later, we quote the change before doing it.",
      es: "Después de una llamada gratuita de 30 minutos te enviamos en menos de 48 horas una propuesta con alcance, entregables, calendario y precio cerrado. Si el alcance cambia después, cotizamos el cambio antes de hacerlo.",
    },
  },
  {
    q: { en: "I only have an idea. Is that enough?", es: "Solo tengo una idea. ¿Es suficiente?" },
    a: {
      en: "Yes. Most projects start that way. Discovery is where we turn the idea into a concrete plan with you: who it's for, what the first version needs, and what can wait.",
      es: "Sí, la mayoría de los proyectos empieza así. En el descubrimiento convertimos la idea en un plan concreto contigo: para quién es, qué necesita la primera versión y qué puede esperar.",
    },
  },
  {
    q: { en: "How will I follow the progress?", es: "¿Cómo voy a seguir el avance?" },
    a: {
      en: "A short weekly call, a direct channel (Slack, WhatsApp or whatever you use) and a staging link that updates with every delivery, so you can try the work as it grows.",
      es: "Una llamada corta cada semana, un canal directo (Slack, WhatsApp o el que uses) y un enlace de prueba que se actualiza en cada entrega, para que pruebes el trabajo mientras crece.",
    },
  },
  {
    q: { en: "Who owns the code, designs and accounts?", es: "¿De quién son el código, los diseños y las cuentas?" },
    a: {
      en: "You do. At handover you get the repository, design files, domains and every access. Nothing stays tied to us. We sign an NDA before you share details if you need one.",
      es: "Tuyos. Al entregar recibes el repositorio, los archivos de diseño, los dominios y todos los accesos. Nada queda atado a nosotros. Si lo necesitas, firmamos un NDA antes de que nos cuentes los detalles.",
    },
  },
  {
    q: { en: "What happens after launch?", es: "¿Qué pasa después del lanzamiento?" },
    a: {
      en: "You can keep us on a monthly plan for SEO, improvements, new features and support with agreed response times, or take it in-house. Either way we document everything so your team isn't left guessing.",
      es: "Puedes seguir con nosotros en un plan mensual de SEO, mejoras, nuevas funciones y soporte con tiempos de respuesta acordados, o llevarlo a tu equipo. En ambos casos documentamos todo para que nadie tenga que adivinar.",
    },
  },
];

export const founders = [
  {
    name: "Fabian Pernía",
    initials: "Fabian",
    photo: "team/fabian-pernia.webp",
    sha: "f4b1a2e",
    role: { en: "Co-founder · Full Stack Engineer", es: "Co-founder · Full Stack Engineer" },
    jobTitle: "Full Stack Engineer",
    bio: {
      en: "Architects every product end to end, from the database to the last micro-interaction. Performance, clean code and systems that scale without drama.",
      es: "Diseña la arquitectura de cada producto de punta a punta: desde la base de datos hasta la última microinteracción. Rendimiento, código limpio y sistemas que escalan sin drama.",
    },
    skills: { en: ["TypeScript", "React / Next.js", "Node.js", "Cloud & DevOps"], es: ["TypeScript", "React / Next.js", "Node.js", "Cloud & DevOps"] },
    accent: "cyan",
  },
  {
    name: "Fabio Pernía",
    initials: "Fabio",
    photo: "team/fabio-pernia.webp",
    sha: "0fa8c3d",
    role: { en: "Co-founder · Creative Director & Head of Sales", es: "Co-founder · Creative Director & Head of Sales" },
    jobTitle: "Creative Director & Head of Sales",
    bio: {
      en: "Defines how every project looks, feels and sells. Turns business goals into memorable brands, experiences that convert and long-term client relationships.",
      es: "Define cómo se ve, se siente y se vende cada proyecto. Traduce objetivos de negocio en marcas memorables, experiencias que convierten y relaciones de largo plazo con cada cliente.",
    },
    skills: { en: ["Creative direction", "Branding", "Sales strategy", "Growth"], es: ["Dirección creativa", "Branding", "Estrategia comercial", "Growth"] },
    accent: "violet",
  },
];

export type Post = {
  slug: L;
  title: L;
  excerpt: L;
  category: L;
  date: string;
  readTime: string;
  author: string;
  hue: number;
  placeholder?: boolean;
};

export const posts: Post[] = [
  { slug: { en: "launch-an-mvp-in-30-days", es: "como-lanzar-un-mvp-en-30-dias" }, title: { en: "How to launch an MVP in 30 days without cutting corners", es: "Cómo lanzar un MVP en 30 días sin sacrificar calidad" }, excerpt: { en: "The framework we use to go from idea to production with clear scope and zero surprises.", es: "El framework que usamos para pasar de idea a producto en producción, con alcance claro y cero sorpresas." }, category: { en: "Product", es: "Producto" }, date: "2026-09-18", readTime: "6 min", author: "Forklia", hue: 190 },
  { slug: { en: "technical-seo-in-2026", es: "seo-tecnico-en-2026" }, title: { en: "Technical SEO in 2026: what actually moves the needle", es: "SEO técnico en 2026: lo que realmente mueve la aguja" }, excerpt: { en: "Core Web Vitals, content for answer engines and information architecture, minus the hype.", es: "Core Web Vitals, contenido para motores de respuesta y arquitectura de información explicados sin humo." }, category: { en: "SEO", es: "SEO" }, date: "2026-09-04", readTime: "8 min", author: "Forklia", hue: 262 },
  { slug: { en: "micro-interactions-that-sell", es: "microinteracciones-que-venden" }, title: { en: "Micro-interactions that sell: designing with intent", es: "Microinteracciones que venden: diseño con intención" }, excerpt: { en: "Small motion details that build trust, retention and conversion.", es: "Pequeños detalles de movimiento que aumentan la confianza, la retención y la conversión." }, category: { en: "Design", es: "Diseño" }, date: "2026-08-21", readTime: "5 min", author: "Forklia", hue: 225 },
  { slug: { en: "modern-stack-for-startups", es: "stack-moderno-para-startups" }, title: { en: "The modern stack we recommend to startups", es: "El stack moderno que recomendamos a startups" }, excerpt: { en: "What we pick, why, and when it makes sense to break the rule.", es: "Qué elegimos, por qué, y cuándo tiene sentido romper la regla." }, category: { en: "Engineering", es: "Ingeniería" }, date: "2026-08-07", readTime: "7 min", author: "Forklia", hue: 170 },
  { slug: { en: "from-visits-to-customers", es: "de-visitas-a-clientes" }, title: { en: "From visits to customers: anatomy of a funnel that converts", es: "De visitas a clientes: anatomía de un embudo que convierte" }, excerpt: { en: "How to align brand, content and product so every visit has a clear next step.", es: "Cómo alinear marca, contenido y producto para que cada visita tenga un siguiente paso claro." }, category: { en: "Growth", es: "Growth" }, date: "2026-07-24", readTime: "6 min", author: "Forklia", hue: 280 },
  { slug: { en: "apps-that-feel-alive", es: "apps-que-se-sienten-vivas" }, title: { en: "Apps that feel alive: states, feedback and rhythm", es: "Apps que se sienten vivas: estados, feedback y ritmo" }, excerpt: { en: "Motion principles for mobile interfaces people enjoy using every day.", es: "Principios de motion para interfaces móviles que la gente disfruta usar todos los días." }, category: { en: "Mobile", es: "Mobile" }, date: "2026-07-10", readTime: "5 min", author: "Forklia", hue: 205 },
];

export const formatDate = (iso: string, lang: Lang = "en") =>
  new Date(iso + "T12:00:00").toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { day: "numeric", month: "short", year: "numeric" });
