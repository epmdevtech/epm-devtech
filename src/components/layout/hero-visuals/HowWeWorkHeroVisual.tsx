import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HowWeWorkHeroVisual
 * ───────────────────
 * Artefato visual para o Hero de Metodologia (/how-we-work).
 * Régua de Precisão de Engenharia (Execution Timeline Sequence — SPEC-113):
 * Elimina containers e cards fechados, apresentando uma régua milimétrica contínua
 * com escala horizontal e pulsos de sinal conectando as 4 fases de execução.
 */
export const HowWeWorkHeroVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const PHASES = [
    {
      code: "[01]",
      title: "DIAGNÓSTICO ESTRATÉGICO",
      desc: "Imersão técnica profunda nos gargalos da operação e alinhamento de escopo sem meias-palavras.",
      badge: "Escopo Claro",
      color: "#10B981",
    },
    {
      code: "[02]",
      title: "ARQUITETURA RESILIENTE",
      desc: "Definição de contratos de dados e arquitetura modular que impede retrabalhos e passivo técnico.",
      badge: "Sem Retrabalho",
      color: "#2DD4BF",
    },
    {
      code: "[03]",
      title: "CICLOS INCREMENTAIS",
      desc: "Entregas quinzenais de software funcionando em ambiente real com visibilidade completa.",
      badge: "Progresso Real",
      color: "#06B6D4",
    },
    {
      code: "[04]",
      title: "PRODUÇÃO COM ZERO INTERRUPÇÃO",
      desc: "Homologação rigorosa e transição operacional suave, sem nunca paralisar o faturamento do cliente.",
      badge: "Operação Ativa",
      color: "#38BDF8",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full flex flex-col justify-between select-none py-2"
    >
      {/* Luz focal difusa ao fundo */}
      <div className="pointer-events-none absolute -right-8 -bottom-8 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 -top-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Régua Milimétrica Superior com Ticks de Engenharia */}
      <div className="border-b border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pb-2.5">
        <div className="flex items-center justify-between font-mono text-[11px] mb-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider">
            <span>+ [EXECUTION_TIMELINE // 01-04]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">CRONOGRAMA SEGURO</span>
          </div>
        </div>

        {/* Graduação Milimétrica Gráfica SVG */}
        <div className="w-full h-3 overflow-hidden">
          <svg className="w-full h-3" preserveAspectRatio="none">
            <defs>
              <pattern
                id="millimeterTicks"
                width="20"
                height="12"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="12" stroke="#52525B" strokeWidth="1" opacity="0.6" />
                <line x1="5" y1="6" x2="5" y2="12" stroke="#52525B" strokeWidth="0.5" opacity="0.4" />
                <line x1="10" y1="3" x2="10" y2="12" stroke="#52525B" strokeWidth="0.8" opacity="0.5" />
                <line x1="15" y1="6" x2="15" y2="12" stroke="#52525B" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#millimeterTicks)" />
          </svg>
        </div>
      </div>

      {/* Sequência das 4 Fases com Linha Condutora Contínua */}
      <div className="relative my-3 space-y-2.5">
        {/* Linha técnica vertical de barramento contínuo com pulso luminoso */}
        <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-500 via-teal-400 to-cyan-500 opacity-25" />
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-[15px] w-[2px] h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            animate={{ top: ["0%", "85%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {PHASES.map((phase) => (
          <div
            key={phase.code}
            className="relative pl-8 group transition-colors duration-200"
          >
            {/* Nó conector milimétrico alinhado à régua vertical */}
            <div
              className="absolute left-[10px] top-1.5 w-3 h-3 rounded-full bg-zinc-950 border-2 flex items-center justify-center transition-transform group-hover:scale-125"
              style={{ borderColor: phase.color }}
            >
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: phase.color }}
              />
            </div>

            {/* Cabeçalho da Fase */}
            <div className="flex items-center justify-between text-[11px] font-mono leading-none mb-1">
              <span
                className="font-bold tracking-wider"
                style={{ color: phase.color }}
              >
                {phase.code} {phase.title}
              </span>
              <span className="text-[9.5px] font-medium text-zinc-400 bg-zinc-800/40 border border-zinc-700/50 px-1.5 py-0.5 rounded">
                {phase.badge}
              </span>
            </div>

            {/* Descrição Aberta */}
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-400 text-zinc-600 leading-snug">
              {phase.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Régua Técnica Inferior */}
      <div className="border-t border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pt-3 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Visibilidade Total a Cada Etapa</span>
        </div>
        <span className="text-zinc-500 tracking-widest hidden sm:inline">
          RÉGUA_PRECISÃO // ZERO SURPRESAS
        </span>
      </div>
    </div>
  );
};

export default HowWeWorkHeroVisual;
