import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MagneticButton from '../MagneticButton';

describe('MagneticButton Component', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.clearAllMocks();
    // Padrão com suporte a hover fino (desktop) para testes cinemáticos
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('(hover: hover) and (pointer: fine)'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('renderiza como elemento button por padrão com acessibilidade apropriada', () => {
    render(<MagneticButton type="button">Fale Conosco</MagneticButton>);

    const button = screen.getByRole('button', { name: /Fale Conosco/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toBe('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renderiza como Link do React Router quando a prop "to" é fornecida', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MagneticButton to="/contato" aria-label="Ir para contato">
          Iniciar Projeto
        </MagneticButton>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Ir para contato/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contato');
    expect(link.tagName.toLowerCase()).toBe('a');
  });

  it('renderiza como âncora <a> nativa quando a prop "href" é fornecida', () => {
    render(
      <MagneticButton href="#contato" target="_blank" rel="noopener noreferrer">
        Ir para Seção
      </MagneticButton>
    );

    const anchor = screen.getByRole('link', { name: /Ir para Seção/i });
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '#contato');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('executa a função onClick quando clicado', () => {
    const handleClick = vi.fn();
    render(<MagneticButton onClick={handleClick}>Clique aqui</MagneticButton>);

    const button = screen.getByRole('button', { name: /Clique aqui/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica corretamente as variantes de estilo institucional', () => {
    const { rerender, container } = render(
      <MagneticButton variant="primary">Primary</MagneticButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-brand');
    expect(container.querySelector('.translate-y-full')).not.toBeInTheDocument();

    rerender(<MagneticButton variant="outline">Outline</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('border-zinc-800');
    // Cortina filler deve existir na variante outline
    expect(container.querySelector('.translate-y-full')).toBeInTheDocument();

    rerender(<MagneticButton variant="ghost">Ghost</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');

    rerender(<MagneticButton variant="secondary">Secondary</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-zinc-800');
  });

  it('gerencia aproximação magnética e aciona callbacks onHoverStart e onHoverEnd', () => {
    const onHoverStart = vi.fn();
    const onHoverEnd = vi.fn();

    const { container } = render(
      <MagneticButton
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        strength={0.3}
        triggerRadius={0.8}
      >
        Interativo
      </MagneticButton>
    );

    const area = container.querySelector('.inline-block') as HTMLElement;
    expect(area).toBeInTheDocument();

    // Mock das dimensões do container fixo (área de referência)
    vi.spyOn(area, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 50,
      right: 300,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    const button = screen.getByRole('button');

    // 1. Move o mouse para dentro do raio de atração (centro é 200, 125; raio é 200 * 0.8 = 160)
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 210,
          clientY: 130,
        })
      );
    });

    expect(onHoverStart).toHaveBeenCalled();
    expect(button.getAttribute('data-hover')).toBe('true');

    // 2. Move o mouse para longe (fora do raio de captura)
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 600,
          clientY: 600,
        })
      );
    });

    expect(onHoverEnd).toHaveBeenCalled();
    expect(button.getAttribute('data-hover')).toBe('false');

    // 3. Testa mouseleave do document.documentElement
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 205,
          clientY: 125,
        })
      );
    });
    expect(button.getAttribute('data-hover')).toBe('true');

    act(() => {
      document.documentElement.dispatchEvent(new MouseEvent('mouseleave'));
    });
    expect(button.getAttribute('data-hover')).toBe('false');
  });

  it('respeita prefers-reduced-motion e não inicia efeitos magnéticos', () => {
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

    const onHoverStart = vi.fn();
    render(
      <MagneticButton onHoverStart={onHoverStart}>
        Reduced Motion Button
      </MagneticButton>
    );

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 100,
        })
      );
    });

    expect(onHoverStart).not.toHaveBeenCalled();
  });

  it('desativa efeitos em dispositivos touch (hover: none)', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false, // canHover será false
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const onHoverStart = vi.fn();
    render(
      <MagneticButton onHoverStart={onHoverStart}>
        Touch Screen Button
      </MagneticButton>
    );

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 100,
        })
      );
    });

    expect(onHoverStart).not.toHaveBeenCalled();
  });

  it('desabilita o botão quando disabled={true}', () => {
    const handleClick = vi.fn();
    const onHoverStart = vi.fn();

    render(
      <MagneticButton disabled onClick={handleClick} onHoverStart={onHoverStart}>
        Desabilitado
      </MagneticButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 100,
        })
      );
    });
    expect(onHoverStart).not.toHaveBeenCalled();
  });

  it('desmonta o componente e limpa o contexto GSAP sem erros', () => {
    const { unmount } = render(<MagneticButton>Cleanup Test</MagneticButton>);
    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
