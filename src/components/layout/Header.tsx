import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#contato", label: "Contato" },
];


const Header = () => {
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

    // Aguarda a animação do menu fechar (300ms) para calcular e rolar corretamente  
    setTimeout(() => {
      const targetId = href.replace(/.*\#/, "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.scrollY - 80; // 80px de compensação do fixed header
        window.scrollTo({
          top,
          behavior: "smooth"
        });
      }
    }, 350);
  }, [closeMobileMenu]);

  return (
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
                className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contato"
              aria-label="Fale Comigo — ir para seção de contato"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "hsl(var(--foreground))",
                border: "1.5px solid hsl(var(--border))",
                background: "transparent",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{
                scale: 1.04,
                color: "#ffffff",
                background: "hsl(var(--primary))",
                borderColor: "hsl(var(--primary))",
                boxShadow: "0 4px 16px 0 hsl(var(--primary) / 0.35)",
              }}
              whileTap={{ scale: 0.95, boxShadow: "0 1px 6px 0 hsl(var(--primary) / 0.2)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.span
                animate={{
                  y: [0, -3, 0],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                style={{ display: "inline-flex", lineHeight: 0 }}
              >
                <MessageCircle size={16} strokeWidth={2.2} />
              </motion.span>
              Fale Comigo
            </motion.a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 text-foreground rounded-md hover:bg-white/10 transition-colors"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border/50 overflow-hidden"
          >
            <nav className="container px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-mono font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <motion.a
                href="#contato"
                onClick={(e: any) => handleNavClick(e, "#contato")}
                aria-label="Fale Comigo — ir para seção de contato"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "hsl(var(--foreground))",
                  border: "1.5px solid hsl(var(--border))",
                  background: "transparent",
                  textDecoration: "none",
                  marginTop: "1rem",
                  width: "100%",
                }}
                whileTap={{
                  scale: 0.95,
                  background: "hsl(var(--primary))",
                  borderColor: "hsl(var(--primary))",
                  color: "#ffffff",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.span
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  style={{ display: "inline-flex", lineHeight: 0 }}
                >
                  <MessageCircle size={16} strokeWidth={2.2} />
                </motion.span>
                Fale Comigo
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
