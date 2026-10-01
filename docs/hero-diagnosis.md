# Diagnóstico do Hero Atual (Baseline Pré-Redesign)

> **Documento de Auditoria e Baseline de Engenharia e UX/UI**  
> Registrado em 2026-10-01 antes de qualquer modificação de código.

---

## 1. Componentes, Arquivos e Dependências Envolvidas

### Arquivos e Componentes Atuais do Hero:
- `src/components/sections/Hero.tsx` (Componente orquestrador do Hero)
- `src/components/sections/hero/HeroBadge.tsx` (Badge eyebrow com cápsula dupla e seta animada)
- `src/components/sections/hero/HeroArchitecture.tsx` (Console interativo de topologia distribuída com 4 nós e alternância de estado)
- `src/components/ui/lamp.tsx` (Componente de feixes de luz volumétrica cônicos e máscaras de gradiente linear)

### Dependências e Códigos Utilizados Somente pelo Hero Atual:
- `src/components/ui/lamp.tsx` é consumido **única e exclusivamente** pelo Hero atual.
- `src/components/sections/hero/HeroArchitecture.tsx` e `HeroBadge.tsx` são consumidos **somente** pelo Hero atual.
- Ícones Lucide consumidos apenas no Hero atual / arquitetura: `Globe`, `Cpu`, `Workflow`, `Database`, `ShieldCheck` (em `HeroArchitecture.tsx`), `Layers` (no botão secundário do `Hero.tsx`).
- Classes CSS legadas em `src/index.css`: `@keyframes hero-orbit`, `@keyframes hero-orbit-rev`, `.hero-orbit`, `.hero-brand-aura`.

---

## 2. Altura Renderizada e Ocupação de Viewport (Medições Reais com Playwright)

Medições automáticas coletadas via script E2E (`e2e/diagnose-hero-before.spec.ts` / `docs/hero-diagnosis-before.json`):

| Resolução / Viewport | Altura do Hero (`#hero`) | Altura da Viewport | Ocupação da Viewport (%) | Seção Serviços Visível Acima da Dobra? |
|---|---|---|---|---|
| **1440 × 900** (Desktop Grande) | **1234 px** | 900 px | **137.1%** | ❌ Não (Top de Serviços em 1234 px) |
| **1024 × 768** (Laptop / Tablet Land) | **1234 px** | 768 px | **160.7%** | ❌ Não (Top de Serviços em 1234 px) |
| **768 × 1024** (iPad Portrait) | **1045 px** | 1024 px | **102.0%** | ❌ Não (Top de Serviços em 1045 px) |
| **390 × 844** (iPhone 12/13/14) | **1043 px** | 844 px | **123.6%** | ❌ Não (Top de Serviços em 1043 px) |
| **320 × 640** (Mobile Pequeno) | **1127 px** | 640 px | **176.1%** | ❌ Não (Top de Serviços em 1127 px) |

> **Diagnóstico Crítico de UX:**  
> O Hero atual ultrapassa 100% da viewport em **todas** as resoluções (atingindo 1234px em desktop e 1127px em mobile pequeno). O usuário é obrigado a rolar mais de uma tela inteira apenas para visualizar o início do catálogo de Serviços.

---

## 3. Inventário de Animações do Hero Atual

| Elemento / Efeito | Mecanismo | Tipo / Duração | Impacto no LCP / Performance |
|---|---|---|---|
| Feixes cônicos da Lamp (`lamp.tsx`) | Framer Motion | Expansão de largura (`15rem` → `30rem`), `duration: 0.8s`, `ease: easeInOut` | Bloqueia paint inicial, recalcula máscaras |
| Emitter horizontal da Lamp | Framer Motion | Expansão de largura com glow, `duration: 0.8s` | Custoso em GPU/renderização |
| Eyebrow (`HeroBadge`) | Framer Motion | Fade-in + translateY (18px), `delay: 0.05s`, `duration: 0.5s` | Atraso visual |
| Headline H1 | Framer Motion | Fade-in + translateY (18px), `delay: 0.15s`, `duration: 0.5s` | **Retarda o LCP** em 650ms no paint |
| Subheadline `<p>` | Framer Motion | Fade-in + translateY (18px), `delay: 0.25s`, `duration: 0.5s` | Atraso de leitura |
| Botões CTAs | Framer Motion | Fade-in + translateY (18px), `delay: 0.35s`, `duration: 0.5s` | Atraso na affordance de clique |
| Microprova Social | Framer Motion | Fade-in + translateY (18px), `delay: 0.42s`, `duration: 0.5s` | Atraso |
| Console de Arquitetura | Framer Motion | Fade-in + translateY (18px), `delay: 0.50s`, `duration: 0.5s` | Retarda montagem |
| Alternância de Nós do Diagrama | React State | Interação de clique com re-renderização de painéis e lista | Custo de CPU em low-end mobile |
| Seta do Eyebrow (`ArrowRight`) | CSS Transition | TranslateX no hover (`duration-200`) | Microinteração |

