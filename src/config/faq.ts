export interface FAQItem {
  id: string;
  category: "contratacao" | "legados" | "processo" | "servicos";
  question: string;
  answer: string;
  isHighlight?: boolean;
}

export const CATEGORY_LABELS: Record<FAQItem["category"], string> = {
  contratacao: "Contratação",
  legados: "Sistemas",
  processo: "Processo",
  servicos: "Serviços",
};

export const FAQ_ITEMS: FAQItem[] = [
  // ── Categoria: Contratação ──────────────────────────────────────────
  {
    id: "especificacao-inicial",
    category: "contratacao",
    question: "Preciso ter o projeto totalmente especificado para iniciar o contato?",
    answer:
      "Não. Você não precisa ter documentação técnica pronta nem lista fechada de requisitos. Basta compartilhar conosco o contexto do seu negócio, o problema operacional que você enfrenta ou o objetivo que deseja atingir. Durante a conversa inicial, ajudamos a mapear o cenário e desenhar a abordagem técnica recomendada.",
    isHighlight: true,
  },
  {
    id: "primeiro-contato-retorno",
    category: "contratacao",
    question: "Como funciona o primeiro contato, o diagnóstico inicial e o tempo de retorno?",
    answer:
      "Nosso retorno ocorre em até 24 horas úteis após o envio da sua mensagem. Agendamos uma conversa inicial para entender seu contexto, avaliar o volume esperado, regras de negócio e integrações necessárias, apresentando uma visão transparente sobre viabilidade e opções de arquitetura sem compromisso.",
    isHighlight: true,
  },
  {
    id: "modelos-trabalho-orcamento",
    category: "contratacao",
    question: "Como é definido o orçamento e o modelo de trabalho?",
    answer:
      "Trabalhamos com dois modelos flexíveis, conforme a necessidade do projeto:\n• Escopo fechado: ideal para projetos com requisitos claros, oferecendo investimento fixo e cronograma planejado.\n• Alocação técnica dedicada: modalidade ágil de horas mensais, recomendada para modernização contínua, arquiteturas em evolução e demandas de alta complexidade.",
  },
  {
    id: "atendimento-remoto-regioes",
    category: "contratacao",
    question: "Como funciona o atendimento remoto da EPM DevTech para empresas de diferentes regiões?",
    answer:
      "Atuamos de forma 100% remota com empresas e operações em qualquer estado do país. Nosso modelo de trabalho se baseia em comunicação direta, alinhamentos periódicos e entregas incrementais em ambiente de homologação, garantindo proximidade e acompanhamento contínuo em cada etapa do projeto.",
  },

  // ── Categoria: Sistemas Existentes ──────────────────────────────────
  {
    id: "manutencao-sistemas-terceiros",
    category: "legados",
    question: "Vocês assumem, mantêm ou evoluem sistemas desenvolvidos por outra empresa?",
    answer:
      "Sim. Iniciamos com uma avaliação técnica na base de código existente para mapear arquitetura, gargalos de performance e dependências críticas. A partir desse diagnóstico, estabelecemos um plano para estabilização, otimização de desempenho, manutenção contínua ou evolução do sistema.",
  },
  {
    id: "modernizacao-legados-sem-parada",
    category: "legados",
    question: "É possível modernizar um sistema legado sem interromper a operação?",
    answer:
      "Sim. Trabalhamos com estratégias de migração gradual: novos módulos são desenvolvidos e colocados em produção progressivamente, com evolução incremental e menor risco de interrupção nas operações diárias da sua empresa.",
    isHighlight: true,
  },

  // ── Categoria: Processo & Engenharia ────────────────────────────────
  {
    id: "inicio-projeto-governanca",
    category: "processo",
    question: "Como funciona o início de um projeto?",
    answer:
      "Antes de desenvolver, registramos escopo, decisões e critérios de aceite em um documento de especificação, para que todos saibam exatamente o que será entregue. Durante toda a execução, você tem canal direto com a liderança técnica do projeto, com entregas incrementais validadas continuamente.",
  },

  // ── Categoria: Serviços ─────────────────────────────────────────────
  {
    id: "desenvolvimento-sites-institucionais",
    category: "servicos",
    question: "Vocês desenvolvem sites institucionais?",
    answer:
      "Sim. Desenvolvemos sites institucionais, portais corporativos e páginas de presença digital com foco em credibilidade, desempenho, acessibilidade e boa experiência em dispositivos móveis, inclusive integrando com sistemas internos ou APIs quando necessário.",
  },
];

export const getHighlightFAQs = (): FAQItem[] => {
  return FAQ_ITEMS.filter((item) => item.isHighlight);
};
