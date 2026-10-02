/**
 * architecture.ts
 *
 * Tecnologias centrais de engenharia e desenvolvimento de software da EPM DevTech.
 */

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export interface CoreTechnology {
  name: string;
  category: "frontend" | "backend" | "cloud";
  purpose: string;
  badge?: string;
  badgeVariant?: "amber" | "brand" | "default";
  accentClass?: string;
  sizeClass?: string;
  icon?: string;
}

export const CORE_TECHNOLOGIES: CoreTechnology[] = [
  {
    name: "React",
    category: "frontend",
    purpose:
      "Componentização declarativa, Single Page Applications de alto rendimento e ecossistema de interfaces reativas.",
    accentClass: "text-brand hover:text-brand/80",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/react/react-original.svg`,
  },
  {
    name: "TypeScript",
    category: "frontend",
    purpose:
      "Tipagem estática estrita em tempo de compilação, prevenindo erros em runtime e assegurando contratos previsíveis.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/typescript/typescript-original.svg`,
  },
  {
    name: "Node.js",
    category: "backend",
    purpose:
      "Runtime assíncrono e orientado a eventos para APIs escaláveis e microsserviços de alto throughput.",
    badge: "Core Runtime",
    badgeVariant: "brand",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/nodejs/nodejs-original.svg`,
  },
  {
    name: "AWS",
    category: "cloud",
    purpose:
      "Computação elástica distribuída, infraestrutura em nuvem resiliente, serverless e armazenamento seguro de alta disponibilidade.",
    badge: "Certificado",
    badgeVariant: "amber",
    accentClass: "text-amber-500 dark:text-amber-400 hover:text-amber-300",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  },
  {
    name: "Vue.js",
    category: "frontend",
    purpose:
      "Ecossistema progressivo e ágil com reatividade fina para portais e interfaces corporativas integradas.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/vuejs/vuejs-original.svg`,
  },
  {
    name: "PHP",
    category: "backend",
    purpose:
      "Back-end maduro e corporativo com tipagem estrita moderna e ecossistema estável para sistemas corporativos.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/php/php-original.svg`,
  },
  {
    name: "Laravel",
    category: "backend",
    purpose:
      "Framework robusto para desenvolvimento ágil de sistemas complexos com arquitetura limpa e alta manutenibilidade.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/laravel/laravel-original.svg`,
  },
  {
    name: "Angular",
    category: "frontend",
    purpose:
      "Framework corporativo opinado com injeção de dependências e modularidade para sistemas de grande escala.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/angular/angular-original.svg`,
  },
  {
    name: "Azure",
    category: "cloud",
    purpose:
      "Serviços corporativos de nuvem da Microsoft para hospedar e integrar arquiteturas híbridas e críticas.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/azure/azure-original.svg`,
  },
];
