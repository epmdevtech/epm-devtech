import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
  breaks: false,
});

const defaultLinkOpen =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet("href") || "";
  if (/^https?:\/\//i.test(href)) {
    tokens[idx].attrSet("target", "_blank");
    tokens[idx].attrSet("rel", "noopener noreferrer");
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  token.attrSet("loading", "lazy");
  token.attrSet("decoding", "async");
  return self.renderToken(tokens, idx, options);
};

function renderCodeBlock(content, info) {
  const language = (info || "").trim().split(/\s+/)[0];
  const safeLanguage = /^[a-z0-9-]+$/i.test(language) ? language : "";
  const className = safeLanguage ? ` class="language-${safeLanguage}"` : "";
  return `<pre tabindex="0" role="region" aria-label="Bloco de código"><code${className}>${md.utils.escapeHtml(
    content
  )}</code></pre>\n`;
}

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  return renderCodeBlock(token.content, token.info);
};

md.renderer.rules.code_block = (tokens, idx) => {
  const token = tokens[idx];
  return renderCodeBlock(token.content, "");
};

/**
 * Renderiza Markdown com HTML bruto desabilitado. Tags HTML escritas no
 * conteúdo são escapadas, não interpretadas.
 *
 * @param {string} source
 * @returns {string}
 */
export function renderMarkdown(source) {
  return md.render(source);
}
