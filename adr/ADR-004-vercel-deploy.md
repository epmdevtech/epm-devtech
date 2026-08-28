# ADR-004 — Vercel como Plataforma de Deploy

| Campo       | Valor                          |
|-------------|-------------------------------|
| **Status**  | ✅ Aceito                      |
| **Data**    | 2026-08-28                    |
| **Decisores**| Elessandro Prestes Macedo    |

## Contexto

O projeto é uma SPA React com Vite. Precisa de hospedagem com deploy automático via Git, suporte a CDN global, previews de PR e configuração mínima.

## Decisão

Utilizar a **Vercel** como plataforma de hospedagem e deploy contínuo.

Configurações:
- `vercel.json` na raiz com rewrites para SPA routing
- `@vercel/analytics` e `@vercel/speed-insights` integrados no App.tsx

## Consequências

### Positivas
- Deploy automático em cada push para a branch main
- Preview deployments para branches de feature
- CDN global com edge network
- HTTPS automático
- Integração nativa com Vite e React

### Negativas
- Dependência de fornecedor (vendor lock-in leve)
- Limites de uso no plano gratuito (suficientes para o projeto atual)

## Alternativas Consideradas
- **Netlify**: similar ao Vercel, menos integração com o ecossistema escolhido
- **GitHub Pages**: sem suporte nativo a SPA routing sem workarounds
- **AWS S3 + CloudFront**: complexidade operacional desnecessária para este porte
