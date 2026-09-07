# SPEC-031 — Validação Estrita de Telefone, Máscara Dinâmica e Blindagem de Formulários de Contato

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Validação Estrita de Telefone, Máscara Dinâmica e Blindagem de Formulários de Contato |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada (PO Directive via /goal)                                   |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Defeito Identificado

Atualmente, o campo de WhatsApp/Telefone (`phone`) nos formulários de contato aceita texto livre arbitrário (ex.: `"wewqewqeq..."`), sem sanitização de dígitos, sem máscara visual e sem rejeição explícita de caracteres alfabéticos.

### Objetivos:
1. **Blindagem com Schema Zod**:
   - Campo opcional, porém com validação estrita caso preenchido.
   - Rejeitar expressamente caracteres alfabéticos ou formatos inválidos.
   - Exigir 10 dígitos (telefone fixo: DDD + 8 dígitos) ou 11 dígitos (celular: DDD + 9 dígitos iniciando com 9).
   - Validar DDDs legítimos do Brasil (11 a 99).
   - Mensagem de erro: `"Informe um número de WhatsApp/Telefone válido com DDD (ex: 11 99999-9999)"`.
2. **Máscara Automática de Entrada**:
   - Formatação em tempo real no `onChange`: `(99) 9999-9999` ou `(99) 99999-9999`.
   - Remoção automática de caracteres não numéricos.
3. **Modo de Validação em Tempo Hábil**:
   - `mode: "onBlur"` com `reValidateMode: "onChange"` (ou `mode: "onChange"`) para feedback imediato ao usuário.
4. **Mensagem de Erro Clara**:
   - Garantir renderização visual em vermelho (`<FormMessage />` no Shadcn / `text-destructive` em `Contact.tsx`).
5. **Harmonização do Schema Global**:
   - `name`: obrigatório, mínimo 3 caracteres (`"Informe seu nome completo"`).
   - `email`: obrigatório, formato de e-mail válido (`"Informe um e-mail corporativo válido"`).
   - `projectType`: obrigatório (Select), opções corporativas.
   - `message`: obrigatório, mínimo 15 caracteres (`"Descreva seu projeto com pelo menos 15 caracteres"`).

---

## 2. Arquitetura da Solução

### 2.1 Utilitário Centralizado de Telefone (`src/lib/phone.ts`)
- `formatBrazilianPhone(value: string): string`
- `validateBrazilianPhone(value?: string | null): boolean`
- Lista oficial de DDDs válidos do Brasil (`VALID_BRAZILIAN_DDDS`).

### 2.2 Componente Modular Shadcn (`src/components/ContactForm.tsx`)
- Integração de `contactFormSchema` com `phone` validado por `validateBrazilianPhone`.
- Máscara aplicada no `field.onChange`.
- Mensagens de erro com `<FormMessage />`.

### 2.3 Seção de Contato Oficial (`src/components/sections/Contact.tsx`)
- Atualização do schema Zod com as mesmas regras estritas.
- Máscara aplicada no `phone` input.
- Exibição de `{errors.phone && <p className="text-xs text-destructive mt-1.5">{errors.phone.message}</p>}`.

---

## 3. Critérios de Aceite (Quality Gates)

- [ ] Campo `phone` rejeita qualquer texto com letras (ex.: `"wewqewqeq"`).
- [ ] Campo `phone` rejeita números com menos de 10 ou mais de 11 dígitos numéricos.
- [ ] Campo `phone` rejeita DDDs inexistentes (ex.: 00, 01, 10).
- [ ] Campo `phone` celular (11 dígitos) exige início 9 no terceiro dígito.
- [ ] Entrada do usuário formata automaticamente como `(XX) XXXX-XXXX` ou `(XX) XXXXX-XXXX`.
- [ ] Mensagem de erro em vermelho é visível logo abaixo do campo.
- [ ] `npm run lint` executa com 0 erros.
- [ ] `npm run test:coverage` passa com 100% dos testes e cobertura $\ge 90\%$.
- [ ] `npm run build` passa sem warnings.
- [ ] `npx playwright test` passa com 9/9 testes E2E.
- [ ] Documentação SDD (`TASK-031`, `QA-031`, `CHANGELOG.md`, `PROJECT.md`).
