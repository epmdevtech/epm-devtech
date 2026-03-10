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
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('About Component', () => {
    it('renders about header and description', () => {
        render(<About />);

        expect(screen.getByText(/Sobre a EPM DEVTECH/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de Software com/i)).toBeInTheDocument();
    });

    it('renders the company stats', () => {
        render(<About />);

        expect(screen.getByText('+9')).toBeInTheDocument();
        expect(screen.getAllByText(/Anos de Experiência/i)[0]).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText(/Setores Atendidos/i)).toBeInTheDocument();
        expect(screen.getByText('100%')).toBeInTheDocument();
        expect(screen.getByText(/Comprometimento/i)).toBeInTheDocument();
    });

    it('renders the 4 featured cards', () => {
        render(<About />);

        // Check titles
        expect(screen.getByText('Indústria')).toBeInTheDocument();
        expect(screen.getByText('Varejo')).toBeInTheDocument();
        expect(screen.getByText('Educação')).toBeInTheDocument();
        expect(screen.getByText('Energia')).toBeInTheDocument();

        // Check handles / subtitle tags
        expect(screen.getByText('MANUFATURA')).toBeInTheDocument();
        expect(screen.getByText('E-COMMERCE')).toBeInTheDocument();
        expect(screen.getByText('CAPES · MEC · GOVERNO FEDERAL')).toBeInTheDocument();
        expect(screen.getByText('ONS · ENERGIA PECÉM')).toBeInTheDocument();
    });

    it('renders the mockup components inside the cards', () => {
        render(<About />);

        expect(screen.getByText('Controle de Produção')).toBeInTheDocument(); // MockupIndustria
        expect(screen.getByText('Gestão de Estoque')).toBeInTheDocument();
        expect(screen.getByText('Impacto Institucional')).toBeInTheDocument();
        expect(screen.getByText('Sistema Crítico')).toBeInTheDocument();  // MockupEnergia
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<About />);
        // Conteúdo sempre presente no DOM — apenas estado de animação muda
        expect(screen.getByText(/Sobre a EPM DEVTECH/i)).toBeInTheDocument();
        expect(screen.getByText(/Engenharia de Software com/i)).toBeInTheDocument();
    });
});
