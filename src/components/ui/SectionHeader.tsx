import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  tagline?: string;
  withDot?: boolean;
  title: React.ReactNode;
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
  withDot = false,
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
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs",
            "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
            "dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60",
            taglineClassName
          )}
        >
          {withDot && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
          )}
          <span>{tagline}</span>
        </div>
      )}

      <HeadingTag
        className={cn(
          "font-bold tracking-tight text-zinc-900 dark:text-white",
          isH1
            ? "text-4xl sm:text-5xl lg:text-6xl leading-[1.15] mb-6"
            : "text-3xl sm:text-4xl leading-tight mb-4",
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={cn(
            "font-normal text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400",
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
