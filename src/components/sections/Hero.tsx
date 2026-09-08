import { useEffect, useState } from "react";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Only apply scroll effect on desktop to save mobile performance
    if (window.innerWidth > 768) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and scale based on scroll position (max 600px with opacity floor)
  const progress = Math.min(scrollY / 600, 1);
  const opacity = Math.max(0.15, 1 - progress);
  const scale = 1 - (progress * 0.08); // scale from 1 to 0.92

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background noise">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />

      <div
        style={{ opacity, transform: `scale(${scale})` }}
        className="container relative z-10 px-6 py-24 will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Tagline superior: Ponto único de cor na badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full uppercase tracking-wider font-semibold text-xs bg-emerald-50 border border-emerald-200/70 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800/60 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>Engenharia de Software & Modernização</span>
          </div>

          {/* Headline: Rigorosamente linear, 100% monocromático e sem divisões cromáticas */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 text-zinc-900 dark:text-white">
            Software sob medida construído para escalar o seu negócio.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal max-w-2xl sm:max-w-3xl mx-auto mb-10">
            Da concepção à infraestrutura: desenvolvemos sistemas web, APIs resilientes e arquiteturas de alta performance preparadas para acompanhar o crescimento da sua empresa.
          </p>

          {/* Dual CTA: Microcopy direto */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#contato"
              aria-label="Falar com a engenharia da EPM DEVTECH"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base text-white bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out no-underline"
            >
              <span>Falar com a engenharia</span>
              <ArrowRight size={18} strokeWidth={2.2} />
            </a>

            <a
              href="#servicos"
              aria-label="Ver serviços da EPM DEVTECH"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-base text-foreground border border-border/80 bg-background/50 hover:bg-muted/50 hover:border-border hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-out no-underline"
            >
              <Code2 size={18} strokeWidth={2.2} className="text-primary" />
              <span>Ver serviços</span>
            </a>
          </div>

          {/* Microprova Social */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-muted-foreground/80">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-primary" />
              +9 anos de experiência em sistemas críticos
            </span>
            <span className="hidden sm:inline text-muted-foreground/40">•</span>
            <span>Arquiteturas cloud-native</span>
            <span className="text-muted-foreground/40">•</span>
            <span>APIs resilientes</span>
            <span className="text-muted-foreground/40">•</span>
            <span>Código limpo</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
