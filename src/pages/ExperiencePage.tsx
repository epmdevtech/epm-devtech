import React from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getApprovedExperiences } from "@/config/experience";
import { SITE_CONFIG } from "@/config/site";
import {
  IconSectorIndustry,
  IconSectorRetail,
  IconSectorEducation,
  IconSectorEnergy,
  type IconProps,
} from "@/components/icons";

const BASE_URL = SITE_CONFIG.url;

interface VerticalItem {
  num: string;
  title: string;
  specialtyBadge: string;
  description: string;
  stackSolutions: string;
  Icon: React.FC<IconProps>;
}

const VERTICALS: VerticalItem[] = [
  {
    num: "01",
    title: "Indústria",
    specialtyBadge: "IoT INDUSTRIAL",
    description:
      "Conexão direta entre o chão de fábrica e a gestão corporativa, garantindo rastreabilidade de máquinas, controle de insumos e fim das anotações em papel.",
    stackSolutions:
      "ERP Integrations · Telemetria em tempo real · Conexão de CLPs e Sensores · Message Broker",
    Icon: IconSectorIndustry,
  },
  {
    num: "02",
    title: "Varejo",
    specialtyBadge: "ALTA CONCORRÊNCIA",
    description:
      "Prevenção de lentidão e perdas de vendas em picos promocionais, mantendo checkouts rápidos e estoque 100% sincronizado.",
    stackSolutions:
      "APIs de Alto Throughput · Checkout Resiliente · Sincronização de Inventário · Caching Distribuído",
    Icon: IconSectorRetail,
  },
  {
    num: "03",
    title: "Educação",
    specialtyBadge: "ESCALA NACIONAL",
    description:
      "Sustentação de portais com picos intensos de inscrições e processamento de dados acadêmicos com segurança e alta disponibilidade.",
    stackSolutions:
      "Arquitetura Multi-Tenant · Decomposição de Monólitos · Alta Disponibilidade · Processamento em Lote",
    Icon: IconSectorEducation,
  },
  {
    num: "04",
    title: "Energia",
    specialtyBadge: "DADOS REGULATÓRIOS",
    description:
      "Monitoramento contínuo de dados operacionais e conformidade com regras estritas do setor elétrico, com tolerância zero para perda de dados.",
    stackSolutions:
      "Consolidação Regulatória · Telemetria Sub-segundo · Logs Imutáveis · Dashboards Operacionais",
    Icon: IconSectorEnergy,
  },
];

