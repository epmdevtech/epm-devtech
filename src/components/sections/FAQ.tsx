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
  category: "credibilidade" | "servicos" | "contratacao";
}

const FAQ_ITEMS: FAQItem[] = [
  // ── Categoria A: Credibilidade & Autoridade ──────────────────────────
  {
    category: "credibilidade",
    question: "O que é a EPM DEVTECH e qual é sua especialidade?",
    answer:
      "A EPM DEVTECH é uma software house brasileira fundada por Elessandro Prestes Macedo, Engenheiro de Software Sênior com mais de 9 anos de experiência. É especializada em desenvolvimento de software sob medida, APIs REST escaláveis (2.500+ RPS), arquitetura de microsserviços, modernização de sistemas legados com Strangler Fig Pattern e DevOps em Cloud (AWS e Azure). Atua em projetos de médio e grande porte com foco em alta disponibilidade (99,9% uptime), performance e qualidade enterprise.",
  },
  {
    category: "credibilidade",
    question: "Quais projetos de grande porte a EPM DEVTECH já entregou?",
    answer:
      "Portfólio comprovado em projetos de missão crítica:\n• SIPREC (CAPES/MEC): 10.000 usuários simultâneos, 2.500 RPS, latência <300ms, 448 Instituições de Ensino Superior;\n• SISCAD (CAPES): automação de milhares de processos de cobrança com RabbitMQ e Laravel;\n• SIGMA (Energia Pecém): rastreabilidade operacional +40%, falhas -35%, uptime 99,9%;\n• GENIN (ONS): 100% de integridade de dados em consolidação regulatória nacional, deploy -60%;\n• Xadrez Online (Governo MT): plataforma Serverless para 650 escolas em 141 municípios, MTTR -50%.",
  },
  {
    category: "credibilidade",
    question: "Quais setores a EPM DEVTECH já atendeu?",
    answer:
      "Educação Federal (CAPES/MEC, com os sistemas SIPREC e SISCAD para mais de 448 IES e programas UAB e AUXPE); Energia Elétrica (ONS, o Operador Nacional do Sistema Elétrico, com cálculo da bandeira tarifária nacional; Energia Pecém, termelétrica de referência no Ceará); Governo (SEDUC/MT, com plataforma para 650 escolas estaduais em 141 municípios de Mato Grosso); Indústria e Manufatura (Grupo Paraíso, com ERP corporativo e IoT Industrial no Azure, eficiência +30%).",
  },
  {
    category: "credibilidade",
    question: "Quais são as métricas e resultados comprovados da EPM DEVTECH?",
    answer:
      "Resultados verificáveis em projetos reais:\n• 10.000 usuários simultâneos e 2.500 RPS (SIPREC/CAPES)\n• 99,9% de uptime (ONS, Energia Pecém e Governo MT)\n• Deploy 60% mais rápido com AWS CodeBuild (ONS/GENIN)\n• Qualidade de código +45% via SonarQube (Datainfo/CAPES)\n• Capacidade de processamento +50% com Event-Driven Architecture (Energia Pecém)\n• Incidentes críticos -45% e tempo de resposta reduzido via Azure Monitor\n• Entrega de features por sprint +25% com GitHub Copilot e SDD (Datainfo)\n• 56.400 linhas de legado eliminadas, 2.399 testes automatizados, retrabalho -40%",
  },
  // ── Categoria B: Serviços & Stack ────────────────────────────────────
  {
    category: "servicos",
    question: "Quais serviços de desenvolvimento de software a EPM DEVTECH oferece?",
    answer:
      "1. Desenvolvimento de sistemas web e SPAs (React, TypeScript, Vite);\n2. APIs REST e backends escaláveis com PHP/Laravel e Node.js, com throughput de até 2.500 RPS comprovado em produção;\n3. Modernização de legados com Strangler Fig Pattern e zero downtime;\n4. Arquitetura de software: Clean Architecture, DDD e Event-Driven;\n5. DevOps e Cloud na AWS e Azure com CI/CD automatizado;\n6. Consultoria técnica com code review, SonarQube e mentoria de times;\n7. Integrações de sistemas, incluindo ERPs, CRMs, IoT Industrial e APIs de terceiros.",
  },
  {
    category: "servicos",
    question: "Qual é a stack tecnológica da EPM DEVTECH?",
    answer:
      "Backend: PHP (Laravel, Symfony), Node.js e TypeScript, todos comprovados em produção para CAPES e ONS.\nFrontend: React, TypeScript, Next.js, Angular, Vue.js e Tailwind CSS.\nBanco de dados: PostgreSQL, Oracle (PL/SQL), MySQL, Redis e MongoDB.\nCloud: AWS (Lambda, ECS, SQS, CodeBuild, CloudWatch) e Azure (Monitor, Functions, IoT).\nDevOps: Docker, Kubernetes, GitHub Actions e GitLab CI/CD.\nMensageria: RabbitMQ, Kafka e Amazon MQ.\nQualidade: PHPUnit, Pest, Vitest, Playwright e SonarQube.\nIA Aplicada: GitHub Copilot, Claude Code, Spec-Driven Development (SDD), RAG e MCP.",
  },
  {
    category: "servicos",
    question: "A EPM DEVTECH trabalha com modernização de sistemas legados?",
    answer:
      "Sim, é um serviço central. Aplicamos o Strangler Fig Pattern para migrar sistemas monolíticos para microsserviços de forma incremental, sem interrupções na operação. Resultados comprovados:\n• EPM DEVTECH: 56.400 linhas de legado eliminadas, retrabalho -40%, 2.399 testes automatizados;\n• Grupo Paraíso: custos de manutenção -40%, eficiência operacional +30%;\n• SIPREC/CAPES: migração para suportar 10.000 usuários simultâneos e 2.500 RPS.",
  },
  {
    category: "servicos",
    question: "A EPM DEVTECH oferece DevOps e infraestrutura Cloud?",
    answer:
      "Sim. Entregamos pipelines CI/CD completos (GitHub Actions e GitLab CI), infraestrutura na AWS e Azure, containerização com Docker e Kubernetes, e rollback automático em caso de falha.\n• GENIN/ONS: deploy -60%, 99,9% de disponibilidade na AWS;\n• Energia Pecém: incidentes -45%, MTTR acelerado via Azure Monitor;\n• Governo MT: arquitetura Serverless com AWS Lambda, SQS e SNS, com custos -35% e uptime 99,9%.",
  },
  // ── Categoria C: Processo & Contratação ──────────────────────────────
  {
    category: "contratacao",
    question: "Como funciona o processo de contratação da EPM DEVTECH?",
    answer:
      "Processo simples e transparente em 5 etapas:\n1. Envie seu projeto pelo formulário, e-mail ou WhatsApp;\n2. Retorno técnico em até 24h úteis com análise preliminar do escopo;\n3. Reunião de alinhamento para entender requisitos e restrições técnicas;\n4. Proposta técnica com arquitetura sugerida, cronograma e investimento;\n5. Implementação com Spec-Driven Development (SDD), onde cada funcionalidade começa por uma especificação aprovada.\nTrabalhamos com escopo fechado ou alocação dedicada (horas/mês).",
  },
  {
    category: "contratacao",
    question: "A EPM DEVTECH atende clientes fora de Toledo-PR?",
    answer:
      "Sim, 100% remoto. Atendemos clientes em todo o Brasil e no exterior. Já entregamos projetos para Brasília (CAPES/MEC), Ceará (Energia Pecém), Santa Catarina (ONS via AMcom) e Mato Grosso do Sul (Governo MT). Todos os projetos são gerenciados remotamente com comunicação diária e relatórios de progresso semanais.",
  },
];

