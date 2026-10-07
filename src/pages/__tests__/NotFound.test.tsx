import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFound from '../NotFound';

describe('NotFound Page', () => {
  it('renderiza o título 404 e mensagem em português', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/rota-nao-existe']}>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText(/ERRO 404/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /Página não encontrada/i })).toBeInTheDocument();
  });

  it('renderiza os links de recuperação da navegação', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/rota-invalida']}>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );
    const homeLink = screen.getByRole('link', { name: /PÁGINA INICIAL/i });
    expect(homeLink).toHaveAttribute('href', '/');

    const servicesLink = screen.getByRole('link', { name: /VER SOLUÇÕES/i });
    expect(servicesLink).toHaveAttribute('href', '/services');

    const contactLink = screen.getByRole('link', { name: /FALE COMIGO/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('registra o erro 404 no console com o pathname acessado', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/rota-nao-existe']}>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/rota-nao-existe'
    );
    consoleSpy.mockRestore();
  });
});

