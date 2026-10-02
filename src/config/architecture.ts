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
      "Interfaces web fluidas e modulares para plataformas corporativas com excelente experiência de uso.",
    accentClass: "text-brand hover:text-brand/80",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/react/react-original.svg`,
  },
  {
    name: "TypeScript",
    category: "frontend",
    purpose:
      "Evita falhas em tempo de execução e garante contratos de dados precisos entre o front-end e as APIs.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/typescript/typescript-original.svg`,
  },
  {
    name: "Node.js",
    category: "backend",
    purpose:
      "Processamento veloz de requisições e alta capacidade de escala para sustentar operações intensas.",
    badge: "Core Runtime",
    badgeVariant: "brand",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/nodejs/nodejs-original.svg`,
  },
  {
    name: "AWS",
    category: "cloud",
    purpose:
      "Hospedagem segura e infraestrutura em nuvem elástica, mantendo o sistema no ar mesmo em picos de tráfego.",
    sizeClass: "text-3xl sm:text-4xl md:text-5xl font-extrabold",
    icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  },
  {
    name: "Vue.js",
    category: "frontend",
    purpose:
      "Agilidade na construção de telas interativas e dashboards com integração suave a sistemas legados.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/vuejs/vuejs-original.svg`,
  },
  {
    name: "PHP",
    category: "backend",
    purpose:
      "Linguagem estável e amplamente consolidada para suporte e evolução de sistemas corporativos de missão crítica.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/php/php-original.svg`,
  },
  {
    name: "Laravel",
    category: "backend",
    purpose:
      "Estrutura moderna e organizada para acelerar o desenvolvimento de regras de negócio com facilidade de manutenção.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/laravel/laravel-original.svg`,
  },
  {
    name: "Angular",
    category: "frontend",
    purpose:
      "Plataforma padronizada para grandes portais corporativos que exigem separação rigorosa de módulos.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/angular/angular-original.svg`,
  },
  {
    name: "Azure",
    category: "cloud",
    purpose:
      "Soluções em nuvem da Microsoft para integração direta com ecossistemas corporativos e bancos relacionais.",
    sizeClass: "text-2xl sm:text-3xl md:text-4xl font-extrabold",
    icon: `${DI}/azure/azure-original.svg`,
  },
];
