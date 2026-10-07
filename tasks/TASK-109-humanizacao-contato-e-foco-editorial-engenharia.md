# TASK-109 — Humanização Editorial do Contato e Foco Editorial na Rota de Engenharia

| Campo              | Valor                    |
|--------------------|--------------------------|
| **ID**             | TASK-109                 |
| **SPEC**           | SPEC-109                 |
| **Data de início** | 2026-10-07               |
| **Agente**         | Gemini/Antigravity       |
| **Status**         | Concluído                |

---

## Escopo da Implementação

1. **`Contact.tsx`**:
   - Atualizar título para `"Vamos conversar sobre como podemos apoiar você e seu projeto"`.
   - Atualizar subtítulo para `"Assim que recebermos sua mensagem, entraremos em contato para entender o cenário técnico e agendar uma conversa."`.
   - Substituir promessa de "24 horas úteis" no `nextSteps` e no `toast.success`.
   - Adicionar bloco alternativo de e-mail direto (`contato@epmdevtech.com.br`).
   - Atualizar botão de submit para `"ENVIAR MENSAGEM"` com `uppercase tracking-[0.04em] font-semibold`.
2. **`ContactPage.tsx`**:
   - Atualizar título e descrição do `PageHeader` e metadados SEO do `Helmet` sem menções a 24h.
3. **`EngineeringPage.tsx`**:
   - Remover botão `"VER TECNOLOGIAS"` do Hero `PageHeader`.
   - Incluir seção de encerramento comercial com Bottom CTA `"VAMOS CONVERSAR"`.
4. **Testes Unitários & E2E**:
   - Atualizar `src/components/sections/__tests__/Contact.test.tsx`.
   - Atualizar `src/pages/__tests__/pages.test.tsx`.
5. **Quality Gates & Documentação**:
   - `npm run test:coverage`
   - `npm run lint`
   - `npm run build`
   - `npm run test:e2e`
   - `reviews/QA-109.md`
   - `PROJECT.md` e `CHANGELOG.md`

---

## Checklist de Implementação

- [x] `Contact.tsx` atualizado com nova redação editorial, botão "ENVIAR MENSAGEM" e canal direto por e-mail
- [x] `ContactPage.tsx` atualizado com título e descrição alinhados
- [x] `EngineeringPage.tsx` atualizado com remoção do botão de topo e adição do Bottom CTA
- [x] Testes unitários atualizados e validados (`Contact.test.tsx` e `pages.test.tsx`)
- [x] `npm run test:coverage` aprovado (cobertura ≥ 90%)
- [x] `npm run lint` aprovado (zero erros)
- [x] `npm run build` aprovado (sem chunks > 600KB)
- [x] `npm run test:e2e` aprovado (100% dos testes passando)
- [x] `QA-109.md` gerado
- [x] `PROJECT.md` e `CHANGELOG.md` atualizados
