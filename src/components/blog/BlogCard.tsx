import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BlogPostMeta } from "@/components/blog/BlogPostMeta";
import type { BlogPostSummary } from "@/lib/blog/types";

interface BlogCardProps {
  post: BlogPostSummary;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <Card className="group h-full overflow-hidden border-border-default bg-surface transition-colors hover:border-brand/40">
    {post.cover && (
      <div className="aspect-[16/9] overflow-hidden border-b border-border-default bg-surface-elevated">
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          width={post.cover.width}
          height={post.cover.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
    )}
    <CardHeader className="gap-3">
      <BlogPostMeta post={post} />
      <h2
        id={`blog-card-${post.slug}`}
        className="text-2xl font-bold leading-tight tracking-[-0.03em] text-primary [text-wrap:balance]"
      >
        <Link
          to={post.url}
          className="rounded transition-colors hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {post.title}
        </Link>
      </h2>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-secondary">{post.description}</p>
      <Link
        to={post.url}
        aria-label={`Ler artigo: ${post.title}`}
        className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded text-sm font-semibold text-text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Ler artigo
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </CardContent>
  </Card>
);

export default BlogCard;
