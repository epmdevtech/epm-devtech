# SPEC-022 — Refatoração do Card de Contato: Bloco de Próximos Passos e Garantias

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração do Card de Contato: Próximos Passos e Garantias           |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

Durante a análise de consistência de UI/UX, identificou-se uma redundância visual imediata entre a seção de Contato e o Rodapé: a coluna direita do card de contato repetia os mesmos canais institucionais (E-mail, WhatsApp, Localização e SLA de 24 horas) que aparecem no rodapé logo abaixo.

Esta especificação resolve a duplicação transformando o lado escuro do card de contato em um bloco de alto valor percebido focado em **"Próximos Passos & Garantias"**, estabelecendo um fluxo claro de expectativas para o lead/cliente que está preenchendo o formulário. Os canais institucionais de contato e localização permanecem centralizados exclusivamente no Footer.

---

## 2. Requisitos de Conteúdo e UI/UX

### 2.1 Estrutura do Lado Escuro (Lado Direito do Split Card)
- **Container**:
  `lg:col-span-5 bg-zinc-900 text-white dark:bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800`
- **Cabeçalho Interno**:
  - Título H3 100% monocromático: `O que acontece a seguir?` (`text-xl font-bold text-white tracking-tight mb-2`)
  - Texto de apoio: `Nosso processo é direto com a engenharia, sem intermediários comerciais:` (`text-xs text-zinc-400 leading-relaxed mb-6`)

### 2.2 Fluxo de Expectativas (3 Blocos de Valor)
1. **Bloco 1 (Diagnóstico Técnico)**:
   - Ícone: `CheckCircle2` em container circular escuro (`w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0`)
   - Destaque: `Diagnóstico Técnico` (`text-sm font-semibold text-white mb-1`)
   - Descrição: `Avaliamos seu cenário, gargalos e viabilidade arquitetural logo no primeiro contato.` (`text-xs text-zinc-400 leading-relaxed`)
2. **Bloco 2 (Retorno em até 24 Horas)**:
   - Ícone: `Clock` em container circular escuro
   - Destaque: `Retorno em até 24 Horas` (`text-sm font-semibold text-white mb-1`)
   - Descrição: `Resposta rápida para agendarmos uma conversa técnica sem enrolação.` (`text-xs text-zinc-400 leading-relaxed`)
3. **Bloco 3 (Sigilo e Segurança)**:
   - Ícone: `ShieldCheck` em container circular escuro
   - Destaque: `Sigilo e Segurança` (`text-sm font-semibold text-white mb-1`)
   - Descrição: `Suas ideias, dados e regras de negócio tratados com absoluta confidencialidade.` (`text-xs text-zinc-400 leading-relaxed`)

### 2.3 Chamada de Ação Rápida (Rodapé do Card Escuro)
- Divisor sutil: `pt-6 mt-6 border-t border-zinc-800/80 flex flex-col gap-1.5`
- Pergunta: `"Prefere atendimento imediato?"` (`text-xs text-zinc-400`)
- Link discreto em verde: `"Chamar no WhatsApp direto →"`
  - `href="https://wa.me/5545999178290" target="_blank" rel="noopener noreferrer"`
  - Estilo: `text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 group w-fit`

### 2.4 Regras Rigorosas de Tipografia e Texto
- Títulos 100% monocromáticos, sem divisões bicolores ou gradientes.
- Proibição absoluta de travessão longo (`—`) ou meia-risca (`–`).
- Paridade perfeita no modo escuro e claro.

---

## 3. Preservação do Rodapé (Footer)
- O rodapé institucional (`Footer.tsx`) permanece intacto com suas 4 colunas (Identidade, Soluções, Navegação e Contato), servindo como hub institucional e de navegação global.

---

## 4. Plano de Testes e Quality Gates

1. **Testes Unitários (`Contact.test.tsx`)**:
   - Validar títulos e descrições dos 3 blocos ("Diagnóstico Técnico", "Retorno em até 24 Horas", "Sigilo e Segurança").
   - Validar chamada rápida para o WhatsApp ("Prefere atendimento imediato?", "Chamar no WhatsApp direto →").
   - Garantir que todos os testes do formulário (validação, EmailJS, loading, etc.) continuam 100% aprovados.
2. **Quality Gates**:
   - Cobertura $\ge 90\%$ nos componentes.
   - 0 erros no ESLint.
   - Build de produção sem warnings.
   - Suíte Playwright E2E 100% aprovada (8/8 testes).
