import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">EPM DEVTECH</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground text-center"
          >
            © {currentYear} Elessandro Prestes Macedo Desenvolvimento de Software LTDA
          </motion.p>

          {/* Links */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-6"
          >
            <a 
              href="#sobre" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre
            </a>
            <a 
              href="#servicos" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </a>
            <a 
              href="#contato" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contato
            </a>
          </motion.nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
