/**
 * Fonte única de rotas canônicas do site (SPEC-106).
 *
 * Os slugs de URL são em inglês; o conteúdo visual permanece em português.
 * `LEGACY_REDIRECTS` lista todas as URLs antigas que devem apontar diretamente
 * (um único salto) para o destino final. A mesma lista é espelhada em `vercel.json`
 * como 301 permanente (validado por teste unitário).
 */
export const ROUTES = {
  home: "/",
  services: "/services",
  howWeWork: "/how-we-work",
  experience: "/experience",
  engineering: "/engineering",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Rotas legadas (slugs em português e aliases antigos) → destino canônico final. */
export const LEGACY_REDIRECTS: Readonly<Record<string, RoutePath>> = {
  "/servicos": ROUTES.services,
  "/como-trabalhamos": ROUTES.howWeWork,
  "/experiencia": ROUTES.experience,
  "/engenharia": ROUTES.engineering,
  "/sobre": ROUTES.about,
  "/contato": ROUTES.contact,
  "/duvidas-frequentes": ROUTES.faq,
  "/setores": ROUTES.experience,
  "/autoridade": ROUTES.experience,
  "/diferenciais": ROUTES.engineering,
  "/tecnologias": ROUTES.engineering,
};
