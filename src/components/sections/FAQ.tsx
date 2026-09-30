import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "@/components/ui/SectionHeader";

interface FAQItem {
  question: string;
  answer: string;
  category: "contratacao" | "legados" | "processo";
}

const FAQ_ITEMS: FAQItem[] = [
  // ── Categoria: Contratação ──────────────────────────────────────────
  {
    category: "contratacao",
    question: "Preciso ter o projeto totalmente especificado para iniciar o contato?",
    answer:
      "Não. Você não precisa ter documentação técnica pronta nem lista fechada de requisitos. Basta compartilhar conosco o contexto do seu negócio, o problema operacional que você enfrenta ou o objetivo que deseja atingir. Durante a conversa inicial, ajudamos a mapear o cenário e desenhar a abordagem técnica recomendada.",
  },
  {
    category: "contratacao",
    question: "Como funciona o primeiro contato, o diagnóstico inicial e o tempo de retorno?",
    answer:
      "Nosso retorno ocorre em até 24 horas úteis após o envio da sua mensagem. Agendamos uma conversa inicial para entender seu contexto, avaliar o volume esperado, regras de negócio e integrações necessárias, apresentando uma visão transparente sobre viabilidade e opções de arquitetura sem compromisso.",
  },
  {
    category: "contratacao",
    question: "Como é definido o orçamento e o modelo de trabalho?",
    answer:
      "Trabalhamos com dois modelos flexíveis, conforme a necessidade do projeto:\n• Escopo fechado: ideal para projetos com requisitos claros, oferecendo investimento fixo e cronograma planejado.\n• Alocação técnica dedicada: modalidade ágil de horas mensais, recomendada para modernização contínua, arquiteturas em evolução e demandas de alta complexidade.",
  },
  {
    category: "contratacao",
    question: "A EPM DevTech atende clientes fora de Toledo (PR) ou no exterior?",
    answer:
      "Sim, atuamos de forma remota para empresas e instituições de qualquer região. Já participamos de soluções aplicadas em diferentes estados brasileiros, mantendo comunicação frequente, alinhamentos periódicos e acompanhamento próximo a cada etapa.",
  },

  // ── Categoria: Sistemas Existentes ──────────────────────────────────
  {
    category: "legados",
    question: "Vocês assumem, mantêm ou evoluem sistemas desenvolvidos por outra empresa?",
    answer:
      "Sim. Iniciamos com uma avaliação técnica na base de código existente para mapear arquitetura, gargalos de performance e dependências críticas. A partir desse diagnóstico, estabelecemos um plano para estabilização, resolução de gargalos, manutenção contínua ou evolução do sistema.",
  },
  {
    category: "legados",
    question: "É possível modernizar um sistema legado sem interromper a operação?",
    answer:
      "Sim. Trabalhamos com estratégias de migração gradual: novos módulos são desenvolvidos e colocados em produção progressivamente, de forma incremental, reduzindo o risco de interrupção nas operações diárias da sua empresa.",
  },

  // ── Categoria: Processo & Engenharia ────────────────────────────────
  {
    category: "processo",
    question: "Como funciona o início de um projeto?",
    answer:
      "Antes de desenvolver, registramos escopo, decisões e critérios de aceite em um documento de especificação, para que todos saibam exatamente o que será entregue. Durante toda a execução, você tem canal direto com a liderança técnica do projeto, com entregas incrementais validadas continuamente.",
  },
  {
    category: "processo",
    question: "Vocês desenvolvem sites institucionais?",
    answer:
      "Sim. Desenvolvemos sites institucionais, portais corporativos e páginas de presença digital com foco em credibilidade, desempenho, acessibilidade e boa experiência em dispositivos móveis, inclusive integrando com sistemas internos ou APIs quando necessário.",
  },
];

const CATEGORY_LABELS: Record<FAQItem["category"], string> = {
  contratacao: "Contratação & Modelo",
  legados: "Sistemas Existentes",
  processo: "Processo & Engenharia",
};

const CATEGORY_COLORS: Record<FAQItem["category"], string> = {
  contratacao:
    "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60",
  legados:
    "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800/60",
  processo:
    "bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800/60",
};

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 bg-background overflow-hidden"
      aria-label="Perguntas frequentes"
    >
      {/* top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--primary) / 0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <SectionHeader
            tagline="Dúvidas Frequentes"
            title="As perguntas que sempre chegam primeiro"
            subtitle="Respostas diretas sobre como começar um projeto, como mexemos em sistema legado e como funciona nosso modelo de trabalho."
          />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.15 + index * 0.05,
                  ease: [0.22, 0.68, 0, 1.1],
                }}
              >
                <AccordionItem
                  value={`faq-${index}`}
                  className="border border-zinc-200/80 dark:border-border/60 rounded-xl overflow-hidden bg-white/95 dark:bg-card/50 shadow-sm transition-colors duration-200 hover:border-primary/40 data-[state=open]:border-primary/50 data-[state=open]:bg-white dark:data-[state=open]:bg-card"
                >
                  <AccordionTrigger className="px-5 py-4 text-left hover:no-underline group">
                    <div className="flex items-start gap-3 w-full">
                      {/* category badge */}
                      <span
                        className={`mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[0.6rem] font-bold uppercase tracking-wider border shadow-xs ${CATEGORY_COLORS[item.category]}`}
                        aria-label={`Categoria: ${CATEGORY_LABELS[item.category]}`}
                      >
                        {CATEGORY_LABELS[item.category].split(" ")[0]}
                      </span>
                      {/* question */}
                      <span className="text-sm font-semibold text-zinc-900 dark:text-foreground leading-snug group-data-[state=open]:text-primary transition-colors duration-200">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5">
                    <div className="mt-1 space-y-2 text-zinc-600 dark:text-zinc-400">
                      {item.answer.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={`text-sm leading-relaxed ${
                            line.startsWith("•")
                              ? "pl-3 font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400"
                              : ""
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Tem alguma dúvida específica sobre o seu cenário?{" "}
            <a
              href="#contato"
              className="text-primary font-semibold hover:underline underline-offset-4 transition-colors"
            >
              Falar sobre meu projeto →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
