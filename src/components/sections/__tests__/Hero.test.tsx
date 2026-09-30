import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Hero from '../Hero';

// Mock framer-motion to execute immediately
vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ children, className, onClick, style, ...rest }, ref) => (
        <div ref={ref} className={className} onClick={onClick} style={style} {...rest}>
          {children}
        </div>
      )
    ),
    span: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
      ({ children, className, style, ...rest }, ref) => (
        <span ref={ref} className={className} style={style} {...rest}>
          {children}
        </span>
      )
    ),
    h1: ({ children, className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className={className} {...rest}>{children}</h1>
    ),
    p: ({ children, className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={className} {...rest}>{children}</p>
    ),
  },
  useScroll: () => ({ scrollY: 0, scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: (val: unknown) => ({ get: () => val, set: vi.fn() }),
  useMotionValue: (val: unknown) => ({ get: () => val, set: vi.fn() }),
  useAnimationFrame: vi.fn(),
  useInView: () => true,
  useReducedMotion: () => false,
}));

describe('Hero Component', () => {
  it('renders correctly with primary heading and supporting text for software house', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Desenvolvemos software.*sob medida para o seu negócio\./i);

    expect(
      screen.getByText(/Sistemas web, APIs, integrações e soluções digitais/i)
    ).toBeInTheDocument();
  });

  it('renders eyebrow badge with EPM DEVTECH chip and SOFTWARE HOUSE label linking to #sobre', () => {
    render(<Hero />);

    expect(screen.getByText('EPM DEVTECH')).toBeInTheDocument();
    expect(screen.getByText('SOFTWARE HOUSE')).toBeInTheDocument();

    const badgeLink = screen.getByRole('link', {
      name: /EPM DEVTECH — SOFTWARE HOUSE/i,
    });
    expect(badgeLink).toHaveAttribute('href', '#sobre');
  });

  it('renders primary and secondary CTA buttons pointing to corresponding sections', () => {
    render(<Hero />);

    const primaryCta = screen.getByRole('link', { name: /Falar sobre meu projeto/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '#contato');

    const secondaryCta = screen.getByRole('link', { name: /Conhecer a EPM DevTech/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute('href', '#sobre');
  });

  it('renders microprova social with concise engineering credentials', () => {
    render(<Hero />);

    expect(screen.getByText(/Da concepção ao deploy/i)).toBeInTheDocument();
    expect(screen.getByText(/Engenharia direta/i)).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura para evolução/i)).toBeInTheDocument();
  });

  it('renders clean system architecture topology without simulated telemetry noise', () => {
    render(<Hero />);

    const archConsole = screen.getByRole('region', {
      name: /Diagrama de topologia de arquitetura de software da EPM DEVTECH/i,
    });
    expect(archConsole).toBeInTheDocument();

    expect(screen.getByText(/topologia:\/\/arquitetura-distribuida.epm/i)).toBeInTheDocument();
    expect(screen.getByText(/Topologia Resiliente/i)).toBeInTheDocument();
    expect(screen.getByText('Client / Edge')).toBeInTheDocument();
    expect(screen.getAllByText('Domain Services').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Event Stream')).toBeInTheDocument();
    expect(screen.getByText('Cloud & Data')).toBeInTheDocument();

    // Verify absence of telemetry noise / fake numbers
    expect(screen.queryByText('14ms')).not.toBeInTheDocument();
    expect(screen.queryByText('2.500 Req/s Pico')).not.toBeInTheDocument();
    expect(screen.queryByText('99,9% Disponibilidade')).not.toBeInTheDocument();
  });

  it('allows interactive switching of active architectural nodes', () => {
    render(<Hero />);

    const dataNode = screen.getByText('Cloud & Data');
    fireEvent.click(dataNode);

    expect(screen.getAllByText('Persistência & Resiliência').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Redundância')).toBeInTheDocument();
  });
});
