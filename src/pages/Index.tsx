import { LazyRender } from "@/components/LazyRender";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

import LazySection from "@/components/LazySection";

const CursorOrb    = lazy(() => import("@/components/CursorOrb"));
const ScrollToTop  = lazy(() => import("@/components/ui/ScrollToTop"));
const About        = lazy(() => import("@/components/sections/About"));
const Services     = lazy(() => import("@/components/sections/Services"));
const Technologies = lazy(() => import("@/components/sections/Technologies"));
const Differentials= lazy(() => import("@/components/sections/Differentials"));
const Authority    = lazy(() => import("@/components/sections/Authority"));
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
    title: "EPM DEVTECH | Software House — Desenvolvimento de Software Sob Medida",
    description:
      "Software house especializada em desenvolvimento web, APIs escaláveis e arquitetura de sistemas. +9 anos de experiência. PHP, Laravel, Node.js, React, AWS, Docker.",
    ogTitle: "EPM DEVTECH | Software House",
  },
  sobre: {
    title: "Sobre | EPM DEVTECH",
    description:
      "Conheça a EPM DEVTECH: +9 anos construindo soluções de software sob medida com foco em qualidade, performance e arquitetura sólida.",
  },
  servicos: {
    title: "Serviços | EPM DEVTECH",
    description:
      "Desenvolvimento web, APIs REST escaláveis, aplicativos mobile e arquitetura de sistemas. Conheça os serviços da EPM DEVTECH.",
  },
  tecnologias: {
    title: "Tecnologias | EPM DEVTECH",
    description:
      "PHP, Laravel, Node.js, React, TypeScript, AWS, Docker e muito mais. Veja o stack tecnológico utilizado pela EPM DEVTECH.",
  },
  diferenciais: {
    title: "Diferenciais | EPM DEVTECH",
    description:
      "Código limpo, entrega ágil, comunicação transparente e soluções que escalam. Descubra os diferenciais da EPM DEVTECH.",
  },
  contato: {
    title: "Contato | EPM DEVTECH",
    description:
      "Tem um projeto em mente? Entre em contato com a EPM DEVTECH e descubra como podemos transformar sua ideia em realidade.",
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
          // Detecta retorno ao Hero: "sobre" saiu da zona de detecção pela parte de baixo,
          // ou seja, o usuário rolou para cima e está de volta à seção inicial (scrollY < 100).
          if (
            !entry.isIntersecting &&
            entry.target.id === "sobre" &&
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
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Skip-to-content: acessibilidade e SEO — visível apenas ao navegar por teclado */}
        <a href="#conteudo-principal" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo-principal" aria-label="Conteúdo principal">
          <Hero />
          <LazySection id="sobre" minHeight="500px">
            <Suspense fallback={<div id="sobre" style={{ minHeight: "500px" }} className="w-full" />}>
              <About />
            </Suspense>
          </LazySection>

          <LazySection id="servicos" minHeight="500px">
            <Suspense fallback={<div id="servicos" style={{ minHeight: "500px" }} className="w-full" />}>
              <Services />
            </Suspense>
          </LazySection>

          <LazySection id="tecnologias" minHeight="400px">
            <Suspense fallback={<div id="tecnologias" style={{ minHeight: "400px" }} className="w-full" />}>
              <Technologies />
            </Suspense>
          </LazySection>

          <LazySection id="diferenciais" minHeight="500px">
            <Suspense fallback={<div id="diferenciais" style={{ minHeight: "500px" }} className="w-full" />}>
              <Differentials />
            </Suspense>
          </LazySection>

          <LazySection id="autoridade" minHeight="400px">
            <Suspense fallback={<div id="autoridade" style={{ minHeight: "400px" }} className="w-full" />}>
              <Authority />
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
