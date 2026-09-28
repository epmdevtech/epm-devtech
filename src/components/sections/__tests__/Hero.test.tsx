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
  it('renders correctly with primary heading and supporting text', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Engenharia de software para sistemas que precisam evoluir.');

    expect(
      screen.getByText(/Arquitetura, desenvolvimento e modernização de software sob medida/i)
    ).toBeInTheDocument();
  });

  it('renders eyebrow badge with EPM DEVTECH chip linking to #sobre', () => {
    render(<Hero />);

    expect(screen.getByText('EPM DEVTECH')).toBeInTheDocument();
    expect(screen.getByText('Engenharia de Software & Modernização')).toBeInTheDocument();

    const badgeLink = screen.getByRole('link', {
      name: /EPM DEVTECH — Engenharia de Software & Modernização/i,
    });
    expect(badgeLink).toHaveAttribute('href', '#sobre');
  });

  it('renders primary and secondary CTA buttons pointing to corresponding sections', () => {
    render(<Hero />);

    const primaryCta = screen.getByRole('link', { name: /Falar sobre um projeto/i });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute('href', '#contato');

    const secondaryCta = screen.getByRole('link', { name: /Conhecer a EPM/i });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute('href', '#sobre');
  });

  it('renders social proof and technical credentials', () => {
    render(<Hero />);

    expect(screen.getByText(/\+9 anos em sistemas críticos/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloud-native/i)).toBeInTheDocument();
    expect(screen.getByText(/APIs resilientes/i)).toBeInTheDocument();
    expect(screen.getByText(/Código limpo/i)).toBeInTheDocument();
  });

  it('renders system architecture console with operational nodes and metrics', () => {
    render(<Hero />);

    const archConsole = screen.getByRole('region', {
      name: /Diagrama de arquitetura de software e sistemas da EPM DEVTECH/i,
    });
    expect(archConsole).toBeInTheDocument();

    expect(screen.getByText(/topologia:\/\/arquitetura-de-sistemas.producao/i)).toBeInTheDocument();
    expect(screen.getByText(/Sistema Online/i)).toBeInTheDocument();
    expect(screen.getByText(/Portal de Entrada & Proteção/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Camada de APIs & Integrações/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Microsserviços & Filas/i)).toBeInTheDocument();
    expect(screen.getByText(/Banco de Dados & Nuvem/i)).toBeInTheDocument();
  });

  it('allows interactive switching of active architectural nodes', () => {
    render(<Hero />);

    const persistenceNode = screen.getByText(/Banco de Dados & Nuvem/i);
    fireEvent.click(persistenceNode);

    expect(screen.getByText('Recuperação Automática')).toBeInTheDocument();
  });
});
