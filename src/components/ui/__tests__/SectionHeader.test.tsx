import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionHeader from "../SectionHeader";

describe("SectionHeader Component", () => {
  it("renderiza o cabeçalho padrão com eyebrow minimalista (ícone da marca + texto cinza), h2 e subtítulo", () => {
    render(
      <SectionHeader
        tagline="Serviços"
        title="Da primeira reunião ao deploy em produção"
        subtitle="Planejamento, arquitetura, testes automatizados e entrega: cuidamos de cada etapa com o mesmo padrão técnico, sem atalhos que viram dívida técnica depois."
      />
    );

    const tagline = screen.getByText("Serviços");
    expect(tagline).toBeInTheDocument();
    expect(tagline.parentElement).toHaveClass("uppercase");
    expect(tagline.parentElement).toHaveClass("text-zinc-500");
    expect(tagline.parentElement).toHaveClass("dark:text-zinc-400");
    expect(tagline.parentElement).toHaveClass("tracking-[0.1em]");
    expect(tagline.parentElement).not.toHaveClass("bg-emerald-50");

    // Verifica presença do ícone de chip da marca
    const svgIcon = tagline.parentElement?.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute("width", "15");
    expect(svgIcon).toHaveAttribute("height", "15");

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("text-zinc-900");
    expect(heading).toHaveClass("dark:text-white");
    expect(heading).toHaveTextContent("Da primeira reunião ao deploy em produção");

    const subtitle = screen.getByText(/Planejamento, arquitetura, testes automatizados/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("font-normal");
    expect(subtitle).toHaveClass("text-zinc-600");
    expect(subtitle).toHaveClass("dark:text-zinc-400");
  });

  it("renderiza apenas o eyebrow quando title e subtitle são omitidos (ex: Stack Tecnológica)", () => {
    render(
      <SectionHeader
        tagline="Stack Tecnológica"
      />
    );

    expect(screen.getByText("Stack Tecnológica")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renderiza como h1 com escala de tamanho da Hero quando as='h1'", () => {
    render(
      <SectionHeader
        as="h1"
        tagline="Engenharia de Software & Modernização"
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
        tagline="Sobre a EPM DEVTECH"
        title="Título Alinhado à Esquerda"
        subtitle="Descrição com alinhamento à esquerda."
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("text-left");
  });
});
