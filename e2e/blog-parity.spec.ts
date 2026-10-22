import { test, expect, type Page } from "@playwright/test";

const BASE_URL = "http://localhost:5214";
const ARTICLE_PATH = "/blog/php2shell-vulnerabilidades-criticas-php";

function normalize(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

async function readPage(page: Page) {
  return page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent ?? null,
    description:
      document.querySelector('meta[name="description"]')?.getAttribute("content") ??
      null,
    canonical:
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    body: document.querySelector(".article-prose")?.textContent ?? null,
  }));
}

test.describe("Paridade HTML estático x React", () => {
  test("listagem /blog mantém título, H1, description e canonical", async ({
    page,
    browser,
  }) => {
    const staticContext = await browser.newContext({
      javaScriptEnabled: false,
      baseURL: BASE_URL,
    });
    const staticPage = await staticContext.newPage();
    const staticResponse = await staticPage.goto("/blog");
    expect(staticResponse?.status()).toBe(200);
    const staticData = await readPage(staticPage);
    await staticContext.close();

    await page.goto("/blog");
    await expect(page.locator("h1")).toHaveCount(1);
    const rendered = await readPage(page);

    expect(normalize(rendered.title)).toBe(normalize(staticData.title));
    expect(normalize(rendered.h1)).toBe(normalize(staticData.h1));
    expect(normalize(rendered.description)).toBe(normalize(staticData.description));
    expect(rendered.canonical).toBe(staticData.canonical);
  });

  test("artigo mantém H1, metadados e texto principal idênticos", async ({
    page,
    browser,
  }) => {
    const staticContext = await browser.newContext({
      javaScriptEnabled: false,
      baseURL: BASE_URL,
    });
    const staticPage = await staticContext.newPage();
    const staticResponse = await staticPage.goto(ARTICLE_PATH);
    expect(staticResponse?.status()).toBe(200);
    const staticData = await readPage(staticPage);
    await staticContext.close();

    await page.goto(ARTICLE_PATH);
    await expect(page.locator("h1")).toHaveCount(1);
    const rendered = await readPage(page);

    expect(normalize(rendered.title)).toBe(normalize(staticData.title));
    expect(normalize(rendered.h1)).toBe(normalize(staticData.h1));
    expect(normalize(rendered.description)).toBe(normalize(staticData.description));
    expect(rendered.canonical).toBe(staticData.canonical);
    expect(normalize(rendered.body)).toBe(normalize(staticData.body));
  });
});
