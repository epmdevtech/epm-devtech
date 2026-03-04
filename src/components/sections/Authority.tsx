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
      handle: "GRANDES PROJETOS",
      description:
        "Atuação contínua em projetos de médio e grande porte, entregando soluções robustas em ambientes corporativos exigentes.",
    },
    {
      icon: GraduationCap,
      value: "Graduado",
      label: "Análise e Desenvolvimento de Sistemas",
      handle: "UNIPAR",
      description:
        "Formação acadêmica sólida em Análise e Desenvolvimento de Sistemas pela Universidade Paranaense — base técnica e teórica.",
    },
    {
      icon: Code2,
      value: "Full Stack",
      label: "Perfil Técnico Sênior",
      handle: "BACKEND · FRONTEND · INFRA",
      description:
        "Domínio completo da stack: backend, frontend e infraestrutura — capaz de assumir qualquer camada de uma aplicação.",
    },
    {
      icon: Star,
      value: "4 Setores",
      label: "Experiência Diversificada",
      handle: "INDÚSTRIA · VAREJO · EDTECH · ENERGIA",
      description:
        "Vivência em indústria, varejo, educação e energia permite adaptar soluções aos contextos mais variados com rapidez.",
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
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
            Credenciais
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
            Autoridade <span className="text-gradient">Técnica</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Anos de experiência traduzidos em resultados concretos para empresas de diversos setores.
          </p>
        </motion.div>

        {/* Credentials Grid — testimonial card style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border mb-16">
          {credentials.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between p-6 bg-card hover:bg-primary/5 transition-colors duration-300"
            >
              {/* Body — large value + description */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gradient mb-3">{item.value}</div>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom row — separator + icon + label/handle */}
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-semibold text-sm leading-tight truncate">
                    {item.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground truncate">
                    {item.handle}
                  </div>
                </div>
              </div>
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
          <h3 className="font-mono font-semibold uppercase tracking-widest text-xs text-center mb-8">
            Realizações em Destaque
          </h3>
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
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
