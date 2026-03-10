import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import Contact from '../Contact';
import emailjs from '@emailjs/browser';
import React from 'react';

// ─── Emailjs ─────────────────────────────────────────────────────────────────
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }),
  },
}));

// ─── Toast ───────────────────────────────────────────────────────────────────
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();
vi.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: (...args: unknown[]) => mockToastError(...args),
  },
}));

// ─── Framer motion ───────────────────────────────────────────────────────────
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} data-testid="motion-div">{children}</div>
    ),
  },
  useInView: () => true,
}));

// ─── Radix Select → native <select> para controle programático em testes ─────
vi.mock('@/components/ui/select', () => ({
  Select: ({
    children,
    onValueChange,
  }: {
    children: React.ReactNode;
    onValueChange?: (val: string) => void;
  }) => (
    <select data-testid="project-type-select" onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => (
    <option value="">{placeholder}</option>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
  ),
}));

// ─── Radix Dialog → stub que nunca abre (evita focus-trap que esconde o form) ─
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogContent: () => null,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
}));

// ─── ResizeObserver (Radix) ───────────────────────────────────────────────────
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Simula entrada via nativeInputValueSetter + evento 'input',
 * o que aciona corretamente o mecanismo de rastreamento do React
 * em inputs controlados por react-hook-form.
 */
const simulateInput = (id: string, value: string) => {
  const el = document.getElementById(id)!;
  const isTextarea = el instanceof HTMLTextAreaElement;
  const proto = isTextarea ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
  if (nativeSetter) nativeSetter.call(el, value);
  fireEvent.input(el);
};

/** Preenche todos os campos obrigatórios com dados válidos */
const fillValidForm = () => {
  act(() => {
    simulateInput('name', 'João Silva');
    simulateInput('email', 'joao@example.com');
    fireEvent.change(screen.getByTestId('project-type-select'), {
      target: { value: 'Aplicativo Mobile' },
    });
    simulateInput('message', 'Preciso de um sistema web com integração de API e autenticação.');
  });
};

const setEnvVars = () => {
  import.meta.env.VITE_EMAILJS_SERVICE_ID = 'service_id';
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID = 'template_id';
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY = 'pub_key';
};

const clearEnvVars = () => {
  import.meta.env.VITE_EMAILJS_SERVICE_ID = '';
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID = '';
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY = '';
};

// ─────────────────────────────────────────────────────────────────────────────

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Renderização ─────────────────────────────────────────────────────────
  it('renders the contact header', () => {
    render(<Contact />);
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText(/Vamos Construir/i)).toBeInTheDocument();
  });

  it('renders contact information items', () => {
    render(<Contact />);
    expect(screen.getByText('elessandro@epmdevtech.com.br')).toBeInTheDocument();
    expect(screen.getByText('(45) 99917-8290')).toBeInTheDocument();
    expect(screen.getByText('Até 24 horas úteis')).toBeInTheDocument();
  });

  it('renders the form fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp \/ Telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/Tipo de projeto/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Mensagem/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Enviar Mensagem/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<Contact />);
    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/Nome deve ter ao menos 2 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument();
    });
  });

  // ── onSubmit: env vars ausentes ───────────────────────────────────────────
  it('exibe toast.error quando variáveis de ambiente do EmailJS não estão configuradas', async () => {
    clearEnvVars();
    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        expect.stringMatching(/Configuração de e-mail incompleta/i),
      );
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  // ── onSubmit: envio bem-sucedido ──────────────────────────────────────────
  it('chama emailjs.send e exibe toast.success em envio válido', async () => {
    setEnvVars();
    (emailjs.send as Mock).mockResolvedValueOnce({ status: 200, text: 'OK' });

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        'service_id',
        'template_id',
        expect.objectContaining({ name: 'João Silva', email: 'joao@example.com' }),
      );
      expect(mockToastSuccess).toHaveBeenCalledWith(
        expect.stringMatching(/Mensagem enviada/i),
      );
    });
  });

  // ── onSubmit: falha no emailjs ────────────────────────────────────────────
  it('exibe toast.error com status quando emailjs.send rejeita', async () => {
    setEnvVars();
    (emailjs.send as Mock).mockRejectedValueOnce({ status: 400, text: 'The Public Key is invalid.' });

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        expect.stringMatching(/Falha ao enviar.*400/),
      );
    });
  });

  // ── Estado de loading ─────────────────────────────────────────────────────
  it('exibe "Enviando..." enquanto a submissão está em andamento', async () => {
    setEnvVars();
    let resolveEmail!: (val: unknown) => void;
    (emailjs.send as Mock).mockImplementationOnce(
      () => new Promise((resolve) => { resolveEmail = resolve; }),
    );

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });

    resolveEmail({ status: 200, text: 'OK' });

    await waitFor(() => {
      expect(screen.queryByText('Enviando...')).not.toBeInTheDocument();
    });
  });

  // ── Mouse events no botão de submit ──────────────────────────────────────
  it('aplica efeitos de hover e press no botão sem lançar erros', () => {
    render(<Contact />);
    const btn = screen.getByRole('button', { name: /Enviar Mensagem/i });

    expect(() => {
      fireEvent.mouseEnter(btn);
      fireEvent.mouseLeave(btn);
      fireEvent.mouseDown(btn);
      fireEvent.mouseUp(btn);
    }).not.toThrow();
  });

  // ── Botão expandir ────────────────────────────────────────────────────────
  it('renderiza o botão de expandir mensagem com aria-label correto', () => {
    render(<Contact />);
    const expandBtn = screen.getByRole('button', { name: /Expandir mensagem/i });
    expect(expandBtn).toBeInTheDocument();
  });
});
