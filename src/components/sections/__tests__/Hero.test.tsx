import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react'; // Added this import
import Hero from '../Hero';

// Mock framer-motion to execute immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, onClick }: React.HTMLAttributes<HTMLDivElement>) => (
            <div className={className} onClick={onClick} data-testid="motion-div">
                {children}
            </div>
        ),
        h1: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={className}>{children}</h1>,
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
        a: ({ children, className, href, 'aria-label': ariaLabel }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a className={className} href={href} aria-label={ariaLabel}>
                {children}
            </a>
        ),
    },
    useScroll: () => ({ scrollY: 0 }),
    useTransform: () => 1,
}));

// Mock Typewriter so we don't have to wait for typing animation
vi.mock('@/components/ui/typewriter', () => ({
    Typewriter: ({ text }: { text: string }) => <span>{text}</span>
}));

describe('Hero Component', () => {
    it('renders correctly with primary headings', () => {
        render(<Hero />);

        expect(screen.getByText(/Soluções Digitais/i)).toBeInTheDocument();
        expect(screen.getByText(/Sob Medida/i)).toBeInTheDocument();
        expect(screen.getByText(/Para Sua Empresa/i)).toBeInTheDocument();
        expect(screen.getByText(/Arquitetura de software robusta/i)).toBeInTheDocument();
    });

    it('renders CTAs with correct links', () => {
        render(<Hero />);

        const cta = screen.getByRole('link', { name: /Conheça os serviços da EPM DEVTECH/i });
        expect(cta).toHaveAttribute('href', '#servicos');
        expect(cta).toHaveTextContent(/Conheça os Serviços/i);
    });
});
