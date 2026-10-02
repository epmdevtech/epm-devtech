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
        article: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
            <article className={className} data-testid="motion-article">{children}</article>
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

    it('renders all 4 consolidated service cards with titles including institutional websites', () => {
        render(<Services />);
        const titles = [
            'Sistemas web e plataformas corporativas',
            'APIs e back-end de alta concorrência',
            'Integrações de dados entre sistemas',
            'Modernização de sistemas legados',
        ];
        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders Z-pattern section tags (SPEC-073)', () => {
        render(<Services />);
        expect(screen.getByText(/01 \/\/ WEB & PLATAFORMAS/i)).toBeInTheDocument();
        expect(screen.getByText(/02 \/\/ APIS & ALTA PERFORMANCE/i)).toBeInTheDocument();
        expect(screen.getByText(/03 \/\/ INTEGRAÇÃO DE DADOS/i)).toBeInTheDocument();
        expect(screen.getByText(/04 \/\/ MODERNIZAÇÃO/i)).toBeInTheDocument();
    });

    it('renders pain trigger indicators and descriptions', () => {
        render(<Services />);
        expect(screen.getAllByText(/Quando precisa:/i).length).toBe(4);
        expect(screen.getByText(/Sua equipe perde tempo gerenciando processos em planilhas desconectadas/i)).toBeInTheDocument();
        expect(screen.getByText(/O sistema atual trava ou fica lento em horários de pico/i)).toBeInTheDocument();
        expect(screen.getByText(/Sua equipe gasta horas do dia redigitando informações entre ERP/i)).toBeInTheDocument();
        expect(screen.getByText(/A empresa depende de um sistema antigo que ninguém tem coragem de mexer/i)).toBeInTheDocument();

        expect(screen.getByText(/Desenvolvemos sistemas internos, portais e ferramentas corporativas/i)).toBeInTheDocument();
        expect(screen.getByText(/Construímos APIs robustas e arquiteturas preparadas para absorver grandes picos/i)).toBeInTheDocument();
        expect(screen.getByText(/Criamos pontes automatizadas e seguras entre suas ferramentas/i)).toBeInTheDocument();
        expect(screen.getByText(/Substituímos e refatoramos módulos antigos passo a passo/i)).toBeInTheDocument();
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
    });
});
