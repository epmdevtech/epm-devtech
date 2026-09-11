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
        expect(screen.getByText(/Prova Social & Autoridade/i)).toBeInTheDocument();
        expect(screen.getByText('Projetos em produção, não em portfólio')).toBeInTheDocument();
        expect(screen.queryByText(/Resultados comprovados na linha de frente/i)).not.toBeInTheDocument();
    });

    it('renders all 4 mission-critical metrics and their labels', () => {
        render(<Authority />);
        expect(screen.getByText('99,9%')).toBeInTheDocument();
        expect(screen.getByText('Uptime em ambientes de produção')).toBeInTheDocument();

        expect(screen.getByText('2.500+ RPS')).toBeInTheDocument();
        expect(screen.getByText('Throughput suportado em arquiteturas distribuídas')).toBeInTheDocument();

        expect(screen.getByText('+448 IES e 650 Escolas')).toBeInTheDocument();
        expect(screen.getByText('Impacto em plataformas educacionais e federais')).toBeInTheDocument();

        expect(screen.getByText('Zero Perda')).toBeInTheDocument();
        expect(screen.getByText('Integridade em dados regulatórios e integrações críticas')).toBeInTheDocument();
    });

    it('renders support text and all institutional badges', () => {
        render(<Authority />);
        expect(screen.getByText(/Engenharia comprovada em projetos e sistemas/i)).toBeInTheDocument();

        expect(screen.getByText('CAPES • MEC')).toBeInTheDocument();
        expect(screen.getByText('ONS')).toBeInTheDocument();
        expect(screen.getByText('(Operador Nacional do Sistema Elétrico)')).toBeInTheDocument();
        expect(screen.getByText('Energia Pecém')).toBeInTheDocument();
        expect(screen.getByText('Governo do MT')).toBeInTheDocument();
        expect(screen.getByText('(SEDUC)')).toBeInTheDocument();
        expect(screen.getByText('Indústria e Manufatura')).toBeInTheDocument();
        expect(screen.getByText('(IoT Industrial e ERP)')).toBeInTheDocument();
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Authority />);
        expect(screen.getByText('Projetos em produção, não em portfólio')).toBeInTheDocument();
        expect(screen.getByText('99,9%')).toBeInTheDocument();
    });
});
