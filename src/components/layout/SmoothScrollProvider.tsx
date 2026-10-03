import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollContext, type ScrollToOptions } from "@/hooks/useSmoothScroll";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Respeita preferência de redução de movimento do usuário
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
      return;
    }

    // 2. Registra plugin ScrollTrigger no GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 3. Inicializa Lenis com física corporativa equilibrada e sem jank
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
      wheelMultiplier: 1.0,
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 4. Sincroniza eventos de scroll do Lenis com o ScrollTrigger do GSAP
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // 5. Integra o loop raf do Lenis diretamente no ticker do GSAP para evitar conflitos de renderização
    const handleTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // 6. Cleanup determinístico no unmount
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(handleTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 7. Atualização do Scroll e Triggers nas transições de rotas
  useEffect(() => {
    if (!lenisRef.current) return;

    if (!location.hash) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      const targetElement = document.querySelector(location.hash);
      if (targetElement) {
        lenisRef.current.scrollTo(targetElement as HTMLElement, {
          offset: -80,
          immediate: false,
        });
      }
    }

    // Dá tempo para o layout React montar os nós antes de recalcular posições
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: ScrollToOptions) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
            window.scrollTo({ top, behavior: "smooth" });
          }
        } else if (target instanceof HTMLElement) {
          const top = target.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        isReady: Boolean(lenisInstance),
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
