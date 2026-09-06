import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionHeader from "../SectionHeader";

describe("SectionHeader Component", () => {
  it("renderiza o cabeçalho padrão com h2, título e subtítulo centralizados", () => {
    render(
      <SectionHeader
        tagline="Serviços"
        title="Soluções End-to-End"
        subtitle="Do planejamento à sustentação técnica do seu software."
      />
    );

    const tagline = screen.getByText("Serviços");
    expect(tagline).toBeInTheDocument();
    expect(tagline.parentElement).toHaveClass("uppercase");
    expect(tagline.parentElement).toHaveClass("bg-emerald-50");
    expect(tagline.parentElement).toHaveClass("dark:bg-emerald-950/50");

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("text-zinc-900");
    expect(heading).toHaveClass("dark:text-white");
    expect(heading).toHaveTextContent("Soluções End-to-End");

    const subtitle = screen.getByText("Do planejamento à sustentação técnica do seu software.");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("font-normal");
    expect(subtitle).toHaveClass("text-zinc-600");
    expect(subtitle).toHaveClass("dark:text-zinc-400");
  });

  it("renderiza como h1 com escala de tamanho da Hero quando as='h1'", () => {
    render(
      <SectionHeader
        as="h1"
        tagline="Engenharia de Software & Modernização"
        withDot
        title="Software sob medida construído para escalar o seu negócio."
      />
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-4xl");
    expect(heading).toHaveClass("sm:text-5xl");
    expect(heading).toHaveClass("lg:text-6xl");
  });

  it("renderiza alinhamento à esquerda quando align='left'", () => {
    const { container } = render(
      <SectionHeader
        align="left"
        title="Título Alinhado à Esquerda"
        subtitle="Descrição com alinhamento à esquerda."
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("text-left");
  });
});
