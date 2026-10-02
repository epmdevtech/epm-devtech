import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  IconProcessUnderstand,
  IconProcessDefine,
  IconProcessDevelop,
  IconProcessEvolve,
} from "@/components/icons";

const steps = [
  {
    Icon: IconProcessUnderstand,
    step: "01",
    title: "Entendemos",
    handle: "DIAGNÓSTICO & CONTEXTO",
    description: "Conhecemos o problema, o contexto e os objetivos do negócio.",
  },
  {
    Icon: IconProcessDefine,
    step: "02",
    title: "Definimos",
    handle: "ESCOPO & PRIORIDADES",
    description: "Transformamos necessidades em escopo, prioridades e abordagem.",
  },
  {
    Icon: IconProcessDevelop,
    step: "03",
    title: "Desenvolvemos",
    handle: "ENGENHARIA INCREMENTAL",
    description: "Construímos a solução de forma incremental e acompanhada.",
  },
  {
    Icon: IconProcessEvolve,
    step: "04",
    title: "Evoluímos",
    handle: "SUSTENTAÇÃO & CRESCIMENTO",
    description: "Entregamos, acompanhamos e evoluímos conforme o negócio cresce.",
  },
];

/* Posições dos pontos ao longo da linha do pipeline para 4 etapas no desktop */
const DOT_POSITIONS = [12.5, 37.5, 62.5, 87.5];

export interface HowWeWorkProps {
  hideHeader?: boolean;
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ hideHeader = false }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           HOW WE WORK PIPELINE SECTION (SEQUENCIAL)
        ══════════════════════════════════════════════════ */

        .hww-pipeline-wrapper {
          position: relative;
          width: 100%;
          margin: 3rem 0 4.5rem;
        }

        .hww-pipeline {
          position: relative;
          width: 100%;
          height: 8px;
          background: hsl(var(--border) / 0.4);
          border-radius: 999px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
          overflow: visible;
        }
        .dark .hww-pipeline {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03);
        }

        .hww-pipeline-fill {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          border-radius: 999px;
          background: linear-gradient(90deg,
            hsl(var(--primary)),
            hsl(var(--primary) / 0.7),
            hsl(var(--primary) / 0.5)
          );
          box-shadow:
            0 0 12px 2px hsl(var(--primary) / 0.4),
            0 0 28px 4px hsl(var(--primary) / 0.2);
          transform-origin: left;
        }

        .hww-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 18px; height: 18px;
          border-radius: 50%;
          background: hsl(var(--primary));
          border: 3px solid hsl(var(--background));
          box-shadow:
            0 0 0 2px hsl(var(--primary) / 0.5),
            0 0 14px 3px hsl(var(--primary) / 0.5);
          z-index: 2;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .hww-dot.visible { transform: translate(-50%, -50%) scale(1); }

        .hww-connector {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 2px;
          background: linear-gradient(to bottom, hsl(var(--primary) / 0.6), transparent);
          height: 44px;
          transform: translateX(-50%);
          z-index: 1;
        }

        .hww-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          max-width: 76rem;
          margin: 0 auto;
          list-style: none;
          padding: 0;
        }
        @media (max-width: 1024px) {
          .hww-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (max-width: 640px) {
          .hww-cards-grid { grid-template-columns: repeat(1, 1fr); gap: 1.25rem; }
        }

        .hww-card {
          border-radius: 12px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          padding: 1.35rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04);
        }
        .dark .hww-card {
          box-shadow:
            0 2px 8px rgba(0,0,0,0.3),
            0 8px 24px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .hww-card:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.08),
            0 16px 40px rgba(0,0,0,0.1),
            0 0 0 1px hsl(var(--primary) / 0.12);
        }
        .dark .hww-card:hover {
          box-shadow:
            0 4px 16px rgba(0,0,0,0.45),
            0 16px 40px rgba(0,0,0,0.4),
            0 0 0 1px hsl(var(--primary) / 0.2);
        }

        .hww-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.4));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .hww-card:hover::before { opacity: 1; }

        .hww-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px; height: 24px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          background: hsl(var(--primary) / 0.12);
          color: hsl(var(--primary));
          border: 1px solid hsl(var(--primary) / 0.25);
          flex-shrink: 0;
        }

        .hww-card-title {
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.3;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hww-card-handle {
          font-size: 0.65rem;
          font-family: ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--primary));
          font-weight: 600;
        }

        .hww-card-desc {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.65;
          flex: 1;
        }
      `}</style>

      <section
        id="como-trabalhamos"
        aria-labelledby="como-trabalhamos-heading"
        className="relative py-24 bg-background overflow-hidden"
        ref={ref}
      >
        {/* top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container px-6">
          {/* ── Header Padronizado Centralizado ── */}
          {!hideHeader && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
            >
              <SectionHeader
                id="como-trabalhamos-heading"
                tagline="Processo"
                title="Como trabalhamos"
                subtitle="Etapas estruturadas para transformar necessidades em software confiável."
              />
            </motion.div>
          )}

          {/* ── Desktop Pipeline Line (>= 1024px) ── */}
          <div className="hww-pipeline-wrapper hidden lg:block" aria-hidden="true">
            <motion.div
              className="hww-pipeline"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.3 }}
            >
              {/* animated glow fill */}
              <motion.div
                className="hww-pipeline-fill"
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={isInView || shouldReduceMotion ? { scaleX: 1 } : {}}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.1,
                  delay: shouldReduceMotion ? 0 : 0.45,
                  ease: [0.22, 0.68, 0, 1],
                }}
              />

              {/* dots + connectors */}
              {steps.map((item, i) => (
                <Fragment key={item.step}>
                  <div
                    className={`hww-dot${isInView || shouldReduceMotion ? " visible" : ""}`}
                    style={{
                      left: `${DOT_POSITIONS[i]}%`,
                      transitionDelay: shouldReduceMotion ? "0s" : `${0.45 + i * 0.12}s`,
                    }}
                  />
                  <div
                    className="hww-connector"
                    style={{ left: `${DOT_POSITIONS[i]}%` }}
                  />
                </Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Cards Grid (Ordered List) with Mobile Timeline ── */}
          <div className="relative pl-7 sm:pl-8 lg:pl-0">
            {/* Linha vertical conectora exclusiva para mobile e tablet (< 1024px) */}
            <div
              className="lg:hidden absolute left-[11px] sm:left-[13px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20 rounded-full"
              aria-hidden="true"
            />

            <ol className="hww-cards-grid" role="list">
              {steps.map((item, index) => (
                <motion.li
                  key={item.title}
                  className="hww-card relative"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
                  animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : 0.55 + index * 0.08,
                    ease: [0.22, 0.68, 0, 1.1],
                  }}
                >
                  {/* Pino conector exclusivo para mobile (< 1024px) */}
                  <div
                    className="lg:hidden absolute -left-[22px] sm:-left-[24px] top-6 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                    aria-hidden="true"
                  />

                  {/* Topo do card: Selo numérico e Ícone Autoral elegante */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="hww-step-num" aria-hidden="true">{item.step}</span>
                    <div className="text-text-secondary">
                      <item.Icon size={20} aria-hidden="true" />
                    </div>
                  </div>

                  {/* title */}
                  <h3 className="hww-card-title">
                    <span className="sr-only">Etapa {item.step}: </span>
                    <span>{item.title}</span>
                  </h3>

                  {/* handle */}
                  <div className="hww-card-handle">{item.handle}</div>

                  {/* description */}
                  <p className="hww-card-desc">{item.description}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
