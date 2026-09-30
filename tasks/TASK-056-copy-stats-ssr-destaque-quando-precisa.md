# TASK-056 — Ajustes de Copywriting, Eliminação dos Stats Zerados e Destaque do "Quando precisa:"

- **Status:** Concluída
- **Responsável:** Gemini/Antigravity
- **Início:** 2026-09-30
- **Conclusão:** 2026-09-30
- **SPEC de Referência:** SPEC-056

---

## 1. Escopo de Arquivos

### Modificações de Copy e Repetições
- [x] `src/components/sections/Services.tsx` (card 4: reformulação sem repetição de "reduzindo" e "incremental")
- [x] `src/components/sections/hero/HeroArchitecture.tsx` (card 2: "desacoplamento entre serviços", chips sem duplicação e legendas dinâmicas)
- [x] `src/config/site.ts` (substituição de "especializada" por "dedicada a")
- [x] `public/site.webmanifest` (saneamento de "especializada")
- [x] `public/llms.txt` e `public/llms-full.txt` (saneamento de "especializada" e superlativos)
- [x] `index.html` (JSON-LD sem "especializada")
- [x] `README.md` (descrição com "dedicada a")
- [x] `src/components/legal/LegalModals.tsx` (saneamento de "serviços especializados")
- [x] `src/lib/buildConstellationLayout.ts` (remoção de "de excelência" e "líder")
- [x] `src/components/sections/Differentials.tsx` (remoção de "alinhamento... alinhando")
- [x] `src/components/sections/Technologies.tsx` (remoção de repetição de "tecnologias")
- [x] `src/components/sections/FAQ.tsx` (remoção de repetição de "gargalos")
- [x] `src/components/sections/Contact.tsx` (remoção de repetição de "confidencialidade")

### Seção Authority e CountUp
- [x] `src/components/ui/CountUp.tsx` (renderização inicial com valor final; animação como progressive enhancement)
- [x] `src/components/sections/Authority.tsx` (rótulos acessíveis dedicados, `aria-hidden="true"` no contador visual)
- [x] `src/components/sections/__tests__/Authority.test.tsx` (testes de valores finais sem rolagem, com reduced motion e no-JS)

### Destaque Visual "Quando precisa:"
- [x] `src/components/sections/Services.tsx` (estilo destacado: label verde mono, pergunta em foreground font-medium, divisor fino, nivelamento pela base `mt-auto`)
- [x] `src/components/sections/__tests__/Services.test.tsx` (atualização dos testes unitários)

### Evidências Visuais e E2E
- [x] `scripts/capture-services-cards.cjs` (captura before e after em 1440, 768, 375 px dark/light)
- [x] `e2e/design-system-and-stability.spec.ts` (adicionar cenários de validação de ausência de 0 em stats sem rolagem)

---

## 2. Checklist de Execução

- [x] 1. Capturar screenshots "before" de Services
- [x] 2. Aplicar ajustes textuais pontuais (Services, HeroArchitecture, site.ts, README, etc.)
- [x] 3. Realizar varredura e saneamento de termos superlativos não comprovados
- [x] 4. Aplicar correção no componente `CountUp` e seção `Authority`
- [x] 5. Implementar novo estilo visual do "Quando precisa:" em `Services.tsx`
- [x] 6. Capturar screenshots "after" de Services
- [x] 7. Executar testes unitários e de cobertura (`npm run test:coverage`)
- [x] 8. Executar testes E2E (`npm run test:e2e`)
- [x] 9. Executar linter e typecheck (`npm run lint`, `npx tsc --noEmit`)
- [x] 10. Executar build de produção (`npm run build`)
- [x] 11. Preencher relatório de QA em `reviews/QA-056.md`
- [x] 12. Atualizar `PROJECT.md` e `CHANGELOG.md`

