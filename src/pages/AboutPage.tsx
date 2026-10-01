import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Building, Globe, CheckCircle2, ShieldCheck, Layers, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre a EPM DevTech | Software House em Toledo, PR</title>
        <meta
          name="description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <link rel="canonical" href={`${BASE_URL}/sobre`} />
        <meta
          property="og:title"
          content="Sobre a EPM DevTech | Software House em Toledo, PR"
        />
        <meta
          property="og:description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <meta property="og:url" content={`${BASE_URL}/sobre`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sobre a EPM DevTech | Software House em Toledo, PR"
        />
        <meta
          name="twitter:description"
          content="Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header */}
        <PageHeader
          eyebrow="INSTITUCIONAL"
          title="Sobre a EPM DevTech"
          description="Engenharia de software com foco em eficiência, estabilidade e evolução sustentável para operações corporativas."
        />

        {/* Bloco Institucional Principal */}
        <section className="pb-16 sm:pb-24">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Coluna 1: Missão e Posicionamento (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-4">
                  Engenharia de software com visão de negócio
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 font-normal">
                  A EPM DevTech é uma software house dedicada a desenvolver e modernizar sistemas sob medida para empresas que buscam eficiência operacional, estabilidade e capacidade de evolução.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-normal mb-6">
                  Fundada e conduzida tecnicamente por Elessandro Prestes Macedo, que reúne mais de 9 anos de experiência prática em arquitetura de software e sistemas corporativos, a empresa atua com foco em escopo bem definido, comunicação transparente e entregas previsíveis a cada ciclo.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-normal">
                  Nosso modelo de trabalho prioriza código sustentável e arquitetura desacoplada, garantindo que as soluções entregues continuem fáceis de manter e preparadas para novas demandas.
                </p>

                {/* Destaque Estático de Experiência */}
                <div className="mt-8 pt-8 border-t border-border/50 max-w-xs">
                  <div className="text-3xl sm:text-4xl font-bold text-primary font-mono leading-none mb-2">
                    +9
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    anos de experiência técnica da liderança
                  </div>
                </div>
              </div>

              {/* Coluna 2: Dados Operacionais e Institucionais (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl border border-border/60 bg-card/60 flex flex-col gap-6">
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase font-mono tracking-wider mb-4">
                    Como atuamos
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground block">Atendimento 100% remoto</span>
                        Atendemos clientes e parceiros em todo o território nacional com comunicação constante.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground block">Sem intermediários comerciais</span>
                        Contato direto com quem planeja a arquitetura e escreve o código do seu sistema.
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground block">Sede da empresa</span>
                        {SITE_CONFIG.company.location}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-foreground block">Dados cadastrais</span>
                        CNPJ: {SITE_CONFIG.company.cnpj} · EPM DevTech
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] text-xs font-medium">
                    <Link to="/contato">Falar sobre meu projeto</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares de Atuação e Engenharia (Movidos da Home conforme SPEC-062) */}
        <section className="py-16 sm:py-20 border-t border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20">
          <div className="container px-6 max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>PILARES DE ATUAÇÃO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Princípios que orientam cada linha de código e entrega
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/60 bg-card/60">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-primary mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Comunicação transparente
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sem intermediários comerciais: contato direto com a liderança técnica, visibilidade clara de cronograma e validações contínuas.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-primary mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Engenharia que facilita evoluir
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Código limpo, arquitetura desacoplada e testes automatizados para que novos recursos sejam adicionados sem quebrar o que já funciona.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-primary mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Foco no problema do negócio
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tecnologia selecionada em função do desafio e não por modismo, priorizando segurança, manutenibilidade e custo de operação.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
