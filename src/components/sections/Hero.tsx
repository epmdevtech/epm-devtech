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
    <div
      data-testid="hero-scenario-selector"
      className="relative w-full max-w-lg lg:max-w-none select-none"
    >
      {/* Malha Vetorial Contínua (Integrated Circuit Mesh SVG) aberta */}
      <svg
        aria-hidden="true"
        className="absolute -top-12 -left-12 w-[calc(100%+96px)] h-[calc(100%+96px)] pointer-events-none -z-10 overflow-visible"
      >
        <defs>
          <pattern
            id="heroCircuitGrid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-zinc-800/40 dark:text-zinc-800/60"
            />
          </pattern>
          <linearGradient id="heroTrackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Grade de fundo sutil de engenharia */}
        <rect width="100%" height="100%" fill="url(#heroCircuitGrid)" opacity="0.6" />

        {/* Trilhas principais de circuito impresso com nós de solda e acento */}
        <path
          d="M 10 30 L 140 30 L 170 60 L 380 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-zinc-700/60 dark:text-zinc-800/80"
        />
        <circle cx="10" cy="30" r="2.5" className="fill-emerald-400/50" />
        <circle cx="380" cy="60" r="2.5" className="fill-brand/60" />

        <path
          d="M 30 180 L 30 380 L 120 470 L 420 470"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-zinc-700/40 dark:text-zinc-800/60"
        />
        <circle cx="120" cy="470" r="2" className="fill-cyan-400/50" />
        <circle cx="420" cy="470" r="3" className="fill-emerald-400" />

        {/* Linha guia condutora vertical conectando os nós de cenários */}
        <motion.line
          x1="24"
          y1="130"
          x2="24"
          y2="390"
          stroke="url(#heroTrackGradient)"
          strokeWidth="2"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>

      {/* Régua Técnica Superior: Telemetria & Status Operacional */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60 dark:border-zinc-800/70 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse shrink-0" />
          <span className="text-zinc-200 dark:text-zinc-200 text-zinc-800 font-semibold tracking-wide text-xs">
            Operação em Tempo Real · 100% Ativa
          </span>
        </div>
        <span className="text-[10px] font-mono font-medium text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full">
          ESTABILIDADE 99.98%
        </span>
      </div>

      {/* Indicadores Executivos em Formato Aberto (Sem cards confinados) */}
      <div className="grid grid-cols-3 gap-3 pb-4 mb-4 border-b border-zinc-800/60 dark:border-zinc-800/70 text-left">
        <div className="border-l-2 border-emerald-400/40 pl-2">
          <span className="text-[9.5px] font-mono text-zinc-400 block">TRANSAÇÕES</span>
          <span className="text-xs font-bold text-zinc-100 dark:text-zinc-100 text-zinc-900">Tempo Real</span>
        </div>
        <div className="border-l-2 border-cyan-400/40 pl-2">
          <span className="text-[9.5px] font-mono text-zinc-400 block">INTEGRAÇÃO</span>
          <span className="text-xs font-bold text-cyan-400">ERP / Cloud</span>
        </div>
        <div className="border-l-2 border-teal-400/40 pl-2">
          <span className="text-[9.5px] font-mono text-zinc-400 block">RESPOSTA</span>
          <span className="text-xs font-bold text-emerald-400">&lt; 85ms</span>
        </div>
      </div>

      {/* Cabeçalho do Seletor de Desafios Integrado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-800/60 dark:border-zinc-800/70">
        <h2 className="text-sm sm:text-base font-bold text-primary tracking-tight">
          Qual é o principal desafio da sua empresa hoje?
        </h2>
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-text-brand select-none shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shrink-0" />
          <span>Diagnóstico técnico direto</span>
        </div>
      </div>

      {/* Lista de Cenários Integrada à Malha com Nós Abertos */}
      <div className="relative flex flex-col gap-2 pl-3">
        {SCENARIOS.map((scenario) => (
          <Link
            key={scenario.id}
            to={scenario.href}
            data-testid={`scenario-link-${scenario.id}`}
            className="group relative z-10 flex items-center justify-between gap-3.5 p-3 sm:p-3.5 rounded-lg border border-transparent hover:border-zinc-800/80 dark:hover:border-zinc-800/80 hover:bg-zinc-800/20 dark:hover:bg-zinc-900/40 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-brand transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Nó circular indicador conectado ao eixo condutor */}
              <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-surface dark:bg-zinc-950 border-2 border-zinc-700 dark:border-zinc-800 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-brand group-hover:shadow-[0_0_12px_rgba(45,212,191,0.5)] group-hover:scale-110">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-600 transition-colors duration-200 group-hover:bg-brand" />
              </div>

              {/* Texto do cenário */}
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
