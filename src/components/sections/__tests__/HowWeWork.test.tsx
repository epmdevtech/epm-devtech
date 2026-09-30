import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import HowWeWork from '../HowWeWork';

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">{children}</div>
    ),
    p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={className}>{children}</p>
    ),
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('HowWeWork Component', () => {
  it('renders section header with title and subtitle', () => {
    render(<HowWeWork />);

    expect(screen.getByText(/Processo/i)).toBeInTheDocument();
    expect(screen.getByText('Como trabalhamos')).toBeInTheDocument();
    expect(screen.getByText(/Etapas estruturadas para transformar necessidades em software confiável/i)).toBeInTheDocument();
  });

  it('renders all 4 process steps with titles and descriptions', () => {
    render(<HowWeWork />);

    const stepTitles = ['Entendemos', 'Definimos', 'Desenvolvemos', 'Evoluímos'];
    stepTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    const stepNums = ['01', '02', '03', '04'];
    stepNums.forEach((num) => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });

    expect(screen.getByText(/Conhecemos o problema, o contexto e os objetivos do negócio/i)).toBeInTheDocument();
    expect(screen.getByText(/Transformamos necessidades em escopo, prioridades e abordagem/i)).toBeInTheDocument();
    expect(screen.getByText(/Construímos a solução de forma incremental e acompanhada/i)).toBeInTheDocument();
    expect(screen.getByText(/Entregamos, acompanhamos e evoluímos conforme o negócio cresce/i)).toBeInTheDocument();
  });

  it('renders the pipeline track and connectors', () => {
    const { container } = render(<HowWeWork />);

    expect(container.querySelector('.hww-pipeline')).toBeInTheDocument();
    expect(container.querySelector('.hww-pipeline-fill')).toBeInTheDocument();
    expect(container.querySelectorAll('.hww-dot')).toHaveLength(4);
    expect(container.querySelectorAll('.hww-card')).toHaveLength(4);
  });
});
