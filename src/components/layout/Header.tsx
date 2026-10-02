import { useState, useEffect, useCallback, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/como-trabalhamos", label: "Como trabalhamos" },
  { href: "/experiencia", label: "Experiência" },
  { href: "/engenharia", label: "Engenharia" },
  { href: "/sobre", label: "Sobre nós" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    // Devolve o foco ao botão de abertura do menu para WCAG 2.2 AA
    menuToggleRef.current?.focus();
  }, []);

  // Fechamento via teclado (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mounted ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "py-3 glass border-b border-border/50"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group min-w-0 shrink-0"
              aria-label="EPM DEVTECH — Início"
            >
              <div className="min-w-0">
                <div className="font-bold text-lg leading-tight mb-0.5">
                  <div className="rounded-md py-0.5 transition-colors duration-300">
                    {/* Dark mode logo */}
                    <img
                      src="/logo-emp-dev-tech-xs.webp"
                      srcSet="/logo-emp-dev-tech-xs.webp 149w, /logo-emp-dev-tech-sm.webp 300w"
                      sizes="(max-width: 640px) 83px, 95px"
                      alt="EPM DEVTECH"
                      width={149}
                      height={50}
                      loading="eager"
                      decoding="async"
                      {...{ fetchpriority: "high" }}
                      className="h-7 sm:h-8 w-auto object-contain hidden dark:block"
                    />
                    {/* Light mode logo */}
                    <img
                      src="/logo-epm-devtech-light-xs.webp"
                      srcSet="/logo-epm-devtech-light-xs.webp 149w, /logo-epm-devtech-light-sm.webp 300w"
                      sizes="(max-width: 640px) 83px, 95px"
                      alt=""
                      aria-hidden="true"
                      width={149}
                      height={50}
                      loading="eager"
                      decoding="async"
                      {...{ fetchpriority: "high" }}
                      className="h-7 sm:h-8 w-auto object-contain block dark:hidden"
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <Typewriter text="Software House" speed={50} delay={200} cursor={false} />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation (5 links enxutos) */}
            <nav
              aria-label="Navegação principal"
              className="hidden lg:flex items-center gap-5 xl:gap-8"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "text-xs xl:text-xs font-mono font-medium uppercase tracking-widest transition-colors relative group py-2",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-0.5 bg-brand transition-all",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA (1 botão de ação) */}
            <div className="hidden lg:flex items-center justify-end shrink-0">
              <Button
                asChild
                size="sm"
                className="bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-medium text-xs tracking-wide shadow-xs min-h-[44px] px-4 rounded-md transition-colors"
              >
                <Link to="/contato" aria-label="Fale conosco">
                  Fale conosco
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <button
                ref={menuToggleRef}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="relative z-[60] p-2 w-11 h-11 flex flex-col items-center justify-center gap-[6px] text-foreground transition-colors outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-md [-webkit-tap-highlight-color:transparent]"
                aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <span
                  className={`block w-5 h-0.5 bg-current transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed top-0 right-0 bottom-0 w-72 lg:hidden glass border-l border-border/50 shadow-2xl z-50 overflow-y-auto animate-slide-in-right"
        >
          <div className="flex flex-col h-full pt-6 px-6 pb-6 relative">
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 p-2 w-11 h-11 flex items-center justify-center text-foreground hover:bg-surface-elevated rounded-full transition-colors outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring z-50"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-2 mt-14" aria-label="Navegação móvel">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      "relative group text-base font-mono font-medium uppercase tracking-widest py-3 min-h-[44px] flex items-center border-b border-border/30 transition-colors opacity-0 animate-fade-in-up",
                      isActive
                        ? "text-brand font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                  style={{ animationDelay: `${50 + i * 40}ms`, animationFillMode: "forwards" }}
                >
                  <span className="relative z-10">{link.label}</span>
                </NavLink>
              ))}

              <div
                className="pt-6 opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${50 + navLinks.length * 40}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <Button
                  asChild
                  className="w-full bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active font-medium min-h-[44px] shadow-xs text-sm"
                >
                  <Link
                    to="/contato"
                    onClick={closeMobileMenu}
                    aria-label="Fale conosco"
                  >
                    Fale conosco
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
