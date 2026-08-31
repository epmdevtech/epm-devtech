import { useEffect, useState } from "react";
import { Code2 } from "lucide-react";

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

  // Calculate opacity and scale based on scroll position (max 300px)
  const progress = Math.min(scrollY / 300, 1);
  const opacity = 1 - progress;
  const scale = 1 - (progress * 0.1); // scale from 1 to 0.9

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />

      <div
        style={{ opacity, transform: `scale(${scale})` }}
        className="container relative z-10 px-6 py-24 will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline — SEM opacity-0 para que o LCP seja registrado imediatamente
              ao renderizar. Somente o h1 deve ser visível instantaneamente;
              subtitle e CTA podem animar normalmente (não são LCP). */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-6"
          >
            <span>Soluções Digitais </span>
            <span className="text-gradient font-normal">
              Sob Medida
            </span>
            <br />
            <span className="text-muted-foreground">
              Para Sua Empresa
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-mono text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up opacity-0"
            style={{ animationDelay: '200ms' }}
          >
            Arquitetura de software robusta, APIs escaláveis e sistemas web de alta performance. Transformamos desafios técnicos em soluções elegantes e eficientes.
          </p>

          {/* CTA */}
          <div
            className="flex items-center justify-center animate-fade-in-up opacity-0"
            style={{ animationDelay: '300ms' }}
          >
            <a
              href="#servicos"
              aria-label="Conheça os serviços da EPM DEVTECH"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-base text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.04] active:scale-95 transition-all duration-200 ease-out no-underline"
            >
              <Code2 size={18} strokeWidth={2} />
              Conheça os Serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
