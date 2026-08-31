# SPEC-006 — Mobile PageSpeed 100: Critical CSS Inline, Logo XS e Eliminação de JS Não Usado

| Campo         | Valor                          |
|---------------|-------------------------------|
| **ID**        | SPEC-006                      |
| **Data**      | 2026-08-31                    |
| **Autor**     | Elessandro Prestes Macedo     |
| **Status**    | ✅ Aprovada                    |
| **Versão**    | 1.0                           |

---

## Contexto e Motivação

Relatório Lighthouse Mobile (31/08/2026 08:47) aponta pontuação 88/100 com os seguintes gargalos:

| Problema | Impacto | Métrica |
|---|---|---|
| CSS render-blocking (index.css 13.6 KiB, 230ms) | FCP e LCP atrasados | LCP 3.3s |
| framer-motion (43 KiB) e radix (33 KiB) listados como JS não-usado | Bundle inicial desnecessário | Speed Index 3.2s |
| Logo ainda baixando logo-emp-dev-tech-sm.webp (9.3 KiB) em vez do xs (3 KiB) | Payload maior que necessário | LCP |

O Desktop já atingiu 99/100 com as otimizações da SPEC-005.

---

## Objetivo

Levar o Mobile de 88 → 100 eliminando o CSS render-blocking e corrigindo o logo.

---

## Escopo

### IN
1. index.html — Critical CSS inline + CSS deferido via link preload
2. Header.tsx — Corrigir src do logo para xs (3 KiB, dimensões corretas)
3. vite.config.ts — Habilitar modulePreload e ajustar estratégia de CSS

### OUT
- Alteração visual de qualquer seção
- Modificação do comportamento de animações existentes

---

## Aprovação

| Campo              | Valor                    |
|--------------------|--------------------------|
| **Aprovado por**   | Elessandro Prestes Macedo |
| **Data**           | 2026-08-31               |
| **Status**         | ✅ Aprovada               |
