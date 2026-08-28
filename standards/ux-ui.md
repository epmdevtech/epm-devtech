# UX/UI — Processo e Critérios

## Princípios

| Princípio         | Descrição                                                    |
|-------------------|--------------------------------------------------------------|
| **Mobile First**  | Todo componente é desenhado para mobile antes de desktop     |
| **Dark First**    | Dark mode é o tema padrão; Light mode é suporte              |
| **Acessível**     | WCAG 2.1 AA em todos os componentes interativos              |
| **Consistente**   | Design system único: Tailwind + shadcn/ui + tokens definidos |

---

## Design System

### Tailwind CSS
- Configuração customizada em `tailwind.config.ts`
- Tokens de cor, espaçamento e tipografia centralizados
- Dark mode via classe (`class`) gerenciado pelo `next-themes`

### shadcn/ui + Radix UI
- Componentes acessíveis baseados em primitivos Radix UI
- Localizados em `/src/components/ui/`
- Para adicionar novos: `npx shadcn-ui add <component>`

### Tipografia
- Fonte principal: **Geist** (`geist` npm package)
- Hierarquia: h1 > h2 > h3 > body > small

### Animações
- Biblioteca: **Framer Motion**
- Sempre verificar `prefers-reduced-motion`:
```tsx
import { useReducedMotion } from 'framer-motion';
const shouldReduce = useReducedMotion();
```

---

## Fluxo de Aprovação de Interface

```
Ideia de interface
    ↓
Wireframe (sketch/figma/descrição textual)
    ↓
Aprovação do PO
    ↓
SPEC técnica e funcional (incluindo comportamento visual)
    ↓
Aprovação da SPEC
    ↓
Implementação
    ↓
Design Review
    ↓
Aprovação final
```

**Nenhuma interface nova é implementada sem aprovação do design.**

---

## Checklist de Design Review

- [ ] Responsivo: mobile (320px+), tablet (768px+), desktop (1024px+)
- [ ] Dark mode funcional e consistente
- [ ] Light mode funcional e consistente
- [ ] Animações respeitam `prefers-reduced-motion`
- [ ] Consistente com o design system existente (cores, tipografia, espaçamento)
- [ ] Componentes usam primitivos do shadcn/ui quando disponível
- [ ] Sem hardcode de cores fora dos tokens Tailwind
