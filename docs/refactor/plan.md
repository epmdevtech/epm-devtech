# Plano de Implementação e Arquitetura Técnica — Multi-Rota (Fase 1)

> **Documento de Especificação Técnica e Plano de Execução**  
> **Projeto:** EPM DEVTECH  
> **Referência:** SPEC-060 / TASK-060 (Fase 1 — Auditoria e Planejamento)  
> **Data:** 01/10/2026  
> **Status:** Concluído — Aguardando Aprovação do Product Owner para Fase 2

---

## 1. Visão Geral da Arquitetura Alvo

A EPM DevTech transitará do modelo de monólito landing page (onde todas as seções são montadas no componente `Index.tsx`) para uma **Arquitetura Multi-Rota de Páginas Independentes** dentro do ecossistema SPA do Vite + React Router DOM v6.

### Objetivos-Chave:
1. **Navegação Enxuta:** Header com **5 links institucionais + 1 botão de ação de alto contraste**:
   - `Serviços` (`/servicos`)
   - `Como trabalhamos` (`/como-trabalhamos`)
   - `Experiência` (`/experiencia`)
   - `Engenharia` (`/engenharia`)
   - `Sobre` (`/sobre`)
   - Botão: `"Falar sobre meu projeto"` (`/contato`)
2. **Homepage Comercial (Hub de Negócios):** Página curta e focada na dor do cliente, proposta de valor e conversão rápida, resumindo cada tema em 1 ou 2 linhas e linkando para as páginas de detalhe.
3. **Páginas Independentes com Conteúdo Próprio:**
   - `/servicos`: 4 serviços consolidados com seus mockups característicos e tags "Quando precisa:".
   - `/como-trabalhamos`: 4 etapas de governança técnica (Entendemos, Definimos, Desenvolvemos, Evoluímos).
   - `/experiencia`: Resultados de escala (4 stats), 4 contextos setoriais e organizações autorizadas (`CAPES`, `ONS`, `Energia Pecém`) sob rotulagem rigorosa de experiência profissional prévia.
   - `/engenharia`: 3 pilares de engenharia, chips de boas práticas e constelação interativa de tecnologias.
   - `/sobre`: Identidade da empresa, fundação e liderança técnica citada uma única vez (+9 anos), atuação remota e dados cadastrais.
   - `/contato`: Formulário com opções alinhadas aos serviços, canais diretos, garantia de retorno e 3 dúvidas frequentes em destaque.
   - `/duvidas-frequentes`: 8 perguntas agrupadas em 4 categorias claras a partir de fonte única de dados.
4. **Sem Regressão Visual nem de Tokens:** Zero novos gradientes, zero novos brilhos, zero bibliotecas de animação desnecessárias. Preservação estrita dos tokens e identidade visual da EPM DevTech.

---

## 2. Arquivos Impactados na Fase 2

### 2.1 Novos Arquivos a Criar
- `src/components/layout/Layout.tsx` — Shell compartilhado de aplicação com `<Header />`, `<main id="conteudo-principal">`, `<Outlet />`, `<Footer />`, skip-link acessível e gerência de rota.
- `src/components/ui/PageHeader.tsx` — Componente padronizado para cabeçalhos de páginas internas (eyebrow com ícone da marca + H1 semântico + subtítulo institucional).
- `src/components/routing/ScrollManager.tsx` — Gerenciador de restauração de rolagem, navegação para hashes e foco acessível no H1 após troca de rota.
- `src/config/experience.ts` — Fonte única e tipada de organizações de atuação profissional da liderança técnica, com trava `approved: boolean`.
- `src/config/faq.ts` — Fonte única de dados para perguntas e respostas frequentes (consumida por `/duvidas-frequentes` e pelo card de destaque em `/contato`).
- `src/pages/Home.tsx` — Nova Homepage curta (substitui a lógica de monólito do `Index.tsx`).
- `src/pages/ServicesPage.tsx` — Página dedicada para `/servicos`.
- `src/pages/HowWeWorkPage.tsx` — Página dedicada para `/como-trabalhamos`.
- `src/pages/ExperiencePage.tsx` — Página dedicada para `/experiencia`.
- `src/pages/EngineeringPage.tsx` — Página dedicada para `/engenharia`.
- `src/pages/AboutPage.tsx` — Página dedicada para `/sobre`.
- `src/pages/ContactPage.tsx` — Página dedicada para `/contato`.
- `src/pages/FAQPage.tsx` — Página dedicada para `/duvidas-frequentes`.
- `scripts/prerender.js` — Script de build para geração estática dos metadados HTML de cada rota em `dist/`.

