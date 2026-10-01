# SPEC-049 — Refatoração de Conteúdo, UX, Acessibilidade e SEO

## 1. Contexto e Motivação
A landing page institucional da **EPM DevTech** apresentava forte viés de currículo pessoal do fundador, dispersão de chamadas para ação (CTAs concorrentes), excesso de jargões técnicos para desenvolvedores antes de comunicar o valor de negócio, repetições de métricas (+9 anos e 99.9% uptime em 4 seções distintas) e metadados com formato de imagem inadequado para compartilhamento (ícone 512×512 em vez de 1200×630).

## 2. Objetivos
1. Estabelecer o fluxo comunicacional: **Problema → Solução → Serviço → Processo → Evidência → Confiança → Contato**.
2. Posicionar a EPM DevTech como empresa de engenharia de software sob medida, enquadrando o fundador como liderança técnica (uma única aparição bem dosada).
3. Unificar o CTA principal em **"Falar sobre meu projeto"** (e secundário **"Conhecer a EPM DevTech"**).
4. Condensar Serviços em 4 cards com frases de dor do cliente (Sistemas Web, APIs & Back-end, Integrações, Modernização).
5. Consolidar Diferenciais em 3 pilares estratégicos (Comunicação Transparente, Engenharia que Facilita Evoluir, Foco no Problema do Negócio).
6. Ajustar metadados, criar imagem Open Graph 1200×630 e otimizar JSON-LD.
7. Preservar 100% da identidade visual, componentes, layout responsivo e qualidade técnica (zero erros lint, typecheck, build e suíte de testes 100% passando).

## 3. Escopo de Alterações
- `index.html`: Novos title, meta description (152 chars), remoção de keywords, author institucional, og:image 1200×630, JSON-LD enxuto e honesto.
- `src/pages/Index.tsx`: Sincronização do dicionário `SEO_META` com os novos textos.
- `src/components/sections/Hero.tsx`: Headline, supporting copy focado em valor corporativo, CTA único e microprova de engenharia.
- `src/components/sections/Authority.tsx`: Prova de contexto por setor estratégico (sem apropriação indevida de marcas públicas).
- `src/components/sections/About.tsx`: "Engenharia de software com visão de negócio", empresa em primeiro lugar, fundador como liderança técnica, métrica de +9 anos única e contextualizada.
- `src/components/sections/Sectors.tsx`: "Experiência em diferentes contextos", 4 cards 3D preservados com foco em problema e experiência.
- `src/components/sections/Services.tsx`: 4 cards essenciais com frases-gatilho de necessidade do comprador corporativo.
- `src/components/sections/Technologies.tsx`: Título e subtítulo reposicionados como evidência técnica.
- `src/components/sections/Differentials.tsx`: 3 pilares de diferenciais e linha secundária de práticas de engenharia.
- `src/components/sections/FAQ.tsx`: Tom corporativo alinhado.
- `src/components/sections/Contact.tsx`: "Fale sobre seu projeto", botão com CTA unificado "Falar sobre meu projeto", mensagens claras de sucesso e erro.
- `src/components/sections/Footer.tsx`: Enxugamento de soluções e navegação.
- `public/og-image-1200x630.png`: Ativo de compartilhamento em alta resolução.
- Atualização das suítes de testes unitários para refletir as novas cópias sem quebras.

## 4. Critérios de Aceite
1. Zero erros de compilação TypeScript (`npx tsc --noEmit`).
2. Zero erros de ESLint (`npm run lint`).
3. 100% dos testes unitários passando (`npm run test`), cobertura mantida.
4. Suíte E2E do Playwright passando (`npm run test:e2e`).
5. Build de produção concluído com sucesso (`npm run build`).
6. CTA único *"Falar sobre meu projeto"* consistente em toda a página e metadados.
