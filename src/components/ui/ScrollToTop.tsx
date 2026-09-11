import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    // Exibe o botão quando descer a página em mais de 450px
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 450) {
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
        <AnimatePresence>
            {isVisible && (
                <div
                    data-testid="scroll-to-top-container"
                    data-elevated={isFooterVisible}
                    className={`fixed right-6 md:right-8 z-50 transition-[bottom] duration-300 ease-out group ${
                        isFooterVisible ? "bottom-20 md:bottom-24" : "bottom-6 md:bottom-8"
                    }`}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    onClick={scrollToTop}
                                    aria-label="Voltar ao topo"
                                    className="p-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer flex items-center justify-center"
                                >
                                    <ChevronUp size={20} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5" />
                                </motion.button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="font-sans text-xs tracking-wider uppercase mb-2 border-zinc-200 dark:border-zinc-800 bg-background/95 text-zinc-600 dark:text-zinc-300">
                                <p>Voltar ao topo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
