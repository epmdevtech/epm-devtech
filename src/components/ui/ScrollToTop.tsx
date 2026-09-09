import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const { theme } = useTheme();

    // Verifica se estamos no modo escuro (Dark) ou claro
    const isDark = theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Exibe o botão quando descer a página em 400px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        toggleVisibility();
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Observa a visibilidade do footer para elevar o botão e evitar sobreposição de informações
    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkFooterPosition = () => {
            const footer = document.querySelector("footer");
            if (footer) {
                const rect = footer.getBoundingClientRect();
                // Em navegadores reais com layout, rect.bottom > 0 e rect.top < window.innerHeight
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setIsFooterVisible(true);
                    return true;
                } else if (rect.bottom > 0) {
                    setIsFooterVisible(false);
                    return false;
                }
            }
            return false;
        };

        let observer: IntersectionObserver | null = null;
        let isObserving = false;

        if (typeof IntersectionObserver !== "undefined") {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry) {
                        setIsFooterVisible(entry.isIntersecting);
                    }
                },
                { threshold: 0 }
            );
        }

        const tryObserve = () => {
            const footer = document.querySelector("footer");
            if (footer) {
                checkFooterPosition();
                if (observer && !isObserving) {
                    observer.observe(footer);
                    isObserving = true;
                }
            }
        };

        // 1. Tenta checar e observar imediatamente caso o footer já esteja no DOM
        tryObserve();

        // 2. Tenta checar e observar ao rolar (quando lazy render termina durante o scroll)
        const onScrollCheck = () => {
            tryObserve();
            checkFooterPosition();
        };
        window.addEventListener("scroll", onScrollCheck, { passive: true });

        // 3. Observa mutações do DOM para anexar assim que o elemento footer for montado pelo React
        let mutationObserver: MutationObserver | null = null;
        if (typeof MutationObserver !== "undefined" && document.body) {
            mutationObserver = new MutationObserver(() => {
                tryObserve();
                checkFooterPosition();
            });
            mutationObserver.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener("scroll", onScrollCheck);
            if (observer) {
                observer.disconnect();
            }
            if (mutationObserver) {
                mutationObserver.disconnect();
            }
        };
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
                <div
                    data-testid="scroll-to-top-container"
                    data-elevated={isFooterVisible}
                    className={`fixed right-6 md:right-8 z-50 transition-all duration-300 ease-out group ${
                        isFooterVisible ? "bottom-20 md:bottom-24" : "bottom-6 md:bottom-8"
                    }`}
                >
                    {/* Ring Glow Animation Background — CSS animation (off JS thread) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 rounded-full blur-[8px] -z-10 scroll-top-glow"
                        style={{
                            background: isDark ? "hsl(var(--primary) / 0.35)" : "hsl(var(--primary) / 0.2)",
                            boxShadow: isDark ? "0 0 14px 4px hsl(var(--primary) / 0.35)" : "none",
                        }}
                    />

                    <TooltipProvider>
                    <Tooltip delayDuration={200}>
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
                                className={`p-3.5 rounded-full text-foreground shadow-lg transition-all duration-300 backdrop-blur-md border
                                    ${isDark
                                        ? "bg-background/90 hover:bg-primary hover:text-white hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                                        : "bg-white/95 hover:bg-primary hover:text-white hover:border-primary/50 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.25)]"
                                    }`}
                                style={{
                                    borderColor: isDark ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))"
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
                        <TooltipContent side="top" className="font-mono text-xs tracking-widest uppercase mb-2 border-primary/20 bg-background/95 backdrop-blur-md">
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
