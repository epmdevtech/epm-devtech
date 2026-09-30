# Plano de Implementação e Lista de Pendências — EPM DevTech

> Documento gerado na **Fase 1 (Auditoria e Planejamento)**.  
> Este documento organiza a execução da **Fase 2 (Implementação)** e lista todas as decisões factuais que dependem da aprovação explícita do Product Owner.

---

## 1. Lista Priorizada de Problemas Encontrados

| Prioridade | Categoria | Problema Identificado | Impacto |
|---|---|---|---|
| **P0 (Crítico)** | Posicionamento & Narrativa | O site oscila entre "currículo do Elessandro" e "empresa de software", com termos excessivamente acadêmicos/técnicos antes de falar do valor para o cliente. | Perda de leads corporativos que não compreendem de imediato o que a empresa faz. |
| **P0 (Crítico)** | Conformidade Factual & Legal | Nomes de órgãos públicos (CAPES, MEC, ONS) e métricas de terceiros expostos como clientes diretos da EPM DevTech sem contextualização de origem. Título de "Engenheiro de Software" sem alinhamento legal. | Risco de conformidade institucional e questionamentos sobre titularidade de cases. |
| **P1 (Alto)** | CTA & Conversão | Dispersão de CTAs ("Solicite um orçamento", "Falar sobre meu projeto", "Conhecer a EPM", "Fale conosco", "Enviar mensagem"). | Falta de foco na jornada de conversão do usuário. |
| **P1 (Alto)** | Metadados & SEO | `meta description` com +9 anos e lista de tecnologias; `og:image` é um ícone quadrado 512×512 (prejudica previews no LinkedIn/WhatsApp/X); `meta keywords` obsoleta; JSON-LD superdimensionado. | Previews sociais desformatados e indexação sem foco no problema de negócio. |
| **P2 (Médio)** | Densidade & Redundância | Métricas repetidas em 4 lugares distintos (+9 anos, 99.9% uptime); 6 diferenciais com jargões (SonarQube, SOLID, TDD) competindo com os cards de Serviços e Sobre. | Carga cognitiva elevada e cansaço visual do decisor de negócios. |
| **P2 (Médio)** | Renderização & SEO | SPA com renderização puramente no cliente (`<div id="root"></div>` vazio no HTML entregue pelo servidor). | Rastreamento dependente de renderização em segunda onda por motores de busca; sem conteúdo no view-source. |

---

## 2. Plano de Alterações por Arquivo / Componente (Fase 2)

Todas as alterações na Fase 2 serão realizadas **sem alterar layout, design system ou trocar componentes**, aproveitando a estrutura já testada.

### 2.1 `index.html`
- Atualizar `<title>` para o novo padrão focado em valor.
- Substituir `<meta name="description">` pela nova cópia de 152 caracteres.
- Remover `<meta name="keywords">`.
- Atualizar `<meta name="author">` para `"EPM DevTech"`.
- Atualizar `og:image` e `twitter:image` para apontar para `https://epmdevtech.com.br/og-image-1200x630.png`, com dimensões `1200×630` e `alt` institucional.
- Remover ou calibrar `twitter:creator` conforme decisão do dono.
- Enxugar o JSON-LD estruturado:
  - Manter `WebSite` e `ProfessionalService` focados na empresa EPM DevTech.
  - Vincular o fundador (`Person`) apenas como `founder` e liderança técnica, removendo referências excessivas de currículo individual.
  - Sincronizar catálogo de serviços (`hasOfferCatalog`) com os 4 serviços consolidados.

### 2.2 `src/pages/Index.tsx`
- Atualizar o dicionário `SEO_META` para sincronizar os títulos e descrições dinâmicas de cada seção (`/`, `/sobre`, `/setores`, `/servicos`, etc.) com o novo posicionamento aprovado.
- Garantir que a tag canônica e o Open Graph reflitam a descrição sem anos de experiência no Hero.

### 2.3 `src/components/sections/Hero.tsx`
- Atualizar supporting copy para focar em sistemas web, APIs e integrações para empresas.
- Manter o H1 `"Desenvolvemos software sob medida para o seu negócio."`
- Atualizar o CTA secundário para `"Conhecer a EPM DevTech"` e o principal para `"Falar sobre meu projeto"`.
- Substituir a microprova técnica para termos de processo e engenharia (sem anos de experiência soltos).
- Preservar o componente visual `HeroArchitecture.tsx`.

