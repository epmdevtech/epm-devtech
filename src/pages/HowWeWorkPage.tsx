import { Helmet } from "react-helmet-async";
import PageHeader from "@/components/ui/PageHeader";
import ProcessExplorer from "@/components/sections/ProcessExplorer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const HowWeWorkPage = () => {
  return (
    <>
      <Helmet>
        <title>Como Trabalhamos | EPM DevTech</title>
        <meta
          name="description"
          content="Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado."
        />
        <link rel="canonical" href={`${BASE_URL}/como-trabalhamos`} />
        <meta property="og:title" content="Como Trabalhamos | EPM DevTech" />
        <meta
          property="og:description"
          content="Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado."
        />
        <meta property="og:url" content={`${BASE_URL}/como-trabalhamos`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Como Trabalhamos | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header (Tom: Anchor) */}
        <PageHeader
          eyebrow="METODOLOGIA"
          title="Como trabalhamos"
          description="Um processo transparente e previsível para transformar problemas operacionais em sistemas confiáveis, com validações frequentes e comunicação direta."
        />

        {/* Process Explorer Interativo (Tom: Base) */}
        <SectionWrapper tone="base" containerClassName="max-w-6xl mx-auto">
          <ProcessExplorer />
        </SectionWrapper>

        {/* Manifesto Técnico de Engenharia (Tom: Alt) */}
        <SectionWrapper tone="alt" containerClassName="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:divide-x md:divide-border-subtle">
            <div className="md:pr-8">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // GARANTIA OPERACIONAL
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                Previsibilidade do início ao fim
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                Alinhamos a arquitetura e os critérios de sucesso antes de escrever a primeira linha de código. Cada funcionalidade é entregue em homologação para que você acompanhe o projeto avançando sem surpresas de prazo ou custo.
              </p>
            </div>

            <div className="md:pl-8">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // GESTÃO DIRETA
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                Sem intermediários, sem ruído
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                Você fala diretamente com a liderança técnica que planeja a arquitetura e implementa o código. Decisões são tomadas de forma ágil e registradas com transparência.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default HowWeWorkPage;
