import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import HowWeWork from "@/components/sections/HowWeWork";
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
        {/* Page Header */}
        <PageHeader
          eyebrow="METODOLOGIA"
          title="Como trabalhamos"
          description="Etapas estruturadas para transformar desafios de negócio em software confiável, com previsibilidade de entrega e comunicação técnica direta."
        />

        {/* Linha do tempo e 4 passos */}
        <div className="pb-16 sm:pb-20">
          <HowWeWork hideHeader />
        </div>

        {/* Detalhamento complementar e Próximo Passo */}
        <section className="py-16 sm:py-20 border-t border-border-subtle bg-surface/30">
          <div className="container px-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-xl border border-border/60 bg-card/60">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Previsibilidade contratual e técnica
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Definimos os critérios de aceite e a arquitetura antes da escrita do código. Cada entrega incremental passa por validação contínua em ambiente controlado, eliminando surpresas ao final do projeto.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Comunicação direta sem ruídos
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Você conversa diretamente com a liderança técnica responsável pela arquitetura e implementação da sua solução, com alinhamentos periódicos e decisões documentadas.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
                Ficou com alguma dúvida sobre o processo?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
                Consulte as dúvidas mais comuns sobre modelos de trabalho, início de projetos e atendimento remoto.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-sm font-medium"
                >
                  <Link to="/contato">Falar sobre meu projeto</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] px-6 text-sm font-medium border-border/80"
                >
                  <Link to="/duvidas-frequentes" className="inline-flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Ver dúvidas frequentes</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowWeWorkPage;
