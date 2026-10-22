import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  BLOG_AUTHOR,
  BLOG_CATEGORIES,
  BLOG_CONTENT_DIR,
  BLOG_DEFAULT_OG_IMAGE,
  BLOG_GENERATED_ARTICLES_DIR,
  BLOG_GENERATED_DIR,
  BLOG_INDEX,
  BLOG_MANIFEST_FILE,
  BLOG_PUBLISHER_LOGO,
  SITE_URL,
} from "./config.js";
import { renderMarkdown } from "./markdown.js";

const ALLOWED_FRONTMATTER_KEYS = new Set([
  "title",
  "slug",
  "description",
  "publishedAt",
  "updatedAt",
  "category",
  "draft",
  "cover",
]);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class BlogValidationError extends Error {
  constructor(errors) {
    super(`Conteúdo do blog inválido:\n- ${errors.join("\n- ")}`);
    this.name = "BlogValidationError";
    this.errors = errors;
  }
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidIsoDate(value) {
  if (typeof value !== "string" || !ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function formatDatePtBr(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function stripMarkdown(source) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/[>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(source) {
  const text = stripMarkdown(source);
  return text ? text.split(" ").filter(Boolean).length : 0;
}

function validateCover(cover, file, errors) {
  if (cover === undefined || cover === null) return null;

  if (typeof cover !== "object" || Array.isArray(cover)) {
    errors.push(`${file}: cover deve ser um objeto ou null.`);
    return null;
  }

  const required = ["src", "alt", "width", "height"];
  for (const key of required) {
    if (cover[key] === undefined || cover[key] === null || cover[key] === "") {
      errors.push(`${file}: cover.${key} é obrigatório.`);
    }
  }

  if (typeof cover.src === "string" && (!cover.src.startsWith("/") || cover.src.startsWith("//"))) {
    errors.push(`${file}: cover.src deve ser um caminho local iniciado por "/".`);
  }

  if (typeof cover.alt !== "string" || cover.alt.trim().length === 0) {
    errors.push(`${file}: cover.alt deve descrever a imagem.`);
  }

  for (const dimension of ["width", "height"]) {
    if (!Number.isInteger(cover[dimension]) || cover[dimension] <= 0) {
      errors.push(`${file}: cover.${dimension} deve ser um inteiro positivo.`);
    }
  }

  if (typeof cover.src === "string" && cover.src.startsWith("/") && !cover.src.startsWith("//")) {
    const publicFile = path.join(process.cwd(), "public", cover.src);
    if (!fs.existsSync(publicFile)) {
      errors.push(`${file}: cover.src não existe em public${cover.src}.`);
    }
  }

  return cover;
}

function buildArticleMeta({ title, description, slug, category, publishedAt, updatedAt, cover, wordCount }) {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const image = cover ? `${SITE_URL}${cover.src}` : `${SITE_URL}${BLOG_DEFAULT_OG_IMAGE}`;
  const modifiedAt = updatedAt || publishedAt;
  const metaTitle = `${title} | Blog EPM DevTech`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    inLanguage: "pt-BR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    author: {
      "@type": "Organization",
      name: BLOG_AUTHOR.name,
      url: BLOG_AUTHOR.url,
    },
    publisher: {
      "@type": "Organization",
      name: "EPM DevTech",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${BLOG_PUBLISHER_LOGO}`,
      },
    },
    image: [image],
    articleSection: category,
    wordCount,
  };

  return {
    title: metaTitle,
    description,
    canonical,
    ogType: "article",
    publishedTime: `${publishedAt}T00:00:00-03:00`,
    modifiedTime: `${modifiedAt}T00:00:00-03:00`,
    image,
    author: BLOG_AUTHOR.name,
    category,
    jsonLd: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  };
}

/**
 * Lê e valida um único arquivo Markdown.
 *
 * @param {string} filePath
 * @returns {object}
 */
export function parseArticleFile(filePath) {
  const file = path.basename(filePath);
  const errors = [];
  let parsed;

  try {
    parsed = matter(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    throw new BlogValidationError([`${file}: frontmatter YAML inválido (${error.message}).`]);
  }

  const data = parsed.data || {};
  const unknownKeys = Object.keys(data).filter((key) => !ALLOWED_FRONTMATTER_KEYS.has(key));
  if (unknownKeys.length > 0) {
    errors.push(`${file}: campos não reconhecidos no frontmatter: ${unknownKeys.join(", ")}.`);
  }

  const title = data.title;
  const slug = data.slug;
  const description = data.description;
  const publishedAt = data.publishedAt;
  const updatedAt = data.updatedAt ?? null;
  const category = data.category;
  const draft = data.draft;

  if (!isNonEmptyString(title)) {
    errors.push(`${file}: title é obrigatório.`);
  } else if (title.length > 120) {
    errors.push(`${file}: title deve ter no máximo 120 caracteres.`);
  } else if (title.trim().length < 10) {
    errors.push(`${file}: title deve ter pelo menos 10 caracteres.`);
  }

  if (!isNonEmptyString(slug)) {
    errors.push(`${file}: slug é obrigatório.`);
  } else {
    if (!SLUG_PATTERN.test(slug)) {
      errors.push(`${file}: slug deve estar em kebab-case (a-z, 0-9 e hífens).`);
    }
    if (slug !== path.basename(filePath, ".md")) {
      errors.push(`${file}: slug "${slug}" deve ser igual ao nome do arquivo.`);
    }
  }

  if (!isNonEmptyString(description)) {
    errors.push(`${file}: description é obrigatória.`);
  } else if (description.length < 50 || description.length > 200) {
    errors.push(`${file}: description deve ter entre 50 e 200 caracteres.`);
  }

  if (!isValidIsoDate(publishedAt)) {
    errors.push(`${file}: publishedAt deve ser uma data ISO válida (AAAA-MM-DD).`);
  }

  if (updatedAt !== null) {
    if (!isValidIsoDate(updatedAt)) {
      errors.push(`${file}: updatedAt deve ser uma data ISO válida (AAAA-MM-DD) ou null.`);
    } else if (isValidIsoDate(publishedAt) && updatedAt < publishedAt) {
      errors.push(`${file}: updatedAt não pode ser anterior a publishedAt.`);
    }
  }

  if (!BLOG_CATEGORIES.includes(category)) {
    errors.push(
      `${file}: category deve ser uma das opções: ${BLOG_CATEGORIES.join(", ")}.`
    );
  }

  if (typeof draft !== "boolean") {
    errors.push(`${file}: draft é obrigatório e deve ser true ou false.`);
  }

  const cover = validateCover(data.cover, file, errors);

  if (!isNonEmptyString(parsed.content)) {
    errors.push(`${file}: o corpo do artigo está vazio.`);
  }

  if (errors.length > 0) {
    throw new BlogValidationError(errors);
  }

  const wordCount = countWords(parsed.content);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const html = renderMarkdown(parsed.content);

  const summary = {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    category,
    readingTime,
    readingTimeLabel: `${readingTime} min de leitura`,
    publishedAtLabel: formatDatePtBr(publishedAt),
    updatedAtLabel: updatedAt ? formatDatePtBr(updatedAt) : null,
    cover,
    url: `/blog/${slug}`,
  };

  return {
    ...summary,
    draft,
    wordCount,
    html,
    meta: buildArticleMeta({
      title,
      description,
      slug,
      category,
      publishedAt,
      updatedAt,
      cover,
      wordCount,
    }),
  };
}

/**
 * Lê todos os artigos, valida duplicidades e retorna o manifesto publicado.
 *
 * @param {object} [options]
 * @param {string} [options.rootDir]
 * @returns {{articles: object[], published: object[], drafts: object[], manifest: object}}
 */
export function buildBlogData({ rootDir = process.cwd() } = {}) {
  const contentDir = path.join(rootDir, BLOG_CONTENT_DIR);
  const files = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((file) => file.endsWith(".md")).sort()
    : [];

  const errors = [];
  const articles = [];
  const seenSlugs = new Map();

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    try {
      const article = parseArticleFile(filePath);
      if (seenSlugs.has(article.slug)) {
        errors.push(`${file}: slug duplicado com ${seenSlugs.get(article.slug)}.`);
      } else {
        seenSlugs.set(article.slug, file);
        articles.push(article);
      }
    } catch (error) {
      if (error instanceof BlogValidationError) {
        errors.push(...error.errors);
      } else {
        errors.push(`${file}: ${error.message}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new BlogValidationError(errors);
  }

  const published = articles
    .filter((article) => !article.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
  const drafts = articles.filter((article) => article.draft);

  const manifest = {
    index: {
      path: BLOG_INDEX.path,
      title: BLOG_INDEX.title,
      description: BLOG_INDEX.description,
      h1: BLOG_INDEX.h1,
      canonical: `${SITE_URL}${BLOG_INDEX.path}`,
    },
    categories: BLOG_CATEGORIES,
    articles: published.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      category: article.category,
      readingTime: article.readingTime,
      readingTimeLabel: article.readingTimeLabel,
      publishedAtLabel: article.publishedAtLabel,
      updatedAtLabel: article.updatedAtLabel,
      cover: article.cover,
      url: article.url,
    })),
  };

  return { articles, published, drafts, manifest };
}

/**
 * Gera as entradas de sitemap dos artigos publicados.
 *
 * @param {object[]} published
 * @returns {object[]}
 */
export function buildArticleRoutes(published) {
  return published.map((article) => ({
    path: article.url,
    title: article.meta.title,
    description: article.meta.description,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: article.updatedAt || article.publishedAt,
  }));
}

/**
 * Escreve manifesto e JSONs de artigo em src/generated, removendo artefatos antigos.
 *
 * @param {{manifest: object, published: object[]}} blogData
 * @param {object} [options]
 * @param {string} [options.rootDir]
 */
export function writeBlogArtifacts(blogData, { rootDir = process.cwd() } = {}) {
  const generatedDir = path.join(rootDir, BLOG_GENERATED_DIR);
  const articlesDir = path.join(rootDir, BLOG_GENERATED_ARTICLES_DIR);
  const manifestPath = path.join(rootDir, BLOG_MANIFEST_FILE);

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.rmSync(articlesDir, { recursive: true, force: true });
  fs.mkdirSync(articlesDir, { recursive: true });

  fs.writeFileSync(manifestPath, `${JSON.stringify(blogData.manifest, null, 2)}\n`, "utf-8");

  for (const article of blogData.published) {
    fs.writeFileSync(
      path.join(articlesDir, `${article.slug}.json`),
      `${JSON.stringify(article, null, 2)}\n`,
      "utf-8"
    );
  }
}
