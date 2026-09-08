import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Clock,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const SOLUTIONS_LINKS = [
  { label: "Desenvolvimento Web e SPAs", href: "#servicos" },
  { label: "APIs e Microsserviços", href: "#servicos" },
  { label: "Modernização de Legados", href: "#servicos" },
  { label: "Arquitetura de Software", href: "#servicos" },
  { label: "Consultoria Técnica e Code Review", href: "#servicos" },
];

const NAVIGATION_LINKS = [
  { label: "Sobre a Empresa", href: "#sobre" },
  { label: "Setores de Atuação", href: "#setores" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Dúvidas Frequentes", href: "#faq" },
  { label: "Fale Conosco", href: "#contato" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/ElessandroPrestes",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elessandro-prestes-macedo/",
    icon: Linkedin,
  },
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
      className="inline-flex items-center gap-0.5 p-1 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm"
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
                ? "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm font-semibold"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent"
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
      className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950 pt-16 pb-10"
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
                <a
                  href="#hero"
                  className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
                  aria-label="EPM DEVTECH - Início"
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
                </a>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Engenharia de software sob medida, arquitetura de sistemas críticos e modernização de plataformas corporativas.
              </p>

              {/* Localização */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Toledo, Paraná.</span>
              </div>

              {/* Redes Sociais */}
              <div className="flex items-center gap-2.5 pt-1">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Perfil da EPM DEVTECH no ${item.label}`}
                    className="p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-200"
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Coluna 2: Soluções */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
                Soluções
              </h3>
              <ul className="flex flex-col gap-2.5">
                {SOLUTIONS_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Navegação */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2.5">
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 4: Contato Direto */}
            <div className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
                Contato
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:elessandro@epmdevtech.com.br"
                  className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">elessandro@epmdevtech.com.br</span>
                </a>

                <a
                  href="https://wa.me/5545999178290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp: (45) 99917-8290</span>
                </a>

                <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
                  <span>Retorno técnico em até 24 horas úteis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Barra Inferior (Sub-footer) */}
          <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Lado Esquerdo: Copyright */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center md:text-left">
              © {currentYear} EPM DEVTECH. Todos os direitos reservados.
            </p>

            {/* Centro: Seletor de Tema */}
            <ThemeSwitcher />

            {/* Lado Direito: Frase de Valor (com respiro para ScrollToTop) */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center md:text-right lg:pr-14">
              Código limpo, arquitetura sólida e alta disponibilidade.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
