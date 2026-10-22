import manifest from "@/generated/blog-manifest.json";
import type { BlogArticle, BlogManifest } from "./types";

const articleModules = import.meta.glob<BlogArticle>("/src/generated/blog/*.json", {
  eager: true,
  import: "default",
});

const articlesBySlug = Object.fromEntries(
  Object.values(articleModules).map((article) => [article.slug, article])
);

export const BLOG_MANIFEST = manifest as BlogManifest;

export const BLOG_ARTICLES = Object.values(articlesBySlug).sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export function getBlogArticle(slug: string | undefined): BlogArticle | undefined {
  return slug ? articlesBySlug[slug] : undefined;
}
