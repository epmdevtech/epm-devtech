import { test, expect } from "@playwright/test";

const ARTICLE_TITLE =
  "PHP2Shell: duas vulnerabilidades críticas no PHP exigem atenção imediata";
const ARTICLE_PATH = "/blog/php2shell-vulnerabilidades-criticas-php";

test.describe("Blog — build de produção", () => {
  test("HTML inicial de /blog contém listagem, H1 e link do artigo", async ({ request }) => {
    const response = await request.get("/blog");
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain("<title>Blog Técnico | EPM DevTech</title>");
    expect(html).toContain("Blog técnico");
    expect(html).toContain(ARTICLE_PATH);
    expect(html).toContain("PHP2Shell");
    expect(html).not.toContain("opacity:0");
    expect(html).not.toContain('aria-hidden="true"');
  });

  test("HTML inicial do artigo contém corpo, canonical, OG article e BlogPosting", async ({
    request,
  }) => {
    const response = await request.get(ARTICLE_PATH);
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain(`<title>${ARTICLE_TITLE} | Blog EPM DevTech</title>`);
    expect(html).toContain('rel="canonical"');
    expect(html).toContain(
      'href="https://epmdevtech.com.br/blog/php2shell-vulnerabilidades-criticas-php"'
    );
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain('property="article:published_time"');
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).toContain("O que é o PHP2Shell");
    expect(html).toContain('class="article-prose"');
    expect(html).not.toContain("opacity:0");
    expect(html).not.toContain('aria-hidden="true"');
  });

  test("slug de artigo inexistente retorna HTTP 404 real", async ({ request, page }) => {
    const response = await request.get("/blog/slug-inexistente");
    expect(response.status()).toBe(404);

    const pageResponse = await page.goto("/blog/slug-inexistente");
    expect(pageResponse?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText("Página não encontrada");
    await expect(page.locator('meta[name="robots"]').last()).toHaveAttribute(
      "content",
      "noindex, nofollow"
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("sitemap inclui /blog e o artigo com lastmod real", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const xml = await response.text();
    expect(xml).toContain("https://epmdevtech.com.br/blog</loc>");
    expect(xml).toContain("https://epmdevtech.com.br/blog/php2shell-vulnerabilidades-criticas-php</loc>");
    expect(xml).toContain("<lastmod>2026-10-22</lastmod>");
  });

  test("mobile e teclado navegam da listagem para o artigo", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/blog");

    await expect(page.locator("h1")).toHaveText("Blog técnico");

    const articleLink = page.getByRole("link", {
      name: `Ler artigo: ${ARTICLE_TITLE}`,
    });
    await articleLink.scrollIntoViewIfNeeded();
    await articleLink.focus();
    await page.keyboard.press("Enter");

    await page.waitForURL(`**${ARTICLE_PATH}`);
    await expect(page.locator("h1")).toHaveText(ARTICLE_TITLE);
    await expect(page.locator(".article-prose")).toContainText(
      "O que é o PHP2Shell"
    );
    await expect(page.locator(".article-prose pre").first()).toHaveAttribute(
      "tabindex",
      "0"
    );
  });
});
