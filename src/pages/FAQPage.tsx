import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS, CATEGORY_LABELS, FAQItem } from "@/config/faq";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

const BASE_URL = SITE_CONFIG.url;

const CATEGORY_COLORS: Record<FAQItem["category"], string> = {
  contratacao:
    "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60",
  legados:
    "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800/60",
  processo:
    "bg-violet-50 text-violet-800 border-violet-300 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800/60",
  servicos:
    "bg-teal-50 text-teal-800 border-teal-300 dark:bg-teal-950/50 dark:text-teal-400 dark:border-teal-800/60",
};

type FilterCategory = "todas" | FAQItem["category"];

export const FAQPage = () => {
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
        {/* Page Header */}
        <PageHeader
          eyebrow="FAQ"
          title="Dúvidas frequentes"
          description="Respostas claras e diretas sobre como iniciar um projeto, modelos de trabalho, modernização de legados e atuação técnica remota."
        />

        <div className="container px-6 pb-20 max-w-4xl mx-auto">
          {/* Filtros por Categoria */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory("todas")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                selectedCategory === "todas"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
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
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Acordeão de Perguntas */}
          <Accordion type="single" collapsible className="space-y-3 mb-16">
            {filteredItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-border/70 rounded-xl overflow-hidden bg-card/60 shadow-xs transition-colors hover:border-primary/40 data-[state=open]:border-primary/50"
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
                    <span className="text-sm font-semibold text-foreground leading-snug group-data-[state=open]:text-primary transition-colors">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5">
                  <div className="mt-1 space-y-2 text-muted-foreground">
                    {item.answer.split("\n").map((line, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-sm leading-relaxed",
                          line.startsWith("•") ? "pl-3 font-mono text-xs sm:text-sm text-foreground/80" : ""
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

          {/* Chamada Final */}
          <div className="p-8 sm:p-10 rounded-2xl border border-border/70 bg-card/40 text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
              Não encontrou a resposta para o seu cenário?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6">
              Envie sua dúvida ou descreva o desafio da sua empresa. Retornamos em até 24 horas úteis com uma avaliação técnica preliminar.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] px-8 text-sm font-medium"
            >
              <Link to="/contato">Falar sobre meu projeto</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
