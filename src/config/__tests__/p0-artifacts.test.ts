import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { buildNotFoundHtml } from "../../../scripts/generate-404.js";
import { FAQ_ITEMS } from "@/config/faq";
import { buildFaqSchema, injectFaqJsonLd } from "../../../scripts/faq-schema.js";

const root = resolve(__dirname, "../../..");
const readRoot = (file: string) => readFileSync(resolve(root, file), "utf-8");

const BASE_HTML = `<!doctype html>
<html lang="pt-BR">
  <head>
    <title>Home</title>
    <meta name="description" content="Home" />
    <meta data-rh="true" name="robots" content="index, follow" />
    <link rel="canonical" href="https://epmdevtech.com.br/" />
    <meta property="og:title" content="Home" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{"@type":"FAQPage"}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

describe("artefatos P0 pré-blog", () => {
  it("gera 404.html sem canonical, Open Graph, Twitter ou JSON-LD", () => {
    const html = buildNotFoundHtml(BASE_HTML);

    expect(html).toContain("<title>Página Não Encontrada (404) | EPM DevTech</title>");
    expect(html).toContain('<meta data-rh="true" name="robots" content="noindex, nofollow" />');
    expect(html).not.toMatch(/rel="canonical"/i);
    expect(html).not.toMatch(/property="og:/i);
    expect(html).not.toMatch(/name="twitter:/i);
    expect(html).not.toMatch(/application\/ld\+json/i);
  });

  it("inclui conteúdo 404 visível e links de recuperação no HTML estático", () => {
    const html = buildNotFoundHtml(BASE_HTML);

    expect(html).toContain("<h1");
    expect(html).toContain("Página não encontrada");
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/services"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toContain('aria-hidden="true"');
    expect(html).not.toContain("opacity:0");
  });

  it("index.html tem um único og:image, twitter:image e robots fora do Helmet", () => {
    const html = readRoot("index.html");
    const ogImages = [...html.matchAll(/property="og:image"/g)];
    const robots = html.match(/<meta[^>]*name="robots"[^>]*>/i)?.[0] ?? "";

    expect(ogImages).toHaveLength(1);
    expect(html).toContain('name="twitter:image"');
    expect(robots).not.toContain("data-rh");
  });

  it("remove o FAQPage global (o schema passa a ser específico de /faq)", () => {
    expect(readRoot("index.html")).not.toContain('"@type": "FAQPage"');
  });

  it("FAQ_SCHEMA espelha exatamente o conteúdo visível de src/config/faq.ts", () => {
    const schema = buildFaqSchema(FAQ_ITEMS);

    expect(schema.mainEntity).toHaveLength(FAQ_ITEMS.length);

    FAQ_ITEMS.forEach((item, index) => {
      expect(schema.mainEntity[index].name).toBe(item.question);
      expect(schema.mainEntity[index].acceptedAnswer.text).toBe(item.answer);
    });
  });

  it("injeta o FAQPage apenas no HTML da rota /faq", () => {
    const schema = buildFaqSchema(FAQ_ITEMS);
    const baseWithoutJsonLd = BASE_HTML.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      ""
    );
    const faqHtml = injectFaqJsonLd(baseWithoutJsonLd, schema);

    expect(faqHtml).toContain('"@type":"FAQPage"');
    expect(faqHtml).toContain('"@type":"Question"');
    expect(faqHtml.match(/application\/ld\+json/g)).toHaveLength(1);
  });
});
