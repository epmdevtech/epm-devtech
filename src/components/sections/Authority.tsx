import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  {
    value: "99,9%",
    label: "Uptime em ambientes de produção",
  },
  {
    value: "2.500+ RPS",
    label: "Throughput suportado em arquiteturas distribuídas",
  },
  {
    value: "+448 IES e 650 Escolas",
    label: "Impacto em plataformas educacionais e federais",
  },
  {
    value: "Zero Perda",
    label: "Integridade em dados regulatórios e integrações críticas",
  },
];

const organizations = [
  {
    name: "CAPES • MEC",
    detail: null,
  },
  {
    name: "ONS",
    detail: "(Operador Nacional do Sistema Elétrico)",
  },
  {
    name: "Energia Pecém",
    detail: null,
  },
  {
    name: "Governo do MT",
    detail: "(SEDUC)",
  },
  {
    name: "Indústria e Manufatura",
    detail: "(IoT Industrial e ERP)",
  },
];

const Authority = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="autoridade"
      className="py-14 lg:py-16 border-y border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 relative"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Cabeçalho compacto e monocromático */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 mb-3 rounded-full uppercase tracking-wider font-semibold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60">
              Prova Social & Autoridade
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Autoridade técnica e impacto em missão crítica
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Resultados comprovados na linha de frente de grandes instituições e setores estratégicos.
            </p>
          </div>

          {/* Feature 1: Métricas Consolidadas de Missão Crítica */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 dark:divide-zinc-800/80">
            {metrics.map((m, idx) => (
              <div
                key={m.label}
                className={idx === 0 ? "pt-4 sm:pt-0" : "pt-4 sm:pt-0 sm:pl-6"}
              >
                <p className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {m.value}
                </p>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1.5 leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Divisor sutil */}
          <div className="w-full h-px bg-zinc-200/80 dark:bg-zinc-800/80" />

          {/* Feature 2: Faixa de Clientes, Órgãos e Setores */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-zinc-500 dark:text-zinc-400 text-center lg:text-left max-w-xs">
              Engenharia comprovada em projetos e sistemas para grandes organizações e setores estratégicos:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {organizations.map((org) => (
                <div
                  key={org.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-800/50 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-all duration-200 hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 opacity-80 hover:opacity-100 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                  <span>{org.name}</span>
                  {org.detail && (
                    <span className="text-zinc-500 dark:text-zinc-400 font-normal text-xs">
                      {org.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
