import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      title: "Backend",
      items: [
        { name: "PHP", highlight: true },
        { name: "Laravel", highlight: true },
        { name: "Node.js", highlight: true },
        { name: "Express" },
        { name: "TypeScript" },
      ],
    },
    {
      title: "Frontend",
      items: [
        { name: "Angular", highlight: true },
        { name: "Vue.js", highlight: true },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "HTML5/CSS3" },
      ],
    },
    {
      title: "Banco de Dados",
      items: [
        { name: "PostgreSQL", highlight: true },
        { name: "MySQL" },
        { name: "Oracle" },
        { name: "SQL Server" },
        { name: "MongoDB" },
        { name: "Redis" },
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        { name: "AWS", highlight: true },
        { name: "Azure" },
        { name: "Docker", highlight: true },
        { name: "CI/CD" },
        { name: "GitHub Actions" },
      ],
    },
    {
      title: "Mensageria",
      items: [
        { name: "RabbitMQ", highlight: true },
        { name: "Kafka", highlight: true },
        { name: "AWS SQS" },
        { name: "AWS SNS" },
      ],
    },
    {
      title: "Observabilidade",
      items: [
        { name: "Prometheus" },
        { name: "Grafana" },
        { name: "SonarQube" },
        { name: "CloudWatch" },
      ],
    },
  ];

  return (
    <section id="tecnologias" className="relative py-24 bg-background" ref={ref}>
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Stack Tecnológica
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tecnologias <span className="text-gradient">Modernas</span>
          </h2>
          <p className="text-muted-foreground">
            Utilizamos as melhores ferramentas do mercado para entregar soluções 
            robustas, escaláveis e de fácil manutenção.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <h3 className="font-semibold mb-4 text-lg">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors ${
                      item.highlight
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                    }`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AWS Services Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 rounded-xl bg-gradient-card border border-border"
        >
          <h4 className="font-semibold mb-3 text-center">Serviços AWS em Destaque</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {["EC2", "ECS", "Lambda", "SQS", "SNS", "S3", "RDS", "CloudWatch"].map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full text-xs font-mono bg-secondary text-muted-foreground border border-border"
              >
                {service}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
