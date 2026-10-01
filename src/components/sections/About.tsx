import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { IconTechLeadership } from "@/components/icons";

interface StaticStatProps {
  value: string;
  label: string;
}

const StaticStat = ({ value, label }: StaticStatProps) => {
  return (
    <div className="flex flex-col-reverse justify-end gap-2 group" data-testid="animated-stat">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary flex items-baseline leading-none drop-shadow-sm">
        {value}
      </div>
      <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.12em] text-muted-foreground/80">
        {label}
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="relative py-24 bg-background overflow-hidden" ref={ref}>
      {/* top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6">
        {/* ── Cabeçalho Padronizado Centralizado ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            id="sobre-heading"
            tagline="Sobre a empresa"
            title="Engenharia de software com visão de negócio"
            subtitle="Desenvolvimento e modernização de sistemas corporativos com foco em eficiência, estabilidade e evolução sustentável."
          />
        </motion.div>

        {/* ── Grid de Conteúdo (Texto Corrido à Esquerda + Card Liderança) ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Lado Esquerdo: História e Posicionamento (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 font-normal">
              A EPM DevTech é uma software house dedicada a desenvolver e modernizar sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de evolução.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-normal">
              Fundada e liderada tecnicamente por Elessandro Prestes Macedo, que traz mais de 9 anos de experiência prática em projetos corporativos, a empresa atua com foco em escopo bem definido, comunicação transparente e entregas previsíveis a cada ciclo.
            </p>

            {/* Indicador Único de Experiência Técnica da Liderança (Estático) */}
            <div className="mt-8 pt-8 border-t border-border/50 max-w-xs">
              <StaticStat value="+9" label="anos de experiência técnica" />
            </div>
          </motion.div>

          {/* Lado Direito: Liderança Técnica (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4 text-left"
          >
            <div className="p-7 sm:p-8 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="text-primary">
                  <IconTechLeadership size={18} aria-hidden="true" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                  Fundador e liderança técnica
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-3">
                Elessandro Prestes Macedo
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                Atua na arquitetura, escolha tecnológica e condução técnica dos projetos da EPM DevTech. Com base prática em sistemas corporativos, assegura que cada decisão de software priorize simplicidade, manutenibilidade e estabilidade para a operação do cliente.
              </p>
              <div className="pt-4 border-t border-border/50 font-mono text-xs text-muted-foreground/80 flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary shrink-0" />
                <span>Arquitetura de software & governança técnica</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
