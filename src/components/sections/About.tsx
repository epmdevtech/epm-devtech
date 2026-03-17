import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Target,
  Award,
  Users,
  ArrowRight,
  BarChart2,
  ShieldCheck,
  BookOpen,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   ANIMATED STAT & COUNT UP
───────────────────────────────────────────────────────────── */
// CountUp component — atualiza o DOM diretamente via ref para evitar re-renders por frame
const CountUp = ({ isCounting, end, duration }: { isCounting: boolean, end: number, duration: number }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isCounting) return;

    if (process.env.NODE_ENV === 'test') {
      if (spanRef.current) spanRef.current.textContent = String(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const ratio = Math.min(progress / (duration * 1000), 1);
      const easeOut = 1 - (1 - ratio) * (1 - ratio);

      if (spanRef.current) {
        spanRef.current.textContent = String(Math.floor(easeOut * end));
      }

      if (progress < duration * 1000) {
        animationFrame = requestAnimationFrame(step);
      } else {
        if (spanRef.current) spanRef.current.textContent = String(end);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isCounting, end, duration]);

  return <span ref={spanRef}>0</span>;
};

const AnimatedStat = ({
  value,
  prefix = "",
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: "0px" });

  return (
    <div ref={ref} className="flex flex-col-reverse justify-end gap-3 group" data-testid="animated-stat">
      <div className="text-4xl sm:text-5xl font-bold text-primary flex items-baseline leading-none shadow-primary/20 drop-shadow-lg">
        {prefix}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay }}
        >
          <CountUp isCounting={inView} end={value} duration={2} />
        </motion.span>
        {suffix}
      </div>
      <motion.div
        className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground/80"
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.4, delay }}
      >
        {label}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MOCKUP PANELS
