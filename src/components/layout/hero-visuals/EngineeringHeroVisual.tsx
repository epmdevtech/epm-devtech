import React from "react";

/**
 * EngineeringHeroVisual
 * ──────────────────────
 * Artefato visual técnico autoral para o Hero de Engenharia (/engineering).
 * Representa um chip processador central de arquitetura de software (EPM-CORE)
 * com barramentos ortogonais em 64-bit, diodos de quality gates e conformidade arquitetural.
 */
export const EngineeringHeroVisual: React.FC = () => {
  const QUALITY_DIODES = [
    { label: "STRICT TYPES", val: "0 any", status: "PASS", color: "#10B981" },
    { label: "QUALITY GATES", val: "100%", status: "VERIFIED", color: "#2DD4BF" },
    { label: "COMPILER", val: "CLEAN", status: "0 ERRORS", color: "#06B6D4" },
    { label: "TEST SUITE", val: "VITEST", status: "PASSED", color: "#38BDF8" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full max-w-[420px] max-h-[420px] rounded-2xl border border-zinc-800/80 bg-zinc-950/70 dark:bg-zinc-950/80 backdrop-blur-md p-6 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top Header do Artefato HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wider">ARCH // KERNEL 64-BIT</span>
        </div>
        <span className="text-[10px] text-cyan-400/90 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
          DETERMINISTIC
        </span>
      </div>

      {/* Centro: Chip Central de Arquitetura com Barramentos e Diodos */}
      <div className="relative flex-1 my-3 flex flex-col justify-center">
        {/* Processador Central / IC Core */}
        <div className="relative p-4 rounded-xl border border-zinc-700/80 bg-zinc-900/80 shadow-inner flex items-center justify-between font-mono mb-3">
          {/* Micro-pinos do IC no topo e fundo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              EPM
            </div>
            <div>
              <span className="text-xs font-bold text-zinc-100 tracking-wider block">
                CORE ARCH ENGINE
              </span>
              <span className="text-[10px] text-zinc-400">
                SOLID · CLEAN ARCH · OWASP
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-zinc-500 block">CLOCK BUS</span>
            <span className="text-xs font-bold text-emerald-400">64-BIT SYNC</span>
          </div>
        </div>

        {/* Grade de 4 Diodos / Portões de Qualidade */}
        <div className="grid grid-cols-2 gap-2 font-mono">
          {QUALITY_DIODES.map((diode) => (
            <div
              key={diode.label}
              className="p-2 rounded-lg border border-zinc-800/80 bg-zinc-900/50 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="text-zinc-400 font-medium">{diode.label}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: diode.color }}
                />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs font-bold text-zinc-200">{diode.val}</span>
                <span
                  className="text-[9px] font-semibold tracking-wider"
                  style={{ color: diode.color }}
                >
                  {diode.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé do Artefato HUD */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          ARQUITETURA RESILIENTE
        </span>
        <span className="text-zinc-400">ZERO DÍVIDA TÉCNICA</span>
      </div>
    </div>
  );
};

export default EngineeringHeroVisual;
