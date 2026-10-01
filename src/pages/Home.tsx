import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Cpu, Database, RefreshCw, ShieldCheck, Clock, Layers } from "lucide-react";
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

        {/* ─── Hub Bloco 1: Serviços (Resumo + Link) ─── */}
        <section id="servicos" className="py-16 sm:py-20 border-b border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>O QUE DESENVOLVEMOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Soluções sob medida para operações que exigem estabilidade
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Desenvolvemos aplicações corporativas, barramentos de integração e modernizações com foco na resolução de problemas reais de negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="p-6 rounded-xl border border-border/60 bg-card/60 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">
                    Sistemas e portais
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aplicações web corporativas e portais de alta disponibilidade com foco em fluxo operacional e responsividade.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">
                    APIs e back-end
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Arquiteturas em nuvem para processamento de alto volume, concorrência e regras de negócio críticas.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">
                    Integrações de dados
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comunicação orientada a eventos e sincronização confiável entre ERPs, CRMs e plataformas externas.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border/60 bg-card/60 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">
                    Modernização de legados
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Transição incremental de bases antigas para tecnologias atuais sem paradas na operação diária.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
              >
                <span>Conhecer todos os serviços e detalhes técnicos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Hub Bloco 2: Como Trabalhamos (Metodologia) ─── */}
        <section id="como-trabalhamos" className="py-16 sm:py-20 border-b border-border/40 scroll-mt-24">
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                  <BrandChipIcon size={15} className="shrink-0" />
                  <span>PROCESSO E PREVISIBILIDADE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                  Engenharia previsível do primeiro contato à sustentação
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  Antes de escrever código, alinhamos escopo e critérios de aceite. Você acompanha entregas incrementais com canal direto com quem constrói o sistema.
                </p>
                <div className="mt-6">
                  <Link
                    to="/como-trabalhamos"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
                  >
                    <span>Ver as 4 etapas da nossa metodologia</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                  <div className="font-mono text-xs text-primary font-semibold mb-1">01 · ENTENDIMENTO</div>
                  <div className="font-semibold text-foreground text-sm mb-1">Diagnóstico técnico</div>
                  <p className="text-xs text-muted-foreground">Mapeamento de viabilidade e arquitetura no contato inicial.</p>
                </div>
                <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                  <div className="font-mono text-xs text-primary font-semibold mb-1">02 · DEFINIÇÃO</div>
                  <div className="font-semibold text-foreground text-sm mb-1">Especificação e escopo</div>
                  <p className="text-xs text-muted-foreground">Critérios claros de aceite e planejamento de entregas.</p>
                </div>
                <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                  <div className="font-mono text-xs text-primary font-semibold mb-1">03 · DESENVOLVIMENTO</div>
                  <div className="font-semibold text-foreground text-sm mb-1">Ciclos incrementais</div>
                  <p className="text-xs text-muted-foreground">Código testado e validação contínua em ambiente de homologação.</p>
                </div>
                <div className="p-5 rounded-xl border border-border/60 bg-card/40">
                  <div className="font-mono text-xs text-primary font-semibold mb-1">04 · EVOLUÇÃO</div>
                  <div className="font-semibold text-foreground text-sm mb-1">Sustentação contínua</div>
                  <p className="text-xs text-muted-foreground">Monitoramento de integridade e capacidade contínua de evolução.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Hub Bloco 3: Experiência e Escala ─── */}
        <section id="autoridade" className="py-16 sm:py-20 border-b border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>EXPERIÊNCIA PRÁTICA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Resultados comprovados em ambientes com alta exigência de estabilidade
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                Nossa atuação técnica apoia operações de missão crítica em indústria, varejo, educação e energia.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">99,9%</div>
                <div className="text-xs font-medium text-foreground">Disponibilidade contínua</div>
                <p className="text-xs text-muted-foreground mt-1">Sistemas desenhados para tolerância a falhas.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">2.500+</div>
                <div className="text-xs font-medium text-foreground">Requisições por segundo</div>
                <p className="text-xs text-muted-foreground mt-1">Back-ends escaláveis sem gargalos de concorrência.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">+448</div>
                <div className="text-xs font-medium text-foreground">Instituições e escolas</div>
                <p className="text-xs text-muted-foreground mt-1">Operações simultâneas em escala nacional.</p>
              </div>

              <div className="p-5 rounded-xl border border-border/60 bg-card/60">
                <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono mb-1">Zero</div>
                <div className="text-xs font-medium text-foreground">Perda de dados</div>
                <p className="text-xs text-muted-foreground mt-1">Transações distribuídas e conformidade operacional.</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              * Resultados de projetos da liderança técnica da EPM DevTech em outras empresas.
            </p>

            <div>
              <Link
                to="/experiencia"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
              >
                <span>Ver setores atendidos e projetos em detalhes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Hub Bloco 4: Engenharia e Pilares ─── */}
        <section id="diferenciais" className="py-16 sm:py-20 border-b border-border/40 scroll-mt-24">
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <div className="p-6 rounded-xl border border-border/60 bg-card/40">
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

              <div className="p-6 rounded-xl border border-border/60 bg-card/40">
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

              <div className="p-6 rounded-xl border border-border/60 bg-card/40">
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

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/engenharia"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
              >
                <span>Conhecer nossos pilares e mapa interativo de tecnologias</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Hub Bloco 5: Sobre Institucional ─── */}
        <section id="sobre" className="py-16 sm:py-20 border-b border-border/40 bg-zinc-50/30 dark:bg-zinc-950/20 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400 select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>SOBRE A EPM DEVTECH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
                Software house brasileira com atendimento remoto e liderança técnica dedicada
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Com sede em Toledo (PR) e atendimento a empresas em todo o Brasil, a EPM DevTech combina rigor de engenharia de software com atenção às necessidades operacionais de cada cliente. A condução dos projetos é liderada diretamente por seu fundador e liderança técnica, com mais de 9 anos de experiência em sistemas críticos.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <Link
                  to="/sobre"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
                >
                  <span>Conhecer a empresa, valores e dados cadastrais</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Hub Bloco 6: Fechamento Comercial (CTA Principal) ─── */}
        <section id="contato" className="py-16 sm:py-24 bg-card/40 scroll-mt-24">
          <div className="container px-6 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Vamos entender o cenário da sua empresa?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Compartilhe seu desafio operacional ou nova demanda. Respondemos em até 24 horas úteis com uma avaliação técnica preliminar e opções de abordagem.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-sm font-medium tracking-wide shadow-sm"
              >
                <Link to="/contato">Falar sobre meu projeto</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-h-[44px] px-6 text-sm font-medium border-border/80 hover:bg-accent"
              >
                <Link to="/duvidas-frequentes">Ver dúvidas frequentes</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
