# TASK-040 — Footer: Migração do CNPJ para Linha de Copyright, Limpeza da Coluna 1 e Eliminação de Travessões nos Modais

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-040                                                                            |
| **SPEC**           | SPEC-040                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização do Rodapé (`src/components/sections/Footer.tsx`)**:
   - Remover da Coluna 1 o bloco vertical com Razão Social, CNPJ e Nome Fantasia ME.
   - Atualizar no Sub-footer a linha de copyright para:
     `© {currentYear} EPM DEVTECH  ·  CNPJ 60.710.574/0001-85. Todos os direitos reservados.`
2. **Atualização dos Modais Legais (`src/components/legal/LegalModals.tsx`)**:
   - Remover todos os caracteres de travessão (`—`), aplicando pontuação gramatical formal em português brasileiro.
3. **Atualização dos Testes Unitários (`src/components/sections/__tests__/Footer.test.tsx`)**:
   - Ajustar os testes para validar o CNPJ integrado ao copyright e confirmar a ausência do bloco cadastral vertical da Coluna 1.
4. **Quality Gates & Evidências**:
   - Vitest com coverage ≥ 90%.
   - ESLint com 0 erros.
   - Build de produção limpo.
   - Playwright com 10/10 testes passando.
   - Criar `reviews/QA-040.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Modificados / Criados

- `specs/SPEC-040-footer-cnpj-copyright-e-remocao-travessoes-legais.md` (Criado / Aprovado)
- `tasks/TASK-040-footer-cnpj-copyright-e-remocao-travessoes-legais.md` (Criado)
- `src/components/sections/Footer.tsx` (A modificar)
- `src/components/legal/LegalModals.tsx` (A modificar)
- `src/components/sections/__tests__/Footer.test.tsx` (A modificar)
- `reviews/QA-040.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
