# TASK-104 — Refatoração Visual para Geometria "Full Bevel / 4-Corner Chamfer" (Octógono Simétrico de Engenharia)

- **Status:** Concluída
- **Data de Início:** 2026-10-03
- **Data de Conclusão:** 2026-10-03
- **Responsável:** Gemini / Antigravity
- **SPEC de Referência:** `specs/SPEC-104-geometria-full-bevel-4-cantos.md`

---

## 1. Escopo da Tarefa

1. **Atualização em `src/index.css`**:
   - Implementar `.btn-bevel-4` com chanfro simétrico a 45º nos 4 cantos (polígono de 8 lados).
   - Implementar `.btn-bevel-4-sm` com corte proporcional de 8px para botões compactos.
   - Manter `.btn-chamfer` e `.btn-chamfer-sm` como aliases diretos.
   - Implementar `.btn-bevel-shadow` e `.btn-bevel-shadow-sm` para traço contínuo em 8 lados e sombra rígida extrudada de 5px / 3px a 45º no canto inferior direito.
   - Implementar `.btn-bevel-shadow-white` e `.btn-bevel-shadow-brand`.

2. **Atualização em `src/components/ui/button.tsx`**:
   - Atualizar variantes `chamfer` e `chamfer-outline` com `.btn-bevel-4`.
   - Adicionar aliases de variantes `bevel` e `bevel-outline`.

3. **Atualização em `src/components/ui/MagneticButton.tsx`**:
   - Aplicar `.btn-bevel-4` (ou `.btn-bevel-4-sm` para `size="sm"`) como geometria padrão.
   - Aplicar `.btn-bevel-shadow` (ou `.btn-bevel-shadow-sm` para `size="sm"`) no elemento wrapper (`areaRef`), reproduzindo com exatidão a referência visual da captura de tela e mantendo a sombra sincronizada com a cinemática física do GSAP.
   - Suporte aos aliases `bevel` e `bevel-outline`.

4. **Atualização das Suítes de Testes**:
   - `src/components/ui/__tests__/button.test.tsx`: Validar `.btn-bevel-4`, variantes `bevel` e `chamfer`.
   - `src/components/ui/__tests__/MagneticButton.test.tsx`: Validar classes, sombreamento chanfrado e comportamento com o octógono simétrico.

5. **Quality Gates & Homologação**:
   - TypeScript (`npx tsc --noEmit`)
   - ESLint (`npm run lint`)
   - Vitest Unit & Coverage (`npm test -- --run` / `npm run test:coverage`)
   - Playwright E2E (`npx playwright test`)
   - Build de produção (`npm run build`)

6. **Documentação & Encerramento**:
   - Preencher `reviews/QA-104.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.
   - Marcar status como `Concluída`.

---

## 2. Arquivos Modificados / Criados

- `specs/SPEC-104-geometria-full-bevel-4-cantos.md` (Criado)
- `tasks/TASK-104-geometria-full-bevel-4-cantos.md` (Criado)
- `src/index.css` (Modificado)
- `src/components/ui/button.tsx` (Modificado)
- `src/components/ui/MagneticButton.tsx` (Modificado)
- `src/components/ui/__tests__/button.test.tsx` (Modificado)
- `src/components/ui/__tests__/MagneticButton.test.tsx` (Modificado)
- `reviews/QA-104.md` (Criar)
- `PROJECT.md` (Atualizar)
- `CHANGELOG.md` (Atualizar)
