import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const NOT_FOUND_TITLE = "Página Não Encontrada (404) | EPM DevTech";
const NOT_FOUND_DESCRIPTION =
  "O endereço que você tentou acessar não existe, foi renomeado ou movido para uma nova rota.";

const NOT_FOUND_CONTENT = `
    <div style="min-height:100vh;display:flex;flex-direction:column;background:hsl(var(--surface-base, 240 5% 98%));color:rgb(var(--text-primary-rgb, 9 9 11));">
      <main id="conteudo-principal" style="flex:1;display:flex;align-items:center;justify-content:center;padding:4rem 1.5rem;text-align:center;">
        <div style="width:100%;max-width:34rem;">
          <p style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgb(var(--text-brand-rgb, 15 118 110));margin:0 0 .5rem;">ERRO 404</p>
          <h1 style="font-size:clamp(2rem,6vw,3rem);line-height:1.1;letter-spacing:-.03em;margin:0 0 1rem;">Página não encontrada</h1>
          <p style="font-size:1rem;line-height:1.65;color:rgb(var(--text-secondary-rgb, 82 82 91));margin:0 auto 2rem;max-width:32rem;">${NOT_FOUND_DESCRIPTION}</p>
          <div class="nf-actions" style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;justify-content:center;">
            <a href="/" style="display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 1.5rem;border:1px solid rgb(var(--brand-rgb, 45 212 191));background:rgb(var(--brand-rgb, 45 212 191));color:rgb(var(--text-on-brand-rgb, 4 32 28));font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;">Página inicial</a>
            <a href="/services" style="display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 1.5rem;border:1px solid rgb(var(--border-default-rgb, 228 228 231));background:transparent;color:rgb(var(--text-primary-rgb, 9 9 11));font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;">Ver soluções</a>
            <a href="/contact" style="display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 1.25rem;background:transparent;color:rgb(var(--text-secondary-rgb, 82 82 91));font-size:.8rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;">Fale comigo</a>
          </div>
        </div>
      </main>
    </div>`;

/**
 * Gera o HTML estático de 404 a partir do index.html já processado pelo Vite.
 * Remove canonical, Open Graph, Twitter e JSON-LD para não declarar a home
 * como página canônica de uma URL inexistente.
 *
 * @param {string} baseHtml
 * @returns {string}
 */
export function buildNotFoundHtml(baseHtml) {
  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${NOT_FOUND_TITLE}</title>`);

  html = html.replace(
    /<meta\s+[^>]*name="description"[^>]*>/i,
    `<meta name="description" content="${NOT_FOUND_DESCRIPTION}" />`
  );

  html = html.replace(
    /<meta\s+[^>]*name="robots"[^>]*>/i,
    '<meta data-rh="true" name="robots" content="noindex, nofollow" />'
  );

  if (!/<meta\s+[^>]*name="robots"/i.test(html)) {
    html = html.replace("</head>", '  <meta data-rh="true" name="robots" content="noindex, nofollow" />\n  </head>');
  }

  html = html.replace(/\s*<link\s+[^>]*rel="canonical"[^>]*\/?>/gi, "");
  html = html.replace(/\s*<meta\s+[^>]*property="og:[^"]+"[^>]*\/?>/gi, "");
  html = html.replace(/\s*<meta\s+[^>]*name="twitter:[^"]+"[^>]*\/?>/gi, "");
  html = html.replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");

  const style = `
    <style>
      .nf-actions a:hover { filter: brightness(1.08); }
      .nf-actions a:focus-visible { outline: 2px solid rgb(var(--brand-rgb, 45 212 191)); outline-offset: 3px; }
    </style>`;

  html = html.replace("</head>", `${style}\n  </head>`);

  if (html.includes('<div id="root"></div>')) {
    html = html.replace('<div id="root"></div>', `<div id="root">${NOT_FOUND_CONTENT}</div>`);
  } else {
    html = html.replace("</body>", `<div id="root">${NOT_FOUND_CONTENT}</div>\n  </body>`);
  }

  return html;
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const baseHtmlPath = path.join(distDir, "index.html");

  if (!fs.existsSync(baseHtmlPath)) {
    console.error("[404] dist/index.html não encontrado. Execute o build antes.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");
  const outputPath = path.join(distDir, "404.html");
  fs.writeFileSync(outputPath, buildNotFoundHtml(baseHtml), "utf-8");
  console.log("[404] dist/404.html gerado com sucesso.");
}
