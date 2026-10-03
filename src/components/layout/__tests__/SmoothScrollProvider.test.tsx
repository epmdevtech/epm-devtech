import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SmoothScrollProvider from '../SmoothScrollProvider';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const TestConsumer = ({
  targetType = 'selector',
}: {
  targetType?: 'selector' | 'number' | 'element';
}) => {
  const { isReady, scrollTo } = useSmoothScroll();

  const handleScroll = () => {
    if (targetType === 'number') {
      scrollTo(400);
    } else if (targetType === 'element') {
      const el = document.getElementById('target');
      if (el) scrollTo(el, { offset: -30 });
    } else {
      scrollTo('#target', { offset: -50 });
    }
  };

  return (
    <div>
      <span data-testid="ready-state">{isReady ? 'ready' : 'not-ready'}</span>
      <button onClick={handleScroll}>Rolar</button>
      <div id="target" style={{ height: '100px' }}>Alvo</div>
    </div>
  );
};

describe('SmoothScrollProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza os filhos corretamente dentro do provedor', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <div data-testid="child-element">Conteúdo Filho</div>
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo Filho')).toBeInTheDocument();
  });

  it('provê contexto com função scrollTo executável com seletor', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <TestConsumer targetType="selector" />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Rolar/i });
    expect(button).toBeInTheDocument();

    expect(() => {
      act(() => {
        button.click();
      });
    }).not.toThrow();
  });

  it('suporta scrollTo com número e com HTMLElement', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <TestConsumer targetType="number" />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    const buttonNumber = screen.getByRole('button', { name: /Rolar/i });
    act(() => {
      buttonNumber.click();
    });

    rerender(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <TestConsumer targetType="element" />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole('button', { name: /Rolar/i });
    act(() => {
      buttonElement.click();
    });
  });

  it('lida com navegação com hash e timer de ScrollTrigger.refresh()', () => {
    vi.useFakeTimers();

    const div = document.createElement('div');
    div.id = 'servicos';
    document.body.appendChild(div);

    render(
      <MemoryRouter initialEntries={['/#servicos']}>
        <SmoothScrollProvider>
          <TestConsumer />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    act(() => {
      vi.advanceTimersByTime(200);
    });

    document.body.removeChild(div);
    vi.useRealTimers();
  });

  it('respeita prefers-reduced-motion e permite scrollTo nativo de fallback', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <TestConsumer targetType="number" />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('ready-state')).toHaveTextContent('not-ready');

    const button = screen.getByRole('button', { name: /Rolar/i });
    act(() => {
      button.click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'smooth' });

    window.matchMedia = originalMatchMedia;
  });

  it('desmonta limpando listeners e instâncias sem lançar exceção', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <SmoothScrollProvider>
          <TestConsumer />
        </SmoothScrollProvider>
      </MemoryRouter>
    );

    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
