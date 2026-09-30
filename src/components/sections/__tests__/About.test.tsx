import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import About from '../About';

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className} data-testid="motion-div">{children}</div>,
    h2: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={className}>{children}</h2>,
    h3: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={className}>{children}</h3>,
    h4: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={className}>{children}</h4>,
    p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
    span: ({ children, className }: React.HTMLAttributes<HTMLSpanElement>) => <span className={className}>{children}</span>,
  },
  useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('About Component', () => {
  it('renders about header and description with truthful leadership attribution', () => {
    render(<About />);

    expect(screen.getByText(/Sobre a empresa/i)).toBeInTheDocument();
    expect(screen.getByText(/Engenharia de software com visão de negócio/i)).toBeInTheDocument();
    expect(screen.getByText(/A EPM DevTech é uma software house dedicada/i)).toBeInTheDocument();
    expect(screen.getByText(/mais de 9 anos de experiência prática em projetos corporativos/i)).toBeInTheDocument();
  });

  it('renders single consolidated technical leadership stat (+9 Anos)', () => {
    render(<About />);

    const stats = screen.getAllByTestId('animated-stat');
    expect(stats).toHaveLength(1);

    expect(stats[0]).toHaveTextContent('+');
    expect(stats[0]).toHaveTextContent('9');
    expect(stats[0]).toHaveTextContent(/anos de experiência técnica/i);
  });

  it('renders the founder and technical leadership card soberly', () => {
    render(<About />);

    expect(screen.getByText(/Fundador e liderança técnica/i)).toBeInTheDocument();
    expect(screen.getByText('Elessandro Prestes Macedo')).toBeInTheDocument();
    expect(screen.getByText(/Atua na arquitetura, escolha tecnológica e condução técnica dos projetos/i)).toBeInTheDocument();
    expect(screen.getByText(/Arquitetura de software & governança técnica/i)).toBeInTheDocument();
  });

  it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
    mockUseInView.mockReturnValueOnce(false);
    render(<About />);
    expect(screen.getByText(/Sobre a empresa/i)).toBeInTheDocument();
    expect(screen.getByText(/Engenharia de software com visão de negócio/i)).toBeInTheDocument();
  });
});
