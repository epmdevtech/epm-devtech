import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Authority from "@/components/sections/Authority";
import { Button } from "@/components/ui/button";
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
      "Eliminação de falhas operacionais e perda de rastreabilidade entre chão de fábrica e gestão corporativa em linhas de produção contínua.",
    stackSolutions:
      "ERP Integrations · Telemetria em tempo real · Conexão de CLPs e Sensores · Message Broker",
    Icon: IconSectorIndustry,
  },
  {
    num: "02",
    title: "Varejo",
    specialtyBadge: "ALTA CONCORRÊNCIA",
    description:
      "Prevenção de indisponibilidade e perda de conversão em picos massivos de tráfego, garantindo resiliência de checkout e consistência de estoque.",
    stackSolutions:
      "APIs de Alto Throughput · Checkout Resiliente · Sincronização de Inventário · Caching Distribuído",
    Icon: IconSectorRetail,
  },
  {
    num: "03",
    title: "Educação",
    specialtyBadge: "ESCALA NACIONAL",
    description:
      "Modernização incremental de plataformas legadas para suportar períodos críticos de editais, inscrições massivas e automação de fluxos de prestação de contas.",
    stackSolutions:
      "Arquitetura Multi-Tenant · Decomposição de Monólitos · Alta Disponibilidade · Processamento em Lote",
    Icon: IconSectorEducation,
  },
  {
    num: "04",
    title: "Energia",
    specialtyBadge: "DADOS REGULATÓRIOS",
    description:
      "Monitoramento operacional em tempo real de infraestruturas críticas com integridade e rastreabilidade rigorosa de dados exigidos por órgãos reguladores.",
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
        {/* Page Header */}
        <PageHeader
          eyebrow="EXPERIÊNCIA E ESCALA"
          title="Experiência em projetos reais"
          description="Métricas consolidadas de confiabilidade, atuação em verticais críticas e histórico técnico em ambientes de alta complexidade regulatória e de concorrência."
        />

        {/* Bloco 1: Indicadores e Métricas de Escala (Contadores com CountUp Preservados) */}
        <section id="resultados" className="scroll-mt-24">
          <Authority />
        </section>

        {/* Bloco 2: Contextos de Negócio e Verticais (Engineering Matrix 2x2) */}
        <section id="contextos" className="py-16 sm:py-24 border-t border-border-default/60 scroll-mt-24">
          <div className="container px-6 max-w-6xl mx-auto">
            <div className="max-w-3xl mb-12">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // MATRIZ DE VERTICAIS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary [text-wrap:balance]">
                Contextos de negócio e verticais de atuação
              </h2>
              <p className="text-sm sm:text-base text-secondary mt-2">
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
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
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
                    <p className="text-sm sm:text-base text-secondary leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Capacidades Técnicas Inline */}
                  <div className="pt-4 border-t border-border-default/50 text-xs font-mono text-secondary leading-relaxed">
                    <span className="text-primary font-semibold mr-1.5">Stack & Soluções:</span>
                    <span>{item.stackSolutions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bloco 3: Organizações e Projetos de Atuação (Enterprise Ledger) */}
        <section id="organizacoes" className="py-16 sm:py-24 border-t border-border-default/60 scroll-mt-24 bg-surface/20">
          <div className="container px-6 max-w-6xl mx-auto">
            <div className="max-w-4xl mb-10">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // HISTÓRICO CORPORATIVO
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary [text-wrap:balance]">
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
            <div className="divide-y divide-border-default/80 border-y border-border-default/80 mb-16">
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

            {/* Chamada Final para Contato */}
            <div className="text-center pt-8 border-t border-border-default/60">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mb-3">
                Sua empresa tem uma demanda de alta complexidade?
              </h3>
              <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
                Conversamos diretamente sobre requisitos de arquitetura, estabilidade e capacidade de evolução.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/contato" className="inline-flex items-center gap-2">
                  <span>Falar sobre meu projeto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ExperiencePage;
