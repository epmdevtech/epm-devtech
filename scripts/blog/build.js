import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBlogData, writeBlogArtifacts, BlogValidationError } from "./articles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

try {
  const blogData = buildBlogData({ rootDir });
  writeBlogArtifacts(blogData, { rootDir });

  console.log(
    `[Blog] ${blogData.published.length} artigo(s) publicado(s), ${blogData.drafts.length} rascunho(s).`
  );
  for (const article of blogData.published) {
    console.log(`  ✓ /blog/${article.slug} (${article.title})`);
  }
  if (blogData.published.length === 0) {
    console.log("  · Nenhum artigo publicado; /blog usará o estado vazio.");
  }
} catch (error) {
  if (error instanceof BlogValidationError) {
    console.error(error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
