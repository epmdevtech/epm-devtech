# SPEC-060 — Arquitetura de Informação Multi-Rota, Navegação Enxuta e SEO Estruturado

| Metadado | Valor |
|---|---|
| **ID** | SPEC-060 |
| **Título** | Arquitetura de Informação Multi-Rota, Navegação Enxuta e SEO Estruturado |
| **Status** | Concluída e Validada nos Quality Gates (Aguardando Revisão do PO) |
| **Data de Criação** | 2026-10-01 |
| **Autor** | Elessandro Prestes Macedo (PO) / Gemini |
| **Executor** | Gemini/Antigravity |
| **Versão** | 1.0.0 |

---

## 1. Contexto e Motivação

Atualmente, o site da EPM DevTech opera tecnicamente como uma Single Page Application (SPA), porém com a experiência de usuário configurada em formato de **monólito one-page**: o componente `Index.tsx` renderiza simultaneamente mais de 10 seções em um único DOM longo (> 12.000 pixels verticais), enquanto rotas declaradas como `/servicos` ou `/contato` apenas executam uma rolagem programática para a âncora correspondente.

Além disso, a barra de navegação no cabeçalho contém 8 links de texto que competem por atenção e causam poluição visual em viewports intermediárias. Para clientes e crawlers de redes sociais (WhatsApp, LinkedIn, Twitter/X) que não executam JavaScript, o servidor entrega sempre a mesma casca de HTML estático com metadados exclusivos da Home, ignorando a rota solicitada.

Esta especificação define a transição arquitetural para **páginas (rotas) independentes** dentro da SPA, com **navegação enxuta (5 links + 1 botão de ação)**, homepage curta com função de hub comercial, páginas internas ricas com H1 semântico e próximo passo claro, preservação absoluta de todas as URLs existentes via redirecionamento 301, e geração estática de metadados HTML por rota no pós-build.

---

## 2. Regras Absolutas e Inegociáveis

1. **Não Redesenhar:** Preservar a identidade visual da EPM DevTech, paleta de cores, tipografia Geist, tokens CSS, componentes base (`Button`, `SectionHeader`, cards, chips) e suporte integral aos temas Dark, Light e System. Mudam a estrutura de rotas, a navegação e a distribuição de conteúdo.
2. **Proibição de Elementos Supérfluos:** Zero novos gradientes, brilhos adicionais, partículas, 3D excessivo, blobs ou ilustrações genéricas de IA.
3. **Veracidade Estrita:** Nenhum cliente inventado, nenhum número fictício, nenhum depoimento ou certificação inexistente. A EPM DevTech é uma software house conduzida por seu fundador e liderança técnica.
4. **Ausência de Time ou Parceiros Falsos:** Proibido utilizar termos como "nosso time", "nossa equipe", "especialistas da equipe" ou "parceiros".
5. **Experiência Profissional Prévia ≠ Clientes da EPM:** Organizações em que o fundador atuou profissionalmente (`CAPES`, `ONS`, `Energia Pecém`) devem ser declaradas em `src/config/experience.ts` sob rótulo explícito e inequívoco de que não são clientes da EPM DevTech. Organizações sem confirmação (`Governo do MT/SEDUC-MT` e `Grupo Paraíso`) permanecem com flag `approved: false`. `MEC` permanece omitido.
6. **CTA Único Canônico:** Ação primária unificada: `"Falar sobre meu projeto"`. Ação secundária no Hero: `"Conhecer a EPM DevTech"`.
7. **Sentence Case em Português do Brasil:** Títulos, botões e cabeçalhos em sentence case, sem jargões inflados.
8. **Sem Conteúdo Duplicado:** O conteúdo que pertence a uma página interna dedicada não é repetido integralmente na Home; a Home apenas resume em 1 ou 2 linhas e direciona para a rota respectiva.
9. **Zero URLs Quebradas:** Nenhuma URL anterior deixará de funcionar.

---

## 3. Arquitetura de Informação Alvo

### 3.1 Navegação Superior (Header)
- **5 Links Textuais:**
  1. `Serviços` (`/servicos`)
  2. `Como trabalhamos` (`/como-trabalhamos`)
  3. `Experiência` (`/experiencia`)
  4. `Engenharia` (`/engenharia`)
  5. `Sobre` (`/sobre`)
- **1 Botão de Ação:**
  - `"Falar sobre meu projeto"` (`/contato`) — botão com estilo primário esmeralda (`min-height: 44px`).
- **Menu Móvel:** Mesma estrutura de 5 links + botão, acessível via teclado com `aria-expanded`, fechamento por tecla Esc e foco gerenciado.

### 3.2 Homepage Curta (Hub Comercial)
- **Hero Slim:** Proposta de valor clara, H1 `"Desenvolvemos software sob medida para o seu negócio."`, subheadline e CTAs.
- **Resumo de Serviços:** Apresentação sintetizada das 4 categorias de problemas que resolvemos, com link para `/servicos`.
- **Resumo de Processo:** Síntese da previsibilidade e governança, com link para `/como-trabalhamos`.
- **Resumo de Experiência e Escala:** Indicadores principais (99,9% uptime, alta escala) e link para `/experiencia`.
- **Resumo Institucional:** Breve apresentação da EPM DevTech e link para `/sobre`.
- **Fechamento Comercial:** Chamada final para `/contato`.

### 3.3 Páginas Internas Dedicadas

#### `/servicos` (H1: "Soluções sob medida para cada estágio da sua operação")
- 4 serviços estruturados:
  1. *Sistemas web, portais e plataformas corporativas* (MockBrowser)
  2. *APIs escaláveis e arquitetura de back-end* (MockAPI)
  3. *Integrações entre sistemas e comunicação orientada a eventos* (MockIntegration)
  4. *Modernização e evolução contínua de sistemas legados* (MockMaintenance)
