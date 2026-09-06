import { test, expect } from '@playwright/test';

test.describe('EPM DEVTECH — Padronização Visual & Estabilidade', () => {

  test('Carregamento inicial estável sem duplicação de título nem recarga em loop', async ({ page }) => {
    let reloadCount = 0;
    page.on('load', () => {
      reloadCount++;
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verifica que o H1 do Hero está visível e correto
    const heroH1 = page.locator('#hero h1, section h1').first();
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('Soluções Digitais');
    await expect(heroH1).toContainText('Sob Medida');

    // Aguarda 3 segundos para confirmar que não há re-renderização ou reload disparado
    await page.waitForTimeout(3000);

    expect(reloadCount).toBe(1);

    // O scroll inicial deve estar no topo (Hero)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(150);
  });

  test('Títulos de todas as seções são rigorosamente monocromáticos (sem text-gradient)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Garante que nenhuma classe de gradiente em texto existe no DOM
    const gradientElements = page.locator('.text-gradient');
    const count = await gradientElements.count();
    expect(count).toBe(0);

    // Verifica que os headings de cada seção existem e contêm os textos padronizados
    const expectedHeadings = [
      { id: 'hero', text: 'Soluções Digitais' },
      { id: 'sobre', text: 'Engenharia de Software com' },
      { id: 'servicos', text: 'Soluções' },
      { id: 'tecnologias', text: 'Tecnologias' },
      { id: 'diferenciais', text: 'Por Que Escolher a' },
      { id: 'autoridade', text: 'Autoridade Técnica que' },
      { id: 'contato', text: 'Vamos Construir' },
    ];

    for (const item of expectedHeadings) {
      // Rola até a seção para lazy loading montar
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, item.id);

      await page.waitForTimeout(500);

      const heading = page.locator(`#${item.id} h1, #${item.id} h2`).first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(item.text);
    }
  });

  test('Cor principal de destaque utiliza o verde da marca EPM DEVTECH (#10b981 / emerald)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // CTA principal do Hero
    const ctaButton = page.locator('a[href="#servicos"]').filter({ hasText: /Conheça os Serviços/i });
    await expect(ctaButton).toBeVisible();

    const ctaBgColor = await ctaButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Verde esmeralda oficial (#10B981 / hsl(158 64% 42%)) — formato rgb(39, 176, 125) ou rgb(16, 185, 129)
    expect(ctaBgColor).toMatch(/rgb\((16|24|26|39),\s*(185|155|160|176),\s*(129|107|112|125)\)/);
  });

  test('Navegação e rolagem fluida por âncoras sem salto para o Hero', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Clica no CTA "Conheça os Serviços"
    const ctaButton = page.locator('a[href="#servicos"]').filter({ hasText: /Conheça os Serviços/i });
    await ctaButton.click();

    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400);

    const servicosSection = page.locator('#servicos');
    await expect(servicosSection).toBeVisible();
  });

  test('TechConstellation renderiza grafo de tecnologias com interação de hover e foco', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Rola até a seção de tecnologias
    await page.evaluate(() => {
      const el = document.getElementById('tecnologias');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });

    await page.waitForTimeout(600);

    const constellation = page.locator('[data-testid="tech-constellation"]');
    await expect(constellation).toBeVisible();

    // Valida a presença de nós chaves da constelação
    const reactNode = page.locator('[data-testid="tech-node-React"]');
    await expect(reactNode).toBeVisible();

    // Valida ativação por foco via teclado (acessibilidade)
    await reactNode.focus();
    await page.waitForTimeout(200);
    await expect(reactNode).toHaveAttribute('data-active', 'true');

    // Valida foco e ativação em outro nó do cluster
    const nodejsNode = page.locator('[data-testid="tech-node-Node.js"]');
    await nodejsNode.focus();
    await page.waitForTimeout(200);
    await expect(nodejsNode).toHaveAttribute('data-active', 'true');
  });

  test('TechConstellation exibe painel de detalhes interativo com nome e conexões ao interagir com nós', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Rola até a seção de tecnologias
    await page.evaluate(() => {
      const el = document.getElementById('tecnologias');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });

    const constellation = page.locator('[data-testid="tech-constellation"]');
    await expect(constellation).toBeVisible();

    const detailsPanel = page.locator('[data-testid="tech-details-panel"]');
    await expect(detailsPanel).toBeVisible();
    await expect(detailsPanel).toContainText('Exploração Interativa do Grafo');

    // Clica no nó React (com force: true devido à animação de flutuação contínua)
    const reactNode = page.locator('[data-testid="tech-node-React"]');
    await reactNode.click({ force: true });

    await expect(detailsPanel).toContainText('React');
    await expect(detailsPanel).toContainText('Frontend');
    await expect(detailsPanel).toContainText('Node.js');
  });

  test('Logotipo adapta-se perfeitamente entre Dark e Light Mode sem container escuro artificial', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Valida estado inicial (Dark Mode por padrão)
    const headerLogoDark = page.locator('header img[src*="logo-emp-dev-tech-xs.webp"]');
    const headerLogoLight = page.locator('header img[src*="logo-epm-devtech-light-xs.webp"]');

    await expect(headerLogoDark).toBeVisible();
    await expect(headerLogoLight).toBeHidden();

    // Rola até o Footer para interagir com o Theme Switcher
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(600);

    const lightThemeButton = page.locator('button[title="Tema Light"]');
    await expect(lightThemeButton).toBeVisible();
    await lightThemeButton.click();

    // Aguarda aplicação da classe no <html>
    await page.waitForTimeout(400);

    // 2. Valida estado em Light Mode: logo light visível, logo dark oculto
    await expect(headerLogoLight).toBeVisible();
    await expect(headerLogoDark).toBeHidden();

    // Garante ausência total da classe bg-gray-900 no container do logo no header
    const logoContainer = page.locator('header a div div div').first();
    const containerClasses = await logoContainer.getAttribute('class');
    expect(containerClasses).not.toContain('bg-gray-900');

    // 3. Retorna para Dark Mode
    const darkThemeButton = page.locator('button[title="Tema Dark"]');
    await darkThemeButton.click();
    await page.waitForTimeout(400);

    await expect(headerLogoDark).toBeVisible();
    await expect(headerLogoLight).toBeHidden();
  });

});

