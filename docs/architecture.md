# Arquitetura — EPM DEVTECH

## Tipo de Aplicação

**Single Page Application (SPA)** construída com React 18 + Vite.

---

## Fluxo de Dados

```
Usuário acessa URL
    ↓
Vercel (CDN global) serve os arquivos estáticos
    ↓
React App inicializa (main.tsx)
    ↓
App.tsx monta os Providers:
  HelmetProvider → QueryClientProvider → ThemeProvider → TooltipProvider
    ↓
BrowserRouter → Routes
    ↓
  "/" ou "/:section" → <Index />
  "/*" → <NotFound />
    ↓
Index.tsx:
  - Lê pathname via useLocation()
  - Rola até a seção via scroll programático
  - Monta SEO meta tags via react-helmet-async
  - Renderiza Header (imediato) + Hero (imediato)
  - Renderiza demais seções via React.lazy + Suspense
```

---

## Providers (App.tsx)

| Provider             | Biblioteca           | Papel                                    |
|----------------------|----------------------|------------------------------------------|
| `HelmetProvider`     | react-helmet-async   | Gerencia `<head>` para SEO dinâmico      |
| `QueryClientProvider`| @tanstack/react-query| Gerencia estado assíncrono               |
| `ThemeProvider`      | next-themes          | Dark/Light mode com CSS class            |
| `TooltipProvider`    | @radix-ui/tooltip    | Contexto global para tooltips            |
| `BrowserRouter`      | react-router-dom     | Roteamento client-side                   |

---

## Code Splitting

### Carregamento Imediato (Above the Fold)
- `<Header />` — navegação, crítica para UX
- `<Hero />` — primeira seção visível (LCP)

### Lazy Loading (Below the Fold)
```tsx
const About        = lazy(() => import('@/components/sections/About'));
const Services     = lazy(() => import('@/components/sections/Services'));
const Technologies = lazy(() => import('@/components/sections/Technologies'));
const Differentials= lazy(() => import('@/components/sections/Differentials'));
const Authority    = lazy(() => import('@/components/sections/Authority'));
const Contact      = lazy(() => import('@/components/sections/Contact'));
const Footer       = lazy(() => import('@/components/sections/Footer'));
const CursorOrb    = lazy(() => import('@/components/CursorOrb'));
const ScrollToTop  = lazy(() => import('@/components/ui/ScrollToTop'));
```

### Chunks do Bundle (vite.config.ts)
```
framer-motion → framer-motion, motion-dom, motion-utils
react         → react, react-dom, scheduler
router        → react-router-dom
radix         → @radix-ui/*, @floating-ui/*
icons         → lucide-react
emailjs       → @emailjs/browser
tanstack      → @tanstack/*
```

---

## Roteamento e Scroll Spy

### Rota única com seção dinâmica
```
/ → Hero (activeSection = "")
/sobre → rola para #sobre
/servicos → rola para #servicos
/tecnologias → rola para #tecnologias
/diferenciais → rola para #diferenciais
/contato → rola para #contato
/* → NotFound (404)
```

### IntersectionObserver (Scroll Spy)
- `rootMargin: "-40% 0px -40% 0px"` — zona de detecção central
- `threshold: 0` — qualquer pixel na zona dispara
- `replaceState` — atualiza URL sem empilhar histórico
- Flag `isProgrammaticScrollRef` — bloqueia spy durante scroll programático

---

## SEO Dinâmico

```tsx
const SEO_META: Record<string, SeoMeta> = {
  "":            { title: "EPM DEVTECH | Software House...", description: "..." },
  "sobre":       { title: "Sobre | EPM DEVTECH", description: "..." },
  "servicos":    { title: "Serviços | EPM DEVTECH", description: "..." },
  "tecnologias": { title: "Tecnologias | EPM DEVTECH", description: "..." },
  "diferenciais":{ title: "Diferenciais | EPM DEVTECH", description: "..." },
  "contato":     { title: "Contato | EPM DEVTECH", description: "..." },
};
```

---

## Estrutura de Componentes

```
App.tsx
└── Index.tsx (página principal)
    ├── Header.tsx          → navegação
    ├── Hero.tsx            → seção hero
    ├── About.tsx           → sobre a EPM DEVTECH
    ├── Services.tsx        → serviços oferecidos
    ├── Technologies.tsx    → stack tecnológico
    ├── Differentials.tsx   → diferenciais competitivos
    ├── Authority.tsx       → casos e autoridade
    ├── Contact.tsx         → formulário EmailJS
    ├── Footer.tsx          → rodapé
    ├── CursorOrb.tsx       → efeito visual de cursor
    └── ScrollToTop.tsx     → botão de voltar ao topo
```
