import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ContactHeroVisual from "@/components/layout/hero-visuals/ContactHeroVisual";
import Contact from "@/components/sections/Contact";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { getHighlightFAQs } from "@/config/faq";
import { SITE_CONFIG } from "@/config/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = SITE_CONFIG.url;

export const ContactPage = () => {
  const highlightFAQs = getHighlightFAQs();
  const faqCardsRef = useScrollReveal<HTMLDivElement>({
    selector: ":scope > div",
    stagger: 0.08,
    y: 20,
    duration: 0.6,
  });

  return (
    <>
      <Helmet>
        <title>Fale Sobre Seu Projeto | EPM DevTech</title>
        <meta
          name="description"
          content="Inicie seu projeto de software com a EPM DevTech. Entraremos em contato para entender o cenário técnico e agendar uma conversa."
        />
        <link rel="canonical" href={`${BASE_URL}/contact`} />
        <meta property="og:title" content="Fale Sobre Seu Projeto | EPM DevTech" />
        <meta
          property="og:description"
          content="Inicie seu projeto de software com a EPM DevTech. Entraremos em contato para entender o cenário técnico e agendar uma conversa."
        />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:image" content={`${BASE_URL}/og-image-1200x630.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fale Sobre Seu Projeto | EPM DevTech" />
        <meta
          name="twitter:description"
          content="Inicie seu projeto de software com a EPM DevTech. Entraremos em contato para entender o cenário técnico e agendar uma conversa."
        />
        <meta name="twitter:image" content={`${BASE_URL}/og-image-1200x630.png`} />
      </Helmet>

      <div className="w-full">
        {/* Page Hero Split 60/40 com Artefato Visual Técnico (Tom: Anchor) */}
        <PageHero
          eyebrow="CONTATO"
          title="Vamos conversar sobre como podemos apoiar você e seu projeto"
          description="Assim que recebermos sua mensagem, entraremos em contato para entender o cenário técnico e agendar uma conversa."
          visual={<ContactHeroVisual />}
        />

        {/* Formulário e Canais Diretos (Tom: Base) */}
        <SectionWrapper tone="base" container={false}>
          <div className="container px-6 max-w-6xl mx-auto">
            <Contact hideHeader />
          </div>
        </SectionWrapper>

        {/* Dúvidas Frequentes em Destaque (Tom: Alt) */}
        <SectionWrapper tone="alt" containerClassName="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>DÚVIDAS ANTES DE ENVIAR?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground [text-wrap:balance]">
              Perguntas frequentes sobre o início do trabalho
            </h2>
          </div>

          <div ref={faqCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {highlightFAQs.map((faq) => (
              <div
                key={faq.id}
                className="p-5 rounded-xl border border-border/60 bg-surface-base flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group"
            >
              <span>Ver todas as 8 dúvidas frequentes</span>
            </Link>
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

export default ContactPage;
