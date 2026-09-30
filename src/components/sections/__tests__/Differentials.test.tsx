import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Differentials from '../Differentials';

const mockUseInView = vi.fn().mockReturnValue(true);

// Mock framer-motion and useInView to execute immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className} data-testid="motion-div">{children}</div>,
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Differentials Component', () => {
    it('renders section header with title and subtitle', () => {
        render(<Differentials />);

        expect(screen.getByText(/Diferenciais/i)).toBeInTheDocument();
        expect(screen.getByText('Por que trabalhar com a EPM DevTech')).toBeInTheDocument();
        expect(screen.getByText(/Engenharia focada na longevidade do seu software/i)).toBeInTheDocument();
    });

    it('renders the pipeline track and fill', () => {
        const { container } = render(<Differentials />);

        // Using container query for specific DOM classes we know exist
        expect(container.querySelector('.diff-pipeline')).toBeInTheDocument();
        expect(container.querySelector('.diff-pipeline-fill')).toBeInTheDocument();
    });

    it('renders all 3 consolidated differential cards with updated titles, tags and step numbers', () => {
        render(<Differentials />);

        const titles = [
            'Comunicação Transparente',
            'Engenharia que Facilita Evoluir',
            'Foco no Problema do Negócio',
        ];

        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        const stepNums = ['01', '02', '03'];
        stepNums.forEach(num => {
            expect(screen.getByText(num)).toBeInTheDocument();
        });

        const tags = [
            'ALINHAMENTO & PREVISIBILIDADE',
            'ARQUITETURA & MANUTENÇÃO',
            'PRAGMATISMO & RESULTADO',
        ];
        tags.forEach(tag => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it('renders technical descriptions and secondary engineering practices line', () => {
        render(<Differentials />);
        expect(screen.getByText(/Alinhamento contínuo sobre escopo, decisões técnicas e prioridades/i)).toBeInTheDocument();
        expect(screen.getByText(/Arquitetura modular e código limpo pensados para facilitar manutenções futuras/i)).toBeInTheDocument();
        expect(screen.getByText(/A tecnologia é uma ferramenta para viabilizar os objetivos da sua empresa/i)).toBeInTheDocument();
        expect(screen.getByText(/Práticas aplicadas conforme cada projeto: testes automatizados/i)).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Differentials />);
        expect(screen.getByText('Por que trabalhar com a EPM DevTech')).toBeInTheDocument();
        expect(screen.getByText('Comunicação Transparente')).toBeInTheDocument();
    });
});
