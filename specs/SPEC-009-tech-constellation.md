# SPEC-009 — Componente TechConstellation na Seção Tecnologias

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-009                                   |
| **Data**      | 2026-09-04                                 |
| **Autor**     | Gemini/Antigravity                         |
| **PO**        | Elessandro Prestes Macedo                  |
| **Status**    | ✅ Aprovada                                |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

Atualmente, a seção "Stack Tecnológica" (`Technologies.tsx`) exibe as tecnologias em um carrossel horizontal contínuo (*marquee* de duas faixas). Embora funcional, o carrossel automático é um padrão comum que não transmite a sofisticação da arquitetura de software da EPM DEVTECH, nem evidencia a sinergia e interconexão entre as camadas da engenharia (Frontend, Backend, Banco de Dados, Cloud, Mensageria e Observabilidade).

A substituição do marquee por uma **Constelação Tecnológica Interativa (TechConstellation)** em estilo trilha de circuito impresso (PCB) eleva a experiência do usuário para um nível de alto impacto visual, demonstrando domínio técnico em motion design, acessibilidade e arquitetura de componentes.

---

## Objetivo

Implementar o componente `TechConstellation` em TypeScript, substituindo o marquee da seção `Technologies.tsx`. As tecnologias serão organizadas como nós em um grafo interativo conectados por trilhas PCB com pulsos de fluxo de dados, padrão visual *focus & context*, suporte integral a temas (Dark/Light Mode sem cores hex hardcoded), responsividade Mobile First e acessibilidade WCAG AA.

---

## Escopo

### Está incluído (IN)
1. **Utilitário de Layout Desacoplado** (`src/lib/buildConstellationLayout.ts`):
   - Algoritmo determinístico para cálculo de posições dos nós por cluster/categoria e roteamento das conexões estilo PCB (sem dependências pesadas de física).
   - Modo adaptativo para mobile e desktop.
2. **Componente TechConstellation** (`src/components/sections/TechConstellation.tsx`):
   - Renderização SVG declarativa de conexões e nós com cards estilizados shadcn.
   - Estado de repouso: glow suave, flutuação leve (float) e pulsos de fluxo de dados contínuos.
   - Interação *Focus & Context*: hover/focus destaca o nó e suas conexões diretas, reduzindo os demais a 30-40% de opacidade.
   - Integração com `Tooltip` do shadcn/ui (`@/components/ui/tooltip`) com nome e categoria da tecnologia.
   - Animação de entrada em viewport (*scroll reveal*) via Framer Motion (`whileInView` / `useInView`).
   - Suporte a `prefers-reduced-motion`: desativação de loops de pulso e float contínuo.
   - Theming 100% via CSS variables (`hsl(var(--primary))`, `hsl(var(--border))`, etc.).
3. **Integração na Página**:
   - Substituição do carrossel em `src/components/sections/Technologies.tsx`.
4. **Testes Automatizados (Vitest + Playwright)**:
   - Testes unitários para `buildConstellationLayout.ts` (posicionamento, conexões, bounds).
   - Testes de renderização e acessibilidade de `TechConstellation.tsx` (data-testid, hover, foco, ARIA).
   - Atualização de `Technologies.test.tsx` e validação na suíte Playwright E2E.

### Não está incluído (OUT)
- Não alterar a estrutura das demais seções do site.
- Não alterar a navegação por âncoras (`#tecnologias`) nem os meta tags de SEO.
- Não adicionar bibliotecas pesadas de física ou grafos (ex.: D3 force pesado ou Three.js).

---

## Requisitos Funcionais

1. **Agrupamento por Categorias**:
   - Backend (`PHP`, `Laravel`, `Symfony`, `Node.js`, `TypeScript`)
   - Frontend (`React`, `Angular`, `Vue.js`, `TypeScript`)
   - Banco de Dados (`PostgreSQL`, `MySQL`, `Oracle`, `MongoDB`, `Redis`)
   - Cloud & DevOps (`AWS`, `Azure`, `Docker`, `Kubernetes`, `Terraform`, `GitHub Actions`)
   - Mensageria (`RabbitMQ`, `Kafka`)
   - Observabilidade (`Prometheus`, `Grafana`, `SonarQube`)
