import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LEGACY_REDIRECTS } from "@/config/routes";

vi.mock("@/components/layout/Layout", async () => {
  const { Outlet } = await import("react-router-dom");
  return { default: () => <Outlet /> };
});
vi.mock("@/pages/Home", () => ({ default: () => <div>home</div> }));
vi.mock("@/pages/NotFound", () => ({ default: () => <div>notfound</div> }));
vi.mock("@/pages/ServicesPage", () => ({ default: () => <div>services-page</div> }));
vi.mock("@/pages/HowWeWorkPage", () => ({ default: () => <div>howwework-page</div> }));
vi.mock("@/pages/ExperiencePage", () => ({ default: () => <div>experience-page</div> }));
vi.mock("@/pages/EngineeringPage", () => ({ default: () => <div>engineering-page</div> }));
vi.mock("@/pages/AboutPage", () => ({ default: () => <div>about-page</div> }));
vi.mock("@/pages/ContactPage", () => ({ default: () => <div>contact-page</div> }));
vi.mock("@/pages/FAQPage", () => ({ default: () => <div>faq-page</div> }));
vi.mock("@/components/LazyRender", () => ({ LazyRender: () => null }));

import App from "@/App";

afterEach(() => window.history.replaceState({}, "", "/"));

describe("App — redirects legados (SPEC-106)", () => {
  it.each(Object.entries(LEGACY_REDIRECTS))("%s → %s", async (from, to) => {
    window.history.replaceState({}, "", from);
    render(<App />);
    await waitFor(() => expect(window.location.pathname).toBe(to));
  });

  it("renderiza rota nova em inglês", async () => {
    window.history.replaceState({}, "", "/services");
    render(<App />);
    expect(await screen.findByText("services-page")).toBeInTheDocument();
  });

  it("rota desconhecida cai no 404", async () => {
    window.history.replaceState({}, "", "/rota-inexistente");
    render(<App />);
    expect(await screen.findByText("notfound")).toBeInTheDocument();
  });
});
