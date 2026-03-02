import { motion } from "framer-motion";

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
            <div className="bg-gray-900 dark:bg-transparent rounded-md px-2 py-0.5 transition-colors duration-300">
              <img src="/logo-emp-dev-tech.png" alt="EPM DEVTECH" className="h-8 object-contain" />
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground text-center"
          >
            © {currentYear} EPM DEVTECH. Todos os direitos reservados.
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
