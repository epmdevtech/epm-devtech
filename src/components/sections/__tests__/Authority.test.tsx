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
  it('renders section header with eyebrow, title and attribution subtitle without "conduzidos"', () => {
    render(<Authority />);
    expect(screen.getByText(/Experiência e contexto/i)).toBeInTheDocument();
    expect(screen.getByText('Experiência em operações que não podem parar')).toBeInTheDocument();
    expect(
      screen.getByText('Resultados de projetos anteriores da liderança técnica da EPM DevTech.')
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/conduzidos pela liderança técnica/i)
    ).not.toBeInTheDocument();
  });

  it('renders the 4 metrics with semantic list, pt-BR formatting and accessible labels', () => {
    render(<Authority />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);

    // Stat 1: 99,9%
    expect(screen.getByText('99,9%')).toBeInTheDocument();
    expect(screen.getByText('Disponibilidade assegurada em plataformas críticas de energia e educação.')).toBeInTheDocument();

    // Stat 2: 2.500 RPS
    expect(screen.getByText('2.500 RPS')).toBeInTheDocument();
    expect(screen.getByText('Arquitetura dimensionada para picos de 10.000 usuários simultâneos.')).toBeInTheDocument();

    // Stat 3: 100%
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('De integridade dos dados na consolidação regulatória do setor elétrico, sem perda.')).toBeInTheDocument();

    // Stat 4: −35% (U+2212) com acessibilidade sr-only "redução de 35%"
    expect(screen.getByText('\u221235%')).toBeInTheDocument();
    expect(screen.getByText('redução de 35%')).toBeInTheDocument();
    expect(screen.getByText('De atividades manuais, com automações e integrações em uma plataforma modernizada.')).toBeInTheDocument();

    // Zero perda e Multi-setor não devem existir
    expect(screen.queryByText('Zero perda')).not.toBeInTheDocument();
    expect(screen.queryByText('Multi-setor')).not.toBeInTheDocument();
  });

  it('renders discretionary confidentiality note below stats', () => {
    render(<Authority />);
    expect(
      screen.getByText('Contexto e detalhes sob solicitação, respeitando a confidencialidade dos projetos.')
    ).toBeInTheDocument();
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<Authority />);
    expect(screen.getByText('Experiência em operações que não podem parar')).toBeInTheDocument();
    
    // Todos os 4 valores finais devem estar presentes no DOM inicial sem rolagem
    expect(screen.getByText('99,9%')).toBeInTheDocument();
    expect(screen.getByText('2.500 RPS')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('\u221235%')).toBeInTheDocument();

    // Nenhum placeholder zerado deve existir no DOM
    expect(screen.queryByText('0,0%')).not.toBeInTheDocument();
    expect(screen.queryByText('0 RPS')).not.toBeInTheDocument();
    expect(screen.queryByText('0%')).not.toBeInTheDocument();
    expect(screen.queryByText('\u22120%')).not.toBeInTheDocument();
  });

  it('renderiza os valores finais com prefers-reduced-motion ativo e sem placeholder zero', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<Authority />);

    // Valores finais diretamente visíveis
    expect(screen.getByText('99,9%')).toBeInTheDocument();
    expect(screen.getByText('2.500 RPS')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('\u221235%')).toBeInTheDocument();

    // Zero placeholder ausente
    expect(screen.queryByText('0,0%')).not.toBeInTheDocument();
    expect(screen.queryByText('0 RPS')).not.toBeInTheDocument();
    expect(screen.queryByText('0%')).not.toBeInTheDocument();

    window.matchMedia = originalMatchMedia;
  });

  it('garante que todos os contadores visuais possuem aria-hidden="true" e não duplicam com o texto acessível', () => {
    const { container } = render(<Authority />);
    const countUps = container.querySelectorAll('span[aria-hidden="true"]');
    expect(countUps.length).toBeGreaterThanOrEqual(4);

    const srOnlySpans = container.querySelectorAll('span.sr-only');
    expect(srOnlySpans.length).toBe(4);
    expect(screen.getByText('99,9% de disponibilidade')).toBeInTheDocument();
    expect(screen.getByText('2.500 requisições por segundo')).toBeInTheDocument();
    expect(screen.getByText('100% de integridade')).toBeInTheDocument();
    expect(screen.getByText('redução de 35%')).toBeInTheDocument();
  });
});
