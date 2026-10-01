import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Cpu, Database, RefreshCw, Clock } from "lucide-react";
import Hero from "@/components/sections/Hero";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";

const BASE_URL = SITE_CONFIG.url;

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>EPM DevTech | Software House e Desenvolvimento de Software Sob Medida</title>
        <meta
          name="description"
          content="Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto."
        />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta
          property="og:title"
          content="EPM DevTech | Software House e Desenvolvimento de Software Sob Medida"
        />
        <meta
          property="og:description"
          content="Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto."
        />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EPM DevTech | Software House e Desenvolvimento de Software Sob Medida"
        />
        <meta
          name="twitter:description"
          content="Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Hero Section */}
        <Hero />

        {/* ─── Bloco 1: Serviços (Cards Clicáveis com Foco no Problema de Negócio) ─── */}
        <section id="servicos" className="py-14 sm:py-18 border-b border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>O QUE DESENVOLVEMOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Engenharia sob medida para os gargalos da sua operação
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Aplicações web, APIs robustas e integrações desenvolvidas para resolver desafios reais de negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {/* Card 1 */}
              <Link
                to="/servicos"
                className="group p-6 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Sistemas e portais: Elimine gargalos operacionais e erros manuais com plataformas web sob medida para sua equipe."
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-200">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    Sistemas e portais
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Elimine gargalos operacionais e erros manuais com plataformas web sob medida para sua equipe.
                  </p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link
                to="/servicos"
                className="group p-6 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="APIs e back-end: Processe regras complexas e alto volume com segurança, sem lentidão ou quedas inesperadas."
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-200">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    APIs e back-end
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Processe regras complexas e alto volume com segurança, sem lentidão ou quedas inesperadas.
                  </p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                to="/servicos"
                className="group p-6 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Integrações de dados: Conecte seus sistemas e automatize fluxos manuais com comunicação confiável e sem perdas."
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-200">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    Integrações de dados
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Conecte seus sistemas e automatize fluxos manuais com comunicação confiável e sem perdas.
                  </p>
                </div>
              </Link>

              {/* Card 4 */}
              <Link
                to="/servicos"
                className="group p-6 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Modernização de legados: Atualize sistemas antigos que travam o crescimento do negócio sem interromper a operação diária."
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform duration-200">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    Modernização de legados
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Atualize sistemas antigos que travam o crescimento do negócio sem interromper a operação diária.
                  </p>
                </div>
              </Link>
            </div>

            <div className="flex items-center">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group"
              >
                <span>Ver todos os serviços →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bloco 2: Processo (Stepper Horizontal Enxuto) ─── */}
        <section id="como-trabalhamos" className="py-14 sm:py-18 border-b border-border/40 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>PROCESSO E PREVISIBILIDADE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Engenharia previsível com contato direto com quem constrói
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Do diagnóstico inicial à sustentação contínua, sem intermediários comerciais.
              </p>
            </div>

            {/* Stepper horizontal de 4 etapas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                <div className="font-mono text-xs text-primary font-semibold mb-1">01 · ENTENDIMENTO</div>
                <div className="font-semibold text-foreground text-sm mb-1.5">Diagnóstico técnico</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Alinhamento direto de objetivos, arquitetura e viabilidade do projeto.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                <div className="font-mono text-xs text-primary font-semibold mb-1">02 · DEFINIÇÃO</div>
                <div className="font-semibold text-foreground text-sm mb-1.5">Escopo e arquitetura</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Especificação detalhada, critérios de aceite e cronograma de entregas.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                <div className="font-mono text-xs text-primary font-semibold mb-1">03 · DESENVOLVIMENTO</div>
                <div className="font-semibold text-foreground text-sm mb-1.5">Ciclos incrementais</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Código testado com validações contínuas em ambiente de homologação.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                <div className="font-mono text-xs text-primary font-semibold mb-1">04 · EVOLUÇÃO</div>
                <div className="font-semibold text-foreground text-sm mb-1.5">Sustentação e escala</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Monitoramento contínuo e suporte direto para novas demandas operacionais.
                </p>
              </div>
            </div>

            <div>
              <Link
                to="/como-trabalhamos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group"
              >
                <span>Ver metodologia →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bloco 3: Resultados (Único Lugar com Métricas na Home) ─── */}
        <section id="autoridade" className="py-14 sm:py-18 border-b border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>EXPERIÊNCIA PRÁTICA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Resultados comprovados em operações de grande escala
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Métricas reais atingidas pela liderança técnica em ambientes de alta concorrência.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">99,9%</div>
                <div className="text-xs font-medium text-foreground">Alta disponibilidade</div>
                <p className="text-xs text-muted-foreground mt-1">Sistemas tolerantes a falhas em produção.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">2.500+</div>
                <div className="text-xs font-medium text-foreground">Requisições por segundo</div>
                <p className="text-xs text-muted-foreground mt-1">Back-ends sem gargalos de concorrência.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">+448</div>
                <div className="text-xs font-medium text-foreground">Instituições e escolas</div>
                <p className="text-xs text-muted-foreground mt-1">Operações simultâneas em escala nacional.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">Zero</div>
                <div className="text-xs font-medium text-foreground">Perda de dados</div>
                <p className="text-xs text-muted-foreground mt-1">Transações e conformidade operacional.</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              * Resultados de projetos da liderança técnica da EPM DevTech em outras empresas.
            </p>

            <div>
              <Link
                to="/experiencia"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group"
              >
                <span>Ver projetos →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bloco 4: Confiança + CTA Final (Unificação Comercial) ─── */}
        <section id="contato" className="py-16 sm:py-20 bg-card/40 scroll-mt-24">
          <div className="container px-6 text-center max-w-2xl mx-auto">
            {/* Linha de Confiança */}
            <div className="inline-flex items-center justify-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 select-none mb-4">
              <span>Toledo (PR) · Atendimento em todo o Brasil · 9+ anos em sistemas críticos</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Vamos entender o cenário da sua empresa?
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Compartilhe seu desafio operacional ou nova demanda técnica.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-sm font-medium tracking-wide shadow-sm"
              >
                <Link to="/contato">Falar sobre meu projeto</Link>
              </Button>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Resposta em até 24h úteis
              </span>
            </div>

            <div className="mt-6">
              <Link
                to="/duvidas-frequentes"
                className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
              >
                Dúvidas frequentes →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
