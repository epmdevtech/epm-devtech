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
    expect(tagline.parentElement).toHaveClass("text-text-brand");
    expect(tagline.parentElement).toHaveClass("tracking-[0.04em]");
    expect(tagline.parentElement).not.toHaveClass("bg-emerald-50");

    // Verifica presença do ícone de chip da marca
    const svgIcon = tagline.parentElement?.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute("width", "14");
    expect(svgIcon).toHaveAttribute("height", "14");

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-[clamp(2.25rem,4vw,3.75rem)]");
    expect(heading).toHaveClass("text-primary");
    expect(heading).toHaveTextContent("Da primeira reunião ao deploy em produção");

    const subtitle = screen.getByText(/Planejamento, arquitetura, testes automatizados/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("font-normal");
    expect(subtitle).toHaveClass("text-secondary");
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
    expect(heading).toHaveClass("text-[clamp(2.5rem,5vw,4.5rem)]");
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
