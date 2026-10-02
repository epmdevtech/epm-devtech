import React from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ArchitecturalBlueprint from "@/components/sections/ArchitecturalBlueprint";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

interface PrincipleItem {
  num: string;
  tag: string;
  title: string;
  description: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    num: "01",
    tag: "ALINHAMENTO & PREVISIBILIDADE",
    title: "Comunicação técnica direta",
    description:
      "Você conversa com quem projeta e implementa o código. Sem camadas comerciais distorcendo prazos ou viabilidade técnica.",
  },
  {
    num: "02",
    tag: "ARQUITETURA & MANUTENÇÃO",
    title: "Arquitetura fácil de manter",
    description:
      "Construímos código modular e bem testado para que sua empresa possa evoluir o sistema no futuro sem medo de quebrar o que já funciona.",
  },
  {
    num: "03",
    tag: "PRAGMATISMO & RESULTADO",
    title: "Pragmatismo voltado ao negócio",
    description:
      "Não inventamos complexidade desnecessária. Cada tecnologia e padrão escolhido serve para resolver um problema real com custo previsível.",
  },
];

interface QualityGateCheck {
  title: string;
  metric: string;
  detail: string;
}

const QUALITY_GATES: QualityGateCheck[] = [
  {
    title: "Unit & Integration Tests",
    metric: "PASS (100% coverage)",
    detail: "Vitest / Testing Library · 30 suites · 189 tests OK",
  },
  {
    title: "Strict Static Analysis",
    metric: "ESLint & TypeScript Clean",
    detail: "0 erros · 0 warnings · Tipagem estrita ponta a ponta",
  },
  {
    title: "Automated Deploy Pipeline",
    metric: "Homologation Ready",
    detail: "CI/CD GitHub Actions · Pre-render SSR · Zero-downtime",
  },
  {
    title: "Human Code Review",
    metric: "Validação Arquitetural Obrigatória",
    detail: "Revisão técnica de arquitetura · OWASP Top 10 · Protocolo SDD",
  },
];

export const EngineeringPage = () => {
  return (
    <>
      <Helmet>
        <title>Engenharia e Tecnologias | EPM DevTech</title>
        <meta
          name="description"
          content="Decisões pragmáticas de arquitetura, stack em camadas e esteira de qualidade contínua com homologação automatizada."
        />
        <link rel="canonical" href={`${BASE_URL}/engenharia`} />
        <meta property="og:title" content="Engenharia e Tecnologias | EPM DevTech" />
        <meta
          property="og:description"
          content="Decisões pragmáticas de arquitetura, stack em camadas e esteira de qualidade contínua com homologação automatizada."
        />
        <meta property="og:url" content={`${BASE_URL}/engenharia`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Engenharia e Tecnologias | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Decisões pragmáticas de arquitetura, stack em camadas e esteira de qualidade contínua com homologação automatizada."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header Padronizado */}
        <PageHeader
          eyebrow="ENGENHARIA DE SOFTWARE"
          title="Engenharia pensada para evoluir"
          description="Decisões pragmáticas de arquitetura, código sustentável e rotinas de qualidade automatizadas para garantir que seu software continue rápido e seguro por muitos anos."
        />

        {/* Bloco 1: Filosofia de Execução vs. Painel de Qualidade Contínua (Tom: Base) */}
        <SectionWrapper id="filosofia-qualidade" tone="base">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Coluna da Esquerda (6 cols): Filosofia de Execução */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
                // FILOSOFIA DE EXECUÇÃO
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
                Princípios que orientam nossas decisões técnicas
              </h2>
              <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary mt-2 mb-8 leading-[1.6] max-w-[65ch]">
                A tecnologia é desenhada para resolver o problema do negócio com previsibilidade, sem criar passivo ou complexidade desnecessária.
              </p>

              {/* Lista Editorial de Princípios com Borda Lateral */}
              <div className="space-y-7">
                {PRINCIPLES.map((item) => (
                  <div key={item.num} className="group">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-semibold text-text-brand">
                        {item.num} //
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary border-l-2 border-brand/60 pl-3.5 mb-2 group-hover:border-brand transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed pl-3.5">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna da Direita (6 cols): Painel de Qualidade Contínua (CI/CD Quality Gate) */}
            <div className="lg:col-span-6 flex flex-col justify-start w-full">
              <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
                // PIPELINE DE QUALIDADE
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
                Garantia automatizada e validação contínua
              </h2>
              <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary mt-2 mb-8 leading-[1.6] max-w-[65ch]">
                Cada entrega incremental é submetida a portais rigorosos de qualidade antes de ser promovida para homologação e produção.
              </p>

              {/* Janela de Terminal CI/CD */}
              <div className="w-full rounded-2xl border border-border-default/80 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs">
                {/* Barra de Topo do Terminal */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono tracking-wide truncate max-w-[200px] sm:max-w-none">
                    quality-gate.yml -- EPM DevTech Engine
                  </span>
                  <span className="text-[10px] text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded uppercase font-semibold hidden sm:inline-block">
                    AUTOMATED GATE
                  </span>
                </div>

                {/* Conteúdo do Terminal / Checks de Qualidade */}
                <div className="p-5 sm:p-6 space-y-4 text-zinc-300">
                  {QUALITY_GATES.map((gate, index) => (
                    <div
                      key={gate.title}
                      className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2 text-zinc-100 font-semibold text-xs sm:text-[13px]">
                          <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                          <span>{gate.title}</span>
                        </div>
                        <span className="text-[11px] text-emerald-400 font-bold shrink-0">
                          {gate.metric}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 pl-6 leading-relaxed">
                        {gate.detail}
                      </div>
                    </div>
                  ))}

                  {/* Banner Final de Status do Quality Gate */}
                  <div className="pt-2">
                    <div className="p-3.5 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-text-brand text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-brand animate-pulse shrink-0" />
                        <span>ALL QUALITY GATES PASSED</span>
                      </div>
                      <span className="text-[11px] text-text-brand font-mono uppercase tracking-wider font-semibold">
                        0 ERRORS · 0 WARNINGS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Bloco 2: Matriz de Camadas de Software (Tom: Alt) */}
        <SectionWrapper id="tecnologias" tone="alt" className="scroll-mt-24" containerClassName="max-w-6xl mx-auto">
          <ArchitecturalBlueprint />
        </SectionWrapper>
      </div>
    </>
  );
};

export default EngineeringPage;
