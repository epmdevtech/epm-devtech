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
    label: "Disponibilidade contínua",
    description: "Sistemas operando sem paradas não planejadas em setores críticos de energia e educação.",
    accessibleLabel: "99,9% de disponibilidade contínua",
  },
  {
    end: 2500,
    decimals: 0,
    suffix: " RPS",
    formatThousands: true,
    label: "Capacidade de carga",
    description: "Arquiteturas dimensionadas para milhares de acessos simultâneos sem gargalos de banco de dados.",
    accessibleLabel: "2.500 requisições por segundo",
  },
  {
    end: 100,
    decimals: 0,
    suffix: "%",
    label: "Consistência de dados",
    description: "Processamento regulatório sem perda ou duplicidade de registros em operações sensíveis.",
    accessibleLabel: "100% de consistência de dados",
  },
  {
    end: 35,
    decimals: 0,
    prefix: "\u2212",
    suffix: "%",
    label: "Tempo operacional poupado",
    description: "Eliminação de tarefas manuais e digitações repetitivas através de automações inteligentes.",
    accessibleLabel: "redução de 35% de tempo operacional em tarefas manuais",
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
            <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-1.5 leading-[1.3]">
              {s.label}
            </div>
            <p className="text-[clamp(0.875rem,0.95vw,0.95rem)] text-secondary leading-[1.6] max-w-[58ch]">
              {s.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeResultsStrip;
