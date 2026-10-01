# SPEC-054 — Métricas de Experiência (4º Stat), Links de Redes no Rodapé e Saneamento do README / Repositório Público

## Metadados
- **ID:** SPEC-054
- **Título:** Reenquadramento das métricas de experiência técnica com 4º stat factual, unificação de constantes em `site.ts`, links de redes (LinkedIn e GitHub) no rodapé e saneamento técnico do README e dados públicos
- **Data:** 2026-09-30
- **Autor:** Gemini/Antigravity
- **PO:** Elessandro Prestes Macedo
- **Status:** Aprovado (Diretiva do PO)

---

## 1. Contexto e Motivação

1. **Seção de Experiência Técnica (Authority)**:
   - Na rodada anterior, os dados haviam sido consolidados em 3 métricas, mas a métrica "Zero perda" continha redundância de texto (expressão repetida no valor e na descrição).
   - O PO determinou o retorno da seção para a composição simétrica de 4 estatísticas comprováveis de projetos anteriores da liderança técnica, substituindo "Zero perda" por "100%" de integridade e inserindo o 4º stat factual: "−35%" de redução de atividades manuais.
   - Ajuste de microcopy no subtítulo: remoção do verbo "conduzidos" para evitar superestimação do papel individual em projetos de equipe.
   - Inclusão de nota discreta de confidencialidade abaixo do grid de estatísticas.

2. **Links de Redes Oficiais no Rodapé**:
   - Falta de links oficiais da organização no rodapé e persistência de links pessoais nos componentes e JSON-LD.
   - Centralização de todas as referências em módulo canônico único de configuração (`src/config/site.ts`).
   - Adição dos links para a Company Page do LinkedIn (`https://www.linkedin.com/company/112232713/`) e Organização do GitHub (`https://github.com/epmdevtech`) na coluna "Contato" do rodapé, com ícones SVG inline oficiais e labels visíveis.
   - Atualização do `sameAs` no JSON-LD organizacional (`ProfessionalService`).

3. **Saneamento do README e Repositório Público**:
   - O repositório `epmdevtech/epm-devtech` é público. O README atual continha menções explícitas a órgãos/clientes de projetos passados (CAPES, MEC, ONS), links e e-mails pessoais antigos e superlativos de marketing.
   - Reescrever o README de forma estritamente técnica, neutra e institucional.
   - Auditoria de segurança e alinhamento de arquivos públicos (`llms.txt`, `llms-full.txt`).

---

## 2. Especificação Técnica — Parte 1: Seção "Experiência em Operações que Não Podem Parar"

### 2.1 Conteúdo Exato
- **Tagline:** "Experiência e contexto"
- **H2:** "Experiência em operações que não podem parar"
- **Subtítulo:** "Resultados de projetos anteriores da liderança técnica da EPM DevTech." (sem a palavra "conduzidos")
- **Grid de 4 Estatísticas:**
  1. **Valor:** `99,9%` | **Descrição:** `Disponibilidade assegurada em plataformas críticas de energia e educação.`
  2. **Valor:** `2.500 RPS` | **Descrição:** `Arquitetura dimensionada para picos de 10.000 usuários simultâneos.`
  3. **Valor:** `100%` | **Descrição:** `De integridade dos dados na consolidação regulatória do setor elétrico, sem perda.`
  4. **Valor:** `−35%` | **Descrição:** `De atividades manuais, com automações e integrações em uma plataforma modernizada.`
- **Nota Discreta de Rodapé da Seção:**
  `"Contexto e detalhes sob solicitação, respeitando a confidencialidade dos projetos."` (centralizada, `text-xs text-zinc-500 dark:text-zinc-400 mt-8`).

