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

describe('Hero Component (B2B Engineering & Architecture Canvas — SPEC-061)', () => {
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

  it('renders factual authority line below CTAs', () => {
    renderHero();

    expect(
      screen.getByText(/Experiência técnica em projetos de energia, indústria, educação, varejo e sistemas corporativos/i)
    ).toBeInTheDocument();
  });

  it('renders software engineering architecture canvas with layers, tech chips and aria-hidden="true" without duplicate metrics', () => {
    const { container } = renderHero();

    // Canvas container must be aria-hidden="true" for screen reader accessibility
    const canvasWrapper = container.querySelector('[aria-hidden="true"].lg\\:col-span-5');
    expect(canvasWrapper).toBeInTheDocument();

    // Contains architectural topology layers
    expect(canvasWrapper).toHaveTextContent(/Topologia de Arquitetura/i);
    expect(canvasWrapper).toHaveTextContent(/Stack de Engenharia/i);
    expect(canvasWrapper).toHaveTextContent(/Aplicações Web & Portais/i);
    expect(canvasWrapper).toHaveTextContent(/APIs & Back-end Escalável/i);
    expect(canvasWrapper).toHaveTextContent(/Barramento de Integração & Eventos/i);
    expect(canvasWrapper).toHaveTextContent(/Persistência Transacional & Nuvem/i);

    // Verifies absence of redundant metrics in Hero canvas (SPEC-062)
    expect(canvasWrapper).not.toHaveTextContent('99,9%');
    expect(canvasWrapper).not.toHaveTextContent('2.500+');
    expect(canvasWrapper).not.toHaveTextContent('Alta Disponibilidade');

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

  it('renders minimalist section transition divider with brand node', () => {
    const { container } = renderHero();

    const dividerContainer = container.querySelector('.w-full.border-t.border-border')?.parentElement;
    expect(dividerContainer).toBeInTheDocument();
    expect(dividerContainer?.querySelector('.border-t')).toBeInTheDocument();
    expect(dividerContainer?.querySelector('.rounded-full.bg-primary')).toBeInTheDocument();
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

