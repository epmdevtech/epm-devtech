import { render, screen, fireEvent, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import EpmConstellation from "../../EpmConstellation";
import ConstellationInspector from "../ConstellationInspector";
import { CONSTELLATION_NODES } from "@/config/epmConstellation";
import { PRACTICES_DATA, nodeIndexOf } from "@/data/constellationPractices";
import { HOVER_CLOSE_DELAY_MS, HOVER_OPEN_DELAY_MS } from "../useConstellationInspector";

let mockReducedMotion = false;
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => mockReducedMotion,
    // rAF é no-op no setup de testes: dispensa a animação de saída
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// jsdom não implementa PointerEvent: sem isso `pointerType` se perde nos eventos
if (!("PointerEvent" in window)) {
  class PointerEventPolyfill extends MouseEvent {
    pointerType: string;
    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerType = init.pointerType ?? "";
    }
  }
  Object.defineProperty(window, "PointerEvent", { value: PointerEventPolyfill, writable: true });
}

const nodeButton = (title: string) => screen.getByRole("button", { name: `Prática: ${title}` });
const [core, integrations, ops, modernization] = PRACTICES_DATA;

describe("PRACTICES_DATA", () => {
  it("mapeia cada prática ao nó real aprovado na SPEC-105", () => {
    const ids = PRACTICES_DATA.map((p) => CONSTELLATION_NODES[p.nodeIndex].id);
    expect(ids).toEqual(["core_center", "bra_l_tip", "bra_r_tip", "t_mid"]);
    expect(PRACTICES_DATA.map((p) => p.nodeIndex)).toEqual([53, 35, 46, 3]);
  });

  it("nodeIndexOf lança erro para nó inexistente", () => {
    expect(() => nodeIndexOf("nao_existe")).toThrow(/inexistente/);
  });
});

