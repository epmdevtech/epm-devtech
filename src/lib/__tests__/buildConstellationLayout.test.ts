import { describe, it, expect } from "vitest";
import {
  buildConstellationLayout,
  generatePcbPath,
  type Category,
  type Connection,
} from "../buildConstellationLayout";

describe("buildConstellationLayout", () => {
  const sampleCategories: Category[] = [
    {
      id: "frontend",
      label: "Frontend",
      colorVar: "--primary",
      technologies: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "TypeScript", icon: "/icons/ts.svg" },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      colorVar: "--primary",
      technologies: [
        { name: "Node.js", icon: "/icons/node.svg" },
      ],
    },
    {
      id: "custom-cluster",
      label: "Outros",
      colorVar: "--accent",
      technologies: [
        { name: "CustomTech", icon: "/icons/custom.svg" },
      ],
    },
  ];

  const sampleConnections: Connection[] = [
    ["React", "Node.js"],
    ["TypeScript", "Node.js"],
    ["InexistenteA", "InexistenteB"], // Conexão inválida que deve ser ignorada com segurança
  ];

  it("deve calcular o layout desktop por padrão mantendo nós dentro dos limites", () => {
    const layout = buildConstellationLayout(sampleCategories, sampleConnections);

    expect(layout.width).toBe(1000);
    expect(layout.height).toBe(620);
    expect(layout.nodes.length).toBe(4);
    expect(layout.categoryCentroids.length).toBe(3);

    // Conexões válidas
    expect(layout.connections.length).toBe(2);
    expect(layout.connections[0].source).toBe("React");
    expect(layout.connections[0].target).toBe("Node.js");
    expect(layout.connections[0].pathData).toContain("M ");

    // Valida que todos os nós estão dentro dos limites
    layout.nodes.forEach((node) => {
      expect(node.x).toBeGreaterThanOrEqual(35);
      expect(node.x).toBeLessThanOrEqual(1000 - 35);
      expect(node.y).toBeGreaterThanOrEqual(35);
      expect(node.y).toBeLessThanOrEqual(620 - 35);
    });
  });

  it("deve adaptar para o modo mobile quando isMobile for true", () => {
    const layout = buildConstellationLayout(sampleCategories, sampleConnections, {
      isMobile: true,
    });

    expect(layout.width).toBe(380);
    expect(layout.height).toBe(860);
    expect(layout.nodes.length).toBe(4);

    layout.nodes.forEach((node) => {
      expect(node.x).toBeGreaterThanOrEqual(24);
      expect(node.x).toBeLessThanOrEqual(380 - 24);
      expect(node.y).toBeGreaterThanOrEqual(24);
      expect(node.y).toBeLessThanOrEqual(860 - 24);
    });
  });

  it("deve respeitar dimensões customizadas fornecidas nas opções", () => {
    const layout = buildConstellationLayout(sampleCategories, sampleConnections, {
      width: 1200,
      height: 700,
    });

    expect(layout.width).toBe(1200);
    expect(layout.height).toBe(700);
  });

  it("deve gerar rota linear quando os pontos estiverem alinhados", () => {
    const straightX = generatePcbPath(100, 200, 101, 400);
    expect(straightX).toBe("M 100.0 200.0 L 101.0 400.0");

    const straightY = generatePcbPath(100, 200, 400, 201);
    expect(straightY).toBe("M 100.0 200.0 L 400.0 201.0");
  });

  it("deve gerar rota PCB ortogonal com curvas nos cantos quando desalinhados", () => {
    const path = generatePcbPath(100, 100, 300, 300);
    expect(path).toContain("M 100.0 100.0");
    expect(path).toContain("Q ");
    expect(path).toContain("L 300.0 300.0");
  });
});
