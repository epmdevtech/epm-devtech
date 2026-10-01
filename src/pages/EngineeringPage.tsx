import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import Differentials from "@/components/sections/Differentials";
import Technologies from "@/components/sections/Technologies";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const EngineeringPage = () => {
  return (
    <>
      <Helmet>
        <title>Engenharia e Tecnologias | EPM DevTech</title>
        <meta
          name="description"
          content="Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança."
        />
        <link rel="canonical" href={`${BASE_URL}/engenharia`} />
        <meta property="og:title" content="Engenharia e Tecnologias | EPM DevTech" />
        <meta
          property="og:description"
          content="Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança."
        />
        <meta property="og:url" content={`${BASE_URL}/engenharia`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Engenharia e Tecnologias | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header */}
        <PageHeader
          eyebrow="ENGENHARIA DE SOFTWARE"
          title="Engenharia pensada para evoluir"
          description="Pilares de arquitetura sólida, decisões pragmáticas e práticas modernas de engenharia para que o seu software cresça com segurança e longevidade."
        />

        {/* Pilares e Chips de Práticas */}
        <div className="pb-12">
          <Differentials hideHeader />
        </div>

        {/* Tecnologias que usamos (Constelação Interativa) */}
        <section id="tecnologias" className="scroll-mt-24 border-t border-border/40">
          <Technologies />
        </section>

        {/* Chamada Final para Ação */}
        <section className="py-16 sm:py-24 border-t border-border-subtle bg-surface/30">
          <div className="container px-6 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Precisa de engenharia sólida no seu produto ou sistema interno?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Analisamos sua arquitetura atual ou desenhamos a stack ideal para o seu próximo desafio.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-sm font-medium"
              >
                <Link to="/contato">Falar sobre meu projeto</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EngineeringPage;
