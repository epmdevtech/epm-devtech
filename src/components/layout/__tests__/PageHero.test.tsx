import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import PageHero from "../PageHero";
import ServicesHeroVisual from "../hero-visuals/ServicesHeroVisual";
import HowWeWorkHeroVisual from "../hero-visuals/HowWeWorkHeroVisual";
import ExperienceHeroVisual from "../hero-visuals/ExperienceHeroVisual";
import EngineeringHeroVisual from "../hero-visuals/EngineeringHeroVisual";
import ContactHeroVisual from "../hero-visuals/ContactHeroVisual";

describe("PageHero Component (Design System Split 60/40 — SPEC-111 & SPEC-112)", () => {
  it("renderiza layout split com proporção 60/40, data-tone anchor e acessibilidade semântica", () => {
    render(
      <PageHero
        eyebrow="SERVIÇOS"
        title="Soluções de software sob medida"
        highlightText="para destravar sua empresa"
        description="Do diagnóstico técnico à sustentação de sistemas críticos."
        visual={<div data-testid="test-visual">Visual Teste</div>}
        primaryCta={<button type="button">VAMOS CONVERSAR</button>}
      />
    );

    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-tone", "anchor");
    expect(section).toHaveAttribute("aria-labelledby", "page-title");

    // Eyebrow
    const eyebrow = screen.getByTestId("page-eyebrow");
    expect(eyebrow).toBeInTheDocument();
    expect(eyebrow).toHaveTextContent("SERVIÇOS");
    expect(eyebrow.querySelector("svg")).toBeInTheDocument();

    // H1 e Highlight
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "page-title");
    expect(heading).toHaveTextContent(/Soluções de software sob medida/i);
    expect(heading).toHaveTextContent(/para destravar sua empresa/i);

    // Descrição
    expect(
      screen.getByText("Do diagnóstico técnico à sustentação de sistemas críticos.")
    ).toBeInTheDocument();

    // CTA
    expect(screen.getByRole("button", { name: "VAMOS CONVERSAR" })).toBeInTheDocument();

    // Visual Container (aria-hidden por padrão para elementos decorativos)
    const visualContainer = screen.getByTestId("page-hero-visual");
    expect(visualContainer).toBeInTheDocument();
    expect(visualContainer).toHaveAttribute("aria-hidden", "true");
  });

  it("permite visual interativo sem aria-hidden quando isVisualInteractive=true", () => {
    render(
      <PageHero
        id="hero"
        eyebrow="ENGENHARIA"
        title="Engenharia de software"
        description="Descrição técnica."
        isVisualInteractive={true}
        visual={<button type="button">Ação Interativa</button>}
      />
    );

    const visualContainer = screen.getByTestId("page-hero-visual");
    expect(visualContainer).not.toHaveAttribute("aria-hidden");
    expect(screen.getByRole("button", { name: "Ação Interativa" })).toBeInTheDocument();
  });

  describe("Direções de Arte Editoriais & Visuais Abertos (SPEC-113)", () => {
    it("renderiza ServicesHeroVisual como Architectural Spec Grid aberto", () => {
      render(<ServicesHeroVisual />);
      expect(screen.getByText("+ [SPEC_GRID // 01-03]")).toBeInTheDocument();
      expect(screen.getByText("PRONTO PARA ESCALA")).toBeInTheDocument();
      expect(screen.getByText("01 // PLATAFORMAS & SISTEMAS WEB")).toBeInTheDocument();
      expect(screen.getByText("02 // INTEGRAÇÕES CRÍTICAS & APIs")).toBeInTheDocument();
      expect(screen.getByText("03 // MODERNIZAÇÃO DE SISTEMAS LEGADOS")).toBeInTheDocument();
      expect(screen.getByText("Retorno Operacional Mensurável")).toBeInTheDocument();
    });

    it("renderiza HowWeWorkHeroVisual como Execution Timeline Sequence com régua milimétrica", () => {
      render(<HowWeWorkHeroVisual />);
      expect(screen.getByText("+ [EXECUTION_TIMELINE // 01-04]")).toBeInTheDocument();
      expect(screen.getByText("CRONOGRAMA SEGURO")).toBeInTheDocument();
      expect(screen.getByText(/\[01\] DIAGNÓSTICO ESTRATÉGICO/i)).toBeInTheDocument();
      expect(screen.getByText(/\[02\] ARQUITETURA RESILIENTE/i)).toBeInTheDocument();
      expect(screen.getByText(/\[03\] CICLOS INCREMENTAIS/i)).toBeInTheDocument();
      expect(screen.getByText(/\[04\] PRODUÇÃO COM ZERO INTERRUPÇÃO/i)).toBeInTheDocument();
      expect(screen.getByText("Visibilidade Total a Cada Etapa")).toBeInTheDocument();
    });

    it("renderiza ExperienceHeroVisual como Composição Tipográfica Display com Cotas CAD", () => {
      render(<ExperienceHeroVisual />);
      expect(screen.getByText("+ [METRICS_DISPLAY // PERF_INDEX]")).toBeInTheDocument();
      expect(screen.getByText("99.98%")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("INTERRUPÇÕES")).toBeInTheDocument();
      expect(screen.getByText("SETORES CRÍTICOS ATENDIDOS")).toBeInTheDocument();
      expect(screen.getByText("Operações Críticas Protegidas")).toBeInTheDocument();
    });

    it("renderiza EngineeringHeroVisual como Blueprint Isométrico em Linha Fina CAD", () => {
      render(<EngineeringHeroVisual />);
      expect(screen.getByText("+ [ARCH_BLUEPRINT // 4_TIER_CAD]")).toBeInTheDocument();
      expect(screen.getByText("CÓDIGO BLINDADO")).toBeInTheDocument();
      expect(screen.getByText("01 // GATEWAY")).toBeInTheDocument();
      expect(screen.getByText("02 // SERVICES")).toBeInTheDocument();
      expect(screen.getByText("03 // EVENT STREAM")).toBeInTheDocument();
      expect(screen.getByText("04 // DATA")).toBeInTheDocument();
      expect(screen.getByText("Código Sustentável e Modular")).toBeInTheDocument();
    });

    it("renderiza ContactHeroVisual como Canal Executivo Direto P2P aberto", () => {
      render(<ContactHeroVisual />);
      expect(screen.getByText("+ [DIRECT_LINE // P2P_TERMINAL]")).toBeInTheDocument();
      expect(screen.getByText("SEM INTERMEDIÁRIOS")).toBeInTheDocument();
      expect(screen.getByText("SUA EMPRESA")).toBeInTheDocument();
      expect(screen.getByText("EPM DEVTECH")).toBeInTheDocument();
      expect(screen.getByText(/Conversa direta com quem projeta e implementa/i)).toBeInTheDocument();
    });
  });
});