- Cada card mantém os visuais técnicos aprovados e a seção "Quando precisa:".
- Próximo passo claro: link para `/como-trabalhamos` e CTA para `/contato`.

#### `/como-trabalhamos` (H1: "Como trabalhamos")
- As 4 etapas do método de engenharia com linha do tempo visual e descrições detalhadas:
  1. *Entendemos* (diagnóstico e alinhamento)
  2. *Definimos* (arquitetura, escopo e critérios de aceite)
  3. *Desenvolvemos* (entregas incrementais e comunicação direta)
  4. *Evoluímos* (monitoramento, testes e sustentabilidade)
- Link para `/duvidas-frequentes` e CTA para `/contato`.

#### `/experiencia` (H1: "Experiência em projetos reais")
- **Resultados:** 4 estatísticas de confiabilidade (99,9% uptime, 2.500+ RPS, etc.) com legenda obrigatória: *"Resultados de projetos da liderança técnica da EPM DevTech em outras empresas."*
- **Contextos de Negócio:** Os 4 setores de atuação (Indústria, Varejo, Educação, Energia) em cards interativos com seus mockups.
- **Projetos e Organizações:** Bloco baseado em `src/config/experience.ts` exibindo apenas organizações aprovadas (`CAPES`, `ONS`, `Energia Pecém`), sob o rótulo fixo: *"Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente, em outras empresas. Não são clientes da EPM DevTech."*

#### `/engenharia` (H1: "Engenharia pensada para evoluir")
- Os 3 pilares de engenharia sólida (Comunicação transparente, Arquitetura que facilita evoluir, Foco no problema do negócio).
- Linha de chips de boas práticas (Testes automatizados, CI/CD, monitoramento, desenvolvimento assistido por IA com revisão humana).
- Seção "Tecnologias que usamos" com o grafo interativo `TechConstellation` categorizado em Backend, Frontend, Dados, DevOps e Mensageria.

#### `/sobre` (H1: "Sobre a EPM DevTech")
- Apresentação institucional da software house.
- Liderança técnica e fundação citada **uma única vez** (+9 anos de experiência técnica).
- Atendimento 100% remoto para todo o território nacional.
- Dados cadastrais (CNPJ Toledo/PR) e compromisso ético de engenharia.

#### `/contato` (H1: "Fale sobre seu projeto")
- Formulário validado com Zod e máscara de telefone, com opções alinhadas aos serviços.
- Canais diretos de contato (WhatsApp, e-mail, redes oficiais).
- Bloco explicativo "O que acontece a seguir" (diagnóstico, retorno em até 24h úteis).
- 3 dúvidas frequentes em destaque com link para `/duvidas-frequentes`.

#### `/duvidas-frequentes` (H1: "Dúvidas frequentes")
- As 8 perguntas frequentes organizadas por categoria (Contratação, Sistemas, Processo, Serviços), consumidas da fonte única `src/config/faq.ts`.

---

## 4. Engenharia de Software e Roteamento SPA

### 4.1 Layout Compartilhado e Rotas Aninhadas
Implementação de `src/components/layout/Layout.tsx` contendo o cabeçalho, `<main id="conteudo-principal">`, `<Outlet />`, rodapé e skip-link acessível. O Header e o Footer permanecem fora dos chunks das páginas para evitar re-renderizações e duplicação de pacotes.

### 4.2 Gerenciamento de Foco e Rolagem
- Transição de rota rola suavemente para o topo (exceto se o usuário tiver `prefers-reduced-motion: reduce`).
- Suporte a âncoras internas (ex: `/engenharia#tecnologias`) rolando com compensação de 80px do topo.
- Transfere o foco via `tabIndex={-1}` para o `<h1>` da rota após a navegação para garantir acessibilidade plena em leitores de tela.

### 4.3 Redirecionamentos 301 e Preservação de URLs
- Regras permanentes configuradas no `vercel.json`:
  - `/setores` → `/experiencia` (301)
  - `/autoridade` → `/experiencia` (301)
  - `/diferenciais` → `/engenharia` (301)
  - `/tecnologias` → `/engenharia` (301)
  - `/faq` → `/duvidas-frequentes` (301)
- Interceptador no cliente (`ScrollManager.tsx`) que captura acessos com hash na home (`/#servicos`, `/#contato`) e redireciona com `replaceState` para a rota correspondente.

### 4.4 SEO Multi-Rota e Script de Pré-render
- Metadados dinâmicos por rota gerenciados via `<Helmet>` no cliente.
- Script Node.js executado no pós-build (`scripts/prerender.js`) que gera em `dist/<rota>/index.html` os arquivos estáticos pré-populados com `<title>`, `<meta name="description">`, `<link rel="canonical">` e Open Graph específicos para garantir indexação por buscadores e preview perfeito em redes sociais sem JS.

---

## 5. Quality Gates e Critérios de Aceite

1. **TypeScript:** Compilação limpa sem erros (`npx tsc --noEmit`).
2. **ESLint:** Zero erros e zero warnings (`npm run lint`).
3. **Cobertura de Testes:** Cobertura de testes unitários ≥ 90% em linhas, funções e statements (`npm run test:coverage`).
4. **Testes E2E (Playwright):** 100% de sucesso em testes cobrindo navegação multi-rota, F5 direto em cada rota, validação de H1 e redirecionamentos (`npm run test:e2e`).
5. **Build de Produção:** Build limpo sem nenhum chunk excedendo 600 KB (`npm run build`).
6. **Acessibilidade (WCAG 2.2 AA):** Um único H1 por página, foco visível em todos os elementos interativos, contraste mínimo de 4.5:1, skip-link funcional e menu móvel acessível.
