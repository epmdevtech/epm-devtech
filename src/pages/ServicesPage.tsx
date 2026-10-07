import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "@/components/layout/PageHero";
import ServicesHeroVisual from "@/components/layout/hero-visuals/ServicesHeroVisual";
import Services from "@/components/sections/Services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE_CONFIG } from "@/config/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = SITE_CONFIG.url;

export const ServicesPage = () => {
  const navigate = useNavigate();
  const guaranteesRef = useScrollReveal<HTMLDivElement>({
    selector: ":scope > div",
    stagger: 0.1,
    y: 24,
    duration: 0.65,
  });
  return (
    <>
      <Helmet>
        <title>Serviços de Desenvolvimento de Software | EPM DevTech</title>
        <meta
          name="description"
          content="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
        />
        <link rel="canonical" href={`${BASE_URL}/services`} />
        <meta
          property="og:title"
          content="Serviços de Desenvolvimento de Software | EPM DevTech"
        />
        <meta
          property="og:description"
          content="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
        />
        <meta property="og:url" content={`${BASE_URL}/services`} />
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
        {/* Page Hero Split 60/40 com Artefato Visual Técnico (Tom: Anchor) */}
        <PageHero
          eyebrow="SERVIÇOS"
          title="Soluções de software sob medida para destravar sua empresa"
          description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais."
          primaryCta={
            <div className="flex items-center w-full sm:w-auto">
              <MagneticButton
                to="/contact"
                variant="chamfer"
                size="lg"
                onClick={() => navigate("/contact")}
                aria-label="VAMOS CONVERSAR"
                className="w-full max-w-xs sm:w-auto font-semibold px-8 py-3.5 rounded-md min-h-[44px]"
              >
                VAMOS CONVERSAR
              </MagneticButton>
            </div>
          }
          visual={<ServicesHeroVisual />}
        />

        {/* Catálogo completo de serviços em Z-Pattern (Tom: Base) */}
        <div>
          <Services hideHeader />
        </div>

        {/* Faixa de Garantias de Engenharia (Tom: Alt) */}
        <SectionWrapper tone="alt">
          <div className="max-w-5xl mx-auto">
            <div ref={guaranteesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
