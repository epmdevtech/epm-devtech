import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import Differentials from "@/components/sections/Differentials";
import Authority from "@/components/sections/Authority";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
  );
};

export default Index;
