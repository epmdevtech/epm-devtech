import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

/**
 * CursorOrb
 * —————————
 * Cursor personalizado composto por dois elementos:
 *   1. Dot    — ponto pequeno que segue o mouse 1:1 (sem atraso)
 *   2. Ring   — anel maior com spring delay para efeito fluído
 *
 * Dark mode : azul elétrico (--primary) com glow
 * Light mode: tinta escura sutil sem glow
 *
 * pointer-events: none em ambos — nunca bloqueia cliques.
 */
const CursorOrb = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    // Raw motion values (1:1 com o mouse — sem atraso)
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    // Spring values para o anel (atraso suave)
    const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
    const ringX = useSpring(rawX, springConfig);
    const ringY = useSpring(rawY, springConfig);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            setVisible(true);

            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button, [role='button'], input, textarea, select, label");
            setHovering(!!interactive);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
        };
    }, [rawX, rawY]);

    // Esconde em dispositivos touch
    if (window.matchMedia("(pointer: coarse)").matches) return null;

    const dotSize = clicking ? 4 : 6;
    const ringSize = hovering ? 44 : clicking ? 28 : 36;

    const dotColor = isDark ? "hsl(218 100% 58%)" : "hsl(222 84% 15%)";
    const ringColor = isDark ? "hsla(218, 100%, 58%, 0.35)" : "hsla(222, 47%, 11%, 0.18)";
    const ringBorder = isDark ? "hsla(218, 100%, 58%, 0.7)" : "hsla(222, 47%, 11%, 0.45)";
    const glowColor = isDark ? "0 0 14px 4px hsla(218, 100%, 65%, 0.45)" : "none";

    return (
        <>
            {/* Dot — segue 1:1 */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: rawX,
                    y: rawY,
                    width: dotSize,
                    height: dotSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: dotColor,
                    boxShadow: isDark ? `0 0 8px 2px hsla(218, 100%, 65%, 0.6)` : "none",
                    opacity: visible ? 1 : 0,
                    transition: "width 0.12s, height 0.12s, opacity 0.2s",
                }}
            />

            {/* Ring — segue com spring */}
            <motion.div
                ref={ringRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                    width: ringSize,
                    height: ringSize,
                    translateX: "-50%",
                    translateY: "-50%",
                    backgroundColor: hovering ? ringColor : "transparent",
                    border: `1.5px solid ${ringBorder}`,
                    boxShadow: isDark ? glowColor : "none",
                    opacity: visible ? 1 : 0,
                    transition: "width 0.18s, height 0.18s, background-color 0.18s, opacity 0.2s",
                    backdropFilter: hovering ? "blur(2px)" : "none",
                }}
            />
        </>
    );
};

export default CursorOrb;
