import React from "react";
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
          Stack tecnológica organizada por camadas de software
        </h2>
        <p className="text-sm sm:text-base text-secondary mt-2 leading-relaxed">
          Visão arquitetural de como componentes de interface, serviços de aplicação, mensageria e infraestrutura conectam-se para formar sistemas estáveis e fáceis de evoluir.
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

                {/* Lado Direito: Badges Técnicas com Logo e Tooltip de Função */}
                <div className="lg:col-span-8 flex flex-wrap gap-2 sm:gap-2.5 items-center lg:pt-1">
                  {layer.technologies.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          data-testid={`tech-badge-${tech.name}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-default/80 bg-surface-elevated/40 dark:bg-zinc-900/50 hover:bg-surface-elevated/80 dark:hover:bg-zinc-900/90 hover:border-brand/50 transition-all duration-150 cursor-pointer group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                        >
                          <img
                            src={tech.icon}
                            alt=""
                            aria-hidden="true"
                            className="w-4 h-4 object-contain filter group-hover:brightness-110 transition-transform duration-150 group-hover:scale-105 shrink-0"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback silencioso se o ícone remoto falhar
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <span className="font-mono text-xs text-text-primary group-hover:text-primary transition-colors font-medium">
                            {tech.name}
                          </span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-xs bg-zinc-950 text-zinc-100 border border-border-default/80 p-2.5 shadow-xl text-xs rounded-lg"
                      >
                        <div className="font-semibold text-text-brand font-mono text-[11px] mb-1">
                          {tech.name}
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
