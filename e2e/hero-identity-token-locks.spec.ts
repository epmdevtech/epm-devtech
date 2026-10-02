import { test, expect } from '@playwright/test';

test.describe('Hero Visual Identity & Token Locks (SPEC-059, SPEC-068 & SPEC-069)', () => {
  const modes = ['dark', 'light'] as const;

  for (const mode of modes) {
    test(`Valida travas estritas de tokens e ausência de gradientes em modo ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      if (mode === 'light') {
        const lightThemeButton = page.locator('button[title="Tema Light"]');
        if (await lightThemeButton.isVisible()) {
          await lightThemeButton.click();
        } else {
          await page.evaluate(() => {
            window.localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          });
        }
        await page.waitForTimeout(500);
      } else {
        const darkThemeButton = page.locator('button[title="Tema Dark"]');
        if (await darkThemeButton.isVisible()) {
          await darkThemeButton.click();
        } else {
          await page.evaluate(() => {
            window.localStorage.setItem('theme', 'dark');
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
          });
        }
        await page.waitForTimeout(500);
      }

      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();

      // 1. Ausência absoluta de text-gradients artificiais em elementos tipográficos do Hero
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

      // 2. Validação da estrutura minimalista, fullscreen e remoção de badges (SPEC-069)
      const structureCheck = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero')!;
        const hasDivider = !!heroEl.querySelector('[data-testid="hero-divider-line"]');
        const eyebrowEl = heroEl.querySelector('[data-testid="hero-eyebrow"]')!;
        const isEyebrowBadgeFree = !eyebrowEl.classList.contains('rounded-full') && !eyebrowEl.classList.contains('border');
        const isFullscreen = heroEl.classList.contains('min-h-screen') || heroEl.classList.contains('min-h-[100svh]');
        const hasSubheadline = !!heroEl.querySelector('p');
        return { hasDivider, isEyebrowBadgeFree, isFullscreen, hasSubheadline };
      });

      expect(structureCheck.hasDivider, 'Linha divisória horizontal inferior deve estar removida').toBe(false);
      expect(structureCheck.isEyebrowBadgeFree, 'Eyebrow deve ser tipografia limpa sem badge ao redor (SPEC-069)').toBe(true);
      expect(structureCheck.isFullscreen, 'Hero deve possuir classes de altura total min-h-screen/min-h-[100svh] (SPEC-069)').toBe(true);
      expect(structureCheck.hasSubheadline, 'Subheadline editorial de proposta de valor deve estar presente (SPEC-086/SPEC-092)').toBe(true);

      // 3. Validação de cores, tipografia e raios computados
      const computedHeroStyles = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero')!;
        const h1El = heroEl.querySelector('#hero-title')!;
        const eyebrowEl = heroEl.querySelector('[data-testid="hero-eyebrow"]')!;
        const buttonEl = heroEl.querySelector('a[href="/contato"], a[href="#contato"]')!;
        const linkEl = heroEl.querySelector('a[href^="/servicos"], a[href="#servicos"], a[href="#sobre"]');
        const activeNodeEl = (heroEl.querySelector('.animate-pulse') || heroEl.querySelector('.rounded-full.bg-brand'))!;

        return {
          hero: {
            bgColor: window.getComputedStyle(heroEl).backgroundColor,
          },
          h1: {
            color: window.getComputedStyle(h1El).color,
            fontFamily: window.getComputedStyle(h1El).fontFamily,
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
            color: linkEl ? window.getComputedStyle(linkEl).color : '',
          },
          nodeDot: {
            bgColor: window.getComputedStyle(activeNodeEl).backgroundColor,
            borderRadius: window.getComputedStyle(activeNodeEl).borderRadius,
          },
        };
      });

      // Validação das superfícies e cores conforme tokens SPEC-063 / SPEC-068 / SPEC-069
      if (mode === 'dark') {
        // Dark background #0A0F10 = rgb(10, 15, 16)
        expect(computedHeroStyles.hero.bgColor).toBe('rgb(10, 15, 16)');
        // H1 text #F2F7F7 = rgb(242, 247, 247)
        expect(computedHeroStyles.h1.color).toBe('rgb(242, 247, 247)');
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
        // Light background surface-anchor rgb(229, 236, 237)
        expect(computedHeroStyles.hero.bgColor).toMatch(/rgb\(229,\s*(236|237),\s*(237|238)\)/);
        // H1 text #0A0F10 = rgb(10, 15, 16)
        expect(computedHeroStyles.h1.color).toBe('rgb(10, 15, 16)');
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
