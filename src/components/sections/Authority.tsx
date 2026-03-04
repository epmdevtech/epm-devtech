import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  Code2,
  Star,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

const Authority = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const credentials = [
    {
      icon: Briefcase,
      label: "Experiência Profissional",
      handle: "GRANDES PROJETOS",
      description:
        "Atuação contínua em projetos de médio e grande porte, entregando soluções robustas em ambientes corporativos exigentes — da concepção à produção.",
    },
    {
      icon: Code2,
      label: "Perfil Full Stack Sênior",
      handle: "BACKEND · FRONTEND · INFRA",
      description:
        "Domínio completo da stack: backend, frontend e infraestrutura. Capaz de assumir qualquer camada de uma aplicação com proeficiência técnica.",
    },
    {
      icon: Star,
      label: "Experiência Multi-Setor",
      handle: "INDÚSTRIA · VAREJO · EDTECH · ENERGIA",
      description:
        "Vivência em indústria, varejo, educação e energia permite adaptar soluções a contextos variados com rapidez, maturidade e clareza de decisão.",
    },
    {
      icon: GitBranch,
      label: "Práticas de Engenharia",
      handle: "CLEAN CODE · CI/CD · TDD",
      description:
        "Aplicação rigorosa de Clean Code, Test-Driven Development e pipelines automatizados — garantindo código de alta qualidade e entrega confiável.",
    },
    {
      icon: ShieldCheck,
      label: "Compromisso com Resultados",
      handle: "PRAZO · QUALIDADE · TRANSPARÊNCIA",
      description:
        "Projetos entregues dentro do prazo, com comunicação clara, documentação adequada e foco em valor real para o negócio — sem atalhos técnicos.",
    },
  ];

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           AUTHORITY / CREDENTIALS SECTION
        ══════════════════════════════════════════════════ */

        .cred-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem 3rem;
        }
        @media (max-width: 1023px) {
          .cred-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (max-width: 639px) {
          .cred-grid { grid-template-columns: 1fr; gap: 1.75rem; }
        }

        .cred-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 0;
          position: relative;
        }

        /* icon */
        .cred-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          background: hsl(var(--primary) / 0.1);
          border: 1px solid hsl(var(--primary) / 0.18);
          color: hsl(var(--primary));
          transition: background 0.3s, border-color 0.3s;
          margin-bottom: 0.35rem;
        }
        .cred-card:hover .cred-icon-wrap {
          background: hsl(var(--primary) / 0.18);
          border-color: hsl(var(--primary) / 0.35);
        }

        /* title */
        .cred-title {
          font-size: 1rem;
          font-weight: 500;
          color: hsl(var(--foreground));
          letter-spacing: -0.01em;
          line-height: 1.3;
        }

        /* handle */
        .cred-handle {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: hsl(var(--primary));
          opacity: 0.75;
        }

        /* description */
        .cred-desc {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
        }
      `}</style>

      <section id="autoridade" className="relative py-24 bg-background" ref={ref}>
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-16"
          >
            <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
              Credenciais
            </span>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 leading-tight">
              Autoridade <span className="text-gradient">Técnica</span> que{" "}
              <span className="text-gradient">Gera Resultados</span>
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Anos de experiência em projetos reais, traduzidos em competência técnica aplicada e entrega consistente.
            </p>
          </motion.div>

          {/* Credentials Feature Grid */}
          <div className="cred-grid">
            {credentials.map((item, index) => (
              <motion.div
                key={item.label}
                className="cred-card"
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.09 }}
              >
                {/* Icon */}
                <div className="cred-icon-wrap">
                  <item.icon size={18} />
                </div>

                {/* Title */}
                <div className="cred-title">{item.label}.</div>

                {/* Handle */}
                <div className="cred-handle">{item.handle}</div>

                {/* Description */}
                <p className="cred-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Authority;
