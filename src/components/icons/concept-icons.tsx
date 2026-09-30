import React from "react";
import { IconProps } from "./types";

const defaultProps = {
  viewBox: "0 0 24 24",
  strokeWidth: "1.5",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/**
 * 01. Comunicação transparente
 * Conceito: Dois quadros de conversa sobrepostos com área compartilhada + nó de acento da marca.
 */
export const IconTransparentCommunication: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Balão 1 (traseiro) com preenchimento sutil */}
    <path
      d="M4 6.5C4 5.12 5.12 4 6.5 4h7C14.88 4 16 5.12 16 6.5v5c0 1.38-1.12 2.5-2.5 2.5H7.5L4 16.5v-10z"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Balão 2 (frontal) sobreposto */}
    <path
      d="M9.5 9h8c1.38 0 2.5 1.12 2.5 2.5v5c0 1.38-1.12 2.5-2.5 2.5H16.5L13 21.5v-2.5h-3.5c-1.38 0-2.5-1.12-2.5-2.5v-1"
      stroke="currentColor"
    />
    {/* Linha de contexto compartilhado */}
    <path d="M7.5 9.5h3" stroke="currentColor" strokeDasharray="1 2" />
    {/* Nó de acento EPM */}
    <circle cx="10" cy="11.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 02. Engenharia que facilita evoluir
 * Conceito: Blocos modulares empilhados, um deslocado para cima (evolução incremental) + nó.
 */
export const IconEvolutionaryEngineering: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Bloco base esquerdo */}
    <rect x="3.5" y="13.5" width="7" height="6.5" rx="1.5" stroke="currentColor" />
    {/* Bloco base direito */}
    <rect x="13.5" y="13.5" width="7" height="6.5" rx="1.5" stroke="currentColor" />
    {/* Bloco superior escalonado (evolução) */}
    <rect
      x="8.5"
      y="4"
      width="7"
      height="6.5"
      rx="1.5"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Conectores modulares */}
    <path d="M12 10.5v3M7 13.5v-1a2 2 0 0 1 2-2M17 13.5v-1a2 2 0 0 0-2-2" stroke="currentColor" />
    {/* Nó de acento no topo da evolução */}
    <circle cx="12" cy="7.25" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 03. Foco no problema do negócio
 * Conceito: Colchetes de engenharia enquadrando alvo central com precisão pragmática + nó.
 */
export const IconBusinessFocus: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Colchete esquerdo */}
    <path
      d="M7 4.5H4.5A1.5 1.5 0 0 0 3 6v12a1.5 1.5 0 0 0 1.5 1.5H7"
      stroke="currentColor"
    />
    {/* Colchete direito */}
    <path
      d="M17 4.5h2.5A1.5 1.5 0 0 1 21 6v12a1.5 1.5 0 0 1-1.5 1.5H17"
      stroke="currentColor"
    />
    {/* Alvo / mira de precisão central */}
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2" stroke="currentColor" />
    {/* Nó central da meta de negócio */}
    <circle cx="12" cy="12" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 04. Como trabalhamos: Entendemos
 * Conceito: Lente analítica sobre malha de diagnóstico + nó.
 */
export const IconProcessUnderstand: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Lente de análise */}
    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
    <path d="M15.5 15.5L20.5 20.5" stroke="currentColor" />
    {/* Malha de contexto interna */}
    <path d="M7.5 10.5h6M10.5 7.5v6" stroke="currentColor" strokeDasharray="1 1.5" />
    {/* Nó de diagnóstico */}
    <circle cx="10.5" cy="10.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 05. Como trabalhamos: Definimos
 * Conceito: Documento de especificação com linhas e marcador de aceite + nó.
 */
export const IconProcessDefine: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Folha de especificação */}
    <path
      d="M5 3.5h9l5 5V20a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 20V5A1.5 1.5 0 0 1 5 3.5z"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M14 3.5V8.5H19" stroke="currentColor" />
    {/* Linhas de escopo */}
    <path d="M7.5 13h9M7.5 16.5h6" stroke="currentColor" />
    {/* Marcador de especificação aprovada */}
    <circle cx="8" cy="8.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 06. Como trabalhamos: Desenvolvemos
 * Conceito: Colchetes de código com barras crescentes de entrega incremental + nó.
 */
export const IconProcessDevelop: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Colchetes de código */}
    <path d="M7 8L3.5 12 7 16" stroke="currentColor" />
    <path d="M17 8l3.5 4-3.5 4" stroke="currentColor" />
    {/* Barras de engenharia incremental */}
    <path d="M10 15v-3.5M14 15V8.5" stroke="currentColor" />
    {/* Nó no topo da entrega contínua */}
    <circle cx="14" cy="8.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 07. Como trabalhamos: Evoluímos
 * Conceito: Ciclo de evolução contínua em espiral ascendente + nó.
 */
