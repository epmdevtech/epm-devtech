import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import FAQ from '../FAQ';

// Mock framer-motion and useInView to trigger animations immediately
const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">{children}</div>
    ),
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('FAQ Component', () => {
  it('renders section header and subtitle', () => {
    render(<FAQ />);

    expect(screen.getByText(/Dúvidas Frequentes/i)).toBeInTheDocument();
    expect(screen.getByText('As perguntas que sempre chegam primeiro')).toBeInTheDocument();
    expect(
      screen.getByText(/Respostas diretas sobre como começar um projeto/i)
    ).toBeInTheDocument();
  });

  it('renders all 8 strategic objection-removal questions including institutional websites', () => {
    render(<FAQ />);

    // 1. Especificação
    expect(
      screen.getByText(/Preciso ter o projeto totalmente especificado para iniciar o contato\?/i)
    ).toBeInTheDocument();

    // 2. Primeiro contato + diagnóstico
    expect(
      screen.getByText(/Como funciona o primeiro contato, o diagnóstico inicial e o tempo de retorno\?/i)
    ).toBeInTheDocument();

    // 3. Orçamento
    expect(
      screen.getByText(/Como é definido o orçamento e o modelo de trabalho\?/i)
    ).toBeInTheDocument();

    // 4. Atendimento remoto
    expect(
      screen.getByText(/A EPM DevTech atende clientes fora de Toledo \(PR\) ou no exterior\?/i)
    ).toBeInTheDocument();

    // 5. Sistemas existentes
    expect(
      screen.getByText(/Vocês assumem, mantêm ou evoluem sistemas desenvolvidos por outra empresa\?/i)
    ).toBeInTheDocument();

    // 6. Modernização sem interrupção
    expect(
      screen.getByText(/É possível modernizar um sistema legado sem interromper a operação\?/i)
    ).toBeInTheDocument();

    // 7. Início do projeto (com SDD leigo e canal direto)
    expect(
      screen.getByText(/Como funciona o início de um projeto\?/i)
    ).toBeInTheDocument();

    // 8. Sites institucionais
    expect(
      screen.getByText(/Vocês desenvolvem sites institucionais\?/i)
    ).toBeInTheDocument();
  });

  it('renders category badges', () => {
    render(<FAQ />);

    expect(screen.getAllByText('Contratação').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sistemas').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Processo').length).toBeGreaterThanOrEqual(1);
  });

  it('opens an accordion item on trigger click', () => {
    render(<FAQ />);

    const trigger = screen.getByText(/Preciso ter o projeto totalmente especificado para iniciar o contato\?/i);
    fireEvent.click(trigger);

    expect(
      screen.getByText(/Não\. Você não precisa ter documentação técnica pronta/i)
    ).toBeInTheDocument();
  });

  it('renders bottom CTA linking to #contato', () => {
    render(<FAQ />);

    const cta = screen.getByRole('link', { name: /Falar sobre meu projeto →/i });
    expect(cta).toHaveAttribute('href', '#contato');
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<FAQ />);
    expect(screen.getByText('As perguntas que sempre chegam primeiro')).toBeInTheDocument();
  });
});
