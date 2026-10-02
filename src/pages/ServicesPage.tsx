import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Services from "@/components/sections/Services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Serviços de Desenvolvimento de Software | EPM DevTech</title>
        <meta
          name="description"
          content="Sistemas web, portais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio e código sustentável."
        />
        <link rel="canonical" href={`${BASE_URL}/servicos`} />
        <meta
          property="og:title"
          content="Serviços de Desenvolvimento de Software | EPM DevTech"
        />
        <meta
          property="og:description"
          content="Sistemas web, portais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio e código sustentável."
        />
        <meta property="og:url" content={`${BASE_URL}/servicos`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Serviços de Desenvolvimento de Software | EPM DevTech"
        />
        <meta
          name="twitter:description"
          content="Sistemas web, portais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio e código sustentável."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header padronizado (Tom: Anchor) */}
        <PageHeader
          eyebrow="SERVIÇOS"
          title="Soluções sob medida para cada estágio da sua operação"
          description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver problemas reais de negócio."
        />

        {/* Catálogo completo de serviços em Z-Pattern (Tom: Base) */}
        <div>
          <Services hideHeader />
        </div>

        {/* Faixa de Garantias de Engenharia (Tom: Alt) */}
        <SectionWrapper tone="alt">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                  [ 01 // ESCOPO ]
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  Escopo bem alinhado
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Critérios objetivos de aceite e validações incrementais em cada ciclo de entrega.
                </p>
              </div>

              <div>
                <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                  [ 02 // SUSTENTABILIDADE ]
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  Código sustentável
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Testes automatizados e documentação técnica para facilitar a evolução contínua da sua empresa.
                </p>
              </div>

              <div>
                <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                  [ 03 // COMUNICAÇÃO ]
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  Canal direto com quem faz
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Comunicação constante diretamente com a liderança técnica do projeto, sem ruídos.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Fechamento Comercial & CTA Final (Tom: Base) */}
        <SectionWrapper tone="base">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-3">
              Quer avaliar qual solução se encaixa no seu momento?
            </h3>
            <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Agende uma conversa técnica sem compromisso para analisarmos os requisitos e a arquitetura recomendada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active min-h-[44px] px-8 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link to="/contato">Iniciar diagnóstico do projeto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-[44px] px-6 text-sm font-medium border-border-default bg-surface/50 hover:bg-surface-elevated text-secondary hover:text-primary transition-colors duration-200"
              >
                <Link to="/como-trabalhamos" className="inline-flex items-center gap-2">
                  <span>Entenda como trabalhamos</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default ServicesPage;
