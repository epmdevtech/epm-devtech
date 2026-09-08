# TASK-035 — Reorganização UX/UI e Arquitetura de Informação

| Campo        | Valor                                                               |
|--------------|---------------------------------------------------------------------|
| **SPEC**     | SPEC-035-reorganizacao-ux-ui-arquitetura-informacao.md              |
| **Status**   | ✅ Concluída                                                        |
| **Início**   | 2026-09-08                                                          |
| **Executor** | Gemini/Antigravity                                                  |

---

## Arquivos a criar / modificar

| Arquivo | Operação | Descrição |
|---------|----------|-----------|
| `src/components/sections/Hero.tsx` | Editar | CTA primário atualizado para "Falar com a engenharia" |
| `src/components/sections/About.tsx` | Editar | Bloco institucional focado na história, fundador e métricas |
| `src/components/sections/Sectors.tsx` | Criar | Seção 4 dedicada preservando os 4 cards 3D e mockups |
| `src/components/sections/Services.tsx` | Editar | Tríade O que fazemos / Problema / Como fazemos nos 6 cards |
| `src/components/sections/Differentials.tsx` | Editar | Copywriting focado em benefícios de escolha |
| `src/components/sections/FAQ.tsx` | Editar | Foco estrito em remoção de objeções reais (sem redundância) e contraste WCAG AAA |
| `src/components/layout/Header.tsx` | Editar | Adicionar Setores e FAQ na navegação |
| `src/components/sections/Footer.tsx` | Editar | Sincronizar navegação com Setores de Atuação e Dúvidas Frequentes |
| `src/pages/Index.tsx` | Editar | Nova ordem das 10 seções, scroll spy e SEO meta |
| `src/components/sections/__tests__/Hero.test.tsx` | Editar | Atualizar label de teste para novo CTA |
| `src/components/sections/__tests__/About.test.tsx` | Editar | Testes do bloco institucional |
| `src/components/sections/__tests__/Sectors.test.tsx` | Criar | Testes unitários dos cards 3D dos setores |
| `src/components/sections/__tests__/FAQ.test.tsx` | Criar | Testes unitários de FAQ |
| `src/components/sections/__tests__/Footer.test.tsx` | Editar | Testes dos novos links no rodapé |
| `src/pages/__tests__/Index.test.tsx` | Editar | Testes da nova ordem de seções e rota |

---

## Checklist de Execução

- [x] SPEC-035 aprovada pelo PO
- [x] Ajustar Hero.tsx (CTA "Falar com a engenharia")
- [x] Criar Sectors.tsx com os 4 cards 3D preservados integralmente
- [x] Refinar About.tsx com apresentação institucional e stats
- [x] Refinar Services.tsx com tríade nos 6 cards
- [x] Refinar Differentials.tsx com foco em benefícios
- [x] Atualizar FAQ.tsx focado em objeções reais, sem redundâncias e com contraste WCAG AAA no light mode
- [x] Atualizar Header.tsx com links de navegação
- [x] Sincronizar Footer.tsx com Setores de Atuação e Dúvidas Frequentes
- [x] Atualizar Index.tsx com a nova ordem das 10 seções
- [x] Atualizar suíte de testes unitários (20/20 suítes, 134 testes, 98.5% coverage)
- [x] Executar build de produção (`npm run build`)
- [x] Executar lint (`npm run lint` — 0 erros)
- [x] Preencher QA-035
- [x] Validar no localhost pelo PO (Aprovado)
- [x] Atualizar PROJECT.md e CHANGELOG.md
- [x] Commit e Push para branch develop