### 2.4 `src/components/sections/Authority.tsx`
- Refatorar o cabeçalho para "Sistemas construídos para operações que não podem parar".
- Qualificar as métricas como evidência de capacidade em ambientes distribuídos.
- Substituir a faixa de organizações por setores de atuação estratégicos (ou manter os nomes validados com `[CONFIRMAR]`).

### 2.5 `src/components/sections/About.tsx`
- Atualizar SectionHeader para `"Engenharia de software com visão de negócio"`.
- Reescrever texto principal: EPM DevTech em primeiro lugar; Elessandro citado uma vez como fundador e liderança técnica.
- Inserir a métrica de +9 anos **exclusivamente aqui** (atribuída à liderança técnica).
- Simplificar os 3 pilares do card lateral para evitar concorrência com a seção Diferenciais.

### 2.6 `src/components/sections/Sectors.tsx`
- Atualizar SectionHeader: Título `"Experiência em diferentes contextos"` e subtítulo focado em complexidade e conformidade.
- Atualizar descrições dos 4 cards (Indústria, Varejo, Educação, Energia) com foco na tríade: dor operacional → abordagem de engenharia → resultado.
- Atualizar os handles para termos setoriais, removendo nomes de clientes que não tenham autorização.

### 2.7 `src/components/sections/Services.tsx`
- Condensar os 6 cards existentes em **4 cards fundamentais**:
  1. *Sistemas Web e Plataformas* (MockBrowser)
  2. *APIs & Back-end Escalável* (MockAPI)
  3. *Integrações & Comunicação entre Sistemas* (MockIntegration)
  4. *Modernização & Evolução de Sistemas* (MockMaintenance)
- Inserir frases-gatilho de necessidade do comprador em cada card ("Precisa criar um sistema novo?", "Seus sistemas não conversam entre si?", etc.).
- Ajustar os textos para linguagem orientada a benefícios corporativos, mantendo termos técnicos como suporte secundário.

### 2.8 `src/components/sections/Technologies.tsx`
- Atualizar cabeçalho da seção: Título `"Tecnologias que usamos para construir soluções"` e subtítulo explicativo de que a tecnologia é escolhida em função do problema.
- Preservar o componente interativo `TechConstellation`.

### 2.9 `src/components/sections/Differentials.tsx`
- Consolidar os 6 cards do pipeline em **3 pilares estratégicos de valor**:
  1. *Comunicação Transparente*
  2. *Engenharia que Facilita Evoluir*
  3. *Foco no Problema do Negócio*
- Inserir uma linha secundária discreta com as práticas de engenharia aplicadas (`[CONFIRMAR]`).
- Reduzir a quantidade de itens do grid reaproveitando o componente de pipeline/cards existente.

### 2.10 `src/components/sections/FAQ.tsx`
- Ajustar respostas do acordeão para voz corporativa consistente ("nós", "a equipe de engenharia").
- Manter as 10 perguntas essenciais que derrubam barreiras de contratação.
- Confirmar prazo operacional de retorno (24h úteis).

### 2.11 `src/components/sections/Contact.tsx`
- Atualizar título para `"Fale sobre seu projeto"`.
- Alterar o texto do botão de envio para `"Falar sobre meu projeto"`.
- Ajustar mensagens de feedback de erro e sucesso.
- Preservar validação com Zod, máscara de telefone brasileira e fallback automático para WhatsApp.

### 2.12 `src/components/sections/Footer.tsx`
- Sincronizar links de soluções com os 4 serviços consolidados.
- Atualizar links de navegação para refletir as âncoras essenciais.
- Preservar dados legais, CNPJ e seletor de tema.

### 2.13 Ativo de Imagem Open Graph (`public/og-image-1200x630.png`)
- Criar a imagem OG no formato 1200×630 px usando estritamente os ativos de marca já existentes no projeto (logotipo oficial, cores `#121212` e `#10B981`, tipografia Geist), sem inventar novos elementos visuais. A imagem servirá exclusivamente para metadados de compartilhamento externo.

---

## 3. Lista de Pendências para Decisão do Dono (Product Owner)

Favor responder a cada item antes de autorizar o início da Fase 2:

