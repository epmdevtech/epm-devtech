import { useState, useEffect } from "react";

export function useIdle(delay = 2000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: number;

    const handleIdle = () => setIsIdle(true);

    if ("requestIdleCallback" in window) {
      // @ts-expect-error
      window.requestIdleCallback(() => {
        timeoutId = window.setTimeout(handleIdle, 500); // Wait a bit more even after idle
      });
    } else {
      timeoutId = window.setTimeout(handleIdle, delay);
    }

    // fallback for immediate interaction
    const handleInteraction = () => {
      setIsIdle(true);
    };

    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
    window.addEventListener("mousemove", handleInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [delay]);

  return isIdle;
}
