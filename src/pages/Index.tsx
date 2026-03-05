import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import Differentials from "@/components/sections/Differentials";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CursorOrb from "@/components/CursorOrb";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EPM DEVTECH | Software House — Desenvolvimento de Software Sob Medida</title>
        <meta name="description" content="Software house especializada em desenvolvimento web, APIs escaláveis e arquitetura de sistemas. +9 anos de experiência. PHP, Laravel, Node.js, React, AWS, Docker." />
        <link rel="canonical" href="https://epmdevtech.com.br/" />
        <meta property="og:title" content="EPM DEVTECH | Software House" />
        <meta property="og:description" content="Software house especializada em APIs escaláveis, sistemas web e arquitetura sólida." />
        <meta property="og:url" content="https://epmdevtech.com.br/" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Cursor orb personalizado — segue o mouse em todo o site */}
        <CursorOrb />

        {/* Skip-to-content: acessibilidade e SEO — visível apenas ao navegar por teclado */}
        <a href="#conteudo-principal" className="skip-to-content">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo-principal" aria-label="Conteúdo principal">
          <Hero />
          <About />
          <Services />
          <Technologies />
          <Differentials />
          <Authority />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

