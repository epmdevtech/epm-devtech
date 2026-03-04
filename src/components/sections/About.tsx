import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
   MOCKUP PANELS
───────────────────────────────────────────────────────────── */
const MockupIndustria = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge manufacturing">ERP</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Automação</span>
      <span className="mockup-bar" style={{ "--fill": "72%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Produção</span>
      <span className="mockup-bar" style={{ "--fill": "55%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row mt-3">
      <BarChart2 size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Controle de Produção</span>
    </div>
  </div>
);

const MockupVarejo = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge ecommerce">E-Commerce</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Checkout</span>
      <span className="mockup-bar" style={{ "--fill": "88%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Estoque</span>
      <span className="mockup-bar" style={{ "--fill": "64%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row mt-3">
      <ShieldCheck size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Gestão de Estoque</span>
    </div>
  </div>
);

const MockupEducacao = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge governo">CAPES · MEC</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Gestão Acadêmica</span>
      <span className="mockup-bar" style={{ "--fill": "100%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Publicações</span>
      <span className="mockup-bar" style={{ "--fill": "83%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row mt-3">
      <BookOpen size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Alto Impacto Institucional</span>
    </div>
  </div>
);

const MockupEnergia = () => (
  <div className="about-mockup">
    <div className="mockup-row">
      <span className="mockup-badge energia">ONS</span>
      <span className="mockup-line" />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Monitoramento</span>
      <span className="mockup-bar" style={{ "--fill": "96%" } as React.CSSProperties} />
    </div>
    <div className="mockup-row mt-2">
      <span className="mockup-badge secondary">Operação</span>
      <span className="mockup-bar" style={{ "--fill": "79%" } as React.CSSProperties} />
    </div>
    <div className="mockup-chip-row mt-3">
      <Zap size={12} className="mockup-chip-icon" />
      <span className="mockup-chip-label">Sistema Elétrico Crítico</span>
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
      "Sistemas robustos para automação de processos, controle de produção e integração com ERPs em ambientes de manufatura.",
    Mockup: MockupIndustria,
    accent: "manufacturing",
  },
  {
    num: "02",
    icon: Target,
    title: "Varejo",
    handle: "E-COMMERCE",
    description:
      "Plataformas de e-commerce, gestão de estoque e soluções de checkout que escalam com o crescimento do negócio.",
    Mockup: MockupVarejo,
    accent: "ecommerce",
  },
  {
    num: "03",
    icon: Award,
    title: "Educação",
    handle: "CAPES · MEC · GOVERNO FEDERAL",
    description:
      "Projetos para a CAPES — órgão do Ministério da Educação do Governo Federal — com soluções de gestão acadêmica de alto impacto institucional.",
    Mockup: MockupEducacao,
    accent: "governo",
  },
  {
    num: "04",
    icon: Users,
    title: "Energia",
    handle: "ONS · ENERGIA PECÉM",
    description:
      "Projetos para o Operador Nacional do Sistema Elétrico (ONS) e Energia Pecém — sistemas críticos de monitoramento e operação no setor elétrico brasileiro.",
    Mockup: MockupEnergia,
    accent: "energia",
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Split into 2 pairs
  const pairs = [highlights.slice(0, 2), highlights.slice(2, 4)];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           ABOUT CARD — raised box style
        ══════════════════════════════════════════════════ */

        /* outer pair container — two pairs stacked */
        .about-pairs-wrap {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* each pair: two cards side by side */
        .about-pair {
          display: flex;
          align-items: flex-end;   /* bottom-aligned so stagger reads as height diff */
          gap: 1rem;
        }
        @media (max-width: 639px) {
          .about-pair { flex-direction: column; align-items: stretch; gap: 0.75rem; }
        }

        /* CARD BASE */
        .about-card {
          flex: 1;
          border-radius: 16px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.35s ease,
                      border-color 0.3s;
          /* raised box shadow — light mode */
          box-shadow:
            0 2px 4px  rgba(0,0,0,0.06),
            0 8px 16px rgba(0,0,0,0.08),
            0 20px 40px rgba(0,0,0,0.06);
        }

        /* dark mode: deeper, more dramatic shadow */
        .dark .about-card {
          box-shadow:
            0 2px 4px   rgba(0,0,0,0.4),
            0 8px 20px  rgba(0,0,0,0.35),
            0 24px 48px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .about-card:hover {
          transform: translateY(-4px);
          border-color: hsl(var(--primary) / 0.45);
          box-shadow:
            0 4px 8px   rgba(0,0,0,0.08),
            0 16px 32px rgba(0,0,0,0.12),
            0 32px 64px rgba(0,0,0,0.08),
            0 0 0 1px   hsl(var(--primary) / 0.15);
        }
        .dark .about-card:hover {
          box-shadow:
            0 4px 8px   rgba(0,0,0,0.45),
            0 16px 32px rgba(0,0,0,0.4),
            0 32px 64px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 0 0 1px   hsl(var(--primary) / 0.25);
        }

        /* ── STAGGER: first card in each pair is pushed down (appears lower/shorter) */
        .about-pair .about-card:first-child {
          margin-bottom: 28px;   /* pushed down relative to bottom-aligned flex */
        }
        @media (max-width: 639px) {
          .about-pair .about-card:first-child { margin-bottom: 0; }
        }

        /* top-left radial glow */
        .about-card::before {
          content: '';
          position: absolute;
          top: -40px; left: -40px;
          width: 150px; height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .about-card:hover::before { opacity: 1; }

        /* ─── number badge ─── */
        .about-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          font-size: 0.63rem;
          font-family: ui-monospace, monospace;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
          flex-shrink: 0;
        }
        .num-manufacturing { background: hsl(218 100% 58% / 0.18); color: hsl(218 100% 70%); }
        .num-ecommerce     { background: hsl(160 60%  45% / 0.18); color: hsl(160 60%  62%); }
        .num-governo       { background: hsl(48  95%  50% / 0.18); color: hsl(48  95%  58%); }
        .num-energia       { background: hsl(280 65%  60% / 0.18); color: hsl(280 65%  72%); }

        /* ─── title ─── */
        .about-title {
          display: flex;
          align-items: flex-start;
          gap: 5px;
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: hsl(var(--foreground));
          margin-bottom: 0.35rem;
          transition: gap 0.25s;
        }
        .about-card:hover .about-title { gap: 9px; }
        .about-arrow {
          margin-top: 4px;
          opacity: 0.38;
          flex-shrink: 0;
          transition: opacity 0.25s, transform 0.25s;
        }
        .about-card:hover .about-arrow {
          opacity: 1;
          transform: translate(3px, -2px);
        }

        /* ─── mockup panel ─── */
        .about-mockup-panel {
          margin-top: auto;
          padding-top: 0.9rem;
          border-top: 1px solid hsl(var(--border));
        }
        .about-mockup { font-family: ui-monospace, monospace; }
        .mockup-row   { display: flex; align-items: center; gap: 7px; }

        .mockup-badge {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 2px 7px;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .mockup-badge.secondary {
          background: hsl(var(--secondary));
          color: hsl(var(--muted-foreground));
          border: 1px solid hsl(var(--border));
        }
        .mockup-badge.manufacturing { background: hsl(218 100% 58% / 0.18); color: hsl(218 100% 70%); border: 1px solid hsl(218 100% 58% / 0.3); }
        .mockup-badge.ecommerce     { background: hsl(160 60%  45% / 0.18); color: hsl(160 60%  62%); border: 1px solid hsl(160 60%  45% / 0.3); }
        .mockup-badge.governo       { background: hsl(48  95%  50% / 0.18); color: hsl(48  95%  58%); border: 1px solid hsl(48  95%  50% / 0.3); }
        .mockup-badge.energia       { background: hsl(280 65%  60% / 0.18); color: hsl(280 65%  72%); border: 1px solid hsl(280 65%  60% / 0.3); }

        .mockup-line {
          flex: 1;
          height: 1px;
          background: hsl(var(--border));
          max-width: 60px;
        }
        .mockup-bar {
          flex: 1;
          height: 5px;
          border-radius: 999px;
          background: hsl(var(--border));
          position: relative;
          overflow: hidden;
          max-width: 110px;
        }
        .mockup-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          width: var(--fill, 50%);
          border-radius: inherit;
          background: hsl(var(--primary) / 0.55);
        }
        .mockup-chip-row {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 8px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--secondary));
          width: fit-content;
        }
        .mockup-chip-icon  { color: hsl(var(--primary)); flex-shrink: 0; }
        .mockup-chip-label { font-size: 0.58rem; color: hsl(var(--muted-foreground)); white-space: nowrap; }
      `}</style>

      <section id="sobre" className="relative py-24 bg-background" ref={ref}>
        <div className="container px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ── Left: company text ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
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
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-10 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-gradient">+9</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Anos de Experiência
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">4</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Setores Atendidos
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient">100%</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    Comprometimento
                  </div>
                </div>
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
                    <motion.div
                      key={item.num}
                      className="about-card"
                      initial={{ opacity: 0, y: 24 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.45,
                        delay: 0.25 + pairIdx * 0.15 + cardIdx * 0.08,
                      }}
                    >
                      {/* Number badge */}
                      <div className={`about-num num-${item.accent}`}>{item.num}</div>

                      {/* Title + arrow */}
                      <div className="about-title">
                        <span>{item.title}</span>
                        <ArrowRight className="about-arrow" size={15} />
                      </div>

                      {/* Sector handle */}
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                        {item.handle}
                      </span>

                      {/* Description */}
                      <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Mockup panel */}
                      <div className="about-mockup-panel">
                        <item.Mockup />
                      </div>
                    </motion.div>
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
