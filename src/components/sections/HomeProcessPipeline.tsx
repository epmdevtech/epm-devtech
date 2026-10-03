import { FC } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    title: "Diagnóstico inicial",
    description: "Mapeamos os gargalos operacionais e desenhamos a arquitetura mais eficiente para o seu momento.",
    theme: {
      nodeBorder: "border-zinc-300 dark:border-accent-blue/50 dark:group-hover:border-accent-blue",
      nodeText: "text-zinc-900 dark:text-accent-blue",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]",
      phaseColor: "text-accent-blue",
    },
  },
  {
    step: "02",
    phase: "DEFINIÇÃO",
    title: "Escopo e entregáveis",
    description: "Definimos critérios claros de aceite, cronograma realista e prioridades de negócio antes de codificar.",
    theme: {
      nodeBorder: "border-zinc-300 dark:border-accent-violet/50 dark:group-hover:border-accent-violet",
      nodeText: "text-zinc-900 dark:text-accent-violet",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(167,139,250,0.35)]",
      phaseColor: "text-accent-violet",
    },
  },
  {
    step: "03",
    phase: "DESENVOLVIMENTO",
    title: "Entregas incrementais",
    description: "Código testado com validações periódicas em homologação para sua equipe acompanhar a evolução real.",
    theme: {
      nodeBorder: "border-zinc-300 dark:border-accent-amber/50 dark:group-hover:border-accent-amber",
      nodeText: "text-zinc-900 dark:text-accent-amber",
      nodeGlow: "group-hover:shadow-[0_0_15px_rgba(251,191,36,0.35)]",
      phaseColor: "text-accent-amber",
    },
  },
  {
    step: "04",
    phase: "EVOLUÇÃO",
    title: "Sustentação e melhoria",
    description: "Acompanhamento próximo em produção, monitoramento de estabilidade e suporte técnico ágil.",
    theme: {
      nodeBorder: "border-zinc-300 dark:border-brand/50 dark:group-hover:border-brand",
      nodeText: "text-zinc-900 dark:text-text-brand",
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
  const pipelineRef = useScrollReveal<HTMLOListElement>({
    selector: ":scope > li",
    stagger: 0.12,
    y: 24,
    duration: 0.65,
  });

  return (
    <div className="relative mb-8">
      {/* ─── Linha Condutora Horizontal (Desktop >= md) ─── */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-[17px] left-[18px] md:right-[calc(25%-36px)] lg:right-[calc(25%-42px)] h-[2px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden pointer-events-none z-0"
      >
        {!shouldReduceMotion && (
          <motion.div
            className="w-full h-full bg-gradient-to-r from-transparent via-emerald-600 dark:via-brand to-transparent will-change-transform"
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
        className="md:hidden absolute top-[18px] bottom-[18px] left-[17px] w-[2px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden pointer-events-none z-0"
      >
        {!shouldReduceMotion && (
          <motion.div
            className="w-full h-full bg-gradient-to-b from-transparent via-emerald-600 dark:via-brand to-transparent will-change-transform"
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
      <ol ref={pipelineRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative z-10">
        {steps.map((s) => (
          <li
            key={s.step}
            className="group relative pl-12 pb-8 last:pb-0 md:pl-0 md:pb-0 flex flex-col cursor-default"
          >
            {/* Marcador do Nó (Node) */}
            <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto mb-3 md:mb-5">
              <div
                className={`relative z-10 w-9 h-9 rounded-full bg-white dark:bg-zinc-950 border-2 ${s.theme.nodeBorder} ${s.theme.nodeText} ${s.theme.nodeGlow} flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 group-hover:scale-110 shadow-sm`}
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
              <h3 className="font-semibold text-primary text-[clamp(1.1rem,1.4vw,1.25rem)] tracking-[-0.02em] leading-[1.25] mb-1.5 transition-colors">
                {s.title}
              </h3>
              <p className="text-[clamp(0.875rem,0.95vw,0.95rem)] text-secondary group-hover:text-primary leading-relaxed transition-colors duration-200 max-w-[50ch]">
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
