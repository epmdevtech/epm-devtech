# SPEC-114 — Remoção da Seção Intermediária de Chamada de Contato (Bottom CTA em Sobre Nós e Engenharia)

## Status
- **Status:** Aprovado pelo PO
- **Data:** 2026-10-07
- **Autor:** Engenheiro Front-end Sênior e Especialista em Arquitetura de Componentes
- **Decisão:** Remover as seções intermediárias de Bottom CTA ("Vamos conversar sobre o seu próximo projeto?" / "Vamos conversar sobre a engenharia do seu projeto?") das rotas `/about` (`AboutPage.tsx`) e `/engineering` (`EngineeringPage.tsx`), eliminando a redundância visual e o espaço vazio antes do rodapé.

---

## 1. Contexto & Motivação

Nas rotas editoriais e de autoridade técnica (`/about` e `/engineering`), as páginas já contam com canal direto de contato no Header fixo superior ("FALE COMIGO") e direcionamento para a rota canônica `/contact`. A permanência de blocos intermediários de fechamento comercial (`#sobre-cta` e `#engenharia-cta`) antes do rodapé gerava:
1. Redundância visual com os fluxos diretos de contato do site e com o próprio Footer.
2. Espaço vazio e quebra do encerramento editorial limpo após os blocos de autoridade (Manifesto Técnico e Matriz de Especialidades Técnicas).
3. Ruptura de ritmo de leitura em páginas focadas em posicionamento técnico e engenharia de alto padrão.

---

## 2. Escopo das Alterações

### 2.1 Remoção em `src/pages/AboutPage.tsx`
- Remover o bloco `<SectionWrapper id="sobre-cta" tone="base">` e seu conteúdo:
  - Título H2: "Vamos conversar sobre o seu próximo projeto?"
  - Subtítulo: "Converse diretamente com a liderança técnica da EPM DevTech para avaliar desafios e viabilidade arquitetural."
  - Botão MagneticButton: "VAMOS CONVERSAR"
  - Container com `bottomCtaRef`.
- Limpar variáveis e imports não utilizados (`useNavigate`, `MagneticButton`, `bottomCtaRef`).

### 2.2 Remoção em `src/pages/EngineeringPage.tsx`
- Remover o bloco `<SectionWrapper id="engenharia-cta" tone="base">` e seu conteúdo:
  - Título H2: "Vamos conversar sobre a engenharia do seu projeto?"
  - Subtítulo: "Converse diretamente com quem projeta e implementa o código para desenhar uma arquitetura sólida e escalável."
  - Botão MagneticButton: "VAMOS CONVERSAR"
  - Container com `bottomCtaRef`.
- Limpar variáveis e imports não utilizados:
  - Remover hook `bottomCtaRef` e chamada associada do `useScrollReveal`.
  - Remover import e instanciação de `useNavigate` e `navigate`.
  - Remover import não utilizado de `MagneticButton`.

### 2.3 Atualização dos Testes Unitários
- Em `src/pages/__tests__/pages.test.tsx`:
  - Atualizar o teste de `EngineeringPage` para afirmar que o CTA não está mais presente (`expect(screen.queryByRole('link', { name: /VAMOS CONVERSAR/i })).not.toBeInTheDocument()`).

### 2.4 Preservação do Ritmo Tonal e Estabilidade (SPEC-082)
- O ritmo de seções com `data-tone` da rota `/about` passa a ser:
  - `anchor` (`PageHero`) -> `base` (`#jornada`) -> `alt` (`#principios`) -> `anchor` (`Footer`).
- O ritmo de seções com `data-tone` da rota `/engineering` passa a ser:
  - `anchor` (`PageHero`) -> `base` (`#filosofia-qualidade`) -> `alt` (`#tecnologias`) -> `anchor` (`Footer`).
- Nenhuma seção adjacente possui o mesmo tom em ambas as rotas, mantendo 100% de conformidade com os testes automatizados de camadas tonais.

---

## 3. Quality Gates Aplicáveis

- **TypeScript:** 0 erros de compilação.
- **ESLint:** 0 erros e 0 warnings (`npm run lint`).
- **Testes Unitários:** 100% passando (`npm run test`).
- **Build:** Sucesso no Vite build e pré-render estático (`npm run build`).
- **Testes E2E:** 100% passando no Playwright (`npm run test:e2e`).
