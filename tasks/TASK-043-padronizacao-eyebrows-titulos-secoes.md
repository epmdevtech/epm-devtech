# TASK-043 — Padronização Visual de Eyebrows das Seções com Ícone da Marca e Atualização de Textos

| Campo              | Valor                                                                               |
|--------------------|-------------------------------------------------------------------------------------|
| **ID**             | TASK-043                                                                            |
| **SPEC**           | SPEC-043                                                                            |
| **Data de início** | 2026-09-10                                                                          |
| **Agente**         | Gemini/Antigravity                                                                  |
| **Status**         | ✅ Concluída                                                                        |

---

## Escopo da Tarefa

1. **Criação do Componente de Ícone (`src/components/ui/BrandChipIcon.tsx`)**:
   - SVG isolado com os traços do chip/processador estilizado (`{ [ ] }`) da marca EPM DEVTECH;
   - Sem preenchimento, stroke de cor `#10B981` (ou `currentColor`), dimensões configuráveis.
2. **Atualização do `SectionHeader.tsx` (`src/components/ui/SectionHeader.tsx`)**:
   - Remoção do formato badge/pill (fundo, borda arredondada, padding);
   - Inclusão do `BrandChipIcon` com 15px e gap de 7px;
   - Tipografia: `text-[11.5px] font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-400`;
   - Suporte a `title` opcional (para seções que só têm eyebrow);
   - Ajuste dinâmico de espaçamentos para evitar vão quando parágrafo ou título forem omitidos.
3. **Atualização das 8 Seções**:
   - `src/components/sections/Authority.tsx`: Usar SectionHeader com eyebrow "Prova Social & Autoridade", título "Projetos em produção, não em portfólio" e sem parágrafo;
   - `src/components/sections/About.tsx`: Atualizar título e parágrafo sem travessões;
   - `src/components/sections/Sectors.tsx`: Atualizar título e parágrafo com dois-pontos sem travessão;
   - `src/components/sections/Services.tsx`: Atualizar título e parágrafo com dois-pontos sem travessão;
   - `src/components/sections/Technologies.tsx`: Eyebrow "Stack Tecnológica", sem título e sem parágrafo;
   - `src/components/sections/Differentials.tsx`: Eyebrow "Diferenciais", título "Por que escolher a EPM DEVTECH", sem parágrafo;
   - `src/components/sections/FAQ.tsx`: Eyebrow "Dúvidas Frequentes", título "As perguntas que sempre chegam primeiro", parágrafo atualizado sem travessão;
   - `src/components/sections/Contact.tsx`: Eyebrow "Contato", título "Vamos entender o seu desafio", parágrafo atualizado com ponto-e-vírgula sem travessão.
4. **Atualização dos Testes**:
   - `src/components/ui/__tests__/SectionHeader.test.tsx`
   - `src/components/sections/__tests__/Authority.test.tsx`
   - `src/components/sections/__tests__/About.test.tsx`
   - `src/components/sections/__tests__/Sectors.test.tsx`
   - `src/components/sections/__tests__/Services.test.tsx`
   - `src/components/sections/__tests__/Technologies.test.tsx`
   - `src/components/sections/__tests__/Differentials.test.tsx`
   - `src/components/sections/__tests__/FAQ.test.tsx`
   - `src/components/sections/__tests__/Contact.test.tsx`
5. **Quality Gates & Documentação**:
   - `npm run test`
   - `npm run lint`
   - `npm run build`
   - `npx playwright test`
   - Criar `reviews/QA-043.md`
   - Atualizar `PROJECT.md` e `CHANGELOG.md`
   - Commit com boas práticas.

---

## Arquivos Criados / Modificados

- `specs/SPEC-043-padronizacao-eyebrows-titulos-secoes.md` (Criado)
- `tasks/TASK-043-padronizacao-eyebrows-titulos-secoes.md` (Criado)
- `src/components/ui/BrandChipIcon.tsx` (A criar)
- `src/components/ui/SectionHeader.tsx` (A modificar)
- `src/components/sections/Authority.tsx` (A modificar)
- `src/components/sections/About.tsx` (A modificar)
- `src/components/sections/Sectors.tsx` (A modificar)
- `src/components/sections/Services.tsx` (A modificar)
- `src/components/sections/Technologies.tsx` (A modificar)
- `src/components/sections/Differentials.tsx` (A modificar)
- `src/components/sections/FAQ.tsx` (A modificar)
- `src/components/sections/Contact.tsx` (A modificar)
- `src/components/ui/__tests__/SectionHeader.test.tsx` (A modificar)
- Suítes de testes unitários das seções (A atualizar)
- `reviews/QA-043.md` (A criar)
- `PROJECT.md` (A modificar)
- `CHANGELOG.md` (A modificar)
