import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   TECHNOLOGY DATA
   SVG icons inline for maximum compatibility (no extra deps)
───────────────────────────────────────────────────────────── */

interface Tech {
  name: string;
  icon: string; // SVG URL – we use Simple Icons CDN
  color: string; // accent color for hover glow
}

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TECH_ROW_1: Tech[] = [
  { name: "Kubernetes", icon: `${DI}/kubernetes/kubernetes-plain.svg`, color: "#326CE5" },
  { name: "Docker", icon: `${DI}/docker/docker-original.svg`, color: "#2496ED" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF", color: "#2088FF" },
  { name: "Terraform", icon: `${DI}/terraform/terraform-original-wordmark.svg`, color: "#7B42BC" },
  { name: "GitHub", icon: `${DI}/github/github-original.svg`, color: "#CCCCCC" },
  { name: "GitLab", icon: `${DI}/gitlab/gitlab-original.svg`, color: "#FC6D26" },
  { name: "Redis", icon: `${DI}/redis/redis-original.svg`, color: "#DC382D" },
  { name: "Oracle", icon: `${DI}/oracle/oracle-original.svg`, color: "#F80000" },
  { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`, color: "#FF9900" },
  { name: "Azure", icon: `${DI}/azure/azure-original.svg`, color: "#0078D4" },
];

const TECH_ROW_2: Tech[] = [
  { name: "React", icon: `${DI}/react/react-original.svg`, color: "#61DAFB" },
  { name: "Angular", icon: `${DI}/angular/angular-original.svg`, color: "#DD0031" },
  { name: "Vue.js", icon: `${DI}/vuejs/vuejs-original.svg`, color: "#4FC08D" },
  { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg`, color: "#3178C6" },
  { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg`, color: "#339933" },
  { name: "PHP", icon: `${DI}/php/php-original.svg`, color: "#777BB4" },
  { name: "Laravel", icon: `${DI}/laravel/laravel-original.svg`, color: "#FF2D20" },
  { name: "Symfony", icon: `${DI}/symfony/symfony-original-wordmark.svg`, color: "#AAAAAA" },
  { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg`, color: "#4169E1" },
  { name: "MySQL", icon: `${DI}/mysql/mysql-original.svg`, color: "#4479A1" },
  { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg`, color: "#47A248" },
  { name: "RabbitMQ", icon: `${DI}/rabbitmq/rabbitmq-original.svg`, color: "#FF6600" },
  { name: "Kafka", icon: `${DI}/apachekafka/apachekafka-original-wordmark.svg`, color: "#aaaaaa" },
  { name: "Grafana", icon: `${DI}/grafana/grafana-original.svg`, color: "#F46800" },
  { name: "Prometheus", icon: `${DI}/prometheus/prometheus-original.svg`, color: "#E6522C" },
  { name: "SonarQube", icon: `${DI}/sonarqube/sonarqube-original.svg`, color: "#4E9BCD" },
];

/* ─────────────────────────────────────────────────────────────
   A single infinite-scroll band
   direction: "left" | "right"
───────────────────────────────────────────────────────────── */
interface ScrollBandProps {
  items: Tech[];
  direction?: "left" | "right";
  speed?: number; // seconds per full cycle
}

const ScrollBand = ({ items, direction = "left", speed = 32 }: ScrollBandProps) => {
  // duplicate for seamless loop
  const doubled = [...items, ...items];
  const isRight = direction === "right";

  return (
    <div className="tech-band-wrapper">
      <div
        className="tech-band-track"
        style={{
          animationName: isRight ? "scrollRight" : "scrollLeft",
          animationDuration: `${speed}s`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="tech-card"
            style={{ "--glow": tech.color } as React.CSSProperties}
            title={tech.name}
          >
            <img
              src={tech.icon}
              alt={tech.name}
              width={36}
              height={36}
              loading="lazy"
              className="tech-icon"
            />
            <span className="tech-label">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────── */
const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const categories = [
    { title: "Backend", items: ["PHP", "Laravel", "Symfony", "Node.js", "TypeScript"] },
    { title: "Frontend", items: ["React", "Angular", "Vue.js", "JavaScript"] },
    { title: "Banco de Dados", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis"] },
    { title: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Kubernetes"] },
    { title: "Mensageria", items: ["RabbitMQ", "Kafka", "AWS SQS"] },
    { title: "Observabilidade", items: ["Prometheus", "Grafana", "SonarQube"] },
  ];

  return (
    <>
      {/* ── keyframe styles injected once ── */}
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* wrapper clips overflow and adds fade masks */
        .tech-band-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        /* continuous-moving row */
        .tech-band-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* pause on hover for the whole section */
        .tech-carousel-root:hover .tech-band-track {
          animation-play-state: paused;
        }

        /* individual card */
        .tech-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.9rem 1.2rem;
          border-radius: 14px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          min-width: 90px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          cursor: default;
          user-select: none;
          flex-shrink: 0;
        }

        .tech-card:hover {
          border-color: var(--glow);
          box-shadow: 0 0 18px -2px color-mix(in srgb, var(--glow) 60%, transparent);
          transform: translateY(-3px) scale(1.04);
        }

        /* icon stays sharp in both modes */
        .tech-icon {
          width: 36px;
          height: 36px;
          object-fit: contain;
          transition: filter 0.3s ease;
        }

        /* GitHub (devicons): black SVG → invert in dark mode to white */
        .dark .tech-icon[alt="GitHub"] {
          filter: invert(1) brightness(1.8);
        }
        /* Kafka & Symfony wordmark: very dark in light mode → lighten in dark mode */
        .dark .tech-icon[alt="Kafka"],
        .dark .tech-icon[alt="Symfony"] {
          filter: invert(0.6) brightness(1.5);
        }
        /* Kafka in light mode */
        :root:not(.dark) .tech-icon[alt="Kafka"] {
          filter: brightness(0.6);
        }

        .tech-label {
          font-size: 0.65rem;
          font-family: ui-monospace, "Cascadia Code", monospace;
          color: hsl(var(--muted-foreground));
          white-space: nowrap;
          letter-spacing: 0.03em;
          transition: color 0.3s;
        }

        .tech-card:hover .tech-label {
          color: hsl(var(--foreground));
        }

        /* pill chips for categories */
        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          border-radius: 999px;
          font-size: 0.72rem;
          font-family: ui-monospace, monospace;
          letter-spacing: 0.04em;
          background: hsl(var(--secondary));
          color: hsl(var(--muted-foreground));
          border: 1px solid hsl(var(--border));
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .cat-pill-highlight {
          background: hsl(var(--primary) / 0.12);
          color: hsl(var(--primary));
          border-color: hsl(var(--primary) / 0.35);
        }
      `}</style>

      <section id="tecnologias" className="relative py-24 bg-background overflow-hidden" ref={ref}>
        <div className="container px-6">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
              Stack Tecnológica
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
              Tecnologias <span className="text-gradient">Modernas</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Utilizamos as melhores ferramentas do mercado para entregar soluções
              robustas, escaláveis e de fácil manutenção.
            </p>
          </motion.div>

          {/* ── Category chips ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <div key={cat.title} className="flex flex-wrap gap-1.5 items-center">
                <span className="cat-pill cat-pill-highlight">{cat.title}</span>
                {cat.items.map((item) => (
                  <span key={item} className="cat-pill">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>

          {/* ── Carousel ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="tech-carousel-root flex flex-col gap-4"
          >
            <ScrollBand items={TECH_ROW_1} direction="left" speed={36} />
            <ScrollBand items={TECH_ROW_2} direction="right" speed={30} />
          </motion.div>

          {/* ── Bottom hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="text-center font-mono text-xs text-muted-foreground/60 mt-8 tracking-widest"
          >
            passe o mouse para pausar
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Technologies;
