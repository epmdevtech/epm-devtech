import React from "react";
import { cn } from "@/lib/utils";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  containerClassName,
  children,
}) => {
  const isCenter = align === "center";
  const headerRef = useScrollReveal<HTMLElement>({
    selector: "[data-testid='page-eyebrow'], #page-title, p, .page-header-cta",
    stagger: 0.08,
    y: 20,
    duration: 0.65,
  });

  return (
    <header
      ref={headerRef}
      data-tone="anchor"
      className={cn(
        "relative w-full pt-28 pb-12 sm:pt-36 sm:pb-16 bg-surface-anchor text-foreground transition-colors duration-200",
        className
      )}
    >
      <div
        className={cn(
          "container editorial-container",
          isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-3xl",
          containerClassName
        )}
      >
        {eyebrow && (
          <div
            data-testid="page-eyebrow"
            className={cn(
              "inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] select-none mb-3 sm:mb-4",
              isCenter ? "justify-center" : "justify-start"
            )}
          >
            <BrandChipIcon size={14} className="shrink-0" />
            <span>{eyebrow}</span>
          </div>
        )}

        <h1
          id="page-title"
          tabIndex={-1}
          className="font-bold text-primary text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.05em] [text-wrap:balance] outline-none focus:outline-none"
        >
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              "mt-4 sm:mt-5 text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.65] tracking-[-0.01em] text-secondary max-w-[65ch] [text-wrap:balance]",
              isCenter && "mx-auto"
            )}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
