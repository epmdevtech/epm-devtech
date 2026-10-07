import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página Não Encontrada (404) | EPM DevTech</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <SectionWrapper tone="base" className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto">
          <div className="font-mono text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            ERRO 404
          </div>
          <h1
            tabIndex={-1}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 outline-none focus:outline-none"
          >
            Página não encontrada
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            O endereço que você tentou acessar não existe, foi renomeado ou movido para uma nova rota.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild variant="chamfer" size="default" className="min-h-[44px] w-full sm:w-auto uppercase tracking-wider font-semibold">
              <Link to="/">
                <span>PÁGINA INICIAL</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="chamfer-outline"
              size="default"
              className="min-h-[44px] w-full sm:w-auto uppercase tracking-wider font-semibold"
            >
              <Link to="/services">
                <span>VER SOLUÇÕES</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="default"
              className="min-h-[44px] w-full sm:w-auto text-muted-foreground hover:text-foreground uppercase tracking-wider font-semibold"
            >
              <Link to="/contact">
                <span>FALE COMIGO</span>
              </Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default NotFound;
