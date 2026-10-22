import faqData from "./faq.json";

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

export const FAQ_ITEMS: FAQItem[] = faqData;

export const getHighlightFAQs = (): FAQItem[] => {
  return FAQ_ITEMS.filter((item) => item.isHighlight);
};