2. **Conexões Arquiteturais (PCB Tracks)**:
   - Linhas interconectando nós com fluxo lógico (Frontend ↔ Backend ↔ Banco de Dados ↔ Mensageria ↔ Cloud ↔ Observabilidade).
   - Pulsos de luz animados percorrendo as trilhas em loop contínuo.
3. **Interação Focus & Context**:
   - Ao passar o mouse ou focar via teclado em uma tecnologia:
     - O nó selecionado e todas as tecnologias diretamente conectadas permanecem 100% visíveis com glow destacado.
     - As conexões ativas ganham espessura e cor primária.
     - Os nós e trilhas não conectados esmaecem para 35% de opacidade.
     - Tooltip acessível é disparado via Radix/shadcn.
4. **Comportamento Mobile / Touch**:
   - Em telas móveis (< 768px), o layout adapta-se para visualização em grade/colunas por cluster;
   - Toque ativa/desativa o estado de foco; toque fora ou tecla Esc limpa a seleção.

---

## Requisitos Não-Funcionais

| Requisito        | Critério                                                                  |
|------------------|---------------------------------------------------------------------------|
| **Performance**  | Zero impacto no LCP (seção lazy loaded); bundle limpo sem libs pesadas     |
| **Theming**      | Cores exclusivamente via tokens CSS shadcn (HSL), suporte Dark e Light    |
| **Acessibilidade**| WCAG AA: nós focáveis (`tabIndex={0}`), `role="button"`, ARIA labels, Radix Tooltip |
| **Motion**       | Conformidade estrita com `prefers-reduced-motion`                         |
| **Testes**       | Cobertura de testes ≥ 90% mantida em todos os novos arquivos              |
| **TypeScript**   | Tipagem estrita com interfaces explícitas e sem `any`                    |

---

## Tipagem e Dados

```typescript
export interface Technology {
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  label: string;
  colorVar: string;
  technologies: Technology[];
}

export type Connection = [techA: string, techB: string];

export interface TechConstellationProps {
  categories: Category[];
  connections: Connection[];
}
```

---

## Arquivos a Serem Criados / Modificados

### A Criar
1. `src/lib/buildConstellationLayout.ts`
2. `src/lib/__tests__/buildConstellationLayout.test.ts`
3. `src/components/sections/TechConstellation.tsx`
4. `src/components/sections/__tests__/TechConstellation.test.tsx`

### A Modificar
1. `src/components/sections/Technologies.tsx`
2. `src/components/sections/__tests__/Technologies.test.tsx`
3. `PROJECT.md`
4. `CHANGELOG.md`

---

## Critérios de Aceitação

- [ ] Utilitário `buildConstellationLayout` calcula nós e trilhas PCB de forma determinística e possui testes com 100% de cobertura.
- [ ] Componente `TechConstellation` renderiza nós e conexões com tokens do tema em Dark e Light Mode.
- [ ] Pulsos de luz trafegam pelas trilhas em repouso e respeitam `prefers-reduced-motion`.
- [ ] Hover e foco via teclado acionam o efeito *Focus & Context* e abrem o Tooltip do shadcn/ui.
- [ ] Mobile First: experiência touch fluida sem scroll-jacking.
- [ ] Quality gates atendidos: Vitest ≥ 90% coverage, ESLint 0 erros, Vite build limpo.
- [ ] E2E Playwright validado com sucesso.

---

## Aprovação do Product Owner

| Campo              | Valor                          |
|--------------------|--------------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo      |
| **Data**           | 2026-09-04                     |
| **Assinatura**     | [x] Aprovado  [ ] Rejeitado    |
| **Observações**    | Aprovado para implementação imediata. |
