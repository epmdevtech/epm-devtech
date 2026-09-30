import { LazyRender } from "@/components/LazyRender";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

import LazySection from "@/components/LazySection";

const CursorOrb    = lazy(() => import("@/components/CursorOrb"));
const ScrollToTop  = lazy(() => import("@/components/ui/ScrollToTop"));
const Services     = lazy(() => import("@/components/sections/Services"));
const HowWeWork    = lazy(() => import("@/components/sections/HowWeWork"));
const Differentials= lazy(() => import("@/components/sections/Differentials"));
const Technologies = lazy(() => import("@/components/sections/Technologies"));
const Authority    = lazy(() => import("@/components/sections/Authority"));
const Sectors      = lazy(() => import("@/components/sections/Sectors"));
const About        = lazy(() => import("@/components/sections/About"));
const FAQ          = lazy(() => import("@/components/sections/FAQ"));
const Contact      = lazy(() => import("@/components/sections/Contact"));
const Footer       = lazy(() => import("@/components/sections/Footer"));

const BASE_URL = "https://epmdevtech.com.br";

interface SeoMeta {
  title: string;
  description: string;
  ogTitle?: string;
}

const SEO_META: Record<string, SeoMeta> = {
  "": {
    title: "EPM DevTech | Software House e Desenvolvimento de Software Sob Medida",
    description:
      "Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto.",
    ogTitle: "EPM DevTech | Software House",
  },
  servicos: {
    title: "Serviços | EPM DevTech",
    description:
      "Sistemas web, portais, sites institucionais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio.",
  },
  "como-trabalhamos": {
    title: "Como Trabalhamos | EPM DevTech",
    description:
      "Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado.",
  },
  diferenciais: {
    title: "Diferenciais | EPM DevTech",
    description:
      "Comunicação transparente, engenharia que facilita evoluir e foco no problema do negócio. Por que trabalhar com a EPM DevTech.",
  },
  tecnologias: {
    title: "Tecnologias | EPM DevTech",
    description:
      "Tecnologias que usamos para construir soluções: escolhas orientadas por desempenho, segurança, manutenção e capacidade de evolução contínua.",
  },
  setores: {
    title: "Setores de Atuação | EPM DevTech",
    description:
      "Experiência em diferentes contextos de negócio: Indústria, Varejo, Educação e Energia. Soluções para operações com alta exigência de estabilidade.",
  },
  sobre: {
    title: "Sobre | EPM DevTech",
    description:
      "Software house dedicada a engenharia de software sob medida. Conheça nossa proposta, liderança técnica e compromisso com arquitetura sólida.",
  },
  faq: {
    title: "FAQ | EPM DevTech",
    description:
      "Dúvidas frequentes sobre como iniciar um projeto, modelos de trabalho, atendimento remoto e modernização de sistemas com a EPM DevTech.",
  },
  contato: {
    title: "Contato | EPM DevTech",
    description:
      "Fale sobre seu projeto com a EPM DevTech. Retorno em até 24 horas úteis para entender seu cenário e avaliar soluções.",
  },
};

