import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  id: string;
  minHeight?: string;
  children: React.ReactNode;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  id,
  minHeight = "400px",
  children,
  rootMargin = "400px 0px",
}) => {
  const isTest = typeof process !== "undefined" && process.env.NODE_ENV === "test";
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (isTest) return true;
    if (typeof window === "undefined") return false;
    const hash = window.location.hash.replace("#", "");
    const pathname = window.location.pathname.replace("/", "");
    return hash === id || pathname === id;
  });

  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    if (!placeholderRef.current || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    // Observer: loads 400px before reaching the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(placeholderRef.current);

    // Idle fallback: loads after 2.5s when main thread is idle
    let idleId: number | NodeJS.Timeout;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setShouldRender(true),
        { timeout: 3000 }
      );
    } else {
      idleId = setTimeout(() => setShouldRender(true), 2500);
    }

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined" && "cancelIdleCallback" in window && typeof idleId === "number") {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as NodeJS.Timeout);
      }
    };
  }, [id, rootMargin, shouldRender]);

  if (shouldRender) {
    return <>{children}</>;
  }

  return (
    <section
      id={id}
      ref={placeholderRef}
      style={{ minHeight }}
      className="w-full flex items-center justify-center"
      aria-hidden="true"
    />
  );
};

export default LazySection;
