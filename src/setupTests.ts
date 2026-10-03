import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

Object.defineProperty(window, 'matchMedia', {
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

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

window.scrollTo = vi.fn();

afterEach(() => {
  try {
    ScrollTrigger.disable(true, true);
  } catch {
    // noop
  }
});

