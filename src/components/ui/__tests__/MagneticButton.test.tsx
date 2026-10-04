import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import gsap from 'gsap';
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
        <MagneticButton to="/contact" aria-label="Ir para contato">
          Iniciar Projeto
        </MagneticButton>
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Ir para contato/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
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

    rerender(<MagneticButton variant="chamfer">Chamfer</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('btn-bevel-4', 'btn-chamfer', 'bg-brand');
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow');

    rerender(<MagneticButton variant="bevel">Bevel</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('btn-bevel-4', 'bg-brand');
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow');

    rerender(<MagneticButton variant="chamfer-outline">Chamfer Outline</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('btn-bevel-4', 'btn-chamfer', 'border-zinc-800');
    expect(container.querySelector('.translate-y-full')).toBeInTheDocument();
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow');

    rerender(<MagneticButton size="sm">Compact</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('btn-bevel-4-sm');
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow-sm');

    rerender(<MagneticButton shadowVariant="white">White Shadow</MagneticButton>);
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow-white');

    rerender(<MagneticButton shadowVariant="brand">Brand Shadow</MagneticButton>);
    expect(container.querySelector('.inline-block')).toHaveClass('btn-bevel-shadow-brand');

    rerender(<MagneticButton shadowVariant="none">No Shadow</MagneticButton>);
    expect(container.querySelector('.inline-block')).not.toHaveClass('btn-bevel-shadow');
  });

  it('gerencia aproximação magnética com margem restrita de 20px e desengate imediato (breakout)', () => {
    const onHoverStart = vi.fn();
    const onHoverEnd = vi.fn();

    const { container } = render(
      <MagneticButton
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        strength={0.15}
        proximityMargin={20}
      >
        Interativo
      </MagneticButton>
    );

    const area = container.querySelector('.inline-block') as HTMLElement;
    expect(area).toBeInTheDocument();

    // Mock das dimensões do container fixo (área de referência)
    // Box: left=100, right=300, top=100, bottom=150. Margem 20px: X in [80, 320], Y in [80, 170]
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

    // 1. Cursor dentro da margem de proximidade (210, 130) -> ativa
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

    // 2. Cursor ultrapassa a margem restrita de 20px (clientX = 325 > 320) -> desengata imediatamente (breakout)
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 325,
          clientY: 130,
        })
      );
    });

    expect(onHoverEnd).toHaveBeenCalled();
    expect(button.getAttribute('data-hover')).toBe('false');

    // 3. Retorna para dentro da margem e testa mouseleave da janela
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

  it('aplica clamping estrito de deslocamento (X <= maxTravelX, Y <= maxTravelY)', () => {
    const quickToCalls: { prop: string; fn: ReturnType<typeof vi.fn> }[] = [];
    const originalQuickTo = gsap.quickTo;

    vi.spyOn(gsap, 'quickTo').mockImplementation((target, prop, opts) => {
      const realQuickTo = originalQuickTo(target, prop, opts);
      const fn = vi.fn((val: number) => realQuickTo(val));
      quickToCalls.push({ prop, fn });
      return fn as unknown as ReturnType<typeof gsap.quickTo>;
    });

    const { container } = render(
      <MagneticButton
        strength={0.15}
        proximityMargin={20}
        maxTravelX={12}
        maxTravelY={8}
      >
        Clamping Test
      </MagneticButton>
    );

    const area = container.querySelector('.inline-block') as HTMLElement;
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

    // Centro da área: X = 200, Y = 125
    // Posição do cursor no canto da margem: X = 320 (deltaX = 120), Y = 170 (deltaY = 45)
    // rawDeltaX = 120 * 0.15 = 18px -> deve travar em maxTravelX = 12px
    // rawDeltaY = 45 * 0.15 = 6.75px -> abaixo de maxTravelY = 8px
    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 320,
          clientY: 170,
        })
      );
    });

    // Os dois primeiros registros são btnX e btnY
    const btnXFn = quickToCalls[0]?.fn;
    const btnYFn = quickToCalls[1]?.fn;
    const textXFn = quickToCalls[2]?.fn;
    const textYFn = quickToCalls[3]?.fn;

    expect(btnXFn).toHaveBeenCalled();
    const lastX = btnXFn.mock.calls.at(-1)?.[0];
    expect(lastX).toBe(12); // Travado no limite estrito de 12px (não 18px)

    expect(btnYFn).toHaveBeenCalled();
    const lastY = btnYFn.mock.calls.at(-1)?.[0];
    expect(lastY).toBe(6.75); // Dentro da margem de 8px

    // Texto compensa no sentido oposto com -clampedX * 0.35 e -clampedY * 0.35
    expect(textXFn).toHaveBeenCalledWith(-12 * 0.35);
    expect(textYFn).toHaveBeenCalledWith(-6.75 * 0.35);
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
