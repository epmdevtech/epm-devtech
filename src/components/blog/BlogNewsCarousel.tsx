import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogCategory, BlogPostSummary } from "@/lib/blog/types";

interface BlogNewsCarouselProps {
  articles: BlogPostSummary[];
  className?: string;
}

const CATEGORY_ICONS: Record<BlogCategory, typeof Code2> = {
  Engenharia: Code2,
  Arquitetura: Boxes,
  Segurança: ShieldCheck,
  Dados: Database,
};

function CategoryFallback({ category }: { category: BlogCategory }) {
  const Icon = CATEGORY_ICONS[category];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-surface-elevated">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.2),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 text-brand opacity-[0.08] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden="true"
      />
      <Icon className="relative h-14 w-14 text-text-brand" aria-hidden="true" />
    </div>
  );
}

export const BlogNewsCarousel = ({
  articles,
  className,
}: BlogNewsCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateScrollState);
    resizeObserver?.observe(track);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [updateScrollState, articles.length]);

  if (articles.length === 0) return null;

  const hasMultiple = articles.length > 1;

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstItem = track.querySelector<HTMLElement>("[data-carousel-item]");
    const gap = 16;
    const amount = firstItem
      ? firstItem.offsetWidth + gap
      : track.clientWidth * 0.85;

    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex select-none items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.04em] text-text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            <span>FIQUE POR DENTRO DE TUDO</span>
          </div>
          <h2
            id="blog-news-title"
            className="text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.045em] text-primary [text-wrap:balance]"
          >
            Notícias e análises para quem constrói software
          </h2>
          <p className="mt-3 max-w-[65ch] text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.65] tracking-[-0.01em] text-secondary">
            Artigos sobre engenharia, segurança, arquitetura e dados para equipes
            que mantêm sistemas críticos em produção.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-4">
          {hasMultiple && (
            <div className="flex gap-2" aria-label="Controles do carrossel">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Ver artigos anteriores"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                className="h-11 w-11 rounded-full"
              >
                <ChevronLeft aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Ver próximos artigos"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                className="h-11 w-11 rounded-full"
              >
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          )}

          <Link
            to="/blog"
            className="inline-flex min-h-[44px] items-center gap-2 rounded text-sm font-semibold text-text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-labelledby="blog-news-title"
        aria-roledescription="carrossel"
        tabIndex={hasMultiple ? 0 : undefined}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          !hasMultiple && "justify-center"
        )}
      >
        {articles.map((post) => (
          <article
            key={post.slug}
            data-carousel-item
            className={cn(
              "group flex shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border-default bg-surface transition-colors hover:border-brand/40",
              hasMultiple
                ? "w-[min(21rem,calc(100vw-3rem))]"
                : "w-full max-w-4xl sm:flex-row"
            )}
          >
            <div
              className={cn(
                "aspect-[16/9] overflow-hidden border-b border-border-default bg-surface-elevated",
                !hasMultiple &&
                  "sm:aspect-[16/9] sm:w-1/2 sm:shrink-0 sm:self-center sm:border-b-0 sm:border-r"
              )}
            >
              {post.cover ? (
                <img
                  src={post.cover.src}
                  alt={post.cover.alt}
                  width={post.cover.width}
                  height={post.cover.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <CategoryFallback category={post.category} />
              )}
            </div>

            <div className={cn("flex flex-1 flex-col p-5", !hasMultiple && "sm:p-8")}>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                <Badge variant="brand">{post.category}</Badge>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{post.publishedAtLabel}</time>
              </div>

              <h3
                className={cn(
                  "font-bold leading-snug tracking-[-0.02em] text-primary [text-wrap:balance]",
                  hasMultiple ? "text-lg" : "text-xl sm:text-2xl"
                )}
              >
                <Link
                  to={post.url}
                  className="rounded transition-colors hover:text-text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-secondary">
                {post.description}
              </p>

              <Link
                to={post.url}
                aria-label={`Ler artigo: ${post.title}`}
                className="mt-auto inline-flex min-h-[44px] w-fit items-center gap-2 pt-4 text-sm font-semibold text-text-brand transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Ler artigo
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogNewsCarousel;
