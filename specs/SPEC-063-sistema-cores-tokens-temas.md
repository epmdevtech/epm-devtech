# SPEC-063: Sistema de Cores, Tokens Semânticos e Temas B2B (Preto + Teal)

## Status
- **Status:** Aprovada (Assinada pelo PO Elessandro Prestes Macedo)
- **Data:** 2026-10-01
- **Autor:** Staff Front-end Engineer / Design Systems & UX
- **Aprovador (PO):** Elessandro Prestes Macedo

---

## 1. Contexto e Diagnóstico

### 1.1. Auditoria de Cores Atuais
- **Superfícies chapadas:** Dark mode atual usa `#121212` puro e Light mode usa `#ffffff` puro, sem neutral tingido que crie profundidade visual.
- **Uso excessivo de verde genérico:** O verde esmeralda (`#10B981` / `emerald-600`) é aplicado indistintamente para botões, bordas, ícones, chips, links e divisores, sem cores de apoio nem hierarquia.
- **Falha de Contraste no Botão Primário:** Botão com fundo verde `#10B981` e texto branco `#FFFFFF` resulta em taxa de contraste de **2.88:1** (reprova no critério WCAG AA de 4.5:1).
- **Cores hardcoded no código:**
  - Classes Tailwind literais: `text-zinc-500`, `dark:text-zinc-400`, `text-zinc-900`, `bg-zinc-50`, `bg-zinc-950`, `bg-zinc-900`, `border-zinc-200/80`, `border-zinc-800`.
  - Cores literais de esmeralda: `text-emerald-600`, `dark:text-emerald-400`, `bg-emerald-600`, `bg-emerald-500/10`.
  - Hexadecimais inline: `Services.tsx` (`#10b981`, `#A855F7`, `#f59e0b`), `BrandChipIcon.tsx` (`stroke="#10B981"`), `index.html` (`#10B981`, `#121212`).

---

## 2. Decisões Arquiteturais e Paleta

### 2.1. Princípios
1. **Identidade Preservada:** Preto + Verde-água (Teal) como protagonistas.
2. **Regra 60/30/10:**
   - 60% neutros tingidos (profundidade sofisticada, sem cinza morto).
   - 30% superfícies estruturais, cartões e bordas com separação por tom e sombra sutil no light.
   - 10% destaques (Teal para ação/marca; Azul, Violeta e Âmbar exclusivamente como apoio semântico).
3. **Contraste WCAG 2.2 AA / AAA Garantido:**
   - Botão primário: Fundo `brand` (`#2DD4BF`) com texto `text-on-brand` (`#04201C`) = **12.4:1** (AAA).
   - Texto de marca no Light: `text-brand` (`#0F766E`) sobre fundo claro (`#F6FAFA`) = **5.1:1** (AA).
   - Textos primários, secundários e atalhos com contraste comprovado ≥ 4.5:1.

---

## 3. Arquitetura de Tokens (2 Camadas)

### Camada 1: Primitivas (Escalas HSL/HEX)
- Neutros tingidos: `neutral-50` a `neutral-950`
- Verde-água da Marca: `teal-50` a `teal-950`
- Cores de Apoio: `blue` (Sistemas/Web), `violet` (APIs/Core), `amber` (Integrações/Eventos), `red` (Perigo/Erro), `green` (Sucesso).

### Camada 2: Tokens Semânticos
Definidos em `:root` (Light) e `[data-theme="dark"]` / `.dark` (Dark):
- **Superfícies:** `bg-base`, `bg-surface`, `bg-elevated`, `bg-overlay`.
- **Bordas:** `border-subtle`, `border-default`, `border-strong`.
- **Tipografia:** `text-primary`, `text-secondary`, `text-muted`, `text-on-brand`, `text-brand`.
- **Ação & Marca:** `brand`, `brand-hover`, `brand-active`, `brand-subtle`.
- **Cores de Apoio:** `accent-blue`, `accent-blue-subtle`, `accent-violet`, `accent-violet-subtle`, `accent-amber`, `accent-amber-subtle`.
- **Feedback:** `success`, `warning`, `danger` (com variantes `-subtle`).
- **Estados & Efeitos:** `focus-ring`, `glow-brand`, `shadow-sm`, `shadow-md`, `shadow-lg`.

---

## 4. Ordem e Plano de Migração
1. **Tokens & Tailwind:** Registrar variáveis CSS em `src/index.css` e mapeá-las em `tailwind.config.ts`.
2. **Tema, Anti-FOUC & Toggle:** Atualizar `index.html` com script inline anti-FOUC, meta `color-scheme` e `theme-color`, e refatorar `ThemeProvider` e o alternador no `Footer.tsx`.
3. **Componentes Base:** Adaptar `Button`, `Card`, `Badge`, `Input`, `BrandChipIcon`, `CursorOrb`.
4. **Seções Principais:** Migrar `Header`, `Hero`, `Services`, `HowWeWork`, `Authority/Resultados`, `Contact` e `Footer`.
5. **Acessibilidade e Validação:** Tabela de contraste formal, execução dos 163 testes unitários e 43 testes E2E Playwright.
