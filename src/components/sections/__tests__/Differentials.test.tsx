import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Differentials from '../Differentials';

const mockUseInView = vi.fn().mockReturnValue(true);
const mockUseReducedMotion = vi.fn().mockReturnValue(false);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">{children}</div>
    ),
    p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={className}>{children}</p>
    ),
    ul: ({ children, className, role }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={className} role={role}>{children}</ul>
    ),
    li: ({ children, className }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={className}>{children}</li>
    ),
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe('Differentials Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseInView.mockReturnValue(true);
    mockUseReducedMotion.mockReturnValue(false);
  });

  it('renders section header with left alignment, title and subtitle', () => {
    render(<Differentials />);

    expect(screen.getByText(/Diferenciais/i)).toBeInTheDocument();
    expect(screen.getByText('Por que trabalhar com a EPM DevTech')).toBeInTheDocument();
    expect(
      screen.getByText(/Engenharia focada na longevidade do seu software, com transparência em cada etapa do projeto/i)
    ).toBeInTheDocument();
  });

  it('renders the engineering practices label and all chips', () => {
    render(<Differentials />);

    expect(screen.getByText('Práticas aplicadas conforme cada projeto')).toBeInTheDocument();

    const practices = [
      'Testes automatizados',
      'Revisão de código',
      'CI/CD',
      'Arquitetura orientada à manutenção',
    ];

    practices.forEach((practice) => {
      expect(screen.getByText(practice)).toBeInTheDocument();
    });
  });

  it('renders all 3 differential items with titles, tags and technical descriptions in a semantic list', () => {
    render(<Differentials />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.tagName.toLowerCase()).toBe('ul');

    const titles = [
      'Comunicação Transparente',
      'Engenharia que Facilita Evoluir',
      'Foco no Problema do Negócio',
    ];

    titles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const tags = [
      'ALINHAMENTO & PREVISIBILIDADE',
      'ARQUITETURA & MANUTENÇÃO',
      'PRAGMATISMO & RESULTADO',
    ];
    tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });

    expect(screen.getByText(/Alinhamento contínuo sobre escopo, decisões técnicas e prioridades/i)).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura modular e código limpo pensados para facilitar manutenções futuras/i)).toBeInTheDocument();
    expect(screen.getByText(/A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa/i)).toBeInTheDocument();
  });

  it('does NOT render sequential step numbers or arrows', () => {
    render(<Differentials />);

    // Verifica que não há '01', '02', '03' em Diferenciais (pois não é sequencial)
    expect(screen.queryByText('01')).not.toBeInTheDocument();
    expect(screen.queryByText('02')).not.toBeInTheDocument();
    expect(screen.queryByText('03')).not.toBeInTheDocument();

    // Sem setas enganosas
    expect(screen.queryByText('→')).not.toBeInTheDocument();
  });

  it('handles prefers-reduced-motion correctly', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<Differentials />);

    expect(screen.getByText('Por que trabalhar com a EPM DevTech')).toBeInTheDocument();
    expect(screen.getByText('Comunicação Transparente')).toBeInTheDocument();
  });

  it('renders correctly before entering viewport', () => {
    mockUseInView.mockReturnValue(false);
    render(<Differentials />);

    expect(screen.getByText('Por que trabalhar com a EPM DevTech')).toBeInTheDocument();
    expect(screen.getByText('Comunicação Transparente')).toBeInTheDocument();
  });
});
