import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Technologies from '../Technologies';

const mockUseInView = vi.fn().mockReturnValue(true);

// Mock framer-motion and useInView to execute immediately
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
    path: ({ d, className, ...props }: React.SVGProps<SVGPathElement>) => (
      <path d={d} className={className} {...props} />
    ),
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
  useReducedMotion: () => false,
}));

describe('Technologies Component', () => {
  it('renders section title, subtitle and TechConstellation', () => {
    render(<Technologies />);
    expect(screen.getByText(/Stack Tecnológica/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tecnologias/i })).toBeInTheDocument();
    expect(screen.getByTestId('tech-constellation')).toBeInTheDocument();
  });

  it('renders constellation categories', () => {
    render(<Technologies />);

    // Check main categories in the constellation
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Banco de Dados')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    expect(screen.getByText('Mensageria')).toBeInTheDocument();
    expect(screen.getByText('Observabilidade')).toBeInTheDocument();
  });

  it('renders technology nodes inside the constellation', () => {
    render(<Technologies />);

    expect(screen.getByTestId('tech-node-React')).toBeInTheDocument();
    expect(screen.getByTestId('tech-node-Node.js')).toBeInTheDocument();
    expect(screen.getByTestId('tech-node-Docker')).toBeInTheDocument();
    expect(screen.getByTestId('tech-node-Kubernetes')).toBeInTheDocument();
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<Technologies />);
    expect(screen.getByText(/Stack Tecnológica/i)).toBeInTheDocument();
    expect(screen.getByTestId('tech-constellation')).toBeInTheDocument();
  });
});
