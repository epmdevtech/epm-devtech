# SPEC-057 — Métricas de Experiência (Legenda com Contexto em Outras Empresas) e Links de LinkedIn/GitHub no Rodapé

| Metadado | Valor |
|---|---|
| **ID** | SPEC-057 |
| **Título** | Refinamento da Seção de Autoridade (Métricas em Outras Empresas) e Links Oficiais no Rodapé |
| **Status** | Aprovada |
| **Data de Criação** | 2026-09-30 |
| **Autor** | Elessandro Prestes Macedo |
| **Executor** | Gemini/Antigravity |
| **Versão** | 1.0.0 |

---

## 1. Contexto e Problema

A página institucional da EPM DevTech deve refletir a mais rigorosa veracidade factual e transparência institucional, sem superestimar papéis individuais nem fazer alegações corporativas extemporâneas:
1. **Subtítulo da Seção de Experiência / Autoridade**:
   - A redação anterior dizia *"Resultados de projetos anteriores da liderança técnica da EPM DevTech."*.
   - A palavra "anteriores" é imprecisa porque a EPM DevTech foi fundada em maio/2025 e parte dos projetos assessorados pela liderança técnica ocorreu em paralelo ou após essa data em outras organizações.
   - O termo "conduzidos" já havia sido eliminado para não superestimar a atuação individual sobre trabalhos em equipe multidisciplinar.
   - O novo texto canônico é: *"Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."*.
2. **Presença Corporativa e Canais Oficiais no Rodapé**:
   - Centralização na constante `src/config/site.ts` das URLs oficiais da organização (`linkedin.com/company/112232713/` e `github.com/epmdevtech`).
   - Apresentação no rodapé sob a coluna "Contato", com ícones SVG inline monocromáticos, alvos de toque acessíveis (≥ 44×44px), `target="_blank"`, `rel="noopener noreferrer"` e labels `aria-label`.
   - Adição estrita dessas duas URLs ao array `sameAs` no JSON-LD de `ProfessionalService` em `index.html`.
3. **Saneamento e Auditoria de Segurança do Repositório Público**:
   - `README.md` técnico e neutro sem menções a empregadores/clientes passados (CAPES, MEC, ONS, Datainfo, etc.), sem superlativos e com contato oficial corporativo (`elessandro@epmdevtech.com.br`).
   - Auditoria de dados sensíveis e verificação da integridade do `.gitignore`.

---

## 2. Requisitos Funcionais e Conteúdo

### 2.1 Seção de Autoridade (`Authority.tsx`)
- **Título (H2)**: `"Experiência em operações que não podem parar"`
- **Subtítulo**: `"Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."`
- **4 Estatísticas Consolidadas**:
  1. `99,9%` | *"Disponibilidade assegurada em plataformas críticas de energia e educação."*
  2. `2.500 RPS` | *"Arquitetura dimensionada para picos de 10.000 usuários simultâneos."*
  3. `100%` | *"De integridade dos dados na consolidação regulatória do setor elétrico, sem perda."*
  4. `−35%` | *"De atividades manuais, com automações e integrações em uma plataforma modernizada."*
- **Nota de Confidencialidade**:
  *"Contexto e detalhes sob solicitação, respeitando a confidencialidade dos projetos."*
- **Regras de Formatação e Acessibilidade**:
  - Padrão pt-BR (vírgula decimal, ponto de milhar, sinal de menos tipográfico `−` U+2212).
  - Contador visual com `aria-hidden="true"` e valor final imediato no DOM.
  - Rótulos semânticos dedicados em `<span className="sr-only">`:
    - `"99,9% de disponibilidade"`
    - `"2.500 requisições por segundo"`
    - `"100% de integridade"`
    - `"redução de 35%"`

### 2.2 Links no Rodapé (`Footer.tsx` e `site.ts`)
- Consumir diretamente de `SITE_CONFIG.links.linkedin` e `SITE_CONFIG.links.github`.
- Renderizados na coluna "Contato" abaixo de E-mail e WhatsApp.
- Ícones SVG inline monocromáticos (16-20px), viewBox `0 0 24 24`, `currentColor`, `aria-hidden="true"`.
- Alvo de toque mínimo com `min-h-[44px]`, foco visível `ring-2 ring-emerald-500`, contraste WCAG AA.
- `sameAs` no JSON-LD do `index.html` limitado exclusivamente a estas duas URLs.

### 2.3 Repositório Público e Segurança
- `README.md` corporativo, técnico e neutro.
- Validação de `.gitignore` cobrindo `.env*`, `coverage/`, `dist/`, logs e capturas temporárias.
- Relatório de pendências externas para validação do Product Owner (LinkedIn canonical slug, Instagram, comprovações documentais).

---

## 3. Critérios de Aceite e Quality Gates

- [ ] Subtítulo da seção de autoridade atualizado para *"Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."*.
- [ ] Testes unitários atualizados em `Authority.test.tsx` e passando 100%.
- [ ] Links de LinkedIn e GitHub renderizados na coluna Contato do rodapé com acessibilidade e touch target ≥ 44px.
- [ ] `sameAs` no JSON-LD contendo apenas as duas URLs corporativas.
- [ ] `README.md` técnico sem termos promocionais nem referências diretas a clientes/terceiros.
- [ ] `npx tsc --noEmit` conclui com 0 erros.
- [ ] `npm run lint` conclui com 0 erros e 0 warnings.
- [ ] `npm run test:coverage` com cobertura ≥ 90% em todos os indicadores.
- [ ] `npm run test:e2e` com 18/18 testes passando.
- [ ] `npm run build` gerando bundle limpo sem warnings de chunks > 600KB.
