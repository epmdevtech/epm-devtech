import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart2,
  ShieldCheck,
  BookOpen,
  Zap,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  IconSectorIndustry,
  IconSectorRetail,
  IconSectorEducation,
  IconSectorEnergy,
} from "@/components/icons";

/* ─────────────────────────────────────────────────────────────
   MOCKUP PANELS (Preservados Integralmente)
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
      <span className="mockup-badge">Educação</span>
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
      <span className="mockup-badge">Energia</span>
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

const sectors = [
  {
    num: "01",
    Icon: IconSectorIndustry,
    title: "Indústria",
    handle: "OPERAÇÃO & MANUFATURA",
    context: "Operações fabris e linhas de montagem contínua",
    problem: "Falhas operacionais e perda de rastreabilidade entre chão de fábrica e gestão corporativa.",
    experience: "Experiência em módulos de ERP, integração de IoT industrial e conexão de equipamentos de produção a sistemas corporativos.",
    Mockup: MockupIndustria,
  },
  {
    num: "02",
    Icon: IconSectorRetail,
    title: "Varejo",
    handle: "ALTO VOLUME & TRANSAÇÕES",
    context: "Plataformas digitais com alto volume transacional",
    problem: "Perda de vendas em picos de tráfego, gargalos operacionais e inconsistência de estoque.",
    experience: "Experiência em e-commerce e em módulos de ERP para operações de logística e financeiro.",
    Mockup: MockupVarejo,
  },
  {
    num: "03",
    Icon: IconSectorEducation,
    title: "Educação",
    handle: "PLATAFORMAS INSTITUCIONAIS",
    context: "Instituições de ensino e plataformas de grande escala",
    problem: "Sistemas legados sobrecarregados em períodos de edital e processos manuais de prestação de contas.",
    experience: "Experiência em plataformas institucionais de grande escala: modernização incremental, automação de fluxos e alta disponibilidade.",
    Mockup: MockupEducacao,
  },
  {
    num: "04",
    Icon: IconSectorEnergy,
    title: "Energia",
    handle: "DADOS CRÍTICOS & REGULAÇÃO",
    context: "Despacho energético e infraestrutura crítica",
    problem: "Rigor na preservação de dados regulatórios e necessidade de telemetria contínua.",
    experience: "Experiência em monitoramento operacional em tempo real e consolidação de dados regulatórios, onde a integridade dos dados é requisito.",
    Mockup: MockupEnergia,
  },
];

const Sectors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const pairs = [sectors.slice(0, 2), sectors.slice(2, 4)];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           SECTOR CARDS — 3D Block Style (Preservado)
        ══════════════════════════════════════════════════ */
        
        .sectors-pairs-wrap {
          display: flex;
          flex-direction: column;
          gap: 5rem;
          padding-top: 1.5rem;
        }

        .sectors-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        
        @media (max-width: 639px) {
          .sectors-pair {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .about-card {
            --depth: 10px;
            margin-right: var(--depth);
          }
        }

        @media (min-width: 640px) {
          .sectors-pair .about-card-wrapper:nth-child(2) {
            transform: translateY(-40px);
          }
        }

        .about-card-wrapper {
          position: relative;
          z-index: 1;
        }
        .about-card-wrapper:hover {
          z-index: 10;
        }

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

        .about-title {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: hsl(var(--foreground));
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 2;
        }

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

        .about-card-desc {
          font-size: 0.85rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

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

      <section id="setores" className="relative py-24 bg-secondary/20 overflow-hidden" ref={ref}>
        {/* top divider */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container px-6">
          {/* Header da Seção */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-14"
          >
            <SectionHeader
              tagline="Contextos de negócio"
              title="Experiência em diferentes contextos"
              subtitle="Projetos desenvolvidos em ambientes com diferentes níveis de complexidade, integração e requisitos operacionais."
            />
          </motion.div>

          {/* Cards 3D Preservados Integralmente */}
          <div className="max-w-6xl mx-auto sectors-pairs-wrap">
            {pairs.map((pair, pairIdx) => (
              <div key={pairIdx} className="sectors-pair">
                {pair.map((item, cardIdx) => (
                  <div key={item.num} className="about-card-wrapper">
                    <motion.div
                      className="about-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.2 + pairIdx * 0.15 + cardIdx * 0.1,
                        ease: [0.22, 0.68, 0, 1.1]
                      }}
                    >
                      <div className="about-card-glow" />

                      {/* Top row: Number badge + authorial icon */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="about-num !mb-0">{item.num}</div>
                        <item.Icon size={22} className="text-primary/90" />
                      </div>

                      {/* Title */}
                      <div className="about-title">
                        <span>{item.title}</span>
                      </div>

                      {/* Sector handle */}
                      <span className="about-handle">
                        {item.handle}
                      </span>

                      {/* Description focada em Contexto + Problema + Experiência */}
                      <p className="about-card-desc">
                        {item.experience}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Sectors;
