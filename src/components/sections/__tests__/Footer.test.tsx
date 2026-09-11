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
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className}>{children}</div>
    ),
    footer: ({ children, className }: React.HTMLAttributes<HTMLElement>) => (
      <footer className={className}>{children}</footer>
    ),
    a: ({ children, className, href }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className={className} href={href}>{children}</a>
    ),
    li: ({ children, className }: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li className={className}>{children}</li>
    ),
  },
  useInView: () => true,
}));

// ─── Lucide Icons ─────────────────────────────────────────────────────────────
vi.mock('lucide-react', () => ({
  Mail: () => <span>MailIcon</span>,
  Phone: () => <span>PhoneIcon</span>,
  Clock: () => <span>ClockIcon</span>,
  MapPin: () => <span>MapPinIcon</span>,
  Github: () => <span>GithubIcon</span>,
  Linkedin: () => <span>LinkedinIcon</span>,
  Moon: () => <span>MoonIcon</span>,
  Sun: () => <span>SunIcon</span>,
  Monitor: () => <span>MonitorIcon</span>,
  FileText: () => <span>FileTextIcon</span>,
  ShieldCheck: () => <span>ShieldCheckIcon</span>,
  X: () => <span>XIcon</span>,
}));

// ─────────────────────────────────────────────────────────────────────────────

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTheme = 'dark';
  });

  it('renders branding, positioning text and location in column 1', () => {
    render(<Footer />);
    expect(screen.getAllByAltText('EPM DEVTECH').length).toBeGreaterThan(0);
    expect(
      screen.getByText(/Engenharia de software sob medida, arquitetura de sistemas críticos/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Toledo, Paraná.')).toBeInTheDocument();

    // Confirma que o bloco cadastral vertical foi removido da coluna 1
    expect(
      screen.queryByText(/ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Nome Fantasia: EPM DEVTECH \(ME\)/i)).not.toBeInTheDocument();
  });

  it('renders the 4 columns with titles and links without obsolete contact response text', () => {
    render(<Footer />);

    // Coluna 2: Soluções
    expect(screen.getByRole('heading', { name: /Soluções/i })).toBeInTheDocument();
    expect(screen.getByText('Desenvolvimento Web e SPAs')).toBeInTheDocument();
    expect(screen.getByText('APIs e Microsserviços')).toBeInTheDocument();
    expect(screen.getByText('Modernização de Legados')).toBeInTheDocument();
    expect(screen.getByText('Arquitetura de Software')).toBeInTheDocument();
    expect(screen.getByText('Consultoria Técnica e Code Review')).toBeInTheDocument();

    // Coluna 3: Navegação
    expect(screen.getByRole('heading', { name: /Navegação/i })).toBeInTheDocument();
    expect(screen.getByText('Sobre a Empresa')).toBeInTheDocument();
    expect(screen.getByText('Setores de Atuação')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Tecnologias')).toBeInTheDocument();
    expect(screen.getByText('Diferenciais')).toBeInTheDocument();
    expect(screen.getByText('Dúvidas Frequentes')).toBeInTheDocument();
    expect(screen.getByText('Fale Conosco')).toBeInTheDocument();

    // Coluna 4: Contato
    expect(screen.getByRole('heading', { name: /Contato/i })).toBeInTheDocument();
    expect(screen.getByText('elessandro@epmdevtech.com.br')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp: (45) 99917-8290')).toBeInTheDocument();
    expect(screen.queryByText('Retorno técnico em até 24 horas úteis')).not.toBeInTheDocument();
  });

  it('renders social links for GitHub and LinkedIn', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/Perfil da EPM DEVTECH no GitHub/i)).toHaveAttribute(
      'href',
      'https://github.com/ElessandroPrestes'
    );
    expect(screen.getByLabelText(/Perfil da EPM DEVTECH no LinkedIn/i)).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/elessandro-prestes-macedo/'
    );
  });

  it('renders copyright with CNPJ and legal links in sub-footer, without obsolete value phrase', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} EPM DEVTECH.*CNPJ 60\\.710\\.574\\/0001-85.*Todos os direitos reservados\\.`, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Código limpo, arquitetura sólida e alta disponibilidade.')
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Termos de Uso/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Política de Privacidade/i })).toBeInTheDocument();
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
