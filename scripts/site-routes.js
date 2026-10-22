import { BLOG_INDEX, SITE_URL } from "./blog/config.js";

export const BASE_URL = SITE_URL;

/**
 * Fonte única dos metadados das rotas públicas.
 *
 * `prerender: false` mantém a rota fora do HTML pré-renderizado (home),
 * mas ela continua no sitemap.
 *
 * @typedef {Object} SiteRoute
 * @property {string} path
 * @property {string} title
 * @property {string} description
 * @property {string} h1
 * @property {boolean} [prerender]
 * @property {string} [changefreq]
 * @property {string} [priority]
 * @property {string} [lastmod] Data ISO real para artigos publicados
 */

/** @type {SiteRoute[]} */
export const SITE_ROUTES = [
  {
    path: "/",
    title: "EPM DevTech | Engenharia de Software Sob Medida para Empresas",
    description:
      "Desenvolvemos sistemas web, APIs e integrações sob medida para destravar a operação da sua empresa. Fale direto com a liderança técnica.",
    h1: "Engenharia de software para construir, integrar e evoluir sistemas.",
    prerender: false,
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/services",
    title: "Serviços de Desenvolvimento de Software | EPM DevTech",
    description:
      "Do diagnóstico técnico à sustentação: desenvolvemos sistemas web, APIs de alta concorrência e integrações de dados para resolver gargalos operacionais reais.",
    h1: "Soluções de software sob medida para destravar sua empresa",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/how-we-work",
    title: "Como Trabalhamos | EPM DevTech",
    description:
      "Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado.",
    h1: "Como trabalhamos",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/experience",
    title: "Experiência em Projetos Reais | EPM DevTech",
    description:
      "Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia.",
    h1: "Experiência em projetos reais",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/engineering",
    title: "Engenharia e Tecnologias | EPM DevTech",
    description:
      "Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança.",
    h1: "Engenharia pensada para evoluir",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/about",
    title: "Sobre a EPM DevTech | Engenharia de Software Corporativa",
    description:
      "Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional.",
    h1: "Transformando desafios em soluções que funcionam",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/contact",
    title: "Fale Sobre Seu Projeto | EPM DevTech",
    description:
      "Inicie seu projeto de software com a EPM DevTech. Entraremos em contato para entender o cenário técnico e agendar uma conversa.",
    h1: "Vamos conversar sobre como podemos apoiar você e seu projeto",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/faq",
    title: "Dúvidas Frequentes | EPM DevTech",
    description:
      "Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota.",
    h1: "Dúvidas frequentes",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    ...BLOG_INDEX,
  },
];

export const PRERENDER_ROUTES = SITE_ROUTES.filter((route) => route.prerender !== false);

export const SITEMAP_ROUTES = SITE_ROUTES;
