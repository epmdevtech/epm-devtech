# Testing — Estratégia de Testes

## Ferramentas

| Ferramenta              | Papel                                |
|-------------------------|--------------------------------------|
| Vitest                  | Test runner principal                |
| React Testing Library   | Testes de componentes React          |
| @vitest/coverage-v8     | Cobertura de código                  |
| @testing-library/user-event | Simulação de interações do usuário |
| jsdom                   | Ambiente DOM virtual para testes     |

---

## Meta de Cobertura

**≥ 90%** nos componentes principais (sections/, layout/, pages/).

---

## Tipos de Teste

### Testes de Componente
- **O quê:** Renderização, props, estados, interações, acessibilidade
- **Onde:** `__tests__/ComponentName.test.tsx` ao lado do componente
- **Como:** `render()`, `screen`, `userEvent`, `fireEvent`

### Testes de Hook
- **O quê:** Lógica de estado, efeitos colaterais, retornos
- **Onde:** `src/hooks/__tests__/useHookName.test.ts`
- **Como:** `renderHook()` do @testing-library/react

### Testes de Utilidade
- **O quê:** Funções puras, formatadores, validadores
- **Onde:** `src/lib/__tests__/util.test.ts`
- **Como:** Assertions simples com `expect()`

---

## Estrutura de Arquivos

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   └── __tests__/
│   │       └── Hero.test.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── __tests__/
│   │       └── Header.test.tsx
├── pages/
│   ├── Index.tsx
│   └── __tests__/
│       └── Index.test.tsx
├── hooks/
│   └── __tests__/
└── test/
    ├── setup.ts     # configuração global (beforeAll, afterAll, mocks)
    └── example.test.ts
```

---

## Padrões de Escrita

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Hero';

describe('Hero', () => {
  it('deve renderizar o título principal', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('deve ser acessível via teclado', async () => {
    const user = userEvent.setup();
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /contato/i });
    await user.tab();
    expect(cta).toHaveFocus();
  });
});
```

---

## Comandos

| Comando                  | Descrição                                    |
|--------------------------|----------------------------------------------|
| `npm run test`           | Executa todos os testes uma vez              |
| `npm run test:watch`     | Modo watch (reexecuta ao salvar)             |
| `npm run test:coverage`  | Executa com relatório de cobertura           |

---

## O Que Sempre Testar

- [ ] Renderização sem erro
- [ ] Props obrigatórias e opcionais
- [ ] Estados iniciais e após interação
- [ ] Mensagens de erro/sucesso (ex: formulário de contato)
- [ ] Acessibilidade: `getByRole`, `getByLabelText`, `getByText`
- [ ] Dark/Light mode (se o componente muda visualmente)

---

## Evidências de QA

Após cada implementação:
1. Rodar `npm run test:coverage`
2. Copiar o relatório para `/reviews/QA-NNN.md`
3. Registrar: percentual de cobertura, testes passando, testes falhando
