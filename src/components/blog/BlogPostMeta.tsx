import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/lib/blog/types";

interface BlogPostMetaProps {
  post: Pick<
    BlogPostSummary,
    "category" | "publishedAt" | "publishedAtLabel" | "readingTimeLabel"
  >;
  className?: string;
}

export const BlogPostMeta = ({ post, className }: BlogPostMetaProps) => (
  <div className={cn("flex flex-wrap items-center gap-2 text-xs text-muted", className)}>
    <Badge variant="brand">{post.category}</Badge>
    <span aria-hidden="true">·</span>
    <time dateTime={post.publishedAt}>{post.publishedAtLabel}</time>
    <span aria-hidden="true">·</span>
    <span>{post.readingTimeLabel}</span>
  </div>
);

export default BlogPostMeta;
