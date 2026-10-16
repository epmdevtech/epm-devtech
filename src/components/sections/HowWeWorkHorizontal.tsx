import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProcessPanel {
  step: string;
  category: string;
  title: string;
  message: string;
  deliverables: string[];
  exitCriteria: string;
}

type PanelVisualVariant = "diagnosis" | "architecture" | "pipeline" | "cycle";

const PANELS: ProcessPanel[] = [
  {
    step: "01",
    category: "Entendimento",
    title: "Diagnóstico inicial",
    message:
      "Mapeamos a operação, os sistemas existentes e os gargalos antes de iniciar a implementação.",
    deliverables: [
      "Matriz de Riscos & Restrições",
      "Diagrama C4 Inicial",
      "Estimativa de Custo de Nuvem",
      "Documento de Visão de Produto",
    ],
    exitCriteria:
      "Alinhamento técnico e de objetivos formalmente acordado antes da implementação.",
  },
  {
    step: "02",
    category: "Definição",
    title: "Escopo e entregáveis",
    message:
      "Definimos prioridades, arquitetura, critérios de aceite e planejamento antes de codificar.",
    deliverables: [
      "Especificações Técnicas (SPECs)",
      "Contratos de API (OpenAPI)",
      "Backlog Técnico Priorizado",
      "Cronograma de Marcos e Sprints",
    ],
    exitCriteria:
      "Escopo, arquitetura e marcos de entrega validados em conjunto com a sua equipe.",
  },
  {
    step: "03",
    category: "Desenvolvimento",
    title: "Entregas incrementais",
    message:
      "Desenvolvemos, testamos e validamos incrementos para que o cliente acompanhe a evolução real.",
    deliverables: [
      "Código com Cobertura de Testes (≥90%)",
      "Pipeline CI/CD Automatizado",
      "Builds Incrementais Homologados",
      "Documentação Viva de Código",
    ],
    exitCriteria:
      "Funcionalidades testadas e homologadas pela sua equipe antes de entrarem em produção.",
  },
  {
    step: "04",
    category: "Evolução",
    title: "Sustentação e melhoria",
    message:
      "Acompanhamos a operação e evoluímos a solução de acordo com as necessidades do negócio.",
    deliverables: [
      "Dashboards de Telemetria e Logs",
      "Métricas de Performance e SLAs",
      "Plano de Sustentação Contínua",
      "Guia de Repasse e Transferência",
    ],
    exitCriteria:
      "Sistema em produção com telemetria ativa e suporte técnico dedicado.",
  },
];

const VISUAL_VARIANTS: PanelVisualVariant[] = [
  "diagnosis",
  "architecture",
  "pipeline",
  "cycle",
];