describe("Constellation Inspector", () => {
  beforeEach(() => {
    mockReducedMotion = false;
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza apenas os nós mapeados como botões focáveis com aria-label descritivo", () => {
    render(<EpmConstellation />);
    expect(screen.getAllByRole("button")).toHaveLength(PRACTICES_DATA.length);
    PRACTICES_DATA.forEach((p) => {
      const btn = nodeButton(p.title);
      expect(btn).toHaveAttribute("aria-haspopup", "dialog");
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
    // nós decorativos continuam sem role/foco, dentro do svg aria-hidden
    const decorative = screen.getByTestId("node-t_1");
    expect(decorative.closest("svg")).toHaveAttribute("aria-hidden", "true");
    expect(within(decorative).queryByRole("button")).toBeNull();
  });

  it("não expõe botões e mantém aria-hidden no contêiner quando interactive=false", () => {
    render(<EpmConstellation interactive={false} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByTestId("epm-constellation-container")).toHaveAttribute("aria-hidden", "true");
  });

  it("abre no hover após ~120ms e fecha ~150ms depois de sair", () => {
    render(<EpmConstellation />);
    const btn = nodeButton(core.title);

    fireEvent.pointerEnter(btn, { pointerType: "mouse" });
    expect(screen.queryByRole("dialog")).toBeNull();
    act(() => void vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS + 5));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(btn, { pointerType: "mouse" });
    act(() => void vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS - 20));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => void vi.advanceTimersByTime(40));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("permite mover o mouse até o card sem fechar", () => {
    render(<EpmConstellation />);
    const btn = nodeButton(core.title);
    fireEvent.pointerEnter(btn, { pointerType: "mouse" });
    act(() => void vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS + 5));

    fireEvent.pointerLeave(btn, { pointerType: "mouse" });
    fireEvent.pointerEnter(screen.getByTestId("practice-card"));
    act(() => void vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS * 3));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.pointerLeave(screen.getByTestId("practice-card"));
    act(() => void vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS + 5));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("abre ao focar via teclado e fecha com Esc mantendo o foco no nó", async () => {
    render(<EpmConstellation />);
    const btn = nodeButton(integrations.title);
    act(() => btn.focus());
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(btn).toHaveFocus();
  });

  it("Enter fixa o card (pinned): permanece aberto ao sair do nó e fecha com clique fora", async () => {
    render(<EpmConstellation />);
    const btn = nodeButton(ops.title);
    act(() => btn.focus());
    await userEvent.keyboard("{Enter}");
    fireEvent.pointerLeave(btn, { pointerType: "mouse" });
    act(() => void vi.advanceTimersByTime(HOVER_CLOSE_DELAY_MS * 3));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    fireEvent.pointerUp(document.body);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("toque abre direto, sem depender de hover, e toque novo no mesmo nó fecha", () => {
    render(<EpmConstellation />);
    const btn = nodeButton(modernization.title);
    fireEvent.pointerEnter(btn, { pointerType: "touch" }); // ignorado
    act(() => void vi.advanceTimersByTime(HOVER_OPEN_DELAY_MS + 5));
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(btn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("mantém apenas um card aberto por vez", () => {
    render(<EpmConstellation />);
    fireEvent.click(nodeButton(core.title));
    expect(screen.getAllByRole("dialog")).toHaveLength(1);
    fireEvent.click(nodeButton(ops.title));
    const dialogs = screen.getAllByRole("dialog");
    expect(dialogs).toHaveLength(1);
    expect(within(dialogs[0]).getByText(ops.title)).toBeInTheDocument();
  });

  it("renderiza categoria, título, descrição e tags a partir de PRACTICES_DATA", () => {
    render(<EpmConstellation />);
    PRACTICES_DATA.forEach((practice) => {
      fireEvent.click(nodeButton(practice.title));
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAccessibleName(practice.title);
      expect(within(dialog).getByText(practice.category)).toBeInTheDocument();
      expect(within(dialog).getByText(practice.description)).toBeInTheDocument();
      practice.tags.forEach((tag) => expect(within(dialog).getByText(tag)).toBeInTheDocument());
    });
  });

  it("destaca o nó ativo e as arestas conectadas na camada isolada", () => {
    render(<EpmConstellation />);
    expect(screen.queryByTestId("constellation-active-highlight")).toBeNull();
    fireEvent.click(nodeButton(core.title));
    const highlight = screen.getByTestId("constellation-active-highlight");
    expect(highlight.querySelectorAll("line").length).toBeGreaterThan(0);
  });

  it("navega entre nós interativos com ←/→ (ordenados por x)", async () => {
    render(<EpmConstellation />);
    const ordered = [integrations, modernization, core, ops]; // x: 145, 300/y110 (t_mid), 300/y300 (core), 455
    const first = nodeButton(ordered[0].title);
    act(() => first.focus());
    await userEvent.keyboard("{ArrowRight}");
    expect(nodeButton(ordered[1].title)).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(first).toHaveFocus();
  });

  it("posiciona a hit area em % do viewBox com no mínimo 44px", () => {
    render(<EpmConstellation />);
    const anchor = nodeButton(core.title).parentElement as HTMLElement;
    expect(anchor).toHaveStyle({ left: "50%", top: "50%" });
    expect(anchor.className).toContain("size-11");
  });

  it("usa apenas fade com prefers-reduced-motion e não renderiza o anel de pulso", () => {
    mockReducedMotion = true;
    render(<EpmConstellation />);
    fireEvent.click(nodeButton(core.title));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const highlight = screen.getByTestId("constellation-active-highlight");
    expect(highlight.querySelectorAll("circle[fill='none']").length).toBe(1);
  });

  it("ignora práticas com nodeIndex inválido e permanece sem botões", () => {
    render(
      <ConstellationInspector
        practices={[{ ...core, nodeIndex: 999 }]}
      >
        {() => <svg />}
      </ConstellationInspector>,
    );
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
