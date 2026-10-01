import React from "react";
import { cn } from "@/lib/utils";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) => {
  const isCenter = align === "center";

  return (
    <header
      className={cn(
        "relative w-full pt-28 pb-8 sm:pt-36 sm:pb-12 border-b border-border/40 mb-12 sm:mb-16",
        className
      )}
    >
      <div
        className={cn(
          "container px-6",
          isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-3xl"
        )}
      >
        {eyebrow && (
          <div
            data-testid="page-eyebrow"
            className={cn(
              "inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3 sm:mb-4",
              isCenter ? "justify-center" : "justify-start"
            )}
          >
            <BrandChipIcon size={15} className="shrink-0" />
            <span>{eyebrow}</span>
          </div>
        )}

        <h1
          id="page-title"
          tabIndex={-1}
          className="font-bold tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl leading-[1.15] [text-wrap:balance] outline-none focus:outline-none"
        >
          {title}
        </h1>

        {description && (
          <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground [text-wrap:balance]">
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
