import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Code2, Star } from "lucide-react";

const Authority = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const credentials = [
    {
      icon: Briefcase,
      value: "+9 anos",
      label: "Experiência Profissional",
      description: "Atuação em projetos de médio e grande porte",
    },
    {
      icon: GraduationCap,
      value: "Graduado",
      label: "Análise e Desenvolvimento de Sistemas",
      description: "Unipar – Universidade Paranaense",
    },
    {
      icon: Code2,
      value: "Full Stack",
      label: "Perfil Técnico Sênior",
      description: "Backend, frontend e infraestrutura",
    },
    {
      icon: Star,
      value: "4 Setores",
      label: "Experiência Diversificada",
      description: "Indústria, Varejo, Educação e Energia",
    },
  ];

  const achievements = [
    "Arquitetura de sistemas escaláveis para alto volume de requisições",
    "Integrações complexas com sistemas internos e externos",
    "Implementação de pipelines CI/CD e práticas DevOps",
    "Mentoria técnica e liderança em squads de desenvolvimento",
    "Modernização de sistemas legados para arquiteturas modernas",
    "Contribuições em projetos open-source (Arctic Code Vault Contributor)",
  ];

  return (
    <section id="autoridade" className="relative py-24 bg-background" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Credenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Autoridade <span className="text-gradient">Técnica</span>
          </h2>
          <p className="text-muted-foreground">
            Anos de experiência traduzidos em resultados concretos para empresas de diversos setores.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gradient mb-1">{item.value}</div>
              <div className="font-medium text-sm mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-center mb-8">Realizações em Destaque</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
