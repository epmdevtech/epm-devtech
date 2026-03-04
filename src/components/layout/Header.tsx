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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div>
              <div className="font-bold text-lg leading-tight mb-0.5">
                <div className="bg-gray-900 dark:bg-transparent rounded-md px-2 py-0.5 transition-colors duration-300">
                  <img
                    src="/logo-emp-dev-tech.png"
                    alt="EPM DEVTECH"
                    className="h-8 object-contain"
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
                color: "inherit",
                border: "1.5px solid rgba(255,255,255,0.18)",
                background: "transparent",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{
                scale: 1.03,
                color: "#ffffff",
                boxShadow: "0 0 20px 3px rgba(168,85,247,0.35)",
                background: "linear-gradient(135deg, #2979FF 0%, #A855F7 50%, #0EA5E9 100%)",
                borderColor: "transparent",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 160, damping: 24 }}
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
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 text-foreground"
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
                  onClick={closeMobileMenu}
                  className="text-sm font-mono font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <motion.a
                href="#contato"
                onClick={closeMobileMenu}
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
                  color: "inherit",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  background: "transparent",
                  textDecoration: "none",
                  marginTop: "1rem",
                  width: "100%",
                }}
                whileTap={{
                  scale: 0.97,
                  background: "linear-gradient(135deg, #2979FF 0%, #A855F7 50%, #0EA5E9 100%)",
                  borderColor: "transparent",
                  color: "#ffffff",
                }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
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
