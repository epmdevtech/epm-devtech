import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Authority from '../Authority';

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} data-testid="motion-div">{children}</div>
        ),
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Authority / Trust Bar Component', () => {
    it('renders section header with eyebrow and title', () => {
        render(<Authority />);
        expect(screen.getByText(/Experiência & Contexto/i)).toBeInTheDocument();
        expect(screen.getByText('Sistemas construídos para operações que não podem parar')).toBeInTheDocument();
    });

    it('renders all 4 mission-critical metrics and their labels', () => {
        render(<Authority />);
        expect(screen.getByText('99,9%')).toBeInTheDocument();
        expect(screen.getByText('Disponibilidade observada em produção')).toBeInTheDocument();

        expect(screen.getByText('2.500+ RPS')).toBeInTheDocument();
        expect(screen.getByText('Throughput sustentado em arquitetura distribuída')).toBeInTheDocument();

        expect(screen.getByText('Zero Perda')).toBeInTheDocument();
        expect(screen.getByText('Integridade em conciliações de dados críticos')).toBeInTheDocument();

        expect(screen.getByText('Multi-setor')).toBeInTheDocument();
        expect(screen.getByText('Aplicações em Educação, Energia, Indústria e Varejo')).toBeInTheDocument();
    });

    it('renders support text and all institutional badges', () => {
        render(<Authority />);
        expect(screen.getByText(/Experiência técnica aplicada em setores estratégicos e operações críticas:/i)).toBeInTheDocument();

        expect(screen.getByText('Educação Superior & Redes')).toBeInTheDocument();
        expect(screen.getByText('(Plataformas Institucionais)')).toBeInTheDocument();
        expect(screen.getByText('Operação Energética')).toBeInTheDocument();
        expect(screen.getByText('(Dados Regulatórios)')).toBeInTheDocument();
        expect(screen.getByText('Indústria & Manufatura')).toBeInTheDocument();
        expect(screen.getByText('(IoT e Integração ERP)')).toBeInTheDocument();
        expect(screen.getByText('Varejo & E-commerce')).toBeInTheDocument();
        expect(screen.getByText('(Transações e Estoque)')).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Authority />);
        expect(screen.getByText('Sistemas construídos para operações que não podem parar')).toBeInTheDocument();
        expect(screen.getByText('99,9%')).toBeInTheDocument();
    });
});
