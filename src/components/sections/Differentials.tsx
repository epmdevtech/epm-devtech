import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  IconTransparentCommunication,
  IconEvolutionaryEngineering,
  IconBusinessFocus,
} from "@/components/icons";

const differentials = [
  {
    Icon: IconTransparentCommunication,
    tag: "ALINHAMENTO & PREVISIBILIDADE",
    title: "Comunicação transparente",
    description:
      "Alinhamento contínuo sobre escopo, decisões técnicas e prioridades. Você fala diretamente com quem planeja e executa a engenharia, reduzindo ruídos e nivelando expectativas.",
  },
  {
    Icon: IconEvolutionaryEngineering,
    tag: "ARQUITETURA & MANUTENÇÃO",
    title: "Engenharia que facilita evoluir",
    description:
      "Arquitetura modular e código limpo pensados para facilitar manutenções futuras e permitir que o sistema cresça com segurança sem gerar gargalos técnicos.",
  },
  {
    Icon: IconBusinessFocus,
    tag: "PRAGMATISMO & RESULTADO",
    title: "Foco no problema do negócio",
    description:
      "A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa, e não o inverso. Escolhas técnicas pragmáticas focadas em retorno real e estabilidade operacional.",
  },
];

const practices = [
  "Testes automatizados",
  "Revisão de código",
  "CI/CD",
  "Arquitetura orientada à manutenção",
  "Desenvolvimento assistido por IA, com revisão humana",
];

export interface DifferentialsProps {
  hideHeader?: boolean;
}

const Differentials: React.FC<DifferentialsProps> = ({ hideHeader = false }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: [0.22, 0.68, 0, 1.1],
      },
    },
  };

  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-heading"
      className="relative py-24 bg-secondary/30 overflow-hidden"
      ref={ref}
    >
      {/* top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6">
        {/* ── Cabeçalho Padronizado Centralizado ── */}
        {!hideHeader && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <SectionHeader
              id="diferenciais-heading"
              tagline="Diferenciais"
              title="Por que trabalhar com a EPM DevTech"
              subtitle="Engenharia focada na longevidade do seu software, com transparência em cada etapa do projeto."
            />
          </motion.div>
        )}

        {/* ── Corpo em 3 Colunas sem Moldura de Card ── */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60 max-w-6xl mx-auto list-none p-0 m-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
        >
          {differentials.map((item, index) => (
            <motion.li
              key={item.title}
              variants={itemVariants}
              className={`py-8 md:py-4 px-0 md:px-8 flex flex-col items-start text-left group ${
                index === 0 ? "md:pl-0" : index === 2 ? "md:pr-0" : ""
              }`}
            >
              {/* Ícone Conceitual Autoral no Topo (sem caixa esmeralda) */}
              <div className="mb-4 text-text-secondary group-hover:text-text-brand transition-colors duration-200">
                <item.Icon size={26} aria-hidden="true" />
              </div>

              {/* Rótulo de Categoria */}
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold block mb-2">
                {item.tag}
              </span>

              {/* Título H3 em Sentence Case */}
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2.5">
                {item.title}
              </h3>

              {/* Descrição Alinhada à Esquerda */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Bloco Inferior Centralizado: Práticas de Engenharia ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.25 }}
          className="mt-14 pt-10 border-t border-border/40 text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/90 font-medium block mb-3.5">
            Práticas aplicadas conforme cada projeto
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {practices.map((practice) => (
              <Badge
                key={practice}
                variant="outline"
                className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-background/80 hover:bg-background border-border/80 text-foreground/90 transition-colors shadow-xs"
              >
                {practice}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Differentials;
