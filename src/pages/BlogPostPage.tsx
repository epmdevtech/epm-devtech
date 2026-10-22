import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { BlogPostMeta } from "@/components/blog/BlogPostMeta";
import { getBlogArticle } from "@/lib/blog/manifest";
import NotFound from "@/pages/NotFound";

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getBlogArticle(slug);

  if (!article) {
    return <NotFound />;
  }

  const { meta } = article;

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.publishedTime} />
        <meta property="article:modified_time" content={meta.modifiedTime} />
        <meta property="article:section" content={meta.category} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json">{meta.jsonLd}</script>
      </Helmet>

      <div className="w-full">
        <PageHeader
          eyebrow={article.category.toUpperCase()}
          title={article.title}
          description={article.description}
          align="left"
          containerClassName="max-w-3xl"
        />

        <SectionWrapper tone="base" containerClassName="max-w-3xl mx-auto">
          <article aria-labelledby="page-title">
            <BlogPostMeta post={article} className="mb-8" />

            <ArticleContent html={article.html} />

            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border-default pt-6">
              <Link
                to="/blog"
                className="inline-flex min-h-[44px] items-center gap-2 rounded text-sm font-semibold text-text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Voltar para o blog
              </Link>
            </div>
          </article>
        </SectionWrapper>
      </div>
    </>
  );
};

export default BlogPostPage;
