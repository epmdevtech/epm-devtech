import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import {
  Search,
  FileCode2,
  Terminal,
  TrendingUp,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Entendemos",
    handle: "DIAGNÓSTICO & CONTEXTO",
    description: "Conhecemos o problema, o contexto e os objetivos do negócio.",
  },
  {
    icon: FileCode2,
    step: "02",
    title: "Definimos",
    handle: "ESCOPO & PRIORIDADES",
    description: "Transformamos necessidades em escopo, prioridades e abordagem.",
  },
  {
    icon: Terminal,
    step: "03",
    title: "Desenvolvemos",
    handle: "ENGENHARIA INCREMENTAL",
    description: "Construímos a solução de forma incremental e acompanhada.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Evoluímos",
    handle: "SUSTENTAÇÃO & CRESCIMENTO",
    description: "Entregamos, acompanhamos e evoluímos conforme o negócio cresce.",
  },
];

/* Posições dos pontos ao longo da linha do pipeline para 4 etapas */
const DOT_POSITIONS = [12.5, 37.5, 62.5, 87.5];

const HowWeWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           HOW WE WORK PIPELINE SECTION
        ══════════════════════════════════════════════════ */

        .hww-pipeline-wrapper {
          position: relative;
          width: 100%;
          margin: 3.5rem 0 4.5rem;
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
        }
        @media (max-width: 1024px) {
          .hww-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        }
        @media (max-width: 640px) {
          .hww-cards-grid { grid-template-columns: repeat(1, 1fr); gap: 1rem; }
        }

        .hww-card {
          border-radius: 12px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          padding: 1.3rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.35s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04);
        }
        .dark .hww-card {
          box-shadow:
            0 2px 8px rgba(0,0,0,0.3),
            0 8px 24px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .hww-card:hover {
          transform: translateY(-5px);
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
          width: 22px; height: 22px;
          border-radius: 6px;
          font-size: 0.6rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          background: hsl(var(--primary) / 0.12);
          color: hsl(var(--primary));
          border: 1px solid hsl(var(--primary) / 0.2);
          flex-shrink: 0;
        }

        .hww-icon-wrap {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: hsl(var(--primary) / 0.1);
          border: 1px solid hsl(var(--primary) / 0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s, background 0.3s;
        }
        .hww-card:hover .hww-icon-wrap {
          transform: scale(1.1);
          background: hsl(var(--primary) / 0.18);
        }

        .hww-card-title {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .hww-card-handle {
          font-size: 0.57rem;
          font-family: ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: hsl(var(--primary));
          opacity: 0.75;
        }
        .hww-card-desc {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.65;
          flex: 1;
        }
      `}</style>

      <section
        id="como-trabalhamos"
        className="relative py-24 bg-background overflow-hidden"
        ref={ref}
      >
        {/* top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container px-6">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <SectionHeader
              tagline="Processo"
              title="Como trabalhamos"
              subtitle="Etapas estruturadas para transformar necessidades em software confiável."
            />
          </motion.div>

          {/* ── Pipeline Line ── */}
          <div className="hww-pipeline-wrapper hidden lg:block">
            <motion.div
              className="hww-pipeline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* animated glow fill */}
              <motion.div
                className="hww-pipeline-fill"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 0.68, 0, 1] }}
              />

              {/* dots + connectors */}
              {steps.map((item, i) => (
                <Fragment key={item.step}>
                  <div
                    className={`hww-dot${isInView ? " visible" : ""}`}
                    style={{
                      left: `${DOT_POSITIONS[i]}%`,
                      transitionDelay: `${0.45 + i * 0.12}s`,
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

          {/* ── Cards Grid ── */}
          <div className="hww-cards-grid">
            {steps.map((item, index) => (
              <motion.div
                key={item.title}
                className="hww-card"
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + index * 0.08,
                  ease: [0.22, 0.68, 0, 1.1],
                }}
              >
                {/* step number */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="hww-step-num">{item.step}</div>
                </div>

                {/* title */}
                <h3 className="hww-card-title">
                  <span>{item.title}</span>
                </h3>

                {/* handle */}
                <div className="hww-card-handle">{item.handle}</div>

                {/* description */}
                <p className="hww-card-desc">{item.description}</p>

                {/* icon at bottom */}
                <div className="hww-icon-wrap mt-auto">
                  <item.icon
                    size={16}
                    className="text-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeWork;
