import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LEGACY_HASH_MAP: Record<string, string> = {
  "#servicos": "/servicos",
  "#como-trabalhamos": "/como-trabalhamos",
  "#diferenciais": "/engenharia",
  "#tecnologias": "/engenharia#tecnologias",
  "#setores": "/experiencia#contextos",
  "#sobre": "/sobre",
  "#faq": "/duvidas-frequentes",
  "#contato": "/contato",
};

export const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);

  // 1. Redirecionamento de hashes legados na home (ex: /#servicos -> /servicos)
  useEffect(() => {
    if (pathname === "/" && hash && hash in LEGACY_HASH_MAP) {
      const destination = LEGACY_HASH_MAP[hash];
      navigate(destination, { replace: true });
    }
  }, [pathname, hash, navigate]);

  // 2. Rolagem e foco ao trocar de rota
  useEffect(() => {
    // Na primeira carga, não forçamos foco no H1 nem scroll forçado se já estivermos na home
    if (isFirstRender.current) {
      isFirstRender.current = false;

      // Se houver hash na carga inicial, rola até o elemento
      if (hash) {
        const id = hash.replace("#", "");
        const elem = document.getElementById(id);
        if (elem) {
          setTimeout(() => {
            const top = elem.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
          }, 100);
        }
      }
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hash) {
      const id = hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? "instant" : "smooth",
        });
        return;
      }
    }

    // Sem hash: rolar ao topo
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });

    // Move o foco para o H1 da nova página para acessibilidade com leitores de tela
    const timer = setTimeout(() => {
      const h1 = document.querySelector<HTMLElement>("h1");
      if (h1) {
        h1.focus({ preventScroll: true });
      } else {
        const main = document.querySelector<HTMLElement>("#conteudo-principal");
        if (main) main.focus({ preventScroll: true });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
