# SPEC-085 — Reorganização de Métricas: Migração de Contadores Numéricos para a Home e Início Editorial em Experiência

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Animação / Home & Experiência

---

## 1. Contexto e Motivação

Atualmente, a exibição de métricas de engenharia e resultados operacionais está dividida de forma assimétrica:
1. Na Home (`/`), a seção de Resultados (`HomeResultsStrip.tsx`) exibe dados estáticos com textos genéricos ("Alta disponibilidade", "Requisições por segundo", "+448", "Zero"), sem animação progressiva.
2. Na página `/experiencia`, o topo exibia um bloco de contadores animados (`CountUp` em `Authority.tsx`), antes de conduzir o leitor para a Matriz de Verticais de Negócio.

Para maximizar o impacto técnico para tomadores de decisão e clientes corporativos que acessam a Home, e ao mesmo tempo tornar a página `/experiencia` mais focada e editorial:
- **Home (`/`)**: Receberá os contadores numéricos animados incrementais (`CountUp`) com ativação na entrada da viewport (`useInView`), exibindo os dados mais específicos e técnicos da experiência prática da liderança de engenharia.
- **Experiência (`/experiencia`)**: O bloco de contadores superiores será removido, permitindo que a página inicie diretamente com o PageHeader editorial e transite harmoniosamente para a Matriz de Verticais de Negócio e o Enterprise Ledger corporativo.

---

## 2. Escopo

### 2.1 Em Escopo
1. **Refatoração da Seção de Resultados da Home (`HomeResultsStrip.tsx` e `Home.tsx`)**:
   - Atualização das 4 métricas técnicas com contador animado incremental (`CountUp`):
     * **Métrica 01**: `end: 99.9`, `decimals: 1`, `suffix: "%"` | Rótulo: `"Disponibilidade assegurada"` | Detalhe: `"Em plataformas críticas de energia e educação."`
     * **Métrica 02**: `end: 2500`, `decimals: 0`, `suffix: " RPS"`, `formatThousands: true` | Rótulo: `"Arquitetura dimensionada"` | Detalhe: `"Para picos de 10.000 usuários simultâneos sem gargalos."`
     * **Métrica 03**: `end: 100`, `decimals: 0`, `suffix: "%"` | Rótulo: `"Integridade de dados"` | Detalhe: `"Na consolidação regulatória do setor elétrico, sem perdas."`
     * **Métrica 04**: `end: 35`, `decimals: 0`, `prefix: "−"`, `suffix: "%"` | Rótulo: `"Atividades manuais reduzidas"` | Detalhe: `"Automações e integrações em plataformas modernizadas."`
   - Integração do hook `useInView` com gatilho `once: true` para iniciar a contagem suave quando a seção entra na tela.
   - Suporte rigoroso a `prefers-reduced-motion` e ambientes de teste (renderização estática imediata sem descontinuidades).
   - Manutenção do formato **Stat Strip** aberto (sem caixas fechadas), com divisores verticais sutis no desktop (`md:divide-x divide-border-subtle/50 dark:divide-zinc-800/80`).
   - Rótulos em destaque com `text-text-brand`, números monospace de alto contraste (`font-mono text-primary font-extrabold`) e descrições técnicas em `text-secondary`.
   - Atualização do link de rodapé na Home para: `"Ver projetos detalhados →"` direcionando para `/experiencia`.

