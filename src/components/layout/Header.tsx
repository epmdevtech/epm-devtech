import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];


const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    // passive: true informa ao browser que não usamos preventDefault(),
    // permitindo otimização do scroll sem esperar execução do JS
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();

    const targetId = href.replace(/.*#/, "");

    // Navega via React Router — atualiza a URL e dispara useLocation() em Index
    navigate(`/${targetId}`);

    // Aguarda a animação do menu fechar (300ms) para calcular e rolar corretamente
    setTimeout(() => {
      const elem = document.getElementById(targetId);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.scrollY - 80; // 80px de compensação do fixed header
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  }, [closeMobileMenu, navigate]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "py-3 glass border-b border-border/50"
          : "py-5 bg-transparent"
          }`}
      >
        <div className="container px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group min-w-0 shrink-0">
            <div className="min-w-0">
              <div className="font-bold text-lg leading-tight mb-0.5">
                <div className="bg-gray-900 dark:bg-transparent rounded-md px-2 py-0.5 transition-colors duration-300">
                  <img
                    src="/logo-emp-dev-tech.png"
                    alt="EPM DEVTECH"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <Typewriter text="Software House" speed={50} delay={200} cursor={false} />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4 min-w-[170px] justify-end">
          </div>

          <div className="flex items-center gap-2 md:hidden shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative z-[60] p-2 w-10 h-10 flex flex-col items-center justify-center gap-[6px] text-foreground transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 w-64 md:hidden glass border-l border-border/50 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full pt-6 px-6 pb-6 relative">
              <button
                onClick={closeMobileMenu}
                className="absolute top-4 right-4 p-2 w-10 h-10 flex items-center justify-center text-foreground hover:bg-white/10 rounded-full transition-colors outline-none focus:outline-none [-webkit-tap-highlight-color:transparent] z-50"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
              
              <nav className="flex flex-col gap-6 mt-14">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.3 }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative group text-lg font-mono font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-3 border-b border-white/5"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
