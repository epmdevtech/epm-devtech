import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';

vi.mock('@/components/layout/Header', () => ({
  default: () => <header data-testid="mock-header">Header</header>,
}));

vi.mock('@/components/sections/Footer', () => ({
  default: () => <footer data-testid="mock-footer">Footer</footer>,
}));

vi.mock('@/components/routing/ScrollManager', () => ({
  default: () => <div data-testid="mock-scroll-manager" />,
}));

vi.mock('@/components/LazyRender', () => ({
  LazyRender: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/layout/SmoothScrollProvider', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SmoothScrollProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Layout Component', () => {
  it('renderiza skip-link acessível, Header, main com Outlet, ScrollManager e Footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div data-testid="child-page">Página Inicial</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const skipLink = screen.getByRole('link', { name: /Pular para o conteúdo/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#conteudo-principal');

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-scroll-manager')).toBeInTheDocument();
    expect(screen.getByRole('main', { name: /Conteúdo principal/i })).toBeInTheDocument();
    expect(screen.getByTestId('child-page')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
