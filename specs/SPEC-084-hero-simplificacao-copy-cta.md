# SPEC-084 — Simplificação do Hero: Foco no CTA Primário e Remoção da Faixa de Confiança

- **Status:** APROVADO
- **Data de Criação:** 2026-10-02
- **Autor:** Elessandro Prestes Macedo / Gemini
- **Área:** Frontend / UI/UX / Copywriting / Home Hero

---

## 1. Contexto e Motivação

Na refatoração anterior do Hero (`SPEC-083`), foram incluídos na coluna esquerda um botão de CTA secundário ("Ver soluções") e uma faixa de confiança operacional ("Aplicações corporativas críticas · Energia, educação, indústria e varejo · Retorno em até 24h úteis").

Por decisão do Product Owner (PO), esses dois elementos devem ser removidos para:
1. **Eliminar dispersão de atenção**: Evitar duplicidade de caminhos, uma vez que o Seletor Interativo de Cenários de Negócio na coluna direita já guia o usuário diretamente para as soluções e serviços específicos (`#sistemas`, `#integracoes`, `#legados`).
2. **Foco cirúrgico na conversão**: Deixar como única chamada à ação na coluna esquerda o CTA primário de alto contraste ("Vamos conversar" -> `/contato`).
3. **Redução de densidade visual**: Manter o Hero ainda mais limpo, minimalista e direto ao ponto, eliminando linhas e textos auxiliares sob o botão de ação.

---

## 2. Escopo

### 2.1 Em Escopo
- Remoção do botão de ação secundário "Ver soluções" (`<Button variant="outline">...Ver soluções...</Button>`) na seção Hero da Home.
- Remoção completa do elemento de Faixa de Confiança Operacional (`data-testid="hero-operational-trust"`), contendo:
  - *"Aplicações corporativas críticas"*
  - *"Energia, educação, indústria e varejo"*
  - *"Retorno em até 24h úteis"*
- Preservação do CTA primário: botão "Vamos conversar" apontando para a rota canônica `/contato` com foco tátil, estilo de destaque e glow sutil.
- Preservação integral do Eyebrow, H1 com acento cromático no brand teal em *"construir, integrar e evoluir"* e da Subheadline editorial.
- Preservação integral da coluna direita com o painel *"O que sua empresa precisa agora?"* e seus 4 cenários navegáveis ancorados.
- Atualização das suítes de testes unitários (`Hero.test.tsx`) e testes E2E do Playwright (`design-system-and-stability.spec.ts`).

### 2.2 Fora de Escopo
- Alterações em outras seções da Home ou outras rotas do site.
- Alterações no comportamento do Seletor Interativo de Cenários de Negócio.
- Alterações na paleta de cores ou tokens de Camadas Tonais (`surface-anchor`).

---

## 3. Especificação Técnica

### 3.1 Componente `src/components/sections/Hero.tsx`
- **Coluna da Esquerda**:
  - Bloco de ações passa a renderizar exclusivamente o botão primário:
    ```tsx
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
      <Button
        asChild
        className="h-12 px-7 rounded-md bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-semibold text-sm sm:text-base shadow-sm min-h-[44px] transition-all duration-200 hover:shadow-glow-brand hover:scale-[1.02] active:scale-[0.98]"
      >
        <Link to="/contato" aria-label="Vamos conversar sobre seu projeto">
          Vamos conversar
        </Link>
      </Button>
    </div>
    ```
  - Eliminação da `<div>` com `data-testid="hero-operational-trust"` e seu divisor superior `border-t`.

---

## 4. Plano de Testes e Quality Gates

1. **Testes Unitários (`Hero.test.tsx`)**:
   - Ajustar teste de renderização de CTAs para validar a presença do botão primário "Vamos conversar" e a ausência do botão "Ver soluções".
   - Atualizar/remover teste que buscava por "Aplicações corporativas críticas", "Energia, educação, indústria e varejo" e "Retorno em até 24h úteis".
2. **Testes E2E (`design-system-and-stability.spec.ts`)**:
   - Garantir que a suíte passe sem falhas decorrentes da remoção do botão ou do texto da faixa de confiança.
3. **Quality Gates**:
   - `npx tsc --noEmit` — 0 erros.
   - `npm run lint` — 0 erros e 0 avisos.
   - `npm test -- --run` — 100% de aprovação nas 31 suítes.
   - `npm run build` — Build e SSR prerender 100% funcionais, sem warnings de chunk size.

---

## 5. Critérios de Aceite

- [ ] Botão secundário "Ver soluções" completamente removido do Hero.
- [ ] Faixa de confiança operacional ("Aplicações corporativas críticas...", etc.) completamente removida do Hero.
- [ ] Botão primário "Vamos conversar" mantido funcional apontando para `/contato`.
- [ ] Seletor de Cenários de Negócio na coluna direita funcionando sem alterações.
- [ ] Cobertura e testes unitários 100% aprovados.
- [ ] Quality gates (TypeScript, ESLint, Vitest, Build) 100% verdes.
