export interface ExperienceItem {
  organization: string;
  sector: string;
  context: string;
  via?: string;
  approved: boolean;
}

/**
 * Organizações e projetos em que a liderança técnica da EPM DevTech atuou profissionalmente, em outras empresas.
 * NÃO são clientes da EPM DevTech.
 * Apenas itens com approved: true são renderizados na interface.
 */
export const EXPERIENCES: ExperienceItem[] = [
  {
    organization: "CAPES",
    sector: "Educação superior",
    context: "Sistemas de gestão de programas e processos administrativos.",
    via: "Datainfo",
    approved: true,
  },
  {
    organization: "ONS",
    sector: "Setor elétrico",
    context: "Integrações e consolidação de dados regulatórios.",
    via: "AMcom",
    approved: true,
  },
  {
    organization: "Energia Pecém",
    sector: "Energia",
    context: "Rastreabilidade operacional e monitoramento de equipamentos em tempo real.",
    approved: true,
  },
  // Pendentes de confirmação do dono (mantidos com approved: false):
  {
    organization: "Governo do MT / SEDUC-MT",
    sector: "Educação básica e gestão pública",
    context: "Sistemas educacionais e portais de serviços públicos.",
    via: "Grupo Intellectus",
    approved: false,
  },
  {
    organization: "Grupo Paraíso",
    sector: "Varejo e distribuição",
    context: "Modernização de sistemas internos e fluxos de inventário.",
    approved: false,
  },
];

export const getApprovedExperiences = (): ExperienceItem[] => {
  return EXPERIENCES.filter((item) => item.approved);
};
