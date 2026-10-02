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

  it('renders exact H1 with visual chromatic accent and editorial subheadline (SPEC-083)', () => {
    renderHero();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Engenharia de software para construir, integrar e evoluir sistemas.');

    // Chromatic accent on action verbs
    const accentedSpan = heading.querySelector('span');
    expect(accentedSpan).toBeInTheDocument();
    expect(accentedSpan).toHaveTextContent('construir, integrar e evoluir');
    expect(accentedSpan?.className).toContain('text-text-brand');

    // Editorial subheadline
    expect(
      screen.getByText(
        'Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio.'
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

  it('renders primary CTA pointing to /contato and secondary CTA pointing to #servicos', () => {
    renderHero();

    const primaryCta = screen.getByRole('link', { name: /Vamos conversar/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '/contato');

    const secondaryCta = screen.getByRole('link', { name: /Ver soluções/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute('href', '#servicos');
  });

  it('renders operational trust strip with verifiable factual commitments (SPEC-083)', () => {
    renderHero();

    const trustStrip = screen.getByTestId('hero-operational-trust');
    expect(trustStrip).toBeInTheDocument();
    expect(trustStrip).toHaveTextContent('Aplicações corporativas críticas');
    expect(trustStrip).toHaveTextContent('Energia, educação, indústria e varejo');
    expect(trustStrip).toHaveTextContent('Retorno em até 24h úteis');
  });

  it('renders interactive business scenario selector with header, status, and 4 scenario links (SPEC-083)', () => {
    renderHero();

    const selector = screen.getByTestId('hero-scenario-selector');
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveTextContent('O que sua empresa precisa agora?');
    expect(selector).toHaveTextContent('Direcionamento técnico imediato');

    // Scenario 1: Sistemas / Web
    const link1 = screen.getByTestId('scenario-link-sistemas');
    expect(link1).toBeInTheDocument();
    expect(link1).toHaveAttribute('href', '/servicos#sistemas');
    expect(link1).toHaveTextContent('Criar um novo sistema, portal ou plataforma web');

    // Scenario 2: Integrações
    const link2 = screen.getByTestId('scenario-link-integracoes');
    expect(link2).toBeInTheDocument();
    expect(link2).toHaveAttribute('href', '/servicos#integracoes');
    expect(link2).toHaveTextContent('Conectar sistemas antigos e automatizar fluxos de dados');

    // Scenario 3: Legados
    const link3 = screen.getByTestId('scenario-link-legados');
    expect(link3).toBeInTheDocument();
    expect(link3).toHaveAttribute('href', '/servicos#legados');
    expect(link3).toHaveTextContent('Modernizar e refatorar um software legado sem parar a operação');

    // Scenario 4: Diagnóstico
    const link4 = screen.getByTestId('scenario-link-diagnostico');
    expect(link4).toBeInTheDocument();
    expect(link4).toHaveAttribute('href', '/contato');
    expect(link4).toHaveTextContent('Avaliar arquitetura e ter uma segunda opinião técnica sênior');
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
