import React from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "anchor" | "base" | "alt";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  tone: SectionTone;
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";
  container?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  anchor: "bg-surface-anchor text-foreground",
  base: "bg-surface-base text-foreground",
  alt: "bg-surface-alt text-foreground",
};

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      tone,
      as: Component = "section",
      container = true,
      containerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        data-tone={tone}
        className={cn(
          "w-full transition-colors duration-200 py-16 sm:py-20 md:py-24 lg:py-28 section-wrapper",
          TONE_CLASSES[tone],
          className
        )}
        {...props}
      >
        {container ? (
          <div className={cn("container px-6", containerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
export default SectionWrapper;
