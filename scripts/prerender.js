import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, PRERENDER_ROUTES, SITE_ROUTES } from "./site-routes.js";
import { buildSitemapXml } from "./generate-sitemap.js";
import { buildFaqSchema, injectFaqJsonLd } from "./faq-schema.js";
import { BLOG_PATH } from "./blog/config.js";
import { buildArticleRoutes } from "./blog/articles.js";
import { readGeneratedBlog } from "./blog/generated.js";
import {
  escapeHtml,
  renderBlogIndexStatic,
  renderBlogPostStatic,
} from "./blog/render-static.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  console.error("[Prerender] dist/index.html não encontrado. Execute o build antes.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
const { manifest: blogManifest, articles: blogArticles } = readGeneratedBlog(rootDir);

const faqItems = JSON.parse(
  fs.readFileSync(path.join(rootDir, "src/config/faq.json"), "utf-8")
);

const FAQ_SCHEMA = buildFaqSchema(faqItems);
const blogIndexRoute = SITE_ROUTES.find((route) => route.path === BLOG_PATH);

function replaceTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function replaceCanonical(html, canonical) {
  return html.replace(
    /<link\s+[^>]*rel="canonical"[^>]*>/i,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}" />`
  );
}

function replaceMetaByName(html, name, content) {
  const pattern = new RegExp(`<meta\\s+[^>]*name="${name}"[^>]*>`, "i");
  const tag = `<meta data-rh="true" name="${name}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function replaceMetaByProperty(html, property, content, dataRh = true) {
  const pattern = new RegExp(`<meta\\s+[^>]*property="${property}"[^>]*>`, "i");
  const rh = dataRh ? ' data-rh="true"' : "";
  const tag = `<meta${rh} property="${property}" content="${escapeHtml(content)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function injectHead(html, snippet) {
  return html.replace("</head>", `  ${snippet}\n  </head>`);
}

function injectRoot(html, body) {
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  return html.replace("</body>", `<div id="root">${body}</div>\n  </body>`);
}

function applyRouteMeta(html, route) {
  const canonicalUrl = `${BASE_URL}${route.path}`;
  let routeHtml = html;
  routeHtml = replaceTitle(routeHtml, route.title);
  routeHtml = replaceMetaByName(routeHtml, "description", route.description);
  routeHtml = replaceCanonical(routeHtml, canonicalUrl);
  routeHtml = replaceMetaByProperty(routeHtml, "og:title", route.title);
  routeHtml = replaceMetaByProperty(routeHtml, "og:description", route.description);
  routeHtml = replaceMetaByProperty(routeHtml, "og:url", canonicalUrl);
  routeHtml = replaceMetaByName(routeHtml, "twitter:title", route.title);
  routeHtml = replaceMetaByName(routeHtml, "twitter:description", route.description);
  return routeHtml;
}

function applyArticleMeta(html, article) {
  const { meta } = article;
  let routeHtml = html;

  routeHtml = replaceTitle(routeHtml, meta.title);
  routeHtml = replaceMetaByName(routeHtml, "description", meta.description);
  routeHtml = replaceCanonical(routeHtml, meta.canonical);
  routeHtml = replaceMetaByProperty(routeHtml, "og:type", "article");
  routeHtml = replaceMetaByProperty(routeHtml, "og:title", article.title);
  routeHtml = replaceMetaByProperty(routeHtml, "og:description", meta.description);
  routeHtml = replaceMetaByProperty(routeHtml, "og:url", meta.canonical);
  routeHtml = replaceMetaByProperty(routeHtml, "og:image", meta.image);
  routeHtml = replaceMetaByName(routeHtml, "twitter:title", meta.title);
  routeHtml = replaceMetaByName(routeHtml, "twitter:description", meta.description);
  routeHtml = replaceMetaByName(routeHtml, "twitter:image", meta.image);

  const articleMeta = [
    `<meta data-rh="true" property="article:published_time" content="${escapeHtml(meta.publishedTime)}" />`,
    `<meta data-rh="true" property="article:modified_time" content="${escapeHtml(meta.modifiedTime)}" />`,
    `<meta data-rh="true" property="article:section" content="${escapeHtml(meta.category)}" />`,
    `<script type="application/ld+json" data-rh="true">${meta.jsonLd}</script>`,
  ].join("\n  ");

  return injectHead(routeHtml, articleMeta);
}

function hiddenRouteHeader(route) {
  return `<header style="opacity:0;height:0;overflow:hidden" aria-hidden="true"><h1>${escapeHtml(
    route.h1
  )}</h1><p>${escapeHtml(route.description)}</p></header>`;
}

console.log("[Prerender] Gerando HTML estático das rotas canônicas...");

for (const route of PRERENDER_ROUTES) {
  const routePath = route.path.replace(/^\//, "");
  const targetDir = path.join(distDir, routePath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let routeHtml = applyRouteMeta(baseHtml, route);

  if (route.path === BLOG_PATH) {
    const image = `${BASE_URL}/og-image-1200x630.png`;
    routeHtml = replaceMetaByProperty(routeHtml, "og:type", "website");
    routeHtml = replaceMetaByProperty(routeHtml, "og:image", image);
    routeHtml = replaceMetaByName(routeHtml, "twitter:image", image);
    routeHtml = injectRoot(routeHtml, renderBlogIndexStatic(blogManifest));
  } else {
    routeHtml = injectRoot(routeHtml, hiddenRouteHeader(route));
  }

  if (route.path === "/faq") {
    routeHtml = injectFaqJsonLd(routeHtml, FAQ_SCHEMA);
  }

  const destFile = path.join(targetDir, "index.html");
  fs.writeFileSync(destFile, routeHtml, "utf-8");
  console.log(`  ✓ ${route.path}/index.html (${route.title})`);
}

console.log("[Prerender] Gerando HTML estático dos artigos publicados...");

for (const article of blogArticles) {
  const targetDir = path.join(distDir, "blog", article.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  let articleHtml = applyArticleMeta(baseHtml, article);
  articleHtml = injectRoot(articleHtml, renderBlogPostStatic(article));

  fs.writeFileSync(path.join(targetDir, "index.html"), articleHtml, "utf-8");
  console.log(`  ✓ /blog/${article.slug}/index.html (${article.title})`);
}

const sitemapRoutes = [...SITE_ROUTES, ...buildArticleRoutes(blogArticles)];
const sitemapPath = path.join(distDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, buildSitemapXml(sitemapRoutes), "utf-8");
console.log(`[Prerender] Sitemap gerado com ${sitemapRoutes.length} URLs.`);

if (!blogIndexRoute) {
  console.warn("[Prerender] Rota /blog não encontrada em SITE_ROUTES.");
}

console.log("[Prerender] Concluído com sucesso!");
