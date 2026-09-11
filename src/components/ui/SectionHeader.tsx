import React from "react";
import { cn } from "@/lib/utils";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

export interface SectionHeaderProps {
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
    <div
      className={cn(
        "w-full",
        isCenter ? "text-center max-w-2xl sm:max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {tagline && (
        <div
          data-testid="section-eyebrow"
          className={cn(
            "inline-flex items-center gap-[7px] text-[11.5px] font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none",
            title ? "mb-3.5" : "mb-2",
            taglineClassName
          )}
        >
          <BrandChipIcon size={15} className="shrink-0" />
          <span>{tagline}</span>
        </div>
      )}

      {title && (
        <HeadingTag
          className={cn(
            "font-bold tracking-tight text-zinc-900 dark:text-white",
            isH1
              ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.15] mb-6"
              : "text-3xl sm:text-4xl leading-tight",
            subtitle ? "mb-4" : "mb-0",
            titleClassName
          )}
        >
          {title}
        </HeadingTag>
      )}

      {subtitle && (
        <p
          className={cn(
            "font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 mt-3",
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
