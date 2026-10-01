import type { APIRoute } from "astro";
import { site, posts } from "../data/site";
import { projects } from "../data/projects";
import { route, type Lang } from "../i18n";

const lastmod = new Date().toISOString().slice(0, 10);
const abs = (p: string) => new URL(p, site.url).href;

type Entry = { en: string; es: string; priority: string };

export const GET: APIRoute = () => {
  const pages: Entry[] = [
    { en: route("home", "en"), es: route("home", "es"), priority: "1.0" },
    { en: route("services", "en"), es: route("services", "es"), priority: "0.9" },
    { en: route("work", "en"), es: route("work", "es"), priority: "0.9" },
    ...projects.map((p) => ({ en: route("case", "en", p.slug), es: route("case", "es", p.slug), priority: "0.8" })),
    { en: route("about", "en"), es: route("about", "es"), priority: "0.7" },
    { en: route("start", "en"), es: route("start", "es"), priority: "0.8" },
    { en: route("blog", "en"), es: route("blog", "es"), priority: "0.6" },
    ...posts.filter((p) => !p.placeholder).map((p) => ({ en: route("post", "en", p.slug.en), es: route("post", "es", p.slug.es), priority: "0.6" })),
  ];
  const url = (e: Entry, lang: Lang) => `  <url>
    <loc>${abs(e[lang])}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(e.en)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${abs(e.es)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(e.en)}"/>
    <lastmod>${lastmod}</lastmod>
    <priority>${e.priority}</priority>
  </url>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((e) => [url(e, "en"), url(e, "es")]).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
