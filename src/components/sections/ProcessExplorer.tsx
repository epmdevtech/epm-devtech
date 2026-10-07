import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  IconProcessUnderstand,
  IconProcessDefine,
  IconProcessDevelop,
  IconProcessEvolve,
  type IconProps,
} from "@/components/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface ProcessStep {
  step: string;
  title: string;
  handle: string;
  executiveSummary: string;
  deliverables: string[];
  exitCriteria: string;
  Icon: React.FC<IconProps>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Entendemos",
    handle: "DIAGNÓSTICO & CONTEXTO",
    executiveSummary:
      "Investigamos a fundo o funcionamento da sua empresa, os sistemas em uso e onde estão os verdadeiros gargalos. Nenhum código é iniciado sem termos clareza do problema que precisa ser resolvido.",
    deliverables: [
      "Matriz de Riscos & Restrições",
      "Diagrama C4 Inicial",
      "Estimativa de Custo de Nuvem",
      "Documento de Visão de Produto",
    ],
    exitCriteria:
      "Alinhamento técnico e de objetivos formalmente acordado antes da implementação.",
    Icon: IconProcessUnderstand,
  },
  {
    step: "02",
    title: "Definimos",
    handle: "ESCOPO & PLANEJAMENTO",
    executiveSummary:
      "Organizamos a solução em entregas claras e priorizadas por impacto no negócio. Definimos regras, interfaces e cronograma de forma que sua equipe saiba exatamente o que esperar de cada ciclo.",
    deliverables: [
      "Especificações Técnicas (SPECs)",
      "Contratos de API (OpenAPI)",
      "Backlog Técnico Priorizado",
      "Cronograma de Marcos e Sprints",
    ],
    exitCriteria:
      "Escopo, arquitetura e marcos de entrega validados em conjunto com a sua equipe.",
    Icon: IconProcessDefine,
  },
  {
    step: "03",
    title: "Desenvolvemos",
    handle: "ENTREGAS INCREMENTAIS",
    executiveSummary:
      "Construímos o código com testes automatizados rigorosos e deploys contínuos em ambiente de homologação. Você testa e valida cada etapa funcionando, sem caixas-pretas.",
    deliverables: [
      "Código com Cobertura de Testes (≥90%)",
      "Pipeline CI/CD Automatizado",
      "Builds Incrementais Homologados",
      "Documentação Viva de Código",
    ],
    exitCriteria:
      "Funcionalidades testadas e homologadas pela sua equipe antes de entrarem em produção.",
    Icon: IconProcessDevelop,
  },
  {
    step: "04",
    title: "Evoluímos",
    handle: "OPERAÇÃO & SUPORTE",
    executiveSummary:
      "Colocamos o sistema no ar de forma assistida, com monitoramento ativo e resposta rápida. Acompanhamos a operação de perto para garantir estabilidade contínua e evolução segura.",
    deliverables: [
      "Dashboards de Telemetria e Logs",
      "Métricas de Performance e SLAs",
      "Plano de Sustentação Contínua",
      "Guia de Repasse e Transferência",
    ],
    exitCriteria:
      "Sistema em produção com telemetria ativa e suporte técnico dedicado.",
    Icon: IconProcessEvolve,
  },
];

export interface ProcessExplorerProps {
  className?: string;
}

