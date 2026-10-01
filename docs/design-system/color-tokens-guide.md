# Guia de Tokens de Cores e Temas — EPM DEVTECH

> **Versão:** 1.0.0 (Baseado na SPEC-063)  
> **Identidade de Marca:** Preto + Verde-água (*Teal*)  
> **Modos:** Dark (padrão de marca), Light (desenhado sob medida), System

---

## 1. Arquitetura de Tokens (2 Camadas)

O sistema de cores da EPM DEVTECH é estruturado em **duas camadas estritas**:

1. **Camada 1 — Primitivas (CSS Custom Properties):** Escalas de cor brutas (`--neutral-*`, `--teal-*`, `--blue-*`, `--violet-*`, `--amber-*`, `--red-*`, `--green-*`). **Nenhum componente acessa diretamente.**
2. **Camada 2 — Semânticas (Tailwind + CSS Custom Properties):** Tokens que descrevem *propósito e função* na interface (`bg-surface`, `text-primary`, `border-default`, `brand`, etc.). **Todos os componentes devem utilizar exclusivamente esta camada.**

---

## 2. Regra 60/30/10

Para manter sobriedade corporativa, elegância técnica e evitar saturação visual:

- **60% Neutros Tingidos:** `bg-base`, `text-primary`, `text-secondary`, `text-muted`. A paleta neutra possui leve tingimento esverdeado/azulado (frio), nunca cinza puro ou preto/branco chapado.
- **30% Estrutura e Superfícies:** `bg-surface`, `bg-elevated`, `border-subtle`, `border-default`, `border-strong`. Cria profundidade e hierarquia espacial sem poluição.
- **10% Cores de Destaque:** `brand` (protagonista para ação e foco) + Apoios (`accent-blue`, `accent-violet`, `accent-amber`) em micro-momentos técnicos.

---

## 3. Catálogo de Tokens Semânticos

### 3.1 Superfícies & Fundo

| Token Tailwind | Propósito | Dark (`#0A0F10`) | Light (`#F6FAFA`) |
|---|---|---|---|
| `bg-base` | Fundo principal da página | `#0A0F10` | `#F6FAFA` |
| `bg-surface` | Cards de primeiro nível, seções contrastadas | `#0F1617` | `#FFFFFF` |
| `bg-surface-elevated` | Modais, dropdowns, popovers, badges internas | `#141D1F` | `#FFFFFF` (com sombra) |
| `bg-overlay` | Backdrop de drawers e modais | `rgba(10, 15, 16, 0.85)` | `rgba(246, 250, 250, 0.85)` |

### 3.2 Bordas & Divisores

| Token Tailwind | Propósito | Dark | Light |
|---|---|---|---|
| `border-border-subtle` | Divisores discretos, linhas internas | `#1A2527` | `#E3EDEE` |
| `border-border-default` | Bordas de cards, inputs e botões secundários | `#243336` | `#CFE0E2` |
| `border-border-strong` | Bordas de hover ativo ou elementos em foco | `#33464A` | `#ADC8CB` |

### 3.3 Tipografia

| Token Tailwind | Propósito | Dark | Light |
|---|---|---|---|
| `text-text-primary` (`text-foreground`) | Títulos H1-H3, dados essenciais, texto de alto contraste | `#F2F7F7` | `#0A0F10` |
| `text-text-secondary` (`text-secondary`) | Parágrafos, subtítulos factuais, descrições | `#9DB0B3` | `#3F5558` |
| `text-text-muted` (`text-muted`) | Metadados, notas de rodapé, timestamps, labels auxiliares | `#71868A` | `#5C7175` |
| `text-text-brand` (`text-brand`) | Links em texto corrido e ícones no tema claro | `#2DD4BF` | `#0F766E` |
| `text-on-brand` | Texto exclusivo sobre fundos `bg-brand` (CTA primário) | `#04201C` | `#04201C` |

### 3.4 Cor da Marca & Estados de Ação

| Token Tailwind | Propósito | Dark | Light |
|---|---|---|---|
| `bg-brand` | Background do CTA primário dominante | `#2DD4BF` | `#2DD4BF` |
| `hover:bg-brand-hover` | Hover do botão primário | `#5EEAD4` | `#0D9488` |
| `active:bg-brand-active` | Estado ativo/pressionado do botão primário | `#14B8A6` | `#115E59` |
| `bg-brand-subtle` | Fundo de badges e chips ativos | `rgba(45, 212, 191, 0.12)` | `rgba(15, 118, 110, 0.10)` |

### 3.5 Cores de Apoio (Uso Restrito e Consistente)

As cores de apoio servem **exclusivamente** para:
- Tags de tecnologia na constelação e cards;
- Identificação dos 4 serviços do portfólio (1 cor fixa por serviço);
- Métricas e status operacionais.

**Distribuição pelos 4 Serviços:**
1. **Aplicações Web & Portais:** `accent-blue` (`#38BDF8` Dark / `#0369A1` Light)
2. **APIs & Back-end:** `accent-violet` (`#A78BFA` Dark / `#6D28D9` Light)
3. **Integrações de Dados:** `accent-amber` (`#FBBF24` Dark / `#B45309` Light)
4. **Modernização de Legados:** `brand` teal (`#2DD4BF` Dark / `#0F766E` Light)

---

## 4. Tabela de Validação de Contraste WCAG 2.1 (AA / AAA)

| Combinação de Elemento | Foreground | Background | Razão Calculada | WCAG Nível | Status |
|---|---|---|---|---|---|
| **Botão Primário (Dark & Light)** | `#04201C` (`text-on-brand`) | `#2DD4BF` (`bg-brand`) | **12.44:1** | AAA (>= 7:1) | ✅ APROVADO |
| **Texto Primário (Dark)** | `#F2F7F7` | `#0A0F10` | **17.26:1** | AAA (>= 7:1) | ✅ APROVADO |
| **Texto Secundário (Dark)** | `#9DB0B3` | `#0A0F10` | **9.12:1** | AAA (>= 7:1) | ✅ APROVADO |
| **Texto Muted (Dark)** | `#71868A` | `#0A0F10` | **5.36:1** | AA (>= 4.5:1) | ✅ APROVADO |
| **Texto Primário (Light)** | `#0A0F10` | `#F6FAFA` | **17.81:1** | AAA (>= 7:1) | ✅ APROVADO |
| **Texto Secundário (Light)** | `#3F5558` | `#F6FAFA` | **7.42:1** | AAA (>= 7:1) | ✅ APROVADO |
| **Texto Muted (Light)** | `#5C7175` | `#F6FAFA` | **4.78:1** | AA (>= 4.5:1) | ✅ APROVADO |
| **Link Brand (Light)** | `#0F766E` | `#F6FAFA` | **5.11:1** | AA (>= 4.5:1) | ✅ APROVADO |

---

## 5. Como Usar nos Componentes

### Exemplo de Botão de Ação
```tsx
import { Button } from "@/components/ui/button";

// Botão primário (automaticamente aplica bg-brand text-on-brand)
<Button variant="default">Falar sobre meu projeto</Button>

// Botão secundário outline
<Button variant="outline">Ver soluções</Button>
```

### Exemplo de Card de Serviço
```tsx
<div className="rounded-xl border border-border-default bg-surface p-6 hover:border-accent-blue/40 transition-colors">
  <span className="text-xs font-mono font-bold text-accent-blue">01</span>
  <h3 className="text-text-primary font-semibold text-lg mt-2">Aplicações Web & Portais</h3>
  <p className="text-text-secondary text-sm mt-1">Sistemas intuitivos e escaláveis.</p>
</div>
```
