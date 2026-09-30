import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const metrics = [
  {
    value: "99,9%",
    label: "Disponibilidade assegurada em plataformas críticas de energia e educação.",
  },
  {
    value: "2.500 RPS",
    label: "Arquitetura dimensionada para picos de 10.000 usuários simultâneos.",
  },
  {
    value: "Zero perda",
    label: "Zero perda de dados na consolidação de dados regulatórios do setor elétrico.",
  },
];

const Authority = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="autoridade"
      className="py-14 lg:py-16 border-y border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 relative"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Cabeçalho com título e legenda de atribuição honesta */}
          <SectionHeader
            tagline="Experiência e contexto"
            title="Experiência em operações que não podem parar"
            subtitle="Resultados de projetos anteriores conduzidos pela liderança técnica da EPM DevTech."
            titleClassName="text-2xl sm:text-3xl"
          />

          {/* 3 Métricas Consolidadas da Trajetória Técnica */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-zinc-800/80 max-w-5xl mx-auto">
            {metrics.map((m, idx) => (
              <div
                key={m.value}
                className={idx === 0 ? "pt-4 sm:pt-0" : "pt-4 sm:pt-0 sm:pl-6"}
              >
                <p className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {m.value}
                </p>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed max-w-xs mx-auto">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
