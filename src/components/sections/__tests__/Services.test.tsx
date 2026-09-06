import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Services from '../Services';

const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} data-testid="motion-div">{children}</div>
        ),
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Services Component', () => {
    it('renders section title', () => {
        render(<Services />);
        expect(screen.getByText('Soluções de engenharia de ponta a ponta')).toBeInTheDocument();
        expect(screen.getByText(/Do planejamento à entrega em produção/i)).toBeInTheDocument();
    });

    it('renders all 6 service cards with titles', () => {
        render(<Services />);
        const titles = [
            'Desenvolvimento Web e Aplicações SPA',
            'APIs e Backends Escaláveis',
            'Integrações e Microsserviços',
            'Arquitetura de Software',
            'Modernização e Evolução de Legados',
            'Consultoria Técnica e Code Review',
        ];
        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders service descriptions', () => {
        render(<Services />);
        expect(screen.getByText(/Interfaces modernas, responsivas e performáticas com Angular/i)).toBeInTheDocument();
        expect(screen.getByText(/arquiteturas orientadas a eventos em PHP/i)).toBeInTheDocument();
        expect(screen.getByText(/microsserviços e monólitos modulares com Clean Architecture/i)).toBeInTheDocument();
        expect(screen.getByText(/Strangler Fig Pattern/i)).toBeInTheDocument();
    });

    it('renders mock visual elements inside cards', () => {
        render(<Services />);
        // Browser mockup
        expect(screen.getByText('Home')).toBeInTheDocument();
        // API mockup
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText(/200 OK/i)).toBeInTheDocument();
        // Integration mockup
        expect(screen.getByText('API Hub')).toBeInTheDocument();
        // Maintenance mockup
        expect(screen.getByText('legacy')).toBeInTheDocument();
        expect(screen.getByText('refactored')).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Services />);
        expect(screen.getByText('Soluções de engenharia de ponta a ponta')).toBeInTheDocument();
        expect(screen.getByText('Desenvolvimento Web e Aplicações SPA')).toBeInTheDocument();
    });
});
