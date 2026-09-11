import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Hero from '../Hero';

// Mock framer-motion to execute immediately
vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, onClick, style }, ref) => (
            <div ref={ref} className={className} onClick={onClick} style={style} data-testid="motion-div">
                {children}
            </div>
        )),
        span: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(({ children, className, style }, ref) => (
            <span ref={ref} className={className} style={style}>{children}</span>
        )),
        h1: ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={className}>{children}</h1>,
        p: ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={className}>{children}</p>,
        a: ({ children, className, href, 'aria-label': ariaLabel }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a className={className} href={href} aria-label={ariaLabel}>
                {children}
            </a>
        ),
    },
    useScroll: () => ({ scrollY: 0, scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
    useSpring: (val: unknown) => ({ get: () => val, set: vi.fn() }),
    useMotionValue: (val: unknown) => ({ get: () => val, set: vi.fn() }),
    useAnimationFrame: vi.fn(),
    useInView: () => true,
    useReducedMotion: () => false,
}));

describe('Hero Component', () => {
    it('renders correctly with primary headings and tagline', () => {
        render(<Hero />);

        expect(screen.getByText(/Engenharia de Software & Modernização/i)).toBeInTheDocument();
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('Software sob medida construído para escalar o seu negócio.');
        
        const subtitle = screen.getByText((_content, element) => {
            return Boolean(element && element.tagName.toLowerCase() === 'p' && /Da concepção à infraestrutura/i.test(element.textContent || ''));
        });
        expect(subtitle).toBeInTheDocument();
    });

    it('does not render CTA buttons in Hero section as requested', () => {
        render(<Hero />);

        expect(screen.queryByRole('link', { name: /Falar com a engenharia/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /Ver serviços/i })).not.toBeInTheDocument();
    });

    it('renders social proof and technical credentials', () => {
        render(<Hero />);

        expect(screen.getByText(/\+9 anos de experiência em sistemas críticos/i)).toBeInTheDocument();
        expect(screen.getByText(/Arquiteturas cloud-native/i)).toBeInTheDocument();
        expect(screen.getAllByText(/APIs resilientes/i).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Código limpo/i)).toBeInTheDocument();
    });

    it('renders tagline in overline layout without pill badge or pulse dot', () => {
        const { container } = render(<Hero />);

        const taglineText = screen.getByText(/Engenharia de Software & Modernização/i);
        expect(taglineText).toBeInTheDocument();
        expect(taglineText).toHaveClass('uppercase');
        expect(taglineText).toHaveClass('tracking-[0.2em]');

        // Ensure old pill badge classes and pulsing dot are absent
        expect(container.querySelector('.rounded-full.border-emerald-200\\/70')).not.toBeInTheDocument();
        expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();

        // Ensure flanking decorative lines exist with aria-hidden
        const hiddenSpans = container.querySelectorAll('span[aria-hidden="true"]');
        expect(hiddenSpans.length).toBeGreaterThanOrEqual(2);
    });
});
