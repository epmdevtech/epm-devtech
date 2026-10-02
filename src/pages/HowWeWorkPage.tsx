import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProcessExplorer from "@/components/sections/ProcessExplorer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/button";
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
          description="Etapas estruturadas para transformar desafios de negócio em software confiável, com previsibilidade de entrega e comunicação técnica direta."
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
                Previsibilidade contratual e técnica
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                Definimos os critérios de aceite e a arquitetura antes da escrita do código. Cada entrega incremental passa por validação contínua em ambiente controlado, eliminando surpresas ao final do projeto.
              </p>
            </div>

            <div className="md:pl-8">
              <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                // GESTÃO DIRETA
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                Comunicação direta sem ruídos
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                Você conversa diretamente com a liderança técnica responsável pela arquitetura e implementação da sua solução, com alinhamentos periódicos e decisões documentadas.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Fechamento Compacto & CTA de Contato (Tom: Base) */}
        <SectionWrapper tone="base" containerClassName="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mb-3">
              Ficou com alguma dúvida sobre o processo?
            </h3>
            <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Consulte as dúvidas mais comuns sobre modelos de trabalho, início de projetos e atendimento remoto.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/contato" className="inline-flex items-center gap-2">
                  <span>Fale com um engenheiro</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-[44px] px-6 text-sm font-medium border-border-default bg-surface/50 hover:bg-surface-elevated text-secondary hover:text-primary transition-colors duration-200"
              >
                <Link to="/duvidas-frequentes" className="inline-flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Ver dúvidas frequentes</span>
                </Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default HowWeWorkPage;
