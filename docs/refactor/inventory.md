# Inventário de Auditoria — Arquitetura de Informação Atual (Fase 1)

> **Documento de Auditoria Técnica e Conteúdo**  
> **Projeto:** EPM DEVTECH  
> **Referência:** SPEC-060 / TASK-060 (Fase 1 — Auditoria e Planejamento)  
> **Data:** 01/10/2026  
> **Status:** Concluído — Aguardando Aprovação do Product Owner para Fase 2

---

## 1. Rotas Atuais em `src/App.tsx` e Comportamento de Roteamento

### 1.1 Configuração Existente
- **Arquivo:** `src/App.tsx`
- **Rotas declaradas:**
  - `<Route path="/" element={<Index />} />`
  - `<Route path="/:section" element={<Index />} />`
  - `<Route path="*" element={<NotFound />} />`
- **Comportamento atual:**
  - A aplicação é uma SPA utilizando `react-router-dom` v6 (`BrowserRouter`).
  - O componente `Index` atua como **monólito one-page**: renderiza simultaneamente todas as 11 seções da página (`Hero`, `Services`, `HowWeWork`, `Differentials`, `Technologies`, `Authority`, `Sectors`, `About`, `FAQ`, `Contact`, `Footer`).
  - Quando o usuário acessa `/servicos` ou `/contato`, o `Index.tsx` captura o parâmetro de caminho (`pathname`), monta o DOM completo e dispara um `useEffect` com `setTimeout` para rolar programaticamente a tela até o elemento (`elem.getBoundingClientRect().top + window.scrollY - 80`).
  - Enquanto o usuário rola manualmente a tela, um `IntersectionObserver` detecta seções no viewport central e dispara `window.history.replaceState(null, "", `/${id}`)` para alterar a URL dinamicamente sem recarregar a página (scroll-spy).

---

## 2. Dicionário de Metadados (`SEO_META`), Canonical, Sitemap, Robots e Vercel

### 2.1 Metadados por Seção em `Index.tsx`
O arquivo `Index.tsx` contém o dicionário `SEO_META` com as seguintes entradas:
1. `""` (Home): Title: `"EPM DevTech | Software House e Desenvolvimento de Software Sob Medida"` | Description: 144 caracteres.
2. `"servicos"`: Title: `"Serviços | EPM DevTech"` | Description: 147 caracteres.
3. `"como-trabalhamos"`: Title: `"Como Trabalhamos | EPM DevTech"` | Description: 153 caracteres.
4. `"diferenciais"`: Title: `"Diferenciais | EPM DevTech"` | Description: 138 caracteres.
5. `"tecnologias"`: Title: `"Tecnologias | EPM DevTech"` | Description: 150 caracteres.
6. `"setores"`: Title: `"Setores de Atuação | EPM DevTech"` | Description: 151 caracteres.
7. `"sobre"`: Title: `"Sobre | EPM DevTech"` | Description: 145 caracteres.
8. `"faq"`: Title: `"FAQ | EPM DevTech"` | Description: 148 caracteres.
9. `"contato"`: Title: `"Contato | EPM DevTech"` | Description: 122 caracteres.

### 2.2 Canonical URL
- Implementado via `<Helmet>` no cliente:
  - Se `activeSection` estiver vazio: `https://epmdevtech.com.br/`
  - Se `activeSection` estiver preenchido: `https://epmdevtech.com.br/${activeSection}`
- No `index.html` estático bruto: `<link rel="canonical" href="https://epmdevtech.com.br/" />`.

### 2.3 `public/sitemap.xml`
Possui 8 URLs registradas:
1. `https://epmdevtech.com.br/` (prioridade 1.0)
2. `https://epmdevtech.com.br/sobre` (prioridade 0.8)
3. `https://epmdevtech.com.br/setores` (prioridade 0.8)
4. `https://epmdevtech.com.br/servicos` (prioridade 0.9)
5. `https://epmdevtech.com.br/tecnologias` (prioridade 0.7)
6. `https://epmdevtech.com.br/diferenciais` (prioridade 0.7)
7. `https://epmdevtech.com.br/faq` (prioridade 0.7)
8. `https://epmdevtech.com.br/contato` (prioridade 0.8)

### 2.4 `public/robots.txt`
- Permite rastreamento irrestrito (`User-agent: *`, `Allow: /`, `Disallow: /src/`).
- Concede permissão explícita para agentes e crawlers de IA (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `Google-Extended`, `Googlebot`, `Bingbot`, `FacebookBot`, `Applebot-Extended`, `Applebot`, `Bytespider`, `CCBot`, `Diffbot`, `cohere-ai`).
- Declara links alternativos para contexto semântico de LLMs (`/llms.txt`, `/llms-full.txt`).
- Referencia o sitemap: `Sitemap: https://epmdevtech.com.br/sitemap.xml`.

### 2.5 `vercel.json`
- Atualmente contém apenas rewrite genérico SPA:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Limitação:** Não há regras de redirecionamento 301 (`redirects`), o que significa que qualquer rota antiga sem página equivalente responde com a casca do `index.html` (código HTTP 200, soft-404).