export const ExperiencePage = () => {
  const approvedExperiences = getApprovedExperiences();

  return (
    <>
      <Helmet>
        <title>Experiência em Projetos Reais | EPM DevTech</title>
        <meta
          name="description"
          content="Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia."
        />
        <link rel="canonical" href={`${BASE_URL}/experiencia`} />
        <meta property="og:title" content="Experiência em Projetos Reais | EPM DevTech" />
        <meta
          property="og:description"
          content="Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia."
        />
        <meta property="og:url" content={`${BASE_URL}/experiencia`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Experiência em Projetos Reais | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header (Tom: Anchor) */}
        <PageHeader
          eyebrow="EXPERIÊNCIA E ESCALA"
          title="Experiência em projetos reais"
          description="Conhecimento construído em operações reais com requisitos rigorosos de estabilidade, integração e volume de dados."
        />

        {/* Bloco 1: Contextos de Negócio e Verticais (Tom: Base) */}
        <SectionWrapper tone="base" id="contextos" className="scroll-mt-24">
          <div className="max-w-3xl mb-12">
            <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
              // MATRIZ DE VERTICAIS
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
              Contextos de negócio e verticais de atuação
            </h2>
            <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary mt-2 leading-[1.6] max-w-[65ch]">
              Arquiteturas e padrões de engenharia aplicados aos gargalos operacionais específicos de cada segmento.
            </p>
          </div>

          {/* Engineering Matrix: Grid 2x2 com bordas internas limpas */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-border-default/80 rounded-2xl overflow-hidden bg-surface/40 dark:bg-zinc-950/40 divide-y md:divide-y-0 divide-border-default/80 md:[&>*:nth-child(even)]:border-l md:[&>*:nth-child(even)]:border-border-default/80 md:[&>*:nth-child(n+3)]:border-t md:[&>*:nth-child(n+3)]:border-border-default/80">
            {VERTICALS.map((item) => (
              <div
                key={item.num}
                className="p-7 sm:p-9 md:p-10 flex flex-col justify-between group hover:bg-surface-elevated/30 dark:hover:bg-zinc-900/20 transition-colors duration-200"
              >
                <div>
                  {/* Linha de Topo: Número, Título, Badge de Especialidade e Ícone Autoral */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-text-brand">
                        {item.num} //
                      </span>
                      <h3 className="text-[clamp(1.25rem,1.8vw,1.5rem)] font-bold tracking-[-0.025em] leading-[1.2] text-primary">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-brand/10 text-text-brand border border-brand/20 uppercase tracking-wider">
                        {item.specialtyBadge}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-lg border border-border-default/80 bg-surface-elevated flex items-center justify-center text-text-brand shrink-0 shadow-sm">
                      <item.Icon size={20} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Descrição do Problema & Solução */}
                  <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary leading-[1.65] mb-6 max-w-[65ch]">
                    {item.description}
                  </p>
                </div>

                {/* Capacidades Técnicas Inline */}
                <div className="pt-4 border-t border-border-default/50 text-xs font-mono text-secondary leading-relaxed">
                  <span className="text-primary font-semibold mr-1.5">Stack &amp; Soluções:</span>
                  <span>{item.stackSolutions}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Bloco 2: Organizações e Projetos de Atuação (Tom: Alt) */}
        <SectionWrapper tone="alt" id="organizacoes" className="scroll-mt-24">
          <div className="max-w-4xl mb-10">
            <div className="text-[0.8rem] font-semibold text-text-brand uppercase tracking-[0.04em] mb-2 leading-[1.3]">
              // HISTÓRICO CORPORATIVO
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.04em] leading-[1.1] text-primary [text-wrap:balance]">
              Organizações e projetos de atuação
            </h2>

            {/* Nota de Contexto Editorial Discreta */}
            <div className="flex items-start sm:items-center gap-2 mt-3 text-xs font-mono text-muted-foreground uppercase tracking-wider leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
              <span>
                <strong className="text-primary font-medium">Nota de contexto:</strong> Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente, em outras empresas. Não são clientes da EPM DevTech.
              </span>
            </div>
          </div>

          {/* Enterprise Ledger: Tabela / Linhas Horizontais Elegantes */}
          <div className="divide-y divide-border-default/80 border-y border-border-default/80">
            {approvedExperiences.map((exp) => (
              <div
                key={exp.organization}
                className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 sm:gap-4 py-5 sm:py-6 px-4 sm:px-6 hover:bg-surface-elevated/40 dark:hover:bg-zinc-900/30 transition-colors duration-200 group"
              >
                {/* Coluna 1: Nome da Organização */}
                <div className="md:col-span-3">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-primary group-hover:text-text-brand transition-colors">
                    {exp.organization}
                  </span>
                </div>

                {/* Coluna 2: Setor com Badge em Ciano/Esmeralda */}
                <div className="md:col-span-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono bg-brand/10 text-text-brand border border-brand/20">
                    {exp.sector}
                  </span>
                </div>

                {/* Coluna 3: Escopo Técnico Resumido */}
                <div className="md:col-span-4">
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {exp.context}
                  </p>
                </div>

                {/* Coluna 4: Via de Atuação alinhada à direita */}
                <div className="md:col-span-2 text-left md:text-right">
                  {exp.via && (
                    <span className="font-mono text-xs text-muted-foreground">
                      Via <strong className="text-primary font-medium">{exp.via}</strong>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default ExperiencePage;
