import { test, expect } from '@playwright/test';

test.describe('EPM DEVTECH — Arquitetura de Informação Multi-Rota (SPEC-060)', () => {

  const CANONICAL_ROUTES = [
    {
      path: '/',
      expectedTitle: 'EPM DevTech | Software House e Desenvolvimento de Software Sob Medida',
      expectedH1: 'Engenharia de software para construir, integrar e evoluir sistemas.',
      canonicalUrl: 'https://epmdevtech.com.br/',
    },
    {
      path: '/servicos',
      expectedTitle: 'Serviços de Desenvolvimento de Software | EPM DevTech',
      expectedH1: 'Soluções sob medida para cada estágio da sua operação',
      canonicalUrl: 'https://epmdevtech.com.br/servicos',
    },
    {
      path: '/como-trabalhamos',
      expectedTitle: 'Como Trabalhamos | EPM DevTech',
      expectedH1: 'Como trabalhamos',
      canonicalUrl: 'https://epmdevtech.com.br/como-trabalhamos',
    },
    {
      path: '/experiencia',
      expectedTitle: 'Experiência em Projetos Reais | EPM DevTech',
      expectedH1: 'Experiência em projetos reais',
      canonicalUrl: 'https://epmdevtech.com.br/experiencia',
    },
    {
      path: '/engenharia',
      expectedTitle: 'Engenharia e Tecnologias | EPM DevTech',
      expectedH1: 'Engenharia pensada para evoluir',
      canonicalUrl: 'https://epmdevtech.com.br/engenharia',
    },
    {
      path: '/sobre',
      expectedTitle: 'Sobre a EPM DevTech | Software House em Toledo, PR',
      expectedH1: 'Sobre a EPM DevTech',
      canonicalUrl: 'https://epmdevtech.com.br/sobre',
    },
    {
      path: '/contato',
      expectedTitle: 'Fale Sobre Seu Projeto | EPM DevTech',
      expectedH1: 'Fale sobre seu projeto',
      canonicalUrl: 'https://epmdevtech.com.br/contato',
    },
    {
      path: '/duvidas-frequentes',
      expectedTitle: 'Dúvidas Frequentes | EPM DevTech',
      expectedH1: 'Dúvidas frequentes',
      canonicalUrl: 'https://epmdevtech.com.br/duvidas-frequentes',
    },
  ];

  for (const route of CANONICAL_ROUTES) {
    test(`Rota ${route.path}: Carrega com F5 direto, H1 único e metadados canônicos`, async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('domcontentloaded');

      // 1. Validação de Title da página
      await expect(page).toHaveTitle(route.expectedTitle);

      // 2. Validação de Canonical URL
      const canonical = page.locator('link[rel="canonical"]').last();
      await expect(canonical).toHaveAttribute('href', route.canonicalUrl);

      // 3. Validação de Meta Description
      const description = page.locator('meta[name="description"]').last();
      const descContent = await description.getAttribute('content');
      expect(descContent).toBeTruthy();
      expect(descContent!.length).toBeGreaterThan(20);

      // 4. Validação de exatamente 1 tag H1 por rota
      const h1Elements = page.locator('h1');
      await expect(h1Elements).toHaveCount(1);
      await expect(h1Elements.first()).toContainText(route.expectedH1);
    });
  }

  test('Header desktop renderiza menu enxuto com 5 links + 1 CTA em botão', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const nav = page.locator('header nav[aria-label="Navegação principal"]');
    await expect(nav).toBeVisible();

    const expectedLinks = [
      { text: 'Serviços', href: '/servicos' },
      { text: 'Como trabalhamos', href: '/como-trabalhamos' },
      { text: 'Experiência', href: '/experiencia' },
      { text: 'Engenharia', href: '/engenharia' },
      { text: 'Sobre', href: '/sobre' },
    ];

    for (const item of expectedLinks) {
      const link = nav.locator(`a[href="${item.href}"]`);
      await expect(link).toBeVisible();
      await expect(link).toContainText(item.text);
    }

    // Botão de Ação CTA único no Header
    const ctaButton = page.locator('header a[href="/contato"]').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Falar sobre meu projeto');

    // Ao clicar em um link, navega para a rota e marca aria-current="page"
    await nav.locator('a[href="/servicos"]').click();
    await page.waitForURL('**/servicos');
    const activeLink = nav.locator('a[href="/servicos"]');
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  test('Menu mobile: Abre gaveta, fecha com Escape e navega para rota', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const menuButton = page.locator('header button[aria-label="Abrir menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const drawer = page.locator('#mobile-navigation');
    await expect(drawer).toBeVisible();

    // Fecha pressionando Escape
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();

    // Reabre e navega
    await menuButton.click();
    await expect(drawer).toBeVisible();

    const mobileLink = drawer.locator('a[href="/como-trabalhamos"]');
    await mobileLink.click();
    await page.waitForURL('**/como-trabalhamos');
    await expect(drawer).toBeHidden();
  });

  test('Redirecionamento de hashes legados na home para novas rotas', async ({ page }) => {
    await page.goto('/#servicos');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL('**/servicos');
    expect(page.url()).toContain('/servicos');
  });

  test('Página 404 em português com links de recuperação e noindex', async ({ page }) => {
    await page.goto('/rota-inexistente-1234');
    await page.waitForLoadState('domcontentloaded');

    const h1 = page.locator('h1');
    await expect(h1).toContainText('Página não encontrada');

    const noindex = page.locator('meta[name="robots"]').last();
    await expect(noindex).toHaveAttribute('content', 'noindex, nofollow');

    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink.first()).toBeVisible();

    const servicosLink = page.locator('a[href="/servicos"]');
    await expect(servicosLink.first()).toBeVisible();

    const contatoLink = page.locator('a[href="/contato"]');
    await expect(contatoLink.first()).toBeVisible();
  });

  test('Aviso ético de experiência profissional é exibido e declara não-clientes da EPM', async ({ page }) => {
    await page.goto('/experiencia');
    await page.waitForLoadState('domcontentloaded');

    const disclaimer = page.locator('text=Não são clientes da EPM DevTech');
    await expect(disclaimer).toBeVisible();

    // Projetos autorizados presentes
    await expect(page.locator('text=CAPES').first()).toBeVisible();
    await expect(page.getByText('ONS', { exact: true })).toBeVisible();
    await expect(page.locator('text=Energia Pecém').first()).toBeVisible();
  });
});