───────────────────────────────────────────────────────────── */
const MockupIndustria = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge">ERP</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-3">
      <span className="mockup-badge">Automação</span>
      <span className="mockup-bar" style={{ "--fill": "72%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge">Produção</span>
      <span className="mockup-bar" style={{ "--fill": "55%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row">
      <BarChart2 size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Controle de Produção</span>
    </div>
  </div>
);

const MockupVarejo = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge">E-Commerce</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-3">
      <span className="mockup-badge">Checkout</span>
      <span className="mockup-bar" style={{ "--fill": "88%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge">Estoque</span>
      <span className="mockup-bar" style={{ "--fill": "64%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row">
      <ShieldCheck size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Gestão de Estoque</span>
    </div>
  </div>
);

const MockupEducacao = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge">CAPES · MEC</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-3">
      <span className="mockup-badge">Gestão</span>
      <span className="mockup-bar" style={{ "--fill": "100%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge">Publicações</span>
      <span className="mockup-bar" style={{ "--fill": "83%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row">
      <BookOpen size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Impacto Institucional</span>
    </div>
  </div>
);

const MockupEnergia = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge">ONS</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-3">
      <span className="mockup-badge">Monitoramento</span>
      <span className="mockup-bar" style={{ "--fill": "96%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge">Operação</span>
      <span className="mockup-bar" style={{ "--fill": "79%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row">
      <Zap size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Sistema Crítico</span>
    </div>
  </div>
);

const highlights = [
  {
    num: "01",
    icon: Building2,
    title: "Indústria",
    handle: "MANUFATURA",
    description:
      "Sistemas robustos para automação de processos, controle de produção e integração com ERPs.",
    Mockup: MockupIndustria,
  },
  {
    num: "02",
    icon: Target,
    title: "Varejo",
    handle: "E-COMMERCE",
    description:
      "Plataformas de e-commerce, gestão de estoque e soluções de checkout que escalam com o crescimento do negócio.",
    Mockup: MockupVarejo,
  },
  {
    num: "03",
    icon: Award,
    title: "Educação",
    handle: "CAPES · MEC · GOVERNO FEDERAL",
    description:
      "Projetos para a CAPES e MEC com soluções de gestão acadêmica de alto impacto.",
    Mockup: MockupEducacao,
  },
  {
    num: "04",
    icon: Users,
    title: "Energia",
    handle: "ONS · ENERGIA PECÉM",
    description:
      "Projetos para o Operador Nacional do Sistema Elétrico (ONS) e Energia Pecém — sistemas críticos de monitoramento.",
    Mockup: MockupEnergia,
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Split into 2 pairs for the 2-column Desktop stagger
  const pairs = [highlights.slice(0, 2), highlights.slice(2, 4)];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           ABOUT CARD — 3D Block Style (Reference Image)
        ══════════════════════════════════════════════════ */
        
        .about-pairs-wrap {
          display: flex;
          flex-direction: column;
          gap: 5rem;
          padding-top: 1rem;
        }

        .about-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        
        /* Mobile: always stacked, reduce 3D depth to prevent overflow */
        @media (max-width: 639px) {
          .about-pair {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .about-card {
            --depth: 10px;
            margin-right: var(--depth);
          }
        }

        /* ── STAGGER EFFECT FOR PAIRS ── */
        @media (min-width: 640px) {
          .about-pair .about-card-wrapper:nth-child(2) {
            transform: translateY(-50px);
          }
        }

        .about-card-wrapper {
          position: relative;
          z-index: 1;
        }
        .about-card-wrapper:hover {
          z-index: 10;
        }

        /* CARD BASE: Front face of the 3D block */
        .about-card {
          --depth: 22px;
          position: relative;
          background: hsl(var(--card));
          border-left: 1px solid hsl(var(--border) / 0.3);
          padding: 2.2rem 1.8rem;
          display: flex;
          flex-direction: column;
          margin-top: var(--depth);
          margin-right: var(--depth);
          border-radius: 4px;
          box-shadow: 20px 20px 40px rgba(0,0,0,0.08);
          transition: transform 0.4s cubic-bezier(.22,.68,0,1);
          height: 100%;
        }
        .dark .about-card {
          box-shadow: 20px 20px 50px rgba(0,0,0,0.8);
        }

        /* 3D TOP FACE */
        .about-card::before {
          content: '';
          position: absolute;
          height: var(--depth);
          left: 0;
          right: 0;
          top: calc(-1 * var(--depth));
          background: hsl(var(--card));
          filter: brightness(0.95);
          transform-origin: bottom;
          transform: skewX(-45deg);
          border-top: 1px solid hsl(var(--border) / 0.5);
          border-left: 1px solid hsl(var(--border) / 0.2);
          border-top-left-radius: 3px;
        }
        .dark .about-card::before {
          filter: brightness(1.5);
          border-top: 1px solid rgba(255,255,255,0.06);
          border-left: 1px solid rgba(255,255,255,0.03);
        }

        /* 3D RIGHT FACE */
        .about-card::after {
          content: '';
          position: absolute;
          width: var(--depth);
          top: 0;
          bottom: 0;
          right: calc(-1 * var(--depth));
          background: hsl(var(--card));
          filter: brightness(0.85);
          transform-origin: left;
          transform: skewY(-45deg);
          border-right: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          border-bottom-right-radius: 3px;
        }
        .dark .about-card::after {
          filter: brightness(0.6);
          border-right: 1px solid rgba(0,0,0,0.8);
          border-bottom: 1px solid rgba(0,0,0,0.8);
        }

        .about-card:hover {
          transform: translateY(-8px) translateX(-4px);
        }

        /* Hover Glow */
        .about-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 10%, hsl(var(--primary) / 0.08), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .about-card:hover .about-card-glow {
          opacity: 1;
        }

        /* ─── NUMBER BADGE ─── */
        .about-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px; height: 24px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          margin-bottom: 1.25rem;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.3), 0 2px 8px hsl(var(--primary) / 0.3);
          position: relative;
          z-index: 2;
        }

        /* ─── TITLE ─── */
        .about-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: hsl(var(--foreground));
          margin-bottom: 0.5rem;
          transition: gap 0.25s;
          position: relative;
          z-index: 2;
        }
        .about-card:hover .about-title { gap: 12px; }
        .about-arrow {
          opacity: 0.5;
          transition: opacity 0.25s, transform 0.25s;
        }
        .about-card:hover .about-arrow {
          opacity: 1;
        }

        /* SECTOR HANDLE */
        .about-handle {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--primary));
          margin-bottom: 1rem;
          position: relative;
          z-index: 2;
        }

        /* ─── DESC ─── */
        .about-card-desc {
          font-size: 0.85rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        /* ─── MOCKUP PANEL ─── */
        .about-mockup-panel {
          margin-top: auto;
          position: relative;
          z-index: 2;
          background: hsl(var(--secondary) / 0.4);
          border: 1px solid hsl(var(--border));
          border-radius: 10px;
          padding: 1.25rem;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
        }
        .dark .about-mockup-panel {
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
          background: rgba(0,0,0,0.2);
        }
        .mockup-row { display: flex; align-items: center; gap: 8px; }
        .mockup-badge {
          font-size: 0.6rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
          white-space: nowrap;
          color: hsl(var(--foreground));
          background: hsl(var(--background) / 0.5);
          border: 1px solid hsl(var(--border));
        }
        .mockup-line {
          flex: 1;
          height: 1px;
          background: hsl(var(--border));
        }
        .mockup-bar {
          flex: 1;
          height: 4px;
          border-radius: 999px;
          background: hsl(var(--border));
          position: relative;
          overflow: hidden;
        }
        .mockup-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          width: var(--fill, 50%);
          background: hsl(var(--primary));
          border-radius: inherit;
        }
        .mockup-chip-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 6px;
          background: hsl(var(--background) / 0.5);
          border: 1px solid hsl(var(--border));
          width: fit-content;
          margin-top: 14px;
        }
        .mockup-chip-icon { color: hsl(var(--primary)); }
        .mockup-chip-label { font-size: 0.65rem; color: hsl(var(--muted-foreground)); }
      `}</style>

      <section id="sobre" className="relative py-24 bg-background overflow-hidden" ref={ref}>
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Left: company text ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
                Sobre a EPM DEVTECH
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-6 leading-tight">
                Engenharia de Software com{" "}
                <span className="text-gradient">Excelência Técnica</span>
              </h2>
              <div className="space-y-4">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  A EPM DEVTECH é uma empresa especializada em desenvolvimento de software,
                  fundada por Elessandro Prestes Macedo, desenvolvedor Full Stack com mais de
                  9 anos de experiência em projetos de médio e grande porte.
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Nossa atuação abrange desde o design de arquiteturas escaláveis até a
                  implementação de sistemas complexos, sempre com foco em qualidade de código,
                  boas práticas e entrega profissional.
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Trabalhamos com metodologias ágeis, versionamento rigoroso e integração
                  contínua (CI/CD), garantindo transparência e previsibilidade em cada projeto.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 mt-12 pt-10 border-t border-border/40">
                <AnimatedStat value={9} prefix="+" label="Anos de Experiência" delay={0.1} />
                <AnimatedStat value={4} label="Setores Atendidos" delay={0.2} />
                <AnimatedStat value={100} suffix="%" label="Comprometimento" delay={0.3} />
              </div>
            </motion.div>

            {/* ── Right: 2 pairs of staggered box cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="about-pairs-wrap"
            >
              {pairs.map((pair, pairIdx) => (
                <div key={pairIdx} className="about-pair">
                  {pair.map((item, cardIdx) => (
                    <div key={item.num} className="about-card-wrapper">
                      <motion.div
                        className="about-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: 0.25 + pairIdx * 0.15 + cardIdx * 0.1,
                          ease: [0.22, 0.68, 0, 1.1]
                        }}
                      >
                        <div className="about-card-glow" />

                        {/* Number badge */}
                        <div className="about-num">{item.num}</div>

                        {/* Title + arrow */}
                        <div className="about-title">
                          <span>{item.title}</span>
                          <ArrowRight className="about-arrow" size={17} strokeWidth={2.5} />
                        </div>

                        {/* Sector handle */}
                        <span className="about-handle">
                          {item.handle}
                        </span>

                        {/* Description */}
                        <p className="about-card-desc">
                          {item.description}
                        </p>

                        {/* Mockup panel */}
                        <div className="about-mockup-panel">
                          <item.Mockup />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default About;
