import { Button } from "@/components/ui/button";
import BrandChipIcon from "@/components/ui/BrandChipIcon";

const Hero = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative w-full bg-background pt-20 sm:pt-24 md:pt-24 pb-2 sm:pb-3 overflow-hidden"
    >
      <div className="container px-4 sm:px-6 mx-auto flex flex-col items-center text-center">
        {/* Eyebrow minimalista com ícone oficial da marca e tipografia mono */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3 sm:mb-3.5"
        >
          <BrandChipIcon size={15} className="shrink-0" />
          <span>Software House</span>
        </div>

        {/* Headline: Monocromática, sem animação de entrada (LCP instantâneo), max-w-[20ch] para 2 linhas no desktop */}
        <h1
          id="hero-title"
          className="font-bold text-foreground tracking-tight text-center [text-wrap:balance] max-w-[20ch] text-[clamp(2rem,1.2rem+3.2vw,3.5rem)] leading-[1.14] mb-3.5 sm:mb-4"
        >
          Desenvolvemos software sob medida para o seu negócio.
        </h1>

        {/* Subheadline: 2 linhas no desktop, cor secundária sólida dos tokens */}
        <p className="font-normal text-muted-foreground text-center [text-wrap:pretty] max-w-2xl text-[clamp(1rem,0.95rem+0.3vw,1.125rem)] leading-relaxed mb-6 sm:mb-7">
          Sistemas web, APIs, integrações e soluções digitais construídas para resolver problemas reais e acompanhar a evolução da sua empresa.
        </p>

        {/* Dual Actions: Botão primário dominante + link de texto secundário */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-none">
          <Button
            asChild
            className="h-11 sm:h-12 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm sm:text-base shadow-xs min-h-[44px] w-full sm:w-auto transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href="#contato" aria-label="Falar sobre meu projeto com a EPM DevTech">
              Falar sobre meu projeto
            </a>
          </Button>

          <a
            href="#sobre"
            aria-label="Conhecer a EPM DevTech"
            className="inline-flex items-center justify-center min-h-[44px] px-3 py-2 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Conhecer a EPM DevTech
          </a>
        </div>

        {/* Detalhe de transição minimalista: linha 1px em cor sólida com nó central esmeralda sólido da marca */}
        <div className="w-full pt-8 sm:pt-10 relative flex items-center justify-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
          <div className="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