const Index = () => {
  const { pathname } = useLocation();

  // Estado que controla Helmet e URL — atualizado tanto pelo clique no menu
  // (via useEffect abaixo) quanto pelo scroll spy (via IntersectionObserver).
  const [activeSection, setActiveSection] = useState<string>(
    () => pathname.replace(/^\//, "")
  );

  // Flag que bloqueia o scroll spy durante a rolagem programática (clique no menu),
  // evitando que o IntersectionObserver chame replaceState enquanto a página já está rolando.
  const isProgrammaticScrollRef = useRef(false);

  // ─── Efeito 1: Navegação via clique no menu (pathname muda via navigate()) ───
  // Atualiza activeSection e rola até a seção alvo.
  // Não dispara quando apenas o scroll spy chama replaceState (pathname não muda).
  useEffect(() => {
    const section = pathname.replace(/^\//, "");
    setActiveSection(section);

    if (!section) {
      isProgrammaticScrollRef.current = false;
      return;
    }

    isProgrammaticScrollRef.current = true;

    const scrollTimer = setTimeout(() => {
      const elem = document.getElementById(section);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
      // Libera o scroll spy após tempo suficiente para o smooth scroll terminar (~900ms)
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 900);
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [pathname]);

  // ─── Efeito 2: Scroll Spy via IntersectionObserver ───
  // rootMargin "-40% 0px -40% 0px" cria uma zona de detecção no centro da tela (20% do viewport).
  // Isso funciona corretamente para seções tanto curtas quanto altas demais para o viewport,
  // pois dispara quando qualquer pixel da seção cruza a faixa central — sem depender de threshold.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Bloqueia durante rolagem programática para evitar loop
        if (isProgrammaticScrollRef.current) return;

        for (const entry of entries) {
          // Detecta retorno ao Hero: primeira seção saiu da zona de detecção pela parte de baixo,
          // ou seja, o usuário rolou para cima e está de volta à seção inicial (scrollY < 100).
          if (
            !entry.isIntersecting &&
            entry.target.id === "servicos" &&
            entry.boundingClientRect.top > 0 &&
            (typeof window !== "undefined" && window.scrollY < 100)
          ) {
            setActiveSection("");
            window.history.replaceState(null, "", "/");
            break;
          }

          if (!entry.isIntersecting) continue;

          const id = entry.target.id;

          // Seções sem meta SEO (ex: "autoridade") são ignoradas — a URL não muda
          if (!(id in SEO_META)) continue;

          setActiveSection(id);
          // replaceState: atualiza a URL sem empilhar no histórico (botão Voltar preservado)
          window.history.replaceState(null, "", `/${id}`);
          break;
        }
      },
      {
        // threshold: 0 + rootMargin: funciona para seções de qualquer altura
        threshold: 0,
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    const observeAllSections = () => {
      document
        .querySelectorAll("section[id]")
        .forEach((el) => observer.observe(el));
    };

    observeAllSections();

    let mutationObserver: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        observeAllSections();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, []);

  const meta = SEO_META[activeSection] ?? SEO_META[""];
  const canonicalUrl = activeSection ? `${BASE_URL}/${activeSection}` : `${BASE_URL}/`;
  const ogTitle = meta.ogTitle ?? meta.title;

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Skip-to-content: acessibilidade e SEO — visível apenas ao navegar por teclado */}
        <a href="#conteudo-principal" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo-principal" aria-label="Conteúdo principal">
          <Hero />

          <LazySection id="servicos" minHeight="500px">
            <Suspense fallback={<div id="servicos" style={{ minHeight: "500px" }} className="w-full" />}>
              <Services />
            </Suspense>
          </LazySection>

          <LazySection id="como-trabalhamos" minHeight="500px">
            <Suspense fallback={<div id="como-trabalhamos" style={{ minHeight: "500px" }} className="w-full" />}>
              <HowWeWork />
            </Suspense>
          </LazySection>

          <LazySection id="diferenciais" minHeight="500px">
            <Suspense fallback={<div id="diferenciais" style={{ minHeight: "500px" }} className="w-full" />}>
              <Differentials />
            </Suspense>
          </LazySection>

          <LazySection id="tecnologias" minHeight="400px">
            <Suspense fallback={<div id="tecnologias" style={{ minHeight: "400px" }} className="w-full" />}>
              <Technologies />
            </Suspense>
          </LazySection>

          <LazySection id="autoridade" minHeight="300px">
            <Suspense fallback={<div id="autoridade" style={{ minHeight: "300px" }} className="w-full" />}>
              <Authority />
            </Suspense>
          </LazySection>

          <LazySection id="setores" minHeight="500px">
            <Suspense fallback={<div id="setores" style={{ minHeight: "500px" }} className="w-full" />}>
              <Sectors />
            </Suspense>
          </LazySection>

          <LazySection id="sobre" minHeight="500px">
            <Suspense fallback={<div id="sobre" style={{ minHeight: "500px" }} className="w-full" />}>
              <About />
            </Suspense>
          </LazySection>

          <LazySection id="faq" minHeight="600px">
            <Suspense fallback={<div id="faq" style={{ minHeight: "600px" }} className="w-full" />}>
              <FAQ />
            </Suspense>
          </LazySection>

          <LazySection id="contato" minHeight="600px">
            <Suspense fallback={<div id="contato" style={{ minHeight: "600px" }} className="w-full" />}>
              <Contact />
            </Suspense>
          </LazySection>
        </main>
        <LazySection id="rodape" minHeight="300px">
          <Suspense fallback={<div id="rodape" style={{ minHeight: "300px" }} className="w-full" />}>
            <Footer />
          </Suspense>
        </LazySection>
        {/* CursorOrb e ScrollToTop carregam após o bundle principal */}
        <LazyRender delay={3000}>
          <Suspense fallback={null}>
            <CursorOrb />
            <ScrollToTop />
          </Suspense>
        </LazyRender>
      </div>
    </>
  );
};

export default Index;
