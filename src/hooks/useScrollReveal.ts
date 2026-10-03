import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollRevealOptions {
  /** Deslocamento vertical inicial em pixels (padrão: 24, reduzido para metade em mobile) */
  y?: number;
  /** Deslocamento horizontal inicial em pixels (padrão: 0) */
  x?: number;
  /** Opacidade inicial (padrão: 0) */
  opacity?: number;
  /** Duração da transição em segundos (padrão: 0.65) */
  duration?: number;
  /** Função de easing do GSAP (padrão: "power3.out") */
  ease?: string;
  /** Ponto de ativação do ScrollTrigger (padrão: "top 85%") */
  start?: string;
  /** Se deve disparar apenas uma vez (padrão: true) */
  once?: boolean;
  /** Intervalo de stagger entre elementos filhos quando selector é fornecido (padrão: 0.1) */
  stagger?: number;
  /** Seletor CSS para elementos filhos que serão animados em cascata */
  selector?: string;
}

/**
 * useScrollReveal
 * ───────────────
 * Hook corporativo para animações reativas de entrada atreladas à rolagem (scroll-driven reveals),
 * orquestrado com GSAP ScrollTrigger e isolamento estrito via gsap.context() para prevenir vazamentos de memória.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Acessibilidade: respeita prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Se reduzido, garante visibilidade imediata sem deslocamento
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const yOffset = isMobile ? Math.round((options.y ?? 24) * 0.5) : (options.y ?? 24);
    const xOffset = options.x ?? 0;

    // 2. Encapsula o contexto GSAP com o elemento raiz
    const ctx = gsap.context(() => {
      let selector = options.selector;
      if (selector && selector.trim().startsWith('>')) {
        selector = `:scope ${selector.trim()}`;
      }

      const targets = selector
        ? containerRef.current?.querySelectorAll(selector)
        : containerRef.current;

      if (!targets) return;
      if (targets instanceof NodeList && targets.length === 0) return;

      gsap.fromTo(
        targets,
        {
          opacity: options.opacity ?? 0,
          y: yOffset,
          x: xOffset,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration ?? 0.65,
          ease: options.ease ?? "power3.out",
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? "top 85%",
            once: options.once ?? true,
          },
        }
      );
    }, containerRef);

    // 3. Reversão e limpeza determinística no desmonte do componente
    return () => {
      ctx.revert();
    };
  }, [
    options.y,
    options.x,
    options.opacity,
    options.duration,
    options.ease,
    options.start,
    options.once,
    options.stagger,
    options.selector,
  ]);

  return containerRef;
}

export default useScrollReveal;
