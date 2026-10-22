import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { BlogNewsCarousel } from "../BlogNewsCarousel";
import { BLOG_MANIFEST } from "@/lib/blog/manifest";

const ARTICLES = BLOG_MANIFEST.articles;
const ARTICLE = ARTICLES[0];

const renderCarousel = (articles = ARTICLES) =>
  render(
    <MemoryRouter>
      <BlogNewsCarousel articles={articles} />
    </MemoryRouter>
  );

describe("BlogNewsCarousel", () => {
  it("renderiza a seção, o artigo publicado e o link para a listagem", () => {
    renderCarousel();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Notícias e análises para quem constrói software/,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("FIQUE POR DENTRO DE TUDO")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `Ler artigo: ${ARTICLE.title}` })
    ).toHaveAttribute("href", ARTICLE.url);
    expect(
      screen.getByRole("link", { name: "Ver todos os artigos" })
    ).toHaveAttribute("href", "/blog");
  });

  it("não exibe setas quando há apenas um artigo", () => {
    renderCarousel();

    expect(
      screen.queryByRole("button", { name: "Ver artigos anteriores" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Ver próximos artigos" })
    ).not.toBeInTheDocument();
  });

  it("exibe setas acessíveis quando há mais de um artigo", () => {
    renderCarousel([
      { ...ARTICLE, slug: "artigo-anterior", title: "Artigo anterior" },
      ARTICLE,
    ]);

    expect(
      screen.getByRole("button", { name: "Ver artigos anteriores" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ver próximos artigos" })
    ).toBeInTheDocument();
  });
});
