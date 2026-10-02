export const SITE_CONFIG = {
  name: "EPM DEVTECH",
  brandName: "EPM DevTech",
  description:
    "Engenharia de software sob medida para empresas que precisam destravar operações, integrar sistemas e construir produtos digitais robustos.",
  url: "https://epmdevtech.com.br",
  email: "elessandro@epmdevtech.com.br",
  phone: {
    raw: "+5545999178290",
    formatted: "(45) 99917-8290",
    whatsappUrl: "https://wa.me/5545999178290",
  },
  links: {
    linkedin: "https://www.linkedin.com/company/112232713/",
    github: "https://github.com/epmdevtech",
  },
  company: {
    legalName: "Elessandro Prestes Macedo Desenvolvimento de Software LTDA",
    tradeName: "EPM DEVTECH",
    cnpj: "60.710.574/0001-85",
    location: "Atendimento remoto em todo o Brasil",
    foundingYear: 2026,
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
