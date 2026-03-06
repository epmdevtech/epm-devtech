import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Footer from '../Footer';

vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className}>{children}</div>,
        footer: ({ children, className }: React.HTMLAttributes<HTMLElement>) => <footer className={className}>{children}</footer>,
        a: ({ children, className, href }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className={className} href={href}>{children}</a>,
        li: ({ children, className }: React.LiHTMLAttributes<HTMLLIElement>) => <li className={className}>{children}</li>,
    },
}));

vi.mock('lucide-react', () => ({
    Mail: () => <span>MailIcon</span>,
    Phone: () => <span>PhoneIcon</span>,
    MapPin: () => <span>MapPinIcon</span>,
    Instagram: () => <span>InstagramIcon</span>,
    Linkedin: () => <span>LinkedinIcon</span>,
    Twitter: () => <span>TwitterIcon</span>,
    Github: () => <span>GithubIcon</span>,
    ArrowUpRight: () => <span>ArrowIcon</span>,
    Moon: () => <span>MoonIcon</span>,
    Sun: () => <span>SunIcon</span>,
    Monitor: () => <span>MonitorIcon</span>,
}));

describe('Footer Component', () => {
    it('renders the branding and tagline', () => {
        render(<Footer />);
        expect(screen.getByAltText('EPM DEVTECH')).toBeInTheDocument();
        expect(screen.getByText(/Arquitetura de software robusta/i)).toBeInTheDocument();
    });

    it('renders the navigation columns', () => {
        render(<Footer />);
        expect(screen.getByText('Soluções')).toBeInTheDocument();
        expect(screen.getByText('Sistemas Web')).toBeInTheDocument();

        expect(screen.getByText('Empresa')).toBeInTheDocument();
        expect(screen.getByText('Sobre nós')).toBeInTheDocument();

        expect(screen.getByText('Contato')).toBeInTheDocument();
        expect(screen.getByText('Fale Conosco')).toBeInTheDocument();
    });

    it('renders social links', () => {
        render(<Footer />);
        expect(screen.getByText('X (Twitter)')).toBeInTheDocument();
        expect(screen.getByText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByText('GitHub')).toBeInTheDocument();
    });

    it('renders the theme switcher options', () => {
        render(<Footer />);
        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`@EPM DEVTECH ${currentYear}. Todos os direitos reservados.`, 'i'))).toBeInTheDocument();
    });
});
