import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  MapPin,
  Building,
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/button";
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
        <title>Sobre a EPM DevTech | Software House em Toledo, PR</title>
        <meta
          name="description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <link rel="canonical" href={`${BASE_URL}/sobre`} />
        <meta
          property="og:title"
          content="Sobre a EPM DevTech | Software House em Toledo, PR"
        />
        <meta
          property="og:description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <meta property="og:url" content={`${BASE_URL}/sobre`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sobre a EPM DevTech | Software House em Toledo, PR"
        />
        <meta
          name="twitter:description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header Padronizado */}
        <PageHeader
          eyebrow="SOBRE NÓS"
          title="Engenharia de software com foco em longevidade e impacto real"
          description="Fundada e conduzida pela liderança técnica de Elessandro Prestes Macedo (+9 anos de experiência), a EPM DevTech desenvolve e moderniza sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de evolução a longo prazo sem intermediários comerciais."
        />

        {/* Bloco Institucional & Fundador (Tom: Base) */}
        <SectionWrapper tone="base" containerClassName="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Coluna 1: Posicionamento Editorial (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // VISÃO & POSICIONAMENTO
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4 [text-wrap:balance]">
                Engenharia de software com visão de negócio
              </h2>
              <p className="text-base sm:text-lg text-secondary leading-relaxed mb-6 font-normal">
                A EPM DevTech é uma software house dedicada a desenvolver e modernizar sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de evolução.
              </p>
              <p className="text-sm sm:text-base text-secondary/90 leading-relaxed font-normal mb-6">
                Fundada e conduzida tecnicamente por Elessandro Prestes Macedo, que reúne mais de 9 anos de experiência prática em arquitetura de software e sistemas corporativos, a empresa atua com foco em escopo bem definido, comunicação transparente e entregas previsíveis a cada ciclo.
              </p>
              <p className="text-sm sm:text-base text-secondary/90 leading-relaxed font-normal">
                Nosso modelo de trabalho prioriza código sustentável e arquitetura desacoplada, garantindo que as soluções entregues continuem fáceis de manter e preparadas para novas demandas de escala.
              </p>

              {/* Destaque Estático de Experiência */}
              <div className="mt-8 pt-8 border-t border-border-default/60 max-w-xs">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono leading-none mb-2">
                  +9
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted">
                  anos de experiência técnica da liderança
                </div>
              </div>
            </div>

            {/* Coluna 2: Dados Operacionais e Institucionais (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl border border-zinc-800/80 bg-zinc-950/60 shadow-xl flex flex-col gap-6">
              <div>
                <h3 className="font-mono font-semibold text-primary text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Transparência Operacional
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-secondary">
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-text-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary block">Atendimento 100% remoto</span>
                      Atendemos clientes e parceiros em todo o Brasil com canais diretos e alinhamento contínuo.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-text-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary block">Sem intermediários comerciais</span>
                      Contato direto com quem planeja a arquitetura e escreve o código do seu sistema.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-text-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary block">Sede da empresa</span>
                      {SITE_CONFIG.company.location}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-text-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary block">Dados cadastrais</span>
                      CNPJ: {SITE_CONFIG.company.cnpj} · EPM DevTech
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/60">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] text-xs font-medium">
                  <Link to="/contato">Falar sobre meu projeto</Link>
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Seção 2: Nossa Jornada (Tom: Alt) */}
        <SectionWrapper id="jornada" tone="alt" containerClassName="max-w-6xl mx-auto">
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

        {/* Seção 3: Missão e Princípios de Engenharia (Tom: Base) */}
        <SectionWrapper id="principios" tone="base" containerClassName="max-w-6xl mx-auto">
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
