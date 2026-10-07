import React from "react";

/**
 * ServicesHeroVisual
 * ──────────────────
 * Artefato visual para o Hero de Serviços (/services).
 * Grid Tipográfico Técnico Aberto (Architectural Spec Grid — SPEC-113):
 * Elimina containers e cards fechados, respirando diretamente no fundo da página
 * através de hairlines de 1px, marcações milimétricas e 3 faixas de especificação técnica.
 */
export const ServicesHeroVisual: React.FC = () => {
  const SPECS = [
    {
      code: "01 // PLATAFORMAS & SISTEMAS WEB",
      category: "APLICAÇÕES CORPORATIVAS",
      title: "Plataformas Web & Portais Internos",
      desc: "Sistemas modulares com alta velocidade de resposta, interfaces focadas na produtividade operacional e suporte a grande volume de acessos simultâneos.",
      tags: ["Alta Adoção", "Zero Fricção", "Escala Horizontal"],
      accent: "#2DD4BF",
    },
    {
      code: "02 // INTEGRAÇÕES CRÍTICAS & APIs",
      category: "CONECTIVIDADE EMPRESARIAL",
      title: "Integrações de Dados & Conectores",
      desc: "Conexão robusta entre ERPs, sistemas legados, APIs financeiras e nuvem, eliminando redundância manual com garantia estrita de entrega.",
      tags: ["Zero Perda de Dados", "Event Stream", "Sincronizado"],
      accent: "#06B6D4",
    },
    {
      code: "03 // MODERNIZAÇÃO DE SISTEMAS LEGADOS",
      category: "EVOLUÇÃO CONTÍNUA",
      title: "Modernização & Refatoração Segura",
      desc: "Substituição e desacoplamento gradual de softwares legados através do padrão Stranguler Fig, mantendo o faturamento ativo a cada dia.",
      tags: ["Sem Paradas", "Redução de Passivo", "Arquitetura Limpa"],
      accent: "#10B981",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full flex flex-col justify-between select-none py-2"
    >
      {/* Luz focal difusa ao fundo */}
      <div className="pointer-events-none absolute -right-8 -top-8 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 -bottom-8 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Régua Técnica Superior com Marcadores Milimétricos */}
      <div className="border-b border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pb-3 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold tracking-wider">+ [SPEC_GRID // 01-03]</span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-zinc-400 hidden sm:inline">ESPECIFICAÇÕES ARQUITETURAIS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300 font-medium">PRONTO PARA ESCALA</span>
        </div>
      </div>

      {/* Grid Aberto em 3 Faixas de Especificação Técnica com Hairlines */}
      <div className="my-4 divide-y divide-zinc-800/60 dark:divide-zinc-800/60 divide-zinc-200/80">
        {SPECS.map((spec) => (
          <div
            key={spec.code}
            className="py-3.5 group transition-colors duration-200 first:pt-1 last:pb-1"
          >
            {/* Linha do Código Técnico e Categoria */}
            <div className="flex items-center justify-between text-[10.5px] font-mono mb-1.5">
              <span
                className="font-bold tracking-wider"
                style={{ color: spec.accent }}
              >
                {spec.code}
              </span>
              <span className="text-zinc-500 tracking-wider text-[9.5px]">
                {spec.category}
              </span>
            </div>

            {/* Título da Especificação */}
            <h3 className="text-sm sm:text-[15px] font-bold text-zinc-100 dark:text-zinc-100 text-zinc-900 tracking-tight leading-snug">
              {spec.title}
            </h3>

            {/* Descrição Técnica Aberta */}
            <p className="text-[11.5px] text-zinc-400 dark:text-zinc-400 text-zinc-600 mt-1 leading-relaxed">
              {spec.desc}
            </p>

            {/* Micro Badges Técnicos Abertos */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {spec.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9.5px] text-zinc-400 dark:text-zinc-400 text-zinc-500 bg-zinc-800/40 dark:bg-zinc-800/50 border border-zinc-700/50 dark:border-zinc-800 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Régua Técnica Inferior com Coordenadas e Conclusão Operacional */}
      <div className="border-t border-zinc-800/80 dark:border-zinc-800/80 border-zinc-300 pt-3 flex items-center justify-between font-mono text-[10.5px] text-zinc-400">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Retorno Operacional Mensurável</span>
        </div>
        <span className="text-zinc-500 tracking-widest hidden sm:inline">
          ESTRUTURA ABERTA // CAD_V3
        </span>
      </div>
    </div>
  );
};

export default ServicesHeroVisual;
