# Knowledge Base — Stack Tecnológico

## Visão Geral

O projeto EPM DEVTECH é uma SPA (Single Page Application) construída com React 18 + TypeScript + Vite, estilizada com Tailwind CSS e shadcn/ui, com animações via Framer Motion.

---

## React 18

- Interface declarativa com componentes funcionais
- Hooks: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `lazy`, `Suspense`
- **Contextos usados:** ThemeProvider (next-themes), QueryClientProvider (TanStack), HelmetProvider

### Padrões
- Sempre function components (nunca class components)
- Lazy loading para seções não-críticas:
```tsx
const About = lazy(() => import('@/components/sections/About'));
```

---

## TypeScript

- Strict mode habilitado
- Aliases configurados em `tsconfig.app.json`: `@/` → `./src/`
- Sempre tipar props com interfaces:
```typescript
interface HeroProps {
  title?: string;
}
```

---

## Vite

- Dev server na porta `8070`
- HMR (Hot Module Replacement) habilitado
- Bundle splitting manual em `vite.config.ts`
- Alias `@/` configurado via `path.resolve`

---

## Tailwind CSS

- Configuração em `tailwind.config.ts`
- Dark mode: `class` (gerenciado pelo next-themes)
- Uso de `cn()` para classes condicionais:
```tsx
import { cn } from '@/lib/utils';
<div className={cn('base-class', isActive && 'active-class')} />
```

---

## shadcn/ui + Radix UI

- Componentes em `/src/components/ui/`
- Adicionar novo componente: `npx shadcn-ui add <component>`
- Componentes disponíveis: Button, Dialog, Input, Label, Toast, Tooltip, etc.

---

## Framer Motion

- Animações fluidas e baseadas em scroll
- Sempre verificar `prefers-reduced-motion`:
```tsx
import { useReducedMotion } from 'framer-motion';

const Component = () => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5 }}
    />
  );
};
```

---

## React Router DOM v6

- Rota principal: `/:section` → renderiza `<Index />`
- Navegação: `useNavigate()`, `useLocation()`
- Sem empilhar histórico: `window.history.replaceState()`

---

## EmailJS

Variáveis de ambiente necessárias (em `.env`):
```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Vitest

- Configuração em `vitest.config.ts`
- Ambiente: `jsdom`
- Setup global: `src/test/setup.ts`
- Coverage provider: `v8`
- Comandos:
  - `npm run test` — executa uma vez
  - `npm run test:watch` — modo watch
  - `npm run test:coverage` — com relatório de cobertura
