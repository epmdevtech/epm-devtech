# Inventário de Identidade Visual e Travas de Sistema (EPM DEVTECH)

> **Documento de Referência Canônica de Design System para o Redesign do Hero**  
> Elaborado conforme o protocolo SDD e requisitos da SPEC-059.  
> Fonte única da verdade para tokens, tipografia, superfícies e travas do Hero.

---

## 1. Paleta de Cores e Tokens de Superfície

### 1.1 Modo Escuro (Dark Mode — Padrão do Projeto)

| Token / Função | Valor CSS / HSL | Hex Aproximado | RGB Computado | Papel no Hero |
|---|---|---|---|---|
| `--background` | `0 0% 7%` | `#121212` | `rgb(18, 18, 18)` | Superfície-base sólida do Hero |
| `--foreground` | `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | H1 monocromático, texto primário |
| `--card` | `0 0% 7%` | `#121212` | `rgb(18, 18, 18)` | Fundo de superfícies |
| `--card-foreground`| `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | Texto sobre cards |
| `--primary` | `158 64% 42%` | `#10B981` / `#26b17c` | `rgb(38, 177, 124)` | Botão primário CTA, nó divisor |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | Texto do CTA primário |
| `--secondary` | `217.2 32.6% 17.5%` | `#1e293b` | `rgb(30, 41, 59)` | Superfície secundária |
| `--secondary-foreground` | `210 40% 98%` | `#f8fafc` | `rgb(248, 250, 252)` | Texto secundário |
| `--muted` | `217.2 32.6% 17.5%` | `#1e293b` | `rgb(30, 41, 59)` | Elementos desativados/atenuados |
| `--muted-foreground` | `215 20.2% 65.1%` / `zinc-400` | `#94a3b8` / `#a1a1aa` | `rgb(148, 163, 184)` / `rgb(161, 161, 170)` | Subheadline, link secundário |
| `--border` | `217.2 32.6% 17.5%` | `#1e293b` | `rgb(30, 41, 59)` | Linha divisória de 1px |
| `--ring` | `158 64% 52%` | `#34d399` | `rgb(52, 211, 153)` | Anel de foco visível (a11y) |

### 1.2 Modo Claro (Light Mode)

| Token / Função | Valor CSS / HSL | Hex Aproximado | RGB Computado | Papel no Hero |
|---|---|---|---|---|
| `--background` | `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | Superfície-base sólida do Hero |
| `--foreground` | `222.2 84% 4.9%` | `#020817` | `rgb(2, 8, 23)` | H1 monocromático, texto primário |
| `--card` | `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | Fundo de superfícies |
| `--card-foreground`| `222.2 84% 4.9%` | `#020817` | `rgb(2, 8, 23)` | Texto sobre cards |
| `--primary` | `158 75% 36%` | `#17a36f` / `#10B981` | `rgb(23, 163, 111)` | Botão primário CTA, nó divisor |
| `--primary-foreground` | `0 0% 100%` | `#ffffff` | `rgb(255, 255, 255)` | Texto do CTA primário |
| `--secondary` | `210 40% 96.1%` | `#f1f5f9` | `rgb(241, 245, 249)` | Superfície secundária |
| `--secondary-foreground` | `222.2 47.4% 11.2%`| `#0f172a` | `rgb(15, 23, 42)` | Texto secundário |
| `--muted` | `210 40% 96.1%` | `#f1f5f9` | `rgb(241, 245, 249)` | Elementos desativados/atenuados |
| `--muted-foreground` | `215.4 16.3% 38%` / `zinc-600` | `#515e71` / `#52525b` | `rgb(81, 94, 113)` / `rgb(82, 82, 91)` | Subheadline, link secundário |
| `--border` | `214.3 31.8% 91.4%`| `#e2e8f0` | `rgb(226, 232, 240)` | Linha divisória de 1px |
| `--ring` | `158 64% 45%` | `#29bc86` | `rgb(41, 188, 134)` | Anel de foco visível (a11y) |

---

## 2. Tipografia

