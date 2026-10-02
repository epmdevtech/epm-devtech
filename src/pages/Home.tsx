import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Hero from "@/components/sections/Hero";
import HomeServicesBento from "@/components/sections/HomeServicesBento";
import HomeProcessPipeline from "@/components/sections/HomeProcessPipeline";
import HomeResultsStrip from "@/components/sections/HomeResultsStrip";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BrandChipIcon from "@/components/ui/BrandChipIcon";
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

      <div>
        {/* Hero Section (Tom: Anchor) */}
        <Hero />

        {/* ─── Bloco 1: O que Desenvolvemos (Tom: Base) ─── */}
        <SectionWrapper id="servicos" tone="base" className="scroll-mt-24">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-[7px] text-[11.5px] font-mono font-medium tracking-[0.1em] uppercase text-muted select-none mb-3">
              <BrandChipIcon size={15} className="shrink-0" />
              <span>O QUE DESENVOLVEMOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary [text-wrap:balance]">
              Engenharia sob medida para os gargalos da sua operação
            </h2>
            <p className="mt-3 text-base text-secondary leading-relaxed">
              Quatro frentes de entrega técnica desenhadas para construir sistemas novos, integrar fluxos existentes ou estabilizar legados.
            </p>
          </div>

          {/* Bento Grid Editorial / Técnico */}
          <HomeServicesBento />

          <div>
            <Link
              to="/servicos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-brand hover:underline group"
            >
              <span>Ver todos os serviços →</span>
            </Link>
          </div>
        </SectionWrapper>

        {/* ─── Bloco 2: Processo (Tom: Alt) ─── */}
        <SectionWrapper id="como-trabalhamos" tone="alt" className="scroll-mt-24">
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
        </SectionWrapper>

        {/* ─── Bloco 3: Resultados (Tom: Base) ─── */}
        <SectionWrapper id="autoridade" tone="base" className="scroll-mt-24">
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
        </SectionWrapper>
      </div>
    </>
  );
};

export default Home;
