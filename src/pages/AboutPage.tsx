import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import EpmConstellation from "@/components/sections/EpmConstellation";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

const BASE_URL = SITE_CONFIG.url;

interface MilestoneItem {
  id: string;
  year: string;
  tag: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "m1",
    year: "2015",
    tag: "// FUNDAMENTOS TÉCNICOS",
    title: "Início da Trajetória & Arquitetura",
    description:
      "Início da atuação em engenharia de sistemas corporativos, com foco em modelagem sólida de dados e arquitetura de código sustentável.",
  },
  {
    id: "m2",
    year: "2019",
    tag: "// OPERAÇÕES CRÍTICAS",
    title: "Projetos de Grande Escala",
    description:
      "Experiência prática em projetos de missão crítica em setores regulados (energia, infraestrutura e educação), com tolerância zero a falhas.",
  },
  {
    id: "m3",
    year: "2023",
    tag: "// CONSOLIDAÇÃO & ESCALA",
    title: "Consolidação da Software House",
    description:
      "Atuação focada no desenvolvimento de APIs de alta performance, microsserviços e modernização de sistemas corporativos essenciais.",
  },
  {
    id: "m4",
    year: "Hoje",
    tag: "// ENGENHARIA SOB MEDIDA",
    title: "Atendimento Direto & Impacto Real",
    description:
      "Modelo de trabalho consultivo e direto: contato com a liderança técnica, escopo transparente e foco na resolução de gargalos reais.",
    highlight: true,
  },
];

