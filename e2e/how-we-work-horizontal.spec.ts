import { test, expect } from '@playwright/test';

/**
 * E2E — Scroll horizontal nativo da rota /how-we-work (SPEC-117)
 * Valida: acesso direto, H1 único, 4 etapas, progressão do scroll horizontal,
 * retorno ao fluxo vertical, ausência de overflow horizontal, fallback em
 * movimento reduzido e em viewport mobile.
 */
test.describe('How We Work — Scroll Horizontal (SPEC-117)', () => {
  test('acesso direto: H1 único e as 4 etapas presentes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/how-we-work');
    await page.waitForLoadState('domcontentloaded');

    await expect(page).toHaveTitle('Como Trabalhamos | EPM DevTech');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1').first()).toContainText('Como trabalhamos');

    const track = page.locator('ol.hwwh__track');
    await expect(track).toBeVisible();
    await expect(track.locator(':scope > li')).toHaveCount(4);

    for (const title of [
      'Diagnóstico inicial',
      'Escopo e entregáveis',
      'Entregas incrementais',
      'Sustentação e melhoria',
    ]) {
      await expect(
        track.getByRole('heading', { name: new RegExp(title, 'i') })
      ).toBeAttached();
    }
  });

  test('progressão horizontal, retorno ao fluxo vertical e sem overflow horizontal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/how-we-work');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('ol.hwwh__track')).toBeVisible();

    const geometry = await page.evaluate(() => {
      const el = document.querySelector('.hwwh') as HTMLElement | null;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height };
    });
    expect(geometry).not.toBeNull();

    const readTranslateX = () =>
      page.evaluate(() => {
        const el = document.querySelector('ol.hwwh__track') as HTMLElement | null;
        if (!el) return null;
        const transform = getComputedStyle(el).transform;
        if (!transform || transform === 'none') return 0;
        return new DOMMatrixReadOnly(transform).m41;
      });

    const assertNoHorizontalOverflow = async () => {
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(2);
    };

    // 1. Topo: seção ainda abaixo da dobra, sem deslocamento horizontal
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    expect(Math.abs((await readTranslateX()) ?? 0)).toBeLessThan(2);
    await assertNoHorizontalOverflow();

    // 2. Meio da seção: deslocamento horizontal negativo (painéis deslizam)
    const midY = geometry!.top + geometry!.height / 2;
    await page.evaluate((y) => window.scrollTo(0, y), midY);
    await page.waitForTimeout(450);
    const midTranslateX = await readTranslateX();
    expect(midTranslateX ?? 0).toBeLessThan(-50);
    await assertNoHorizontalOverflow();

    // 3. Fim da seção: o fluxo vertical retoma e o manifesto fica visível
    const endY = geometry!.top + geometry!.height + 150;
    await page.evaluate((y) => window.scrollTo(0, y), endY);
    await page.waitForTimeout(450);
    await expect(page.getByText('Previsibilidade do início ao fim')).toBeVisible();
    await expect(page.getByText('Sem intermediários, sem ruído')).toBeVisible();
    await assertNoHorizontalOverflow();
  });

  test('CTA final aponta para o mecanismo de contato existente', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/how-we-work');
    await page.waitForLoadState('domcontentloaded');

    const cta = page.locator('a[href="/contact"]', { hasText: 'Falar sobre meu projeto' });
    await expect(cta.first()).toBeVisible();
  });

  test.describe('fallback em movimento reduzido', () => {
    test.use({ reducedMotion: 'reduce' });

    test('exibe os passos em sequência vertical sem animação', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/how-we-work');
      await page.waitForLoadState('domcontentloaded');

      const track = page.locator('ol.hwwh__track');
      await expect(track).toBeVisible();

      const flexDirection = await track.evaluate(
        (el) => getComputedStyle(el).flexDirection
      );
      expect(flexDirection).toBe('column');

      for (const title of [
        'Diagnóstico inicial',
        'Escopo e entregáveis',
        'Entregas incrementais',
        'Sustentação e melhoria',
      ]) {
        await expect(
          track.getByRole('heading', { name: new RegExp(title, 'i') })
        ).toBeVisible();
      }
    });
  });

  test('mobile: layout vertical legível sem overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/how-we-work');
    await page.waitForLoadState('domcontentloaded');

    const track = page.locator('ol.hwwh__track');
    await expect(track).toBeVisible();

    const flexDirection = await track.evaluate((el) => getComputedStyle(el).flexDirection);
    expect(flexDirection).toBe('column');

    for (const title of [
      'Diagnóstico inicial',
      'Escopo e entregáveis',
      'Entregas incrementais',
      'Sustentação e melhoria',
    ]) {
      await expect(
        track.getByRole('heading', { name: new RegExp(title, 'i') })
      ).toBeVisible();
    }

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(2);
  });
});
