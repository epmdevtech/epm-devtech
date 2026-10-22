export type BlogCategory = "Engenharia" | "Arquitetura" | "Segurança" | "Dados";

export interface BlogCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string | null;
  category: BlogCategory;
  readingTime: number;
  readingTimeLabel: string;
  publishedAtLabel: string;
  updatedAtLabel: string | null;
  cover: BlogCover | null;
  url: string;
}

export interface BlogPostMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: "article";
  publishedTime: string;
  modifiedTime: string;
  image: string;
  author: string;
  category: BlogCategory;
  jsonLd: string;
}

export interface BlogArticle extends BlogPostSummary {
  draft: boolean;
  wordCount: number;
  html: string;
  meta: BlogPostMeta;
}

export interface BlogIndex {
  path: string;
  title: string;
  description: string;
  h1: string;
  canonical: string;
}

export interface BlogManifest {
  index: BlogIndex;
  categories: BlogCategory[];
  articles: BlogPostSummary[];
}
