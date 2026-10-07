import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import PageHero from "../PageHero";
import ServicesHeroVisual from "../hero-visuals/ServicesHeroVisual";
import HowWeWorkHeroVisual from "../hero-visuals/HowWeWorkHeroVisual";
import ExperienceHeroVisual from "../hero-visuals/ExperienceHeroVisual";
import EngineeringHeroVisual from "../hero-visuals/EngineeringHeroVisual";
import ContactHeroVisual from "../hero-visuals/ContactHeroVisual";

describe("PageHero Component (Design System Split 60/40 — SPEC-111)", () => {
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

  describe("Artefatos Visuais Técnicos Autorais", () => {
    it("renderiza ServicesHeroVisual com telemetria de latência e nós de microsserviços", () => {
      render(<ServicesHeroVisual />);
      expect(screen.getByText("SVC-BUS // ROUTER")).toBeInTheDocument();
      expect(screen.getByText(/LATENCY < 14ms/i)).toBeInTheDocument();
      expect(screen.getByText("THROUGHPUT")).toBeInTheDocument();
      expect(screen.getByText("2.500 req/s")).toBeInTheDocument();
    });

    it("renderiza HowWeWorkHeroVisual com as 4 etapas e portais de validação", () => {
      render(<HowWeWorkHeroVisual />);
      expect(screen.getByText("PIPELINE // 4-STAGE ENGINE")).toBeInTheDocument();
      expect(screen.getByText("DIAGNOSE")).toBeInTheDocument();
      expect(screen.getByText("SPEC")).toBeInTheDocument();
      expect(screen.getByText("BUILD")).toBeInTheDocument();
      expect(screen.getByText("EVOLVE")).toBeInTheDocument();
    });

    it("renderiza ExperienceHeroVisual com métricas de SLA e sparkline", () => {
      render(<ExperienceHeroVisual />);
      expect(screen.getByText("CLUSTER // TELEMETRY")).toBeInTheDocument();
      expect(screen.getByText("99,9%")).toBeInTheDocument();
      expect(screen.getByText("2.500")).toBeInTheDocument();
      expect(screen.getByText("100% CONSISTÊNCIA")).toBeInTheDocument();
    });

    it("renderiza EngineeringHeroVisual com chip central e diodos de qualidade", () => {
      render(<EngineeringHeroVisual />);
      expect(screen.getByText("ARCH // KERNEL 64-BIT")).toBeInTheDocument();
      expect(screen.getByText("CORE ARCH ENGINE")).toBeInTheDocument();
      expect(screen.getByText("64-BIT SYNC")).toBeInTheDocument();
      expect(screen.getByText("STRICT TYPES")).toBeInTheDocument();
      expect(screen.getByText("QUALITY GATES")).toBeInTheDocument();
    });

    it("renderiza ContactHeroVisual com handshake P2P e garantias de canal direto", () => {
      render(<ContactHeroVisual />);
      expect(screen.getByText("DIRECT // P2P HANDSHAKE")).toBeInTheDocument();
      expect(screen.getByText("ZERO INTERMEDIÁRIOS")).toBeInTheDocument();
      expect(screen.getByText("SEU PROJETO")).toBeInTheDocument();
      expect(screen.getByText("EPM DEVTECH")).toBeInTheDocument();
      expect(screen.getByText("ESTABLISHED")).toBeInTheDocument();
    });
  });
});
