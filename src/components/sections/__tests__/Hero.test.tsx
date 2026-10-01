import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero Component (Slim & Minimalist — SPEC-059)', () => {
  it('renders section with semantic accessibility labeling', () => {
    render(<Hero />);

    const section = document.getElementById('hero');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id', 'hero-title');
  });

  it('renders exact H1 and subheadline copy for software house', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Desenvolvemos software sob medida para o seu negócio.');

    expect(
      screen.getByText('Sistemas web, APIs, integrações e soluções digitais construídas para resolver problemas reais e acompanhar a evolução da sua empresa.')
    ).toBeInTheDocument();
  });

  it('renders minimalist eyebrow with BrandChipIcon and "Software House" tagline', () => {
    render(<Hero />);

    const eyebrow = screen.getByTestId('hero-eyebrow');
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent(/Software House/i);
    expect(eyebrow.querySelector('svg')).toBeInTheDocument();
  });

  it('renders primary CTA button pointing to #contato and secondary text link pointing to #sobre', () => {
    render(<Hero />);

    const primaryCta = screen.getByRole('link', { name: /Falar sobre meu projeto/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '#contato');

    const secondaryCta = screen.getByRole('link', { name: /Conhecer a EPM DevTech/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute('href', '#sobre');
    // Ensure secondary action is a text link rather than a second full button
    expect(secondaryCta.tagName.toLowerCase()).toBe('a');
  });

  it('renders minimalist section transition divider with brand node', () => {
    const { container } = render(<Hero />);

    const dividerContainer = container.querySelector('[aria-hidden="true"].relative');
    expect(dividerContainer).toBeInTheDocument();
    expect(dividerContainer?.querySelector('.border-t')).toBeInTheDocument();
    expect(dividerContainer?.querySelector('.rounded-full.bg-primary')).toBeInTheDocument();
  });

  it('verifies that architecture diagram and telemetry noise are completely removed', () => {
    render(<Hero />);

    // Diagram console region must NOT exist
    expect(screen.queryByRole('region', { name: /diagrama/i })).not.toBeInTheDocument();

    // Diagram layers and nodes must NOT exist
    expect(screen.queryByText(/01 \/ Borda/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/02 \/ Core/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/03 \/ Assincronia/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/04 \/ Nuvem/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Client / Edge')).not.toBeInTheDocument();
    expect(screen.queryByText('Domain Services')).not.toBeInTheDocument();
    expect(screen.queryByText('Event Stream')).not.toBeInTheDocument();
    expect(screen.queryByText('Cloud & Data')).not.toBeInTheDocument();
    expect(screen.queryByText('Edge Routing')).not.toBeInTheDocument();
    expect(screen.queryByText('topologia://arquitetura-distribuida.epm')).not.toBeInTheDocument();
  });
});
