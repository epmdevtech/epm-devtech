import { motion, Variants } from "framer-motion";
import { Linkedin, Instagram, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

// Using `Variants` type explicitly to satisfy Framer Motion's strict typing
const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const NAV_COLUMNS = [
  {
    title: "Soluções",
    links: [
      { label: "Sistemas Web", href: "#servicos" },
      { label: "APIs & Back-end", href: "#servicos" },
      { label: "Automação", href: "#servicos" },
      { label: "Consultoria", href: "#servicos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#sobre" },
      { label: "Diferenciais", href: "#diferenciais" },
      { label: "Tecnologias", href: "#tecnologias" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Fale Conosco", href: "#contato" },
      { label: "Orçamento", href: "#contato" },
      { label: "Suporte", href: "#contato" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        padding: "3px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)",
      }}
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
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              transition: "all 0.2s ease",
              background: isActive
                ? "rgba(255,255,255,0.1)"
                : "transparent",
              color: isActive
                ? "hsl(var(--foreground))"
                : "hsl(var(--muted-foreground))",
              boxShadow: isActive
                ? "0 1px 3px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)"
                : "none",
            }}
          >
            <Icon size={11} strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-8">
      <div className="container px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          className="flex flex-col gap-16"
        >
          {/* Main row: logo left, nav columns right */}
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Logo + tagline */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-xs">
              <motion.div
                className="flex items-center gap-2 w-fit cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
              >
                <motion.div
                  className="bg-gray-900 dark:bg-transparent rounded-md px-2 py-0.5 ring-0 hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                  whileHover={{ boxShadow: "0 0 16px 2px hsl(var(--primary) / 0.3)" }}
                >
                  <img
                    src="/logo-emp-dev-tech.png"
                    alt="EPM DEVTECH"
                    className="h-7 object-contain"
                  />
                </motion.div>
              </motion.div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Arquitetura de software robusta, APIs escaláveis e sistemas web
                de alta performance.
              </p>
            </motion.div>

            {/* Nav columns */}
            <div className="flex flex-wrap gap-12 lg:gap-20">
              {NAV_COLUMNS.map((col) => (
                <motion.div
                  key={col.title}
                  variants={itemVariants}
                  className="flex flex-col gap-3 min-w-[110px]"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary relative group w-fit flex items-center"
                        >
                          {link.label}
                          {/* factory.ai-style animated underline */}
                          <span className="absolute -bottom-px left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row: socials left, theme switcher center, copyright right */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-6 border-t border-border"
          >
            {/* Social links  */}
            <ul className="flex gap-1 flex-wrap">
              {SOCIAL_LINKS.map((s, i) => (
                <li key={s.label} className="inline-flex items-center">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visite nosso perfil no ${s.label}`}
                    className="font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-primary relative group flex items-center gap-1.5">
                    <s.icon className="w-3.5 h-3.5" />
                    {s.label}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                  {i < SOCIAL_LINKS.length - 1 && (
                    <span className="text-muted-foreground/40 ml-0.5">,</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Copyright */}
            <p className="font-mono text-xs text-muted-foreground">
              @EPM DEVTECH {currentYear}. Todos os direitos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
