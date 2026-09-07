# SPEC-027 — Resiliência de Envio no Formulário de Contato e Normalização de Autofill

| Campo         | Valor                                                                  |
|---------------|------------------------------------------------------------------------|
| **Título**    | Resiliência de Envio no Formulário de Contato e Normalização de Autofill |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX)  |
| **PO**        | Elessandro Prestes Macedo                                              |
| **Status**    | ✅ Aprovada / Concluída                               |
| **Data**      | 2026-09-07                                                             |
| **Versão**    | 1.0                                                                    |

---

## 1. Contexto & Defeitos Identificados

### 1.1 Evidência Visual
- Captura de tela: [`Captura de tela de 2026-09-07 11-44-35.png`](file:///home/elessandro/Imagens/Capturas%20de%20tela/Captura%20de%20tela%20de%202026-09-07%2011-44-35.png)

### 1.2 Descrição dos Problemas
1. **Erro Técnico Exposto ao Usuário (Lead)**:
   - Ao submeter o formulário de contato, caso ocorra falha de autenticação no provedor (ex.: HTTP 412 `Gmail_API: Invalid grant`), o componente `Contact.tsx` exibe no Toast o texto cru da API (`Gmail_API: Invalid grant. Please reconnect your Gmail account.`).
   - Isso expõe a arquitetura interna e causa má impressão para o cliente/lead que tenta contratar os serviços da Software House.
2. **Ausência de Fallback Acionável no Toast**:
   - O toast de erro atual apenas informa o erro sem oferecer um botão direto de ação para o visitante não perder a mensagem (ex.: "Abrir WhatsApp agora").
3. **Desconfiguração Visual por Autofill do Navegador**:
   - Quando o navegador preenche automaticamente os campos (`Nome`, `E-mail`, `WhatsApp`), o Chrome aplica estilos proprietários `-webkit-autofill` que inserem caixas retangulares sólidas cinza/azuladas, rompendo a harmonia do formulário minimalista com linhas underline.

---

## 2. Escopo da Implementação

### 2.1 Mensagens Institucionais Amigáveis e Fallback (`Contact.tsx`)
- Em caso de falha no envio via EmailJS:
  - O detalhe técnico do erro permanece registrado no `console.error` para auditoria dos desenvolvedores.
  - O Toast exibe mensagem comercial elegante: *"Não foi possível enviar a mensagem no momento. Por favor, utilize o contato direto via WhatsApp ou e-mail."*
  - Adicionar ação rápida no toast (botão de contato ou cópia rápida).

### 2.2 Normalização de Autofill do Navegador (`src/index.css`)
- Inserir regras CSS para neutralizar o fundo sólido do `-webkit-autofill`, preservando o fundo transparente e a cor correta do texto em temas Dark e Light:
  ```css
  /* Normalização de autofill para campos underline transparentes */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: currentColor !important;
    transition: background-color 5000s ease-in-out 0s;
  }
  ```

---

## 3. Ação Externa Obrigatória (PO / EmailJS)

O erro HTTP 412 `Gmail_API: Invalid grant` requer a reconexão da conta Google no painel do EmailJS:
1. Acessar `https://dashboard.emailjs.com/`
2. Ir em **Email Services** -> Serviço `service_ro8et9l`
3. Clicar em **"Reconnect"** e autorizar a conta Gmail
4. Salvar as alterações

---

## 4. Quality Gates

1. `npm run test:coverage` (cobertura $\ge 90\%$)
2. `npm run lint` (0 erros)
3. `npm run build` (chunks $< 600\text{ KB}$)
4. `npx playwright test` (100% aprovado)
5. `reviews/QA-027.md`
