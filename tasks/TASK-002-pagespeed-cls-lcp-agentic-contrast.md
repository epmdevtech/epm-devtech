# TASK-002 — Eliminação de CLS no Hero, Otimização de Imagens, Contraste e Navegação Agêntica

| Campo              | Valor                       |
|--------------------|-----------------------------|
| **ID**             | TASK-002                    |
| **SPEC**           | SPEC-002                    |
| **Data de início** | 2026-08-28                  |
| **Agente**         | Gemini/Antigravity          |
| **Status**         | ✅ Concluída                 |

---

## Escopo da Implementação

1. `src/components/sections/Hero.tsx`: Eliminar CLS renderizando texto completo com transição suave Framer Motion e botão acessível.
2. `src/components/layout/Header.tsx`: Atualizar logo para WebP/PNG otimizado com `width={145}` e `height={49}`.
3. `src/components/sections/Footer.tsx`: Atualizar logo para WebP/PNG otimizado com `width={145}` e `height={49}`.
4. `src/index.css`: Ajustar `--primary` para tom azul com contraste $\ge 4.5:1$ em relação ao branco.
5. `src/components/sections/About.tsx`: Otimizar animação de label de estatísticas.
6. `public/llms.txt`: Atualizar com formato canônico contendo links Markdown.

---

## Checklist de Testes

- [x] Testes unitários executados com sucesso (`npm run test`)
- [x] Build de produção executado com sucesso (`npm run build`)
- [x] Verificação de acessibilidade e semântica
