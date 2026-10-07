# SPEC-111 — Arquitetura de Hero Split (60/40) e Artefatos Visuais Técnicos Autorais

| Campo             | Valor                                                                 |
|-------------------|-----------------------------------------------------------------------|
| **ID**            | SPEC-111                                                              |
| **Título**        | Refatoração de Heros Multi-Rota com Layout Split 60/40 e Artefatos Técnicos |
| **Data**          | 2026-10-07                                                            |
| **Autor**         | Gemini / Antigravity                                                  |
| **Status**        | Aprovado pelo PO                                                      |
| **Implementação** | TASK-111                                                              |

---

## 1. Contexto & Motivação

Atualmente, enquanto a Home (`/`) e a rota Sobre Nós (`/about`) contavam com composições de 2 colunas com elementos gráficos no lado direito (`BusinessScenarioSelector` e `EpmConstellation`, respectivamente), as demais rotas internas (`/services`, `/how-we-work`, `/experience`, `/engineering`, `/contact`) utilizavam um cabeçalho editorial de bloco único centralizado estreito (`PageHeader`), criando uma sensação de descontinuidade estrutural e visual entre a página inicial e as páginas de autoridade técnica.

Faz-se necessária a padronização arquitetural de todos os Heros do site sob um componente unificado `<PageHero />` baseado em um layout assimétrico split (60% editorial / 40% visual em desktop), atribuindo a cada uma das rotas um artefato visual técnico autoral e exclusivo no lado direito, alinhado à linguagem de microcircuitos, barramento de dados e engenharia da marca EPM DevTech.

---

## 2. Objetivos

1. **Componente Reutilizável Unificado (`PageHero.tsx`)**:
   - Criar `src/components/layout/PageHero.tsx` com proporção 60/40 (`lg:col-span-7` / `lg:col-span-5`).
   - Suporte semântico para `eyebrow`, `title`, `highlightText`, `description`, `visual`, `primaryCta`, `id`, `data-tone="anchor"` e classes customizadas.
   - Preservação estrita das travas de acessibilidade, contraste WCAG AAA/AA, ritmo tonal e suporte a `prefers-reduced-motion`.

2. **Artefatos Visuais Técnicos Autorais**:
   - Desenvolver 5 novos componentes visuais autorais em SVG/Tailwind dedicados:
     1. **`/services` — `ServicesHeroVisual`**: Microcircuito de barramento de microsserviços, roteador de alta concorrência e nós de mensageria com traços em 45º e status de latência.
     2. **`/how-we-work` — `HowWeWorkHeroVisual`**: Esteira de circuito de execução determinística com os 4 portais de validação de qualidade (Diagnóstico → Escopo → Código → Evolução).
     3. **`/experience` — `ExperienceHeroVisual`**: Cluster de nós de alta disponibilidade com telemetria HUD industrial (99,9% uptime, 2.500 RPS e integridade de dados).
     4. **`/engineering` — `EngineeringHeroVisual`**: Kernel de arquitetura de software chanfrado com barramento de 64-bit, diodos de testes/cobertura e diretrizes de clean code.
     5. **`/contact` — `ContactHeroVisual`**: Circuito de canal seguro e handshake ponto-a-ponto (P2P) conectando diretamente o decisor à liderança técnica sem intermediários.
   - Manter na Home (`/`) o seletor de cenários de negócio (`BusinessScenarioSelector`).
   - Manter na rota Sobre Nós (`/about`) a constelação interativa (`EpmConstellation`).

3. **Integração nas 7 Rotas Canônicas**:
   - Integrar `<PageHero />` em `/`, `/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`.
   - Garantir 100% de compatibilidade com os testes unitários e com a suíte Playwright E2E.

---

## 3. Especificação Técnica

### 3.1 Interface do Componente `PageHero`
```tsx
export interface PageHeroProps {
  id?: string;
  eyebrow: string;
  title: string;
  highlightText?: string;
  description: string;
  visual: React.ReactNode;
  primaryCta?: React.ReactNode;
  className?: string;
}
```

### 3.2 Estrutura do Layout e Classes
- Seção: `data-tone="anchor"`, `relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-border-default/40 bg-surface-anchor text-foreground transition-colors duration-200`.
- Fundo: Efeito difuso focal radial no quadrante direito com gradiente esmeralda/ciano suave.
- Container editorial: Largura máxima de 1280px (`max-w-[1280px] w-[min(100%-48px,1280px)] mx-auto`).
- Grid: 12 colunas em desktop com `lg:col-span-7` para narrativa e `lg:col-span-5` para o artefato técnico.
- Tipografia:
  - Eyebrow: `text-[0.8rem] font-semibold tracking-[0.04em] text-text-brand uppercase leading-[1.3] mb-3 inline-flex items-center gap-2`.
  - H1: `text-[clamp(2.75rem,5vw,4.5rem)] font-bold tracking-[-0.05em] leading-[1.02] text-primary max-w-[20ch] [text-wrap:balance]`.
  - Descrição: `mt-6 text-[clamp(1rem,1.15vw,1.125rem)] text-secondary leading-[1.65] max-w-[58ch]`.

---

## 4. Quality Gates

- Vitest: 100% dos testes unitários passando.
- ESLint: zero erros.
- Build: zero warnings de chunks > 600KB e pré-render estático preservado.
- Playwright: 46/46 testes E2E aprovados.
- Sem commit automático (aguardar validação explícita do usuário).

---

_Aprovado pelo PO: Elessandro Prestes Macedo_
