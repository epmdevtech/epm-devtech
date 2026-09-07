# SPEC-030 — Componente ContactForm Modular com Shadcn/UI e Validação Zod

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Componente ContactForm Modular com Shadcn/UI e Validação Zod          |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada (PO Elessandro Prestes Macedo)             |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Motivação

O projeto atualmente possui a seção de contato (`Contact.tsx`) implementada com registro direto de inputs via `react-hook-form` e tags `<form>` nativas. Para elevar o padrão de modularidade, acessibilidade (WAI-ARIA automática do Radix UI) e reusabilidade do design system, faz-se necessária a criação de um componente dedicado e autocontido: `ContactForm.tsx`.

Este componente integrará formalmente o ecossistema completo de formulários do Shadcn/UI (`<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`), com tipagem TypeScript estrita e validação Zod sob medida.

---

## 2. Especificação Técnica

### 2.1 Localização dos Arquivos
- **Componente:** `src/components/ContactForm.tsx`
- **Testes Unitários:** `src/components/__tests__/ContactForm.test.tsx`

### 2.2 Schema de Validação (`contactFormSchema`)
```typescript
export const PROJECT_TYPE_OPTIONS = [
  "Novo Sistema ou Aplicação Web",
  "Modernização de Sistema Legado",
  "APIs, Microsserviços e Integrações",
  "Consultoria Técnica e Arquitetura",
  "Outro Desafio",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Informe seu nome completo" })
    .trim()
    .min(3, "Informe seu nome completo (mínimo de 3 caracteres)"),
  email: z
    .string({ required_error: "Informe um e-mail corporativo válido" })
    .trim()
    .email("Informe um e-mail corporativo válido"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 13;
      },
      { message: "Informe um telefone válido com DDD (mínimo de 10 dígitos)" }
    ),
  projectType: z
    .string({ required_error: "Selecione o tipo de projeto ou desafio" })
    .min(1, "Selecione o tipo de projeto ou desafio"),
  message: z
    .string({ required_error: "Descreva brevemente o seu desafio" })
    .trim()
    .min(10, "Descreva brevemente o seu desafio (mínimo de 10 caracteres)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### 2.3 Componentes Shadcn/UI Utilizados
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` (de `@/components/ui/form`)
- `Input` (de `@/components/ui/input`)
- `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` (de `@/components/ui/select`)
- `Textarea` (de `@/components/ui/textarea`)
- `Button` (de `@/components/ui/button`)
- `Loader2`, `Send`, `CheckCircle2` (de `lucide-react`)
- `toast` (de `sonner`)
- `emailjs` (de `@emailjs/browser` — com envio resiliente e contingência)

### 2.4 Comportamento e UX/UI
1. **Acessibilidade:** IDs, `aria-describedby` e `aria-invalid` gerados e vinculados automaticamente pelo `useFormField` do Shadcn.
2. **Feedback em Três Camadas:**
   - **Camada 1 (Campos):** Mensagens inline de validação via `<FormMessage>` com realce de erro.
   - **Camada 2 (Botão):** Spinner e estado desabilitado durante `isSubmitting`; transição para `"✓ Mensagem Enviada!"` no envio bem-sucedido.
   - **Camada 3 (Notificação):** Toast `toast.success` ou `toast.error` (com fallback WhatsApp).
3. **Reset do Formulário:** Executado via `form.reset()` após submissão com sucesso.

---

## 3. Critérios de Aceite (Quality Gates)

- [ ] `ContactForm.tsx` exportado com tipagem estrita (TypeScript sem `any`).
- [ ] Implementação de todos os 5 campos com validação Zod conforme especificado.
- [ ] Validações de erro visualizadas via `<FormMessage />` com classes do Shadcn.
- [ ] Envio integrado com EmailJS (ou callback `onSubmit` customizável opcional via props).
- [ ] Cobertura de testes unitários $\ge 90\%$ em `ContactForm.test.tsx`.
- [ ] `npm run lint` com 0 erros e 0 warnings.
- [ ] `npm run build` executado com sucesso e chunks dentro dos limites.
- [ ] Registro documental em `TASK-030`, `QA-030`, `PROJECT.md` e `CHANGELOG.md`.

---

## 4. Aprovação

- [ ] Aprovado pelo PO (Elessandro Prestes Macedo)
