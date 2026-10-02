import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { LegalLinks } from "@/components/legal/LegalModals";
import { SITE_CONFIG } from "@/config/site";

const SOLUTIONS_LINKS = [
  { label: "Sistemas, portais e plataformas", href: "/servicos" },
  { label: "APIs e back-end escalável", href: "/servicos" },
  { label: "Integrações entre sistemas", href: "/servicos" },
  { label: "Modernização de legados", href: "/servicos" },
];

const NAVIGATION_LINKS = [
  { label: "Serviços", href: "/servicos" },
  { label: "Como trabalhamos", href: "/como-trabalhamos" },
  { label: "Experiência", href: "/experiencia" },
  { label: "Engenharia", href: "/engenharia" },
  { label: "Sobre a empresa", href: "/sobre" },
  { label: "Dúvidas frequentes", href: "/duvidas-frequentes" },
  { label: "Falar sobre meu projeto", href: "/contato" },
];

const THEME_OPTIONS = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
] as const;

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Selecionar tema"
      className="inline-flex items-center gap-0.5 p-1 rounded-lg border border-border-default bg-surface/80 backdrop-blur-sm"
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(value)}
            title={`Tema ${label}`}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-surface-elevated text-primary shadow-sm font-semibold"
                : "text-muted hover:text-primary bg-transparent"
            }`}
          >
            <Icon size={12} strokeWidth={2} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <footer
      data-tone="anchor"
      className="bg-surface-anchor text-foreground pt-16 pb-10 transition-colors duration-200 border-t border-zinc-200 dark:border-zinc-800/80"
      ref={ref}
    >
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col"
        >
          {/* Grid de 4 Colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Coluna 1: Identidade e Posicionamento */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
                  aria-label="EPM DEVTECH — Início"
                >
                  {/* Logotipo Dark Mode */}
                  <img
                    src="/logo-emp-dev-tech-sm.webp"
                    alt="EPM DEVTECH"
                    width={145}
                    height={49}
                    className="h-7 w-auto object-contain hidden dark:block"
                  />
                  {/* Logotipo Light Mode */}
                  <img
                    src="/logo-epm-devtech-light-sm.webp"
                    alt="EPM DEVTECH"
                    width={145}
                    height={49}
                    className="h-7 w-auto object-contain block dark:hidden"
                  />
                </Link>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Engenharia de software sob medida, sistemas web e integrações corporativas.
              </p>

              {/* Localização */}
              <div className="flex items-center gap-2 text-xs text-muted">
                <MapPin className="w-4 h-4 text-brand shrink-0" />
                <span>{SITE_CONFIG.company.location}</span>
              </div>
            </div>

            {/* Coluna 2: Soluções */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                Soluções
              </h3>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {SOLUTIONS_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary hover:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Navegação */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-secondary hover:text-brand transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4: Contato Direto e Perfis Oficiais */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                Contato
              </h3>
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                {/* E-mail oficial */}
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="min-h-[44px] inline-flex items-center gap-2.5 text-sm text-secondary hover:text-brand transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    <Mail className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
                    <span className="truncate">{SITE_CONFIG.email}</span>
                  </a>
                </li>

                {/* WhatsApp */}
                <li>
                  <a
                    href={SITE_CONFIG.phone.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp da EPM DevTech (abre em nova aba)"
                    className="min-h-[44px] inline-flex items-center gap-2.5 text-sm text-secondary hover:text-brand transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    <Phone className="w-4 h-4 text-brand shrink-0" aria-hidden="true" />
                    <span>WhatsApp: {SITE_CONFIG.phone.formatted}</span>
                  </a>
                </li>

                {/* LinkedIn Oficial */}
                <li>
                  <a
                    href={SITE_CONFIG.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn da EPM DevTech (abre em nova aba)"
                    className="min-h-[44px] inline-flex items-center gap-2.5 text-sm text-secondary hover:text-brand transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    <svg
                      className="w-4 h-4 text-brand shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.85 6.4a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>

                {/* GitHub Oficial */}
                <li>
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub da EPM DevTech (abre em nova aba)"
                    className="min-h-[44px] inline-flex items-center gap-2.5 text-sm text-secondary hover:text-brand transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    <svg
                      className="w-4 h-4 text-brand shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Barra Inferior (Sub-footer) */}
          <div className="border-t border-border-subtle mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Lado Esquerdo: Copyright e CNPJ */}
            <p className="text-xs text-muted text-center md:text-left">
              © {currentYear} {SITE_CONFIG.name} &nbsp;·&nbsp; CNPJ {SITE_CONFIG.company.cnpj}. Todos os direitos reservados.
            </p>

            {/* Centro: Seletor de Tema */}
            <ThemeSwitcher />

            {/* Lado Direito: Termos de Uso e Política de Privacidade (com respiro para ScrollToTop) */}
            <div className="text-center md:text-right lg:pr-14">
              <LegalLinks className="justify-center md:justify-end" />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
