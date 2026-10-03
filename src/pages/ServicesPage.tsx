import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Services from "@/components/sections/Services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const ServicesPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Serviços de Desenvolvimento de Software | EPM DevTech</title>
        <meta
          name="description"
          content="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
        />
        <link rel="canonical" href={`${BASE_URL}/servicos`} />
        <meta
          property="og:title"
          content="Serviços de Desenvolvimento de Software | EPM DevTech"
        />
        <meta
          property="og:description"
          content="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
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
          content="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header padronizado com CTA destacado (Tom: Anchor) */}
        <PageHeader
          eyebrow="SERVIÇOS"
          title="Soluções de software sob medida para destravar sua empresa"
          description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
          containerClassName="max-w-4xl mx-auto"
        >
          <div className="mt-8 flex justify-center">
            <MagneticButton
              to="/contato"
              variant="primary"
              onClick={() => navigate("/contato")}
              aria-label="Conversar sobre seu projeto"
              className="w-full max-w-xs sm:w-auto font-semibold px-8 py-3.5 rounded-xl min-h-[44px]"
            >
              <span className="inline-flex items-center">
                <span>Conversar sobre seu projeto</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
              </span>
            </MagneticButton>
          </div>
        </PageHeader>

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
                  Escopo e metas claras
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Critérios objetivos de aceite e validações em cada ciclo, eliminando surpresas contratuais.
                </p>
              </div>

              <div>
                <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                  [ 02 // SUSTENTABILIDADE ]
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  Código fácil de manter
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Arquitetura limpa, testes automatizados e documentação para que seu software evolua com tranquilidade.
                </p>
              </div>

              <div>
                <div className="font-mono text-xs font-semibold text-text-brand tracking-wider mb-2">
                  [ 03 // COMUNICAÇÃO ]
                </div>
                <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                  Contato direto com quem faz
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Você conversa diretamente com os engenheiros responsáveis pelo projeto, sem ruídos de intermediação.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default ServicesPage;