---

## 3. Navegação: Header, Menu Móvel e Rodapé

### 3.1 Header (`src/components/layout/Header.tsx`)
- **Itens de menu (8 links):**
  1. `Serviços` (`#servicos`)
  2. `Como trabalhamos` (`#como-trabalhamos`)
  3. `Diferenciais` (`#diferenciais`)
  4. `Tecnologias` (`#tecnologias`)
  5. `Setores` (`#setores`)
  6. `Sobre` (`#sobre`)
  7. `FAQ` (`#faq`)
  8. `Contato` (`#contato`)
- **Botão de Ação no Header:**
  - Botão primário (`Button` emerald): `"Falar sobre meu projeto"` apontando para `#contato`.
- **Mecanismo de clique:**
  - `handleNavClick` intercepta o evento, chama `navigate('/${targetId}')`, aguarda 350ms e chama `window.scrollTo` programático.
- **Menu móvel:**
  - Renderiza os mesmos 8 links + botão de CTA em um drawer lateral com animação e backdrop.

### 3.2 Rodapé (`src/components/sections/Footer.tsx`)
- **Coluna 2 (Soluções):**
  - "Sistemas, portais e sites" (`#servicos`)
  - "APIs e back-end escalável" (`#servicos`)
  - "Integrações entre sistemas" (`#servicos`)
  - "Modernização de legados" (`#servicos`)
- **Coluna 3 (Navegação):**
  - "Serviços" (`#servicos`)
  - "Como trabalhamos" (`#como-trabalhamos`)
  - "Diferenciais" (`#diferenciais`)
  - "Sobre a empresa" (`#sobre`)
  - "Dúvidas frequentes" (`#faq`)
  - "Falar sobre meu projeto" (`#contato`)
- **Coluna 4 (Contato e Redes):**
  - E-mail (`contato@epmdevtech.com.br`)
  - WhatsApp (`+55 (45) 99122-3344`)
  - LinkedIn (`https://www.linkedin.com/company/epmdevtech`)
  - GitHub (`https://github.com/epmdevtech`)
  - Instagram: não exibido (preparado para ativação futura quando perfil for criado).
- **Sub-footer:**
  - Copyright e CNPJ (`53.865.176/0001-90`)
  - Seletor de Tema (Dark, Light, System)
  - Links para modais de Termos de Uso e Política de Privacidade

---

## 4. Seções da Home Atual: Ordem, Função e Redundâncias

| # | Seção | Componente | Função | Informação Nova | Redundância com outras seções |
|---|---|---|---|---|---|
| 1 | **Hero** | `Hero.tsx` | Proposta de valor, posicionamento comercial e conversão primária | H1 software sob medida, subheadline, CTA primário e secundário | Nenhuma (abertura) |
| 2 | **Serviços** | `Services.tsx` | Catálogo técnico de soluções | 4 cards com mockups de código/interface e tags "Quando precisa:" | Parcial com o formulário de contato |
| 3 | **Como trabalhamos** | `HowWeWork.tsx` | Metodologia de entrega e previsibilidade | 4 etapas (Entendemos, Definimos, Desenvolvemos, Evoluímos) | Repete promessas de comunicação já citadas |
| 4 | **Diferenciais** | `Differentials.tsx` | 3 pilares de engenharia e chips de práticas | Comunicação transparente, Engenharia para evoluir, Foco no negócio | Parcial com a metodologia e com o Sobre |
| 5 | **Tecnologias** | `Technologies.tsx` | Demonstração interativa de proficiência técnica | Grafo TechConstellation interativo com conexões por cluster | Repete stacks citadas nos cards de serviço |
| 6 | **Autoridade** | `Authority.tsx` | Indicadores de escala e resiliência | 4 stats: 99.9% uptime, 2.500+ RPS, +448 IES/650 escolas, Zero perda | Repete foco em estabilidade já dito em Serviços |
| 7 | **Setores** | `Sectors.tsx` | Experiência prática em verticais de mercado | 4 cards 3D interativos (Indústria, Varejo, Educação, Energia) | Sobreposição parcial com Authority |
| 8 | **Sobre** | `About.tsx` | Apresentação institucional da EPM e do fundador | Trajetória, modelo de atuação remota, fundador como líder técnico (+9 anos) | Repete competências técnicas já exibidas |
| 9 | **FAQ** | `FAQ.tsx` | Quebra de objeções e esclarecimento contratual | 8 perguntas e respostas em acordeão | Parcial com "Como trabalhamos" |
| 10 | **Contato** | `Contact.tsx` | Captura de lead e conversão final | Formulário estruturado com Zod + canais diretos + garantia de retorno | Destino de conversão do site |

**Diagnóstico de Carga Cognitiva:**  
Ter todas essas 10 seções renderizadas em uma única página resulta em uma rolagem excessivamente longa (mais de 12.000 pixels verticais), diluindo a mensagem de cada tema e sobrecarregando o visitante com estímulos simultâneos.

---

## 5. Chamadas para Ação (CTAs), Links Externos e Formulário

