import React from "react";

/**
 * EngineeringHeroVisual
 * ──────────────────────
 * Artefato visual para o Hero de Engenharia (/engineering).
 * Blueprint Arquitetural Isométrico em Linha Fina (Technical Wireframe Projection — SPEC-113):
 * Elimina containers escuros e terminais fechados, projetando um diagrama CAD isométrico aberto
 * em linhas finíssimas que revela as camadas de software corporativo: Gateway → Services → Event Stream → Persistent Data.
 */
export const EngineeringHeroVisual: React.FC = () => {
  const TIERS = [
    {
      step: "01",
      layer: "API GATEWAY",
      detail: "Edge Ingress · Rate Limit · Auth WAF",
      color: "#38BDF8",
    },
    {
      step: "02",
      layer: "CORE SERVICES",
      detail: "Distributed Domain Logic · Modular APIs",
      color: "#06B6D4",
    },
    {
      step: "03",
      layer: "EVENT STREAM",
      detail: "PubSub · Event Broker · Zero Pacote Perdido",
      color: "#2DD4BF",
    },
    {
      step: "04",
      layer: "PERSISTENT DATA",
      detail: "High-Availability DB · Sharding & Replicas",
      color: "#10B981",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full flex flex-col justify-between select-none py-2"
    >
      {/* Luz focal difusa ao fundo */}
      <div className="pointer-events-none absolute -right-8 -top-8 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Régua Técnica Superior CAD */}
      <div className="border-b border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pb-3 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold tracking-wider">
            + [ARCH_BLUEPRINT // 4_TIER_CAD]
          </span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">PLANTA BAIXA DE ENGENHARIA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">CÓDIGO BLINDADO</span>
        </div>
      </div>

      {/* Blueprint Vetorial Isométrico em Linha Fina SVG */}
      <div className="my-3 relative flex items-center justify-center">
        {/* Wireframe Isométrico CAD em SVG */}
        <svg
          viewBox="0 0 400 240"
          className="w-full h-auto max-h-[220px] overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="blueprintLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Eixo de barramento vertical tracejado CAD conectando todas as camadas */}
          <line
            x1="200"
            y1="25"
            x2="200"
            y2="215"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Camada 1: API Gateway (Isométrico Superior) */}
          <g className="transition-all duration-300">
            <polygon
              points="200,20 310,48 200,76 90,48"
              stroke="#38BDF8"
              strokeWidth="1.2"
              fill="#38BDF8"
              fillOpacity="0.04"
            />
            <circle cx="200" cy="48" r="3" fill="#38BDF8" />
            <text x="325" y="52" fill="#38BDF8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              01 // GATEWAY
            </text>
          </g>

          {/* Camada 2: Core Services */}
          <g className="transition-all duration-300">
            <polygon
              points="200,70 310,98 200,126 90,98"
              stroke="#06B6D4"
              strokeWidth="1.2"
              fill="#06B6D4"
              fillOpacity="0.04"
            />
            <circle cx="200" cy="98" r="3" fill="#06B6D4" />
            <text x="50" y="102" fill="#06B6D4" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              02 // SERVICES
            </text>
          </g>

          {/* Camada 3: Event Stream */}
          <g className="transition-all duration-300">
            <polygon
              points="200,120 310,148 200,176 90,148"
              stroke="#2DD4BF"
              strokeWidth="1.2"
              fill="#2DD4BF"
              fillOpacity="0.04"
            />
            <circle cx="200" cy="148" r="3" fill="#2DD4BF" />
            <text x="325" y="152" fill="#2DD4BF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              03 // EVENT STREAM
            </text>
          </g>

          {/* Camada 4: Persistent Data (Base Isométrica) */}
          <g className="transition-all duration-300">
            <polygon
              points="200,170 310,198 200,226 90,198"
              stroke="#10B981"
              strokeWidth="1.5"
              fill="#10B981"
              fillOpacity="0.06"
            />
            <circle cx="200" cy="198" r="3.5" fill="#10B981" />
            <text x="50" y="202" fill="#10B981" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              04 // DATA
            </text>
          </g>

          {/* Linhas de Cota Técnica Isométrica Laterais */}
          <line x1="85" y1="48" x2="85" y2="198" stroke="#52525B" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="80" y1="48" x2="90" y2="48" stroke="#52525B" strokeWidth="0.8" />
          <line x1="80" y1="198" x2="90" y2="198" stroke="#52525B" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Lista Técnica de Camadas com Hairlines Abertas */}
      <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono border-t border-zinc-800/60 dark:border-zinc-800/60 border-zinc-200/80 pt-2.5">
        {TIERS.map((tier) => (
          <div key={tier.step} className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tier.color }} />
              <span className="font-bold text-zinc-200 dark:text-zinc-200 text-zinc-800">
                {tier.layer}
              </span>
            </div>
            <span className="text-[9.5px] text-zinc-400 truncate pl-3">
              {tier.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Régua Técnica Inferior */}
      <div className="border-t border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pt-3 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Código Sustentável e Modular</span>
        </div>
        <span className="text-zinc-500 tracking-widest hidden sm:inline">
          PROPRIEDADE_DO_CLIENTE
        </span>
      </div>
    </div>
  );
};

export default EngineeringHeroVisual;
