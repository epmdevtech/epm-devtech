import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Target, Award, Users } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Building2,
      title: "Indústria",
      handle: "MANUFATURA",
      description:
        "Sistemas robustos para automação de processos, controle de produção e integração com ERPs em ambientes de manufatura.",
    },
    {
      icon: Target,
      title: "Varejo",
      handle: "E-COMMERCE",
      description:
        "Plataformas de e-commerce, gestão de estoque e soluções de checkout que escalam com o crescimento do negócio.",
    },
    {
      icon: Award,
      title: "Educação",
      handle: "CAPES · MEC · GOVERNO FEDERAL",
      description:
        "Projetos para a CAPES — órgão do Ministério da Educação do Governo Federal — com soluções de gestão acadêmica de alto impacto institucional.",
    },
    {
      icon: Users,
      title: "Energia",
      handle: "ONS · ENERGIA PECÉM",
      description:
        "Projetos para o Operador Nacional do Sistema Elétrico (ONS) e Energia Pecém — sistemas críticos de monitoramento e operação no setor elétrico brasileiro.",
    },
  ];

  return (
    <section id="sobre" className="relative py-24 bg-background" ref={ref}>
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
              Sobre a EPM DEVTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-6 leading-tight">
              Engenharia de Software com{" "}
              <span className="text-gradient">Excelência Técnica</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="font-mono text-sm leading-relaxed">
                A EPM DEVTECH é uma empresa especializada em desenvolvimento de software,
                fundada por Elessandro Prestes Macedo, desenvolvedor Full Stack com mais de
                9 anos de experiência em projetos de médio e grande porte.
              </p>
              <p className="font-mono text-sm leading-relaxed">
                Nossa atuação abrange desde o design de arquiteturas escaláveis até a
                implementação de sistemas complexos, sempre com foco em qualidade de código,
                boas práticas e entrega profissional.
              </p>
              <p className="font-mono text-sm leading-relaxed">
                Trabalhamos com metodologias ágeis, versionamento rigoroso e integração
                contínua (CI/CD), garantindo transparência e previsibilidade em cada projeto.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-gradient">+9</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Anos de Experiência
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">4</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Setores Atendidos
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Comprometimento
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid — testimonial card style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-0 border border-border rounded-2xl overflow-hidden"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={[
                  "group flex flex-col justify-between p-6 bg-card",
                  "hover:bg-primary/5 transition-colors duration-300",
                  // internal borders to create the grid separators
                  index % 2 === 0 ? "border-r border-border" : "",
                  index < 2 ? "border-b border-border" : "",
                ].join(" ")}
              >
                {/* Body — text fills top area */}
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Bottom row — separator + icon + title (mirrors avatar/name pattern) */}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
