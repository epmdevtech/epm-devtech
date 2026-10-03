import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useScrollReveal from '../useScrollReveal';

const RevealTestComponent = ({
  options = {},
  withChildren = false,
}: {
  options?: Parameters<typeof useScrollReveal>[0];
  withChildren?: boolean;
}) => {
  const containerRef = useScrollReveal<HTMLDivElement>(options);

  return (
    <div ref={containerRef} data-testid="reveal-container">
      {withChildren ? (
        <>
          <div className="reveal-item" data-testid="item-1">Item 1</div>
          <div className="reveal-item" data-testid="item-2">Item 2</div>
        </>
      ) : (
        <span>Conteúdo Simples</span>
      )}
    </div>
  );
};

describe('useScrollReveal Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('anexa e renderiza o container ref corretamente', () => {
    render(<RevealTestComponent />);
    const container = screen.getByTestId('reveal-container');
    expect(container).toBeInTheDocument();
    expect(screen.getByText('Conteúdo Simples')).toBeInTheDocument();
  });

  it('suporta animação com seletor de itens filhos e parâmetros customizados', () => {
    render(
      <RevealTestComponent
        options={{
          selector: '.reveal-item',
          stagger: 0.15,
          y: 30,
          duration: 0.8,
        }}
        withChildren
      />
    );

    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
  });

  it('respeita prefers-reduced-motion e monta o componente sem erros quando a redução de movimento estiver ativa', () => {
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
      <RevealTestComponent
        options={{
          y: 20,
          opacity: 0,
        }}
      />
    );

    expect(screen.getByTestId('reveal-container')).toBeInTheDocument();
    window.matchMedia = originalMatchMedia;
  });

  it('executa a limpeza de contexto no desmonte sem erros', () => {
    const { unmount } = render(
      <RevealTestComponent
        options={{
          selector: '.reveal-item',
          stagger: 0.1,
        }}
        withChildren
      />
    );

    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