---

## 4. Métricas e Custo de Performance (Baseline Lighthouse Pré-Mudanças)

Auditoria realizada via Lighthouse CLI oficial no servidor de preview local (`http://localhost:8071`):

### 4.1 Desktop
- **Performance:** **97 / 100**
- **Accessibility:** **97 / 100**
- **Best Practices:** **96 / 100**
- **SEO:** **100 / 100**
- **FCP (First Contentful Paint):** 0.8 s
- **LCP (Largest Contentful Paint):** 0.9 s
- **TBT (Total Blocking Time):** 90 ms
- **CLS (Cumulative Layout Shift):** 0.021
- **Speed Index:** 1.2 s

### 4.2 Mobile (Emulação Moto G4 / Slow 4G)
- **Performance:** **63 / 100**
- **Accessibility:** **97 / 100**
- **Best Practices:** **96 / 100**
- **SEO:** **100 / 100**
- **FCP:** 2.7 s
- **LCP:** **3.5 s** (Impactado diretamente pelas animações de entrada e renderização de gradientes no H1)
- **TBT:** **1,150 ms**
- **CLS:** 0.053
- **Speed Index:** 2.8 s

### 4.3 Custo em Bytes
- Chunk de entrada (`index-BfvNS-bk.js`): **72.33 kB** (gzip: 23.92 kB)
- CSS global (`index-BPOnz1rS.css`): **100.60 kB** (gzip: 16.68 kB)
- Chunks do Framer Motion: **127.04 kB** (gzip: 41.92 kB)

---

## 5. Textos do Diagrama de Arquitetura e Rastreamento de Resíduos

Textos levantados no componente `HeroArchitecture.tsx`:
- Camadas: `"01 / Borda"`, `"02 / Core"`, `"03 / Assincronia"`, `"04 / Nuvem"`
- Nomes dos nós: `"Client / Edge"`, `"Domain Services"`, `"Event Stream"`, `"Cloud & Data"`
- Papéis e legendas: `"Entrada & Segurança"`, `"Serviços de Domínio"`, `"Mensageria & Filas"`, `"Persistência & Resiliência"`, `"Baixa latência & proteção perimetral"`, `"Regras de negócio isoladas & resiliência operacional"`, `"Fluxos assíncronos & alta tolerância a falhas"`, `"Integridade transacional & persistência confiável"`
- Capacidades/chips: `"Edge Routing"`, `"Segurança TLS"`, `"Entrega otimizada"`, `"APIs Modulares"`, `"Clean Architecture"`, `"Alta Vazão"`, `"Filas Confiáveis"`, `"Workers Dedicados"`, `"Absorção de Picos"`, `"Redundância"`, `"Cache em Memória"`, `"Alta Disponibilidade"`
- Topbar: `"topologia://arquitetura-distribuida.epm"`, `"Topologia Resiliente"`

### Locais onde esses termos aparecem no projeto:
- `src/components/sections/hero/HeroArchitecture.tsx` (Componente a ser removido)
- `src/components/sections/__tests__/Hero.test.tsx` (Testes a serem atualizados)
- Nenhuma ocorrência detectada em metadados de SEO, OpenGraph, JSON-LD ou README.

---

## 6. Evidências Visuais da Baseline

Salvas em `docs/evidence/hero-before/`:
- `hero-1440x900-dark.png` e `hero-1440x900-light.png`
- `viewport-fold-1440x900-dark.png` e `viewport-fold-1440x900-light.png`
- `hero-1024x768-dark.png` e `hero-1024x768-light.png`
- `hero-768x1024-dark.png` e `hero-768x1024-light.png`
- `hero-390x844-dark.png` e `hero-390x844-light.png`
- `hero-320x640-dark.png` e `hero-320x640-light.png`
