# SPEC-046 — Refino Visual Minimalista do Hero EPM DEVTECH (Topologia Limpa & Espaço Negativo)

| Campo          | Valor                                                                                              |
|----------------|----------------------------------------------------------------------------------------------------|
| **ID**         | SPEC-046                                                                                           |
| **Título**     | Refino Visual Minimalista do Hero — Remoção de Ruído de Telemetria e Topologia Limpa               |
| **Prioridade** | Alta (UI/UX, Elegância Visual, Hierarquia de Informação e Conversão)                               |
| **Origem**     | Demanda PO (Prompt Engineer — Refino Visual, Validação em Localhost e Gate de Produção)            |
| **Autor**      | Elessandro Prestes Macedo / Gemini Antigravity                                                     |
| **Status**     | ✅ Aprovada pelo PO                                                                                |
| **Data**       | 2026-09-28                                                                                         |

---

## 1. Contexto e Diagnóstico

A implementação anterior do Hero (SPEC-045) consolidou o posicionamento institucional em engenharia de software e modernização de sistemas. No entanto, o feedback visual identificou acúmulo excessivo de ruído visual ("dashboard denso / telemetria Datadog"):
1. **Métricas simuladas desnecessárias** na visualização de arquitetura (`14ms`, `2.500 req/s`, `99.9%`, repetição do badge "Ativo");
2. **Linha intermediária de credenciais/tags** acumulada logo abaixo dos botões de CTA (`+9 anos em sistemas críticos...`), comprimindo o espaço e dispersando a atenção;
3. **Painel de arquitetura denso e saturado**, afastando a página da sofisticação e minimalismo de referências de alto padrão (como o Hero 3 da 21st.dev).

---

## 2. Diretrizes de Design e Contrato Visual

### 2.1. Minimalismo & Espaço Negativo
- **Remoção da linha intermediária de métricas/tags** abaixo dos CTAs (`+9 anos em sistemas críticos • Cloud-native • APIs resilientes • Código limpo`).
- **Respiro e protagonismo**: Aumentar o espaçamento vertical entre os botões de ação e a composição técnica inferior, dando protagonismo à headline e aos botões de conversão.
- **Composição centralizada e equilibrada**: Centralizar o fluxo de leitura (badge, headline, texto de apoio e CTAs) garantindo harmonia proporcional e alinhamento com a referência Hero 3.

### 2.2. Topologia de Arquitetura Limpa (`HeroArchitecture.tsx`)
- Transformar o mockup em uma **representação sutil e limpa de topologia de sistemas distribuídos**:
  - `Client / Edge`: Entrada, CDN, DNS e segurança perimetral.
  - `Domain Services`: APIs, microsserviços modulares e regras de negócio.
  - `Event Stream`: Mensageria assíncrona, filas resilientes e mensageria distribuída.
  - `Cloud & Data`: Bancos de dados resilientes, caching multicamada e replicação.
- **Eliminação total de telemetria simulada**: Sem números artificiais (`14ms`, `2500 req/s`), sem pings agressivos e sem múltiplos status redundantes.
- **Linhas e ícones limpos**: Uso elegante de ícones do `lucide-react` com linhas discretas, tipografia técnica limpa (Geist Mono / sans) e acentos pontuais no verde esmeralda institucional (`#10B981`) e cinzas neutros da paleta do projeto.
- **Desvanecimento suave (Fade-out)**: Transição suave na base do card com gradiente neutro (`bg-gradient-to-t from-background via-background/60 to-transparent`) para transição contínua com a próxima seção.

### 2.3. Responsividade e Tokens
- Confinamento estrito para evitar qualquer overflow horizontal em viewports móveis (320px, 375px, 390px) e desktops (768px, 1024px, 1440px+).
- Respeito integral aos tokens semânticos de Dark e Light Mode do projeto (shadcn/ui e Tailwind CSS 3).
- Respeito à preferência de acessibilidade `prefers-reduced-motion`.

---

## 3. Escopo Detalhado

### IN
- `src/components/sections/Hero.tsx`: Centralização elegante da composição, remoção da linha intermediária de tags abaixo dos CTAs, ampliação do respiro vertical.
- `src/components/sections/hero/HeroArchitecture.tsx`: Reestruturação do componente visual para topologia de sistemas limpa, sem telemetrias ou contadores fictícios, com transição fade-out suave na base.
- `src/components/sections/__tests__/Hero.test.tsx`: Atualização dos testes unitários para validar a topologia limpa, ausência de ruído e manutenção dos CTAs e a11y.
- Documentos do fluxo SDD: `specs/SPEC-046-hero-refino-visual-minimalista.md`, `tasks/TASK-046-hero-refino-visual-minimalista.md`, `reviews/QA-046.md`, `PROJECT.md` e `CHANGELOG.md`.

### OUT
- Não adicionar novas dependências ao `package.json`.
- Não alterar outras seções da aplicação (`Header`, `About`, `Services`, `Contact`, `Footer`).
- **PROIBIDO**: `git push`, `npm run deploy` ou qualquer disparo para ambientes de produção sem aprovação humana expressa.

---

## 4. Quality Gates

| Gate | Critério |
|---|---|
| Build | `npm run build` com saída limpa (sem erros de compilação ou chunks > 600KB) |
| Linter | `npm run lint` com 0 erros |
| Testes Unitários | `npm run test` 100% passando |
| Testes E2E | `npm run test:e2e` passando sem regressões |
| Gate de Produção | Execução local em dev server e retenção de deploy até aprovação humana explícita |
