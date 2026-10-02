import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CORE_TECHNOLOGIES } from "@/config/architecture";

export interface ArchitecturalBlueprintProps {
  className?: string;
}

const ArchitecturalBlueprint: React.FC<ArchitecturalBlueprintProps> = ({
  className,
}) => {
  return (
    <div
      data-testid="architectural-blueprint"
      className={cn("w-full", className)}
    >
      {/* Cabeçalho da Seção */}
      <div className="max-w-3xl mb-10 sm:mb-12">
        <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
          // ESPECIALIDADES & STACK
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary [text-wrap:balance]">
          Nossas especialidades técnicas
        </h2>
        <p className="text-sm sm:text-base text-secondary mt-2 leading-relaxed">
          Tecnologias centrais que dominamos e aplicamos em produção, priorizando desempenho, estabilidade e capacidade de evolução a longo prazo.
        </p>
      </div>

      {/* Apresentação Tipográfica Editorial (Nuvem de Tecnologias) */}
      <TooltipProvider
        delayDuration={150}
        skipDelayDuration={300}
        disableHoverableContent={true}
      >
        <div
          data-testid="tech-editorial-cloud"
          className="flex flex-wrap items-center gap-x-7 sm:gap-x-10 md:gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10 py-6 sm:py-8"
        >
          {CORE_TECHNOLOGIES.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  data-testid={`tech-badge-${tech.name}`}
                  className="group inline-flex items-center gap-2.5 sm:gap-3 p-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand text-left cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95"
                >
                  {/* Nome Tipográfico de Alto Impacto */}
                  <span
                    className={cn(
                      "font-extrabold tracking-tight transition-colors duration-150 select-none",
                      tech.sizeClass || "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                      tech.accentClass || "text-primary group-hover:text-brand"
                    )}
                  >
                    {tech.name}
                  </span>

                  {/* Badges de Autoridade Inline (ex.: Certificado / Core Runtime) */}
                  {tech.badge && (
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm select-none",
                        tech.badgeVariant === "amber"
                          ? "bg-amber-400 text-zinc-950 font-extrabold"
                          : "bg-brand text-zinc-950 font-extrabold"
                      )}
                    >
                      {tech.badge}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                avoidCollisions={true}
                className="max-w-xs bg-zinc-950 text-zinc-100 border border-border-default/80 p-3.5 shadow-2xl text-xs rounded-xl pointer-events-none"
              >
                <div className="flex items-center gap-2 font-semibold text-text-brand font-mono text-[11px] mb-1.5">
                  {tech.icon && (
                    <img
                      src={tech.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-4 h-4 object-contain shrink-0"
                      loading="lazy"
                    />
                  )}
                  <span>{tech.name}</span>
                  {tech.badge && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-brand/20 text-text-brand font-mono">
                      {tech.badge}
                    </span>
                  )}
                </div>
                <div className="text-zinc-300 text-[11.5px] leading-relaxed">
                  {tech.purpose}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ArchitecturalBlueprint;
