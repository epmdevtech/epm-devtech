# SPEC-004 — Progressive Section Loading & Dynamic Viewport Chunk Deferral

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-004                      |
| **Data**      | 2026-08-28                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Análise do **Lighthouse Treemap** (230,6 KiB de JS transferido no carregamento inicial) revelou:
- Todos os componentes de seção abaixo da dobra (`Contact.js` 26.6 KB, `radix.js` 33.6 KB, `About.js`, `Services.js`, `Technologies.js`, `Differentials.js`, `Authority.js`, `emailjs.js`, `Footer.js`) eram baixados simultaneamente no `Index.tsx` via `<Suspense>` imediato.
- Isso sobrecarregava o download e execução na thread principal de dispositivos móveis, competindo com a renderização crítica do Hero.

---

## Objetivo

Reduzir o volume de JavaScript transferido no carregamento inicial da página de **230,6 KiB para < 85 KiB** através de **Progressive Section Loading**, adiando o carregamento dos chunks pesados (`Contact`, `Radix`, `EmailJS`, etc.) para o momento em que o usuário se aproxima da seção ou quando a página atinge o estado ocioso (`requestIdleCallback`).

---

## Escopo

### IN
1. **Componente `LazySection`**:
   - Criação de `src/components/LazySection.tsx` utilizando `IntersectionObserver` com `rootMargin: "400px 0px"` para iniciar o carregamento assíncrono 400px antes da seção entrar no viewport.
   - Suporte a `requestIdleCallback` para streaming em segundo plano quando o usuário permanecer lendo o Hero.
   - Suporte a deep-linking imediato (se a URL contiver `/#contato` ou `/contato`, carrega a seção de destino imediatamente).
   - Modo de teste seguro (`process.env.NODE_ENV === 'test'`) para renderização direta nos testes automatizados.
2. **Integração em `src/pages/Index.tsx`**:
   - Encapsular as seções below-the-fold com `<LazySection id="...">`.

### OUT
- Alteração visual de qualquer seção
- Remoção de bibliotecas ou dependências

---

## Critérios de Aceitação

- [ ] Volume inicial de JavaScript transferido reduzido substancialmente (< 100 KiB no primeiro paint)
- [ ] Navegação direta para seções via hash/URL (/contato, /servicos) funcionando sem atrasos
- [ ] 100% dos testes unitários passando (`npm run test`)
- [ ] Build de produção limpo (`npm run build`)

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-28               |
| **Status**         | ✅ Aprovada               |
