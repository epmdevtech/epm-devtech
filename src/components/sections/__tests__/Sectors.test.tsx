import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Sectors from '../Sectors';

// Mock framer-motion and useInView to trigger animations immediately
const mockUseInView = vi.fn().mockReturnValue(true);

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className} data-testid="motion-div">{children}</div>,
        h2: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={className}>{children}</h2>,
        h3: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={className}>{children}</h3>,
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
        span: ({ children, className }: React.HTMLAttributes<HTMLSpanElement>) => <span className={className}>{children}</span>,
    },
    useInView: (...args: unknown[]) => mockUseInView(...args),
}));

describe('Sectors Component', () => {
    it('renders sectors header and tagline', () => {
        render(<Sectors />);

        expect(screen.getByText(/Contextos de Negócio/i)).toBeInTheDocument();
        expect(screen.getByText(/Experiência em diferentes contextos/i)).toBeInTheDocument();
    });

    it('renders all 4 sector cards with 3D titles and badges', () => {
        render(<Sectors />);

        // Check titles
        expect(screen.getByText('Indústria')).toBeInTheDocument();
        expect(screen.getByText('Varejo')).toBeInTheDocument();
        expect(screen.getAllByText('Educação').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Energia').length).toBeGreaterThanOrEqual(1);

        // Check handles / subtitle tags
        expect(screen.getByText('OPERAÇÃO & MANUFATURA')).toBeInTheDocument();
        expect(screen.getByText('ALTO VOLUME & TRANSAÇÕES')).toBeInTheDocument();
        expect(screen.getByText('PLATAFORMAS INSTITUCIONAIS')).toBeInTheDocument();
        expect(screen.getByText('DADOS CRÍTICOS & REGULAÇÃO')).toBeInTheDocument();

        // Check step numbers
        expect(screen.getByText('01')).toBeInTheDocument();
        expect(screen.getByText('02')).toBeInTheDocument();
        expect(screen.getByText('03')).toBeInTheDocument();
        expect(screen.getByText('04')).toBeInTheDocument();
    });

    it('renders technical context descriptions', () => {
        render(<Sectors />);

        expect(screen.getByText(/Desenvolvemos soluções para automação de processos, rastreabilidade de chão de fábrica/i)).toBeInTheDocument();
        expect(screen.getByText(/Construímos arquiteturas escaláveis para comércio eletrônico, esteiras de checkout seguras/i)).toBeInTheDocument();
        expect(screen.getByText(/Executamos modernização arquitetural de plataformas de grande escala/i)).toBeInTheDocument();
        expect(screen.getByText(/Atuamos na concepção de sistemas distribuídos de monitoramento operacional/i)).toBeInTheDocument();
    });

    it('renders the mockup components inside the 3D cards', () => {
        render(<Sectors />);

        expect(screen.getByText('Controle de Produção')).toBeInTheDocument(); // MockupIndustria
        expect(screen.getByText('Gestão de Estoque')).toBeInTheDocument();     // MockupVarejo
        expect(screen.getByText('Impacto Institucional')).toBeInTheDocument(); // MockupEducacao
        expect(screen.getByText('Sistema Crítico')).toBeInTheDocument();       // MockupEnergia
    });

    it('renderiza corretamente quando useInView retorna false (antes de entrar no viewport)', () => {
        mockUseInView.mockReturnValueOnce(false);
        render(<Sectors />);
        expect(screen.getByText(/Contextos de Negócio/i)).toBeInTheDocument();
        expect(screen.getByText(/Experiência em diferentes contextos/i)).toBeInTheDocument();
    });
});
