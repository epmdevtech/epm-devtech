# SPEC-019 — Redesign da Seção Contato: Redação Consultiva e Formulário Tech Slim

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Redesign da Seção Contato: Redação Consultiva e Formulário Tech Slim  |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

A seção "Contato" (`#contato` / `Contact.tsx`) representa o principal ponto de conversão comercial da software house. O cabeçalho anterior ("Vamos Construir Juntos") apresentava uma chamada genérica e exigente, pressupondo que o cliente já chegasse com requisitos prévios fechados.

Para reduzir a fricção de entrada e criar uma abordagem acolhedora e consultiva para CTOs, fundadores e diretores de operação, a seção é redesenhada no estilo **"Tech Slim"** (inspirado em referências modernas de UI/UX como Linear, Vercel e Stripe). 

O design passa a adotar inputs compactos, cantos arredondados refinados, foco suave em verde esmeralda institucional, tipografia linear monocromática e uma mensagem de acolhimento que convida o cliente a dialogar mesmo sem ter todos os requisitos definidos.

---

## 2. Requisitos de UI/UX e Design "Tech Slim"

### 2.1 Cabeçalho Consultivo e Monocromático
- **Badge Superior (Overline)**: `CONTATO`
- **Título (H2)**: "Vamos entender o seu desafio"
  - 100% monocromático (`text-zinc-900` no modo claro e `dark:text-white` no modo escuro) via `SectionHeader`.
  - Peso `font-bold`, tracking compacto e ausência de títulos bicolores.
- **Subtítulo / Descrição**:
  - "Não precisa ter todos os requisitos definidos. Conte-nos o que está acontecendo, qual processo precisa melhorar ou o que você gostaria de construir. A partir disso, podemos entender a sua necessidade e avaliar o melhor caminho técnico."
- **Redação PT-BR Culta**: Proibição de travessão longo (`—`) ou meia-risca (`–`).

### 2.2 Card Principal do Formulário
- Fundo translúcido com efeito glass/backdrop (`bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md`).
- Borda ultrafina translúcida (`border border-zinc-200/80 dark:border-zinc-800/80`) e cantos `rounded-2xl`.
- Padding otimizado (`p-6 sm:p-7`) eliminando áreas mortas verticais.
- Sombra difusa elegante (`shadow-sm hover:shadow-md transition-shadow`).

### 2.3 Inputs, Selects e Textarea Slim
- **Inputs e Select**: Altura compacta `h-10`, fundo `bg-zinc-50/60 dark:bg-zinc-950/50`, bordas `border-zinc-200 dark:border-zinc-800` e cantos `rounded-lg`.
- **Foco Tecnológico**: `focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all`.
- **Labels**: `text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5` com asterisco discreto.
- **Textarea**: 4 linhas de altura inicial (`rows={4}`), cantos `rounded-lg` e placeholder instrucional. Preservação do modal expansível para textos longos.

### 2.4 Botão de Envio (Slim Tech CTA)
- Dimensões: `h-11 px-6 rounded-lg font-medium text-sm w-full`.
- Estilo: `bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-emerald-500/20 hover:shadow-md transition-all`, ícone moderno inline com micro-animação no hover (`group-hover:translate-x-0.5`).

### 2.5 Coluna da Esquerda (Canais Rápidos Slim)
- Mini-cards com `rounded-xl`, borda `border-zinc-200/60 dark:border-zinc-800/60`, fundo `bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm`.
- Ícones em container sutil (`p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400`).
- Dados:
  1. **E-mail direto**: `elessandro@epmdevtech.com.br` (`mailto:`)
  2. **WhatsApp direto**: `(45) 99917-8290` (`https://wa.me/5545999178290`)
  3. **Tempo de resposta**: `Retorno técnico em até 24 horas úteis`

---

## 3. Campos e Validação do Formulário

- `name`: Nome completo (mínimo 2 caracteres)
- `email`: E-mail profissional (validação de formato de e-mail)
- `phone`: WhatsApp / Telefone (opcional)
- `projectType`: Tipo de projeto / necessidade com opções exatas:
  - "Novo Sistema ou Aplicação Web"
  - "Modernização de Sistema Legado"
  - "APIs, Microsserviços e Integrações"
  - "Consultoria Técnica e Arquitetura"
  - "Outro Desafio"
- `message`: Mensagem (mínimo 20 caracteres) com placeholder: "Conte resumidamente qual processo quer otimizar ou qual sistema pretende construir..."

---

## 4. Plano de Testes e Validação

1. **Testes Unitários (`Contact.test.tsx`)**:
   - Validar novo cabeçalho consultivo ("Vamos entender o seu desafio").
   - Validar novos labels e valores de canais diretos ("E-mail direto", "WhatsApp direto", "Retorno técnico em até 24 horas úteis").
   - Validar novos campos e opções do `Select`.
   - Validar envio bem-sucedido via EmailJS e mensagens de erro.
2. **Testes End-to-End (`design-system-and-stability.spec.ts`)**:
   - Atualizar a asserção do heading de `#contato` para `"Vamos entender o seu desafio"`.
   - Garantir 100% de aprovação na suíte Playwright.
3. **Quality Gates**:
   - Cobertura de código $\ge 90\%$.
   - ESLint com 0 erros.
   - Build de produção sem chunks > 600KB.
