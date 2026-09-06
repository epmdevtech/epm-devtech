import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import Index from '../Index';

// ─── useLocation: pathname controlado por teste ───────────────────────────────
let mockPathname = '/';
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockPathname }),
}));

// ─── Seções: rendem elementos com IDs reais para o IntersectionObserver ───────
vi.mock('@/components/layout/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('@/components/sections/Hero', () => ({ default: () => <section data-testid="hero" /> }));
vi.mock('@/components/sections/About', () => ({ default: () => <section id="sobre" data-testid="about" /> }));
vi.mock('@/components/sections/Services', () => ({ default: () => <section id="servicos" data-testid="services" /> }));
vi.mock('@/components/sections/Technologies', () => ({ default: () => <section id="tecnologias" data-testid="technologies" /> }));
vi.mock('@/components/sections/Differentials', () => ({ default: () => <section id="diferenciais" data-testid="differentials" /> }));
vi.mock('@/components/sections/Authority', () => ({ default: () => <section id="autoridade" data-testid="authority" /> }));
vi.mock('@/components/sections/Contact', () => ({ default: () => <section id="contato" data-testid="contact" /> }));
vi.mock('@/components/sections/Footer', () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock('@/components/CursorOrb', () => ({ default: () => null }));
vi.mock('@/components/ui/ScrollToTop', () => ({ default: () => null }));

// ─── window.scrollTo ─────────────────────────────────────────────────────────
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

// ─── IntersectionObserver mock ────────────────────────────────────────────────
let capturedCallback: IntersectionObserverCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

const setupObserver = () => {
  global.IntersectionObserver = vi.fn((cb) => {
    capturedCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() };
  }) as unknown as typeof IntersectionObserver;
};

/** Dispara o IntersectionObserver com as entries fornecidas */
const fireIntersection = (entries: Partial<IntersectionObserverEntry>[]) => {
  act(() => {
    capturedCallback(entries as IntersectionObserverEntry[], {} as IntersectionObserver);
  });
};

/** Cria uma IntersectionObserverEntry mínima */
const makeEntry = (
  id: string,
  isIntersecting: boolean,
  top: number,
): Partial<IntersectionObserverEntry> => ({
  isIntersecting,
  target: document.getElementById(id) as Element,
  boundingClientRect: { top } as DOMRect,
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: {} as DOMRect,
  rootBounds: null,
  time: 0,
});

// ─── Helper de render ─────────────────────────────────────────────────────────
const renderIndex = () =>
  render(
    <HelmetProvider>
      <Index />
    </HelmetProvider>,
  );

// ─────────────────────────────────────────────────────────────────────────────

describe('Index Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/';
    setupObserver();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Renderização ─────────────────────────────────────────────────────────
  describe('Renderização', () => {
    it('renderiza todas as seções e layout principal', async () => {
      renderIndex();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('hero')).toBeInTheDocument();

      // Flush lazy import promises (React.lazy usa dynamic import)
      await act(async () => {});

      expect(screen.getByTestId('about')).toBeInTheDocument();
      expect(screen.getByTestId('services')).toBeInTheDocument();
      expect(screen.getByTestId('technologies')).toBeInTheDocument();
      expect(screen.getByTestId('differentials')).toBeInTheDocument();
      expect(screen.getByTestId('authority')).toBeInTheDocument();
      expect(screen.getByTestId('contact')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renderiza o link de skip-to-content para acessibilidade', () => {
      renderIndex();
      const skip = screen.getByText('Pular para o conteúdo');
      expect(skip).toBeInTheDocument();
      expect(skip.getAttribute('href')).toBe('#conteudo-principal');
    });

    it('renderiza a tag <main> com aria-label correto', () => {
      renderIndex();
      expect(screen.getByRole('main')).toHaveAttribute('aria-label', 'Conteúdo principal');
    });
  });

  // ── SEO / Helmet dinâmico ─────────────────────────────────────────────────
  // react-helmet-async usa timers internos para aplicar as mudanças no DOM.
  // Com vi.useFakeTimers() ativo, é necessário vi.runAllTimers() dentro de act()
  // para que o document.title seja atualizado antes das asserções.
  describe('SEO — Helmet dinâmico por rota', () => {
    const renderAndFlush = (pathname: string) => {
      mockPathname = pathname;
      renderIndex();
      act(() => { vi.runAllTimers(); });
    };

    it('define título correto para / (home)', () => {
      renderAndFlush('/');
      expect(document.title).toBe(
        'EPM DEVTECH | Software House: Desenvolvimento de Software Sob Medida',
      );
    });

    it('define título correto para /sobre', () => {
      renderAndFlush('/sobre');
      expect(document.title).toBe('Sobre | EPM DEVTECH');
    });

    it('define título correto para /servicos', () => {
      renderAndFlush('/servicos');
      expect(document.title).toBe('Serviços | EPM DEVTECH');
    });

    it('define título correto para /tecnologias', () => {
      renderAndFlush('/tecnologias');
      expect(document.title).toBe('Tecnologias | EPM DEVTECH');
    });

    it('define título correto para /diferenciais', () => {
      renderAndFlush('/diferenciais');
      expect(document.title).toBe('Diferenciais | EPM DEVTECH');
    });

    it('define título correto para /contato', () => {
      renderAndFlush('/contato');
      expect(document.title).toBe('Contato | EPM DEVTECH');
    });

    it('usa título padrão (home) para rota desconhecida', () => {
      renderAndFlush('/rota-inexistente');
      expect(document.title).toBe(
        'EPM DEVTECH | Software House: Desenvolvimento de Software Sob Medida',
      );
    });
  });

  // ── Scroll no carregamento inicial ────────────────────────────────────────
  describe('Scroll no carregamento inicial', () => {
    it('não chama scrollTo quando pathname é / (home)', () => {
      mockPathname = '/';
      renderIndex();
      vi.runAllTimers();
      expect(scrollToMock).not.toHaveBeenCalled();
    });

    it('chama scrollTo para a seção correta quando pathname é /sobre', () => {
      mockPathname = '/sobre';
      renderIndex();

      const sobreEl = document.getElementById('sobre')!;
      sobreEl.getBoundingClientRect = vi.fn(() => ({
        top: 600, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {},
      }));

      vi.runAllTimers();
      expect(scrollToMock).toHaveBeenCalledWith({ top: expect.any(Number), behavior: 'smooth' });
    });
  });

  // ── IntersectionObserver / Scroll Spy ─────────────────────────────────────
  describe('Scroll Spy — IntersectionObserver', () => {
    it('inicializa o IntersectionObserver e observa as seções', () => {
      renderIndex();
      expect(global.IntersectionObserver).toHaveBeenCalledOnce();
      // Deve observar ao menos as seções com ID (sobre, servicos, tecnologias, diferenciais, autoridade, contato)
      expect(mockObserve.mock.calls.length).toBeGreaterThanOrEqual(6);
    });

    it('desconecta o observer ao desmontar o componente', () => {
      const { unmount } = renderIndex();
      unmount();
      expect(mockDisconnect).toHaveBeenCalledOnce();
    });

    it('atualiza URL com replaceState(/sobre) quando seção intersecta — pathname = /', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();
      // pathname = '/' → isProgrammaticScrollRef = false → observer desbloqueado imediatamente

      fireIntersection([makeEntry('sobre', true, 400)]);

      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/sobre');
    });

    it('atualiza URL com replaceState(/contato) quando seção contato intersecta', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();

      fireIntersection([makeEntry('contato', true, 300)]);

      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/contato');
    });

    it('ignora seção sem SEO meta (autoridade) — não chama replaceState', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();

      fireIntersection([makeEntry('autoridade', true, 500)]);

      expect(replaceStateSpy).not.toHaveBeenCalled();
    });

    it('reseta URL para / quando #sobre sai da zona pelo bottom (usuário voltou ao Hero)', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();
      // Avança os timers para garantir ref desbloqueado
      vi.runAllTimers();

      // top > 0: seção está abaixo do viewport top (scrollou para cima)
      fireIntersection([makeEntry('sobre', false, 150)]);

      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/');
    });

    it('não reseta URL quando #sobre sai pelo topo (usuário rolando para baixo)', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();
      vi.runAllTimers();

      // top < 0: seção passou para cima do viewport (scroll para baixo)
      fireIntersection([makeEntry('sobre', false, -200)]);

      expect(replaceStateSpy).not.toHaveBeenCalled();
    });

    it('bloqueia o scroll spy durante rolagem programática (isProgrammaticScrollRef = true)', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      // pathname não-vazia → isProgrammaticScrollRef = true até os timers avançarem
      mockPathname = '/contato';
      renderIndex();
      // NÃO avança os timers — ref ainda bloqueado

      fireIntersection([makeEntry('sobre', true, 400)]);

      // Observer deve ser ignorado enquanto scroll programático está ativo
      expect(replaceStateSpy).not.toHaveBeenCalledWith(null, '', '/sobre');
    });

    it('libera o scroll spy após os timers do scroll programático expirarem', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/contato';
      renderIndex();

      // Avança além dos 100ms (scroll) + 900ms (lock) = 1000ms+
      vi.advanceTimersByTime(1100);

      fireIntersection([makeEntry('sobre', true, 400)]);

      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/sobre');
    });

    it('processa apenas a primeira entry válida em um batch de intersections', () => {
      const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
      mockPathname = '/';
      renderIndex();

      // Duas seções intersectando ao mesmo tempo — apenas a primeira deve ser processada
      fireIntersection([
        makeEntry('sobre', true, 400),
        makeEntry('servicos', true, 200),
      ]);

      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/sobre');
    });
  });
});
