# ADR-003 — EmailJS para Formulário de Contato

| Campo       | Valor                          |
|-------------|-------------------------------|
| **Status**  | ✅ Aceito                      |
| **Data**    | 2026-08-28                    |
| **Decisores**| Elessandro Prestes Macedo    |

## Contexto

A landing page precisa de um formulário de contato funcional. O projeto é uma SPA estática sem backend próprio. Criar uma API apenas para o formulário de contato adicionaria complexidade operacional desproporcional ao porte do projeto.

## Decisão

Utilizar **EmailJS** (`@emailjs/browser`) para enviar e-mails diretamente do client-side, sem backend.

Configuração:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

As chaves são configuradas como variáveis de ambiente do Vite (`.env`) e exposta ao client. O risco de abuso é mitigado configurando **restrições de domínio** no painel do EmailJS.

## Consequências

### Positivas
- Zero backend necessário
- Configuração simples: SDK client-side + template no painel EmailJS
- Funciona perfeitamente com deploy estático na Vercel
- Integração nativa com react-hook-form + zod

### Negativas
- Chaves públicas expostas no bundle do cliente (mitigado por restrição de domínio)
- Dependência de serviço terceiro (EmailJS fora do ar = formulário fora do ar)
- Limite de e-mails no plano gratuito

## Alternativas Consideradas

| Alternativa       | Por que não foi escolhida                              |
|-------------------|--------------------------------------------------------|
| Formspree         | Similar ao EmailJS, mas com menos controle de template |
| Backend próprio   | Complexidade desproporcional para o porte do projeto   |
| Netlify Forms     | O projeto usa Vercel, não Netlify                      |
| Resend API        | Requer backend para proteger a API key                 |
