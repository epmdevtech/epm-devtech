import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../button';

describe('Button Component (Design System & Engineering Chamfer)', () => {
  it('renderiza o botão padrão com classes acessíveis e texto correto', () => {
    render(<Button>Clique aqui</Button>);
    const button = screen.getByRole('button', { name: /Clique aqui/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-brand', 'text-on-brand');
  });

  it('aplica corretamente a variante "chamfer" com utilitário de chanfro e estilos de marca', () => {
    render(<Button variant="chamfer">Ação Principal</Button>);
    const button = screen.getByRole('button', { name: /Ação Principal/i });
    expect(button).toHaveClass('btn-chamfer', 'bg-brand', 'text-on-brand');
  });

  it('aplica corretamente a variante "chamfer-outline"', () => {
    render(<Button variant="chamfer-outline">Ação Secundária</Button>);
    const button = screen.getByRole('button', { name: /Ação Secundária/i });
    expect(button).toHaveClass('btn-chamfer', 'border-zinc-800', 'text-zinc-200');
  });

  it('aplica corretamente a variante "chamfer-gradient"', () => {
    render(<Button variant="chamfer-gradient">Ação Gradiente</Button>);
    const button = screen.getByRole('button', { name: /Ação Gradiente/i });
    expect(button).toHaveClass('btn-chamfer', 'bg-gradient-to-r');
  });

  it('suporta tamanhos sm, md, lg e default', () => {
    const { rerender } = render(<Button size="sm">Pequeno</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(<Button size="md">Médio</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10', 'px-6');

    rerender(<Button size="lg">Grande</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11', 'px-8');

    rerender(<Button size="default">Padrão</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10', 'px-4');
  });

  it('renderiza como elemento filho quando asChild={true}', () => {
    render(
      <Button asChild variant="chamfer">
        <a href="/contato">Link Chamfer</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /Link Chamfer/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contato');
    expect(link).toHaveClass('btn-chamfer');
  });

  it('dispara o evento onClick normalmente', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Interação</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
