# Mapa de Migração de Rotas e Navegação (Antigo → Novo)

> **Documento de Mapeamento de Rotas e Compatibilidade**  
> **Projeto:** EPM DEVTECH  
> **Referência:** SPEC-060 / TASK-060 (Fase 1 — Auditoria e Planejamento)  
> **Data:** 01/10/2026  
> **Status:** Concluído — Aguardando Aprovação do Product Owner para Fase 2

---

## 1. Princípios de Compatibilidade e Preservação de URLs

1. **Zero Links Quebrados:** Nenhuma URL que já existiu no site (`sitemap.xml`, histórico de SEO ou links compartilhados) responderá com erro 404.
2. **Redirecionamento em Dupla Camada:**
   - **Camada de Borda (Edge):** Regras de redirecionamento 301 HTTP permanente no `vercel.json` para bots, indexadores e requisições diretas de navegador.
   - **Camada de Cliente (SPA):** Interceptador no roteamento do cliente para URLs acessadas via hash (`/#secao`) ou em ambientes locais onde as regras da Vercel não estejam ativas.
3. **Páginas Próprias com H1 Semântico:** Cada rota canônica renderiza um único `<h1>`, metadados de SEO dedicados (`<title>`, `<meta name="description">`, `canonical`), conteúdo substancial e um CTA final claro (sem becos sem saída).
4. **Menu Enxuto:** O header passa de 8 itens em linha para **5 links textuais + 1 botão de ação**, garantindo clareza e respiração visual.

---

## 2. Tabela Obrigatória: Mapeamento "Antigo → Novo"

| URL / Âncora Antiga | URL Nova Canônica | Tratamento Técnico | Função da Nova Rota | Risco de Quebra | Mitigação Aplicada |
|---|---|---|---|---|---|
| `/` | `/` | **Mantida** (Página própria) | Home comercial curta (hub de negócios que resume a proposta e direciona para as páginas de detalhe). | Baixo | Rota raiz preservada. |
| `/servicos` ou `/#servicos` | `/servicos` | **Página própria** (deixa de rolar a home) | Catálogo completo dos 4 serviços essenciais, visuais detalhados, tags "Quando precisa:" e próximo passo para `/como-trabalhamos` e `/contato`. | Baixo | URL `/servicos` preservada; hash `/#servicos` capturado pelo cliente e redirecionado com `replaceState`. |
| `/como-trabalhamos` ou `/#como-trabalhamos` | `/como-trabalhamos` | **Página própria** (deixa de rolar a home) | Detalhamento das 4 etapas de entrega (Entendemos, Definimos, Desenvolvemos, Evoluímos), governança técnica, previsibilidade e link para dúvidas. | Baixo | URL `/como-trabalhamos` preservada; hash redirecionado no cliente. |
| `/setores` ou `/#setores` | `/experiencia#contextos` | **Redirecionamento 301** (Vercel) + Fallback cliente | Fusão na página de Experiência: agrupa os 4 contextos de negócio (Indústria, Varejo, Educação, Energia) junto aos indicadores de resiliência e projetos autorizados. | Médio | 301 no `vercel.json` de `/setores` para `/experiencia#contextos` preserva PageRank; âncora `#contextos` rola até o bloco exato. |
| `/autoridade` ou `/#autoridade` | `/experiencia#resultados` | **Redirecionamento 301** (Vercel) + Fallback cliente | Bloco de indicadores e resultados consolidados na página de Experiência. | Médio | Redirecionamento permanente para a nova rota de autoridade consolidada. |
| `/diferenciais` ou `/#diferenciais` | `/engenharia` | **Redirecionamento 301** (Vercel) + Fallback cliente | Fusão na página de Engenharia: os 3 pilares de engenharia e chips de boas práticas agora integram a rota temática de engenharia de software. | Médio | 301 no `vercel.json` de `/diferenciais` para `/engenharia`. |
| `/tecnologias` ou `/#tecnologias` | `/engenharia#tecnologias` | **Redirecionamento 301** (Vercel) + Fallback cliente | O grafo interativo TechConstellation e sua taxonomia por categorias passam a residir no bloco de tecnologias da página de Engenharia. | Médio | 301 no `vercel.json` de `/tecnologias` para `/engenharia#tecnologias`; rola até o grafo com compensação de header. |
| `/sobre` ou `/#sobre` | `/sobre` | **Página própria** (deixa de rolar a home) | Apresentação institucional da EPM DevTech, atuação técnica, liderança técnica mencionada uma única vez (+9 anos), dados cadastrais (CNPJ) e localização em Toledo/PR. | Baixo | URL `/sobre` preservada; hash redirecionado no cliente. |
| `/faq` ou `/#faq` | `/duvidas-frequentes` | **Redirecionamento 301** (Vercel) + Fallback cliente | Nova rota canônica com URL amigável e semântica em português brasileiro. Contém as 8 perguntas agrupadas em 4 categorias claras. | Médio | 301 no `vercel.json` de `/faq` para `/duvidas-frequentes`. Sitemap atualizado apenas com a nova URL. |
| `/contato` ou `/#contato` | `/contato` | **Página própria** (deixa de rolar a home) | Página dedicada de contato com formulário completo, canais diretos (WhatsApp, e-mail, redes), bloco de próximos passos e 3 dúvidas frequentes em destaque. | Baixo | URL `/contato` preservada; hash redirecionado no cliente. |
| `/rota-inexistente` | `/404` | **Página de erro 404** (`NotFound.tsx`) | Página limpa com mensagem clara, meta tag `noindex` e links rápidos para Home, Serviços e Contato. | Baixo | Resposta controlada sem tela em branco. |

