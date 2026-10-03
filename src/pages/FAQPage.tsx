import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FAQ_ITEMS, CATEGORY_LABELS, FAQItem } from "@/config/faq";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

const BASE_URL = SITE_CONFIG.url;

const CATEGORY_COLORS: Record<FAQItem["category"], string> = {
  contratacao:
    "bg-brand-subtle text-text-brand border-brand/20",
  legados:
    "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  processo:
    "bg-accent-violet/10 text-accent-violet border-accent-violet/20",
  servicos:
    "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
};

type FilterCategory = "todas" | FAQItem["category"];

export const FAQPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("todas");

  const filteredItems =
    selectedCategory === "todas"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Dúvidas Frequentes | EPM DevTech</title>
        <meta
          name="description"
          content="Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota."
        />
        <link rel="canonical" href={`${BASE_URL}/duvidas-frequentes`} />
        <meta property="og:title" content="Dúvidas Frequentes | EPM DevTech" />
        <meta
          property="og:description"
          content="Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota."
        />
        <meta property="og:url" content={`${BASE_URL}/duvidas-frequentes`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dúvidas Frequentes | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Respostas claras sobre início de projetos, modelos contratuais, modernização de sistemas legados e atuação técnica remota."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Header (Tom: Anchor) */}
        <PageHeader
          eyebrow="FAQ"
          title="Dúvidas frequentes"
          description="Respostas claras e diretas sobre como iniciar um projeto, modelos de trabalho, modernização de legados e atuação técnica remota."
        />

        {/* Acordeão de Dúvidas (Tom: Base) */}
        <SectionWrapper tone="base" containerClassName="max-w-4xl mx-auto">
          {/* Filtros por Categoria */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory("todas")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                selectedCategory === "todas"
                  ? "bg-brand text-on-brand font-semibold shadow-xs"
                  : "bg-surface-elevated text-secondary hover:text-primary border border-border-subtle"
              )}
            >
              Todas as dúvidas ({FAQ_ITEMS.length})
            </button>
            {(["contratacao", "legados", "processo", "servicos"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                  selectedCategory === cat
                    ? "bg-brand text-on-brand font-semibold shadow-xs"
                    : "bg-surface-elevated text-secondary hover:text-primary border border-border-subtle"
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Acordeão de Perguntas */}
          <Accordion type="single" collapsible className="space-y-3">
            {filteredItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border-default rounded-xl overflow-hidden bg-surface shadow-xs transition-colors hover:border-brand/40 data-[state=open]:border-brand/50"
              >
                <AccordionTrigger className="px-5 py-4 text-left hover:no-underline group">
                  <div className="flex items-start gap-3 w-full">
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[0.6rem] font-bold uppercase tracking-wider border shadow-xs",
                        CATEGORY_COLORS[item.category]
                      )}
                    >
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <span className="text-sm font-semibold text-primary leading-snug group-data-[state=open]:text-text-brand transition-colors">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5">
                  <div className="mt-1 space-y-2 text-secondary">
                    {item.answer.split("\n").map((line, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-sm leading-relaxed",
                          line.startsWith("•") ? "pl-3 font-mono text-xs sm:text-sm text-primary/80" : ""
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionWrapper>

        {/* Chamada Final (Tom: Alt) */}
        <SectionWrapper tone="alt">
          <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-2xl border border-border-default bg-surface text-center">
            <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] font-bold tracking-[-0.025em] leading-[1.15] text-primary mb-3">
              Não encontrou a resposta para o seu cenário?
            </h2>
            <p className="text-[clamp(0.95rem,1.1vw,1.05rem)] text-secondary max-w-[65ch] mx-auto mb-6 leading-[1.6]">
              Envie sua dúvida ou descreva o desafio da sua empresa. Retornamos em até 24 horas úteis com uma avaliação técnica preliminar.
            </p>
            <MagneticButton
              to="/contato"
              variant="primary"
              onClick={() => navigate("/contato")}
              aria-label="Falar sobre meu projeto"
              className="min-h-[44px] px-8 text-sm font-semibold rounded-xl"
            >
              Falar sobre meu projeto
            </MagneticButton>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default FAQPage;
