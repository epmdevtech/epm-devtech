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
    it('renders section header', () => {
        render(<Differentials />);

        expect(screen.getByText(/Por Que Escolher a/i)).toBeInTheDocument();
        expect(screen.getByText(/EPM DEVTECH/i)).toBeInTheDocument();
    });

    it('renders the pipeline track and fill', () => {
        const { container } = render(<Differentials />);

        // Using container query for specific DOM classes we know exist
        expect(container.querySelector('.diff-pipeline')).toBeInTheDocument();
        expect(container.querySelector('.diff-pipeline-fill')).toBeInTheDocument();
    });

    it('renders all 6 differential cards', () => {
        render(<Differentials />);

        const titles = [
            'Código Limpo & Testável',
            'Arquitetura Bem Definida',
            'Versionamento & CI/CD',
            'Comunicação Profissional',
            'Entrega Responsável',
            'Boas Práticas'
        ];

        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        const stepNums = ['01', '02', '03', '04', '05', '06'];
        stepNums.forEach(num => {
            expect(screen.getByText(num)).toBeInTheDocument();
        });
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Differentials />);
        expect(screen.getByText(/Por Que Escolher a/i)).toBeInTheDocument();
        expect(screen.getByText('Código Limpo & Testável')).toBeInTheDocument();
    });
});
