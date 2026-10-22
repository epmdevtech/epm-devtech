import { BASE_URL } from "./site-routes.js";

/**
 * Monta o JSON-LD do FAQ a partir da mesma lista usada pelo conteúdo visível.
 *
 * @param {Array<{ question: string, answer: string }>} items
 */
export function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE_URL}/faq`,
    url: `${BASE_URL}/faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

const serializeJsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

/**
 * Injeta o JSON-LD específico da rota antes de </head>.
 *
 * @param {string} html
 * @param {unknown} schema
 * @returns {string}
 */
export function injectFaqJsonLd(html, schema) {
  const script = `<script type="application/ld+json">${serializeJsonLd(schema)}</script>`;
  return html.replace("</head>", `  ${script}\n  </head>`);
}
