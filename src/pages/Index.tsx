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
      <Header />
      <main>
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
