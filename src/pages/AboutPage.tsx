import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Globe,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import SectionWrapper from "@/components/ui/SectionWrapper";
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
      "Início da atuação em engenharia de software profunda, com foco em fundamentos sólidos, modelagem relacional, arquitetura de sistemas corporativos e código sustentável.",
  },
  {
    id: "m2",
    year: "2019",
    tag: "// OPERAÇÕES CRÍTICAS",
    title: "Projetos de Grande Escala",
    description:
      "Participação em sistemas de alta complexidade e missão crítica em setores regulados (energia, indústria pesada e regulação pública), operando sob requisitos estritos de estabilidade.",
  },
  {
    id: "m3",
    year: "2023",
    tag: "// CONSOLIDAÇÃO & ESCALA",
    title: "Consolidação da Software House",
    description:
      "Consolidação da EPM DevTech com foco em desenvolvimento de APIs de alto volume, microsserviços distribuídos e modernização de legados corporativos para empresas em expansão.",
  },
  {
    id: "m4",
    year: "Hoje",
    tag: "// ENGENHARIA SOB MEDIDA",
    title: "Atendimento Direto & Impacto Real",
    description:
      "Operação madura e consultiva: atendimento direto com a liderança técnica, sem intermediários comerciais, com garantia de escopo bem definido e foco em resolver gargalos reais.",
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
      "Não vendemos complexidade desnecessária nem criamos abstrações prematuras. Cada linha de código, biblioteca ou padrão arquitetural existe para resolver um gargalo real da operação com custo de manutenção previsível e retorno concreto.",
  },
  {
    code: "PRINCIPIO_02",
    title: "Transparência Técnica",
    description:
      "Comunicação direta entre quem decide e quem executa. Você fala diretamente com a liderança de engenharia, reduzindo ruídos e alinhando expectativas de forma realista, sem camadas comerciais que distorcem prazos ou viabilidade técnica.",
  },
  {
    code: "PRINCIPIO_03",
    title: "Código Sustentável",
    description:
      "Arquitetura desacoplada, testes automatizados e tipagem estrita de ponta a ponta. Entregamos softwares limpos e documentados que facilitam manutenções futuras, permitindo que a sua própria equipe ou novos desenvolvedores continuem evoluindo o sistema com segurança.",
  },
  {
    code: "PRINCIPIO_04",
    title: "Compromisso com a Operação",
    description:
      "Sistemas corporativos exigem estabilidade contínua. Desenhamos arquiteturas com tolerância a falhas, esteiras de qualidade automatizadas e homologação rigorosa para garantir que a sua empresa opere com previsibilidade e alta disponibilidade.",
  },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sobre a EPM DevTech | Engenharia de Software Corporativa</title>
        <meta
          name="description"
          content="Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional."
        />
        <link rel="canonical" href={`${BASE_URL}/sobre`} />
        <meta
          property="og:title"
          content="Sobre a EPM DevTech | Engenharia de Software Corporativa"
        />
        <meta
          property="og:description"
          content="Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional."
        />
        <meta property="og:url" content={`${BASE_URL}/sobre`} />
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
        {/* Dobra Inicial Unificada: Executive Briefing Hero (Tom: Anchor) */}
        <header
          data-tone="anchor"
          className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-20 bg-surface-anchor text-foreground transition-colors duration-200 border-b border-border-default/60"
        >
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Coluna 1: Posicionamento & Proposta de Valor (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                <div
                  data-testid="page-eyebrow"
                  className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-text-brand select-none mb-3 sm:mb-4"
                >
                  <BrandChipIcon size={15} className="shrink-0" />
                  <span>[ QUEM SOMOS // POSICIONAMENTO ]</span>
                </div>

                <h1
                  id="page-title"
                  tabIndex={-1}
                  className="font-bold tracking-tight text-primary text-3xl sm:text-4xl md:text-5xl leading-[1.15] [text-wrap:balance] outline-none focus:outline-none mb-5 sm:mb-6"
                >
                  Engenharia de software sob medida com{" "}
                  <span className="text-text-brand">visão real de negócio</span>
                </h1>

                <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal [text-wrap:balance]">
                  A EPM DevTech projeta, constrói e moderniza aplicações corporativas críticas. Desenvolvemos ecossistemas sob medida para operações que exigem estabilidade contínua, integrações sem perda de dados e comunicação técnica direta, sem camadas comerciais intermediárias.
                </p>
              </div>

              {/* Coluna 2: Quadro Executivo "Compromissos de Parceria" (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border border-border-default/80 dark:border-zinc-800/80 bg-surface/90 dark:bg-zinc-950/70 shadow-xl dark:shadow-2xl backdrop-blur-md flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-default/60 dark:border-zinc-800/60">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                    Como atuamos com a sua equipe
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-brand/10 text-text-brand border border-brand/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    Parceria Direta
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-secondary">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-surface-base border border-border-default/60 dark:border-zinc-800/80 shrink-0 mt-0.5">
                      <Globe className="w-4 h-4 text-text-brand" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary block text-sm mb-0.5">
                        Atendimento 100% Remoto & Nacional
                      </span>
                      <p className="text-xs text-secondary leading-relaxed font-normal">
                        Conexão ágil com empresas de qualquer região do país através de cerimônias e alinhamentos contínuos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-surface-base border border-border-default/60 dark:border-zinc-800/80 shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-text-brand" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary block text-sm mb-0.5">
                        Contato Direto com a Liderança Técnica
                      </span>
                      <p className="text-xs text-secondary leading-relaxed font-normal">
                        Você fala diretamente com quem planeja a arquitetura e implementa o código do seu projeto.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-surface-base border border-border-default/60 dark:border-zinc-800/80 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-text-brand" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary block text-sm mb-0.5">
                        Propriedade Total do Código & Entregas Incrementais
                      </span>
                      <p className="text-xs text-secondary leading-relaxed font-normal">
                        Repositórios, documentação e infraestrutura pertencem 100% à sua empresa, com validações frequentes em homologação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Seção 2: Nossa Jornada (Tom: Base) */}
        <SectionWrapper id="jornada" tone="base" containerClassName="max-w-6xl mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // EVOLUÇÃO & TRAJETÓRIA
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary [text-wrap:balance]">
                Nossa jornada técnica
              </h2>
              <p className="text-sm sm:text-base text-secondary mt-2 leading-relaxed">
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
        <SectionWrapper id="principios" tone="alt" containerClassName="max-w-6xl mx-auto">
          {/* Cabeçalho da Seção */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
              // DIRETRIZES & COMPROMISSO
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary [text-wrap:balance]">
              Missão e princípios de engenharia
            </h2>
            <p className="text-sm sm:text-base text-secondary mt-2 leading-relaxed">
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
