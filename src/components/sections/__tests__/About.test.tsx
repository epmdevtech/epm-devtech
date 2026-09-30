import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import About from '../About';

// Mock framer-motion and useInView to trigger animations immediately
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
    it('renders about header and description', () => {
        render(<About />);

        expect(screen.getByText(/Sobre a EPM DevTech/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de software com visão de negócio/i)).toBeInTheDocument();
        expect(screen.getByText(/A EPM DevTech é uma software house dedicada/i)).toBeInTheDocument();
    });

    it('renders the company stats with +9, 4 and 100% engenharia direta', () => {
        render(<About />);

        const stats = screen.getAllByTestId('animated-stat');
        expect(stats).toHaveLength(3);

        expect(stats[0]).toHaveTextContent('+');
        expect(stats[0]).toHaveTextContent('9');
        expect(stats[0]).toHaveTextContent('Anos de Experiência');

        expect(stats[1]).toHaveTextContent('4');
        expect(stats[1]).toHaveTextContent('Contextos de Negócio');

        expect(stats[2]).toHaveTextContent('100');
        expect(stats[2]).toHaveTextContent('%');
        expect(stats[2]).toHaveTextContent('Engenharia Direta');
    });

    it('renders the engineering pillars and technical leadership card', () => {
        render(<About />);

        expect(screen.getByText(/Liderança Técnica/i)).toBeInTheDocument();
        expect(screen.getByText(/Compromisso com arquitetura sólida/i)).toBeInTheDocument();

        expect(screen.getByText('Planejamento e Arquitetura')).toBeInTheDocument();
        expect(screen.getByText('Qualidade e Testes')).toBeInTheDocument();
        expect(screen.getByText('Previsibilidade e Governança')).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<About />);
        // Conteúdo sempre presente no DOM — apenas estado de animação muda
        expect(screen.getByText(/Sobre a EPM DevTech/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de software com visão de negócio/i)).toBeInTheDocument();
    });
});
