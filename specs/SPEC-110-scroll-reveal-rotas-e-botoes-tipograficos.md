# SPEC-110 — Padronização Global de Scroll Reveal, Botões Tipográficos e E-mail Oficial

| Campo         | Valor                                      |
|---------------|--------------------------------------------|
| **ID**        | SPEC-110                                   |
| **Data**      | 2026-10-07                                 |
| **Autor**     | Elessandro Prestes Macedo / Gemini         |
| **Status**    | Aprovada                                   |
| **Versão**    | 1.0                                        |

---

## Contexto e Motivação

1. **Revelação Suave por Scroll (Scroll Reveal) em Todas as Rotas**:
   - Atualmente, a experiência suave de revelação progressiva (Scroll-Driven Reveal / Fade-in + Stagger) está concentrada na Home (`/`). As páginas internas (`/services`, `/how-we-work`, `/experience`, `/engineering`, `/about`, `/contact`) carregam de forma mais estática ou perdem essa coesão estética e fluidez corporativa.
   - É necessário padronizar o hook `useScrollReveal` (orquestrado com GSAP ScrollTrigger e isolamento via `gsap.context()`) em todas as rotas e seções internas: cabeçalhos (`PageHeader`), grids, cards e blocos de conteúdo.

2. **Botões e CTAs Estritamente Tipográficos (Remoção de Ícones Decorativos)**:
   - Para consolidar uma identidade visual madura, sólida e editorial (alinhada a marcas de autoridade técnica B2B), todos os botões e CTAs devem dispensar ícones decorativos anexos ao texto (como `→`, `ArrowRight`, `ArrowUpRight`, `ChevronRight`, `Send`, etc.).
   - A presença visual do botão é sustentada exclusivamente por sua tipografia em CAIXA ALTA (`uppercase tracking-[0.04em] font-semibold`), geometria chanfrada (`btn-bevel-4`) e microinteração magnética.

3. **Canal Oficial de E-mail Direto**:
   - A seção e página de contato (`/contact` e `#contato`) deve utilizar obrigatoriamente o e-mail oficial `elessandro@epmdevtech.com.br` no bloco alternativo de e-mail direto, eliminando qualquer menção ao endereço genérico `contato@epmdevtech.com.br`.

---

## 1. Escopo das Alterações

### 1.1 Sistema de Animação por Rolagem (Scroll Reveal)
- **`PageHeader.tsx`**: Integrar `useScrollReveal` com seletor para eyebrow, h1, descrição e CTAs (`y: 20`, `stagger: 0.08s`, `duration: 0.65s`).
- **`/services` (`ServicesPage.tsx` e `Services.tsx`)**:
  - `Services.tsx`: Animação suave escalonada das linhas Z-pattern de catálogo de serviços.
  - `ServicesPage.tsx`: Animação por rolagem no grid de 3 Garantias de Engenharia com stagger.
- **`/how-we-work` (`HowWeWorkPage.tsx` e `ProcessExplorer.tsx`)**:
  - `ProcessExplorer.tsx`: Revelação das 4 etapas de metodologia e do painel técnico.
  - `HowWeWorkPage.tsx`: Revelação suave no grid de 2 colunas do Manifesto Técnico.
- **`/experience` (`ExperiencePage.tsx`)**:
  - Bloco `#contextos`: Revelação escalonada do grid 2x2 de verticais de negócio (`stagger: 0.08s`).
  - Bloco `#organizacoes`: Revelação progressiva das linhas do Enterprise Ledger (`stagger: 0.06s`).
- **`/engineering` (`EngineeringPage.tsx` e `ArchitecturalBlueprint.tsx`)**:
  - Bloco `#filosofia-qualidade`: Revelação dos princípios de engenharia e terminal CI/CD.
  - `ArchitecturalBlueprint.tsx`: Revelação da nuvem editorial de tecnologias com stagger nos badges.
  - Bloco `#engenharia-cta`: Entrada suave no Bottom CTA.
- **`/about` (`AboutPage.tsx`)**:
  - Hero editorial: Revelação do texto narrativo em harmonia com a `EpmConstellation`.
  - Bloco `#jornada`: Revelação escalonada dos marcos da timeline histórica.
  - Bloco `#principios`: Revelação dos valores e manifesto técnico.
  - Bloco `#sobre-cta`: Entrada suave no Bottom CTA.
- **`/contact` (`ContactPage.tsx` e `Contact.tsx`)**:
  - Revelação suave do formulário de contato e bloco de próximos passos.
  - Revelação dos cards de destaque de FAQ no fechamento da rota.
- **Performance & Acessibilidade**:
  - Respeito irrestrito a `prefers-reduced-motion` (renderização imediata com opacidade total).
  - Limpeza determinística com `ctx.revert()` e `ScrollTrigger.refresh()` sincronizado nas trocas de rota.

### 1.2 Remoção de Ícones nos Botões e CTAs
- **`Hero.tsx`**: Remover `<ArrowUpRight />` do botão `"VAMOS CONVERSAR"`.
- **`ServicesPage.tsx`**: Remover `<ArrowRight />` do botão `"VAMOS CONVERSAR"`.
- **`FAQ.tsx`**: Remover `→` do link `"VAMOS CONVERSAR"`.
- **`HomeServicesBento.tsx`**: Remover `<ArrowRight />` das 4 ações `"VER DETALHES"`.
- **`ProcessExplorer.tsx`**: Remover círculo com `<ArrowRight />` das abas de etapas.
- **`Contact.tsx`**: Remover `<Send />` do botão `"ENVIAR MENSAGEM"` e `→` do link de WhatsApp.
- **`ContactForm.tsx`**: Remover `<Send />` do botão `"ENVIAR MENSAGEM"`.
- **`ContactPage.tsx`**: Remover `<ArrowRight />` do link para FAQ.
- **`NotFound.tsx`**: Remover `<Home />`, `<Code2 />`, `<Mail />` dos 3 botões de ação.

### 1.3 Atualização do E-mail na Seção de Contato
- Em `Contact.tsx`, definir `href="mailto:elessandro@epmdevtech.com.br"` e rótulo `elessandro@epmdevtech.com.br`.

---

## 2. Quality Gates

- **TypeScript**: Zero erros de compilação
- **ESLint**: Zero erros (`npm run lint`)
- **Testes Unitários**: Cobertura geral ≥ 90% (`npm run test:coverage`)
- **Build de Produção**: Sem chunks > 600KB e com pré-renderização estática (`npm run build`)
- **Testes E2E**: 100% dos testes aprovados (`npm run test:e2e`)
- **Acessibilidade**: WCAG AAA, foco visível e respeito a `prefers-reduced-motion`
