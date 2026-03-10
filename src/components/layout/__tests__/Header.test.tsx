import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '../Header';

// ─── react-router-dom: mock useNavigate ──────────────────────────────────────
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// ─── Typewriter ───────────────────────────────────────────────────────────────
vi.mock('@/components/ui/typewriter', () => ({
  Typewriter: ({ text }: { text: string }) => <span>{text}</span>,
}));

// ─── Framer Motion ────────────────────────────────────────────────────────────
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as Record<string, unknown>;
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      ...(actual.motion as Record<string, unknown>),
      header: (props: React.ComponentPropsWithoutRef<'header'>) => <header {...props} />,
      div: (props: React.ComponentPropsWithoutRef<'div'>) => <div {...props} />,
      a: (props: React.ComponentPropsWithoutRef<'a'>) => <a {...props} />,
      span: (props: React.ComponentPropsWithoutRef<'span'>) => <span {...props} />,
    },
  };
});

// ─── window.scrollTo ─────────────────────────────────────────────────────────
const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock, writable: true });

// ─── Helpers ─────────────────────────────────────────────────────────────────
const createSection = (id: string, top = 500) => {
  const el = document.createElement('div');
  el.id = id;
  el.getBoundingClientRect = vi.fn(() => ({
    top, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => {},
  }));
  document.body.appendChild(el);
  return el;
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza logo e links de navegação', () => {
    render(<Header />);
    expect(screen.getByAltText('EPM DEVTECH')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Tecnologias')).toBeInTheDocument();
    expect(screen.getByText('Diferenciais')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renderiza o texto "Software House" via Typewriter', () => {
    render(<Header />);
    expect(screen.getByText('Software House')).toBeInTheDocument();
  });

  it('abre e fecha o menu mobile ao clicar no botão hamburger', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Abrir menu');

    fireEvent.click(menuButton);
    expect(screen.getAllByLabelText('Fechar menu').length).toBeGreaterThan(0);

    const closeButton = screen.getAllByLabelText('Fechar menu')[1];
    fireEvent.click(closeButton);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('link do menu mobile chama navigate e scrollTo para a seção correta', () => {
    vi.useFakeTimers();
    render(<Header />);
    const section = createSection('sobre', 500);

    // Abre menu e clica no link mobile (índice 1 = dentro do sidebar)
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    fireEvent.click(screen.getAllByText('Sobre')[1]);

    // navigate é chamado imediatamente (antes do setTimeout)
    expect(mockNavigate).toHaveBeenCalledWith('/sobre');

    // scrollTo é chamado após os 350ms do setTimeout
    vi.advanceTimersByTime(400);
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 500 + window.scrollY - 80,
      behavior: 'smooth',
    });

    document.body.removeChild(section);
    vi.useRealTimers();
  });

  it('link do nav desktop chama navigate e scrollTo para a seção correta', () => {
    vi.useFakeTimers();
    render(<Header />);
    const section = createSection('contato', 900);

    // Clica no link desktop (índice 0 = nav desktop, antes do mobile)
    fireEvent.click(screen.getAllByText('Contato')[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/contato');

    vi.advanceTimersByTime(400);
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 900 + window.scrollY - 80,
      behavior: 'smooth',
    });

    document.body.removeChild(section);
    vi.useRealTimers();
  });

  it('não chama scrollTo se o elemento da seção não existir no DOM', () => {
    vi.useFakeTimers();
    render(<Header />);

    fireEvent.click(screen.getAllByText('Serviços')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/servicos');

    vi.advanceTimersByTime(400);
    expect(scrollToMock).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('atualiza estilo do header ao fazer scroll', () => {
    const { container } = render(<Header />);

    expect(container.querySelector('header')?.className).toContain('bg-transparent');

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('header')?.className).toContain('glass');
  });

  it('fecha o menu mobile ao clicar no backdrop', () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));

    // Backdrop é o primeiro elemento com onClick no AnimatePresence de backdrop
    const backdrop = document.querySelector('.bg-background\\/80');
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop!);

    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });
});
