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
      description: "Sistemas para manufatura e gestão industrial",
    },
    {
      icon: Target,
      title: "Varejo",
      description: "E-commerce e soluções de vendas",
    },
    {
      icon: Award,
      title: "Educação",
      description: "Plataformas de ensino e gestão acadêmica",
    },
    {
      icon: Users,
      title: "Energia",
      description: "Sistemas de monitoramento e controle",
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
            <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
              Sobre a EPM DEVTECH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Engenharia de Software com{" "}
              <span className="text-gradient">Excelência Técnica</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A EPM DEVTECH é uma empresa especializada em desenvolvimento de software, 
                fundada por Elessandro Prestes Macedo, desenvolvedor Full Stack com mais de 
                9 anos de experiência em projetos de médio e grande porte.
              </p>
              <p>
                Nossa atuação abrange desde o design de arquiteturas escaláveis até a 
                implementação de sistemas complexos, sempre com foco em qualidade de código, 
                boas práticas e entrega profissional.
              </p>
              <p>
                Trabalhamos com metodologias ágeis, versionamento rigoroso e integração 
                contínua (CI/CD), garantindo transparência e previsibilidade em cada projeto.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-gradient">+9</div>
                <div className="text-sm text-muted-foreground mt-1">Anos de Experiência</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">4</div>
                <div className="text-sm text-muted-foreground mt-1">Setores Atendidos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Comprometimento</div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
