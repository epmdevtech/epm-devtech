import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BLOG_MANIFEST } from "@/lib/blog/manifest";
import { SITE_CONFIG } from "@/config/site";

const { index, articles } = BLOG_MANIFEST;
const OG_IMAGE = `${SITE_CONFIG.url}/og-image-1200x630.png`;

export const BlogPage = () => (
  <>
    <Helmet>
      <title>{index.title}</title>
      <meta name="description" content={index.description} />
      <link rel="canonical" href={index.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={index.title} />
      <meta property="og:description" content={index.description} />
      <meta property="og:url" content={index.canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:title" content={index.title} />
      <meta name="twitter:description" content={index.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>

    <div className="w-full">
      <PageHeader eyebrow="BLOG" title={index.h1} description={index.description} />

      <SectionWrapper tone="base" containerClassName="max-w-4xl mx-auto">
        {articles.length === 0 ? (
          <BlogEmptyState />
        ) : (
          <div className="grid gap-6" aria-label="Lista de artigos">
            {articles.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </div>
  </>
);

export default BlogPage;
