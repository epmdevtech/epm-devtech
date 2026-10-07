import React from "react";

/**
 * ServicesHeroVisual
 * ──────────────────
 * Artefato visual técnico autoral para o Hero de Serviços (/services).
 * Representa um barramento de microsserviços e roteador de alta concorrência
 * em placa de circuito impresso (PCB) com trilhas em 45º, nós de barramento e telemetria.
 */
export const ServicesHeroVisual: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full max-w-[420px] max-h-[420px] rounded-2xl border border-zinc-800/80 bg-zinc-950/70 dark:bg-zinc-950/80 backdrop-blur-md p-6 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Top Header do Artefato HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold tracking-wider">SVC-BUS // ROUTER</span>
        </div>
        <span className="text-[10px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          LATENCY &lt; 14ms
        </span>
      </div>

      {/* Centro: SVG do Microcircuito de Barramento */}
      <div className="relative flex-1 my-3 flex items-center justify-center">
        <svg
          viewBox="0 0 320 200"
          className="w-full h-full max-h-[200px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grade de fundo do circuito */}
          <pattern id="svcGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#2DD4BF" fillOpacity="0.15" />
          </pattern>
          <rect width="320" height="200" fill="url(#svcGrid)" />

          {/* Gradientes dos barramentos */}
          <defs>
            <linearGradient id="traceGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#18181B" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>
          </defs>

          {/* Trilhas em 45º / 90º conectando os 4 canais ao núcleo */}
          {/* Top-Left: Web Platforms */}
          <path d="M 40 40 L 100 40 L 130 75" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
          <circle cx="40" cy="40" r="3.5" fill="#10B981" />
          <circle cx="40" cy="40" r="7" stroke="#10B981" strokeOpacity="0.3" />

          {/* Bottom-Left: Legacy Modernization */}
          <path d="M 40 160 L 100 160 L 130 125" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="40" cy="160" r="3.5" fill="#06B6D4" />
          <circle cx="40" cy="160" r="7" stroke="#06B6D4" strokeOpacity="0.3" />

          {/* Top-Right: High-Performance APIs */}
          <path d="M 280 40 L 220 40 L 190 75" stroke="#06B6D4" strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="280" cy="40" r="3.5" fill="#06B6D4" />
          <circle cx="280" cy="40" r="7" stroke="#06B6D4" strokeOpacity="0.3" />

          {/* Bottom-Right: Data Integrations */}
          <path d="M 280 160 L 220 160 L 190 125" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="3 3" />
          <circle cx="280" cy="160" r="3.5" fill="#10B981" />
          <circle cx="280" cy="160" r="7" stroke="#10B981" strokeOpacity="0.3" />

          {/* Chip Central Chanfrado (IC Microcontroller) */}
          <rect
            x="120"
            y="65"
            width="80"
            height="70"
            rx="6"
            fill="url(#chipGrad)"
            stroke="#2DD4BF"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />

          {/* Pinos do Chip Central */}
          <line x1="120" y1="80" x2="114" y2="80" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="120" y1="95" x2="114" y2="95" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="120" y1="110" x2="114" y2="110" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="120" y1="120" x2="114" y2="120" stroke="#2DD4BF" strokeWidth="1.5" />

          <line x1="200" y1="80" x2="206" y2="80" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="200" y1="95" x2="206" y2="95" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="200" y1="110" x2="206" y2="110" stroke="#2DD4BF" strokeWidth="1.5" />
          <line x1="200" y1="120" x2="206" y2="120" stroke="#2DD4BF" strokeWidth="1.5" />

          {/* Inscrição Monospace Central */}
          <text x="160" y="93" fill="#E4E4E7" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            EPM CORE
          </text>
          <text x="160" y="108" fill="#2DD4BF" fontSize="7" fontFamily="monospace" textAnchor="middle">
            GATEWAY 2.5K
          </text>
          <circle cx="160" cy="120" r="2" fill="#10B981" className="animate-ping" />
        </svg>

        {/* Labels flutuantes em volta dos 4 canais */}
        <span className="absolute top-1 left-2 font-mono text-[9.5px] text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-1.5 py-0.5 rounded">
          01 // WEB APPS
        </span>
        <span className="absolute top-1 right-2 font-mono text-[9.5px] text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-1.5 py-0.5 rounded">
          02 // HIGH-TPS API
        </span>
        <span className="absolute bottom-1 left-2 font-mono text-[9.5px] text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-1.5 py-0.5 rounded">
          03 // LEGACY BRIDGE
        </span>
        <span className="absolute bottom-1 right-2 font-mono text-[9.5px] text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-1.5 py-0.5 rounded">
          04 // DATA PIPELINE
        </span>
      </div>

      {/* Footer com Leituras Técnicas */}
      <div className="pt-3 border-t border-zinc-800/60 grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-400">
        <div>
          <span className="text-zinc-400 block text-[9px]">THROUGHPUT</span>
          <span className="text-zinc-200 font-semibold">2.500 req/s</span>
        </div>
        <div>
          <span className="text-zinc-400 block text-[9px]">UPTIME SLA</span>
          <span className="text-emerald-400 font-semibold">99.9%</span>
        </div>
        <div>
          <span className="text-zinc-400 block text-[9px]">ISOLATION</span>
          <span className="text-cyan-400 font-semibold">STRICT</span>
        </div>
      </div>
    </div>
  );
};

export default ServicesHeroVisual;
