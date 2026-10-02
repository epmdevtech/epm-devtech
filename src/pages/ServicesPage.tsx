import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Services from "@/components/sections/Services";
import SectionWrapper from "@/components/ui/SectionWrapper";
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
        {/* Page Header padronizado com CTA destacado (Tom: Anchor) */}
        <PageHeader
          eyebrow="SERVIÇOS"
          title="Soluções sob medida para cada estágio da sua operação"
          description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver problemas reais de negócio."
          containerClassName="max-w-4xl mx-auto"
        >
          <div className="mt-8 flex justify-center">
            <Link
              to="/contato"
              className="group inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(52,211,153,0.25)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:transition-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[44px]"
            >
              <span>Solicite uma conversa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 motion-reduce:transform-none transition-transform" />
            </Link>
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
      </div>
    </>
  );
};

export default ServicesPage;
