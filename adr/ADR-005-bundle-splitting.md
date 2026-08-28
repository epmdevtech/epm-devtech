# ADR-005 — Bundle Splitting Manual via Vite manualChunks

| Campo       | Valor                          |
|-------------|-------------------------------|
| **Status**  | ✅ Aceito                      |
| **Data**    | 2026-08-28                    |
| **Decisores**| Elessandro Prestes Macedo    |

## Contexto

O projeto possui dependências pesadas: Framer Motion (~100KB), Radix UI (múltiplos pacotes), React, React Router, EmailJS e TanStack Query. Sem splitting, o bundle principal ultrapassaria o limite de 600KB do Vite.

## Decisão

Configurar `manualChunks` no `rollupOptions` do `vite.config.ts` para separar dependências por grupo lógico:

| Chunk          | Dependências                                         |
|----------------|------------------------------------------------------|
| `framer-motion`| framer-motion, motion-dom, motion-utils              |
| `react`        | react, react-dom, scheduler                          |
| `router`       | react-router-dom                                     |
| `radix`        | @radix-ui/*, react-remove-scroll, @floating-ui/*    |
| `icons`        | lucide-react                                         |
| `emailjs`      | @emailjs/browser                                     |
| `tanstack`     | @tanstack/*                                          |

## Consequências

### Positivas
- Bundle principal < 600KB (sem warnings do Vite)
- Cache de chunks estáveis em produção (chunks com hash mudam apenas quando a dependência muda)
- Melhor performance de carregamento inicial

### Negativas
- Configuração manual requer manutenção ao adicionar novas dependências
- Mais arquivos de JS gerados (mais requests HTTP, mitigado por HTTP/2)

## Alternativas Consideradas
- **Splitting automático do Vite**: gera chunks imprevisíveis e pode ultrapassar o limite
- **Sem splitting**: bundle único enorme, performance ruim
