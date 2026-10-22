export const SITE_URL = "https://epmdevtech.com.br";

export const BLOG_PATH = "/blog";
export const BLOG_CONTENT_DIR = "content/blog";
export const BLOG_GENERATED_DIR = "src/generated";
export const BLOG_GENERATED_ARTICLES_DIR = "src/generated/blog";
export const BLOG_MANIFEST_FILE = "src/generated/blog-manifest.json";

export const BLOG_CATEGORIES = ["Engenharia", "Arquitetura", "Segurança", "Dados"];

export const BLOG_INDEX = {
  path: BLOG_PATH,
  title: "Blog Técnico | EPM DevTech",
  description:
    "Artigos sobre engenharia de software, arquitetura, segurança e dados para equipes que constroem sistemas críticos.",
  h1: "Blog técnico",
  changefreq: "weekly",
  priority: "0.8",
};

export const BLOG_AUTHOR = {
  name: "Equipe EPM DevTech",
  url: `${SITE_URL}/about`,
};

export const BLOG_DEFAULT_OG_IMAGE = "/og-image-1200x630.png";
export const BLOG_PUBLISHER_LOGO = "/logo-emp-dev-tech-sm.webp";
