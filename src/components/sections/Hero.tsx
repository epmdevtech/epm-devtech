import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

const SCENARIOS = [
  {
    id: "sistemas",
    title: "Criar um novo sistema, portal ou plataforma web",
    href: "/servicos#sistemas",
  },
  {
    id: "integracoes",
    title: "Conectar sistemas antigos e automatizar fluxos de dados",
    href: "/servicos#integracoes",
  },
  {
    id: "legados",
    title: "Modernizar e refatorar um software legado sem parar a operação",
    href: "/servicos#legados",
  },
  {
    id: "diagnostico",
    title: "Avaliar arquitetura e ter uma segunda opinião técnica sênior",
    href: "/contato",
  },
];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : 0.45,
    ease: "easeOut",
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      data-tone="anchor"
      className="relative w-full min-h-screen min-h-[100svh] flex flex-col justify-center bg-surface-anchor text-foreground pt-20 pb-12 sm:pb-16 overflow-hidden transition-colors duration-200"
    >
      {/* Glow/spotlight suave em background para profundidade técnica */}
      <div
        className="absolute top-1/4 right-0 lg:right-1/6 w-96 h-96 bg-brand/5 blur-3xl rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">
          {/* ─── Coluna Esquerda: Narrativa, Decisão & Conversão Direta ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionConfig}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow contextual minimalista: tipografia técnica com ícone oficial da marca sem badge */}
            <div
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-text-brand select-none mb-6"
            >
              <BrandChipIcon size={14} className="shrink-0" />
              <span>ENGENHARIA DE SOFTWARE &amp; MODERNIZAÇÃO</span>
            </div>

            {/* Headline H1 de forte impacto com acento visual no verbo de ação */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-[1.12] [text-wrap:balance] mb-6"
            >
              Engenharia de software para{" "}
              <span className="text-text-brand">construir, integrar e evoluir</span>{" "}
              sistemas.
            </h1>

            {/* Subheadline editorial de proposta de valor */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed max-w-xl mb-8 font-normal">
              Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio.
            </p>

            {/* Ação (CTA): Primário dominante com foco na conversão direta */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button
                asChild
                className="h-12 px-7 rounded-md bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-semibold text-sm sm:text-base shadow-sm min-h-[44px] transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/contato" aria-label="Vamos conversar sobre seu projeto">
                  Vamos conversar
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* ─── Coluna Direita: Seletor Interativo de Cenários de Negócio ─── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionConfig, delay: shouldReduceMotion ? 0 : 0.15 }}
            className="lg:col-span-5 xl:col-span-5 w-full flex justify-center lg:justify-end"
          >
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
                    O que sua empresa precisa agora?
                  </h2>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-text-brand select-none shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shrink-0" />
                    <span>Direcionamento técnico imediato</span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