### 2.2 Arquivos a Modificar
- `src/App.tsx` — Reestruturação de rotas com layout aninhado (`Route element={<Layout />}`), rotas canônicas e rota 404 limpa.
- `src/components/layout/Header.tsx` — Atualização para 5 links + 1 botão CTA, usando `NavLink` com `aria-current="page"`.
- `src/components/sections/Footer.tsx` — Atualização dos links de soluções e navegação para as novas rotas canônicas.
- `src/components/ContactForm.tsx` — Atualização das opções do campo `projectType` mantendo compatibilidade resiliente com valores anteriores.
- `public/sitemap.xml` — Atualização das URLs canônicas (`/`, `/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia`, `/sobre`, `/contato`, `/duvidas-frequentes`).
- `vercel.json` — Inserção de redirecionamentos 301 permanentes para URLs e seções migradas.
- `package.json` — Adição do passo de execução do `scripts/prerender.js` no script de build.
- `e2e/design-system-and-stability.spec.ts` — Atualização intencional dos testes para validar o fluxo multi-rota, integridade de H1 por rota e navegação do novo menu.

### 2.3 Arquivos Obsoletos a Remover ou Desacoplar
- Lógica de scroll-spy acoplada em `src/pages/Index.tsx` (o arquivo será substituído pelo `src/pages/Home.tsx` e pelas novas páginas dedicadas).

---

## 3. Engenharia de Front-end Detalhada

### 3.1 Estrutura do `Layout.tsx`
```tsx
<div className="min-h-screen flex flex-col bg-background text-foreground">
  {/* Acessibilidade: Skip Link para leitores de tela e teclado */}
  <a href="#conteudo-principal" className="skip-to-content">
    Pular para o conteúdo
  </a>

  {/* Header fixo compartilhado */}
  <Header />

  {/* Conteúdo dinâmico da rota ativa */}
  <main id="conteudo-principal" tabIndex={-1} className="flex-1 focus:outline-none">
    <Outlet />
  </main>

  {/* Rodapé compartilhado */}
  <Footer />

  {/* Componentes globais diferidos */}
  <LazyRender delay={2500}>
    <Suspense fallback={null}>
      <CursorOrb />
      <ScrollToTop />
    </Suspense>
  </LazyRender>
</div>
```

### 3.2 Componente `PageHeader.tsx`
Padronização visual e semântica para todas as páginas internas:
- **Eyebrow:** Ícone da marca EPM DevTech (svg minimalista) + texto mono em caixa-alta (`tracking-widest text-xs font-mono text-muted-foreground`).
- **H1:** Headings em *sentence case*, tipografia Geist, 100% monocromático com classes de token (`text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight`).
- **Subtítulo:** Texto fluido em tom neutro (`text-base sm:text-lg text-muted-foreground max-w-3xl mt-4`).
- **Nenhum gradiente** nem elementos cosméticos não funcionais.

### 3.3 Gerenciamento de Foco e Rolagem (`ScrollManager.tsx`)
- A cada transição de rota (`pathname` diferente):
  1. Se houver `hash` na URL (ex: `/engenharia#tecnologias`), aguarda renderização e rola até o elemento com compensação para o Header fixo (80px).
  2. Se não houver `hash`, rola para o topo da janela (`window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' })`).
  3. Transfere o foco programático para o elemento `<h1>` ou `<main id="conteudo-principal">` para garantir que leitores de tela anunciem o início do novo documento.

