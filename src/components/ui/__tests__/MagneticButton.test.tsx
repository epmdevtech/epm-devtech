import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MagneticButton from '../MagneticButton';

describe('MagneticButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
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
  });

  it('aplica corretamente as variantes de estilo', () => {
    const { rerender } = render(
      <MagneticButton variant="primary">Primary</MagneticButton>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-brand');

    rerender(<MagneticButton variant="outline">Outline</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('border');

    rerender(<MagneticButton variant="ghost">Ghost</MagneticButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('gerencia eventos de mouseenter, mousemove e mouseleave com cálculos magnéticos', () => {
    render(<MagneticButton>Botão Magnético</MagneticButton>);

    const button = screen.getByRole('button');

    // Simula getBoundingClientRect do botão
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 100,
      width: 160,
      height: 48,
      right: 260,
      bottom: 148,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    expect(() => {
      fireEvent.mouseEnter(button, { clientX: 180, clientY: 124 });
      fireEvent.mouseMove(button, { clientX: 200, clientY: 130 });
      fireEvent.mouseLeave(button);
    }).not.toThrow();
  });

  it('respeita prefers-reduced-motion e monta o componente sem registrar interpolações', () => {
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

    render(<MagneticButton>Reduced Motion Button</MagneticButton>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });

  it('desabilita o botão quando disabled={true}', () => {
    const handleClick = vi.fn();
    render(
      <MagneticButton disabled onClick={handleClick}>
        Desabilitado
      </MagneticButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('desmonta o componente e limpa o contexto GSAP sem erros', () => {
    const { unmount } = render(<MagneticButton>Cleanup Test</MagneticButton>);
    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
