import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Authority from "@/components/sections/Authority";
import Sectors from "@/components/sections/Sectors";
import { Button } from "@/components/ui/button";
import { getApprovedExperiences } from "@/config/experience";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

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

        {/* Bloco 1: Indicadores e Métricas de Escala */}
        <section id="resultados" className="scroll-mt-24">
          <Authority />
        </section>

        {/* Bloco 2: Contextos de Negócio e Setores */}
        <section id="contextos" className="scroll-mt-24">
          <Sectors />
        </section>

        {/* Bloco 3: Projetos e Organizações de Atuação */}
        <section id="organizacoes" className="py-16 sm:py-24 border-t border-border/40 scroll-mt-24">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="max-w-3xl mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Organizações e projetos de atuação
              </h2>
              {/* Rótulo Fixo Obrigatório */}
              <div className="mt-4 p-4 rounded-lg border border-border/70 bg-zinc-100/70 dark:bg-zinc-900/60 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Nota de contexto: </span>
                Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente, em outras empresas. Não são clientes da EPM DevTech.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {approvedExperiences.map((exp) => (
                <div
                  key={exp.organization}
                  className="p-6 rounded-xl border border-border/60 bg-card/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base tracking-tight">
                          {exp.organization}
                        </div>
                        <div className="text-[11px] font-mono text-primary uppercase tracking-wider">
                          {exp.sector}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-3">
                      {exp.context}
                    </p>
                  </div>

                  {exp.via && (
                    <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-zinc-500 dark:text-zinc-400">
                      Via <span className="font-medium text-foreground">{exp.via}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chamada Final para Contato */}
            <div className="text-center pt-8 border-t border-border/40">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
                Sua empresa tem uma demanda de alta complexidade?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8">
                Conversamos diretamente sobre requisitos de arquitetura, estabilidade e capacidade de evolução.
              </p>
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

export default ExperiencePage;
