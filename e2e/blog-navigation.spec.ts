import { test, expect } from "@playwright/test";

const ARTICLE_TITLE =
  "PHP2Shell: duas vulnerabilidades críticas no PHP exigem atenção imediata";
const ARTICLE_PATH = "/blog/php2shell-vulnerabilidades-criticas-php";

test.describe("Blog — navegação no cliente", () => {
  test("listagem /blog renderiza artigo e navega para o post", async ({ page }) => {
    await page.goto("/blog");

    await expect(page).toHaveTitle("Blog Técnico | EPM DevTech");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Blog técnico");
    await expect(
      page.getByRole("heading", { level: 2, name: ARTICLE_TITLE })
    ).toBeVisible();

    await page.getByRole("link", { name: `Ler artigo: ${ARTICLE_TITLE}` }).click();
    await page.waitForURL(`**${ARTICLE_PATH}`);

    await expect(page.locator("h1")).toHaveText(ARTICLE_TITLE);
    await expect(page.locator(".article-prose")).toContainText(
      "O que é o PHP2Shell"
    );
    await expect(
      page.getByRole("link", { name: "Voltar para o blog" })
    ).toBeVisible();
  });

  test("artigo mantém conteúdo, metadados e link externo seguro", async ({ page }) => {
    await page.goto(ARTICLE_PATH);

    await expect(page.locator("h1")).toHaveText(ARTICLE_TITLE);
    await expect(page.locator("time")).toHaveAttribute("datetime", "2026-10-22");
    await expect(page.locator(".article-prose")).toContainText("PHP2Shell");

    const externalLink = page.getByRole("link", {
      name: /PHP — Aviso oficial de segurança/,
    });
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");

    const canonical = page.locator('link[rel="canonical"]').last();
    await expect(canonical).toHaveAttribute(
      "href",
      "https://epmdevtech.com.br/blog/php2shell-vulnerabilidades-criticas-php"
    );
  });

  test("slug inexistente no cliente cai no 404 sem quebrar a navegação", async ({
    page,
  }) => {
    await page.goto("/blog/slug-inexistente");

    await expect(page.locator("h1")).toHaveText("Página não encontrada");
    await expect(
      page.getByRole("link", { name: /PÁGINA INICIAL/i })
    ).toBeVisible();
  });

  test("home exibe o carrossel do blog e navega para o artigo", async ({ page }) => {
    await page.goto("/");

    const section = page.locator("#blog");
    await expect(section.getByText("FIQUE POR DENTRO DE TUDO")).toBeVisible();
    await expect(
      section.getByRole("heading", { level: 2, name: /Notícias e análises/ })
    ).toBeVisible();

    await section
      .getByRole("link", { name: `Ler artigo: ${ARTICLE_TITLE}` })
      .click();

    await page.waitForURL(`**${ARTICLE_PATH}`);
    await expect(page.locator("h1")).toHaveText(ARTICLE_TITLE);
  });

  test("footer expõe o link para /blog", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog"
    );
  });
});
