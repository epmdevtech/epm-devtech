import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  Shield,
  GitMerge,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";

const differentials = [
  {
    icon: CheckCircle2,
    step: "01",
    title: "Código Limpo & Testável",
    handle: "CLEAN CODE · TDD",
    description:
      "Seguimos princípios SOLID, Clean Code e TDD para garantir código de alta qualidade, fácil manutenção e evolução segura ao longo do tempo.",
    color: "#2979FF",
  },
  {
    icon: Shield,
    step: "02",
    title: "Arquitetura Bem Definida",
    handle: "HEXAGONAL · MICROSERVIÇOS",
    description:
      "Projetos com arquitetura clara desde o início — hexagonal, microserviços ou monolitos bem estruturados — reduzindo dívida técnica desde o day one.",
    color: "#7C3AED",
  },
  {
    icon: GitMerge,
    step: "03",
    title: "Versionamento & CI/CD",
    handle: "GIT FLOW · DEPLOY",
    description:
      "Git flow rigoroso, pipelines automatizados e deploys seguros com rollback disponível para garantir estabilidade em produção.",
    color: "#0EA5E9",
  },
  {
    icon: MessageCircle,
    step: "04",
    title: "Comunicação Profissional",
    handle: "TRANSPARÊNCIA · ALINHAMENTO",
    description:
      "Atualizações regulares, documentação clara e alinhamento constante sobre entregas e prazos para que você nunca fique no escuro.",
    color: "#10B981",
  },
  {
    icon: Clock,
    step: "05",
    title: "Entrega Responsável",
    handle: "PRAZO · QUALIDADE",
    description:
      "Comprometimento com prazos realistas, qualidade técnica e transparência em cada etapa — sem surpresas, sem atalhos.",
    color: "#F59E0B",
  },
  {
    icon: Sparkles,
    step: "06",
    title: "Boas Práticas",
    handle: "SONARQUBE · REVIEW",
    description:
      "Code review, testes automatizados, análise estática com SonarQube e monitoramento contínuo para manter a saúde do projeto.",
    color: "#EC4899",
  },
];

/* dot positions along the pipeline line (as % of width) */
const DOT_POSITIONS = [8, 25, 42, 58, 75, 92];

const Differentials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           DIFFERENTIALS PIPELINE SECTION
        ══════════════════════════════════════════════════ */

        /* ── pipeline track ── */
        .diff-pipeline {
          position: relative;
          width: 100%;
          height: 2px;
          background: hsl(var(--border));
          margin: 2.5rem 0 3rem;
          border-radius: 999px;
          overflow: visible;
        }

        /* animated fill line */
        .diff-pipeline-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #2979FF, #7C3AED, #0EA5E9, #10B981, #F59E0B, #EC4899);
          transform-origin: left;
          transition: transform 1.2s cubic-bezier(.22,.68,0,1);
        }

        /* dot on pipeline */
        .diff-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 12px; height: 12px;
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .diff-dot.visible { transform: translate(-50%, -50%) scale(1); }

        /* connector line from dot to card */
        .diff-connector {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 1px;
          background: linear-gradient(to bottom, hsl(var(--border)), transparent);
          height: 24px;
          transform: translateX(-50%);
        }

        /* ── cards ── */
        .diff-cards-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 1023px) {
          .diff-cards-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 639px) {
          .diff-cards-grid { grid-template-columns: repeat(1, 1fr); gap: 0.6rem; }
        }

        .diff-card {
          border-radius: 14px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          /* raised box shadow */
          box-shadow:
            0 2px 8px  rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.06);
        }
        .dark .diff-card {
          box-shadow:
            0 2px 8px  rgba(0,0,0,0.35),
            0 8px 24px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .diff-card:hover {
          transform: translateY(-4px);
          box-shadow:
            0 4px 12px rgba(0,0,0,0.08),
            0 16px 40px rgba(0,0,0,0.1);
        }
        .dark .diff-card:hover {
          box-shadow:
            0 4px 12px rgba(0,0,0,0.45),
            0 16px 40px rgba(0,0,0,0.4);
        }

        /* colored top border accent */
        .diff-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 14px 14px 0 0;
          background: var(--accent-color);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .diff-card:hover::before { opacity: 1; }

        /* icon wrapper */
        .diff-icon-wrap {
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .diff-card:hover .diff-icon-wrap { transform: scale(1.1); }

        .diff-step-num {
          font-size: 0.58rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.06em;
          opacity: 0.45;
          margin-bottom: 0.1rem;
        }

        .diff-card-title {
          font-size: 0.8rem;
          font-weight: 600;
          line-height: 1.3;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
        }
        .diff-card-handle {
          font-size: 0.58rem;
          font-family: ui-monospace, monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: hsl(var(--muted-foreground));
          opacity: 0.7;
        }
        .diff-card-desc {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-top: 0.25rem;
          flex: 1;
        }

        /* light mode subtle secondary bg */
        :root:not(.dark) .diff-card {
          background: hsl(var(--card));
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
            className="max-w-2xl"
          >
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
              Diferenciais
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3 leading-tight">
              Por Que Escolher a{" "}
              <span className="text-gradient">EPM DEVTECH</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Qualidade técnica e profissionalismo em cada linha de código.
            </p>
          </motion.div>

          {/* ── Pipeline Line ── */}
          <motion.div
            className="diff-pipeline"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {/* animated gradient fill */}
            <motion.div
              className="diff-pipeline-fill"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 0.68, 0, 1] }}
            />

            {/* dots + connectors */}
            {differentials.map((item, i) => (
              <div key={item.step}>
                <div
                  className={`diff-dot ${isInView ? "visible" : ""}`}
                  style={{
                    left: `${DOT_POSITIONS[i]}%`,
                    background: item.color,
                    boxShadow: `0 0 8px 2px ${item.color}55`,
                    transitionDelay: `${0.45 + i * 0.1}s`,
                  }}
                />
                {/* vertical connector */}
                <div
                  className="diff-connector"
                  style={{ left: `${DOT_POSITIONS[i]}%` }}
                />
              </div>
            ))}
          </motion.div>

          {/* ── Cards: animate from bottom ── */}
          <div className="diff-cards-grid">
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                className="diff-card"
                style={
                  {
                    "--accent-color": item.color,
                  } as React.CSSProperties
                }
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + index * 0.09,
                  ease: [0.22, 0.68, 0, 1.1],
                }}
              >
                {/* step number */}
                <div className="diff-step-num">{item.step}</div>

                {/* icon + title block */}
                <div className="flex items-start gap-2.5">
                  <div
                    className="diff-icon-wrap"
                    style={{ background: `${item.color}1a` }}
                  >
                    <item.icon
                      size={16}
                      style={{ color: item.color }}
                    />
                  </div>
                  <div>
                    <div className="diff-card-title">{item.title}</div>
                    <div className="diff-card-handle">{item.handle}</div>
                  </div>
                </div>

                {/* description */}
                <p className="diff-card-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Differentials;
