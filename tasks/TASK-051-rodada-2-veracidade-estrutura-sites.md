# TASK-051 — Rodada 2: Veracidade, Redundância, Estrutura e Sites Institucionais

**Objetivo**: Implementar a Rodada 2 de refatoração conforme SPEC-051, eliminando métricas não comprovadas, suavizando afirmações absolutas, removendo redundâncias, reordenando a homepage com a inclusão de "Como trabalhamos", adicionando "Sites Institucionais" e calibrando o FAQ para 8 perguntas.

**SPEC de Referência**: `specs/SPEC-051-rodada-2-veracidade-estrutura-sites.md`

## Checklist de Execução
- [x] 1. **Veracidade / Métricas**: Enquadrar `Authority.tsx` com atribuição honesta aos projetos anteriores da liderança técnica, 3 stats e remoção de badges.
- [x] 2. **Hero Architecture**: Alinhar termos do diagrama com o histórico comprovado ("Alta Vazão" e "Alta Disponibilidade" mantidos; "Zero Perdas" → "Processamento resiliente", "Multi-Região" → "Redundância", "CDN Global" → "Entrega otimizada").
- [x] 3. **Linguagem Contratual / Varredura**: Suavizar em `src` e metadados todas as garantias absolutas e eliminar 100% dos usos do título "engenheiro" no pessoal.
- [x] 4. **Atribuição da Experiência**: Reescrever cards de `Sectors.tsx` para a fórmula "Experiência em..." com descrições objetivas.
- [x] 5. **Redundância e Liderança**: Em `About.tsx`, manter apenas a stat "9+ Anos de Experiência Técnica" e condensar o card de liderança técnica eliminando repetição dos 3 pilares e detalhamento de SDD.
- [x] 6. **Processo / "Como trabalhamos"**: Criar `src/components/sections/HowWeWork.tsx` com âncora `#como-trabalhamos` e pipeline 01-04 (Entendemos, Definimos, Desenvolvemos, Evoluímos).
- [x] 7. **Nova Ordem da Homepage**: Reordenar seções em `src/pages/Index.tsx` (`Hero` → `Serviços` → `Como trabalhamos` → `Diferenciais` → `Tecnologias` → `Autoridade + Setores` → `Sobre` → `FAQ` → `Contato` → `Footer`) e atualizar dicionário de `SEO_META`.
- [x] 8. **Navegação Sincronizada**: Alinhar itens de menu no `Header.tsx` e `Footer.tsx` com a nova ordem e rótulos.
- [x] 9. **Sites Institucionais**:
  - `Services.tsx`: Card 1 "Sistemas Web, Portais e Sites Institucionais".
  - `Contact.tsx`: Opção "Site Institucional" no select de tipos de projeto.
  - `Footer.tsx`: Link "Sistemas, Portais e Sites".
  - `FAQ.tsx`: Pergunta 8 sobre sites institucionais e portais.
- [x] 10. **FAQ Condensado**: Consolidar de 10 para exatamente 8 perguntas com resposta simples sobre SDD na Pergunta 7.
- [x] 11. **Ajustes Menores**:
  - `Contact.tsx`: Placeholder do telefone `(45) 99999-9999`.
  - `index.html`: Remover `twitter:creator` pessoal.
- [x] 12. **Testes Unitários e E2E**:
  - Criar `src/components/sections/__tests__/HowWeWork.test.tsx`.
  - Atualizar testes de `Services`, `About`, `FAQ`, `Sectors`, `Contact`, `Index`, `Authority`, `Footer`, `Hero`, e `e2e/design-system-and-stability.spec.ts`.
- [x] 13. **Quality Gates**:
  - `npx tsc --noEmit` (0 erros)
  - `npm run lint` (0 erros)
  - `npm run test` e `npm run test:coverage` (98.55% cobertura)
  - `npm run test:e2e` (16/16 testes passando)
  - `npm run build` (Chunks < 145 kB)
- [x] 14. **Documentação e Evidências**:
  - Gerar `reviews/QA-051.md`.
  - Apresentar o relatório final nas 11 seções obrigatórias.
  - **NÃO COMMITAR**: Manter as alterações uncommitted na branch `develop` com o dev server ativo.
