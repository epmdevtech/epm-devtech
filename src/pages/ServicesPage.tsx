import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Services from "@/components/sections/Services";
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
        {/* Page Header padronizado */}
        <PageHeader
          eyebrow="SERVIÇOS"
          title="Soluções sob medida para cada estágio da sua operação"
          description="Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver problemas reais de negócio."
        />

        {/* Catálogo completo de serviços */}
        <div className="pb-16 sm:pb-20">
          <Services hideHeader />
        </div>

        {/* Bloco de Garantias e Próximos Passos */}
        <section className="py-16 sm:py-20 border-t border-border/40 bg-zinc-50/40 dark:bg-zinc-950/30">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <div className="font-semibold text-foreground text-sm mb-1">
                    Escopo bem alinhado
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Critérios objetivos de aceite e validações incrementais em cada ciclo de entrega.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <div className="font-semibold text-foreground text-sm mb-1">
                    Código sustentável
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Testes automatizados e documentação técnica para facilitar a evolução contínua da sua empresa.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-3" />
                  <div className="font-semibold text-foreground text-sm mb-1">
                    Canal direto com quem faz
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Comunicação constante diretamente com a liderança técnica do projeto, sem ruídos.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
                  Quer avaliar qual solução se encaixa no seu momento?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
                  Agende uma conversa técnica sem compromisso para analisarmos os requisitos e a arquitetura recomendada.
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
                    <Link to="/como-trabalhamos" className="inline-flex items-center gap-2">
                      <span>Entenda como trabalhamos</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
