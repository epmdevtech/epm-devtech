import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  Shield,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/badge";

const differentials = [
  {
    icon: MessageCircle,
    tag: "ALINHAMENTO & PREVISIBILIDADE",
    title: "Comunicação Transparente",
    description:
      "Alinhamento contínuo sobre escopo, decisões técnicas e prioridades. Você fala diretamente com quem planeja e executa a engenharia, reduzindo ruídos e alinhando expectativas.",
  },
  {
    icon: Shield,
    tag: "ARQUITETURA & MANUTENÇÃO",
    title: "Engenharia que Facilita Evoluir",
    description:
      "Arquitetura modular e código limpo pensados para facilitar manutenções futuras e permitir que o sistema cresça com segurança sem gerar gargalos técnicos.",
  },
  {
    icon: CheckCircle2,
    tag: "PRAGMATISMO & RESULTADO",
    title: "Foco no Problema do Negócio",
    description:
      "A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa, e não o inverso. Escolhas técnicas pragmáticas focadas em retorno real e estabilidade operacional.",
  },
];

const practices = [
  "Testes automatizados",
  "Revisão de código",
  "CI/CD",
  "Arquitetura orientada à manutenção",
];

const Differentials = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Coluna Esquerda: Cabeçalho & Práticas (≈ 40%) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
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
                align="left"
              />
            </motion.div>

            {/* Chips de Práticas de Engenharia */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={isInView || shouldReduceMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.2 }}
              className="pt-2"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/90 font-medium block mb-3.5">
                Práticas aplicadas conforme cada projeto
              </span>
              <div className="flex flex-wrap gap-2">
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

          {/* ── Coluna Direita: Linhas de Diferenciais (≈ 60%) ── */}
          <div className="lg:col-span-7">
            <motion.ul
              role="list"
              className="divide-y divide-border/60"
              variants={containerVariants}
              initial="hidden"
              animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
            >
              {differentials.map((item) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className="group relative py-7 sm:py-8 first:pt-0 last:pb-0 transition-colors"
                >
                  {/* Barra vertical esmeralda indicadora no hover */}
                  <div
                    className="absolute -left-3 sm:-left-4 top-2 bottom-2 w-1 rounded-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center hidden sm:block"
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Container do Ícone */}
                    <div
                      className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-250 mt-0.5"
                      aria-hidden="true"
                    >
                      <item.icon size={20} className="text-primary" />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      {/* Tag / Rótulo de Categoria */}
                      <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold block">
                        {item.tag}
                      </span>

                      {/* Título sem setas falsas */}
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>

                      {/* Descrição objetiva */}
                      <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed pt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
