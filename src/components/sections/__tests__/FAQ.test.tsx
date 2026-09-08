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
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument();
    expect(
      screen.getByText(/Respostas diretas sobre como iniciamos projetos/i)
    ).toBeInTheDocument();
  });

  it('renders all strategic objection-removal questions', () => {
    render(<FAQ />);

    // Contratação
    expect(
      screen.getByText(/Preciso ter o projeto totalmente especificado para iniciar o contato\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Como funciona o primeiro contato e qual é o tempo de retorno\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Como é definido o orçamento e o modelo de trabalho\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A EPM DEVTECH atende clientes fora de Toledo no Paraná ou no exterior\?/i)
    ).toBeInTheDocument();

    // Legados
    expect(
      screen.getByText(/Vocês conseguem assumir ou evoluir um sistema desenvolvido por outra empresa\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/É possível modernizar um sistema legado sem interromper a operação da empresa\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Vocês trabalham com estabilização e manutenção de sistemas em produção\?/i)
    ).toBeInTheDocument();

    // Processo
    expect(
      screen.getByText(/Como funciona o diagnóstico técnico inicial\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A comunicação durante o projeto é diretamente com quem desenvolve\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Como funciona o início do projeto com a metodologia Spec-Driven Development\?/i)
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

    const cta = screen.getByRole('link', { name: /Fale diretamente com a equipe técnica →/i });
    expect(cta).toHaveAttribute('href', '#contato');
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<FAQ />);
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument();
  });
});
