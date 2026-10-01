# TASK-053 — Padronização de Cabeçalhos de Seção + Ícones Premium Autorais

**Objetivo**: Padronizar todos os cabeçalhos de seção com `SectionHeader` centralizado, fluid typography e ritmo vertical estrito; criar e integrar o conjunto de ícones premium autorais em SVG inline; ajustar Diferenciais para 3 colunas e padronizar textos em sentence case.

**SPEC de Referência**: `specs/SPEC-053-padronizacao-cabecalhos-icones-premium.md`

## Checklist de Execução

- [x] 1. **Baseline Visual**: Capturar evidências visuais das seções antes das alterações.
- [x] 2. **Refatoração do `SectionHeader` (`src/components/ui/SectionHeader.tsx`)**:
  - Elemento semântico `<header>`.
  - Padrão 100% centralizado, `max-w-3xl` para título e `max-w-2xl` para subtítulo.
  - `text-wrap: balance` no H2 e subtítulo.
  - Tipografia fluida e tokens de espaçamento vertical uniformes.
- [x] 3. **Unificação dos Cabeçalhos em Todas as Seções**:
  - `Differentials.tsx`: Cabeçalho centralizado via `SectionHeader`.
  - `About.tsx`: Cabeçalho centralizado via `SectionHeader` no topo da seção, com corpo de 2 colunas abaixo.
  - `Services.tsx`, `HowWeWork.tsx`, `Technologies.tsx`, `Authority.tsx`, `Sectors.tsx`, `FAQ.tsx`, `Contact.tsx`: Verificar conformidade centralizada.
- [x] 4. **Layout de "Diferenciais" (`Differentials.tsx`)**:
  - 3 colunas no desktop (`md:grid-cols-3 divide-y md:divide-y-0 md:divide-x`), 1 coluna no mobile.
  - Linhas sem moldura de card, alinhadas à esquerda.
  - Bloco de práticas e chips centralizado abaixo das colunas.
- [x] 5. **Conjunto Autoral de Ícones SVG (`src/components/icons/`)**:
  - Criar componentes SVG inline com traço 1.5px, duotone sutil e nó de acento (`hsl(var(--primary))`).
  - Substituir ícones de conceito em Diferenciais, Como trabalhamos, Contato, Setores e Sobre.
  - Eliminar containers quadrados arredondados com fundo esmeralda translúcido do rodapé de cards.
- [x] 6. **Padronização em Sentence Case**:
  - Aplicar sentence case em títulos de serviços, diferenciais, contato, sobre e rodapé.
- [x] 7. **Ajustes de Copy (Parte C)**:
  - `FAQ.tsx`: Mudar categoria de sites institucionais para `"servicos"`.
  - `HeroArchitecture.tsx`: Atualizar descrições técnicas eliminando termos como "estrito", "global" e "multi-zona".
- [x] 8. **Testes Unitários e Cobertura**:
  - Atualizar testes afetados (`SectionHeader`, `Differentials`, `HowWeWork`, `About`, `Contact`, `FAQ`, `Sectors`, `Footer`).
  - Manter cobertura global ≥ 90%.
- [x] 9. **Evidências Visuais e Acessibilidade**:
  - Gerar capturas antes e depois em 1440px, 768px e 375px.
  - Executar auditoria Axe-core.
- [x] 10. **Quality Gates & Documentação**:
  - `npx tsc --noEmit`
  - `npm run lint`
  - `npm run test:e2e`
  - `npm run build`
  - Criar `reviews/QA-053.md`.
  - Atualizar `PROJECT.md` e `CHANGELOG.md`.
  - **NÃO COMMITAR**: Manter as alterações uncommitted na branch `develop`.
