import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBadge from "@/components/sections/hero/HeroBadge";
import HeroArchitecture from "@/components/sections/hero/HeroArchitecture";

const Hero = () => {
  const prefersReduced = Boolean(useReducedMotion());

  const animationProps = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="hero"
      aria-label="Seção principal — Engenharia de Software & Modernização"
      className="relative mx-auto w-full max-w-6xl overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-hidden -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.025] dark:opacity-[0.04]" />
      </div>

      {/* Main Content Column */}
      <div className="relative z-10 flex max-w-3xl flex-col gap-5 sm:gap-6 text-left">
        {/* Eyebrow / Status Badge */}
        <motion.div {...animationProps(0.05)}>
          <HeroBadge
            tag="EPM DEVTECH"
            label="Engenharia de Software & Modernização"
            href="#sobre"
          />
        </motion.div>

        {/* Headline: Rigorosamente 100% monocromática (SPEC-014) */}
        <motion.h1
          {...animationProps(0.15)}
          className="text-balance font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.12] tracking-tight"
        >
          Engenharia de software para sistemas que precisam evoluir.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          {...animationProps(0.25)}
          className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          Arquitetura, desenvolvimento e modernização de software sob medida para empresas que precisam transformar processos complexos em sistemas confiáveis, escaláveis e sustentáveis.
        </motion.p>

        {/* Dual CTA Actions */}
        <motion.div
          {...animationProps(0.35)}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Button
            asChild
            size="lg"
            className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all text-sm sm:text-base font-semibold px-5 sm:px-6"
          >
            <a href="#contato" aria-label="Falar sobre um projeto com a EPM DEVTECH">
              Falar sobre um projeto
              <ArrowRight className="size-4 ml-2" aria-hidden="true" />
            </a>
          </Button>

          <Button
            variant="outline"
            asChild
            size="lg"
            className="rounded-md border-border bg-card/60 hover:bg-card hover:border-zinc-400 dark:hover:border-zinc-700 text-foreground transition-all text-sm sm:text-base px-5 sm:px-6"
          >
            <a href="#sobre" aria-label="Conhecer a EPM DEVTECH">
              <Layers className="size-4 mr-2 text-muted-foreground" aria-hidden="true" />
              Conhecer a EPM
            </a>
          </Button>
        </motion.div>

        {/* Microprova Social / Credenciais Técnicas */}
        <motion.div
          {...animationProps(0.42)}
          className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground pt-1 select-none"
        >
          <span className="inline-flex items-center gap-1.5 text-foreground/90 font-medium">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            +9 anos em sistemas críticos
          </span>
          <span className="text-border" aria-hidden="true">•</span>
          <span>Cloud-native</span>
          <span className="text-border" aria-hidden="true">•</span>
          <span>APIs resilientes</span>
          <span className="text-border" aria-hidden="true">•</span>
          <span>Código limpo</span>
        </motion.div>
      </div>

      {/* Visual Element: Central Software Architecture Canvas */}
      <motion.div
        {...animationProps(0.5)}
        className="relative mt-10 sm:mt-12 md:mt-16 w-full"
      >
        {/* System Architecture Console */}
        <HeroArchitecture />
      </motion.div>
    </section>
  );
};

export default Hero;
