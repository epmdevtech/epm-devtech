import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../Hero';

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );

describe('Hero Component (B2B Engineering & Active Architecture Window — SPEC-068)', () => {
  it('renders section with semantic accessibility labeling and unique H1', () => {
    renderHero();

    const section = document.getElementById('hero');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAttribute('id', 'hero-title');
  });

  it('renders exact H1 and subheadline copy for B2B software engineering', () => {
    renderHero();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Engenharia de software para construir, integrar e evoluir sistemas.');

    expect(
      screen.getByText(
        'Desenvolvemos sistemas corporativos, APIs escaláveis e integrações sob medida, além de modernizar aplicações legadas com foco em qualidade, estabilidade e evolução contínua.'
      )
    ).toBeInTheDocument();
  });

  it('renders contextual eyebrow with BrandChipIcon and uppercase engineering tagline', () => {
    renderHero();

    const eyebrow = screen.getByTestId('hero-eyebrow');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(/ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO/i);
    expect(eyebrow.querySelector('svg')).toBeInTheDocument();
  });

  it('renders primary CTA pointing to /contato and secondary CTA pointing to #servicos', () => {
    renderHero();

    const primaryCta = screen.getByRole('link', { name: /Falar sobre meu projeto/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '/contato');

    const secondaryCta = screen.getByRole('link', { name: /Ver soluções/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute('href', '#servicos');
  });

  it('renders active operational status micro social proof below CTAs with pulsing indicator', () => {
    const { container } = renderHero();

    expect(
      screen.getByText(/Sistemas em produção nos setores de energia, indústria, logística e corporativo/i)
    ).toBeInTheDocument();

    const pingDot = container.querySelector('.animate-ping');
    expect(pingDot).toBeInTheDocument();
  });

  it('renders dev-style active architecture window with layers, tech chips and aria-hidden="true"', () => {
    const { container } = renderHero();

    // Canvas container must be aria-hidden="true" for screen reader accessibility
    const canvasWrapper = container.querySelector('[aria-hidden="true"].lg\\:col-span-5');
    expect(canvasWrapper).toBeInTheDocument();

    // Dev-style window controls and status
    expect(canvasWrapper).toHaveTextContent('architecture.overview.ts');
    expect(canvasWrapper).toHaveTextContent(/HEALTHY \/ 99\.9% uptime/i);

    // Contains architectural topology layers
    expect(canvasWrapper).toHaveTextContent(/Aplicações Web & Portais/i);
    expect(canvasWrapper).toHaveTextContent(/APIs & Back-end Escalável/i);
    expect(canvasWrapper).toHaveTextContent(/Barramento de Integração & Eventos/i);
    expect(canvasWrapper).toHaveTextContent(/Persistência Transacional & Nuvem/i);

    // Contains actual technologies from the company stack
    expect(canvasWrapper).toHaveTextContent('React');
    expect(canvasWrapper).toHaveTextContent('TypeScript');
    expect(canvasWrapper).toHaveTextContent('Node.js');
    expect(canvasWrapper).toHaveTextContent('PHP / Laravel');
    expect(canvasWrapper).toHaveTextContent('RabbitMQ');
    expect(canvasWrapper).toHaveTextContent('PostgreSQL');
    expect(canvasWrapper).toHaveTextContent('AWS');
    expect(canvasWrapper).toHaveTextContent('Docker');
  });

  it('removes artificial horizontal divider line and static node dot (SPEC-068)', () => {
    const { container } = renderHero();

    expect(container.querySelector('[data-testid="hero-divider-line"]')).not.toBeInTheDocument();
    expect(container.querySelector('.w-full.border-t.border-border')).not.toBeInTheDocument();
  });

  it('respects prefers-reduced-motion without throwing and renders all elements', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });

    const { container } = renderHero();
    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });
});
