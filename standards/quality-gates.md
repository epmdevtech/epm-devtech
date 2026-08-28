# Quality Gates — Critérios de Entrada, Saída e Release

## Gate de Entrada (antes de criar TASK)

- [ ] SPEC aprovada e assinada pelo PO em `/specs/`
- [ ] Design aprovado (se houver mudança de interface)
- [ ] Impactos documentados na SPEC (arquivos afetados, dependências)
- [ ] Nenhuma TASK duplicada ou conflitante aberta

---

## Gate de Implementação (durante)

- [ ] TypeScript compila sem erros (`tsc --noEmit`)
- [ ] ESLint sem erros (`npm run lint`)
- [ ] Apenas arquivos listados na TASK foram modificados
- [ ] Nenhuma expansão de escopo silenciosa

---

## Gate de QA (antes do review)

- [ ] Todos os testes passando (`npm run test`)
- [ ] Cobertura de testes **≥ 90%** nos componentes afetados
- [ ] Build limpo sem warnings (`npm run build`)
- [ ] Chunk size ≤ 600KB (sem warnings do Vite)
- [ ] Testado manualmente: responsividade (mobile/tablet/desktop)
- [ ] Testado manualmente: dark mode e light mode
- [ ] Testado manualmente: navegação por teclado
- [ ] Formulário de contato testado (se afetado)
- [ ] Evidências registradas em `/reviews/QA-NNN.md`

---

## Gate de Review (antes do merge)

- [ ] Code review aprovado pelo revisor humano
- [ ] Design review aprovado (se interface modificada)
- [ ] Acessibilidade: ARIA labels, contraste, foco visível
- [ ] SEO: meta tags presentes nas rotas afetadas
- [ ] Documentação atualizada (`PROJECT.md`, `CHANGELOG.md`, docs/)
- [ ] REVIEW template preenchido em `/reviews/REVIEW-NNN.md`

---

## Gate de Release

- [ ] Todos os gates anteriores satisfeitos
- [ ] `npm run build` limpo em modo produção
- [ ] Deploy de preview validado na Vercel
- [ ] `CHANGELOG.md` atualizado com a versão e as mudanças
- [ ] `PROJECT.md` atualizado com o novo estado

---

## Definition of Done (DoD)

Uma funcionalidade está **pronta** quando:

1. ✅ SPEC aprovada
2. ✅ Implementação dentro do escopo da SPEC
3. ✅ Testes unitários passando com cobertura ≥ 90%
4. ✅ ESLint e TypeScript sem erros
5. ✅ Build limpo
6. ✅ Revisão de código aprovada
7. ✅ Documentação atualizada
8. ✅ Deploy de preview validado
