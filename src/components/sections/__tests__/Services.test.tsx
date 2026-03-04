import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from '../Services';

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} data-testid="motion-div">{children}</div>
        ),
    },
    useInView: () => true,
}));

describe('Services Component', () => {
    it('renders section title', () => {
        render(<Services />);
        expect(screen.getByText(/Soluções/i)).toBeInTheDocument();
        expect(screen.getByText(/End-to-End/i)).toBeInTheDocument();
    });

    it('renders all 6 service cards with titles', () => {
        render(<Services />);
        const titles = [
            'Desenvolvimento de Sistemas Web',
            'APIs & Backends Robustos',
            'Integrações de Sistemas',
            'Arquitetura de Software',
            'Manutenção & Evolução',
            'Consultoria Técnica',
        ];
        titles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    it('renders service descriptions', () => {
        render(<Services />);
        expect(screen.getByText(/SPAs com Angular/i)).toBeInTheDocument();
        expect(screen.getByText(/APIs REST e SOAP/i)).toBeInTheDocument();
        expect(screen.getByText(/Suporte contínuo/i)).toBeInTheDocument();
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
});
