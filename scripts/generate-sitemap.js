import { BASE_URL } from "./site-routes.js";

/**
 * Gera o XML do sitemap a partir da fonte única de rotas.
 * `lastmod` só é emitido quando existe uma data real (artigos publicados);
 * datas fixas/inventadas pioram a confiança do sitemap.
 *
 * @param {import("./site-routes.js").SiteRoute[]} routes
 * @returns {string}
 */
export function buildSitemapXml(routes) {
  const entries = routes
    .map((route) => {
      const loc = `${BASE_URL}${route.path}`;
      const lastmod = route.lastmod
        ? `\n    <lastmod>${route.lastmod}</lastmod>`
        : "";
      const changefreq = route.changefreq
        ? `\n    <changefreq>${route.changefreq}</changefreq>`
        : "";
      const priority = route.priority
        ? `\n    <priority>${route.priority}</priority>`
        : "";

      return [
        "  <url>",
        `    <loc>${loc}</loc>${lastmod}${changefreq}${priority}`,
        `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${loc}" />`,
        "  </url>",
      ].join("\n");
    })
    .join("\n\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    "",
    entries,
    "",
    "</urlset>",
    "",
  ].join("\n");
}
