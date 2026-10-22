import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

import BlogPage from "../BlogPage";
import BlogPostPage from "../BlogPostPage";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BLOG_MANIFEST } from "@/lib/blog/manifest";

const ARTICLE = BLOG_MANIFEST.articles[0];

const renderWithProviders = (ui: React.ReactElement, initialEntries = ["/"]) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </HelmetProvider>
  );

describe("Blog — páginas", () => {
  it("renderiza a listagem com H1 e artigo publicado", () => {
    renderWithProviders(<BlogPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Blog técnico" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: ARTICLE.title,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `Ler artigo: ${ARTICLE.title}` })
    ).toHaveAttribute("href", ARTICLE.url);
  });

  it("renderiza o artigo com H1, data, corpo e link externo seguro", () => {
    renderWithProviders(
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>,
      [ARTICLE.url]
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: ARTICLE.title,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(ARTICLE.publishedAtLabel)).toBeInTheDocument();
    expect(screen.getByText(ARTICLE.readingTimeLabel)).toBeInTheDocument();
    expect(screen.getByText(/O que é o PHP2Shell/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voltar para o blog" })
    ).toHaveAttribute("href", "/blog");
    expect(
      screen.queryByRole("link", { name: "Fale sobre seu projeto" })
    ).not.toBeInTheDocument();

    const externalLink = screen.getByRole("link", {
      name: /PHP — Aviso oficial de segurança/,
    });
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renderiza 404 para slug inexistente", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>,
      ["/blog/slug-inexistente"]
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Página não encontrada" })
    ).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("renderiza o estado vazio com CTA para contato", () => {
    renderWithProviders(<BlogEmptyState />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Ainda não há artigos publicados" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Fale sobre seu projeto" })
    ).toHaveAttribute("href", "/contact");
  });
});
