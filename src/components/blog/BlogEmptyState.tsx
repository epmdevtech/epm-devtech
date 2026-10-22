import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const BlogEmptyState = () => (
  <div className="rounded-2xl border border-border-default bg-surface p-8 text-center sm:p-10">
    <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-bold tracking-[-0.025em] leading-[1.15] text-primary mb-3">
      Ainda não há artigos publicados
    </h2>
    <p className="mx-auto mb-6 max-w-[60ch] text-[clamp(0.95rem,1.1vw,1.05rem)] leading-[1.6] text-secondary">
      Estou preparando os primeiros conteúdos técnicos. Enquanto isso, fale sobre o seu projeto.
    </p>
    <Button
      asChild
      variant="chamfer"
      size="default"
      className="min-h-[44px] px-8 text-sm font-semibold uppercase tracking-[0.04em]"
    >
      <Link to="/contact">Fale sobre seu projeto</Link>
    </Button>
  </div>
);

export default BlogEmptyState;
