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
            "inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] select-none mb-3",
            taglineClassName
          )}
        >
          <BrandChipIcon size={14} className="shrink-0" />
          <span>{tagline}</span>
        </div>
      )}

      {title && (
        <HeadingTag
          id={id}
          className={cn(
            "font-bold text-primary [text-wrap:balance]",
            isH1
              ? "text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.05em] mb-5 sm:mb-6"
              : "text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.045em] max-w-[20ch] sm:max-w-3xl",
            isCenter && !isH1 && "mx-auto",
            subtitle ? "mb-4 sm:mb-5" : "mb-0",
            titleClassName
          )}
        >
          {title}
        </HeadingTag>
      )}

      {subtitle && (
        <p
          className={cn(
            "text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[65ch] [text-wrap:balance]",
            isCenter && "mx-auto",
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
