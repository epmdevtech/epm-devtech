import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timeout = setTimeout(() => setIsVisible(true), 3500);
            return () => clearTimeout(timeout);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[420px]"
                >
                    <div className="bg-background/90 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 pointer-events-auto relative overflow-hidden group w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <button
                            onClick={declineCookies}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1"
                            aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-full text-primary ring-1 ring-primary/20">
                                    <Cookie className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-lg tracking-tight text-foreground">
                                    Nós valorizamos sua privacidade
                                </h3>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed pr-6">
                                Utilizamos cookies para aprimorar sua experiência de navegação,
                                oferecer conteúdos personalizados e analisar nosso tráfego.
                                Ao clicar em "Aceitar todos", você concorda com o uso de cookies.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto flex-1 font-medium order-2 sm:order-1 border-border/60 hover:bg-muted/50"
                                    onClick={declineCookies}
                                >
                                    Recusar
                                </Button>
                                <Button
                                    variant="default"
                                    className="w-full sm:w-auto flex-1 font-medium order-1 sm:order-2 shadow-lg shadow-primary/20"
                                    onClick={acceptCookies}
                                >
                                    Aceitar todos
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
