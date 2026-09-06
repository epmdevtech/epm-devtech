import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ScrollToTop from '../ScrollToTop';

// ─── Mocks ───────────────────────────────────────────────────────────────────
vi.mock('@/components/theme-provider', () => ({
    useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

// Mock window.scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

// Mock IntersectionObserver
let observerCallback: (entries: { isIntersecting: boolean }[]) => void;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
    constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        observerCallback = callback;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

describe('ScrollToTop Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('não deve exibir o botão quando scrollY for <= 400px', () => {
        render(<ScrollToTop />);
        expect(screen.queryByRole('button', { name: /Voltar ao topo/i })).not.toBeInTheDocument();
    });

    it('deve exibir o botão quando scrollY for > 400px', () => {
        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500, configurable: true });
            fireEvent.scroll(window);
        });

        expect(screen.getByRole('button', { name: /Voltar ao topo/i })).toBeInTheDocument();
    });

    it('deve chamar window.scrollTo para o topo ao clicar no botão', () => {
        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 600, configurable: true });
            fireEvent.scroll(window);
        });

        const button = screen.getByRole('button', { name: /Voltar ao topo/i });
        fireEvent.click(button);

        expect(scrollToMock).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });

    it('deve elevar o botão quando o rodapé for detectado no viewport', () => {
        const footer = document.createElement('footer');
        document.body.appendChild(footer);

        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 800, configurable: true });
            fireEvent.scroll(window);
        });

        const container = screen.getByTestId('scroll-to-top-container');
        expect(container).toHaveAttribute('data-elevated', 'false');

        // Simula a entrada do footer no viewport
        act(() => {
            if (observerCallback) {
                observerCallback([{ isIntersecting: true }]);
            }
        });

        expect(container).toHaveAttribute('data-elevated', 'true');
        expect(container.className).toContain('bottom-20');
    });
});
