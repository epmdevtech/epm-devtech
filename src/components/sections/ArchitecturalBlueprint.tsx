import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ARCHITECTURAL_LAYERS } from "@/config/architecture";

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
      <div className="max-w-3xl mb-12 sm:mb-14">
        <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
          // ARQUITETURA EM CAMADAS
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary [text-wrap:balance]">
          Stack tecnológica e especialidades de engenharia
        </h2>
        <p className="text-sm sm:text-base text-secondary mt-2 leading-relaxed">
          Especialidades centrais organizadas em camadas arquiteturais: do desenvolvimento web e mobile à infraestrutura corporativa em nuvem e inteligência artificial.
        </p>
      </div>

      {/* Racks Horizontais das 4 Camadas */}
      <TooltipProvider delayDuration={150}>
        <div className="space-y-5 sm:space-y-6">
          {ARCHITECTURAL_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="rounded-2xl border border-border-default/80 bg-surface/40 dark:bg-zinc-950/60 p-6 sm:p-7 md:p-8 hover:border-brand/40 transition-colors duration-200 shadow-sm"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Lado Esquerdo: Identificador de Camada, Status e Descrição */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                  <div>
                    {/* Tag de Camada e Status de Runtime */}
                    <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
                      <span className="font-mono text-[11px] font-semibold text-text-brand tracking-wider">
                        {layer.layerTag}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-mono text-text-brand font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                        {layer.statusBadge}
                      </span>
                    </div>

                    {/* Título da Camada */}
                    <h3 className="text-lg sm:text-xl font-bold text-primary tracking-tight mb-2">
                      {layer.title}
                    </h3>

                    {/* Descrição Arquitetural */}
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>

                {/* Lado Direito: Especialidades com Presença Tipográfica e Badges */}
                <div className="lg:col-span-8 flex flex-wrap gap-2.5 sm:gap-3.5 items-center lg:pt-1">
                  {layer.technologies.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          data-testid={`tech-badge-${tech.name}`}
                          className={cn(
                            "inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-150 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                            tech.highlight
                              ? "border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/60 shadow-sm"
                              : "border-border-default/80 bg-surface-elevated/40 dark:bg-zinc-900/60 hover:bg-surface-elevated/80 dark:hover:bg-zinc-800/80 hover:border-brand/50"
                          )}
                        >
                          {/* Ícone Oficial ou Sparkles para IA */}
                          {tech.icon ? (
                            <img
                              src={tech.icon}
                              alt=""
                              aria-hidden="true"
                              className="w-5 h-5 object-contain filter group-hover:brightness-110 transition-transform duration-150 group-hover:scale-105 shrink-0"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <Sparkles
                              className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 group-hover:scale-110 transition-transform"
                              aria-hidden="true"
                            />
                          )}

                          {/* Nome da Tecnologia */}
                          <span
                            className={cn(
                              "font-bold text-sm sm:text-base tracking-tight transition-colors",
                              tech.highlight
                                ? "text-amber-600 dark:text-amber-300 group-hover:text-amber-500 dark:group-hover:text-amber-200"
                                : "text-primary group-hover:text-brand"
                            )}
                          >
                            {tech.name}
                          </span>

                          {/* Badge de Destaque / Autoridade */}
                          {tech.badge && (
                            <span
                              className={cn(
                                "text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded tracking-wide",
                                tech.badgeVariant === "amber"
                                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                                  : tech.badgeVariant === "brand"
                                  ? "bg-brand/15 text-text-brand border border-brand/30"
                                  : "bg-surface-base dark:bg-zinc-800 text-secondary border border-border-default/70"
                              )}
                            >
                              {tech.badge}
                            </span>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-xs bg-zinc-950 text-zinc-100 border border-border-default/80 p-3 shadow-xl text-xs rounded-xl"
                      >
                        <div className="flex items-center gap-1.5 font-semibold text-text-brand font-mono text-[11px] mb-1">
                          <span>{tech.name}</span>
                          {tech.badge && (
                            <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-brand/20 text-text-brand">
                              {tech.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-zinc-300 text-[11.5px] leading-snug">
                          {tech.purpose}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ArchitecturalBlueprint;
