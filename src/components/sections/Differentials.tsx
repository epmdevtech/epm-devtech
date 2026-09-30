import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import {
  CheckCircle2,
  Shield,
  GitMerge,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const differentials = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Comunicação Transparente",
    handle: "ALINHAMENTO & PREVISIBILIDADE",
    description: "Alinhamento contínuo sobre escopo, decisões técnicas e prioridades. Você fala diretamente com quem planeja e executa a engenharia, eliminando ruídos e surpresas.",
  },
  {
    icon: Shield,
    step: "02",
    title: "Engenharia que Facilita Evoluir",
    handle: "ARQUITETURA & MANUTENÇÃO",
    description: "Arquitetura modular e código limpo pensados para facilitar manutenções futuras e permitir que o sistema cresça com segurança sem gerar gargalos técnicos.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Foco no Problema do Negócio",
    handle: "PRAGMATISMO & RESULTADO",
    description: "A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa, e não o inverso. Escolhas técnicas pragmáticas focadas em retorno real e estabilidade operacional.",
  },
];

/* dot positions along the pipeline line (as % of width) for 3 pillars */
const DOT_POSITIONS = [17, 50, 83];

const Differentials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           DIFFERENTIALS PIPELINE SECTION
        ══════════════════════════════════════════════════ */

        /* ── pipeline wrapper ── */
        .diff-pipeline-wrapper {
          position: relative;
          width: 100%;
          margin: 3.5rem 0 4.5rem;
        }

        /* Track */
        .diff-pipeline {
          position: relative;
          width: 100%;
          height: 8px;
          background: hsl(var(--border) / 0.4);
          border-radius: 999px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
          overflow: visible;
        }
        .dark .diff-pipeline {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03);
        }

        /* animated fill line */
        .diff-pipeline-fill {
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

        /* dot on pipeline */
        .diff-dot {
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
        .diff-dot.visible { transform: translate(-50%, -50%) scale(1); }

        /* connector line from dot to card */
        .diff-connector {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 2px;
          background: linear-gradient(to bottom, hsl(var(--primary) / 0.6), transparent);
          height: 44px;
          transform: translateX(-50%);
          z-index: 1;
        }

        /* ── cards grid (3 pilares) ── */
        .diff-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 70rem;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .diff-cards-grid { grid-template-columns: repeat(1, 1fr); gap: 1rem; }
        }

        .diff-card {
          border-radius: 12px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          padding: 1.4rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.35s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04);
        }
        .dark .diff-card {
          box-shadow:
            0 2px 8px rgba(0,0,0,0.3),
            0 8px 24px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .diff-card:hover {
          transform: translateY(-5px);
          border-color: hsl(var(--primary) / 0.4);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.08),
            0 16px 40px rgba(0,0,0,0.1),
            0 0 0 1px hsl(var(--primary) / 0.12);
        }
        .dark .diff-card:hover {
          box-shadow:
            0 4px 16px rgba(0,0,0,0.45),
            0 16px 40px rgba(0,0,0,0.4),
            0 0 0 1px hsl(var(--primary) / 0.2);
        }

        /* top border accent on hover */
        .diff-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.4));
          opacity: 0;
          transition: opacity 0.3s;
        }
        .diff-card:hover::before { opacity: 1; }

        /* step number */
        .diff-step-num {
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

        /* icon wrapper */
        .diff-icon-wrap {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: hsl(var(--primary) / 0.1);
          border: 1px solid hsl(var(--primary) / 0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s, background 0.3s;
        }
        .diff-card:hover .diff-icon-wrap {
          transform: scale(1.1);
          background: hsl(var(--primary) / 0.18);
        }

        /* title with arrow */
        .diff-card-title {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.3;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.25s;
        }
        .diff-card:hover .diff-card-title { gap: 8px; }
        .diff-card-arrow {
          opacity: 0.4;
          font-style: normal;
          font-size: 1rem;
          transition: opacity 0.25s;
          flex-shrink: 0;
        }
        .diff-card:hover .diff-card-arrow { opacity: 1; }

        .diff-card-handle {
          font-size: 0.57rem;
          font-family: ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: hsl(var(--primary));
          opacity: 0.75;
        }
        .diff-card-desc {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.65;
          flex: 1;
        }
      `}</style>

      <section
        id="diferenciais"
        className="relative py-24 bg-secondary/30 overflow-hidden"
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
              tagline="Diferenciais"
              title="Por que trabalhar com a EPM DevTech"
              subtitle="Engenharia focada na longevidade do seu software, com transparência em cada etapa do projeto."
            />
          </motion.div>

          {/* ── Pipeline Line ── */}
          <div className="diff-pipeline-wrapper">
            <motion.div
              className="diff-pipeline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {/* animated glow fill */}
              <motion.div
                className="diff-pipeline-fill"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 0.68, 0, 1] }}
              />

              {/* dots + connectors */}
              {differentials.map((item, i) => (
                <Fragment key={item.step}>
                  <div
                    className={`diff-dot${isInView ? " visible" : ""}`}
                    style={{
                      left: `${DOT_POSITIONS[i]}%`,
                      transitionDelay: `${0.45 + i * 0.12}s`,
                    }}
                  />
                  <div
                    className="diff-connector"
                    style={{ left: `${DOT_POSITIONS[i]}%` }}
                  />
                </Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Cards: animate from bottom ── */}
          <div className="diff-cards-grid">
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                className="diff-card"
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + index * 0.09,
                  ease: [0.22, 0.68, 0, 1.1],
                }}
              >
                {/* step number */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="diff-step-num">{item.step}</div>
                </div>

                {/* title with arrow */}
                <h3 className="diff-card-title">
                  <span>{item.title}</span>
                  <span className="diff-card-arrow">→</span>
                </h3>

                {/* handle */}
                <div className="diff-card-handle">{item.handle}</div>

                {/* description */}
                <p className="diff-card-desc">{item.description}</p>

                {/* icon at bottom */}
                <div className="diff-icon-wrap mt-auto">
                  <item.icon
                    size={16}
                    className="text-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Linha Secundária de Práticas de Engenharia ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center text-xs font-mono text-muted-foreground/85 mt-10 max-w-2xl mx-auto leading-relaxed"
          >
            Práticas aplicadas conforme cada projeto: testes automatizados, revisão contínua de código, CI/CD e arquitetura orientada à manutenção.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Differentials;