2. **Refatoração da Rota `/experiencia` (`ExperiencePage.tsx`)**:
   - Remoção do bloco superior de contadores (`<Authority />` / `<SectionWrapper id="resultados">`).
   - A página inicia diretamente no `PageHeader` ("Experiência em projetos reais" / "Métricas consolidadas de confiabilidade..."), seguido imediatamente pela Matriz de Verticais de Negócio (`#contextos`) e o Ledger de Organizações (`#organizacoes`).
   - Ajuste do ritmo tonal (Tonal Layering - SPEC-082):
     * `PageHeader`: `surface-anchor`
     * Matriz de Verticais (`#contextos`): tom `base`
     * Ledger de Organizações (`#organizacoes`): tom `alt`
     * Fechamento Comercial (`#cta`): tom `base`
     * `Footer`: `surface-anchor`
     * Ritmo resultante: `anchor -> base -> alt -> base -> anchor` (100% aderente à regra de alternância sem duas seções adjacentes com o mesmo tom).
   - Ajuste de espaçamento vertical e padding (`py-16 md:py-20`) para transição orgânica e equilibrada.

3. **Limpeza e Testes**:
   - Eliminação de imports órfãos em `ExperiencePage.tsx`.
   - Atualização da suíte de testes unitários `src/components/sections/__tests__/HomeResultsStrip.test.tsx`.
   - Atualização de testes E2E ou de páginas se necessário.
   - Verificação de todos os Quality Gates.

### 2.2 Fora de Escopo
- Alterações nos dados cadastrais ou lista de organizações aprovadas (`src/config/experience.ts`).
- Alterações no comportamento do Hero ou da Matriz de Verticais.

---

## 3. Especificação Técnica dos Componentes

### 3.1 `HomeResultsStrip.tsx`
```tsx
import { FC, useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

interface StatItem {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
  label: string;
  description: string;
  accessibleLabel: string;
}

const stats: StatItem[] = [
  {
    end: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Disponibilidade assegurada",
    description: "Em plataformas críticas de energia e educação.",
    accessibleLabel: "99,9% de disponibilidade assegurada",
  },
  {
    end: 2500,
    decimals: 0,
    suffix: " RPS",
    formatThousands: true,
    label: "Arquitetura dimensionada",
    description: "Para picos de 10.000 usuários simultâneos sem gargalos.",
    accessibleLabel: "2.500 requisições por segundo",
  },
  {
    end: 100,
    decimals: 0,
    suffix: "%",
    label: "Integridade de dados",
    description: "Na consolidação regulatória do setor elétrico, sem perdas.",
    accessibleLabel: "100% de integridade de dados",
  },
  {
    end: 35,
    decimals: 0,
    prefix: "−",
    suffix: "%",
    label: "Atividades manuais reduzidas",
    description: "Automações e integrações em plataformas modernizadas.",
    accessibleLabel: "Redução de 35% de atividades manuais",
  },
];
```

---

## 4. Plano de Testes e Quality Gates

1. **Vitest Unit**:
   - `HomeResultsStrip.test.tsx`: Validar renderização dos novos valores numéricos (99,9%, 2.500 RPS, 100%, −35%), novos rótulos técnicos e descrições operacionais.
   - `pages.test.tsx`: Validar integridade da `ExperiencePage` iniciando diretamente com a Matriz de Verticais e Enterprise Ledger.
2. **Playwright E2E**:
   - `design-system-and-stability.spec.ts`: Validar estabilidade da Home e da página `/experiencia`.
3. **Quality Gates**:
   - `npx tsc --noEmit` — 0 erros de compilação.
   - `npm run lint` — 0 erros e 0 warnings.
   - `npm test -- --run` — 100% das 31 suítes de teste passando.
   - `npm run build` — Build de produção limpo com 7 rotas SSR geradas.

---

## 5. Critérios de Aceite

- [ ] Home (`/`) exibe as 4 novas métricas com contadores animados `CountUp` ativados por `useInView`.
- [ ] Link do bloco de resultados na Home atualizado para "Ver projetos detalhados →".
- [ ] Rota `/experiencia` inicia imediatamente na Matriz de Verticais de Negócio após o PageHeader.
- [ ] Ritmo de camadas tonais preservado em `/experiencia`: `anchor -> base -> alt -> base -> anchor`.
- [ ] Zero erros de compilação TypeScript e zero lints.
- [ ] 100% de aprovação nos testes automatizados e evidências visuais registradas.
