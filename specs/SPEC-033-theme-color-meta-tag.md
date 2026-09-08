# SPEC-033 — Inclusão Explícita da Meta Tag `theme-color` no `index.html`

| Campo         | Valor                                          |
|---------------|------------------------------------------------|
| **ID**        | SPEC-033                                       |
| **Título**    | Inclusão explícita da meta tag `theme-color`   |
| **Prioridade**| Média                                          |
| **Origem**    | VERIF-001 — Tarefa agendada 2026-09-08         |
| **Autor**     | Elessandro Prestes Macedo                      |
| **Status**    | ✅ Aprovada                        |
| **Data**      | 2026-09-08                                     |

---

## Contexto e Motivação

O `site.webmanifest` já define:
```json
"theme_color": "#10B981",
"background_color": "#121212"
```

No entanto, o `index.html` **não possui** a tag `<meta name="theme-color">` explícita no `<head>`.

### Por que isso importa?

O manifesto é lido pelo browser **apenas após o parse completo do HTML e download do arquivo `.webmanifest`**. Isso significa que:

1. **Na primeira visita** (antes do manifesto ser cacheado), a barra de navegação do Chrome/Android pode piscar com a cor padrão do sistema antes de aplicar a cor do manifesto.
2. A `<meta name="theme-color">` no `<head>` é lida **durante o parse HTML inicial**, garantindo que a cor correta seja aplicada no **frame 1** — sem flash.
3. O **Google Lighthouse** sinaliza ausência dessa tag como oportunidade de melhoria no relatório PWA.
4. Safari no iOS respeita `<meta name="apple-mobile-web-app-status-bar-style">` separadamente — pode ser adicionado em conjunto.

---

## Escopo

### O que será feito

Adicionar no `<head>` do `index.html` as seguintes tags:

```html
<!-- Theme Color: cor da barra de navegação no Chrome/Android (frame 1, antes do manifesto) -->
<meta name="theme-color" content="#10B981" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#10B981" media="(prefers-color-scheme: light)" />

<!-- iOS Safari: status bar style -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

**Justificativa das cores:**
- `#10B981` = verde primário EPM DEVTECH (mesmo valor do `theme_color` no manifesto)
- Aplicado igual em dark e light porque o site tem fundo escuro como padrão de design em ambos os modos
- `black-translucent` no iOS: status bar overlay sobre o conteúdo, consistente com o design dark

### O que NÃO será feito
- Nenhuma alteração em componentes React
- Nenhuma alteração no manifesto (já está correto)
- Nenhuma alteração de estilo ou layout

---

## Arquivos Afetados

| Arquivo       | Operação | Descrição                              |
|---------------|----------|----------------------------------------|
| `index.html`  | Editar   | Adicionar as 4 meta tags no `<head>`   |

---

## Critérios de Aceitação

- [ ] `<meta name="theme-color">` presente no `<head>` para dark e light mode
- [ ] `<meta name="apple-mobile-web-app-capable">` presente
- [ ] `<meta name="apple-mobile-web-app-status-bar-style">` presente
- [ ] `npm run build` sem erros
- [ ] Lighthouse PWA: sem alerta de `theme-color` ausente
- [ ] Nenhum teste unitário ou E2E afetado (mudança somente em HTML estático)

---

## Quality Gates

| Gate           | Critério                                    |
|----------------|---------------------------------------------|
| Build          | `npm run build` sem erros ou warnings novos |
| Testes         | `npm run test:coverage` — sem regressões    |
| Lint           | `npm run lint` — zero erros                 |

---

## Riscos

| Risco                               | Probabilidade | Impacto | Mitigação                          |
|-------------------------------------|---------------|---------|------------------------------------|
| Conflito visual em light mode       | Baixa         | Baixo   | Cor verde funciona bem em ambos    |
| Regressão em testes E2E             | Muito baixa   | Nulo    | Nenhum teste verifica meta tags    |

---

## Aprovação

| Papel          | Nome                        | Assinatura | Data       |
|----------------|-----------------------------|------------|------------|
| Product Owner  | Elessandro Prestes Macedo   | ✅ Aprovado | 2026-09-08 |

---

_SPEC gerada por Gemini/Antigravity em 2026-09-08 como parte da VERIF-001_