export const IconProcessEvolve: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Ciclo/loop de sustentação */}
    <path
      d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9"
      stroke="currentColor"
    />
    <path d="M4 5v4h4" stroke="currentColor" />
    {/* Trajetória ascendente de crescimento */}
    <path
      d="M8.5 14.5c1.5-1 3-3.5 5.5-6"
      stroke="currentColor"
      strokeDasharray="1.5 2"
    />
    {/* Nó ascendente */}
    <circle cx="14" cy="8.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 08. Contato: Diagnóstico técnico
 * Conceito: Moldura de análise e monitoramento com linha de diagnóstico + nó.
 */
export const IconTechnicalDiagnostic: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Moldura de análise técnica */}
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
    <path d="M3 8.5h18" stroke="currentColor" />
    {/* Linha de pulso diagnóstico */}
    <path d="M6 14h2.5l1.8-4 2.4 7 1.8-3H18" stroke="currentColor" />
    {/* Nó indicador de viabilidade */}
    <circle cx="10.3" cy="10" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 09. Contato: Retorno em até 24 horas úteis
 * Conceito: Relógio de compromisso ágil com ponteiros precisos + nó.
 */
export const IconFastResponse: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Mostrador analógico */}
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 7.5V12l3 1.8" stroke="currentColor" />
    {/* Nó no ponteiro */}
    <circle cx="12" cy="12" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 10. Contato: Sigilo e confidencialidade
 * Conceito: Cadeado de proteção de dados e segredo de negócio + nó no miolo.
 */
export const IconConfidentiality: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Haste do cadeado */}
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" stroke="currentColor" />
    {/* Corpo seguro com preenchimento sutil */}
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
    {/* Canal da chave */}
    <path d="M12 14.5v2" stroke="currentColor" />
    {/* Nó no centro do segredo */}
    <circle cx="12" cy="13.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 11. Setores: Indústria
 * Conceito: Módulo de manufatura e automação industrial + nó.
 */
export const IconSectorIndustry: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Módulo fabril / engrenagem de precisão */}
    <path
      d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"
      stroke="currentColor"
    />
    <circle cx="12" cy="12" r="5" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
    {/* Nó no eixo fabril */}
    <circle cx="12" cy="12" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 12. Setores: Varejo
 * Conceito: Módulo transacional de e-commerce e logística + nó.
 */
export const IconSectorRetail: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Pacote geométrico / sacola transacional */}
    <path
      d="M4.5 7h15l-1.8 11.5a1.5 1.5 0 0 1-1.5 1.2H7.8a1.5 1.5 0 0 1-1.5-1.2L4.5 7z"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M9 7V5.2a3 3 0 0 1 6 0V7" stroke="currentColor" />
    <path d="M8 12h8" stroke="currentColor" strokeDasharray="1 2" />
    {/* Nó de fecho transacional */}
    <circle cx="12" cy="12" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 13. Setores: Educação
 * Conceito: Geometria de livro acadêmico / portal educacional + nó.
 */
export const IconSectorEducation: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Capelo / livro estruturado */}
    <path
      d="M12 4.5L21 9l-9 4.5L3 9l9-4.5z"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <path d="M6.5 11v4c0 2 2.5 3.5 5.5 3.5s5.5-1.5 5.5-3.5v-4M21 9v6" stroke="currentColor" />
    {/* Nó acadêmico */}
    <circle cx="12" cy="9" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 14. Setores: Energia
 * Conceito: Onda / pulso de telemetria energética crítica + nó.
 */
export const IconSectorEnergy: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Pulso e vetor de energia */}
    <path
      d="M13 2.5L5.5 13H12l-1 8.5 8-11h-6.5l1.5-8z"
      stroke="currentColor"
      fill="currentColor"
      fillOpacity="0.12"
    />
    {/* Nó no centro da carga */}
    <circle cx="12" cy="12.5" r="1.5" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);

/**
 * 15. Sobre: Liderança técnica
 * Conceito: Terminal de governança e arquitetura corporativa + nó.
 */
export const IconTechLeadership: React.FC<IconProps> = ({
  size = 24,
  className,
  title,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : "true"}
    focusable="false"
    {...defaultProps}
    {...props}
  >
    {title && <title>{title}</title>}
    {/* Moldura de console terminal */}
    <rect x="3.5" y="4" width="17" height="16" rx="2" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
    <path d="M3.5 8h17" stroke="currentColor" />
    {/* Prompt arquitetural */}
    <path d="M7 11.5l2.5 2-2.5 2M12.5 15.5h4" stroke="currentColor" />
    {/* Nó de status no cabeçalho do console */}
    <circle cx="6.5" cy="6" r="1.25" fill="hsl(var(--primary))" stroke="none" />
  </svg>
);
