import fs from "node:fs";
import path from "node:path";
import { BLOG_GENERATED_ARTICLES_DIR, BLOG_MANIFEST_FILE } from "./config.js";

/**
 * Lê os artefatos gerados que o cliente e o prerender compartilham.
 *
 * @param {string} rootDir
 * @returns {{manifest: object, articles: object[]}}
 */
export function readGeneratedBlog(rootDir) {
  const manifestPath = path.join(rootDir, BLOG_MANIFEST_FILE);
  if (!fs.existsSync(manifestPath)) {
    throw new Error(
      `Manifesto do blog não encontrado em ${BLOG_MANIFEST_FILE}. Execute "node scripts/blog/build.js" antes do prerender.`
    );
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const articlesDir = path.join(rootDir, BLOG_GENERATED_ARTICLES_DIR);
  const articles = manifest.articles.map((summary) => {
    const articlePath = path.join(articlesDir, `${summary.slug}.json`);
    if (!fs.existsSync(articlePath)) {
      throw new Error(`Artigo gerado ausente: ${articlePath}.`);
    }
    return JSON.parse(fs.readFileSync(articlePath, "utf-8"));
  });

  return { manifest, articles };
}
