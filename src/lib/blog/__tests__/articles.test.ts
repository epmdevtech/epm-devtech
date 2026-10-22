import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  BlogValidationError,
  buildArticleRoutes,
  buildBlogData,
  writeBlogArtifacts,
} from "../../../../scripts/blog/articles.js";
import { buildSitemapXml } from "../../../../scripts/generate-sitemap.js";
import {
  renderBlogIndexStatic,
  renderBlogPostStatic,
} from "../../../../scripts/blog/render-static.js";

const tempDirs: string[] = [];

function createRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "epm-blog-"));
  fs.mkdirSync(path.join(root, "content/blog"), { recursive: true });
  tempDirs.push(root);
  return root;
}

function writeArticle(
  root: string,
  filename: string,
  overrides: Record<string, string | boolean | null> = {},
  body = "## Seção\n\nConteúdo do artigo com uma [referência externa](https://example.com)."
) {
  const frontmatter = {
    title: "Um título técnico suficientemente longo",
    slug: filename.replace(/\.md$/, ""),
    description:
      "Uma descrição objetiva com mais de cinquenta caracteres para validar o frontmatter do artigo.",
    publishedAt: "2026-10-22",
    updatedAt: null,
    category: "Engenharia",
    draft: false,
    ...overrides,
  };

  const lines = ["---"];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === null) lines.push(`${key}: null`);
    else if (typeof value === "boolean") lines.push(`${key}: ${value}`);
    else lines.push(`${key}: "${String(value).replace(/"/g, '\\"')}"`);
  }
  lines.push("---", "", body, "");

  fs.writeFileSync(path.join(root, "content/blog", filename), lines.join("\n"));
}

afterEach(() => {
  while (tempDirs.length > 0) {
    fs.rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

describe("blog — validação e manifesto", () => {
  it("valida um artigo publicado e gera metadados e HTML", () => {
    const root = createRoot();
    writeArticle(root, "artigo-valido.md");

    const data = buildBlogData({ rootDir: root });

    expect(data.published).toHaveLength(1);
    expect(data.drafts).toHaveLength(0);
    expect(data.manifest.articles).toHaveLength(1);

    const article = data.published[0];
    expect(article.slug).toBe("artigo-valido");
    expect(article.readingTime).toBeGreaterThan(0);
    expect(article.publishedAtLabel).toContain("2026");
    expect(article.html).toContain("<h2>Seção</h2>");
    expect(article.html).toContain('target="_blank"');
    expect(article.html).toContain('rel="noopener noreferrer"');
    expect(article.meta.canonical).toBe(
      "https://epmdevtech.com.br/blog/artigo-valido"
    );
    expect(article.meta.jsonLd).toContain('"@type":"BlogPosting"');
  });

  it("escapa HTML bruto do Markdown em vez de interpretá-lo", () => {
    const root = createRoot();
    writeArticle(root, "html-bruto.md", {}, "## Teste\n\n<script>alert(1)</script>");

    const article = buildBlogData({ rootDir: root }).published[0];

    expect(article.html).not.toContain("<script>alert(1)</script>");
    expect(article.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("exclui rascunhos do manifesto, do HTML e do sitemap", () => {
    const root = createRoot();
    writeArticle(root, "publicado.md");
    writeArticle(root, "rascunho.md", { draft: true });

    const data = buildBlogData({ rootDir: root });
    const routes = buildArticleRoutes(data.published);

    expect(data.published.map((article) => article.slug)).toEqual(["publicado"]);
    expect(data.drafts.map((article) => article.slug)).toEqual(["rascunho"]);
    expect(data.manifest.articles.map((article) => article.slug)).toEqual(["publicado"]);
    expect(routes.map((route) => route.path)).toEqual(["/blog/publicado"]);
  });

  it("rejeita slug diferente do nome do arquivo", () => {
    const root = createRoot();
    writeArticle(root, "arquivo.md", { slug: "outro-slug" });

    expect(() => buildBlogData({ rootDir: root })).toThrow(BlogValidationError);
    expect(() => buildBlogData({ rootDir: root })).toThrow(/igual ao nome do arquivo/);
  });

  it("rejeita categoria, data e descrição inválidas", () => {
    const root = createRoot();
    writeArticle(root, "invalido.md", {
      category: "Categoria inexistente",
      publishedAt: "22/10/2026",
      description: "curta",
    });

    try {
      buildBlogData({ rootDir: root });
      throw new Error("Deveria ter falhado");
    } catch (error) {
      expect(error).toBeInstanceOf(BlogValidationError);
      const validation = error as { errors: string[] };
      expect(validation.errors.join("\n")).toMatch(/category/);
      expect(validation.errors.join("\n")).toMatch(/publishedAt/);
      expect(validation.errors.join("\n")).toMatch(/description/);
    }
  });

  it("rejeita updatedAt anterior a publishedAt", () => {
    const root = createRoot();
    writeArticle(root, "data-invalida.md", { updatedAt: "2026-10-21" });

    expect(() => buildBlogData({ rootDir: root })).toThrow(/updatedAt não pode ser anterior/);
  });

  it("gera HTML estático visível com H1 e corpo", () => {
    const root = createRoot();
    writeArticle(root, "estatico.md");
    const data = buildBlogData({ rootDir: root });
    const article = data.published[0];

    const indexHtml = renderBlogIndexStatic(data.manifest);
    const postHtml = renderBlogPostStatic(article);

    expect(indexHtml).toContain("<h1");
    expect(indexHtml).toContain(data.manifest.index.h1);
    expect(indexHtml).toContain("estatico");
    expect(indexHtml).not.toContain("aria-hidden");
    expect(indexHtml).not.toContain("opacity:0");

    expect(postHtml).toContain("<h1");
    expect(postHtml).toContain(article.title);
    expect(postHtml).toContain("<h2>Seção</h2>");
    expect(postHtml).toContain(article.html);
    expect(postHtml).not.toContain("aria-hidden");
    expect(postHtml).not.toContain("opacity:0");
  });

  it("inclui lastmod real no sitemap dos artigos", () => {
    const root = createRoot();
    writeArticle(root, "sitemap.md", { updatedAt: "2026-10-23" });
    const data = buildBlogData({ rootDir: root });

    const sitemap = buildSitemapXml(buildArticleRoutes(data.published));

    expect(sitemap).toContain("<lastmod>2026-10-23</lastmod>");
    expect(sitemap).toContain("https://epmdevtech.com.br/blog/sitemap");
  });

  it("remove artefatos antigos ao regenerar", () => {
    const root = createRoot();
    writeArticle(root, "novo.md");
    const data = buildBlogData({ rootDir: root });

    const articlesDir = path.join(root, "src/generated/blog");
    fs.mkdirSync(articlesDir, { recursive: true });
    fs.writeFileSync(path.join(articlesDir, "antigo.json"), "{}");

    writeBlogArtifacts(data, { rootDir: root });

    expect(fs.existsSync(path.join(articlesDir, "antigo.json"))).toBe(false);
    expect(fs.existsSync(path.join(articlesDir, "novo.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "src/generated/blog-manifest.json"))).toBe(true);
  });
});
