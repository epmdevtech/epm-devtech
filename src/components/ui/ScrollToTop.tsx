import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { theme } = useTheme();

    // Verifica se estamos no modo escuro (Dark/Ocean) ou claro
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Exibe o botão quando descer a página em 400px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <style>{`
                @keyframes scroll-top-pulse {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                .scroll-top-glow {
                    animation: scroll-top-pulse 2s ease-in-out infinite;
                }
            `}</style>
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 group">
                    {/* Ring Glow Animation Background — CSS animation (off JS thread) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full blur-[8px] -z-10 scroll-top-glow"
                        style={{
                            background: isDark ? "hsla(218, 100%, 58%, 0.5)" : "hsla(222, 47%, 11%, 0.25)",
                            boxShadow: isDark ? "0 0 14px 4px hsla(218, 100%, 65%, 0.45)" : "none",
                        }}
                    />

                    <TooltipProvider>
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onClick={scrollToTop}
                                aria-label="Voltar ao topo"
                                className={`p-3.5 rounded-full text-foreground shadow-lg transition-all duration-300 backdrop-blur-md border border-border/50
                                    ${isDark
                                        ? "bg-background/80 hover:bg-primary hover:text-white hover:border-primary/50 hover:shadow-[0_0_20px_rgba(41,121,255,0.4)]"
                                        : "bg-white/90 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                                    }`}
                                style={{
                                    // Default border replicating the cursor ring border
                                    borderColor: isDark ? "hsla(218, 100%, 58%, 0.7)" : "hsla(222, 47%, 11%, 0.25)"
                                }}
                            >
                                <motion.div
                                    className="relative z-10"
                                    whileHover={{
                                        y: -4,
                                        transition: {
                                            duration: 0.3,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }
                                    }}
                                >
                                    <Rocket size={20} strokeWidth={2} className="transition-transform group-hover:-translate-y-1" />
                                </motion.div>
                            </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="font-mono text-xs tracking-widest uppercase mr-2 border-primary/20 bg-background/95 backdrop-blur-md">
                            <p>Voltar ao topo</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </div>
            )}
        </AnimatePresence>
        </>
    );
};

export default ScrollToTop;
