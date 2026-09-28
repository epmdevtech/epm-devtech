import { test, expect } from '@playwright/test';

test.describe('Hero Visual & Responsiveness Validation (SPEC-045)', () => {
  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1280x800', width: 1280, height: 800 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x640', width: 320, height: 640 },
  ];

  for (const vp of viewports) {
    test(`Renderiza sem overflow horizontal em ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();

      // Aguarda conclusão das micro-animações de entrada
      await page.waitForTimeout(600);

      // Verifica ausência de overflow horizontal
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(overflow).toBe(false);

      // Captura screenshot do Hero
      await page.screenshot({
        path: `screenshots/hero-${vp.name}-dark.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 1000) },
      });
    });
  }

  test('Renderiza perfeitamente no Modo Claro (Light Mode)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Alterna para o modo claro se houver alternador ou classe
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.waitForTimeout(400);

    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    await page.screenshot({
      path: `screenshots/hero-1440x900-light.png`,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
  });
});
