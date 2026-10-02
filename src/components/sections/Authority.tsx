import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CountUp from "@/components/ui/CountUp";
import { cn } from "@/lib/utils";

const metrics = [
  {
    end: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Disponibilidade assegurada em plataformas críticas de energia e educação.",
    accessibleLabel: "99,9% de disponibilidade",
  },
  {
    end: 2500,
    decimals: 0,
    suffix: " RPS",
    formatThousands: true,
    label: "Arquitetura dimensionada para picos de 10.000 usuários simultâneos.",
    accessibleLabel: "2.500 requisições por segundo",
  },
  {
    end: 100,
    decimals: 0,
    suffix: "%",
    label: "De integridade dos dados na consolidação regulatória do setor elétrico, sem perda.",
    accessibleLabel: "100% de integridade",
  },
  {
    end: 35,
    decimals: 0,
    prefix: "\u2212",
    suffix: "%",
    label: "De atividades manuais, com automações e integrações em uma plataforma modernizada.",
    accessibleLabel: "redução de 35%",
  },
];

export interface AuthorityProps {
  className?: string;
}

const Authority: React.FC<AuthorityProps> = ({ className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="autoridade"
      aria-labelledby="autoridade-heading"
      className={cn(
        "py-14 lg:py-16 border-y border-border-subtle bg-surface/50 relative",
        className
      )}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Cabeçalho centralizado com escala padronizada e acessibilidade */}
          <SectionHeader
            id="autoridade-heading"
            tagline="Experiência e contexto"
            title="Experiência em operações que não podem parar"
            subtitle="Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."
          />

          {/* 4 Métricas Consolidadas com Animação CountUp */}
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-0 text-center lg:divide-x divide-border-subtle max-w-6xl mx-auto list-none p-0 m-0"
          >
            {metrics.map((m, idx) => (
              <li
                key={m.label}
                className={cn(
                  "px-4 flex flex-col items-center",
                  idx !== 0 && "lg:pl-6",
                  // Tablet (2 colunas): divisores internos 2x2
                  idx % 2 === 1 && "sm:border-l sm:border-border-subtle lg:border-l-0",
                  idx >= 2 && "sm:border-t sm:border-border-subtle lg:border-t-0 sm:pt-6 lg:pt-0",
                  // Mobile (1 coluna): divisores horizontais discretos
                  idx > 0 && "border-t border-border-subtle pt-6 sm:border-t-0 sm:pt-0"
                )}
              >
                <p className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
                  <span className="sr-only">{m.accessibleLabel}</span>
                  <CountUp
                    isCounting={isInView}
                    end={m.end}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    formatThousands={m.formatThousands}
                    duration={2}
                    aria-hidden="true"
                  />
                </p>
                <p className="text-xs sm:text-sm font-medium text-text-secondary mt-2 leading-relaxed max-w-xs mx-auto">
                  {m.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Nota discreta de confidencialidade */}
          <p className="text-xs text-text-muted text-center max-w-2xl mx-auto pt-2">
            Contexto e detalhes sob solicitação, respeitando a confidencialidade dos projetos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
