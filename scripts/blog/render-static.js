const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

const PAGE_STYLE =
  "min-height:70vh;padding:7rem 1.5rem 5rem;background:rgb(var(--surface-base, 240 5% 98%));color:rgb(var(--text-primary-rgb, 9 9 11));";
const CONTAINER_STYLE = "width:100%;max-width:72rem;margin:0 auto;";
const EYEBROW_STYLE =
  "font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.75rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgb(var(--text-brand-rgb, 15 118 110));margin:0 0 .75rem;";
const TITLE_STYLE =
  "font-size:clamp(2.25rem,5vw,3.75rem);line-height:1.05;letter-spacing:-.04em;margin:0 0 1rem;color:rgb(var(--text-primary-rgb, 9 9 11));";
const DESCRIPTION_STYLE =
  "font-size:1.0625rem;line-height:1.65;color:rgb(var(--text-secondary-rgb, 82 82 91));max-width:65ch;margin:0;";
const META_STYLE =
  "font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.75rem;letter-spacing:.04em;text-transform:uppercase;color:rgb(var(--text-muted-rgb, 113 113 122));margin:0 0 .75rem;";
const LINK_STYLE =
  "color:rgb(var(--text-brand-rgb, 15 118 110));text-decoration:underline;text-underline-offset:2px;";

function renderCard(article) {
  return `
        <article style="border:1px solid rgb(var(--border-default-rgb, 228 228 231));border-radius:1rem;padding:1.5rem;background:rgb(var(--bg-surface-rgb, 255 255 255));">
          <p style="${META_STYLE}">${escapeHtml(article.category)} · <time datetime="${escapeHtml(
            article.publishedAt
          )}">${escapeHtml(article.publishedAtLabel)}</time> · ${escapeHtml(article.readingTimeLabel)}</p>
          <h2 style="font-size:1.5rem;line-height:1.2;letter-spacing:-.02em;margin:0 0 .75rem;">
            <a href="${escapeHtml(article.url)}" style="color:inherit;text-decoration:none;">${escapeHtml(
              article.title
            )}</a>
          </h2>
          <p style="${DESCRIPTION_STYLE}">${escapeHtml(article.description)}</p>
          <p style="margin:1rem 0 0;"><a href="${escapeHtml(article.url)}" style="${LINK_STYLE}">Ler artigo</a></p>
        </article>`;
}

function renderEmptyState() {
  return `
        <div style="border:1px solid rgb(var(--border-default-rgb, 228 228 231));border-radius:1rem;padding:2rem;background:rgb(var(--bg-surface-rgb, 255 255 255));">
          <h2 style="font-size:1.5rem;line-height:1.2;margin:0 0 .75rem;">Ainda não há artigos publicados</h2>
          <p style="${DESCRIPTION_STYLE}">Estou preparando os primeiros conteúdos técnicos. Enquanto isso, fale sobre o seu projeto.</p>
          <p style="margin:1.25rem 0 0;"><a href="/contact" style="${LINK_STYLE}">Fale sobre seu projeto</a></p>
        </div>`;
}

/**
 * HTML estático da listagem /blog, injetado dentro de #root.
 *
 * @param {{index: object, articles: object[]}} manifest
 * @returns {string}
 */
export function renderBlogIndexStatic(manifest) {
  const cards = manifest.articles.length
    ? manifest.articles.map(renderCard).join("")
    : renderEmptyState();

  return `
  <main id="conteudo-principal" style="${PAGE_STYLE}">
    <div style="${CONTAINER_STYLE}">
      <p style="${EYEBROW_STYLE}">BLOG</p>
      <h1 id="page-title" style="${TITLE_STYLE}">${escapeHtml(manifest.index.h1)}</h1>
      <p style="${DESCRIPTION_STYLE}">${escapeHtml(manifest.index.description)}</p>
      <div style="display:grid;gap:1rem;margin-top:2.5rem;">${cards}
      </div>
    </div>
  </main>`;
}

/**
 * HTML estático de /blog/<slug>, injetado dentro de #root.
 *
 * @param {object} article
 * @returns {string}
 */
export function renderBlogPostStatic(article) {
  return `
  <main id="conteudo-principal" style="${PAGE_STYLE}">
    <article aria-labelledby="blog-post-title" style="width:100%;max-width:48rem;margin:0 auto;">
      <p style="${EYEBROW_STYLE}">${escapeHtml(article.category)}</p>
      <h1 id="blog-post-title" style="${TITLE_STYLE}">${escapeHtml(article.title)}</h1>
      <p style="${DESCRIPTION_STYLE}">${escapeHtml(article.description)}</p>
      <p style="${META_STYLE};margin-top:1.25rem;">Publicado em <time datetime="${escapeHtml(
        article.publishedAt
      )}">${escapeHtml(article.publishedAtLabel)}</time> · ${escapeHtml(article.readingTimeLabel)}</p>
      <div class="article-prose" style="margin-top:2.5rem;">${article.html}</div>
      <hr style="border:0;border-top:1px solid rgb(var(--border-default-rgb, 228 228 231));margin:2.5rem 0 1.5rem;" />
      <p style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:center;margin:0;">
        <a href="/blog" style="${LINK_STYLE}">Voltar para o blog</a>
      </p>
    </article>
  </main>`;
}
