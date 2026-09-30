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
        expect(screen.getByText('Soluções sob medida para cada estágio da sua operação')).toBeInTheDocument();
        expect(screen.getByText(/Da criação de um novo produto à modernização de sistemas existentes/i)).toBeInTheDocument();
    });

    it('renders all 4 consolidated service cards with titles', () => {
        render(<Services />);
        const titles = [
            'Sistemas Web e Plataformas',
            'APIs & Back-end Escalável',
            'Integrações entre Sistemas',
            'Modernização & Evolução de Legados',
        ];
        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders pain trigger indicators and descriptions', () => {
        render(<Services />);
        expect(screen.getAllByText(/Quando precisa:/i).length).toBe(4);
        expect(screen.getByText(/Precisa criar um sistema novo ou modernizar a interface/i)).toBeInTheDocument();
        expect(screen.getByText(/Seu sistema sofre com lentidão em horários de pico/i)).toBeInTheDocument();
        expect(screen.getByText(/Sua operação perde tempo com processos manuais/i)).toBeInTheDocument();
        expect(screen.getByText(/Tem um sistema legado essencial que já não acompanha/i)).toBeInTheDocument();

        expect(screen.getByText(/Aplicações web sob medida para operações corporativas/i)).toBeInTheDocument();
        expect(screen.getByText(/Desenvolvimento de APIs RESTful e serviços de alta disponibilidade/i)).toBeInTheDocument();
        expect(screen.getByText(/Conexão segura entre ERPs, CRMs/i)).toBeInTheDocument();
        expect(screen.getByText(/Refatoração e migração incremental de plataformas legadas/i)).toBeInTheDocument();
    });

    it('renders mock visual elements inside cards', () => {
        render(<Services />);
        // Browser mockup
        expect(screen.getByText('Home')).toBeInTheDocument();
        // API mockup
        expect(screen.getByText('GET')).toBeInTheDocument();
        expect(screen.getByText(/200 OK/i)).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Services />);
        expect(screen.getByText('Soluções sob medida para cada estágio da sua operação')).toBeInTheDocument();
        expect(screen.getByText('Sistemas Web e Plataformas')).toBeInTheDocument();
    });
});
