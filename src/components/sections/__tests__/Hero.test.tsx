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

describe('Hero Component (Business Scenarios Selector & B2B Decision — SPEC-083)', () => {
  it('renders section with semantic accessibility labeling, fullscreen classes, data-tone and unique H1', () => {
    renderHero();

    const section = document.getElementById('hero');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title');
    expect(section).toHaveAttribute('data-tone', 'anchor');
    expect(section?.className).toContain('min-h-screen');
    expect(section?.className).toContain('min-h-[100svh]');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAttribute('id', 'hero-title');
  });

  it('renders exact monochromatic H1 and editorial subheadline (SPEC-094)', () => {
    renderHero();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Engenharia de software para construir, integrar e evoluir sistemas.');
    expect(heading.className).toContain('text-primary');

    // Strictly monochromatic: no bicolored inner span
    const accentedSpan = heading.querySelector('span');
    expect(accentedSpan).toBeNull();

    // Editorial subheadline
    expect(
      screen.getByText(
        'Desenvolvemos sistemas web, APIs e integrações sob medida para operações que não podem parar por instabilidade ou lentidão.'
      )
    ).toBeInTheDocument();
  });

  it('renders contextual eyebrow with BrandChipIcon without pill/badge wrapper', () => {
    renderHero();

    const eyebrow = screen.getByTestId('hero-eyebrow');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(/ENGENHARIA DE SOFTWARE & MODERNIZAÇÃO/i);
    expect(eyebrow.querySelector('svg')).toBeInTheDocument();

    // Must not have pill/badge classes
    expect(eyebrow.className).not.toContain('rounded-full');
    expect(eyebrow.className).not.toContain('border');
  });

  it('renders single primary CTA pointing to /contact and ensures secondary CTA is absent (SPEC-108)', () => {
    renderHero();

    const primaryCta = screen.getByRole('link', { name: /Vamos conversar/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '/contact');

    const secondaryCta = screen.queryByRole('link', { name: /Conheça as soluções/i });
    expect(secondaryCta).not.toBeInTheDocument();
  });

  it('does not render operational trust strip (SPEC-084)', () => {
    renderHero();

    const trustStrip = screen.queryByTestId('hero-operational-trust');
    expect(trustStrip).not.toBeInTheDocument();
    expect(screen.queryByText(/Aplicações corporativas críticas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Energia, educação, indústria e varejo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Retorno em até 24h úteis/i)).not.toBeInTheDocument();
  });

  it('renders interactive business scenario selector with header, status, and 4 scenario links (SPEC-083)', () => {
    renderHero();

    const selector = screen.getByTestId('hero-scenario-selector');
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveTextContent('Qual é o principal desafio da sua empresa hoje?');
    expect(selector).toHaveTextContent('Diagnóstico técnico direto');

    // Scenario 1: Sistemas / Web
    const link1 = screen.getByTestId('scenario-link-sistemas');
    expect(link1).toBeInTheDocument();
    expect(link1).toHaveAttribute('href', '/services#sistemas');
    expect(link1).toHaveTextContent('Criar um novo sistema, portal ou plataforma corporativa');

    // Scenario 2: Integrações
    const link2 = screen.getByTestId('scenario-link-integracoes');
    expect(link2).toBeInTheDocument();
    expect(link2).toHaveAttribute('href', '/services#integracoes');
    expect(link2).toHaveTextContent('Conectar sistemas isolados e acabar com retrabalho manual');

    // Scenario 3: Legados
    const link3 = screen.getByTestId('scenario-link-legados');
    expect(link3).toBeInTheDocument();
    expect(link3).toHaveAttribute('href', '/services#legados');
    expect(link3).toHaveTextContent('Modernizar um software legado sem interromper o dia a dia');

    // Scenario 4: Diagnóstico
    const link4 = screen.getByTestId('scenario-link-diagnostico');
    expect(link4).toBeInTheDocument();
    expect(link4).toHaveAttribute('href', '/contact');
    expect(link4).toHaveTextContent('Avaliar a arquitetura do meu sistema com um diagnóstico técnico');
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
