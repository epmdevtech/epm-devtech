import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionWrapper from "../SectionWrapper";

describe("SectionWrapper Component", () => {
  it("renderiza corretamente com o tom anchor", () => {
    render(
      <SectionWrapper tone="anchor" data-testid="section-anchor">
        <p>Conteúdo Anchor</p>
      </SectionWrapper>
    );

    const el = screen.getByTestId("section-anchor");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-tone", "anchor");
    expect(el.className).toContain("bg-surface-anchor");
    expect(screen.getByText("Conteúdo Anchor")).toBeInTheDocument();
  });

  it("renderiza corretamente com o tom base", () => {
    render(
      <SectionWrapper tone="base" data-testid="section-base">
        <p>Conteúdo Base</p>
      </SectionWrapper>
    );

    const el = screen.getByTestId("section-base");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-tone", "base");
    expect(el.className).toContain("bg-surface-base");
    expect(el.className).toContain("border-y");
  });

  it("renderiza corretamente com o tom alt", () => {
    render(
      <SectionWrapper tone="alt" data-testid="section-alt">
        <p>Conteúdo Alt</p>
      </SectionWrapper>
    );

    const el = screen.getByTestId("section-alt");
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("data-tone", "alt");
    expect(el.className).toContain("bg-surface-alt");
  });

  it("renderiza container interno por padrão e permite desabilitar", () => {
    const { rerender } = render(
      <SectionWrapper tone="base" data-testid="wrapper">
        <span>Teste</span>
      </SectionWrapper>
    );

    expect(screen.getByTestId("wrapper").querySelector(".container")).toBeInTheDocument();

    rerender(
      <SectionWrapper tone="base" container={false} data-testid="wrapper">
        <span>Teste</span>
      </SectionWrapper>
    );

    expect(screen.getByTestId("wrapper").querySelector(".container")).toBeNull();
  });

  it("renderiza como elemento customizado via prop as", () => {
    render(
      <SectionWrapper tone="base" as="article" data-testid="custom-element">
        <span>Artigo</span>
      </SectionWrapper>
    );

    const el = screen.getByTestId("custom-element");
    expect(el.tagName.toLowerCase()).toBe("article");
  });
});
