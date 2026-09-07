import { describe, it, expect } from "vitest";
import { formatBrazilianPhone, validateBrazilianPhone } from "../phone";

describe("phone utility - formatBrazilianPhone", () => {
  it("retorna string vazia para entrada vazia", () => {
    expect(formatBrazilianPhone("")).toBe("");
  });

  it("formata DDD parcial", () => {
    expect(formatBrazilianPhone("1")).toBe("(1");
    expect(formatBrazilianPhone("11")).toBe("(11");
  });

  it("formata telefone fixo completo (10 dígitos)", () => {
    expect(formatBrazilianPhone("4532201234")).toBe("(45) 3220-1234");
  });

  it("formata celular completo (11 dígitos)", () => {
    expect(formatBrazilianPhone("11999998888")).toBe("(11) 99999-8888");
  });

  it("remove caracteres especiais de pontuação durante a digitação e suporta +55", () => {
    expect(formatBrazilianPhone("+55 (11) 99999-8888")).toBe("(11) 99999-8888");
    expect(formatBrazilianPhone("11.99999.8888")).toBe("(11) 99999-8888");
  });

  it("preserva caracteres alfabéticos para acionar a validação do Zod", () => {
    expect(formatBrazilianPhone("wewqewqeq")).toBe("wewqewqeq");
    expect(formatBrazilianPhone("11abc99999")).toBe("11abc99999");
  });

  it("limita a 11 dígitos", () => {
    expect(formatBrazilianPhone("119999988889999")).toBe("(11) 99999-8888");
  });
});

describe("phone utility - validateBrazilianPhone", () => {
  it("considera válido quando vazio ou omitido (campo opcional)", () => {
    expect(validateBrazilianPhone("")).toBe(true);
    expect(validateBrazilianPhone(null)).toBe(true);
    expect(validateBrazilianPhone(undefined)).toBe(true);
    expect(validateBrazilianPhone("   ")).toBe(true);
  });

  it("rejeita strings com caracteres alfabéticos", () => {
    expect(validateBrazilianPhone("wewqewqeq")).toBe(false);
    expect(validateBrazilianPhone("1199999888a")).toBe(false);
  });

  it("valida celular brasileiro com 11 dígitos e DDD legítimo", () => {
    expect(validateBrazilianPhone("(11) 99999-8888")).toBe(true);
    expect(validateBrazilianPhone("45999178290")).toBe(true);
    expect(validateBrazilianPhone("(21) 98765-4321")).toBe(true);
  });

  it("valida telefone fixo brasileiro com 10 dígitos e DDD legítimo", () => {
    expect(validateBrazilianPhone("(45) 3220-1234")).toBe(true);
    expect(validateBrazilianPhone("1130004000")).toBe(true);
  });

  it("rejeita DDDs inexistentes", () => {
    expect(validateBrazilianPhone("(00) 99999-8888")).toBe(false);
    expect(validateBrazilianPhone("(01) 99999-8888")).toBe(false);
    expect(validateBrazilianPhone("(20) 99999-8888")).toBe(false);
    expect(validateBrazilianPhone("(52) 99999-8888")).toBe(false);
  });

  it("rejeita celulares de 11 dígitos que não começam com 9", () => {
    expect(validateBrazilianPhone("(11) 89999-8888")).toBe(false);
    expect(validateBrazilianPhone("(45) 79999-8888")).toBe(false);
  });

  it("rejeita números com quantidade inadequada de dígitos", () => {
    expect(validateBrazilianPhone("123")).toBe(false);
    expect(validateBrazilianPhone("(11) 9999-888")).toBe(false); // 9 dígitos
    expect(validateBrazilianPhone("119999988881")).toBe(false); // 12 dígitos
  });

  it("rejeita sequências de dígitos todos repetidos", () => {
    expect(validateBrazilianPhone("11111111111")).toBe(false);
    expect(validateBrazilianPhone("99999999999")).toBe(false);
  });
});
