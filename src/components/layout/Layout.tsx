import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import ScrollManager from "@/components/routing/ScrollManager";
import { LazyRender } from "@/components/LazyRender";

const CursorOrb = lazy(() => import("@/components/CursorOrb"));
const ScrollToTop = lazy(() => import("@/components/ui/ScrollToTop"));

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      {/* Acessibilidade: Skip Link para teclado e leitores de tela */}
      <a href="#conteudo-principal" className="skip-to-content">
        Pular para o conteúdo
      </a>

      {/* Header compartilhado fixo */}
      <Header />

      {/* Gerenciador de rolagem e foco */}
      <ScrollManager />

      {/* Conteúdo dinâmico da rota ativa */}
      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="flex-1 flex flex-col focus:outline-none outline-none"
        aria-label="Conteúdo principal"
      >
        <Suspense
          fallback={
            <div
              className="min-h-[60vh] w-full flex items-center justify-center"
              aria-busy="true"
              aria-label="Carregando conteúdo..."
            >
              <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      {/* Rodapé compartilhado */}
      <Footer />

      {/* Componentes globais diferidos */}
      <LazyRender delay={2500}>
        <Suspense fallback={null}>
          <CursorOrb />
          <ScrollToTop />
        </Suspense>
      </LazyRender>
    </div>
  );
};

export default Layout;
