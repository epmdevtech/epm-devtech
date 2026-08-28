# Knowledge Base — Convenções do Projeto

## Nomenclatura

| Tipo                  | Convenção     | Exemplo                        |
|-----------------------|---------------|--------------------------------|
| Componentes React     | PascalCase    | `HeroSection`, `ContactForm`   |
| Arquivos de componente| PascalCase    | `Hero.tsx`, `Header.tsx`       |
| Hooks customizados    | camelCase + `use` | `useScrollSpy`, `useTheme` |
| Arquivos de hook      | camelCase     | `useScrollSpy.ts`              |
| Utilitários           | camelCase     | `formatDate.ts`                |
| Arquivos de teste     | `.test.tsx/ts`| `Hero.test.tsx`                |
| Variáveis/constantes  | camelCase     | `activeSection`, `BASE_URL`    |
| Constantes globais    | UPPER_SNAKE   | `SEO_META`, `BASE_URL`         |
| Interfaces TypeScript | PascalCase + `Props`/`Config` | `HeroProps`, `SeoMeta` |

---

## Estrutura de Imports

Ordem recomendada:
```tsx
// 1. React e hooks do React
import { useState, useEffect } from 'react';

// 2. Bibliotecas externas
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// 3. Componentes internos (usando alias @/)
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

// 4. Hooks internos
import { useScrollSpy } from '@/hooks/useScrollSpy';

// 5. Utilitários e lib
import { cn } from '@/lib/utils';

// 6. Tipos e interfaces
import type { SeoMeta } from '@/types';
```

---

## Estrutura de Componente

```tsx
// Imports

interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
}

const ComponentName = ({ requiredProp, optionalProp = 0 }: ComponentNameProps) => {
  // Hooks (useState, useEffect, etc.)
  // Handlers
  // Render
  return (
    <section id="section-id" aria-labelledby="section-title">
      <h2 id="section-title">{requiredProp}</h2>
    </section>
  );
};

export default ComponentName;
```

---

## Estrutura de Teste

```
src/components/sections/
├── Hero.tsx
└── __tests__/
    └── Hero.test.tsx
```

```tsx
// Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero', () => {
  it('deve renderizar o título', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

---

## Commits Convencionais

| Prefixo    | Uso                                         |
|------------|---------------------------------------------|
| `feat:`    | Nova funcionalidade                         |
| `fix:`     | Correção de bug                             |
| `docs:`    | Atualização de documentação                 |
| `refactor:`| Refatoração sem mudança de comportamento    |
| `test:`    | Adição ou atualização de testes             |
| `chore:`   | Manutenção (configs, deps, CI)              |
| `style:`   | Formatação, espaçamento (sem lógica)        |

Exemplos:
```
feat: adicionar seção de cases de sucesso
fix: corrigir scroll spy na seção authority
docs: atualizar PROJECT.md com estado atual
test: adicionar testes do componente Contact
```

---

## CSS com Tailwind

```tsx
// ✅ Correto: usar cn() para condicionais
<div className={cn(
  'base-class flex items-center',
  isActive && 'text-primary',
  size === 'lg' && 'text-xl'
)} />

// ❌ Evitar: classes inline
<div style={{ color: 'blue' }} />

// ❌ Evitar: concatenação de string
<div className={'base ' + (isActive ? 'active' : '')} />
```

---

## Acessibilidade — Regras Rápidas

- `<img>` sempre com `alt` (descritivo ou `""` se decorativo)
- Botões de ícone: `aria-label="Descrição da ação"`
- `<section>` com `aria-labelledby="id-do-titulo"`
- Links externos: `target="_blank" rel="noopener noreferrer"`
- Usar queries semânticas nos testes: `getByRole`, `getByLabelText`
