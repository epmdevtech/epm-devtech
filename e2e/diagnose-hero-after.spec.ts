import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Hero Diagnostic After Redesign (SPEC-059)', () => {
  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '390x844', width: 390, height: 844 },
    { name: '320x640', width: 320, height: 640 },
  ];

  interface DiagnosticResult {
    viewport: string;
    width: number;
    viewportHeight: number;
    heroHeight: number;
    viewportRatioPercent: number;
    servicosTop: number | null;
    servicosVisibleAboveFold: boolean;
  }

  const results: DiagnosticResult[] = [];

  for (const vp of viewports) {
    test(`Mede altura e captura evidência pós-redesign em ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(500);

      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();

      const heroBox = await hero.boundingBox();
      const servicos = page.locator('#servicos');
      const servicosBox = await servicos.boundingBox();

      const heroHeight = heroBox ? heroBox.height : 0;
      const vpRatio = heroBox ? (heroBox.height / vp.height) * 100 : 0;
      const servicosVisibleAboveFold = servicosBox ? servicosBox.y < vp.height : false;

      results.push({
        viewport: vp.name,
        width: vp.width,
        viewportHeight: vp.height,
        heroHeight: Math.round(heroHeight),
        viewportRatioPercent: Math.round(vpRatio * 10) / 10,
        servicosTop: servicosBox ? Math.round(servicosBox.y) : null,
        servicosVisibleAboveFold,
      });

      // Dark mode screenshot do Hero
      await page.screenshot({
        path: `docs/evidence/hero-after/hero-${vp.name}-dark.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(Math.max(vp.height, Math.round(heroHeight) + 60), 800) },
      });

      if (vp.name === '1440x900') {
        // Captura da primeira dobra completa (Hero + Serviços visível)
        await page.screenshot({
          path: `docs/evidence/hero-after/viewport-fold-1440x900-dark.png`,
          clip: { x: 0, y: 0, width: 1440, height: 900 },
        });

        // Captura combinada Hero + início de Serviços
        await page.screenshot({
          path: `docs/evidence/hero-after/hero-and-services-coherence-1440x900-dark.png`,
          clip: { x: 0, y: 0, width: 1440, height: 850 },
        });
      }

      // Light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      });
      await page.waitForTimeout(300);

      await page.screenshot({
        path: `docs/evidence/hero-after/hero-${vp.name}-light.png`,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(Math.max(vp.height, Math.round(heroHeight) + 60), 800) },
      });

      if (vp.name === '1440x900') {
        await page.screenshot({
          path: `docs/evidence/hero-after/viewport-fold-1440x900-light.png`,
          clip: { x: 0, y: 0, width: 1440, height: 900 },
        });

        await page.screenshot({
          path: `docs/evidence/hero-after/hero-and-services-coherence-1440x900-light.png`,
          clip: { x: 0, y: 0, width: 1440, height: 850 },
        });
      }
    });
  }

  test.afterAll(async () => {
    const outPath = path.resolve('docs/hero-diagnosis-after.json');
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
    console.log('Saved post-redesign diagnosis results to:', outPath);
  });
});
