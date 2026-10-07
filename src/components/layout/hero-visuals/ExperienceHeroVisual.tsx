import React from "react";

/**
 * ExperienceHeroVisual
 * ────────────────────
 * Artefato visual para o Hero de Experiência (/experience).
 * Composição Tipográfica Display de Métricas (Large-Scale Performance Index — SPEC-113):
 * Elimina containers fechados, usando grandes números editoriais em escala display
 * acompanhados de linhas de cota técnica CAD e marcadores de precisão milimétrica.
 */
export const ExperienceHeroVisual: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full flex flex-col justify-between select-none py-2"
    >
      {/* Luz focal difusa ao fundo */}
      <div className="pointer-events-none absolute -right-8 -top-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-60 h-60 rounded-full bg-teal-500/10 blur-3xl" />

      {/* Régua Técnica Superior com Cotas CAD */}
      <div className="border-b border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pb-3 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold tracking-wider">
            + [METRICS_DISPLAY // PERF_INDEX]
          </span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">COTAÇÃO TÉCNICA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">ESCALA CORPORATIVA</span>
        </div>
      </div>

      {/* Composição Tipográfica Aberta com Grandes Números & Cotas Técnicas */}
      <div className="my-4 space-y-4">
        {/* Bloco 1: 99.98% Uptime com Linha de Cota CAD */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-100 dark:text-zinc-100 text-zinc-900 leading-none">
              99.98%
            </span>
            <span className="font-mono text-[11px] text-emerald-400 font-semibold tracking-wider">
              [DISPONIBILIDADE_ALTA]
            </span>
          </div>

          {/* Linha de Cota CAD SVG */}
          <div className="relative py-1 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
            <div className="flex-1 h-[1px] bg-zinc-700/60 dark:bg-zinc-800 relative flex items-center justify-between">
              <span className="w-1 h-2 bg-zinc-600 dark:bg-zinc-700 block" />
              <span className="w-1 h-2 bg-zinc-600 dark:bg-zinc-700 block" />
            </div>
            <span className="shrink-0 tracking-widest text-zinc-400">TOLERÂNCIA ±0.01%</span>
            <div className="flex-1 h-[1px] bg-zinc-700/60 dark:bg-zinc-800" />
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-400 text-zinc-600 leading-snug">
            Disponibilidade e estabilidade em ambientes de produção com zero paragens não planejadas.
          </p>
        </div>

        {/* Hairline Divisória */}
        <div className="border-t border-zinc-800/60 dark:border-zinc-800/60 border-zinc-200/80" />

        {/* Bloco 2: 0 Paradas com Escala Massiva */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-emerald-400 leading-none">
                0
              </span>
              <span className="text-xs font-mono text-zinc-400 tracking-wider">
                INTERRUPÇÕES
              </span>
            </div>
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-400 text-zinc-600 mt-1 leading-snug">
              Tolerância zero a paradas não planejadas em horários de pico.
            </p>
          </div>

          {/* Marcador de Concorrência */}
          <div className="text-right font-mono">
            <span className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-tight block">
              2.500
            </span>
            <span className="text-[10px] text-zinc-400 block tracking-wider">
              TRANS/S SUPORTADAS
            </span>
          </div>
        </div>

        {/* Hairline Divisória */}
        <div className="border-t border-zinc-800/60 dark:border-zinc-800/60 border-zinc-200/80" />

        {/* Bloco 3: Setores Críticos Integrados */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
            <span className="font-bold text-zinc-300 tracking-wider">
              SETORES CRÍTICOS ATENDIDOS
            </span>
            <span className="text-emerald-400 font-semibold text-[10px]">
              100% AUDITÁVEL
            </span>
          </div>
          <p className="text-[11.5px] text-zinc-400 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            Fintech, Logística, Supply Chain, Saúde e Energia com conformidade rigorosa e rastreabilidade total.
          </p>
        </div>
      </div>

      {/* Régua Técnica Inferior */}
      <div className="border-t border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pt-3 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Operações Críticas Protegidas</span>
        </div>
        <span className="text-zinc-500 tracking-widest hidden sm:inline">
          RESILIÊNCIA // ESCALA_TOTAL
        </span>
      </div>
    </div>
  );
};

export default ExperienceHeroVisual;
