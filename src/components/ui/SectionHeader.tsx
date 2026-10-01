import React from "react";
import { cn } from "@/lib/utils";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

export interface SectionHeaderProps {
  id?: string;
  tagline?: string;
  withDot?: boolean; // mantido para compatibilidade de tipos retroativa
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
  taglineClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id,
  tagline,
  title,
  subtitle,
  as = "h2",
  align = "center",
  className,
  taglineClassName,
  titleClassName,
  subtitleClassName,
}) => {
  const HeadingTag = as;
  const isH1 = as === "h1";
  const isCenter = align === "center";

  return (
    <header
      className={cn(
        "relative w-full mb-12 sm:mb-16",
        isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {tagline && (
        <div
          data-testid="section-eyebrow"
          className={cn(
            "inline-flex items-center gap-[7px] text-[11.5px] font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-2.5 sm:mb-3",
            taglineClassName
          )}
        >
          <BrandChipIcon size={15} className="shrink-0" />
          <span>{tagline}</span>
        </div>
      )}

      {title && (
        <HeadingTag
          id={id}
          className={cn(
            "font-bold tracking-tight text-zinc-900 dark:text-white [text-wrap:balance]",
            isH1
              ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.15] mb-5 sm:mb-6"
              : "text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18] max-w-3xl mx-auto",
            subtitle ? "mb-3.5 sm:mb-4" : "mb-0",
            titleClassName
          )}
        >
          {title}
        </HeadingTag>
      )}

      {subtitle && (
        <p
          className={cn(
            "font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto [text-wrap:balance]",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default SectionHeader;