### 3.4 Code Splitting e Fallback sem CLS
- Cada página será importada via `React.lazy`:
  ```tsx
  const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
  ```
- O `<Suspense fallback={...}>` usará um container com altura mínima pré-alocada (`min-h-[60vh]`) para evitar qualquer Cumulative Layout Shift (CLS = 0) durante a transição entre telas.

---

## 4. Estratégia de SEO Multi-Rota e Solução de Pré-render (Seção 5.4)

### 4.1 Metadados Canônicos por Rota

| Rota | Title (≤ 60 caracteres) | Description (≤ 155 caracteres) | H1 da Página |
|---|---|---|---|
| `/` | `EPM DevTech \| Software House e Sistemas Sob Medida` | `Software house que desenvolve sistemas web, APIs e integrações sob medida para empresas. Crie, integre ou modernize seu sistema. Fale sobre seu projeto.` | `Desenvolvemos software sob medida para o seu negócio.` |
| `/servicos` | `Serviços de Desenvolvimento de Software \| EPM DevTech` | `Sistemas web, portais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio e código sustentável.` | `Soluções sob medida para cada estágio da sua operação` |
| `/como-trabalhamos` | `Como Trabalhamos \| EPM DevTech` | `Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e comunicação direta.` | `Como trabalhamos` |
| `/experiencia` | `Experiência em Projetos Reais \| EPM DevTech` | `Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia.` | `Experiência em projetos reais` |
| `/engenharia` | `Engenharia e Tecnologias \| EPM DevTech` | `Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança.` | `Engenharia pensada para evoluir` |
| `/sobre` | `Sobre a EPM DevTech \| Software House em Toledo, PR` | `Software house dedicada a engenharia de software sob medida, conduzida por fundador e liderança técnica com atendimento remoto em todo o Brasil.` | `Sobre a EPM DevTech` |
| `/contato` | `Fale Sobre Seu Projeto \| EPM DevTech` | `Inicie seu projeto de software com a EPM DevTech. Retorno em até 24 horas úteis com avaliação técnica e diagnóstico preliminar.` | `Fale sobre seu projeto` |
| `/duvidas-frequentes` | `Dúvidas Frequentes \| EPM DevTech` | `Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota.` | `Dúvidas frequentes` |

### 4.2 Decisão Técnica sobre Pré-render (Seção 5.4)
- **Problema Avaliado:** A Vercel serve `dist/index.html` para todas as requisições SPA, fazendo com que scrapers de mídias sociais (WhatsApp, LinkedIn, Twitter, Facebook) leiam apenas o título e a descrição da Home em qualquer rota compartilhada.
- **Opções Analisadas:**
  1. *SSG pesado com `vite-plugin-ssr` ou `vite-ssg`:* Exige reconfigurar todo o pipeline de build e pode gerar incompatibilidade com componentes que acessam `window` (como Framer Motion ou animações). Alto risco de quebra de hidratação.
  2. *Script pós-build estático (`scripts/prerender.js`):* Após o `vite build`, um script leve em Node.js (nativo, sem bibliotecas pesadas) lê o template gerado em `dist/index.html` e, para cada rota canônica (`/servicos`, `/como-trabalhamos`, `/experiencia`, `/engenharia`, `/sobre`, `/contato`, `/duvidas-frequentes`), cria um subdiretório com `index.html` estático contendo:
     - `<title>` específico da rota
     - `<meta name="description">` específica
     - `<link rel="canonical">` absoluto
     - Tags `og:title`, `og:description`, `og:url`
     - Estrutura semântica básica no HTML inicial (H1 visível nos primeiros bytes)
- **Decisão:** **Adotar o Script Pós-build Estático (`scripts/prerender.js`)**.
  - **Vantagens:** Risco zero no runtime da aplicação, compatibilidade nativa com a Vercel (onde arquivos estáticos têm precedência sobre rewrites), sem dependências adicionais e garante que crawlers e scrapers leiam os metadados corretos imediatamente via `curl`.

---

## 5. Diretrizes Rigorosas de Copy "Anti-IA" (Seção 6)