interface PrincipleItem {
  code: string;
  title: string;
  description: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    code: "PRINCIPIO_01",
    title: "Excelência Pragmática",
    description:
      "Não vendemos tecnologias da moda nem criamos complexidade desnecessária. Cada componente ou banco de dados existe para resolver uma dor concreta da operação com custo previsível.",
  },
  {
    code: "PRINCIPIO_02",
    title: "Transparência Total",
    description:
      "Conversas diretas entre quem decide e quem implementa. Apresentamos cenários realistas de prazo e viabilidade técnica, sem meias-palavras.",
  },
  {
    code: "PRINCIPIO_03",
    title: "Código que Pertence a Você",
    description:
      "Repositórios, documentação e infraestrutura pertencem integralmente à sua empresa. Escrevemos código limpo e testado para que qualquer bom desenvolvedor consiga dar continuidade.",
  },
  {
    code: "PRINCIPIO_04",
    title: "Estabilidade Operacional",
    description:
      "Seu negócio não pode parar. Planejamos cada entrega com testes automatizados e homologação cuidadosa para garantir alta disponibilidade no dia a dia.",
  },
];

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Sobre a EPM DevTech | Engenharia de Software Corporativa</title>
        <meta
          name="description"
          content="Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional."
        />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <meta
          property="og:title"
          content="Sobre a EPM DevTech | Engenharia de Software Corporativa"
        />
        <meta
          property="og:description"
          content="Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional."
        />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sobre a EPM DevTech | Engenharia de Software Corporativa"
        />
        <meta
          name="twitter:description"
          content="Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Dobra Inicial: Hero Editorial Amplo & Constelação Vetorial de Engenharia (Tom: Anchor) */}
        <header
          data-tone="anchor"
          className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pb-24 bg-surface-anchor text-foreground transition-colors duration-200 overflow-hidden"
        >
          <div className="container editorial-container relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Coluna Esquerda: Narrativa Editorial */}
              <div className="lg:col-span-7 flex flex-col items-start text-left max-w-xl xl:max-w-2xl">
                {/* Eyebrow */}
                <div
                  data-testid="page-eyebrow"
                  className="inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.04em] uppercase text-text-brand select-none mb-3 sm:mb-4"
                >
                  <BrandChipIcon size={14} className="shrink-0" />
                  <span>[ QUEM SOMOS // POSICIONAMENTO ]</span>
                </div>

                {/* H1 Editorial Amplo Monocromático */}
                <h1
                  id="page-title"
                  tabIndex={-1}
                  className="font-bold text-primary text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.05em] [text-wrap:balance] outline-none focus:outline-none mb-6"
                >
                  Transformando desafios em soluções que funcionam
                </h1>

                {/* Subtítulo Institucional */}
                <p className="text-[clamp(1rem,1.15vw,1.125rem)] text-secondary leading-[1.65] tracking-[-0.01em] font-normal [text-wrap:balance] max-w-[65ch] mb-8">
                  Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais.
                </p>

                {/* CTA Institucional Chamfer */}
                <div className="flex items-center">
                  <MagneticButton
                    to="/contact"
                    variant="chamfer"
                    size="md"
                    onClick={() => navigate("/contact")}
                    aria-label="Fale conosco"
                    className="min-h-[44px] font-semibold"
                  >
                    Fale conosco
                  </MagneticButton>
                </div>
              </div>

              {/* Coluna Direita: Constelação Vetorial da EPM DevTech (Totalmente Isolada sem Sobreposição) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0">
                <EpmConstellation className="w-[300px] sm:w-[380px] lg:w-[440px] xl:w-[480px] h-[300px] sm:h-[380px] lg:h-[440px] xl:h-[480px] opacity-75 sm:opacity-85 lg:opacity-100 pointer-events-auto" />
              </div>
            </div>
          </div>
        </header>

        {/* Seção 2: Nossa Jornada (Tom: Base) */}
        <SectionWrapper id="jornada" tone="base">
            {/* Cabeçalho da Seção */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
                // EVOLUÇÃO &amp; TRAJETÓRIA
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
                Nossa jornada técnica
              </h2>
              <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary mt-2 leading-[1.6] max-w-[65ch]">
                Da fundação técnica e arquitetura de sistemas corporativos ao desenvolvimento de soluções críticas sob medida.
              </p>
            </div>

            {/* Layout Desktop: Timeline Alternada Acima/Abaixo com Eixo Central */}
            <div className="hidden md:block relative py-6">
              {/* Eixo Central Horizontal com Acento Esmeralda/Teal */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-zinc-800 via-brand/60 to-zinc-800 z-0"
              />

              <div className="grid grid-cols-4 gap-6 relative z-10">
                {MILESTONES.map((item, idx) => {
                  const isTop = idx % 2 === 0;

                  return (
                    <div
                      key={item.id}
                      data-testid={`milestone-${item.id}`}
                      className="flex flex-col items-center justify-between min-h-[440px]"
                    >
                      {/* Bloco Superior (se isTop: Card; se não: Espaço Vazio de Respiro) */}
                      <div className="w-full flex flex-col justify-end flex-1 pb-4">
                        {isTop && (
                          <div
                            className={cn(
                              "w-full bg-zinc-950/90 border rounded-xl p-5 shadow-xl transition-all duration-200 hover:-translate-y-1",
                              item.highlight
                                ? "border-brand/60 shadow-brand/5"
                                : "border-zinc-800/80 hover:border-brand/40"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs font-bold text-text-brand px-2 py-0.5 rounded bg-brand/10 border border-brand/20">
                                {item.year}
                              </span>
                              {item.highlight && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-text-brand uppercase">
                                  <Sparkles className="w-3 h-3" /> Foco Atual
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-muted tracking-wider uppercase mb-1">
                              {item.tag}
                            </div>
                            <h3 className="text-base font-bold text-primary mb-2">
                              {item.title}
                            </h3>
                            <p className="text-xs text-secondary leading-relaxed font-normal">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Conector Vertical Superior */}
                      {isTop && (
                        <div
                          aria-hidden="true"
                          className="w-[1.5px] h-6 bg-brand/40 shrink-0"
                        />
                      )}

                      {/* Nó Central sobre a Linha Horizontal */}
                      <div className="relative shrink-0 flex items-center justify-center my-1">
                        <div className="w-5 h-5 rounded-full bg-zinc-950 border-2 border-brand flex items-center justify-center shadow-lg shadow-brand/20">
                          <div className="w-2 h-2 rounded-full bg-brand" />
                        </div>
                      </div>

                      {/* Conector Vertical Inferior */}
                      {!isTop && (
                        <div
                          aria-hidden="true"
                          className="w-[1.5px] h-6 bg-brand/40 shrink-0"
                        />
                      )}

                      {/* Bloco Inferior (se !isTop: Card; se não: Espaço Vazio de Respiro) */}
                      <div className="w-full flex flex-col justify-start flex-1 pt-4">
                        {!isTop && (
                          <div
                            className={cn(
                              "w-full bg-zinc-950/90 border rounded-xl p-5 shadow-xl transition-all duration-200 hover:translate-y-1",
                              item.highlight
                                ? "border-brand/60 shadow-brand/5"
                                : "border-zinc-800/80 hover:border-brand/40"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-xs font-bold text-text-brand px-2 py-0.5 rounded bg-brand/10 border border-brand/20">
                                {item.year}
                              </span>
                              {item.highlight && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-text-brand uppercase">
                                  <Sparkles className="w-3 h-3" /> Foco Atual
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[10px] text-muted tracking-wider uppercase mb-1">
                              {item.tag}
                            </div>
                            <h3 className="text-base font-bold text-primary mb-2">
                              {item.title}
                            </h3>
                            <p className="text-xs text-secondary leading-relaxed font-normal">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Layout Mobile: Timeline Vertical Contínua à Esquerda */}
            <div className="block md:hidden relative pl-6 space-y-8">
              {/* Linha Vertical Contínua */}
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-zinc-800 via-brand/60 to-zinc-800"
              />

              {MILESTONES.map((item) => (
                <div
                  key={`mob-${item.id}`}
                  data-testid={`mobile-milestone-${item.id}`}
                  className="relative pl-6"
                >
                  {/* Ponto / Nó */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[17px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-brand flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  </div>

                  {/* Card do Marco */}
                  <div
                    className={cn(
                      "bg-zinc-950/90 border rounded-xl p-5 shadow-lg",
                      item.highlight ? "border-brand/60" : "border-zinc-800/80"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-text-brand px-2 py-0.5 rounded bg-brand/10 border border-brand/20">
                        {item.year}
                      </span>
                      {item.highlight && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-text-brand uppercase">
                          <Sparkles className="w-3 h-3" /> Foco Atual
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-muted tracking-wider uppercase mb-1">
                      {item.tag}
                    </div>
                    <h3 className="text-base font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </SectionWrapper>

        {/* Seção 3: Missão e Princípios de Engenharia (Tom: Alt) */}
        <SectionWrapper id="principios" tone="alt">
          {/* Cabeçalho da Seção */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
              // DIRETRIZES &amp; COMPROMISSO
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
              Missão e princípios de engenharia
            </h2>
            <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary mt-2 leading-[1.6] max-w-[65ch]">
              Não vendemos modismos nem complexidade desnecessária. Cada escolha técnica existe para resolver um gargalo real e garantir a longevidade da sua operação.
            </p>
          </div>

          {/* Tabela de Diretrizes em Formato de Manifesto Técnico */}
          <div
            data-testid="principles-manifesto"
            className="border-y border-zinc-800/80 divide-y divide-zinc-800/80"
          >
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.code}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-zinc-950/40 transition-colors px-2 sm:px-4 rounded-lg"
              >
                {/* Coluna 1: Código Monospace (3 cols) */}
                <div className="md:col-span-3 flex items-center md:items-start gap-2">
                  <span className="font-mono text-xs font-bold text-text-brand tracking-wider">
                    {principle.code}
                  </span>
                </div>

                {/* Coluna 2: Título do Valor (3 cols) */}
                <div className="md:col-span-3">
                  <h3 className="text-base sm:text-lg font-bold text-primary tracking-tight">
                    {principle.title}
                  </h3>
                </div>

                {/* Coluna 3: Explicação Técnica (6 cols) */}
                <div className="md:col-span-6">
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed font-normal">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default AboutPage;