const PanelVisual: React.FC<{ variant: PanelVisualVariant }> = ({ variant }) => {
  const svgProps = {
    viewBox: "0 0 240 120",
    className: "h-full w-full",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (variant) {
    case "diagnosis":
      return (
        <svg {...svgProps}>
          <line x1="120" y1="60" x2="42" y2="26" opacity="0.45" />
          <line x1="120" y1="60" x2="42" y2="94" opacity="0.45" />
          <line x1="120" y1="60" x2="198" y2="38" opacity="0.45" />
          <line x1="120" y1="60" x2="198" y2="94" opacity="0.45" />
          <rect x="104" y="44" width="32" height="32" rx="7" strokeWidth="1.75" />
          <circle cx="42" cy="26" r="7" />
          <circle cx="42" cy="94" r="7" />
          <rect x="191" y="31" width="14" height="14" rx="3" />
          <path d="M198 87 l7 12 h-14 z" strokeWidth="1.5" />
        </svg>
      );
    case "architecture":
      return (
        <svg {...svgProps}>
          <rect x="34" y="18" width="172" height="20" rx="4" />
          <rect x="34" y="50" width="172" height="20" rx="4" />
          <rect x="34" y="82" width="172" height="20" rx="4" />
          <line x1="120" y1="38" x2="120" y2="50" opacity="0.6" />
          <line x1="120" y1="70" x2="120" y2="82" opacity="0.6" />
          <line x1="52" y1="28" x2="188" y2="28" opacity="0.35" />
          <line x1="52" y1="60" x2="188" y2="60" opacity="0.35" />
          <line x1="52" y1="92" x2="188" y2="92" opacity="0.35" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...svgProps}>
          <rect x="20" y="46" width="46" height="28" rx="6" />
          <rect x="97" y="46" width="46" height="28" rx="6" />
          <rect x="174" y="46" width="46" height="28" rx="6" />
          <line x1="66" y1="60" x2="97" y2="60" opacity="0.6" />
          <line x1="143" y1="60" x2="174" y2="60" opacity="0.6" />
          <path d="M88 56 l6 4 -6 4 z" fill="currentColor" stroke="none" />
          <path d="M165 56 l6 4 -6 4 z" fill="currentColor" stroke="none" />
          <path d="M110 60 l4 4 7 -8" strokeWidth="1.5" />
          <path d="M187 60 l4 4 7 -8" strokeWidth="1.5" />
        </svg>
      );
    case "cycle":
      return (
        <svg {...svgProps}>
          <circle cx="120" cy="60" r="38" opacity="0.35" strokeDasharray="4 6" />
          <circle cx="120" cy="22" r="7" />
          <circle cx="153" cy="79" r="7" />
          <circle cx="87" cy="79" r="7" />
          <path d="M120 22 A38 38 0 0 1 153 79" opacity="0.55" />
          <path d="M153 79 A38 38 0 0 1 87 79" opacity="0.55" />
          <path d="M87 79 A38 38 0 0 1 120 22" opacity="0.55" />
          <path d="M120 15 l5 7 -10 0 z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
};

/**
 * HowWeWorkHorizontal
 * ───────────────────
 * Narrativa horizontal das 4 etapas do processo controlada pelo scroll vertical.
 *
 * Estratégia: CSS nativo de scroll-driven animations (`position: sticky` +
 * `animation-timeline: view()` + `animation-range: contain`). A altura da seção
 * é derivada da geometria real dos painéis, garantindo que o deslocamento
 * horizontal corresponda exatamente ao conteúdo, sem sobras nem cortes.
 *
 * Fallback: em viewports < 1024px, sob `prefers-reduced-motion: reduce` ou em
 * navegadores sem suporte a `animation-timeline`, os quatro passos são exibidos
 * em sequência vertical convencional, legível e acessível.
 */
export const HowWeWorkHorizontal: React.FC = () => {
  return (
    <>
      <style>{`
        .hwwh {
          position: relative;
          width: 100%;
        }
        .hwwh__sticky {
          position: static;
          width: 100%;
        }
        .hwwh__track {
          list-style: none;
          margin: 0;
          padding: clamp(3.5rem, 8vw, 5.5rem) 0;
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 6vw, 4rem);
        }
        .hwwh__panel {
          width: min(100% - 2rem, 46rem);
          margin-inline: auto;
        }
        .hwwh__num {
          font-variant-numeric: tabular-nums;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.06em;
        }
        .hwwh__progress {
          display: none;
        }

        @supports (animation-timeline: view()) {
          @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
            .hwwh {
              --hwwh-panel-w: clamp(440px, 46vw, 760px);
              --hwwh-gap: clamp(24px, 2.5vw, 56px);
              --hwwh-edge: clamp(40px, 6vw, 112px);
              --hwwh-travel: calc(
                4 * var(--hwwh-panel-w) + 3 * var(--hwwh-gap) + 2 * var(--hwwh-edge) - 100vw
              );
              height: calc(100vh + var(--hwwh-travel));
              overflow: visible;
              view-timeline-name: --hwwh-timeline;
              view-timeline-axis: block;
            }
            .hwwh__sticky {
              position: sticky;
              top: 0;
              height: 100vh;
              width: 100%;
              overflow: hidden;
              display: flex;
              align-items: center;
            }
            .hwwh__track {
              flex-direction: row;
              flex-wrap: nowrap;
              align-items: stretch;
              width: max-content;
              padding: 0 var(--hwwh-edge);
              gap: var(--hwwh-gap);
              will-change: transform;
              animation: hwwh-move linear forwards;
              animation-timeline: --hwwh-timeline;
              animation-range: contain 0% contain 100%;
            }
            .hwwh__panel {
              width: var(--hwwh-panel-w);
              flex: 0 0 auto;
              margin-inline: 0;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-block: clamp(6rem, 14vh, 9rem) clamp(3rem, 8vh, 6rem);
            }
            .hwwh__progress {
              display: flex;
              position: absolute;
              left: 50%;
              bottom: clamp(1.25rem, 4vh, 2.5rem);
              transform: translateX(-50%);
              width: min(280px, 40vw);
              align-items: center;
              gap: 0.75rem;
            }
            .hwwh__progress-rail {
              position: relative;
              flex: 1;
              height: 2px;
              background: rgb(var(--border-default-rgb) / 0.6);
              overflow: hidden;
            }
            .hwwh__progress-fill {
              position: absolute;
              inset: 0;
              transform-origin: left center;
              background: rgb(var(--brand-rgb));
              animation: hwwh-progress linear forwards;
              animation-timeline: --hwwh-timeline;
              animation-range: contain 0% contain 100%;
            }
            @keyframes hwwh-move {
              to { transform: translateX(calc(-100% + 100vw)); }
            }
            @keyframes hwwh-progress {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
          }
        }
      `}</style>

      <div className="hwwh">
        <h2 id="hwwh-heading" className="sr-only">
          As quatro etapas do nosso processo de trabalho
        </h2>

        <div className="hwwh__sticky">
          <ol
            className="hwwh__track"
            aria-label="Etapas do processo de trabalho"
          >
            {PANELS.map((panel, index) => (
              <li key={panel.step} className="hwwh__panel">
                <article className="flex h-full flex-col justify-center gap-6">
                  {/* Cabeçalho editorial: número + categoria */}
                  <div className="flex items-end gap-4">
                    <span
                      className="hwwh__num text-brand/30 dark:text-brand/25"
                      aria-hidden="true"
                    >
                      {panel.step}
                    </span>
                    <div className="flex flex-col pb-1">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-brand">
                        {panel.category}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        Etapa {panel.step} de 04
                      </span>
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-primary [text-wrap:balance]">
                    <span className="sr-only">Etapa {panel.step}: </span>
                    {panel.title}
                  </h3>

                  {/* Mensagem */}
                  <p className="max-w-[52ch] text-[clamp(0.98rem,1.15vw,1.12rem)] leading-[1.65] text-secondary">
                    {panel.message}
                  </p>

                  {/* Elemento visual autoral */}
                  <div
                    className="h-[110px] w-full max-w-[340px] text-text-brand/70"
                    aria-hidden="true"
                  >
                    <PanelVisual variant={VISUAL_VARIANTS[index]} />
                  </div>

                  {/* Entregáveis concretos */}
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-text-brand">
                      // Entregáveis
                    </span>
                    <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                      {panel.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2 text-[0.82rem] leading-snug text-secondary"
                        >
                          <CheckCircle2
                            className="mt-[3px] h-3.5 w-3.5 shrink-0 text-text-brand"
                            aria-hidden="true"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Critério de saída */}
                  <div className="border-l-2 border-brand/50 pl-4">
                    <p className="text-[0.8rem] leading-snug text-secondary">
                      <span className="font-semibold text-primary">
                        Critério de saída:{" "}
                      </span>
                      {panel.exitCriteria}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/* Indicador de progressão (decorativo) */}
          <div className="hwwh__progress" aria-hidden="true">
            <span className="font-mono text-[11px] text-muted">01</span>
            <span className="hwwh__progress-rail">
              <span className="hwwh__progress-fill" />
            </span>
            <span className="font-mono text-[11px] text-muted">04</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWeWorkHorizontal;