### 5.1 Inventário de CTAs
- **Header Desktop:** `"Falar sobre meu projeto"` (Button primário para `#contato`)
- **Header Mobile:** `"Falar sobre meu projeto"` (Button primário no final do menu)
- **Hero Primário:** `"Falar sobre meu projeto"` (Button primário para `#contato`)
- **Hero Secundário:** `"Conhecer a EPM DevTech"` (Button secundário neutro para `#sobre`)
- **Footer:** `"Falar sobre meu projeto"` (Link na coluna de navegação)
- **Formulário de Contato:** `"Falar sobre meu projeto"` (Botão de submissão com ícone de envio e feedback de carregamento)
- **Status de Unificação:** Todos os CTAs principais já foram unificados para o texto canônico `"Falar sobre meu projeto"`.

### 5.2 Formulário de Contato (`src/components/ContactForm.tsx`)
- **Campos:**
  - `name`: Nome completo (mínimo 3 caracteres, obrigatório)
  - `email`: E-mail corporativo válido (obrigatório)
  - `phone`: WhatsApp/Telefone com máscara dinâmica `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX` e validação estrita de DDD nacional
  - `projectType`: Seleção de desafio (obrigatório)
  - `message`: Descrição do projeto (mínimo 15 caracteres, obrigatório)
- **Opções Atuais do Campo `projectType`:**
  - `"Novo Sistema ou Aplicação Web"`
  - `"Modernização de Sistema Legado"`
  - `"APIs, Microsserviços e Integrações"`
  - `"Consultoria Técnica e Arquitetura"`
  - `"Outro Desafio"`
- **Alinhamento Solicitado na SPEC-060:**
  - `"Sistema, portal ou site institucional"`
  - `"APIs e integrações"`
  - `"Modernização de sistema legado"`
  - `"Consultoria ou avaliação técnica"`
  - `"Outro"`
  - *Compatibilidade:* Manter mapeamento resiliente para que valores submetidos anteriormente em testes ou caches continuem válidos.

---

## 6. Diagnóstico de Renderização: HTML Estático vs. SPA Shell

### 6.1 Análise de `curl` e Código-Fonte Servido
Executamos teste via `curl` contra a aplicação em build de produção:
```bash
curl -s http://localhost:8075/servicos | grep -E "(<title|<meta property=\"og:title)"
```
**Resultado obtido:**
```html
<title>EPM DevTech | Software House e Desenvolvimento de Software Sob Medida</title>
<meta property="og:title" content="EPM DevTech | Software House e Desenvolvimento de Software Sob Medida" />
```
O corpo da resposta contém exclusivamente:
```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

### 6.2 Impacto em Scrapers e Rasteadores
- O `react-helmet-async` funciona **exclusivamente no cliente** após a execução e hidratação do JavaScript.
- Scrapers que não executam JavaScript (como os geradores de preview do WhatsApp, LinkedIn, Telegram, Twitter/X, Apple Messages) recebem sempre o `index.html` estático raiz.
- Consequentemente, ao compartilhar um link para `https://epmdevtech.com.br/servicos` ou `https://epmdevtech.com.br/contato`, o preview exibirá o título, a descrição e o thumbnail da Homepage, sem personalização por rota.
- Na Fase 2, abordaremos este gargalo através da solução técnica descrita no plano (geração de HTML por rota no pós-build).

---

## 7. Linha de Base de Métricas e Testes (Baseline Antes da Refatoração)

### 7.1 Quality Gates Automatizados
- **Testes Unitários:** 22 suítes, **151 testes passando (100% de sucesso)**.
- **Cobertura de Código (Vitest v8):**
  - Statements: **99.71%** (exigência ≥ 90%)
  - Branches: **91.02%** (exigência ≥ 90%)
  - Functions: **90.47%** (exigência ≥ 90%)
  - Lines: **99.71%** (exigência ≥ 90%)
- **Testes End-to-End (Playwright):** **30 testes passando (100% de sucesso)**.
- **Compilação TypeScript:** `npx tsc --noEmit` finalizado com **zero erros**.
- **Linter:** `npm run lint` finalizado com **zero erros e zero warnings**.
- **Build de Produção:** `npm run build` gerado em **15.59s**, sem nenhum chunk excedendo 600 KB.

### 7.2 Auditoria Lighthouse (Baseline da Homepage Atual)
- **Mobile (Perfil Emulado Moto G / Slow 4G):**
  - Performance: **68** (TBT: 2.110 ms devido ao volume acumulado de 10 seções no DOM inicial; FCP: 1.8s, LCP: 2.2s, CLS: 0.001)
  - Acessibilidade: **97**
  - Melhores Práticas: **96**
  - SEO: **92**
- **Desktop:**
  - Performance: **100** (FCP: 0.4s, LCP: 0.5s, TBT: 0 ms, CLS: 0.031)
  - Acessibilidade: **97**
  - Melhores Práticas: **96**
  - SEO: **92**

> **Conclusão da Auditoria:** A arquitetura one-page acumulada penaliza a pontuação de performance mobile em TBT devido ao parsing e hidratação do monólito. A divisão em rotas com code splitting limpo trará ganhos expressivos de performance ao isolar o bundle de cada página.
