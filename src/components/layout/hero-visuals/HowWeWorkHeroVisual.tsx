import React from "react";

/**
 * HowWeWorkHeroVisual
 * ───────────────────
 * Artefato visual técnico autoral para o Hero de Metodologia (/how-we-work).
 * Representa uma esteira sequencial de circuito impresso com 4 portais de validação
 * (Diagnóstico -> Escopo -> Código -> Evolução), nós com feedback óptico e barramento de sincronismo.
 */
export const HowWeWorkHeroVisual: React.FC = () => {
  const STAGES = [
    { num: "01", name: "DIAGNOSE", gate: "C4 & RISKS OK", color: "#10B981" },
    { num: "02", name: "SPEC", gate: "OPENAPI & SPECS", color: "#2DD4BF" },
    { num: "03", name: "BUILD", gate: "100% COVERAGE", color: "#06B6D4" },
    { num: "04", name: "EVOLVE", gate: "CONTINUOUS QA", color: "#38BDF8" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full max-w-[420px] max-h-[420px] rounded-2xl border border-zinc-800/80 bg-zinc-950/70 dark:bg-zinc-950/80 backdrop-blur-md p-6 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -top-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top Header do Artefato HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wider">PIPELINE // 4-STAGE ENGINE</span>
        </div>
        <span className="text-[10px] text-cyan-400/90 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
          DETERMINISTIC
        </span>
      </div>

      {/* Centro: As 4 Etapas em Linha de Produção de Circuito */}
      <div className="relative my-3 space-y-2.5">
        {/* Linha vertical de sincronização */}
        <div className="absolute left-[23px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-500 opacity-40 -z-0" />

        {STAGES.map((stg) => (
          <div
            key={stg.num}
            className="relative z-10 flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xs font-mono transition-colors hover:border-teal-500/40"
          >
            <div className="flex items-center gap-3">
              {/* Ponto / Nó de Circuito com Anel Externo */}
              <div className="relative w-7 h-7 rounded-md bg-zinc-950 border border-zinc-700 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold" style={{ color: stg.color }}>
                  {stg.num}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-200 tracking-wide block">
                  {stg.name}
                </span>
                <span className="text-[9.5px] text-zinc-300 tracking-wider">
                  {stg.gate}
                </span>
              </div>
            </div>

            {/* Status do Gate */}
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>PASSED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer com Leituras Técnicas */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <div>
          <span className="text-zinc-400 block text-[9px]">MANAGEMENT</span>
          <span className="text-zinc-200 font-semibold">100% DIRECT TECH</span>
        </div>
        <div className="text-right">
          <span className="text-zinc-400 block text-[9px]">REVIEWS</span>
          <span className="text-emerald-400 font-semibold">HUMAN ARCHITECT</span>
        </div>
      </div>
    </div>
  );
};

export default HowWeWorkHeroVisual;
