/**
 * Lista oficial de Códigos DDD válidos no território brasileiro.
 */
export const VALID_BRAZILIAN_DDDS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
  21, 22, 24,                         // RJ
  27, 28,                             // ES
  31, 32, 33, 34, 35, 37, 38,         // MG
  41, 42, 43, 44, 45, 46,             // PR
  47, 48, 49,                         // SC
  51, 53, 54, 55,                     // RS
  61,                                 // DF
  62, 64,                             // GO
  63,                                 // TO
  65, 66,                             // MT
  67,                                 // MS
  68,                                 // AC
  69,                                 // RO
  71, 73, 74, 75, 77,                 // BA
  79,                                 // SE
  81, 87,                             // PE
  82,                                 // AL
  83,                                 // PB
  84,                                 // RN
  85, 88,                             // CE
  86, 89,                             // PI
  91, 93, 94,                         // PA
  92, 97,                             // AM
  95,                                 // RR
  96,                                 // AP
  98, 99                              // MA
]);

/**
 * Aplica máscara dinâmica de telefone brasileiro:
 * - Se contiver letras, preserva o valor para que o Zod apresente o erro visualmente
 * - Suporta remoção opcional do DDI +55
 * - 10 dígitos: (99) 9999-9999 (Fixo)
 * - 11 dígitos: (99) 99999-9999 (Celular / WhatsApp)
 */
export function formatBrazilianPhone(value: string): string {
  if (!value) return "";

  // Se o usuário digitou letras, preservamos para que o Zod acuse o erro visualmente
  if (/[a-zA-Z]/.test(value)) {
    return value;
  }

  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Validação estrita de telefone brasileiro:
 * - Opcional se vazio
 * - Rejeita qualquer caractere alfabético (ex: "wewqewqeq")
 * - Exige DDD válido no Brasil (11 a 99)
 * - 10 dígitos (fixo) ou 11 dígitos (celular iniciando com 9)
 * - Rejeita sequências com todos os dígitos iguais
 */
export function validateBrazilianPhone(value?: string | null): boolean {
  if (!value || value.trim().length === 0) return true;

  // Rejeita expressamente caso contenha letras
  if (/[a-zA-Z]/.test(value)) return false;

  let digits = value.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) {
    digits = digits.slice(2);
  }

  // Deve ter exatamente 10 (fixo) ou 11 (celular) dígitos
  if (digits.length !== 10 && digits.length !== 11) return false;

  // Rejeita sequências com todos os dígitos iguais (ex: 11111111111)
  if (/^(\d)\1+$/.test(digits)) return false;

  const ddd = parseInt(digits.slice(0, 2), 10);
  if (!VALID_BRAZILIAN_DDDS.has(ddd)) return false;

  // Se for celular (11 dígitos), o terceiro dígito obrigatoriamente deve ser 9
  if (digits.length === 11 && digits[2] !== "9") return false;

  return true;
}
