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
    it('renders correctly with primary headings and tagline', () => {
        render(<Hero />);

        expect(screen.getByText(/Engenharia de Software & Modernização/i)).toBeInTheDocument();
        expect(screen.getByText(/Software sob medida/i)).toBeInTheDocument();
        expect(screen.getByText(/construído para escalar/i)).toBeInTheDocument();
        expect(screen.getByText(/o seu negócio/i)).toBeInTheDocument();
        expect(screen.getByText(/Da concepção à infraestrutura/i)).toBeInTheDocument();
    });

    it('renders dual CTAs with correct links and accessible labels', () => {
        render(<Hero />);

        const primaryCta = screen.getByRole('link', { name: /Falar sobre meu projeto com a EPM DEVTECH/i });
        expect(primaryCta).toHaveAttribute('href', '#contato');
        expect(primaryCta).toHaveTextContent(/Falar sobre meu projeto/i);

        const secondaryCta = screen.getByRole('link', { name: /Conhecer serviços da EPM DEVTECH/i });
        expect(secondaryCta).toHaveAttribute('href', '#servicos');
        expect(secondaryCta).toHaveTextContent(/Conhecer serviços/i);
    });

    it('renders social proof and technical credentials', () => {
        render(<Hero />);

        expect(screen.getByText(/\+9 anos de experiência em sistemas críticos/i)).toBeInTheDocument();
        expect(screen.getByText(/Arquiteturas cloud-native/i)).toBeInTheDocument();
        expect(screen.getAllByText(/APIs resilientes/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Código limpo/i)).toBeInTheDocument();
    });
});