Em todas as páginas novas ou editadas, aplicaremos os filtros verificáveis:
1. **Pontuação:** Substituição de travessões ("—") e meias-riscas ("–") usados como pausa estilística artificial por vírgula, ponto ou dois-pontos.
2. **Banlist de Vocabulário:**
   - ❌ *Proibidos:* robusto, inovador, de ponta, next-gen, disruptivo, revolucionário, ecossistema, jornada, potencializar, alavancar, sinergia, holístico, transformação digital, excelência, excepcional, soluções completas, levar ao próximo nível, paixão por tecnologia.
   - ✅ *Abordagem Factual:* Declarar concretamente o que é feito: "integramos ERPs e sistemas legados", "construímos APIs orientadas a eventos", "monitoramos falhas em tempo real".
3. **Estrutura:** Proibidas fórmulas do tipo "não é X, é Y" ou "mais do que X, Y".
4. **Sentenças e Títulos:** Uso consistente de *sentence case* em títulos e botões.

---

## 6. Avaliação das Decisões Pendentes do Dono (Seção 10)

| Item da Seção 10 | Decisão Factual Proposta | Justificativa e Tratamento Técnico |
|---|---|---|
| **1. Organizações a exibir** | Confirmadas e exibidas: **CAPES**, **ONS**, **Energia Pecém**.<br>Pendentes: `Governo do MT/SEDUC-MT` e `Grupo Paraíso` declarados como `approved: false` em `src/config/experience.ts`.<br>**MEC omitido** (não consta no currículo). | Segue a regra de veracidade estrita. Rótulo explícito no bloco: *"Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente, em outras empresas. Não são clientes da EPM DevTech."* |
| **2. Mockups de código nos cards de serviço** | **Manter** os mockups existentes nos 4 cards da página `/servicos`. | Preserva a identidade visual sofisticada já aprovada e evita descaracterizar os componentes visuais desenvolvidos. Em rodada futura, poderá ser avaliada a substituição por diagramas conceituais de nós. |
| **3. Link do Instagram no rodapé** | **Permanecer desativado** (`enabled: false` em `SITE_CONFIG`). | Evita links quebrados para perfis em construção. Será ativado imediatamente quando a conta oficial for disponibilizada. |
| **4. Consultoria e avaliação técnica** | Apresentar como serviço factual de diagnóstico de arquitetura, análise de gargalos e plano de ação técnico. | Sem promessas de prazos ou valores que não estejam pré-aprovados; tom profissional e consultivo. |
| **5. Pré-render** | Implementar via script Node.js pós-build sem pacotes de terceiros. | Solução elegante, sem custo de dependências adicionais e 100% aderente ao build da Vercel. |
| **6. Páginas futuras (`/cases`, `/blog`)** | **Não criar agora.** | Evita páginas ralas ou "em breve". Serão criadas quando houver estudos de caso e artigos técnicos prontos. |

---

## 7. Análise de Riscos e Procedimento de Rollback

### Riscos Identificados e Mitigações:
1. **Risco:** Links externos ou favoritos quebrando com a migração.  
   *Mitigação:* Regras de redirecionamento 301 permanentes no `vercel.json` somadas ao interceptor no cliente para hashes (`/#servicos`, `/#contato`).
2. **Risco:** Regressão nos testes unitários e de acessibilidade.  
   *Mitigação:* Atualização intencional dos seletores de teste nos arquivos afetados mantendo cobertura ≥ 90% e execução de testes em cada etapa.
3. **Risco:** Aumento no tempo de build na Vercel.  
   *Mitigação:* O script de pré-render atua apenas sobre 8 arquivos estáticos em memória, adicionando menos de 100 milissegundos ao build.

### Procedimento de Rollback:
- O trabalho está sendo executado na branch `develop`, **sem commit e sem merge**.
- Em caso de necessidade de reversão imediata: `git checkout -- .` ou `git reset --hard HEAD`.

---

_Fase 1 finalizada com sucesso. Código-fonte permanece intacto aguardando validação do Product Owner._
