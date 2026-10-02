import { test, expect } from '@playwright/test';

test.describe('Hero Visual Identity & Token Locks (SPEC-059 & SPEC-068)', () => {
  const modes = ['dark', 'light'] as const;

  for (const mode of modes) {
    test(`Valida travas estritas de tokens e ausência de gradientes em modo ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      if (mode === 'light') {
        await page.evaluate(() => {
          document.documentElement.setAttribute('data-theme', 'light');
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        });
        await page.waitForTimeout(300);
      } else {
        await page.evaluate(() => {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        });
        await page.waitForTimeout(300);
      }

      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();

      // 1. Ausência absoluta de text-gradients artificiais em elementos tipográficos do Hero (SPEC-059 / SPEC-068)
      const gradientCheck = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero');
        if (!heroEl) return { hasGradient: false, violators: [] };

        const textElements = Array.from(heroEl.querySelectorAll('h1, p, a, [data-testid="hero-eyebrow"]'));
        const violators: string[] = [];

        for (const el of textElements) {
          const style = window.getComputedStyle(el);
          const bgImg = style.backgroundImage || '';
          const maskImg = (style as unknown as { maskImage?: string; webkitMaskImage?: string }).maskImage ||
                          (style as unknown as { webkitMaskImage?: string }).webkitMaskImage || '';

          if (bgImg.includes('gradient(') || maskImg.includes('gradient(')) {
            violators.push(`${el.tagName}.${el.className} [bg: ${bgImg}, mask: ${maskImg}]`);
          }
        }

        return {
          hasGradient: violators.length > 0,
          violators,
        };
      });

      expect(gradientCheck.hasGradient, `Elementos tipográficos com gradiente detectados: ${gradientCheck.violators.join(', ')}`).toBe(false);

      // 2. Validação da remoção da divisória artificial e presença do indicador de status ativo (SPEC-068)
      const structureCheck = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero')!;
        const hasDivider = !!heroEl.querySelector('[data-testid="hero-divider-line"]');
        const hasActiveIndicator = !!heroEl.querySelector('.animate-ping');
        return { hasDivider, hasActiveIndicator };
      });

      expect(structureCheck.hasDivider, 'Linha divisória horizontal inferior deve estar removida (SPEC-068)').toBe(false);
      expect(structureCheck.hasActiveIndicator, 'Indicador operacional ativo deve estar presente (SPEC-068)').toBe(true);

      // 3. Validação de cores, tipografia e raios computados
      const computedHeroStyles = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero')!;
        const h1El = heroEl.querySelector('#hero-title')!;
        const subheadlineEl = heroEl.querySelector('p')!;
        const eyebrowEl = heroEl.querySelector('[data-testid="hero-eyebrow"]')!;
        const buttonEl = heroEl.querySelector('a[href="/contato"], a[href="#contato"]')!;
        const linkEl = heroEl.querySelector('a[href="/servicos"], a[href="#servicos"], a[href="#sobre"]')!;
        const activeNodeEl = (heroEl.querySelector('.animate-ping') || heroEl.querySelector('.rounded-full.bg-brand'))!;

        return {
          hero: {
            bgColor: window.getComputedStyle(heroEl).backgroundColor,
          },
          h1: {
            color: window.getComputedStyle(h1El).color,
            fontFamily: window.getComputedStyle(h1El).fontFamily,
          },
          subheadline: {
            color: window.getComputedStyle(subheadlineEl).color,
          },
          eyebrow: {
            color: window.getComputedStyle(eyebrowEl).color,
            fontFamily: window.getComputedStyle(eyebrowEl).fontFamily,
          },
          button: {
            bgColor: window.getComputedStyle(buttonEl).backgroundColor,
            color: window.getComputedStyle(buttonEl).color,
            borderRadius: window.getComputedStyle(buttonEl).borderRadius,
          },
          link: {
            color: window.getComputedStyle(linkEl).color,
          },
          nodeDot: {
            bgColor: window.getComputedStyle(activeNodeEl).backgroundColor,
            borderRadius: window.getComputedStyle(activeNodeEl).borderRadius,
          },
        };
      });

      // Validação das superfícies e cores conforme tokens SPEC-063 / SPEC-068
      if (mode === 'dark') {
        // Dark background #0A0F10 = rgb(10, 15, 16)
        expect(computedHeroStyles.hero.bgColor).toBe('rgb(10, 15, 16)');
        // H1 text #F2F7F7 = rgb(242, 247, 247)
        expect(computedHeroStyles.h1.color).toBe('rgb(242, 247, 247)');
        // Subheadline text-secondary rgb(157, 176, 179)
        expect(computedHeroStyles.subheadline.color).toBe('rgb(157, 176, 179)');
        // Eyebrow mono font
        expect(computedHeroStyles.eyebrow.fontFamily.toLowerCase()).toMatch(/(geist mono|jetbrains mono|fira code|consolas|monospace)/);
        // Primary button brand teal: #2DD4BF -> rgb(45, 212, 191)
        expect(computedHeroStyles.button.bgColor).toBe('rgb(45, 212, 191)');
        // Text on brand: #04201C -> rgb(4, 32, 28)
        expect(computedHeroStyles.button.color).toBe('rgb(4, 32, 28)');
        expect(computedHeroStyles.button.borderRadius).toBe('6px');
        // Node dot em teal brand sólido e 100% arredondado
        expect(computedHeroStyles.nodeDot.bgColor).toBe('rgb(45, 212, 191)');
        expect(computedHeroStyles.nodeDot.borderRadius).toBe('9999px');
      } else {
        // Light background #F6FAFA = rgb(246, 250, 250)
        expect(computedHeroStyles.hero.bgColor).toBe('rgb(246, 250, 250)');
        // H1 text #0A0F10 = rgb(10, 15, 16)
        expect(computedHeroStyles.h1.color).toBe('rgb(10, 15, 16)');
        // Subheadline text-secondary rgb(63, 85, 88)
        expect(computedHeroStyles.subheadline.color).toBe('rgb(63, 85, 88)');
        // Primary button brand teal: #2DD4BF -> rgb(45, 212, 191)
        expect(computedHeroStyles.button.bgColor).toBe('rgb(45, 212, 191)');
        // Text on brand: #04201C -> rgb(4, 32, 28)
        expect(computedHeroStyles.button.color).toBe('rgb(4, 32, 28)');
        expect(computedHeroStyles.button.borderRadius).toBe('6px');
        // Node dot em teal brand sólido
        expect(computedHeroStyles.nodeDot.bgColor).toBe('rgb(45, 212, 191)');
        expect(computedHeroStyles.nodeDot.borderRadius).toBe('9999px');
      }
    });
  }
});
