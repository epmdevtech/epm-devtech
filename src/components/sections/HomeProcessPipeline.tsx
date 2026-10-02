import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  theme: {
    nodeBorder: string;
    nodeText: string;
    nodeGlow: string;
    phaseColor: string;
  };
}

const steps: ProcessStep[] = [
  {
    step: "01",
    phase: "ENTENDIMENTO",
    title: "Diagnóstico técnico",
    description: "Alinhamento direto de objetivos, arquitetura e viabilidade do projeto.",
    theme: {
      nodeBorder: "border-accent-blue/50 group-hover:border-accent-blue",
      nodeText: "text-accent-blue",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]",
      phaseColor: "text-accent-blue",
    },
  },
  {
    step: "02",
    phase: "DEFINIÇÃO",
    title: "Escopo e arquitetura",
    description: "Especificação detalhada, critérios de aceite e cronograma de entregas.",
    theme: {
      nodeBorder: "border-accent-violet/50 group-hover:border-accent-violet",
      nodeText: "text-accent-violet",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(167,139,250,0.35)]",
      phaseColor: "text-accent-violet",
    },
  },
  {
    step: "03",
    phase: "DESENVOLVIMENTO",
    title: "Ciclos incrementais",
    description: "Código testado com validações contínuas em ambiente de homologação.",
    theme: {
      nodeBorder: "border-accent-amber/50 group-hover:border-accent-amber",
      nodeText: "text-accent-amber",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(251,191,36,0.35)]",
      phaseColor: "text-accent-amber",
    },
  },
  {
    step: "04",
    phase: "EVOLUÇÃO",
    title: "Sustentação e escala",
    description: "Monitoramento contínuo e suporte direto para novas demandas operacionais.",
    theme: {
      nodeBorder: "border-brand/50 group-hover:border-brand",
      nodeText: "text-text-brand",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(45,212,191,0.35)]",
      phaseColor: "text-text-brand",
    },
  },
];

/**
 * HomeProcessPipeline
 * ───────────────────
 * Pipeline contínuo de engenharia com esteira animada via Framer Motion.
 * Conecta as etapas 01 a 04 com um feixe de luz dinâmico sobreposto ao trilho base,
 * micro-interações de halo nos nós e elevação de contraste em hover.
 */
export const HomeProcessPipeline: FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mb-8">
      {/* ─── Linha Condutora Horizontal (Desktop >= md) ─── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-[17px] left-[18px] md:right-[calc(25%-36px)] lg:right-[calc(25%-42px)] h-[2px] bg-border-subtle/80 overflow-hidden pointer-events-none z-0"
      >
        {!shouldReduceMotion && (
          <motion.div
            className="w-full h-full bg-gradient-to-r from-transparent via-brand to-transparent will-change-transform"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* ─── Linha Condutora Vertical (Mobile < md) ─── */}
      <div
        aria-hidden="true"
        className="md:hidden absolute top-[18px] bottom-[18px] left-[17px] w-[2px] bg-border-subtle/80 overflow-hidden pointer-events-none z-0"
      >
        {!shouldReduceMotion && (
          <motion.div
            className="w-full h-full bg-gradient-to-b from-transparent via-brand to-transparent will-change-transform"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Lista ordenada acessível de etapas */}
      <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        {steps.map((s) => (
          <li
            key={s.step}
            className="group relative pl-12 pb-8 last:pb-0 md:pl-0 md:pb-0 flex flex-col cursor-default"
          >
            {/* Marcador do Nó (Node) */}
            <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto mb-3 md:mb-5">
              <div
                className={`relative z-10 w-9 h-9 rounded-full bg-surface dark:bg-zinc-950 border-2 ${s.theme.nodeBorder} ${s.theme.nodeText} ${s.theme.nodeGlow} flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 group-hover:scale-110 shadow-sm`}
              >
                {s.step}
              </div>
            </div>

            {/* Conteúdo da Etapa */}
            <div className="flex-1">
              <div
                className={`font-mono text-[11px] font-semibold tracking-wider uppercase mb-1.5 ${s.theme.phaseColor}`}
              >
                {s.step} · {s.phase}
              </div>
              <h3 className="font-semibold text-primary text-base sm:text-lg mb-1.5 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary group-hover:text-primary leading-relaxed transition-colors duration-200">
                {s.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default HomeProcessPipeline;
