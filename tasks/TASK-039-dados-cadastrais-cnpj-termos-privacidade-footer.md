# TASK-039 — Footer: Inclusão de Dados Cadastrais (CNPJ), Termos de Uso, Política de Privacidade e Limpeza de Textos

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-039                                                                            |
| **SPEC**           | SPEC-039                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Atualização do Rodapé (`src/components/sections/Footer.tsx`)**:
   - Inserir na Coluna 1, abaixo de "Toledo, Paraná.", o bloco com os dados cadastrais oficiais da empresa:
     - Razão Social: `ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA`
     - CNPJ: `60.710.574/0001-85 · Matriz`
     - Nome Fantasia: `EPM DEVTECH (ME)`
   - Remover da Coluna 4 (Contato) o bloco de retorno técnico (`Retorno técnico em até 24 horas úteis` e ícone `Clock`).
   - Remover do Sub-footer a frase `Código limpo, arquitetura sólida e alta disponibilidade.`.
   - Adicionar no Sub-footer à direita os links/botões para abertura dos modais de **Termos de Uso** e **Política de Privacidade** (em conformidade com a LGPD — Lei nº 13.709/2018).
2. **Criação/Estruturação dos Modais Legais**:
   - Integrar componentes `Dialog` (shadcn/ui / Radix UI) com textos jurídicos completos para Termos de Uso e Política de Privacidade da EPM DEVTECH, com scroll interno, acessibilidade (foco, escape, aria-labels) e suporte completo a Dark/Light mode.
3. **Atualização dos Testes Unitários (`src/components/sections/__tests__/Footer.test.tsx`)**:
   - Atualizar suíte do Vitest para verificar CNPJ, Razão Social, novos links legais e ausência dos textos removidos.
4. **Quality Gates & Evidências**:
   - Vitest com coverage ≥ 90%.
   - ESLint com 0 erros.
   - Build de produção sem warnings.
   - Playwright E2E suite com 10/10 testes passando.
   - Criar `reviews/QA-039.md`.
   - Atualizar `PROJECT.md` e `CHANGELOG.md`.

---

## Arquivos Criados / Modificados

- `specs/SPEC-039-dados-cadastrais-cnpj-termos-privacidade-footer.md` (Criado / Aprovado)
- `tasks/TASK-039-dados-cadastrais-cnpj-termos-privacidade-footer.md` (Criado)
- `src/components/legal/LegalModals.tsx` (Criado se necessário ou embutido de forma modular)
- `src/components/sections/Footer.tsx` (Modificado)
- `src/components/sections/__tests__/Footer.test.tsx` (Modificado)
- `reviews/QA-039.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
