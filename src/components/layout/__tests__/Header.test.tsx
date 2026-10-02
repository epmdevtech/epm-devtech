import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

// ─── Typewriter Mock ──────────────────────────────────────────────────────────
vi.mock('@/components/ui/typewriter', () => ({
  Typewriter: ({ text }: { text: string }) => <span>{text}</span>,
}));

const renderHeader = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  );

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza logo e os 5 links de navegação previstos na SPEC-060', () => {
    renderHeader();
    expect(screen.getAllByAltText('EPM DEVTECH').length).toBeGreaterThan(0);

    const desktopNav = screen.getByRole('navigation', { name: /Navegação principal/i });
    expect(desktopNav).toBeInTheDocument();

    const expectedLinks = [
      { text: 'Serviços', href: '/servicos' },
      { text: 'Como trabalhamos', href: '/como-trabalhamos' },
      { text: 'Experiência', href: '/experiencia' },
      { text: 'Engenharia', href: '/engenharia' },
      { text: 'Sobre nós', href: '/sobre' },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renderiza o texto "Software House" via Typewriter', () => {
    renderHeader();
    expect(screen.getByText('Software House')).toBeInTheDocument();
  });

  it('renderiza o botão CTA "Fale conosco" apontando para /contato', () => {
    renderHeader();
    const ctaButton = screen.getByRole('link', { name: 'Fale conosco' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/contato');
  });

  it('abre e fecha o menu mobile ao clicar no botão hamburger', () => {
    renderHeader();
    const menuButton = screen.getByLabelText('Abrir menu');

    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog', { name: 'Menu de navegação' })).toBeInTheDocument();

    const closeButton = screen.getAllByLabelText('Fechar menu')[1];
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
  });

  it('fecha o menu mobile ao pressionar a tecla Escape', () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByRole('dialog', { name: 'Menu de navegação' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
  });

  it('fecha o menu mobile ao clicar no backdrop', () => {
    const { container } = renderHeader();
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByRole('dialog', { name: 'Menu de navegação' })).toBeInTheDocument();

    const backdrop = container.querySelector('.bg-background\\/80');
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop!);

    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
  });

  it('fecha o menu mobile ao clicar em um link interno no drawer móvel', () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(screen.getByRole('dialog', { name: 'Menu de navegação' })).toBeInTheDocument();

    const mobileNav = screen.getByRole('navigation', { name: /Navegação móvel/i });
    const mobileLink = mobileNav.querySelector('a[href="/servicos"]');
    expect(mobileLink).toBeInTheDocument();
    fireEvent.click(mobileLink!);

    expect(screen.queryByRole('dialog', { name: 'Menu de navegação' })).not.toBeInTheDocument();
  });

  it('atualiza estilo do header ao fazer scroll', () => {
    const { container } = renderHeader();
    const header = container.querySelector('header');
    expect(header?.className).toContain('bg-surface-anchor');

    Object.defineProperty(window, 'scrollY', { value: 50, configurable: true });
    fireEvent.scroll(window);

    expect(header?.className).toContain('backdrop-blur-md');
    expect(header?.className).toContain('border-b');
  });
});