1. **Estrutura Real da Empresa e Porte:**
   - Como descrevemos a equipe da EPM DevTech?
     - (A) Estrutura enxuta liderada por Elessandro com engenheiros e especialistas parceiros sob demanda por projeto. *(Recomendado)*
     - (B) Equipe própria dedicada fixa.
     - (C) Outro formato (especificar).

2. **Título Profissional de Elessandro Prestes Macedo:**
   - Diante da regulamentação profissional do termo "Engenheiro" no Brasil (CONFEA/CREA), qual designação prefere utilizar na apresentação da liderança técnica?
     - (A) "Fundador e liderança técnica" / "Arquiteto de Software" *(Recomendado)*
     - (B) "Engenheiro de Software" (confirmando que há registro ou respaldo formal para o título)

3. **Citação de Órgãos e Clientes (CAPES, MEC, ONS, Energia Pecém, Governo MT):**
   - Os projetos para CAPES, ONS e Energia Pecém foram realizados pela pessoa física em empregos/consultorias anteriores ou pela empresa? Podemos citar nominalmente essas organizações na landing page?
     - (A) Citar apenas a nível de setor ("Educação Superior", "Operação Energética Nacional", "Indústria", "Varejo"), sem usar os nomes diretos dos órgãos. *(Mais seguro e profissional)*
     - (B) Sim, autorizo manter a menção explícita a CAPES/MEC, ONS e Energia Pecém como experiência comprovada da liderança técnica.

4. **Promessa Operacional de Tempo de Resposta:**
   - O site promete: *"Retorno técnico em até 24 horas úteis"*.
     - (A) Confirmado, esse prazo é cumprido rigorosamente.
     - (B) Substituir por *"Retorno ágil diretamente com a liderança técnica"*, sem fixar horas.

5. **Perfis Sociais Oficiais no Footer:**
   - No rodapé e no JSON-LD `sameAs`, mantemos os links de GitHub e LinkedIn pessoais de Elessandro ou existem perfis da empresa EPM DevTech?
     - (A) Manter os perfis de Elessandro como liderança técnica da empresa.
     - (B) Fornecer perfis institucionais caso existam.

6. **Twitter / X Creator Tag:**
   - Na tag `<meta name="twitter:creator">`:
     - (A) Manter `@elessandrodev`.
     - (B) Remover e utilizar apenas `@epmdevtech` (conta da empresa).

7. **Práticas Técnicas Aplicadas:**
   - Na linha de apoio dos diferenciais: *"testes automatizados, revisão de código, CI/CD e arquitetura orientada à manutenção"*. Confirmado para todos os projetos da EPM DevTech?
     - (A) Confirmado.
     - (B) Ajustar (indicar quais práticas manter).

---

## 4. Riscos Técnicos e Mitigações

1. **Risco: Renderização apenas no cliente (Client-Side SPA):**
   - *Impacto:* Motores de busca que atrasam execução de JS ou redes sociais sem interpretador JS não lêem o DOM interno.
   - *Mitigação:* Atualizar rigorosamente todos os metadados estáticos do `<head>` no `index.html` e criar a imagem OG 1200×630. Em tarefas futuras (fora desta refatoração), planejar pré-renderização estática (SSG) de rotas.
2. **Risco: Quebra de testes de componentes existentes ao condensar cards:**
   - *Impacto:* Os testes em `src/components/sections/__tests__/` verificam strings literais específicas (ex: "Desenvolvimento Web e Aplicações SPA", "99,9%", etc.).
   - *Mitigação:* Ao refatorar os textos na Fase 2, os testes correspondentes em `__tests__/` serão atualizados no mesmo commit para refletir as novas strings aprovadas, garantindo 100% de testes passando e cobertura ≥ 90%.
3. **Risco: Regressão visual ou de responsividade em notebooks (1280×800 / 1366×768):**
   - *Impacto:* Textos com tamanho diferente podem alterar a quebra de linha dos cards.
   - *Mitigação:* Manter rigorosamente o controle de altura e rodar a suíte E2E do Playwright nos viewports móveis e desktop estabelecidos (320, 390, 768, 1280, 1440px).

---

## 5. Parada Obrigatória (Quality Gate da Fase 1)

Conforme a seção 3.6 do protocolo desta refatoração:
- **A Fase 1 está concluída.**
- **Nenhum arquivo de código foi alterado.**
- **Aguardando aprovação explícita do Product Owner sobre `docs/refactor/copy-proposal.md`, `docs/refactor/plan.md` e as 7 pendências acima.**
