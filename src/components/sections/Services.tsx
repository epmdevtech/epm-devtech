import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Globe, 
  Server, 
  GitBranch, 
  Layers, 
  Wrench, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Globe,
      title: "Desenvolvimento de Sistemas Web",
      description: "Aplicações web modernas, responsivas e otimizadas para performance. SPAs com Angular, Vue.js e React.",
      features: ["Interfaces responsivas", "SPAs modernas", "Performance otimizada"],
    },
    {
      icon: Server,
      title: "APIs & Backends Robustos",
      description: "APIs REST e SOAP escaláveis com PHP/Laravel e Node.js. Arquitetura preparada para alto volume de requisições.",
      features: ["APIs REST/SOAP", "Autenticação segura", "Alta escalabilidade"],
    },
    {
      icon: GitBranch,
      title: "Integrações de Sistemas",
      description: "Conexão entre sistemas internos e externos, mensageria com RabbitMQ e Kafka, webhooks e sincronização de dados.",
      features: ["RabbitMQ & Kafka", "Webhooks", "ETL de dados"],
    },
    {
      icon: Layers,
      title: "Arquitetura de Software",
      description: "Design de arquiteturas sólidas: microserviços, monolitos bem estruturados, hexagonal e BFF.",
      features: ["Microserviços", "Arquitetura Hexagonal", "Clean Architecture"],
    },
    {
      icon: Wrench,
      title: "Manutenção & Evolução",
      description: "Suporte contínuo, correção de bugs, melhorias de performance e atualização tecnológica de sistemas legados.",
      features: ["Suporte contínuo", "Refatoração", "Modernização"],
    },
    {
      icon: MessageSquare,
      title: "Consultoria Técnica",
      description: "Análise de viabilidade, revisão de código, mentoria técnica e apoio em decisões de arquitetura.",
      features: ["Code review", "Mentoria", "Planejamento técnico"],
    },
  ];

  return (
    <section id="servicos" className="relative py-24 bg-secondary/30" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Soluções <span className="text-gradient">End-to-End</span>
          </h2>
          <p className="text-muted-foreground">
            Do planejamento à entrega, oferecemos serviços completos de desenvolvimento 
            de software com foco em qualidade e resultados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-card"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 shadow-glow">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                    <ArrowRight className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
