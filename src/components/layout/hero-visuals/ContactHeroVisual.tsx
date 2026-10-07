import React from "react";
import { ShieldCheck, UserCheck, Clock } from "lucide-react";

/**
 * ContactHeroVisual
 * ─────────────────
 * Artefato visual para o Hero de Contato (/contact).
 * Painel Tipográfico Integrado de Canal Ponto-a-Ponto (Direct Line Terminal — SPEC-113):
 * Elimina containers de card fechados, conectando a liderança da empresa à liderança técnica
 * da EPM DevTech através de um canal aberto direto, sem intermediários.
 */
export const ContactHeroVisual: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full flex flex-col justify-between select-none py-2"
    >
      {/* Luz focal difusa ao fundo */}
      <div className="pointer-events-none absolute -right-8 -top-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Régua Técnica Superior CAD */}
      <div className="border-b border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pb-3 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold tracking-wider">
            + [DIRECT_LINE // P2P_TERMINAL]
          </span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">CANAL EXECUTIVO DIRETO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">SEM INTERMEDIÁRIOS</span>
        </div>
      </div>

      {/* Diagrama Ponto-a-Ponto Aberto: Decisor <-> Liderança Técnica */}
      <div className="my-4 space-y-4">
        {/* Conexão Horizontal com Linha Condutora */}
        <div className="grid grid-cols-2 gap-4 relative">
          {/* Linha Condutora SVG entre os dois polos */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 px-8">
            <svg className="w-full h-2" fill="none">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#2DD4BF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Polo 1: Empresa / Decisor */}
          <div className="relative z-10 border-l-2 border-cyan-400 pl-3">
            <span className="text-[10px] font-mono text-cyan-400 block tracking-wider">
              SUA EMPRESA
            </span>
            <span className="text-sm font-bold text-zinc-100 dark:text-zinc-100 text-zinc-900 block mt-0.5">
              Decisor / Gestor
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Metas e gargalos operacionais
            </span>
          </div>

          {/* Polo 2: EPM DevTech / Liderança Técnica */}
          <div className="relative z-10 border-l-2 border-emerald-400 pl-3">
            <span className="text-[10px] font-mono text-emerald-400 block tracking-wider">
              EPM DEVTECH
            </span>
            <span className="text-sm font-bold text-zinc-100 dark:text-zinc-100 text-zinc-900 block mt-0.5">
              Liderança Técnica
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5">
              Diagnóstico e viabilidade real
            </span>
          </div>
        </div>

        {/* Hairline Divisória */}
        <div className="border-t border-zinc-800/60 dark:border-zinc-800/60 border-zinc-200/80" />

        {/* Três Diretrizes do Atendimento Consultivo */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 text-zinc-700">
            <UserCheck size={15} className="text-emerald-400 shrink-0" />
            <span>Conversa direta com quem projeta e implementa o código.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 text-zinc-700">
            <Clock size={15} className="text-cyan-400 shrink-0" />
            <span>Entendimento rápido do cenário técnico e orçamento transparente.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 text-zinc-700">
            <ShieldCheck size={15} className="text-teal-400 shrink-0" />
            <span>Sigilo e confidencialidade estrita para as informações do seu negócio.</span>
          </div>
        </div>
      </div>

      {/* Régua Técnica Inferior */}
      <div className="border-t border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pt-3 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Diagnóstico Focado em Resultado</span>
        </div>
        <span className="text-zinc-500 tracking-widest hidden sm:inline">
          RESPOSTA_CONSULTIVA // DIRETA
        </span>
      </div>
    </div>
  );
};

export default ContactHeroVisual;