export const ProcessExplorer: React.FC<ProcessExplorerProps> = ({ className }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();
  const explorerRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.65,
  });

  const currentStep = PROCESS_STEPS[activeStepIndex];

  const toggleMobileStep = (index: number) => {
    setMobileExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div ref={explorerRef} className={cn("w-full", className)}>
      {/* ── Visualização Desktop (>= md) ── */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-start">
        {/* Coluna da Esquerda: Seletor Vertical das 4 Etapas */}
        <div
          className="md:col-span-5 lg:col-span-4 flex flex-col gap-2.5"
          role="tablist"
          aria-label="Etapas da metodologia de trabalho"
        >
          {PROCESS_STEPS.map((step, index) => {
            const isActive = activeStepIndex === index;
            return (
              <button
                key={step.step}
                role="tab"
                id={`tab-step-${step.step}`}
                aria-selected={isActive}
                aria-controls={`panel-step-${step.step}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveStepIndex(index)}
                className={cn(
                  "w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  isActive
                    ? "border-brand/60 bg-surface-elevated/80 dark:bg-zinc-900/80 shadow-sm border-l-4 border-l-brand"
                    : "border-border-default/70 bg-surface/40 hover:bg-surface-elevated/50 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/40 border-l-4 border-l-transparent text-secondary hover:text-primary",
                )}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold px-2 py-0.5 rounded transition-colors",
                        isActive
                          ? "bg-brand/15 text-text-brand font-bold"
                          : "bg-surface-elevated text-secondary group-hover:text-primary",
                      )}
                    >
                      {step.step}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-wider transition-colors",
                        isActive ? "text-text-brand" : "text-tertiary",
                      )}
                    >
                      {step.handle}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-base sm:text-lg font-bold tracking-tight transition-colors",
                      isActive ? "text-primary" : "text-secondary group-hover:text-primary",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Coluna da Direita: Painel Técnico Detalhado */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="relative rounded-2xl border border-border-default/80 bg-surface/80 dark:bg-zinc-950/70 p-6 sm:p-8 min-h-[420px] shadow-2xl backdrop-blur-sm overflow-hidden flex flex-col justify-between">
            {/* Linha sutil de ambient glow no topo */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent opacity-60"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.step}
                id={`panel-step-${currentStep.step}`}
                role="tabpanel"
                aria-labelledby={`tab-step-${currentStep.step}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
                className="flex flex-col h-full"
              >
                {/* Topo do Painel: Header da Etapa e Ícone Autoral */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-default/60">
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                      <span>[ ETAPA {currentStep.step} ]</span>
                      <span className="text-tertiary">/</span>
                      <span className="uppercase text-[11px] text-secondary">{currentStep.handle}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                      {currentStep.title}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-xl border border-border-default/80 bg-surface-elevated flex items-center justify-center text-text-brand shrink-0 shadow-sm">
                    <currentStep.Icon size={26} aria-hidden="true" />
                  </div>
                </div>

                {/* Resumo Executivo */}
                <div className="py-5">
                  <p className="text-sm sm:text-base text-secondary leading-relaxed">
                    {currentStep.executiveSummary}
                  </p>
                </div>

                {/* Entregáveis Concretos */}
                <div className="pt-2 pb-6">
                  <div className="font-mono text-xs font-semibold text-text-brand uppercase tracking-wider mb-3">
                    // ENTREGÁVEIS CONCRETOS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentStep.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-elevated/70 dark:bg-zinc-900/60 border border-border-default text-xs font-mono text-primary"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-text-brand shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Critério de Saída (Exit Criteria) */}
                <div className="mt-auto pt-4 border-t border-border-default/60">
                  <div className="flex items-start gap-3 p-3.5 rounded-lg border border-brand/30 bg-brand/5 dark:bg-brand/5">
                    <ShieldCheck className="w-5 h-5 text-text-brand shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-secondary leading-snug">
                      <span className="font-semibold text-primary mr-1">Critério de Saída:</span>
                      {currentStep.exitCriteria}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Visualização Mobile (< md): Accordion Vertical ── */}
      <div className="md:hidden flex flex-col gap-3">
        {PROCESS_STEPS.map((step, index) => {
          const isExpanded = mobileExpandedIndex === index;
          return (
            <div
              key={step.step}
              className={cn(
                "rounded-xl border transition-all duration-200 overflow-hidden",
                isExpanded
                  ? "border-brand/60 bg-surface-elevated/80 dark:bg-zinc-900/80 shadow-md"
                  : "border-border-default/80 bg-surface/50 dark:bg-zinc-950/40",
              )}
            >
              {/* Botão de Disparo do Accordion */}
              <button
                type="button"
                onClick={() => toggleMobileStep(index)}
                aria-expanded={isExpanded}
                aria-controls={`mobile-step-content-${step.step}`}
                className="w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold px-2 py-0.5 rounded",
                      isExpanded
                        ? "bg-brand/20 text-text-brand"
                        : "bg-surface-elevated text-secondary",
                    )}
                  >
                    {step.step}
                  </span>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-brand">
                      {step.handle}
                    </div>
                    <div className="text-base font-bold text-primary">{step.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-text-brand">
                    <step.Icon size={20} aria-hidden="true" />
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-secondary transition-transform duration-200",
                      isExpanded && "rotate-180 text-primary",
                    )}
                  />
                </div>
              </button>

              {/* Conteúdo Expansível do Accordion */}
              {isExpanded && (
                <div
                  id={`mobile-step-content-${step.step}`}
                  className="px-4 pb-5 pt-2 border-t border-border-default/60 flex flex-col gap-4 text-left"
                >
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {step.executiveSummary}
                  </p>

                  <div>
                    <div className="font-mono text-[11px] font-semibold text-text-brand uppercase tracking-wider mb-2">
                      // ENTREGÁVEIS CONCRETOS
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {step.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-surface border border-border-default text-xs font-mono text-primary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-text-brand shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-brand/30 bg-brand/5 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-text-brand shrink-0 mt-0.5" />
                    <div className="text-xs text-secondary leading-snug">
                      <span className="font-semibold text-primary mr-1">Critério de Saída:</span>
                      {step.exitCriteria}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessExplorer;
