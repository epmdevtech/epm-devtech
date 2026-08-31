import { ReactNode } from "react";
import { useIdle } from "@/hooks/use-idle";

interface LazyRenderProps {
  children: ReactNode;
  delay?: number;
}

export function LazyRender({ children, delay = 2000 }: LazyRenderProps) {
  const isIdle = useIdle(delay);

  if (!isIdle) return null;

  return <>{children}</>;
}
