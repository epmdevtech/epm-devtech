# ADR-002 — shadcn/ui como Biblioteca de Componentes

| Campo       | Valor                          |
|-------------|-------------------------------|
| **Status**  | ✅ Aceito                      |
| **Data**    | 2026-08-28                    |
| **Decisores**| Elessandro Prestes Macedo    |

## Contexto

O projeto precisava de uma biblioteca de componentes que fosse:
- Acessível por padrão (WCAG AA)
- Fortemente tipada com TypeScript
- Customizável ao nível do CSS sem conflitos com Tailwind
- Sem lock-in de estilos impostos pela biblioteca

## Decisão

Utilizar **shadcn/ui** como sistema de componentes. O shadcn/ui é uma coleção de componentes construída sobre **Radix UI** (primitivos acessíveis e headless) + **Tailwind CSS**.

Diferentemente de outras bibliotecas, o shadcn/ui **copia os componentes para o projeto** (`/src/components/ui/`), dando ownership total sobre o código.

## Consequências

### Positivas
- Componentes acessíveis por padrão (Radix UI garante WAI-ARIA)
- Zero conflito com Tailwind CSS (são construídos para funcionar juntos)
- Ownership total: componentes são do projeto, não de uma dependência
- Tipagem TypeScript nativa
- Sem CSS-in-JS: zero overhead de runtime

### Negativas
- Updates: novos componentes precisam ser adicionados manualmente (`npx shadcn-ui add`)
- Componentes copiados podem ficar desatualizados em relação ao shadcn upstream
- Tamanho do bundle pode crescer se muitos componentes forem adicionados sem uso

## Alternativas Consideradas

| Alternativa   | Por que não foi escolhida                                     |
|---------------|---------------------------------------------------------------|
| MUI           | CSS-in-JS com overhead de runtime, visual muito "material"    |
| Mantine       | Boa opção, mas sem integração nativa com Tailwind             |
| Chakra UI     | CSS-in-JS, overhead de runtime                                |
| Headless UI   | Menos componentes disponíveis que Radix                       |
