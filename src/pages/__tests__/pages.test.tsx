import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';

import Home from '../Home';
import ServicesPage from '../ServicesPage';
import HowWeWorkPage from '../HowWeWorkPage';
import ExperiencePage from '../ExperiencePage';
import EngineeringPage from '../EngineeringPage';
import AboutPage from '../AboutPage';
import ContactPage from '../ContactPage';
import FAQPage from '../FAQPage';
import PageHeader from '@/components/ui/PageHeader';

// ─── Mocks ───────────────────────────────────────────────────────────────────
vi.mock('@/components/sections/Hero', () => ({
  default: () => <div data-testid="mock-hero">Hero</div>,
}));

vi.mock('@/components/sections/Contact', () => ({
  default: ({ hideHeader }: { hideHeader?: boolean }) => (
    <div data-testid="mock-contact" data-hide-header={hideHeader ? 'true' : 'false'}>
      Formulário de Contato
    </div>
  ),
}));

vi.mock('@/components/sections/FAQ', () => ({
  default: () => <div data-testid="mock-faq">FAQ</div>,
}));

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return ({ children, className, ...rest }: React.HTMLAttributes<HTMLElement>) => {
          return React.createElement(prop, { className, ...rest }, children);
        };
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useReducedMotion: () => false,
}));

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </HelmetProvider>
  );

describe('Rotas e Páginas Independentes (SPEC-060)', () => {
  it('PageHeader renderiza eyebrow, H1 e descrição semântica', () => {
    render(
      <PageHeader
        eyebrow="Arquitetura"
        title="Engenharia de Software"
        description="Padrões e práticas da EPM DevTech."
      />
    );
    expect(screen.getByText('Arquitetura')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Engenharia de Software' })).toBeInTheDocument();
    expect(screen.getByText('Padrões e práticas da EPM DevTech.')).toBeInTheDocument();
  });

  it('Home (/) renderiza hub comercial com H1 no Hero e blocos de resumo', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Engenharia sob medida para os gargalos da sua operação/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Engenharia previsível com contato direto com quem constrói/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Resultados comprovados em operações de grande escala/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: /Vamos entender o cenário da sua empresa\?/i })).not.toBeInTheDocument();
  });

  it('ServicesPage (/servicos) renderiza H1 e conteúdo de serviços', () => {
    renderWithProviders(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Soluções sob medida para cada estágio da sua operação/i })).toBeInTheDocument();
    expect(screen.getByText('SERVIÇOS')).toBeInTheDocument();
    expect(screen.getByText('Escopo bem alinhado')).toBeInTheDocument();
  });

  it('HowWeWorkPage (/como-trabalhamos) renderiza H1, metodologia e manifesto técnico', () => {
    renderWithProviders(<HowWeWorkPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Como trabalhamos' })).toBeInTheDocument();
    expect(screen.getByText('METODOLOGIA')).toBeInTheDocument();
    expect(screen.getByText('// GARANTIA OPERACIONAL')).toBeInTheDocument();
    expect(screen.getByText('Previsibilidade contratual e técnica')).toBeInTheDocument();
    expect(screen.getByText('Fale com um engenheiro')).toBeInTheDocument();
  });

  it('ExperiencePage (/experiencia) renderiza H1, Engineering Matrix, Enterprise Ledger e aviso ético', () => {
    renderWithProviders(<ExperiencePage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Experiência em projetos reais' })).toBeInTheDocument();
    expect(screen.getByText('EXPERIÊNCIA E ESCALA')).toBeInTheDocument();
    expect(screen.getByText('// MATRIZ DE VERTICAIS')).toBeInTheDocument();
    expect(screen.getByText('IoT INDUSTRIAL')).toBeInTheDocument();
    expect(screen.getByText('ALTA CONCORRÊNCIA')).toBeInTheDocument();
    expect(screen.getByText('// HISTÓRICO CORPORATIVO')).toBeInTheDocument();
    expect(screen.getByText('CAPES')).toBeInTheDocument();
    expect(screen.getByText('ONS')).toBeInTheDocument();
    expect(screen.getByText('Energia Pecém')).toBeInTheDocument();
    expect(screen.getByText(/Nota de contexto/i)).toBeInTheDocument();
    expect(screen.getByText(/Não são clientes da EPM DevTech/i)).toBeInTheDocument();
  });

  it('EngineeringPage (/engenharia) renderiza H1 e pilares de engenharia', () => {
    renderWithProviders(<EngineeringPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Engenharia pensada para evoluir' })).toBeInTheDocument();
    expect(screen.getByText('ENGENHARIA DE SOFTWARE')).toBeInTheDocument();
  });

  it('AboutPage (/sobre) renderiza H1, condução pelo fundador e registro formal', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Sobre a EPM DevTech' })).toBeInTheDocument();
    expect(screen.getByText('INSTITUCIONAL')).toBeInTheDocument();
    expect(screen.getByText(/Elessandro Prestes Macedo/i)).toBeInTheDocument();
    expect(screen.getByText(/60\.710\.574\/0001-85/i)).toBeInTheDocument();
  });

  it('ContactPage (/contato) renderiza H1 e formulário de contato', () => {
    renderWithProviders(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Fale sobre seu projeto' })).toBeInTheDocument();
    expect(screen.getByText('CONTATO')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });

  it('FAQPage (/duvidas-frequentes) renderiza H1 e perguntas frequentes', () => {
    renderWithProviders(<FAQPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Dúvidas frequentes' })).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });
});
