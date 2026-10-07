import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import PageHero from "@/components/layout/PageHero";

const SCENARIOS = [
  {
    id: "sistemas",
    title: "Criar um novo sistema, portal ou plataforma corporativa",
    href: "/services#sistemas",
  },
  {
    id: "integracoes",
    title: "Conectar sistemas isolados e acabar com retrabalho manual",
    href: "/services#integracoes",
  },
  {
    id: "legados",
    title: "Modernizar um software legado sem interromper o dia a dia",
    href: "/services#legados",
  },
  {
    id: "diagnostico",
    title: "Avaliar a arquitetura do meu sistema com um diagnóstico técnico",
    href: "/contact",
  },
];

const BusinessScenarioSelector: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-lg lg:max-w-none">
      {/* Efeito de iluminação suave atrás do painel */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 bg-brand/5 blur-3xl rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Painel do Seletor */}
      <div
        data-testid="hero-scenario-selector"
        className="relative rounded-2xl border border-border-default/80 dark:border-zinc-800/80 bg-surface/90 dark:bg-zinc-950/70 backdrop-blur-md p-5 sm:p-6 shadow-xl dark:shadow-2xl transition-colors duration-200"
      >
        {/* Cabeçalho do painel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-border-default/50">
          <h2 className="text-sm sm:text-base font-bold text-primary tracking-tight">
            Qual é o principal desafio da sua empresa hoje?
          </h2>
          <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-text-brand select-none shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shrink-0" />
            <span>Diagnóstico técnico direto</span>
          </div>
        </div>

        {/* Lista de cenários com linha condutora SVG vertical conectando os nós */}
        <div className="relative flex flex-col gap-2">
          {/* Linha vertical SVG animada conectando os nós */}
          <svg
            className="absolute left-[20px] sm:left-[22px] top-6 bottom-6 w-[2px] -translate-x-1/2 pointer-events-none z-0 h-[calc(100%-48px)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="heroGuideLine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#heroGuideLine)"
              strokeWidth="2"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>

          {SCENARIOS.map((scenario) => (
            <Link
              key={scenario.id}
              to={scenario.href}
              data-testid={`scenario-link-${scenario.id}`}
              className="group relative z-10 flex items-center justify-between gap-3.5 p-3 sm:p-3.5 rounded-xl border border-transparent hover:border-border-default dark:hover:border-zinc-800/80 hover:bg-surface-elevated/80 dark:hover:bg-zinc-900/60 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brand transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Nó circular indicador conectado ao eixo */}
                <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-surface dark:bg-zinc-950 border-2 border-border-default dark:border-zinc-800 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-brand group-hover:shadow-[0_0_12px_rgba(45,212,191,0.5)] group-hover:scale-110">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 dark:bg-zinc-600 transition-colors duration-200 group-hover:bg-brand" />
                </div>

                {/* Texto da dor/solução */}
                <span className="text-xs sm:text-sm font-medium text-secondary group-hover:text-primary transition-colors leading-snug">
                  {scenario.title}
                </span>
              </div>

              {/* Seta direcional com affordance de navegação */}
              <ArrowUpRight
                size={16}
                className="shrink-0 text-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageHero
      id="hero"
      eyebrow="ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO"
      title="Engenharia de software para construir, integrar e evoluir sistemas."
      description="Desenvolvemos sistemas web, APIs e integrações sob medida para operações que não podem parar por instabilidade ou lentidão."
      className="min-h-screen min-h-[100svh] flex flex-col justify-center"
      isVisualInteractive={true}
      primaryCta={
        <div className="flex items-center w-full sm:w-auto">
          <MagneticButton
            to="/contact"
            variant="chamfer"
            size="lg"
            onClick={() => navigate("/contact")}
            aria-label="Vamos conversar"
            className="w-full sm:w-auto h-12 px-8 py-3.5 rounded-md font-semibold uppercase tracking-[0.04em] text-sm sm:text-base min-h-[44px]"
          >
            VAMOS CONVERSAR
          </MagneticButton>
        </div>
      }
      visual={<BusinessScenarioSelector />}
    />
  );
};

export default Hero;
