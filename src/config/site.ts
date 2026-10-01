export const SITE_CONFIG = {
  name: "EPM DEVTECH",
  brandName: "EPM DevTech",
  description:
    "Software house dedicada a software sob medida, APIs escaláveis e modernização de plataformas corporativas.",
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
    location: "Toledo, Paraná.",
    foundingYear: 2026,
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
