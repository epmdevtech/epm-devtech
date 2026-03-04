import { motion, useScroll, useTransform } from "framer-motion";
import { Code2 } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

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

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight mb-6"
          >
            <Typewriter text="Soluções Digitais " speed={50} />
            <span className="text-gradient">
              <Typewriter text="Sob Medida" speed={50} delay={900} />
            </span>
            <br />
            <span className="text-muted-foreground">
              <Typewriter text="Para Sua Empresa" speed={50} delay={1400} />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-mono text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed min-h-[5rem]"
          >
            <Typewriter
              text="Arquitetura de software robusta, APIs escaláveis e sistemas web de alta performance. Transformamos desafios técnicos em soluções elegantes e eficientes."
              speed={20}
              delay={2200}
            />
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#ffffff",
                background: "linear-gradient(135deg, #2979FF 0%, #A855F7 50%, #0EA5E9 100%)",
                backgroundSize: "200% 200%",
                boxShadow: "0 0 20px 0 rgba(41,121,255,0.4)",
                textDecoration: "none",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 28px 4px rgba(168,85,247,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
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
