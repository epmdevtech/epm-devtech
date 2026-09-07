import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactForm from '../ContactForm';
import emailjs from '@emailjs/browser';
import React from 'react';

// ─── EmailJS Mock ────────────────────────────────────────────────────────────
vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }),
  },
}));

// ─── Sonner Mock ─────────────────────────────────────────────────────────────
const mockToastSuccess = vi.fn();
const mockToastError = vi.fn();
vi.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: (...args: unknown[]) => mockToastError(...args),
  },
}));

// ─── Radix Select → native <select> para controle programático em testes ─────
type SelectCtx = {
  id?: string;
  setId?: (id: string) => void;
  onValueChange?: (val: string) => void;
  value?: string;
};
const SelectMockContext = React.createContext<SelectCtx>({});

vi.mock('@/components/ui/select', () => ({
  Select: ({
    children,
    onValueChange,
    value,
  }: {
    children: React.ReactNode;
    onValueChange?: (val: string) => void;
    value?: string;
  }) => {
    const [id, setId] = React.useState<string | undefined>();
    return (
      <SelectMockContext.Provider value={{ id, setId, onValueChange, value }}>
        {children}
      </SelectMockContext.Provider>
    );
  },
  SelectTrigger: ({ id, children }: { id?: string; children: React.ReactNode }) => {
    const ctx = React.useContext(SelectMockContext);
    React.useLayoutEffect(() => {
      if (id && ctx.setId) ctx.setId(id);
    }, [id, ctx]);
    return <>{children}</>;
  },
  SelectValue: ({ placeholder }: { placeholder?: string }) => (
    <option value="">{placeholder}</option>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => {
    const ctx = React.useContext(SelectMockContext);
    return (
      <select
        id={ctx.id}
        data-testid="project-type-select"
        value={ctx.value || ''}
        onChange={(e) => ctx.onValueChange?.(e.target.value)}
      >
        {children}
      </select>
    );
  },
  SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
    <option value={value}>{children}</option>
  ),
}));

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_EMAILJS_SERVICE_ID = 'test_service';
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID = 'test_template';
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY = 'test_key';
  });

  it('renderiza todos os campos e o botão de envio', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp \/ Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Desafio ou Tipo de Projeto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensagem/i })).toBeInTheDocument();
  });

  it('exibe erros de validação Zod quando os campos obrigatórios não são preenchidos', async () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(screen.getByText(/Informe seu nome completo/i)).toBeInTheDocument();
      expect(screen.getByText(/Informe um e-mail corporativo válido/i)).toBeInTheDocument();
      expect(screen.getByText(/Selecione o tipo de projeto ou desafio/i)).toBeInTheDocument();
      expect(screen.getByText(/Descreva seu projeto com pelo menos 15 caracteres/i)).toBeInTheDocument();
    });

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('rejeita caracteres alfabéticos aleatórios no campo de WhatsApp/Telefone', async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/WhatsApp \/ Telefone/i);
    fireEvent.change(phoneInput, {
      target: { value: 'wewqewqeq' },
    });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Informe um número de WhatsApp\/Telefone válido com DDD/i)
      ).toBeInTheDocument();
    });
  });

  it('formata dinamicamente o número digitado com máscara brasileira', async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/WhatsApp \/ Telefone/i) as HTMLInputElement;
    fireEvent.change(phoneInput, {
      target: { value: '11999998888' },
    });

    expect(phoneInput.value).toBe('(11) 99999-8888');
  });

  it('valida formato inválido de telefone caso preenchido com menos de 10 dígitos ou DDD inválido', async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText(/WhatsApp \/ Telefone/i);
    fireEvent.change(phoneInput, {
      target: { value: '123' },
    });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(
        screen.getByText(/Informe um número de WhatsApp\/Telefone válido com DDD/i)
      ).toBeInTheDocument();
    });
  });

  it('submete com sucesso utilizando EmailJS quando os dados são válidos', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), {
      target: { value: 'Carlos Silva' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail profissional/i), {
      target: { value: 'carlos@empresa.com' },
    });
    fireEvent.change(screen.getByLabelText(/WhatsApp \/ Telefone/i), {
      target: { value: '(45) 99999-8888' },
    });
    fireEvent.change(screen.getByTestId('project-type-select'), {
      target: { value: 'Modernização de Sistema Legado' },
    });
    fireEvent.change(screen.getByLabelText(/Mensagem/i), {
      target: { value: 'Gostaríamos de migrar nosso monolito para arquitetura modular.' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
      expect(mockToastSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Mensagem enviada com sucesso!')
      );
      expect(screen.getByRole('button', { name: /Mensagem Enviada!/i })).toBeInTheDocument();
    });
  });

  it('executa o callback customizado onSubmitSuccess quando fornecido via props', async () => {
    const customSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmitSuccess={customSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), {
      target: { value: 'Ana Souza' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail profissional/i), {
      target: { value: 'ana@tech.com' },
    });
    fireEvent.change(screen.getByTestId('project-type-select'), {
      target: { value: 'APIs, Microsserviços e Integrações' },
    });
    fireEvent.change(screen.getByLabelText(/Mensagem/i), {
      target: { value: 'Precisamos de consultoria para desenho de APIs críticas.' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(customSubmit).toHaveBeenCalledTimes(1);
      expect(customSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Ana Souza',
          email: 'ana@tech.com',
          projectType: 'APIs, Microsserviços e Integrações',
        })
      );
      expect(mockToastSuccess).toHaveBeenCalledWith(
        expect.stringContaining('Mensagem enviada com sucesso!')
      );
    });
  });

  it('exibe toast.error com ação de contingência caso o envio falhe', async () => {
    (emailjs.send as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Nome completo/i), {
      target: { value: 'Carlos Silva' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail profissional/i), {
      target: { value: 'carlos@empresa.com' },
    });
    fireEvent.change(screen.getByTestId('project-type-select'), {
      target: { value: 'Consultoria Técnica e Arquitetura' },
    });
    fireEvent.change(screen.getByLabelText(/Mensagem/i), {
      target: { value: 'Necessitamos de revisão arquitetural para escalabilidade.' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /Enviar Mensagem/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        expect.stringContaining('Falha ao enviar mensagem no momento'),
        expect.objectContaining({
          action: expect.objectContaining({ label: 'Chamar no WhatsApp' }),
        })
      );
    });
  });
});