---

## 3. Mapeamento da Barra de Navegação (Header)

### Antes (8 links + botão):
1. Serviços (`#servicos`)
2. Como trabalhamos (`#como-trabalhamos`)
3. Diferenciais (`#diferenciais`)
4. Tecnologias (`#tecnologias`)
5. Setores (`#setores`)
6. Sobre (`#sobre`)
7. FAQ (`#faq`)
8. Contato (`#contato`)
- *Botão:* "Falar sobre meu projeto" (`#contato`)

### Depois (5 links + 1 botão de ação):
1. **Serviços** (`/servicos`)
2. **Como trabalhamos** (`/como-trabalhamos`)
3. **Experiência** (`/experiencia`)
4. **Engenharia** (`/engenharia`)
5. **Sobre** (`/sobre`)
- **Botão de Ação:** `"Falar sobre meu projeto"` (`/contato`)

> **Benefício de UX:** Redução de 37,5% no número de itens visíveis no header, eliminando atrito cognitivo em telas de desktop (1024px e 1280px) e evitando quebras de linha ou sobreposições.

---

## 4. Mapeamento do Rodapé (Footer)

### Coluna "Soluções" (4 links internos para rotas ou âncoras dedicadas):
- "Sistemas, portais e plataformas" → `/servicos#sistemas`
- "APIs e back-end escalável" → `/servicos#apis`
- "Integrações entre sistemas" → `/servicos#integracoes`
- "Modernização de legados" → `/servicos#modernizacao`

### Coluna "Navegação" (Links diretos para as páginas principais):
- "Serviços" → `/servicos`
- "Como trabalhamos" → `/como-trabalhamos`
- "Experiência" → `/experiencia`
- "Engenharia" → `/engenharia`
- "Sobre a empresa" → `/sobre`
- "Dúvidas frequentes" → `/duvidas-frequentes`
- "Falar sobre meu projeto" → `/contato`

### Coluna "Contato":
- E-mail institucional
- WhatsApp direto
- LinkedIn oficial
- GitHub oficial
- *Instagram:* configurado em `SITE_CONFIG` com flag booleana `enabled: false`, permanecendo oculto até confirmação da criação do perfil.

---

## 5. Regras Técnicas no `vercel.json` (301 Edge Redirects)

Para garantir indexação impecável e transferir autoridade de busca sem perda:

```json
{
  "redirects": [
    { "source": "/setores", "destination": "/experiencia", "permanent": true },
    { "source": "/autoridade", "destination": "/experiencia", "permanent": true },
    { "source": "/diferenciais", "destination": "/engenharia", "permanent": true },
    { "source": "/tecnologias", "destination": "/engenharia", "permanent": true },
    { "source": "/faq", "destination": "/duvidas-frequentes", "permanent": true }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 6. Tratamento de Hashes no Cliente (`RouteHashHandler`)

No cliente SPA, links antigos externos que apontem para `epmdevtech.com.br/#servicos` ou favoritos salvos não passam pelo servidor web Vercel com a parte do hash.  
Para garantir transição transparente:
- Criar utilitário de rota no componente raiz que avalia `window.location.hash` na carga inicial de `/`.
- Mapeamento direto de hashes legados:
  - `#servicos` → navega com replace para `/servicos`
  - `#como-trabalhamos` → navega com replace para `/como-trabalhamos`
  - `#diferenciais` → navega com replace para `/engenharia`
  - `#tecnologias` → navega com replace para `/engenharia#tecnologias`
  - `#setores` → navega com replace para `/experiencia#contextos`
  - `#sobre` → navega com replace para `/sobre`
  - `#faq` → navega com replace para `/duvidas-frequentes`
  - `#contato` → navega com replace para `/contato`
- Caso a rota já seja uma rota com hash legítimo (ex: `/engenharia#tecnologias`), rola suavemente até o elemento de destino respeitando a folga do header fixo.
