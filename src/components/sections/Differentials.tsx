import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2,
  Shield,
  GitMerge,
  MessageCircle,
  Clock,
  Sparkles,
} from "lucide-react";

const Differentials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentials = [
    {
      icon: CheckCircle2,
      title: "Código Limpo & Testável",
      handle: "CLEAN CODE · TDD",
      description:
        "Seguimos princípios SOLID, Clean Code e TDD para garantir código de alta qualidade, fácil manutenção e evolução segura ao longo do tempo.",
    },
    {
      icon: Shield,
      title: "Arquitetura Bem Definida",
      handle: "HEXAGONAL · MICROSERVIÇOS",
      description:
        "Projetos com arquitetura clara desde o início — hexagonal, microserviços ou monolitos bem estruturados — reduzindo dívida técnica desde o day one.",
    },
    {
      icon: GitMerge,
      title: "Versionamento & CI/CD",
      handle: "GIT FLOW · DEPLOY",
      description:
        "Git flow rigoroso, pipelines automatizados e deploys seguros com rollback disponível para garantir estabilidade em produção.",
    },
    {
      icon: MessageCircle,
      title: "Comunicação Profissional",
      handle: "TRANSPARÊNCIA · ALINHAMENTO",
      description:
        "Atualizações regulares, documentação clara e alinhamento constante sobre entregas e prazos para que você nunca fique no escuro.",
    },
    {
      icon: Clock,
      title: "Entrega Responsável",
      handle: "PRAZO · QUALIDADE",
      description:
        "Comprometimento com prazos realistas, qualidade técnica e transparência em cada etapa — sem surpresas, sem atalhos.",
    },
    {
      icon: Sparkles,
      title: "Boas Práticas",
      handle: "SONARQUBE · REVIEW",
      description:
        "Code review, testes automatizados, análise estática com SonarQube e monitoramento contínuo para manter a saúde do projeto.",
    },
  ];

  return (
    <section id="diferenciais" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
            Por Que Escolher a{" "}
            <span className="text-gradient">EPM DEVTECH</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Qualidade técnica e profissionalismo em cada linha de código.
          </p>
        </motion.div>

        {/* Testimonial-style card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col justify-between p-6 bg-card hover:bg-primary/5 transition-colors duration-300"
            >
              {/* Body — description fills upper area */}
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Bottom row — separator + icon + title/handle */}
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-mono font-semibold text-sm leading-tight">
                    {item.title}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {item.handle}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
