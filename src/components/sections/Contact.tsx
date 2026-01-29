import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/elessandro-prestes-macedo/",
      description: "Perfil profissional",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/ElessandroPrestes",
      description: "Projetos open-source",
    },
    {
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
          <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
        </svg>
      ),
      label: "GitLab",
      href: "https://gitlab.com/elessandrodev",
      description: "Projetos profissionais",
    },
  ];

  return (
    <section id="contato" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
      
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Vamos Construir{" "}
            <span className="text-gradient">Juntos</span>
          </h2>
          <p className="text-muted-foreground">
            Pronto para transformar sua ideia em realidade? Entre em contato para 
            discutirmos seu projeto.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {/* Main CTA */}
          <div className="text-center mb-12">
            <Button 
              size="lg"
              className="group bg-gradient-accent text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-glow px-10 py-7 text-lg font-semibold"
              asChild
            >
              <a href="mailto:elessandrodev@gmail.com">
                <Mail className="mr-3 w-5 h-5" />
                elessandrodev@gmail.com
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="grid sm:grid-cols-3 gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-card"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <span className="text-xs text-muted-foreground">{link.description}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
