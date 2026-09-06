# SPEC-015 — Refatoração da Seção Sobre: Autoridade Técnica, Copywriting e Métricas Reais

| Campo         | Valor                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Título**    | Refatoração da Seção Sobre: Autoridade Técnica, Copywriting e Métricas |
| **Autor**     | Gemini/Antigravity (Engenheiro Front-end Sênior & Especialista UI/UX) |
| **PO**        | Elessandro Prestes Macedo                                             |
| **Data**      | 2026-09-06                                                            |
| **Status**    | ✅ Aprovado pelo PO                                                   |
| **Versão**    | 1.0.0                                                                 |

---

## 1. Contexto e Motivação

A seção "Sobre a EPM DEVTECH" precisa transmitir a maturidade técnica real e o posicionamento de liderança em engenharia de software do fundador e Tech Lead Elessandro Prestes Macedo. 

O texto anterior possuía descrições genéricas e métricas simplórias (como "100% Comprometimento"), subutilizando o histórico de atuação em sistemas de missão crítica de alta disponibilidade (governo federal, indústria de manufatura, e-commerce e setor elétrico nacional).

Adicionalmente, o layout 3D flutuante dos 4 cards de setores à direita é um elemento visual forte e estabelecido no design system, devendo ter seu HTML, CSS e estrutura visual **rigorosamente preservados**, alterando-se apenas os textos internos dos cards para conexão com a nova narrativa de autoridade.

---

## 2. Requisitos e Restrições Inegociáveis

### 2.1 Restrição Inegociável de Layout
- O layout em grid de 2 colunas (`grid lg:grid-cols-2`), a estrutura das duplas de cards escalonados (`about-pairs-wrap`, `about-pair`), o design 3D de bloco flutuante (`about-card`, `about-card::before`, `about-card::after`), a sombra, a profundidade e as animações de hover **não devem sofrer nenhuma alteração estrutural**.
- Os containers e classes dos cards 01 (Indústria), 02 (Varejo), 03 (Educação) e 04 (Energia) devem ser mantidos intactos.

### 2.2 Tipografia e UI/UX (Linear e 100% Monocromático)
- **Título (H2)**: "Engenharia de software com excelência técnica comprovada"
  - 100% monocromático: `text-zinc-900` em Light Mode e `dark:text-white` em Dark Mode.
  - Linearidade estrita: `font-bold tracking-tight text-3xl sm:text-4xl leading-tight`.
  - Proibido uso de `<span>` colorido ou qualquer fragmentação bicolor.
- **Badge Superior**:
  - `SOBRE A EPM DEVTECH`
  - Contrato visual de badge `SectionHeader`: `px-3 py-1 mb-4 rounded-full uppercase tracking-wider font-semibold text-xs`.
- **Copywriting PT-BR**:
  - Proibido qualquer travessão longo (`—`) ou meia-risca (`–`). Pontuação natural com vírgulas, pontos finais e dois-pontos.

### 2.3 Narrativa da Coluna da Esquerda
- **Parágrafo 1**: "A EPM DEVTECH é uma software house fundada por Elessandro Prestes Macedo, engenheiro de software sênior e tech lead com mais de 9 anos de experiência na concepção e evolução de sistemas complexos."
- **Parágrafo 2**: "Nossa bagagem técnica foi construída na linha de frente de operações críticas, desenvolvendo arquiteturas escaláveis, microsserviços e modernizações de legado sem interrupção para grandes instituições e indústrias."
- **Parágrafo 3**: "Aliamos rigor de engenharia com testes automatizados, CI/CD e Spec-Driven Development (SDD) assistido por IA, garantindo máxima previsibilidade, alta disponibilidade e código sustentável para cada entrega."

### 2.4 Grid de Métricas Técnicas
- **Métrica 1**:
  - Valor: `+9`
  - Legenda: `ANOS DE EXPERIÊNCIA`
- **Métrica 2**:
  - Valor: `4`
  - Legenda: `SETORES CRÍTICOS` (com conexão direta aos 4 cards ao lado)
- **Métrica 3**:
  - Valor: `99,9%` (animado com suporte decimal e vírgula PT-BR)
  - Legenda: `UPTIME EM PRODUÇÃO`

### 2.5 Conteúdo dos Cards da Direita
- **Card 01 - Indústria**:
  - Título: `Indústria`
  - Handle: `MANUFATURA`
  - Descrição: `Sistemas robustos para automação de processos, IoT industrial e integração com ERP corporativo.`
- **Card 02 - Varejo**:
  - Título: `Varejo`
  - Handle: `E-COMMERCE`
  - Descrição: `Plataformas de e-commerce de alta conversão, gestão de estoque em tempo real e checkouts escaláveis.`
- **Card 03 - Educação**:
  - Título: `Educação`
  - Handle: `CAPES · MEC · GOVERNO FEDERAL`
  - Descrição: `Sistemas acadêmicos governamentais, modernização de legados e microsserviços de alto throughput para CAPES e MEC.`
- **Card 04 - Energia**:
  - Título: `Energia`
  - Handle: `ONS · ENERGIA PECÉM`
  - Descrição: `Projetos para o Operador Nacional do Sistema Elétrico (ONS) e Energia Pecém, desenvolvendo sistemas de monitoramento crítico em tempo real.`

---

## 3. Quality Gates
1. **Vitest:** Cobertura de testes $\ge 90\%$ e 100% de aprovação na suíte `About.test.tsx` e demais suítes.
2. **Playwright E2E:** 100% de aprovação (8/8 testes) incluindo validação de títulos monocromáticos e estabilidade visual.
3. **ESLint:** 0 erros e 0 warnings.
4. **Vite Build:** Compilação de produção sem alertas de chunks $> 600\text{ KB}$.
5. **Acessibilidade:** WCAG AA mantido em contraste e foco.
