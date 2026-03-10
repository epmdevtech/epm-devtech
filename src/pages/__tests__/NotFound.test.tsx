import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../NotFound';

const mockPathname = '/rota-nao-existe';
vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockPathname }),
}));

describe('NotFound Page', () => {
  it('renderiza o título 404', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renderiza a mensagem de página não encontrada', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('renderiza o link de retorno para a home', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /Return to Home/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });

  it('registra o erro 404 no console com o pathname acessado', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<NotFound />);
    expect(consoleSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      mockPathname,
    );
    consoleSpy.mockRestore();
  });
});
