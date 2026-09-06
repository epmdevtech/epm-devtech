import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
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
          className="mb-12"
        >
          <SectionHeader
            tagline="Stack Tecnológica"
            title={
              <>
                Tecnologias{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Modernas
                </span>
              </>
            }
            subtitle="Arquitetura interconectada com padrões sólidos de engenharia, ferramentas consolidadas e foco em alta disponibilidade."
          />
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
