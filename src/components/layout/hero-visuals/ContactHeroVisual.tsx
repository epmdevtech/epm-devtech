import React from "react";

/**
 * ContactHeroVisual
 * ─────────────────
 * Artefato visual técnico autoral para o Hero de Contato (/contact).
 * Representa um canal de comunicação direto ponto-a-ponto (P2P Handshake)
 * conectando decisores e líderes de produto diretamente aos engenheiros da EPM DevTech,
 * com sinal de sincronismo SVG osciloscópio e garantia de zero intermediários comerciais.
 */
export const ContactHeroVisual: React.FC = () => {
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
          <span className="text-zinc-200 font-semibold tracking-wider">DIRECT // P2P HANDSHAKE</span>
        </div>
        <span className="text-[10px] text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          ZERO INTERMEDIÁRIOS
        </span>
      </div>

      {/* Centro: Diagrama de Conexão P2P com Nó Cliente e Nó EPM */}
      <div className="relative flex-1 my-3 flex flex-col justify-center">
        {/* Nós P2P Conectados */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/70 font-mono">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-[10px] text-zinc-400">SEU PROJETO</span>
            </div>
            <span className="text-sm font-bold text-zinc-100 block">
              Decisor / Produto
            </span>
            <span className="text-[9.5px] text-zinc-400 block mt-0.5">
              Demanda &amp; Escopo
            </span>
          </div>

          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/70 font-mono">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-zinc-400">EPM DEVTECH</span>
            </div>
            <span className="text-sm font-bold text-zinc-100 block">
              Engenharia Sênior
            </span>
            <span className="text-[9.5px] text-zinc-400 block mt-0.5">
              Arquitetura Direta
            </span>
          </div>
        </div>

        {/* Trilha de Sinal de Conexão com Osciloscópio SVG */}
        <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-1 font-mono text-[9.5px] text-zinc-400">
            <span>CANAL DIRETO CRIPTOGRAFADO</span>
            <span className="text-emerald-400 font-bold">ESTABLISHED</span>
          </div>

          <svg viewBox="0 0 300 36" className="w-full h-9" fill="none">
            <defs>
              <linearGradient id="contactSignalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
            {/* Linha de sinal P2P */}
            <path
              d="M 10 18 L 80 18 L 100 6 L 120 30 L 140 10 L 160 26 L 180 18 L 290 18"
              stroke="url(#contactSignalGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pontos de ancoragem */}
            <circle cx="10" cy="18" r="3.5" fill="#06B6D4" />
            <circle cx="290" cy="18" r="3.5" fill="#2DD4BF" />
          </svg>
        </div>
      </div>

      {/* Rodapé do Artefato HUD */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          DIAGNÓSTICO TÉCNICO CONSULTIVO
        </span>
        <span className="text-zinc-400">SEM VENDEDORES</span>
      </div>
    </div>
  );
};

export default ContactHeroVisual;
