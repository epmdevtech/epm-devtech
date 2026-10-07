import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
      target: { value: 'Sistema, portal ou site institucional' },
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
    expect(screen.getByText('Vamos conversar sobre como podemos apoiar você e seu projeto')).toBeInTheDocument();
    expect(screen.getByText(/Assim que recebermos sua mensagem, entraremos em contato/i)).toBeInTheDocument();
  });

  it('renders next steps and guarantees in dark side of unified card', () => {
    render(<Contact />);
    expect(screen.getByText('O que acontece a seguir?')).toBeInTheDocument();
    expect(
      screen.getByText(/Transparência e foco técnico desde o primeiro contato:/i)
    ).toBeInTheDocument();

    // 3 Blocos de valor
    expect(screen.getByText('Diagnóstico técnico')).toBeInTheDocument();
    expect(
      screen.getByText(/Avaliamos seu cenário, gargalos e viabilidade arquitetural logo no primeiro contato/i)
    ).toBeInTheDocument();

    expect(screen.getByText('Atendimento consultivo direto')).toBeInTheDocument();
    expect(
      screen.getByText('Entraremos em contato para entender o cenário técnico e agendar uma conversa.')
    ).toBeInTheDocument();

    expect(screen.getByText('Sigilo e confidencialidade')).toBeInTheDocument();
    expect(
      screen.getByText(/Suas regras de negócio e dados tratados com confidencialidade total, com NDA quando solicitado/i)
    ).toBeInTheDocument();

    // Alternativa direta por e-mail
    expect(screen.getByText('Prefere e-mail? Escreva diretamente para')).toBeInTheDocument();
    const emailLink = screen.getByRole('link', { name: 'elessandro@epmdevtech.com.br' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:elessandro@epmdevtech.com.br');

    // Chamada de ação rápida WhatsApp
    expect(screen.getByText('Prefere atendimento imediato?')).toBeInTheDocument();
    const whatsappLink = screen.getByRole('link', { name: /Chamar no WhatsApp direto/i });
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5545999178290');
  });

  it('renders the form fields with internal heading', () => {
    render(<Contact />);
    expect(screen.getByText('Envie sua mensagem')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp \/ Telefone/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tipo de projeto/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/Mensagem/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /Enviar mensagem/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<Contact />);
    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/Informe seu nome completo/i)).toBeInTheDocument();
      expect(screen.getByText(/Informe um e-mail corporativo válido/i)).toBeInTheDocument();
    });
  });

  it('rejeita caracteres alfabéticos no campo de WhatsApp/Telefone', async () => {
    render(<Contact />);
    const phoneInput = screen.getByLabelText(/WhatsApp \/ Telefone/i);
    fireEvent.change(phoneInput, { target: { value: 'wewqewqeq' } });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Informe um número de WhatsApp\/Telefone válido com DDD/i)
      ).toBeInTheDocument();
    });
  });

  it('aplica máscara dinâmica no campo de telefone e permite envio válido', async () => {
    setEnvVars();
    render(<Contact />);
    fillValidForm();

    const phoneInput = screen.getByLabelText(/WhatsApp \/ Telefone/i) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: '11999998888' } });

    expect(phoneInput.value).toBe('(11) 99999-8888');

    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });
  });

  // ── onSubmit: env vars ausentes ───────────────────────────────────────────
  it('exibe toast.error quando variáveis de ambiente do EmailJS não estão configuradas', async () => {
    clearEnvVars();
    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        expect.stringContaining('Configuração de e-mail incompleta')
      );
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  // ── onSubmit: sucesso ─────────────────────────────────────────────────────
  it('chama emailjs.send e exibe toast.success em envio válido', async () => {
    setEnvVars();
    (emailjs.send as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ status: 200, text: 'OK' });

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
      expect(mockToastSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Mensagem recebida')
      );
      expect(screen.getByRole('button', { name: /Mensagem Enviada!/i })).toBeInTheDocument();
    });
  });

  // ── onSubmit: erro no envio ───────────────────────────────────────────────
  it('exibe toast.error com status quando emailjs.send rejeita', async () => {
    setEnvVars();
    (emailjs.send as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce({
      status: 400,
      text: 'The Public Key is invalid.',
    });

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        expect.stringContaining('Falha ao enviar mensagem no momento'),
        expect.objectContaining({
          action: expect.objectContaining({ label: 'Chamar no WhatsApp' }),
        })
      );
    });
  });

  // ── Estado de carregamento ────────────────────────────────────────────────
  it('exibe "Enviando..." enquanto a submissão está em andamento', async () => {
    setEnvVars();
    let resolveSend!: (value: unknown) => void;
    (emailjs.send as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      new Promise((res) => { resolveSend = res; })
    );

    render(<Contact />);
    fillValidForm();

    fireEvent.submit(screen.getByRole('button', { name: /Enviar mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });

    await act(async () => {
      resolveSend({ status: 200, text: 'OK' });
    });
  });

  // ── Microinterações: Botão de Envio ────────────────────────────────────────
  it('aplica efeitos de hover e press no botão sem lançar erros', () => {
    render(<Contact />);
    const button = screen.getByRole('button', { name: /Enviar mensagem/i });

    expect(() => {
      fireEvent.mouseEnter(button);
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      fireEvent.mouseLeave(button);
    }).not.toThrow();
  });

  // ── Modal de expansão de mensagem ─────────────────────────────────────────
  it('renderiza o botão de expandir mensagem com aria-label correto', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /Expandir mensagem/i })).toBeInTheDocument();
  });
});
