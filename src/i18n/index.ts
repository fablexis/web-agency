export type Lang = "en" | "es";
export const langs: Lang[] = ["en", "es"];
export type L<T = string> = { en: T; es: T };

const isL = (v: unknown): v is L<unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 2 && "en" in (v as object) && "es" in (v as object);

/** Deep-resolves every { en, es } leaf in a value to the requested language. */
export function loc<T>(value: T, lang: Lang): any {
  if (isL(value)) return loc((value as any)[lang], lang);
  if (Array.isArray(value)) return value.map((v) => loc(v, lang));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, loc(v, lang)]));
  return value;
}

export const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");

const R = {
  home: { en: "", es: "es/" },
  services: { en: "services/", es: "es/servicios/" },
  work: { en: "work/", es: "es/proyectos/" },
  about: { en: "about/", es: "es/nosotros/" },
  blog: { en: "blog/", es: "es/blog/" },
  start: { en: "start/", es: "es/cotizar/" },
} as const;
export type RouteKey = keyof typeof R;

/** Base-relative path (no leading slash) for a route in a language. */
export function route(key: RouteKey | "case" | "post", lang: Lang, slug?: string): string {
  if (key === "case") return `${R.work[lang]}${slug}/`;
  if (key === "post") return `${R.blog[lang]}${slug}/`;
  return R[key][lang];
}
export const href = (key: RouteKey | "case" | "post", lang: Lang, slug?: string) => base + route(key, lang, slug);

export const ui = {
  en: {
    locale: "en_US",
    htmlLang: "en",
    skip: "Skip to content",
    home: "Home",
    start: "Start a project",
    menuOpen: "Open menu",
    paletteOpen: "Open command palette",
    palettePlaceholder: "Search a page, project or action…",
    paletteGroups: { popular: "Popular", pages: "Pages", modules: "Modules", deploys: "Deploys", actions: "Actions" },
    paletteNav: "navigate",
    paletteOpenHint: "open",
    copyEmail: "Copy email",
    whatsapp: "Message on WhatsApp",
    faqLabel: "FAQ & pricing",
    switchTo: "Español",
    switchLabel: "Ver el sitio en español",
    footerBlurb: "We design and code digital products for teams anywhere in the world.",
    footerCols: { studio: "// studio", resources: "// resources", contact: "// contact" },
    process: "Process",
    faq: "FAQ",
    rights: "All rights reserved.",
    commit: 'git commit -m "shipped from any time zone"',
    followUs: "Follow the build",
    loader: "compiling forklia",
    ctaTitle: 'Ready to take your brand to the <span class="grad-text">next level</span>?',
    ctaText: "Tell us your idea from anywhere in the world and get a no-strings proposal in under 48 hours.",
    ctaPrimary: "Start a project",
    ctaWhatsapp: "Chat on WhatsApp",
    ctaNote: "We reply in under 24h",
    seeAll: "See all",
    readPost: "Read article",
    viewCase: "View case",
    placeholderImg: "Image placeholder",
  },
  es: {
    locale: "es_ES",
    htmlLang: "es",
    skip: "Saltar al contenido",
    home: "Inicio",
    start: "Iniciar proyecto",
    menuOpen: "Abrir menú",
    paletteOpen: "Abrir paleta de comandos",
    palettePlaceholder: "Busca una página, proyecto o acción…",
    paletteGroups: { popular: "Populares", pages: "Páginas", modules: "Módulos", deploys: "Deploys", actions: "Acciones" },
    paletteNav: "navegar",
    paletteOpenHint: "abrir",
    copyEmail: "Copiar correo",
    whatsapp: "Escribir por WhatsApp",
    faqLabel: "Preguntas y precios",
    switchTo: "English",
    switchLabel: "View the site in English",
    footerBlurb: "Diseñamos y programamos productos digitales para equipos de cualquier país.",
    footerCols: { studio: "// estudio", resources: "// recursos", contact: "// contacto" },
    process: "Proceso",
    faq: "Preguntas frecuentes",
    rights: "Todos los derechos reservados.",
    commit: 'git commit -m "hecho desde cualquier zona horaria"',
    followUs: "Sigue el proceso",
    loader: "compilando forklia",
    ctaTitle: '¿Listo para llevar tu marca al <span class="grad-text">siguiente nivel</span>?',
    ctaText: "Cuéntanos tu idea desde cualquier país y te enviamos una propuesta sin compromiso en menos de 48 horas.",
    ctaPrimary: "Iniciar proyecto",
    ctaWhatsapp: "Hablar por WhatsApp",
    ctaNote: "Respondemos en menos de 24h",
    seeAll: "Ver todo",
    readPost: "Leer artículo",
    viewCase: "Ver el caso",
    placeholderImg: "Imagen placeholder",
  },
} as const;

/** Code-flavoured navigation: each label is rendered as syntax tokens. */
export const nav: { key: RouteKey; tokens: L<{ t: string; c: string }[]>; hint: L }[] = [
  {
    key: "services",
    tokens: { en: [{ t: "modules", c: "fn" }, { t: "()", c: "p" }], es: [{ t: "módulos", c: "fn" }, { t: "()", c: "p" }] },
    hint: { en: "// what we build", es: "// lo que construimos" },
  },
  {
    key: "work",
    tokens: { en: [{ t: "deploys", c: "id" }, { t: "/", c: "p" }], es: [{ t: "deploys", c: "id" }, { t: "/", c: "p" }] },
    hint: { en: "// shipped projects", es: "// proyectos en producción" },
  },
  {
    key: "about",
    tokens: { en: [{ t: "git", c: "kw" }, { t: " blame", c: "id" }], es: [{ t: "git", c: "kw" }, { t: " blame", c: "id" }] },
    hint: { en: "// who wrote this", es: "// quién escribió esto" },
  },
  {
    key: "blog",
    tokens: { en: [{ t: "iterating", c: "id" }, { t: "++", c: "op" }], es: [{ t: "iterando", c: "id" }, { t: "++", c: "op" }] },
    hint: { en: "// notes & guides", es: "// notas y guías" },
  },
];

export const navPlain = (key: RouteKey, lang: Lang) => nav.find((n) => n.key === key)!.tokens[lang].map((x) => x.t).join("");
