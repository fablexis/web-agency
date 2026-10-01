import type { APIRoute } from "astro";
import { site, posts } from "../data/site";
import { projects } from "../data/projects";

const lastmod = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () => {
  const pages = [
    { path: "", priority: "1.0" },
    { path: "soluciones/", priority: "0.9" },
    { path: "proyectos/", priority: "0.9" },
    ...projects.map((p) => ({ path: `proyectos/${p.slug}/`, priority: "0.8" })),
    { path: "nosotros/", priority: "0.7" },
    { path: "cotizar/", priority: "0.8" },
    { path: "blog/", priority: "0.6" },
    ...posts.filter((p) => !p.placeholder).map((p) => ({ path: `blog/${p.slug}/`, priority: "0.6" })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
