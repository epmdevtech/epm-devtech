import React from "react";

/**
 * ExperienceHeroVisual
 * ────────────────────
 * Artefato visual técnico autoral para o Hero de Experiência (/experience).
 * Representa um cluster redundante de nós corporativos interconectados por malha geométrica,
 * com indicador de SLA de 99,9% Uptime, osciloscópio de telemetria SVG e métricas de alto throughput.
 */
export const ExperienceHeroVisual: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full max-w-[420px] max-h-[420px] rounded-2xl border border-zinc-800/80 bg-zinc-950/70 dark:bg-zinc-950/80 backdrop-blur-md p-6 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl" />

      {/* Top Header do Artefato HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wider">CLUSTER // TELEMETRY</span>
        </div>
        <span className="text-[10px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          99.9% SLA VERIFIED
        </span>
      </div>

      {/* Centro: Display HUD com Malha de Cluster & Sparkline */}
      <div className="relative flex-1 my-3 flex flex-col justify-center">
        {/* Painel Central com Uptime e Throughput */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/70 font-mono">
            <span className="text-[10px] text-zinc-300 block mb-0.5">DISPONIBILIDADE</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-emerald-400">99,9%</span>
              <span className="text-[10px] text-zinc-300">uptime</span>
            </div>
          </div>
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/70 font-mono">
            <span className="text-[10px] text-zinc-300 block mb-0.5">PICO SUPORTADO</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-cyan-400">2.500</span>
              <span className="text-[10px] text-zinc-300">req/s</span>
            </div>
          </div>
        </div>

        {/* Gráfico de Telemetria / Sparkline de Estabilidade */}
        <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-1 font-mono text-[9.5px] text-zinc-300">
            <span>RESILIÊNCIA EM TEMPO REAL</span>
            <span className="text-emerald-400 font-bold">100% CONSISTÊNCIA</span>
          </div>

          <svg viewBox="0 0 300 44" className="w-full h-11" fill="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Área sombreada */}
            <path
              d="M 0 32 Q 35 12, 70 24 T 140 18 T 210 22 T 280 14 L 300 16 L 300 44 L 0 44 Z"
              fill="url(#sparkGrad)"
            />
            {/* Linha principal */}
            <path
              d="M 0 32 Q 35 12, 70 24 T 140 18 T 210 22 T 280 14 L 300 16"
              stroke="#2DD4BF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Ponto de medição final */}
            <circle cx="300" cy="16" r="3" fill="#10B981" />
            <circle cx="300" cy="16" r="6" stroke="#10B981" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Footer com Leituras Técnicas */}
      <div className="pt-3 border-t border-zinc-800/60 grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-400">
        <div>
          <span className="text-zinc-300 block text-[9px]">VERTICAIS</span>
          <span className="text-zinc-200 font-semibold">4 SETORES</span>
        </div>
        <div>
          <span className="text-zinc-300 block text-[9px]">REGULADOS</span>
          <span className="text-zinc-200 font-semibold">TOLERÂNCIA ZERO</span>
        </div>
        <div>
          <span className="text-zinc-300 block text-[9px]">SEGURANÇA</span>
          <span className="text-emerald-400 font-semibold">AUDITADO</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceHeroVisual;