### 2.2 Requisitos de Formatação e Acessibilidade
- Formatação pt-BR: vírgula decimal ("99,9%"), ponto de milhar ("2.500", "10.000").
- Sinal tipográfico de menos: caractere unicode `−` (U+2212) em "−35%", nunca hífen comum (`-`).
- Lista semântica: `<ul>` e `<li>`.
- Nome acessível para leitor de tela: o stat "−35%" deve possuir `<span className="sr-only">redução de 35%</span>` com o valor visual em `<span aria-hidden="true">−35%</span>`.
- Respeito estrito a `prefers-reduced-motion: reduce`.
- Tamanho tipográfico uniforme para todos os 4 números (`text-3xl lg:text-4xl font-bold`).
- Responsividade:
  - Desktop (≥ 1024px): 4 colunas (`lg:grid-cols-4`) com divisores verticais.
  - Tablet (640px a 1023px): grid 2×2 (`sm:grid-cols-2`) com divisores horizontais e verticais balanceados.
  - Mobile (< 640px): 1 coluna com divisores horizontais sutis, sem overflow horizontal em 320px.

---

## 3. Especificação Técnica — Parte 2: Links de Redes e Configuração Canônica

### 3.1 Módulo Canônico de Configuração (`src/config/site.ts`)
- Centraliza:
  - URLs de redes sociais da empresa:
    - LinkedIn: `https://www.linkedin.com/company/112232713/`
    - GitHub: `https://github.com/epmdevtech`
  - E-mail corporativo: `elessandro@epmdevtech.com.br`
  - WhatsApp: `https://wa.me/5545999178290` e `(45) 99917-8290`
  - Dados cadastrais (CNPJ: `60.710.574/0001-85`, Localização: `Toledo, Paraná`)
  - URL base: `https://epmdevtech.com.br`

### 3.2 Rodapé (`Footer.tsx`)
- Na coluna 4 ("Contato"), abaixo de e-mail e WhatsApp:
  - Inserção de lista com LinkedIn e GitHub.
  - Cada item possui:
    - Ícone oficial monocromático SVG em `currentColor` (20×20px), com `aria-hidden="true"`.
    - Rótulo visível ("LinkedIn" e "GitHub").
    - `href` proveniente de `SITE_CONFIG.links`.
    - `target="_blank"`, `rel="noopener noreferrer"`.
    - `aria-label="LinkedIn da EPM DevTech (abre em nova aba)"` e `aria-label="GitHub da EPM DevTech (abre em nova aba)"`.
    - Alvo de toque com altura mínima de 44px (`min-h-[44px]`), anel de foco acessível e contraste WCAG AA.
- Remoção de links e ícones pessoais antigos da Coluna 1.

### 3.3 SEO e Dados Estruturados (`index.html`)
- Atualizar o campo `sameAs` em `ProfessionalService`:
  ```json
  "sameAs": [
    "https://www.linkedin.com/company/112232713/",
    "https://github.com/epmdevtech"
  ]
  ```

---

## 4. Especificação Técnica — Parte 3: README e Repositório Público

### 4.1 README.md
- Descrição institucional e técnica: "Site institucional da EPM DevTech".
- Sem superlativos ("vitrine de excelência", etc.).
- Sem nomes de clientes ou empregadores passados (remover CAPES, MEC, ONS, Datainfo, etc.).
- Contato oficial: `elessandro@epmdevtech.com.br`.
- Instruções reproduzíveis de execução local (Node.js 20+ e Docker Compose).
- Comandos de testes e quality gates.

### 4.2 Saneamento de Arquivos Públicos
- Atualizar `public/llms.txt` e `public/llms-full.txt` removendo referências nominais confidenciais e sincronizando as métricas com os 4 stats aprovados.

---

## 5. Critérios de Aceite e Quality Gates

1. `npx tsc --noEmit`: 0 erros.
2. `npm run lint`: 0 erros / 0 warnings.
3. `npm run test`: 100% dos testes passando.
4. `npm run test:coverage`: Cobertura de testes ≥ 90%.
5. `npm run test:e2e`: 100% dos testes Playwright passando.
6. `npm run build`: Build de produção limpo, sem chunks > 600KB.
7. Evidências visuais antes e depois em 1440px, 768px e 375px (Dark e Light) registradas em `docs/evidence/stats-footer/`.