- **Família Sans Primária:** `Geist`, `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Família Mono (Eyebrows, Tags, Código):** `Geist Mono`, `JetBrains Mono`, `Fira Code`, `Consolas`, `monospace`

### Escala e Hierarquia Tipográfica Aplicada:
1. **H1 (Hero):**
   - Família: Sans
   - Peso: `font-bold` (`700`)
   - Tamanho: fluido via `clamp(2rem, 1.2rem + 3.2vw, 3.5rem)`
   - Entrelinha (`line-height`): `1.12` a `1.15`
   - Tracking: `tracking-tight` (`-0.025em`)
   - Quebra: `[text-wrap:balance]`, `max-w-[20ch]` natural (sem `<br>` forçado)
   - Cor: monocromática sólida (`text-foreground` / `text-zinc-900 dark:text-white`)
2. **Subheadline (Hero):**
   - Família: Sans
   - Peso: `font-normal` (`400`)
   - Tamanho: fluido via `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)` (aprox. `16px` a `18px`)
   - Entrelinha: `1.6` (`leading-relaxed`)
   - Quebra: `[text-wrap:pretty]`, `max-w-2xl` (`≈60–64ch`)
   - Cor: atenuada sólida (`text-muted-foreground` / `text-zinc-600 dark:text-zinc-400`)
3. **Eyebrow:**
   - Família: Mono
   - Peso: `font-medium` (`500`)
   - Tamanho: `text-[11.5px]`
   - Caixa e espaçamento: `uppercase`, `tracking-[0.1em]`
   - Ícone acoplado: `BrandChipIcon` (`size={15}`) em verde esmeralda (`#10B981`)
   - Cor: `text-zinc-500 dark:text-zinc-400`
4. **CTAs:**
   - Botão Primário: Sans, `font-medium` / `font-semibold`, `text-sm sm:text-base`
   - Link Secundário: Sans, `font-medium`, `text-sm sm:text-base`, `underline-offset-4 hover:underline`

---

## 3. Formas, Superfícies e Bordas

- **Raios de Borda (`border-radius`):**
  - Botão Primário: `rounded-md` (`calc(var(--radius) - 2px)` = `6px`)
  - Nó da Linha Divisória: `rounded-full` (`9999px`)
- **Espessura de Borda:** `1px` uniforme
- **Opacidade de Bordas:** Sólida ou `border-border` (`rgba` controlada por variáveis sem degradê)
- **Sombras:** Sutis (`shadow-xs` ou `shadow-sm`), zero glow difuso exagerado.

---

## 4. Gradientes Existentes no Projeto (REGISTRO DE EXCLUSÃO DO HERO)

O projeto possui gradientes em seções secundárias ou legadas:
- `bg-gradient-conic` e `[mask-image:linear-gradient]` em `src/components/ui/lamp.tsx`
- `.hero-brand-aura` em `src/index.css` (radial-gradient obsoleto)
- `.hww-pipeline-fill` em `HowWeWork.tsx` (linear-gradient do pipeline)
- `gradient-hero`, `grid-pattern` em `tailwind.config.ts`

> ⚠️ **TRAVA ABSOLUTA DO HERO:**  
> **Nenhum** dos gradientes acima pode ser utilizado no Hero.  
> O Hero deve ser **100% de cor sólida** em Dark e Light.  
> Proibido: `linear-gradient`, `radial-gradient`, `conic-gradient`, `mask-image`, `border-image`, `background-clip: text`.

---

## 5. Padrões de Assinatura EPM DEVTECH

1. **Eyebrow com Ícone da Marca:** `BrandChipIcon` (15px, traço 1.8px em `#10B981`) seguido de rótulo mono em caixa-alta com tracking `0.1em`.
2. **Pino / Nó Esmeralda da Marca:** Círculo sólido de 8–10px em `#10B981` (`bg-primary`), ecoando os nós da linha do tempo.
3. **CTA com Acento Esmeralda:** Botão primário em cor sólida `bg-primary text-primary-foreground` com contraste WCAG AA ≥ 4.5:1.
4. **Foco Acessível (WCAG AA):** Anel de foco em `ring-2 ring-primary ring-offset-2 ring-offset-background`.
5. **Transição de Seção Slim:** Linha horizontal de 1px com nó centralizado esmeralda sólido sem brilho.

---

## 6. Travas de Implementação e Quality Gates

1. **Zero Valores Literais Arbitrários:** Todo estilo usa classes utilitárias de tokens Tailwind (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `border-border`, etc.).
2. **Componentes Padrão:** Reuso de `Button` do shadcn/ui e padrão de eyebrow de `SectionHeader`.
3. **Sem Efeitos Paralelos:** O Hero não cria seu próprio cursor orb, nem partículas, nem luz volumétrica.
4. **Verificação Automatizada (Playwright):** Teste E2E dedicado checará os valores computados de cor, fundo, raio, fonte e ausência total de `gradient(` no Hero.
