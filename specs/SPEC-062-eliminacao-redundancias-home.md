# SPEC-062: Eliminação de Redundâncias e Otimização da Home ("/")

## Status
- **Status:** Aprovada (Assinada pelo PO Elessandro Prestes Macedo)
- **Data:** 2026-10-01
- **Autor:** Staff Front-end Engineer / UX/UI & Copywriting
- **Aprovador (PO):** Elessandro Prestes Macedo

---

## 1. Contexto e Problema
A página inicial (`/`) do site da EPM DevTech acumulou repetições conceituais entre o Hero, seções de resumo e rodapé:
1. As 4 frentes técnicas aparecem na topologia do Hero, na seção de serviços e no rodapé.
2. Métricas (99,9% e 2.500+ RPS) aparecem duplicadas no card do Hero e na seção de Resultados.
3. Termos como "estabilidade", "alta disponibilidade" e "missão crítica" repetem-se exaustivamente.
4. "Contato direto com quem constrói / liderança técnica" é mencionado em Processo, Pilares e Sobre.
5. Links secundários longos e heterogêneos prejudicam o ritmo de leitura.
6. CTAs inconsistentes ("Falar sobre um projeto" vs "Falar sobre meu projeto").
7. A seção "Sobre" na home repete a descrição corporativa e os pilares de engenharia sobrepõem Processo e Serviços.
8. O efeito do cursor (`CursorOrb`) sobrepõe o conteúdo textual com alto z-index e sem checagem de `prefers-reduced-motion`.

---

## 2. Princípio Orientador
> **"Uma ideia, um lugar."**
> Cada informação aparece uma única vez na home, na seção de maior impacto. Detalhes técnicos e aprofundamentos pertencem às páginas internas dedicadas.

---

## 3. Escopo da Reformulação

### 3.1. Hero (`src/components/sections/Hero.tsx`)
- Manter H1 ("Engenharia de software para construir, integrar e evoluir sistemas.") e subtítulo.
- Padronizar CTAs: Primário `"Falar sobre meu projeto"` (`/contato`) e Secundário `"Ver soluções"` (`#servicos`).
- Simplificar o card "Topologia de Arquitetura" para um visual limpo de stack:
  - Manter apenas nome da camada e tags de tecnologia.
  - Remover descrições longas, métricas de latência (< 50ms), RPS (2.500+) e o selo "Alta Disponibilidade 99,9%".

### 3.2. Serviços (`#servicos` em `src/pages/Home.tsx`)
- Título e subtítulo reescritos sem a palavra "estabilidade": foco na resolução de gargalos operacionais.
- 4 cards clicáveis (link para `/servicos`), cada um com frase de no máximo 14 palavras focada no **problema de negócio** (sem jargão puramente técnico).
- Remoção do link longo e substituição por link curto opcional (`Ver todos os serviços →`) e acessibilidade via `aria-label`.

### 3.3. Processo (`#como-trabalhamos` em `src/pages/Home.tsx`)
- Stepper horizontal direto com 4 etapas (Entendimento, Definição, Desenvolvimento, Evolução), cada uma com título e frase de até 10 palavras.
- Remoção do parágrafo introdutório longo.
- Incorporação sutil do diferencial "contato direto com quem constrói" em linha única.
- Link de saída curto: `Ver metodologia →` (`/como-trabalhamos`).

### 3.4. Resultados (`#autoridade` em `src/pages/Home.tsx`)
- **ÚNICO** lugar da Home que exibe métricas (99,9%, 2.500+ RPS, +448 instituições, Zero perda de dados) e nota de rodapé com asterisco.
- Título e subtítulo focados em escala real sem repetir "estabilidade".
- Link de saída curto: `Ver projetos →` (`/experiencia`).

### 3.5. Unificação Confiança + CTA Final (`#contato` em `src/pages/Home.tsx`)
- Remoção da seção duplicada "Sobre" da Home.
- Seção unificada de fechamento comercial e confiança:
  - Linha factual de confiança: *"Toledo (PR) · Atendimento em todo o Brasil · 9+ anos em sistemas críticos"*.
  - Headline de chamada para ação comercial.
  - CTA principal padronizado: `"Falar sobre meu projeto"`.
  - Promessa de SLA: *"Resposta em até 24h úteis"*.
  - Link secundário discreto: `"Dúvidas frequentes →"` (`/duvidas-frequentes`).

### 3.6. Seção de Pilares / Diferenciais
- Removida da Home (`#diferenciais`).
- Movida para a página `AboutPage.tsx` (`/sobre`), evitando duplicações desnecessárias.

### 3.7. Rodapé (`src/components/sections/Footer.tsx`)
- Descrição institucional reduzida a 1 linha concisa.
- Manutenção integral dos links de navegação, contato, dados legais e seletor de tema.

### 3.8. Ajuste Visual do Cursor (`src/components/CursorOrb.tsx` e `src/components/layout/Layout.tsx`)
- Redução de z-index para ficar atrás do conteúdo interativo (`pointer-events: none`).
- Opacidade reduzida e desligamento completo sob `prefers-reduced-motion` e dispositivos com ponteiro touch (`pointer: coarse`).

---

## 4. Matriz de Termos de Impacto na Home
Para assegurar o cumprimento estrito da regra "no máximo 1 ocorrência por termo de impacto":
- **"estabilidade"**: 1 ocorrência (Subheadline do Hero).
- **"alta disponibilidade"**: 1 ocorrência (Métrica de 99,9% na seção de Resultados).
- **"sistemas críticos" / "missão crítica"**: 1 ocorrência (Linha de confiança no bloco final).

---

## 5. Quality Gates
1. TypeScript: zero erros (`npx tsc --noEmit`).
2. ESLint: zero erros (`npm run lint`).
3. Vitest: 100% dos testes passando (`npm run test`).
4. Playwright E2E: testes de layout, links e navegação passando.
5. Build de produção e prerender estático executando sem erros.
6. Redução do scroll vertical da Home em ≥ 30%.
