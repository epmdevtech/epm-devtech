# TASK-103 — Padronização Visual Global dos Botões de Ação com a Geometria Autoral "Engineering Chamfer"

- **Status:** Concluída
- **Data de Início:** 2026-10-03
- **Data de Conclusão:** 2026-10-03
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-103-padronizacao-botoes-engineering-chamfer.md`

---

## 1. Escopo da Tarefa

1. **Utilitários de Chanfro Técnico em `src/index.css`**:
   - Adicionar utilitários `.btn-chamfer` e `.btn-chamfer-dual` em `@layer utilities`.

2. **Extensão de Variantes em `src/components/ui/button.tsx`**:
   - Incluir variantes `chamfer`, `chamfer-outline` e `chamfer-gradient` no CVA.
   - Adicionar tamanho `md: "h-10 px-6 py-2.5"` na prop `size`.

3. **Integração no `src/components/ui/MagneticButton.tsx`**:
   - Integrar `.btn-chamfer` e `rounded-md` como geometria padrão dos botões magnéticos.
   - Suportar variantes `chamfer` e `chamfer-outline` em `variantStyles`.
   - Adicionar suporte ao tamanho `md` em `sizeStyles`.
   - Adaptar cortina filler animada.

4. **Auditoria e Atualização dos Componentes e Rotas**:
   - `src/components/layout/Header.tsx`: Atualizar botão desktop e mobile com `variant="chamfer"`.
   - `src/components/sections/Hero.tsx`: Atualizar CTA primário "Vamos conversar" com `variant="chamfer"`.
   - `src/pages/ServicesPage.tsx`: Atualizar Hero CTA com `variant="chamfer"`.
   - `src/pages/AboutPage.tsx`: Integrar CTA institucional "Fale conosco" com `variant="chamfer"` e `size="md"`.
   - `src/pages/FAQPage.tsx`: Atualizar CTA final com `variant="chamfer"`.
   - `src/pages/NotFound.tsx`: Atualizar botões de navegação com `variant="chamfer"` e `variant="chamfer-outline"`.
   - `src/components/ContactForm.tsx` & `src/components/sections/Contact.tsx`: Atualizar botões de submissão.

5. **Testes Unitários**:
   - Criar `src/components/ui/__tests__/button.test.tsx`.
   - Atualizar `src/components/ui/__tests__/MagneticButton.test.tsx`.

6. **Quality Gates & Homologação**:
   - TypeScript (`npx tsc --noEmit`)
   - ESLint (`npm run lint`)
   - Vitest Unit (`npm test -- --run`)
   - Vitest Coverage (`npm run test:coverage`)
   - Playwright E2E (`npx playwright test`)
   - Build de produção (`npm run build`)

7. **Documentação & Encerramento**:
   - Preencher `reviews/QA-103.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Atualizar status desta TASK para `Concluída`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-103-padronizacao-botoes-engineering-chamfer.md` (Criado)
- `tasks/TASK-103-padronizacao-botoes-engineering-chamfer.md` (Criado)
- `src/index.css` (Modificado)
- `src/components/ui/button.tsx` (Modificado)
- `src/components/ui/MagneticButton.tsx` (Modificado)
- `src/components/layout/Header.tsx` (Modificado)
- `src/components/sections/Hero.tsx` (Modificado)
- `src/pages/ServicesPage.tsx` (Modificado)
- `src/pages/AboutPage.tsx` (Modificado)
- `src/pages/FAQPage.tsx` (Modificado)
- `src/pages/NotFound.tsx` (Modificado)
- `src/components/ContactForm.tsx` (Modificado)
- `src/components/sections/Contact.tsx` (Modificado)
- `src/components/ui/__tests__/button.test.tsx` (Criado)
- `src/components/ui/__tests__/MagneticButton.test.tsx` (Modificado)
- `reviews/QA-103.md` (Criar)
- `PROJECT.md` (Atualizar)
- `CHANGELOG.md` (Atualizar)
