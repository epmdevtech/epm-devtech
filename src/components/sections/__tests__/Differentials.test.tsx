import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Differentials from '../Differentials';

const mockUseInView = vi.fn().mockReturnValue(true);

// Mock framer-motion and useInView to execute immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className} data-testid="motion-div">{children}</div>,
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Differentials Component', () => {
    it('renders section header with title and no subtitle', () => {
        render(<Differentials />);

        expect(screen.getByText(/Diferenciais/i)).toBeInTheDocument();
        expect(screen.getByText('Por que escolher a EPM DEVTECH')).toBeInTheDocument();
        expect(screen.queryByText(/Rigor de engenharia, arquitetura escalável e compromisso com entregas previsíveis/i)).not.toBeInTheDocument();
    });

    it('renders the pipeline track and fill', () => {
        const { container } = render(<Differentials />);

        // Using container query for specific DOM classes we know exist
        expect(container.querySelector('.diff-pipeline')).toBeInTheDocument();
        expect(container.querySelector('.diff-pipeline-fill')).toBeInTheDocument();
    });

    it('renders all 6 differential cards with updated titles, tags and step numbers', () => {
        render(<Differentials />);

        const titles = [
            'Comunicação Transparente',
            'Arquitetura Planejada',
            'Código Limpo e Testável',
            'Padrões de Engenharia',
            'Esteira DevOps e CI/CD',
            'Entregas Previsíveis',
        ];

        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        const stepNums = ['01', '02', '03', '04', '05', '06'];
        stepNums.forEach(num => {
            expect(screen.getByText(num)).toBeInTheDocument();
        });

        const tags = [
            'ALINHAMENTO • PREVISIBILIDADE',
            'MICROSSERVIÇOS • CLEAN ARCHITECTURE',
            'SOLID • TESTES AUTOMATIZADOS',
            'SONARQUBE • CODE REVIEW',
            'DEPLOY SEGURO • ROLLBACK',
            'PRAZOS REAIS • QUALIDADE',
        ];
        tags.forEach(tag => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    it('renders technical descriptions of differentials', () => {
        render(<Differentials />);
        expect(screen.getByText(/alinhamento direto com quem realmente executa a engenharia/i)).toBeInTheDocument();
        expect(screen.getByText(/Sistemas projetados para crescer sem criar gargalos técnicos/i)).toBeInTheDocument();
        expect(screen.getByText(/Pipelines automatizados com validações estritas/i)).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Differentials />);
        expect(screen.getByText('Por que escolher a EPM DEVTECH')).toBeInTheDocument();
        expect(screen.getByText('Comunicação Transparente')).toBeInTheDocument();
    });
});
