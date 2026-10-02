import { FC } from "react";

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    value: "99,9%",
    label: "Alta disponibilidade",
    description: "Sistemas tolerantes a falhas em produção.",
  },
  {
    value: "2.500+",
    label: "Requisições por segundo",
    description: "Back-ends sem gargalos de concorrência.",
  },
  {
    value: "+448",
    label: "Instituições e escolas",
    description: "Operações simultâneas em escala nacional.",
  },
  {
    value: "Zero",
    label: "Perda de dados",
    description: "Transações e conformidade operacional.",
  },
];

/**
 * HomeResultsStrip
 * ────────────────
 * Faixa de métricas (Stat Strip) tipográfica de alto impacto.
 * Substitui os cards fechados por um layout editorial contínuo,
 * delimitado por bordas horizontais discretas e divisores verticais sutis no desktop,
 * com ênfase na tipografia monospace em grande escala e conformidade WCAG AAA/AA.
 */
export const HomeResultsStrip: FC = () => {
  return (
    <div className="py-8 sm:py-10 border-y border-border-default/60 my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-border-subtle/50 gap-6 md:gap-0">
        {stats.map((s, idx) => (
          <div
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
              {s.value}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-text-brand uppercase tracking-wider mb-1.5">
              {s.label}
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeResultsStrip;
