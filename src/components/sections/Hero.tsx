import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBadge from "@/components/sections/hero/HeroBadge";
import HeroArchitecture from "@/components/sections/hero/HeroArchitecture";
import { LampContainer } from "@/components/ui/lamp";

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
      aria-label="Seção principal — EPM DEVTECH Software House"
      className="relative mx-auto w-full overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 md:pb-20"
    >
      <LampContainer>
        {/* Main Content Column: Centralizado, proporcional e sob a iluminação Lamp */}
        <div className="flex max-w-4xl flex-col items-center text-center mx-auto gap-5 sm:gap-6">
          {/* Eyebrow / Status Badge */}
          <motion.div {...animationProps(0.05)} className="flex justify-center">
            <HeroBadge
              tag="EPM DEVTECH"
              label="SOFTWARE HOUSE"
              href="#sobre"
            />
          </motion.div>

          {/* Headline: Rigorosamente 100% monocromática (SPEC-014) */}
          <motion.h1
            {...animationProps(0.15)}
            className="text-balance font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] text-foreground leading-[1.14] tracking-tight max-w-3xl"
          >
            Desenvolvemos software <br className="hidden sm:inline" />
            sob medida para o seu negócio.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            {...animationProps(0.25)}
            className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Sistemas, aplicações web, APIs e integrações construídos para resolver problemas reais, com segurança, escala e evolução contínua.
          </motion.p>

          {/* Dual CTA Actions */}
          <motion.div
            {...animationProps(0.35)}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
          >
            <Button
              asChild
              size="lg"
              className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all text-sm sm:text-base font-semibold px-5 sm:px-6"
            >
              <a href="#contato" aria-label="Falar sobre meu projeto com a EPM DEVTECH">
                Falar sobre meu projeto
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
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-muted-foreground pt-2 select-none"
          >
            <span className="text-foreground/90 font-medium">Da ideia à produção</span>
            <span className="text-border" aria-hidden="true">•</span>
            <span>Engenharia direta</span>
            <span className="text-border" aria-hidden="true">•</span>
            <span>+9 anos de experiência</span>
          </motion.div>
        </div>

        {/* Visual Element: Central Software Architecture Canvas com transição e fade suave */}
        <motion.div
          {...animationProps(0.5)}
          className="relative mt-8 sm:mt-12 md:mt-16 w-full"
        >
          <HeroArchitecture />
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default Hero;
