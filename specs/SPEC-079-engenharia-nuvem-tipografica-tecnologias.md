# SPEC-079 — Apresentação Tipográfica Editorial das Tecnologias na Rota /engenharia

- **Status:** APROVADO (por Elessandro Prestes Macedo)
- **Data:** 2026-10-02
- **Autor:** Gemini / Antigravity
- **PO / Revisor:** Elessandro Prestes Macedo
- **Branch:** `develop`

---

## 1. Contexto e Motivação

O Product Owner solicitou a eliminação da apresentação em caixas/camadas horizontais (`LAYER 01`, `LAYER 02`, etc.) na rota `/engenharia`, substituindo-a por uma apresentação tipográfica de alto impacto, diretamente inspirada na referência visual fornecida (`Captura de tela de 2026-10-02 06-56-43.png`).

Além disso, foi solicitada a curadoria estrita das tecnologias para exibir **apenas as tecnologias centrais de aplicação do projeto**, excluindo ferramentas operacionais, bancos de dados e mensagerias:
- **Tecnologias Removidas**: Grafana, Prometheus, GitHub Actions, Terraform, Kubernetes, Docker, MongoDB, Oracle, MySQL, PostgreSQL, Redis, Kafka, RabbitMQ, Symfony, Tailwind CSS.
- **Tecnologias Mantidas (as 9 tecnologias centrais da EPM DevTech)**:
  1. **React**
  2. **TypeScript**
  3. **Vue.js**
  4. **Angular**
  5. **Node.js**
  6. **PHP**
  7. **Laravel**
  8. **AWS**
  9. **Azure**

---

## 2. Decisões Técnicas e de Design

### 2.1. Apresentação Tipográfica Editorial (Inspirada na Imagem de Referência)
1. **Eliminação de Caixas/Racks Fechados**:
   - Remoção de qualquer grid de caixas ou linhas horizontais `LAYER 01..04`.
2. **Nuvem Tipográfica de Alto Impacto**:
   - Renderização das tecnologias em fluxo orgânico e flexível (`flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-8 sm:gap-y-6 md:gap-x-10 md:gap-y-7`).
   - Tipografia arrojada com escala destacada (`font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-primary transition-colors`).
3. **Badges de Autoridade e Realces Cromáticos**:
   - `AWS` com badge inline `[Certificado]` em tom dourado/âmbar (`bg-amber-500/15 text-amber-500 border border-amber-500/30 text-xs font-mono font-bold uppercase px-2 py-0.5 rounded`).
   - `Node.js` com badge inline `[Core Runtime]` em tom verde-água/brand (`bg-brand/15 text-text-brand border border-brand/30 text-xs font-mono font-bold uppercase px-2 py-0.5 rounded`).
   - Realce de cor pontual (ex.: `React` com destaque luminoso em tom coral/teal).
4. **Interatividade e Acessibilidade**:
   - Hover suave iluminando a tecnologia (`group-hover:text-brand transition-colors duration-150`).
   - Radix Tooltips acessíveis com papel semântico e descrição técnica contextual da tecnologia na EPM DevTech.
   - Navegação por teclado com foco visível acessível (`focus-visible:ring-2 focus-visible:ring-brand`).

---

## 3. Arquivos Envolvidos

| Arquivo | Ação | Descrição |
|---|---|---|
| `specs/SPEC-079-engenharia-nuvem-tipografica-tecnologias.md` | Modificar | Especificação aprovada |
| `tasks/TASK-079-engenharia-nuvem-tipografica-tecnologias.md` | Criar | Tarefa de execução SDD |
| `src/config/architecture.ts` | Modificar | Lista canônica das 9 tecnologias centrais e metadados |
| `src/components/sections/ArchitecturalBlueprint.tsx` | Modificar | Apresentação tipográfica editorial contínua |
| `src/components/sections/__tests__/ArchitecturalBlueprint.test.tsx` | Modificar | Suíte de testes unitários para a apresentação tipográfica |
| `src/pages/__tests__/pages.test.tsx` | Modificar | Ajuste dos testes da página `/engenharia` |
| `e2e/design-system-and-stability.spec.ts` | Modificar | Testes E2E do Playwright |
| `reviews/QA-079.md` | Criar | Relatório de validação dos quality gates |
| `PROJECT.md` / `CHANGELOG.md` | Modificar | Atualização canônica documental |

---

## 4. Critérios de Aceite

1. [ ] A rota `/engenharia` não possui apresentação em caixas/camadas fechadas (`LAYER 01..04`).
2. [ ] As 9 tecnologias centrais (React, TypeScript, Vue.js, Angular, Node.js, PHP, Laravel, AWS, Azure) são renderizadas com destaque tipográfico e presença visual inspirada na referência.
3. [ ] As 15 tecnologias solicitadas estão estritamente ausentes (PostgreSQL, MySQL, Oracle, MongoDB, Redis, Kafka, RabbitMQ, Docker, Kubernetes, Terraform, GitHub Actions, Prometheus, Grafana, Symfony, Tailwind CSS).
4. [ ] Badges `[Certificado]` na AWS e `[Core Runtime]` no Node.js estão presentes.
5. [ ] Tooltips de contextualização técnica preservados para todas as 9 tecnologias.
6. [ ] Quality Gates 100% aprovados (TypeScript, ESLint, Vitest, Playwright, Build).
