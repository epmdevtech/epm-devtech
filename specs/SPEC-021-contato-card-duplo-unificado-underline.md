# SPEC-021 — Refatoração da Seção Contato: Layout em Card Duplo Unificado e Inputs Underline

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração da Seção Contato: Split Card Unificado e Inputs Underline |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

O objetivo desta especificação é elevar o nível estético e funcional da seção **"Contato"** (`#contato` / `Contact.tsx`), adotando a estrutura moderna de **Card Duplo Unificado (Split Card horizontal)** com campos minimalistas no estilo **underline** (borda apenas inferior).

O layout integra o formulário e os canais diretos em um container contínuo de alta solidez visual:
- **Lado Esquerdo (7 colunas no desktop)**: Formulário com acabamento minimalista, inputs sem caixas fechadas e foco suave na cor esmeralda institucional.
- **Lado Direito (5 colunas no desktop)**: Bloco sóbrio de contraste escuro (`bg-zinc-900` / `dark:bg-zinc-950`) contendo os canais de atendimento com ícones circulares discretos e fundo contrastante.

---

## 2. Requisitos Visuais e Boas Práticas de UI/UX

### 2.1 Cabeçalho Externo (Acima do Card)
- **Badge Superior**: `CONTATO`
- **Título (H2 Monocromático)**: *"Vamos entender o seu desafio"* (`text-zinc-900` no Light / `dark:text-white` no Dark).
- **Subtítulo**: *"Não precisa ter todos os requisitos definidos. Conte-nos o que está acontecendo, qual processo precisa melhorar ou o que você gostaria de construir. Avaliaremos o melhor caminho técnico."*
- **Redação PT-BR**: Proibido o uso de travessão longo (`—`) ou meia-risca (`–`).

### 2.2 Container Principal (Split Card Unificado)
- Container contínuo com cantos arredondados: `rounded-2xl overflow-hidden shadow-xl border border-zinc-200/80 dark:border-zinc-800`.
- Grid responsivo de duas colunas no desktop: `grid grid-cols-1 lg:grid-cols-12`.

### 2.3 Lado Esquerdo: Formulário Minimalista Underline (`lg:col-span-7`)
- **Fundo e Padding**: `bg-white dark:bg-zinc-900 p-8 sm:p-10`.
- **Título Interno**: `Envie sua mensagem` (`text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6`).
- **Inputs Minimalistas Underline**:
  - Eliminação de bordas superior e laterais: `border-0 border-b border-zinc-300 dark:border-zinc-700 bg-transparent rounded-none px-0 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600`.
  - Focus State: `focus:ring-0 focus:border-emerald-500 transition-colors outline-none`.
  - Labels: `text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 block`.
- **Campos**:
  1. `name`: Nome completo (input text)
  2. `email`: E-mail profissional (input email)
  3. `phone`: WhatsApp / Telefone (input tel)
  4. `projectType`: Desafio ou Tipo de Projeto (select minimalista com borda inferior)
  5. `message`: Mensagem (textarea underline com `rows={4}` e sem redimensionamento horizontal)
- **Botão de Envio (Slim CTA)**:
  - Alinhado à esquerda na base do formulário.
  - Estilo: `bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm px-7 py-3 rounded-lg shadow-sm transition-all hover:shadow-emerald-500/20 hover:shadow-md inline-flex items-center gap-2 cursor-pointer disabled:opacity-60`.

### 2.4 Lado Direito: Canais de Atendimento Contrastante (`lg:col-span-5`)
- **Fundo e Padding**: `bg-zinc-900 text-white dark:bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between`.
- **Título Interno**: `Canais de Atendimento` (`text-xl font-bold text-white tracking-tight mb-2`).
- **Texto de Apoio**: `Estamos à disposição para entender o momento do seu sistema ou estruturar uma nova solução.` (`text-xs text-zinc-400 leading-relaxed mb-8`).
- **Lista de Canais (Ícones Circulares)**:
  - Container do ícone: `w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0`.
  - Item 1 (Localização): `Localização` / `Toledo, Paraná`
  - Item 2 (WhatsApp): `WhatsApp direto` / `(45) 99917-8290` (`https://wa.me/5545999178290`)
  - Item 3 (E-mail): `E-mail corporativo` / `elessandro@epmdevtech.com.br` (`mailto:elessandro@epmdevtech.com.br`)
  - Item 4 (SLA): `Tempo de resposta` / `Retorno em até 24 horas úteis`

---

## 3. Plano de Testes e Quality Gates

1. **Testes Unitários (`Contact.test.tsx`)**:
   - Validar cabeçalho externo e subtítulo atualizado.
   - Validar títulos internos ("Envie sua mensagem", "Canais de Atendimento").
   - Validar os 4 canais do lado direito (Localização, WhatsApp direto, E-mail corporativo, Tempo de resposta).
   - Validar os campos do formulário com estilos minimalistas.
   - Validar validação Zod e envio via EmailJS.
2. **Testes E2E (`design-system-and-stability.spec.ts`)**:
   - Garantir 100% de sucesso na suíte Playwright (8/8 testes).
3. **Quality Gates**:
   - Cobertura de código $\ge 90\%$ nos componentes.
   - 0 erros no ESLint.
   - Build de produção sem warnings de chunk $> 600\text{ KB}$.
