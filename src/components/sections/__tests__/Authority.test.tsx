import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Authority from '../Authority';

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} data-testid="motion-div">{children}</div>
        ),
    },
    useInView: () => true,
}));

describe('Authority / Credentials Component', () => {
    it('renders section header', () => {
        render(<Authority />);
        expect(screen.getByText(/Credenciais/i)).toBeInTheDocument();
        expect(screen.getByText(/Gera Resultados/i)).toBeInTheDocument();
        // 'Técnica' appears in the h2 gradient span — verify it's rendered
        expect(screen.getAllByText(/Técnica/i).length).toBeGreaterThan(0);
    });

    it('renders all credential card titles', () => {
        render(<Authority />);
        const titles = [
            'Experiência Profissional.',
            'Perfil Full Stack Sênior.',
            'Experiência Multi-Setor.',
            'Práticas de Engenharia.',
            'Compromisso com Resultados.',
        ];
        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders credential handles', () => {
        render(<Authority />);
        expect(screen.getByText('GRANDES PROJETOS')).toBeInTheDocument();
        expect(screen.getByText('BACKEND · FRONTEND · INFRA')).toBeInTheDocument();
        expect(screen.getByText('CLEAN CODE · CI/CD · TDD')).toBeInTheDocument();
    });

    it('renders credential descriptions', () => {
        render(<Authority />);
        expect(screen.getByText(/projetos de médio e grande porte/i)).toBeInTheDocument();
        expect(screen.getByText(/entregues dentro do prazo/i)).toBeInTheDocument();
    });
});
