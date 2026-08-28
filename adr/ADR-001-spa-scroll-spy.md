# ADR-001 — React SPA com Scroll Spy + replaceState

| Campo       | Valor                          |
|-------------|-------------------------------|
| **Status**  | ✅ Aceito                      |
| **Data**    | 2026-08-28                    |
| **Decisores**| Elessandro Prestes Macedo    |

## Contexto

A EPM DEVTECH é uma landing page single-page com múltiplas seções (Hero, About, Services, Technologies, Differentials, Authority, Contact). O requisito era ter URLs amigáveis por seção (ex: `/servicos`, `/contato`) sem gerar páginas separadas — beneficiando SEO e UX de compartilhamento de links.

## Decisão

Utilizar **React Router DOM** com uma única rota dinâmica `/:section` que sempre renderiza o mesmo componente `<Index />`.

A navegação funciona em duas direções:

1. **Clique no menu** → `navigate('/secao')` → `useEffect` detecta mudança de `pathname` → scroll programático até `document.getElementById(section)`

2. **Scroll manual** → `IntersectionObserver` detecta a seção no centro da viewport (rootMargin `-40% 0px -40% 0px`) → `window.history.replaceState(null, '', '/secao')` atualiza a URL sem empilhar histórico

Uma flag `isProgrammaticScrollRef` bloqueia o scroll spy durante a rolagem programática (clique no menu), evitando loops.

## Consequências

### Positivas
- URLs semânticas por seção (amigáveis para SEO e compartilhamento)
- Sem empilhamento desnecessário no histórico do browser (botão Voltar preservado)
- Funciona para seções de qualquer altura (threshold: 0 + rootMargin)
- Sem dependência adicional (usa APIs nativas do browser)

### Negativas
- Lógica de scroll spy é não-trivial (requer cuidado com a flag de bloqueio)
- `replaceState` não é capturado pelo React Router — a URL e o estado do React podem divergir momentaneamente
- SEO dinâmico requer react-helmet-async sincronizado com `activeSection`

## Alternativas Consideradas

| Alternativa          | Por que não foi escolhida                              |
|----------------------|--------------------------------------------------------|
| Hash routing (`#secao`) | URLs feias, problemas de indexação SEO           |
| Páginas separadas    | Duplicação de código, perda do efeito single-page      |
| Scroll sem URL       | Perda de SEO por seção e de links compartilháveis      |
