import { motion, useScroll, useTransform } from "framer-motion";
import { Code2 } from "lucide-react";

const Hero = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="container relative z-10 px-6 py-24"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Headline — renderizado de forma estável para zero CLS e LCP instantâneo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Arquitetura de software robusta, APIs escaláveis e sistemas web de alta performance. Transformamos desafios técnicos em soluções elegantes e eficientes.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <motion.a
              href="#servicos"
              aria-label="Conheça os serviços da EPM DEVTECH"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-base text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow no-underline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Code2 size={18} strokeWidth={2} />
              Conheça os Serviços
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
