import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/ui/typewriter";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      
      <div className="container relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-secondary/50 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              +9 anos de experiência em Engenharia de Software
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
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
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed min-h-[5rem]"
          >
            <Typewriter 
              text="Arquitetura de software robusta, APIs escaláveis e sistemas web de alta performance. Transformamos desafios técnicos em soluções elegantes e eficientes."
              speed={20}
              delay={2200}
            />
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              className="group bg-gradient-accent text-white hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-glow px-8 py-6 text-base font-semibold"
              asChild
            >
              <a href="#contato">
                Solicitar Orçamento
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-secondary hover:border-primary/50 hover:scale-105 transition-all duration-300 px-8 py-6 text-base"
              asChild
            >
              <a href="#servicos">
                <Code2 className="mr-2 w-4 h-4" />
                Conheça os Serviços
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
