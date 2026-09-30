import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Authority from '../Authority';

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">{children}</div>
    ),
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Authority / Trust Bar Component', () => {
  it('renders section header with eyebrow, title and attribution subtitle', () => {
    render(<Authority />);
    expect(screen.getByText(/Experiência e contexto/i)).toBeInTheDocument();
    expect(screen.getByText('Experiência em operações que não podem parar')).toBeInTheDocument();
    expect(
      screen.getByText('Resultados de projetos anteriores conduzidos pela liderança técnica da EPM DevTech.')
    ).toBeInTheDocument();
  });

  it('renders the 3 metrics with honest attribution from previous projects', () => {
    render(<Authority />);
    expect(screen.getByText('99,9%')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidade assegurada em plataformas críticas de energia e educação.')).toBeInTheDocument();

    expect(screen.getByText('2.500 RPS')).toBeInTheDocument();
    expect(screen.getByText('Arquitetura dimensionada para picos de 10.000 usuários simultâneos.')).toBeInTheDocument();

    expect(screen.getByText('Zero perda')).toBeInTheDocument();
    expect(screen.getByText('Zero perda de dados na consolidação de dados regulatórios do setor elétrico.')).toBeInTheDocument();
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<Authority />);
    expect(screen.getByText('Experiência em operações que não podem parar')).toBeInTheDocument();
    expect(screen.getByText('99,9%')).toBeInTheDocument();
  });
});
