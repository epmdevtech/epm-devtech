import { createContext, useContext } from "react";
import type Lenis from "lenis";

export interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  easing?: (t: number) => number;
}

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
  isReady: boolean;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  isReady: false,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default useSmoothScroll;
