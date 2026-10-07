import React from "react";
import { cn } from "@/lib/utils";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface PageHeroProps {
  id?: string;
  eyebrow: string;
  title: string;
  highlightText?: string;
  description: string;
  visual: React.ReactNode;
  primaryCta?: React.ReactNode;
  isVisualInteractive?: boolean;
  className?: string;
  visualClassName?: string;
}

/**
 * PageHero
 * ────────
 * Componente unificado de Hero para todas as rotas do site da EPM DevTech.
 * Baseado em layout assimétrico split (60% editorial / 40% visual em desktop),
 * com iluminação focal difusa, ritmo tonal (data-tone="anchor") e suporte a
 * artefatos visuais técnicos autorais de microcircuitos e arquitetura.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  id,
  eyebrow,
  title,
  highlightText,
  description,
  visual,
  primaryCta,
  isVisualInteractive = false,
  className,
  visualClassName,
}) => {
  const heroRef = useScrollReveal<HTMLElement>({
    selector: "[data-testid='page-eyebrow'], #page-title, [id$='-title'], p, .page-hero-cta, [data-testid='page-hero-visual']",
    stagger: 0.08,
    y: 20,
    duration: 0.65,
  });

  const baseClasses = cn(
    "relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-surface-anchor text-foreground transition-colors duration-200",
    className
  );
  // Preserva min-h-screen caso fornecido junto com min-h-[100svh]
  const finalClassName = className?.includes("min-h-screen") && !baseClasses.includes("min-h-screen")
    ? `${baseClasses} min-h-screen`
    : baseClasses;

  return (
    <section
      id={id}
      ref={heroRef}
      aria-labelledby={id ? `${id}-title` : "page-title"}
      data-tone="anchor"
      className={finalClassName}
    >
      {/* Luz focal difusa ao fundo do artefato visual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl opacity-75"
      />

      <div className="max-w-[1280px] w-[min(100%-48px,1280px)] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna de Conteúdo Editorial (60% da largura em desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            <div
              data-testid={id === "hero" ? "hero-eyebrow" : "page-eyebrow"}
              className="inline-flex items-center gap-2 text-[0.8rem] font-mono font-semibold tracking-[0.04em] text-emerald-400 dark:text-emerald-400 text-text-brand uppercase leading-[1.3] mb-3 select-none"
            >
              <BrandChipIcon size={14} className="shrink-0" />
              <span>{eyebrow}</span>
            </div>

            <h1
              id={id ? `${id}-title` : "page-title"}
              tabIndex={-1}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[1.02] text-primary max-w-[20ch] [text-wrap:balance] outline-none focus:outline-none"
            >
              {title}{" "}
              {highlightText && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {highlightText}
                </span>
              )}
            </h1>

            <p className="mt-6 text-[clamp(1rem,1.15vw,1.125rem)] text-secondary leading-[1.65] max-w-[58ch] [text-wrap:balance]">
              {description}
            </p>

            {primaryCta && <div className="mt-8 page-hero-cta">{primaryCta}</div>}
          </div>

          {/* Coluna do Artefato Visual Técnico (40% da largura em desktop) */}
          <div
            data-testid="page-hero-visual"
            {...(!isVisualInteractive ? { "aria-hidden": "true" } : {})}
            className={cn(
              "lg:col-span-5 flex items-center justify-center relative w-full aspect-square max-w-[460px] mx-auto z-10",
              visualClassName
            )}
          >
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
