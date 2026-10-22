import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { LEGACY_REDIRECTS, ROUTES } from "@/config/routes";
import { PRERENDER_ROUTES, SITE_ROUTES } from "../../../scripts/site-routes.js";
import { buildSitemapXml } from "../../../scripts/generate-sitemap.js";

const root = resolve(__dirname, "../../..");
const readRoot = (file: string) => readFileSync(resolve(root, file), "utf-8");

const canonicalPaths = Object.values(ROUTES);

describe("routes (SPEC-106)", () => {
  it("usa slugs canônicos em inglês", () => {
    expect(canonicalPaths).toEqual([
      "/",
      "/services",
      "/how-we-work",
      "/experience",
      "/engineering",
      "/about",
      "/contact",
      "/faq",
      "/blog",
    ]);
  });

  it("todo redirect legado aponta para uma rota canônica (um único salto)", () => {
    for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
      expect(canonicalPaths).toContain(to);
      expect(canonicalPaths).not.toContain(from);
    }
  });

  it("vercel.json espelha LEGACY_REDIRECTS com 301 permanente e sem cadeias", () => {
    const { redirects, rewrites } = JSON.parse(readRoot("vercel.json")) as {
      redirects: { source: string; destination: string; permanent: boolean }[];
      rewrites?: unknown;
    };
    const asMap = Object.fromEntries(redirects.map((r) => [r.source, r.destination]));
    expect(asMap).toEqual(LEGACY_REDIRECTS);
    expect(redirects.every((r) => r.permanent)).toBe(true);
    expect(redirects.some((r) => r.source in asMap && r.destination in asMap)).toBe(false);
    expect(rewrites).toBeUndefined();
  });

  it("sitemap é gerado a partir da fonte única de rotas", () => {
    expect(SITE_ROUTES.map((r) => r.path)).toEqual(canonicalPaths);

    const sitemap = buildSitemapXml(SITE_ROUTES);
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    const expected = canonicalPaths.map((p) => `https://epmdevtech.com.br${p}`);

    expect(locs.sort()).toEqual(expected.sort());
    expect(sitemap).not.toContain("<lastmod>");
  });

  it("prerender.js gera as rotas em inglês a partir da fonte única", () => {
    expect(PRERENDER_ROUTES.map((r) => r.path)).toEqual(canonicalPaths.filter((p) => p !== "/"));
  });

  it("llms.txt e llms-full.txt referenciam URLs canônicas novas", () => {
    for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
      const content = readRoot(file);
      for (const p of canonicalPaths.filter((r) => r !== "/")) {
        expect(content).toContain(`https://epmdevtech.com.br${p}`);
      }
      for (const legacy of Object.keys(LEGACY_REDIRECTS)) {
        expect(content).not.toContain(`https://epmdevtech.com.br${legacy}`);
      }
    }
  });
});
