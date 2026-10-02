import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Hero from "@/components/sections/Hero";
import HomeServicesBento from "@/components/sections/HomeServicesBento";
import HomeProcessPipeline from "@/components/sections/HomeProcessPipeline";
import HomeResultsStrip from "@/components/sections/HomeResultsStrip";
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
        <section id="servicos" className="py-14 sm:py-18 border-b border-border/40 bg-surface/30 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-muted select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>O QUE DESENVOLVEMOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary [text-wrap:balance]">
                Engenharia sob medida para os gargalos da sua operação
              </h2>
              <p className="mt-3 text-base text-secondary leading-relaxed">
                Aplicações web, APIs robustas e integrações desenvolvidas para resolver desafios reais de negócio.
              </p>
            </div>

            {/* Bento Grid Assimétrico de 12 Colunas */}
            <HomeServicesBento />

            <div className="flex items-center">
              <Link
                to="/servicos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline group"
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
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-muted select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>PROCESSO E PREVISIBILIDADE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary [text-wrap:balance]">
                Engenharia previsível com contato direto com quem constrói
              </h2>
              <p className="mt-3 text-base text-secondary leading-relaxed">
                Do diagnóstico inicial à sustentação contínua, sem intermediários comerciais.
              </p>
            </div>

            {/* Pipeline contínuo de 4 etapas */}
            <HomeProcessPipeline />

            <div>
              <Link
                to="/como-trabalhamos"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline group"
              >
                <span>Ver metodologia →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bloco 3: Resultados (Único Lugar com Métricas na Home) ─── */}
        <section id="autoridade" className="py-14 sm:py-18 border-b border-border/40 bg-surface/30 scroll-mt-24">
          <div className="container px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-muted select-none mb-3">
                <BrandChipIcon size={15} className="shrink-0" />
                <span>EXPERIÊNCIA PRÁTICA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary [text-wrap:balance]">
                Resultados comprovados em operações de grande escala
              </h2>
              <p className="mt-3 text-base text-secondary leading-relaxed">
                Métricas reais atingidas pela liderança técnica em ambientes de alta concorrência.
              </p>
            </div>

            {/* Stat Strip tipográfica de resultados */}
            <HomeResultsStrip />

            <p className="text-xs text-muted mb-6">
              * Resultados de projetos da liderança técnica da EPM DevTech em outras empresas.
            </p>

            <div>
              <Link
                to="/experiencia"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline group"
              >
                <span>Ver projetos →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Bloco 4: Confiança + CTA Final (Unificação Comercial) ─── */}
        <section id="contato" className="py-16 sm:py-20 bg-surface/40 scroll-mt-24">
          <div className="container px-6 text-center max-w-2xl mx-auto">
            {/* Linha de Confiança */}
            <div className="inline-flex items-center justify-center gap-2 text-xs font-mono text-muted select-none mb-4">
              <span>Toledo (PR) · Atendimento em todo o Brasil · 9+ anos em sistemas críticos</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary [text-wrap:balance]">
              Vamos entender o cenário da sua empresa?
            </h2>
            <p className="mt-3 text-base text-secondary leading-relaxed">
              Compartilhe seu desafio operacional ou nova demanda técnica.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active min-h-[44px] px-8 text-sm font-semibold tracking-wide shadow-sm"
              >
                <Link to="/contato">Falar sobre meu projeto</Link>
              </Button>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                <Clock className="w-3.5 h-3.5 text-brand" />
                Resposta em até 24h úteis
              </span>
            </div>

            <div className="mt-6">
              <Link
                to="/duvidas-frequentes"
                className="text-xs text-muted hover:text-primary underline transition-colors"
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
