import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  console.error("[Prerender] dist/index.html não encontrado. Execute o build antes.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");

const BASE_URL = "https://epmdevtech.com.br";

/** @type {Array<{ path: string, title: string, description: string, h1: string }>} */
const ROUTES = [
  {
    path: "servicos",
    title: "Serviços de Desenvolvimento de Software | EPM DevTech",
    description:
      "Sistemas web, portais, APIs escaláveis e modernização de legados. Engenharia sob medida com foco no problema do negócio e código sustentável.",
    h1: "Soluções sob medida para cada estágio da sua operação",
  },
  {
    path: "como-trabalhamos",
    title: "Como Trabalhamos | EPM DevTech",
    description:
      "Processo estruturado em 4 etapas: Entendemos, Definimos, Desenvolvemos e Evoluímos. Engenharia com previsibilidade e escopo bem alinhado.",
    h1: "Como trabalhamos",
  },
  {
    path: "experiencia",
    title: "Experiência em Projetos Reais | EPM DevTech",
    description:
      "Indicadores de escala, estabilidade de 99,9% uptime e experiência prática em indústria, varejo, educação e energia.",
    h1: "Experiência em projetos reais",
  },
  {
    path: "engenharia",
    title: "Engenharia e Tecnologias | EPM DevTech",
    description:
      "Pilares de engenharia sólida, práticas recomendadas e constelação de tecnologias orientadas a desempenho, manutenção e segurança.",
    h1: "Engenharia pensada para evoluir",
  },
  {
    path: "sobre",
    title: "Sobre a EPM DevTech | Engenharia de Software Corporativa",
    description:
      "Software house de engenharia de software sob medida para aplicações corporativas críticas, com atendimento 100% remoto em escala nacional.",
    h1: "Transformando desafios em soluções que funcionam",
  },
  {
    path: "contato",
    title: "Fale Sobre Seu Projeto | EPM DevTech",
    description:
      "Inicie seu projeto de software com a EPM DevTech. Retorno em até 24 horas úteis com avaliação técnica e diagnóstico preliminar.",
    h1: "Fale sobre seu projeto",
  },
  {
    path: "duvidas-frequentes",
    title: "Dúvidas Frequentes | EPM DevTech",
    description:
      "Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota.",
    h1: "Dúvidas frequentes",
  },
];

console.log("[Prerender] Gerando HTML estático pré-renderizado para rotas canônicas...");

for (const route of ROUTES) {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalUrl = `${BASE_URL}/${route.path}`;

  let routeHtml = baseHtml;

  // Substitui Title
  routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Substitui Description
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*name="description"[^>]*>/i,
    `<meta data-rh="true" name="description" content="${route.description}" />`
  );

  // Substitui Canonical
  routeHtml = routeHtml.replace(
    /<link\s+[^>]*rel="canonical"[^>]*>/i,
    `<link data-rh="true" rel="canonical" href="${canonicalUrl}" />`
  );

  // Substitui Open Graph
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*property="og:title"[^>]*>/i,
    `<meta data-rh="true" property="og:title" content="${route.title}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*property="og:description"[^>]*>/i,
    `<meta data-rh="true" property="og:description" content="${route.description}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*property="og:url"[^>]*>/i,
    `<meta data-rh="true" property="og:url" content="${canonicalUrl}" />`
  );

  // Substitui Twitter
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*name="twitter:title"[^>]*>/i,
    `<meta data-rh="true" name="twitter:title" content="${route.title}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta\s+[^>]*name="twitter:description"[^>]*>/i,
    `<meta data-rh="true" name="twitter:description" content="${route.description}" />`
  );

  // Injeta H1 semântico estático dentro do root para que scrapers e curl vejam o H1 imediatamente
  routeHtml = routeHtml.replace(
    /<div id="root"><\/div>/,
    `<div id="root"><header style="opacity:0;height:0;overflow:hidden" aria-hidden="true"><h1>${route.h1}</h1><p>${route.description}</p></header></div>`
  );

  const destFile = path.join(targetDir, "index.html");
  fs.writeFileSync(destFile, routeHtml, "utf-8");
  console.log(`  ✓ ${route.path}/index.html (${route.title})`);
}

console.log("[Prerender] Concluído com sucesso!");
