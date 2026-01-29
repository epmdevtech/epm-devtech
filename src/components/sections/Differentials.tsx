import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  CheckCircle2, 
  Shield, 
  GitMerge, 
  MessageCircle, 
  Clock, 
  Sparkles 
} from "lucide-react";

const Differentials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const differentials = [
    {
      icon: CheckCircle2,
      title: "Código Limpo & Testável",
      description: "Seguimos princípios SOLID, Clean Code e TDD para garantir código de alta qualidade e fácil manutenção.",
    },
    {
      icon: Shield,
      title: "Arquitetura Bem Definida",
      description: "Projetos com arquitetura clara desde o início: hexagonal, microserviços ou monolitos bem estruturados.",
    },
    {
      icon: GitMerge,
      title: "Versionamento & CI/CD",
      description: "Git flow rigoroso, pipelines automatizados e deploys seguros com rollback disponível.",
    },
    {
      icon: MessageCircle,
      title: "Comunicação Profissional",
      description: "Atualizações regulares, documentação clara e alinhamento constante sobre entregas e prazos.",
    },
    {
      icon: Clock,
      title: "Entrega Responsável",
      description: "Compromisso com prazos realistas, qualidade técnica e transparência em cada etapa do projeto.",
    },
    {
      icon: Sparkles,
      title: "Boas Práticas",
      description: "Code review, testes automatizados, análise estática com SonarQube e monitoramento contínuo.",
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
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Por Que Escolher a{" "}
            <span className="text-gradient">EPM DEVTECH</span>
          </h2>
          <p className="text-muted-foreground">
            Qualidade técnica e profissionalismo em cada linha de código.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
