import "@testing-library/jest-dom";

const noopRaf = (): number => 0;
const noopCaf = (): void => {};

(globalThis as Record<string, unknown>).requestAnimationFrame = noopRaf;
(globalThis as Record<string, unknown>).cancelAnimationFrame = noopCaf;
if (typeof global !== 'undefined') {
  (global as Record<string, unknown>).requestAnimationFrame = noopRaf;
  (global as Record<string, unknown>).cancelAnimationFrame = noopCaf;
}
if (typeof window !== 'undefined') {
  window.requestAnimationFrame = noopRaf;
  window.cancelAnimationFrame = noopCaf;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
