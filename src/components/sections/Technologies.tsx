import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TechConstellation from "./TechConstellation";
import {
  DEFAULT_CONSTELLATION_CATEGORIES,
  DEFAULT_CONSTELLATION_CONNECTIONS,
} from "@/lib/buildConstellationLayout";

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px 0px" });

  return (
    <section id="tecnologias" className="relative py-24 bg-background overflow-hidden" ref={ref}>
      <div className="container px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
            Stack Tecnológica
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-foreground">
            Tecnologias <span className="font-semibold text-foreground">Modernas</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
            Arquitetura interconectada com as melhores ferramentas e padrões da engenharia de software contemporânea.
          </p>
        </motion.div>

        {/* ── Tech Constellation Component ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <TechConstellation
            categories={DEFAULT_CONSTELLATION_CATEGORIES}
            connections={DEFAULT_CONSTELLATION_CONNECTIONS}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