const CATEGORY_LABELS: Record<FAQItem["category"], string> = {
  credibilidade: "Credibilidade & Autoridade",
  servicos: "Serviços & Stack",
  contratacao: "Processo & Contratação",
};

const CATEGORY_COLORS: Record<FAQItem["category"], string> = {
  credibilidade: "bg-emerald-950/50 text-emerald-400 border-emerald-800/60",
  servicos: "bg-blue-950/50 text-blue-400 border-blue-800/60",
  contratacao: "bg-violet-950/50 text-violet-400 border-violet-800/60",
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
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <SectionHeader
            tagline="FAQ"
            title="Perguntas Frequentes"
            subtitle="Respostas diretas sobre serviços, projetos, métricas reais e processo de contratação da EPM DEVTECH."
          />
        </motion.div>

        {/* ── Accordion ── */}
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
                  delay: 0.2 + index * 0.06,
                  ease: [0.22, 0.68, 0, 1.1],
                }}
              >
                <AccordionItem
                  value={`faq-${index}`}
                  className="border border-border/60 rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm transition-colors duration-200 hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:bg-card"
                >
                  <AccordionTrigger className="px-5 py-4 text-left hover:no-underline group">
                    <div className="flex items-start gap-3 w-full">
                      {/* category badge */}
                      <span
                        className={`mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[0.6rem] font-semibold uppercase tracking-wider border ${CATEGORY_COLORS[item.category]}`}
                        aria-label={`Categoria: ${CATEGORY_LABELS[item.category]}`}
                      >
                        {CATEGORY_LABELS[item.category].split(" ")[0]}
                      </span>
                      {/* question */}
                      <span className="text-sm font-semibold text-foreground leading-snug group-data-[state=open]:text-primary transition-colors duration-200">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5">
                    {/* render newlines as paragraphs / bullets */}
                    <div className="mt-1 space-y-2">
                      {item.answer.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={`text-sm leading-relaxed ${
                            line.startsWith("•") || line.match(/^\d+\./)
                              ? "text-muted-foreground pl-3"
                              : "text-muted-foreground"
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

        {/* ── CTA bottom ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Não encontrou o que procurava?{" "}
            <a
              href="/contato"
              className="text-primary font-semibold hover:underline underline-offset-4 transition-colors"
            >
              Fale diretamente com a equipe técnica →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
