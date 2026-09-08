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

        expect(screen.getByText(/Sobre a EPM DEVTECH/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de software com excelência técnica comprovada/i)).toBeInTheDocument();
        expect(screen.getByText(/fundada por Elessandro Prestes Macedo/i)).toBeInTheDocument();
    });

    it('renders the company stats with +9, 4 and 99,9% uptime', () => {
        render(<About />);

        const matchText = (text: string) => (content: string, element: Element | null) => {
            const hasText = (node: Element) => node.textContent === text;
            const elementHasText = element ? hasText(element) : false;
            const childrenDontHaveText = element ? Array.from(element.children).every(child => !hasText(child)) : true;
            return elementHasText && childrenDontHaveText;
        };

        expect(screen.getByText(matchText('+9'))).toBeInTheDocument();
        expect(screen.getAllByText((content, element) => element?.textContent === 'Anos de Experiência' || element?.textContent === 'Anos de Experiência')[0]).toBeInTheDocument();
        expect(screen.getByText(matchText('4'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => element?.textContent === 'Setores Críticos' || element?.textContent === 'Setores Críticos')).toBeInTheDocument();
        expect(screen.getByText(matchText('99,9%'))).toBeInTheDocument();
        expect(screen.getByText((content, element) => element?.textContent === 'Uptime em Produção' || element?.textContent === 'Uptime em Produção')).toBeInTheDocument();
    });

    it('renders the engineering pillars and technical leadership card', () => {
        render(<About />);

        expect(screen.getByText(/Liderança Técnica/i)).toBeInTheDocument();
        expect(screen.getByText(/Compromisso com arquitetura sólida/i)).toBeInTheDocument();

        expect(screen.getByText('Arquitetura para Escala')).toBeInTheDocument();
        expect(screen.getByText('Engenharia de Qualidade')).toBeInTheDocument();
        expect(screen.getByText('Governança e Previsibilidade')).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<About />);
        // Conteúdo sempre presente no DOM — apenas estado de animação muda
        expect(screen.getByText(/Sobre a EPM DEVTECH/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de software com excelência técnica comprovada/i)).toBeInTheDocument();
    });
});
