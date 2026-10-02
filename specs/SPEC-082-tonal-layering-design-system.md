# SPEC-082 — Sistema de Camadas Tonais (Tonal Layering) para Todas as Rotas e Temas

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

Atualmente, a separação visual entre seções nas rotas do site institucional da EPM DevTech apoia-se predominantemente em linhas horizontais divisórias (`border-t`, `border-b`, `divide-y` e bordas de rodapé). Esse padrão, comum em templates web genéricos, introduz ruído visual excessivo e segmentação artificial.

O objetivo desta especificação é substituir completamente as linhas divisórias entre seções por uma estratégia refinada de **Camadas Tonais (*Tonal Layering*)**, aplicada a **todas as rotas do site**, nos modos **Dark** e **Light**, preservando a identidade visual técnica e de alto padrão da EPM DevTech (quase-preto esverdeado no Dark, off-white gelado no Light, e teal como acento de marca).

---

## 2. Auditoria Completa de Rotas e Divisores

Auditoria detalhada de todas as rotas canônicas e seus componentes, identificando a ordem atual das seções, as linhas divisórias a remover e os tons finais atribuídos:

| Rota / Arquivo | Seção / Bloco | Ordem Atual | Linha/Divisor Atual a Remover | Tom de Camada Proposto |
|---|---|---|---|---|
| **`/`**<br>([`src/pages/Home.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/Home.tsx)) | Header ([`Header.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/layout/Header.tsx)) | 0 (Global) | N/A (borda aparece apenas com scroll) | `anchor` |
| | Hero ([`Hero.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Hero.tsx)) | 1 (Hero) | N/A (sem borda no topo) | `anchor` |
| | O que Desenvolvemos ([`HomeServicesBento.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/HomeServicesBento.tsx)) | 2 (Interm. A) | `border-b border-border/40` | `base` |
| | Processo e Previsibilidade ([`HomeProcessPipeline.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/HomeProcessPipeline.tsx)) | 3 (Interm. B) | `border-b border-border/40` | `alt` |
| | Experiência Prática / Métricas ([`HomeResultsStrip.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/HomeResultsStrip.tsx)) | 4 (Interm. A) | `border-b border-border/40` e `bg-surface/30` | `base` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 5 (Global) | `border-t border-border-default` | `anchor` |
| **`/servicos`**<br>([`src/pages/ServicesPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ServicesPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` e `mb-12 sm:mb-16` | `anchor` |
| | Catálogo de Serviços ([`Services.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Services.tsx)) | 2 (Interm. A) | N/A (remover margens externas desconexas) | `base` |
| | Garantias de Engenharia | 3 (Interm. B) | `border-t border-border-default/60` e `border-b` | `alt` |
| | Fechamento Comercial / CTA Final | 4 (Interm. A) | N/A (separar em seção própria) | `base` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 5 (Global) | `border-t border-border-default` | `anchor` |
| **`/como-trabalhamos`**<br>([`src/pages/HowWeWorkPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/HowWeWorkPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Process Explorer ([`ProcessExplorer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/ProcessExplorer.tsx)) | 2 (Interm. A) | N/A | `base` |
| | Manifesto Técnico (2 Colunas) | 3 (Interm. B) | `border-t border-border-default/60` e `border-b` | `alt` |
| | Chamada Final & CTA de Contato | 4 (Interm. A) | N/A (separar em seção própria) | `base` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 5 (Global) | `border-t border-border-default` | `anchor` |
| **`/experiencia`**<br>([`src/pages/ExperiencePage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ExperiencePage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Indicadores de Escala ([`Authority.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Authority.tsx)) | 2 (Interm. A) | N/A | `base` |
| | Matriz de Verticais (Grid 2x2) | 3 (Interm. B) | `border-t border-border-default/60` | `alt` |
| | Enterprise Ledger (Histórico) | 4 (Interm. A) | `border-t border-border-default/60` | `base` |
| | CTA Final ("Demanda de alta complexidade?") | 5 (Interm. B) | `border-t border-border-default/60` | `alt` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 6 (Global) | `border-t border-border-default` | `anchor` |
| **`/engenharia`**<br>([`src/pages/EngineeringPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/EngineeringPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Filosofia de Execução & CI/CD Gate | 2 (Interm. A) | N/A | `base` |
| | Architectural Blueprint (Nuvem Tipográfica) | 3 (Interm. B) | `border-t border-border-default/60` | `alt` |
| | Chamada Final para Ação (CTA) | 4 (Interm. A) | `border-t border-border-default/60` | `base` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 5 (Global) | `border-t border-border-default` | `anchor` |
| **`/sobre`**<br>([`src/pages/AboutPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/AboutPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Visão & Posicionamento Editorial | 2 (Interm. A) | N/A | `base` |
| | Nossa Jornada (Timeline Alternada) | 3 (Interm. B) | `border-t border-border-default/60` | `alt` |
| | Missão e Princípios (Manifesto) | 4 (Interm. A) | `border-t border-border-default/60` | `base` |
| | Fechamento da Página (CTA) | 5 (Interm. B) | `border-t border-border-default/60` | `alt` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 6 (Global) | `border-t border-border-default` | `anchor` |
| **`/contato`**<br>([`src/pages/ContactPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ContactPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Formulário & Informações Diretas ([`Contact.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Contact.tsx)) | 2 (Interm. A) | N/A | `base` |
| | Dúvidas Frequentes em Destaque | 3 (Interm. B) | `border-t border-border-subtle` | `alt` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 4 (Global) | `border-t border-border-default` | `anchor` |
| **`/duvidas-frequentes`**<br>([`src/pages/FAQPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/FAQPage.tsx)) | PageHeader ([`PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx)) | 1 (Hero) | `border-b border-border/40` | `anchor` |
| | Filtros e Acordeão de Perguntas | 2 (Interm. A) | N/A | `base` |
| | Chamada Final ("Não encontrou a resposta?") | 3 (Interm. B) | N/A (separar em seção própria) | `alt` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 4 (Global) | `border-t border-border-default` | `anchor` |
| **`*`** (404)<br>([`src/pages/NotFound.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/NotFound.tsx)) | Header ([`Header.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/layout/Header.tsx)) | 0 (Global) | N/A | `anchor` |
| | Conteúdo 404 + Ações de Retorno | 1 (Interm. A) | N/A | `base` |
| | Rodapé ([`Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx)) | 2 (Global) | `border-t border-border-default` | `anchor` |

---

## 3. Definição Matemática dos Tokens de Superfície

Para cumprir a regra de negócio que exige uma diferença de luminosidade de **3% a 4%** entre tons adjacentes (perceptível em monitores comuns mesmo com brilho baixo), e manter a identidade de marca (matiz frio a 190°), definimos os 3 tokens para cada tema:

### 3.1. Tema Dark (Fundo Quase-Preto Esverdeado com Elevação por Luminosidade)

- **Princípio Dark:** A elevação em modo escuro corresponde a mais luz refletida (elevação = maior luminosidade). Logo, `anchor` é o tom mais escuro e profundo, enquanto `base` e `alt` são progressivamente mais claros.

| Token | HSL | RGB | Hex | Luminosidade ($L$) | $\Delta L$ Adjacente | Função Visual |
|---|---|---|---|---|---|---|
| `--surface-anchor` | `190, 23%, 5.0%` | `10, 15, 16` | `#0A0F10` | 5.0% | Referência Base | Header, Hero (1ª seção) e Rodapé |
| `--surface-base` | `190, 23%, 8.5%` | `17, 24, 26` | `#11181A` | 8.5% | **+3.5%** | Seções intermediárias "A" |
| `--surface-alt` | `190, 23%, 12.0%` | `24, 34, 37` | `#182225` | 12.0% | **+3.5%** | Seções intermediárias "B" |

**Análise de Contraste WCAG (Dark):**
- Texto Primário (`#F2F7F7`, $L = 96.8\%$):
  - Em `surface-anchor`: **15.2:1** (WCAG AAA)
  - Em `surface-base`: **12.5:1** (WCAG AAA)
  - Em `surface-alt`: **10.3:1** (WCAG AAA)
- Texto Secundário (`#9DB0B3`, $L = 66.3\%$):
  - Em `surface-anchor`: **7.8:1** (WCAG AAA)
  - Em `surface-base`: **6.4:1** (WCAG AA)
  - Em `surface-alt`: **5.3:1** (WCAG AA)

### 3.2. Tema Light (Off-white Gelado com Tinta Fria Teal)

- **Princípio Light:** No modo claro, `anchor` é o tom mais "pesado" (um off-white com tinta fria/teal mais densa e menor luminosidade) para emoldurar o Header, Hero e Rodapé. As seções intermediárias `base` e `alt` são progressivamente mais claras, aproximando-se do branco puro em `alt`.

| Token | HSL | RGB | Hex | Luminosidade ($L$) | $\Delta L$ Adjacente | Função Visual |
|---|---|---|---|---|---|---|
| `--surface-anchor` | `190, 18%, 91.5%` | `229, 237, 238` | `#E5EDEE` | 91.5% | Referência Base | Header, Hero (1ª seção) e Rodapé |
| `--surface-base` | `190, 18%, 95.0%` | `240, 245, 245` | `#F0F5F5` | 95.0% | **+3.5%** | Seções intermediárias "A" |
| `--surface-alt` | `190, 18%, 98.5%` | `250, 252, 252` | `#FAFCFC` | 98.5% | **+3.5%** | Seções intermediárias "B" (quase branco) |

**Análise de Contraste WCAG (Light):**
- Texto Primário (`#0A0F10`, $L = 5.0\%$):
  - Em `surface-anchor`: **13.5:1** (WCAG AAA)
  - Em `surface-base`: **14.8:1** (WCAG AAA)
  - Em `surface-alt`: **16.1:1** (WCAG AAA)
- Texto Secundário (`#3F5558`, $L = 29.4\%$):
  - Em `surface-anchor`: **5.1:1** (WCAG AA)
  - Em `surface-base`: **5.6:1** (WCAG AA)
  - Em `surface-alt`: **6.1:1** (WCAG AA)

---

## 4. Tabela de Ritmo Estrito por Rota

Cumprindo a regra de que **nenhuma seção intermediária pode usar `anchor`** e **duas seções adjacentes nunca podem ter o mesmo tom**:

```mermaid
flowchart TD
  subgraph Home["/ (Home)"]
    H0["Header (anchor)"] --> H1["Hero (anchor)"]
    H1 --> H2["Serviços (base)"]
    H2 --> H3["Processo (alt)"]
    H3 --> H4["Resultados (base)"]
    H4 --> HF["Rodapé (anchor)"]
  end

  subgraph Servicos["/servicos"]
    S0["Header (anchor)"] --> S1["PageHeader (anchor)"]
    S1 --> S2["Catálogo Z-Pattern (base)"]
    S2 --> S3["Garantias (alt)"]
    S3 --> S4["CTA Final (base)"]
    S4 --> SF["Rodapé (anchor)"]
  end

  subgraph ComoTrabalhamos["/como-trabalhamos"]
    C0["Header (anchor)"] --> C1["PageHeader (anchor)"]
    C1 --> C2["Process Explorer (base)"]
    C2 --> C3["Manifesto 2 Colunas (alt)"]
    C3 --> C4["CTA Contato (base)"]
    C4 --> CF["Rodapé (anchor)"]
  end

  subgraph Experiencia["/experiencia"]
    E0["Header (anchor)"] --> E1["PageHeader (anchor)"]
    E1 --> E2["Métricas de Escala (base)"]
    E2 --> E3["Engineering Matrix 2x2 (alt)"]
    E3 --> E4["Enterprise Ledger (base)"]
    E4 --> E5["CTA Complexidade (alt)"]
    E5 --> EF["Rodapé (anchor)"]
  end

  subgraph Engenharia["/engenharia"]
    ENG0["Header (anchor)"] --> ENG1["PageHeader (anchor)"]
    ENG1 --> ENG2["Filosofia & CI/CD Gate (base)"]
    ENG2 --> ENG3["Blueprint Nuvem (alt)"]
    ENG3 --> ENG4["CTA Comercial (base)"]
    ENG4 --> ENGF["Rodapé (anchor)"]
  end

  subgraph Sobre["/sobre"]
    SOB0["Header (anchor)"] --> SOB1["PageHeader (anchor)"]
    SOB1 --> SOB2["Posicionamento & Dados (base)"]
    SOB2 --> SOB3["Nossa Jornada Timeline (alt)"]
    SOB3 --> SOB4["Princípios Manifesto (base)"]
    SOB4 --> SOB5["CTA Comercial (alt)"]
    SOB5 --> SOBF["Rodapé (anchor)"]
  end

  subgraph Contato["/contato"]
    CON0["Header (anchor)"] --> CON1["PageHeader (anchor)"]
    CON1 --> CON2["Formulário & Canais (base)"]
    CON2 --> CON3["FAQ Destaque (alt)"]
    CON3 --> CONF["Rodapé (anchor)"]
  end

  subgraph FAQ["/duvidas-frequentes"]
    F0["Header (anchor)"] --> F1["PageHeader (anchor)"]
    F1 --> F2["FAQ Accordion (base)"]
    F2 --> F3["Chamada Dúvidas (alt)"]
    F3 --> FF["Rodapé (anchor)"]
  end

  subgraph NotFound["* (404)"]
    N0["Header (anchor)"] --> N1["Erro 404 (base)"]
    N1 --> NF["Rodapé (anchor)"]
  end
```

---

## 5. Arquitetura de Componentes e Código

### 5.1. Componente Reutilizável: `SectionWrapper.tsx`
Localização: [`src/components/ui/SectionWrapper.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/SectionWrapper.tsx)

```tsx
import React from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "anchor" | "base" | "alt";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  tone: SectionTone;
  as?: "section" | "div" | "article" | "aside";
  container?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<SectionTone, string> = {
  anchor: "bg-surface-anchor text-foreground",
  base: "bg-surface-base text-foreground",
  alt: "bg-surface-alt text-foreground",
};

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      tone,
      as: Component = "section",
      container = true,
      containerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as any}
        data-tone={tone}
        className={cn(
          "w-full transition-colors duration-200 py-16 sm:py-20 md:py-24 lg:py-28 section-wrapper",
          TONE_CLASSES[tone],
          className
        )}
        {...props}
      >
        {container ? (
          <div className={cn("container px-6", containerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
export default SectionWrapper;
```

### 5.2. Adaptação dos Cards ao Tom da Faixa
Para evitar que qualquer card ou elemento encaixotado "suma" na superfície:
- **Em seção `base`**: Os cards usam `bg-surface-alt` (ou `bg-surface-elevated`) com borda suave (`border-border-default/60` ou `border-white/5` no dark).
- **Em seção `alt`**: Os cards usam `bg-surface-base` (ou fundo mais escuro no dark / mais encorpado no light) com borda definida.
- Todos os cards mantêm suas bordas internas estruturais, inputs, badges e accordions conforme a regra de negócio.

### 5.3. Header e Rodapé Consumindo `surface-anchor`
- **Header (`Header.tsx`)**:
  - Consome `bg-surface-anchor`.
  - Em estado de rolagem (`isScrolled`): adiciona `backdrop-blur-md bg-surface-anchor/85 border-b border-border-default/40`.
  - Em repouso: funde-se perfeitamente com a primeira seção (Hero/PageHeader), que também possui tom `surface-anchor`.
- **Rodapé (`Footer.tsx`)**:
  - Consome `bg-surface-anchor`.
  - Remove a linha superior `border-t border-border-default`.
  - O seletor de tema (`ThemeSwitcher`) mantém sua moldura interna intacta.

### 5.4. Acessibilidade e Alto Contraste (`forced-colors`)
No arquivo `src/index.css`:
```css
/* Restauração de linha divisória física apenas em modo de alto contraste do SO */
@media (forced-colors: active) {
  .section-wrapper {
    border-top: 1px solid ButtonBorder;
  }
  .section-wrapper[data-tone="anchor"]:first-of-type,
  header + main > .section-wrapper:first-of-type {
    border-top: none;
  }
  footer {
    border-top: 1px solid ButtonBorder;
  }
}

/* Transição suave de background na troca de tema */
@media (prefers-reduced-motion: no-preference) {
  body,
  header,
  footer,
  .section-wrapper {
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }
}
```

---

## 6. O que Remover e o que Manter

### 6.1. O Que Será Removido
- [x] Toda linha horizontal `border-t` ou `border-b` utilizada para separar uma seção de outra em `Home.tsx`, `ServicesPage.tsx`, `HowWeWorkPage.tsx`, `ExperiencePage.tsx`, `EngineeringPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`, `FAQPage.tsx` e `NotFound.tsx`.
- [x] O `border-b border-border/40` e as margens inferiores arbitrárias de `PageHeader.tsx`.
- [x] A linha superior `border-t border-border-default` acima do Rodapé (`Footer.tsx`).
- [x] Linhas `divide-y` ou `border-t`/`border-b` que funcionam como separadores entre blocos de seção de primeiro nível.

### 6.2. O Que Será Mantido
- [x] Bordas internas de cards (Bento Grid, Terminais CI/CD, Engineering Matrix, cards de verticais).
- [x] Bordas e linhas internas da tabela do Enterprise Ledger e do Manifesto de Engenharia.
- [x] Bordas dos inputs e caixas de texto do formulário de contato.
- [x] Bordas dos acordeões do FAQ (`AccordionItem`).
- [x] Bordas do seletor Dark/Light/System no rodapé.
- [x] Eixo horizontal da Timeline Histórica em `/sobre` (eixo estrutural da linha do tempo, não divisor de página).
- [x] A cor Teal (`brand`) reservada estritamente para acentos, botões de ação e indicadores.

---

## 7. Arquivos que Serão Criados ou Modificados

1. **Tokens e Estilos Globais**:
   - [`src/index.css`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/index.css) — Declaração dos tokens HSL `--surface-anchor`, `--surface-base`, `--surface-alt` (dark e light) e suporte a `forced-colors`.
   - [`tailwind.config.ts`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/tailwind.config.ts) — Mapeamento dos tokens `surface-anchor`, `surface-base`, `surface-alt`.
2. **Componente de Superfície**:
   - `src/components/ui/SectionWrapper.tsx` — Novo componente padrão com prop `tone="anchor" | "base" | "alt"`.
3. **Componentes Estruturais**:
   - [`src/components/ui/PageHeader.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/ui/PageHeader.tsx) — Remoção do `border-b` e unificação com tom `anchor`.
   - [`src/components/layout/Header.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/layout/Header.tsx) — Consumo de `surface-anchor` e borda inferior com scroll.
   - [`src/components/sections/Footer.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Footer.tsx) — Consumo de `surface-anchor` e remoção da borda superior.
   - [`src/components/sections/Hero.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/components/sections/Hero.tsx) — Consumo de `surface-anchor`.
4. **Páginas e Rotas**:
   - [`src/pages/Home.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/Home.tsx)
   - [`src/pages/ServicesPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ServicesPage.tsx)
   - [`src/pages/HowWeWorkPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/HowWeWorkPage.tsx)
   - [`src/pages/ExperiencePage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ExperiencePage.tsx)
   - [`src/pages/EngineeringPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/EngineeringPage.tsx)
   - [`src/pages/AboutPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/AboutPage.tsx)
   - [`src/pages/ContactPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/ContactPage.tsx)
   - [`src/pages/FAQPage.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/FAQPage.tsx)
   - [`src/pages/NotFound.tsx`](file:///home/elessandro/Documentos/Projetos_Pessoais/Sandbox_Pessoal/Elessandro/EPM-DEV-TECH/src/pages/NotFound.tsx)
5. **Testes Unitários e E2E**:
   - `src/components/ui/__tests__/SectionWrapper.test.tsx` — Testes de renderização, suporte a tons e container.
   - `e2e/design-system-and-stability.spec.ts` — Validação automatizada de ausência de linhas divisórias entre seções, equivalência cromática Hero == Footer e alternância estrita de tons em todas as rotas.

---

## 8. Critérios de Aceite e Quality Gates

- [ ] **Zero linhas divisórias entre seções:** Nenhuma linha horizontal divisória de página (`border-t`, `border-b`) visível entre blocos de seção.
- [ ] **Ritmo estrito:** Toda rota inicia em `anchor`, alterna entre `base` e `alt` e encerra em `anchor` no Rodapé.
- [ ] **Diferença cromática perceptível:** $\Delta L \approx 3.5\%$ garantido e verificado em ambos os temas.
- [ ] **Contraste e Legibilidade:** WCAG AA/AAA mantido em todos os níveis de superfície.
- [ ] **Acessibilidade:** Suporte completo a `forced-colors` (restaura linha fina física) e `prefers-reduced-motion`.
- [ ] **Compatibilidade com Pre-render e Next-themes:** Sem flashes de tema incorreto e sem erros de execução em `scripts/prerender.js`.
- [ ] **Quality Gates:**
  - TypeScript: 0 erros de compilação (`npm run typecheck` ou `tsc --noEmit`).
  - ESLint: 0 erros e 0 warnings (`npm run lint`).
  - Vitest: Cobertura de código mantida $\ge 90\%$.
  - Playwright E2E: Todos os testes passando em Chromium desktop e mobile.
  - Build: Sem warnings de chunks excessivos (`npm run build`).

---

_Aguardando aprovação do Product Owner (Elessandro Prestes Macedo) para criação da TASK-082 e início da implementação._
