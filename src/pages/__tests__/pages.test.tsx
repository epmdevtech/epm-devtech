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
  it('PageHeader renderiza eyebrow, H1, descrição semântica e children opcionais', () => {
    render(
      <PageHeader
        eyebrow="Arquitetura"
        title="Engenharia de Software"
        description="Padrões e práticas da EPM DevTech."
      >
        <button type="button">Ação de Teste</button>
      </PageHeader>
    );
    expect(screen.getByText('Arquitetura')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Engenharia de Software' })).toBeInTheDocument();
    expect(screen.getByText('Padrões e práticas da EPM DevTech.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ação de Teste' })).toBeInTheDocument();
  });

  it('Home (/) renderiza hub comercial com H1 no Hero e blocos de resumo', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Engenharia sob medida para os gargalos da sua operação/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Engenharia previsível com contato direto com quem constrói/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Resultados comprovados em operações de grande escala/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: /Vamos entender o cenário da sua empresa\?/i })).not.toBeInTheDocument();
  });

  it('ServicesPage (/services) renderiza H1, CTA de conversa e conteúdo de serviços sem CTA final redundante', () => {
    renderWithProviders(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1, name: /Soluções de software sob medida para destravar sua empresa/i })).toBeInTheDocument();
    expect(screen.getByText('SERVIÇOS')).toBeInTheDocument();
    const ctaButton = screen.getByRole('link', { name: /Conversar sobre seu projeto/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/contact');
    expect(screen.getByText('Escopo e metas claras')).toBeInTheDocument();
    expect(screen.queryByText('Iniciar diagnóstico do projeto')).not.toBeInTheDocument();
  });

  it('HowWeWorkPage (/how-we-work) renderiza H1, metodologia e manifesto técnico sem CTA final redundante', () => {
    renderWithProviders(<HowWeWorkPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Como trabalhamos' })).toBeInTheDocument();
    expect(screen.getByText('METODOLOGIA')).toBeInTheDocument();
    expect(screen.getByText('// GARANTIA OPERACIONAL')).toBeInTheDocument();
    expect(screen.getByText('Previsibilidade do início ao fim')).toBeInTheDocument();
    expect(screen.getByText('Sem intermediários, sem ruído')).toBeInTheDocument();
    expect(screen.queryByText('Fale com um engenheiro')).not.toBeInTheDocument();
  });

  it('ExperiencePage (/experience) renderiza H1, Engineering Matrix, Enterprise Ledger e aviso ético sem CTA final redundante', () => {
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
    expect(screen.queryByText('Sua empresa tem uma demanda de alta complexidade?')).not.toBeInTheDocument();
  });

  it('EngineeringPage (/engineering) renderiza H1, Filosofia de Execução, Pipeline CI/CD e Architectural Blueprint sem CTA final redundante', () => {
    renderWithProviders(<EngineeringPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Engenharia pensada para evoluir' })).toBeInTheDocument();
    expect(screen.getByText('ENGENHARIA DE SOFTWARE')).toBeInTheDocument();
    expect(screen.getByText('// FILOSOFIA DE EXECUÇÃO')).toBeInTheDocument();
    expect(screen.getByText('// PIPELINE DE QUALIDADE')).toBeInTheDocument();
    expect(screen.getByText(/quality-gate\.yml/i)).toBeInTheDocument();
    expect(screen.getByText('// ESPECIALIDADES & STACK')).toBeInTheDocument();
    expect(screen.getByText('Nossas especialidades técnicas')).toBeInTheDocument();
    expect(screen.queryByText('Precisa de engenharia sólida no seu produto ou sistema interno?')).not.toBeInTheDocument();
  });

  it('AboutPage (/about) renderiza Hero editorial monocromático com H1, subtítulo, timeline e manifesto sem trust marks, dados burocráticos ou CTA final redundante', () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Transformando desafios em soluções que funcionam' })).toBeInTheDocument();
    expect(screen.getByText(/\[ QUEM SOMOS \/\/ POSICIONAMENTO \]/i)).toBeInTheDocument();
    expect(screen.getByText('Unimos tecnologia, experiência e visão de negócio para criar soluções digitais que simplificam operações e geram resultados reais.')).toBeInTheDocument();
    expect(screen.queryByTestId('trust-marks-strip')).not.toBeInTheDocument();
    expect(screen.queryByText('Atendimento 100% Remoto & Nacional')).not.toBeInTheDocument();
    expect(screen.queryByText('Contato Direto com Liderança Técnica')).not.toBeInTheDocument();
    expect(screen.queryByText('Propriedade Integral do Código')).not.toBeInTheDocument();
    expect(screen.queryByText('Como atuamos com a sua equipe')).not.toBeInTheDocument();
    expect(screen.queryByText('Parceria Direta')).not.toBeInTheDocument();
    expect(screen.queryByText(/Elessandro Prestes Macedo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/60\.710\.574\/0001-85/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Toledo/i)).not.toBeInTheDocument();
    expect(screen.getByText('Nossa jornada técnica')).toBeInTheDocument();
    expect(screen.getByText('Missão e princípios de engenharia')).toBeInTheDocument();
    expect(screen.getByText('PRINCIPIO_01')).toBeInTheDocument();
    expect(screen.getByText('Excelência Pragmática')).toBeInTheDocument();
    expect(screen.queryByText('Pronto para construir sua próxima solução com quem entende de código?')).not.toBeInTheDocument();
  });

  it('ContactPage (/contact) renderiza H1 e formulário de contato', () => {
    renderWithProviders(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Fale sobre seu projeto' })).toBeInTheDocument();
    expect(screen.getByText('CONTATO')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });

  it('FAQPage (/faq) renderiza H1 e perguntas frequentes', () => {
    renderWithProviders(<FAQPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Dúvidas frequentes' })).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });
});
