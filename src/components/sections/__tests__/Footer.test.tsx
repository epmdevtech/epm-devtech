import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import Footer from '../Footer';

// ─── Theme Provider ───────────────────────────────────────────────────────────
const mockSetTheme = vi.fn();
let mockTheme = 'dark';

vi.mock('@/components/theme-provider', () => ({
    useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

// ─── Framer Motion ────────────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => <div className={className}>{children}</div>,
        footer: ({ children, className }: React.HTMLAttributes<HTMLElement>) => <footer className={className}>{children}</footer>,
        a: ({ children, className, href }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className={className} href={href}>{children}</a>,
        li: ({ children, className }: React.LiHTMLAttributes<HTMLLIElement>) => <li className={className}>{children}</li>,
    },
}));

// ─── Lucide Icons ─────────────────────────────────────────────────────────────
vi.mock('lucide-react', () => ({
    Mail: () => <span>MailIcon</span>,
    Phone: () => <span>PhoneIcon</span>,
    MapPin: () => <span>MapPinIcon</span>,
    Instagram: () => <span>InstagramIcon</span>,
    Linkedin: () => <span>LinkedinIcon</span>,
    ArrowUpRight: () => <span>ArrowIcon</span>,
    Moon: () => <span>MoonIcon</span>,
    Sun: () => <span>SunIcon</span>,
    Monitor: () => <span>MonitorIcon</span>,
}));

// ─────────────────────────────────────────────────────────────────────────────

describe('Footer Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTheme = 'dark';
    });

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
        expect(screen.getByText('LinkedIn')).toBeInTheDocument();
        expect(screen.getByText('Instagram')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        render(<Footer />);
        const currentYear = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`@EPM DEVTECH ${currentYear}. Todos os direitos reservados.`, 'i'))).toBeInTheDocument();
    });

    // ── ThemeSwitcher ─────────────────────────────────────────────────────────

    it('renders the theme switcher with all 3 options', () => {
        render(<Footer />);
        expect(screen.getByRole('radiogroup', { name: /Selecionar tema/i })).toBeInTheDocument();
        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('marca o tema ativo (dark) com aria-checked="true"', () => {
        mockTheme = 'dark';
        render(<Footer />);
        expect(screen.getByTitle('Tema Dark')).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByTitle('Tema Light')).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByTitle('Tema System')).toHaveAttribute('aria-checked', 'false');
    });

    it('marca o tema ativo (light) com aria-checked="true"', () => {
        mockTheme = 'light';
        render(<Footer />);
        expect(screen.getByTitle('Tema Light')).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByTitle('Tema Dark')).toHaveAttribute('aria-checked', 'false');
    });

    it('chama setTheme("light") ao clicar no botão Light', () => {
        render(<Footer />);
        fireEvent.click(screen.getByTitle('Tema Light'));
        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('chama setTheme("system") ao clicar no botão System', () => {
        render(<Footer />);
        fireEvent.click(screen.getByTitle('Tema System'));
        expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('chama setTheme("dark") ao clicar no botão Dark', () => {
        mockTheme = 'light';
        render(<Footer />);
        fireEvent.click(screen.getByTitle('Tema Dark'));
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
});
