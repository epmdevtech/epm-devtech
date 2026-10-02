import { FC, useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

interface StatItem {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
  label: string;
  description: string;
  accessibleLabel: string;
}

const stats: StatItem[] = [
  {
    end: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Disponibilidade assegurada",
    description: "Em plataformas críticas de energia e educação.",
    accessibleLabel: "99,9% de disponibilidade assegurada",
  },
  {
    end: 2500,
    decimals: 0,
    suffix: " RPS",
    formatThousands: true,
    label: "Arquitetura dimensionada",
    description: "Para picos de 10.000 usuários simultâneos sem gargalos.",
    accessibleLabel: "2.500 requisições por segundo",
  },
  {
    end: 100,
    decimals: 0,
    suffix: "%",
    label: "Integridade de dados",
    description: "Na consolidação regulatória do setor elétrico, sem perdas.",
    accessibleLabel: "100% de integridade de dados",
  },
  {
    end: 35,
    decimals: 0,
    prefix: "\u2212",
    suffix: "%",
    label: "Atividades manuais reduzidas",
    description: "Automações e integrações em plataformas modernizadas.",
    accessibleLabel: "redução de 35% de atividades manuais",
  },
];

/**
 * HomeResultsStrip
 * ────────────────
 * Faixa de métricas (Stat Strip) tipográfica de alto impacto com contadores animados (CountUp).
 * Apresenta as métricas técnicas consolidadas da liderança de engenharia com ativação suave
 * por visibilidade no viewport (useInView), sem caixas fechadas e com divisores verticais sutis.
 */
export const HomeResultsStrip: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="py-8 sm:py-10 border-y border-border-default/60 my-8">
      <ul
        role="list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:divide-x divide-border-subtle/50 dark:divide-zinc-800/80 gap-6 sm:gap-y-8 md:gap-0 list-none p-0 m-0"
      >
        {stats.map((s, idx) => (
          <li
            key={s.label}
            className={`flex flex-col ${
              idx === 0
                ? "md:pr-6"
                : idx === stats.length - 1
                ? "md:pl-6"
                : "md:px-6"
            }`}
          >
            <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2">
              <span className="sr-only">{s.accessibleLabel}</span>
              <CountUp
                isCounting={isInView}
                end={s.end}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                formatThousands={s.formatThousands}
                duration={2}
                aria-hidden="true"
              />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-text-brand uppercase tracking-wider mb-1.5">
              {s.label}
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              {s.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeResultsStrip;
