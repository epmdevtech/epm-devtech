import { test, expect } from '@playwright/test';

test.describe('Hero Visual Identity & Token Locks (SPEC-059 Section 0.1)', () => {
  const modes = ['dark', 'light'] as const;

  for (const mode of modes) {
    test(`Valida travas estritas de tokens e ausência de gradientes em modo ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      if (mode === 'light') {
        await page.evaluate(() => {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        });
        await page.waitForTimeout(300);
      } else {
        await page.evaluate(() => {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        });
        await page.waitForTimeout(300);
      }

      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();

      // 1. Ausência absoluta de gradientes em todos os elementos do Hero
      const gradientCheck = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero');
        if (!heroEl) return { hasGradient: false, violators: [] };

        const allElements = [heroEl, ...Array.from(heroEl.querySelectorAll('*'))];
        const violators: string[] = [];

        for (const el of allElements) {
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

      expect(gradientCheck.hasGradient, `Elementos com gradiente detectados: ${gradientCheck.violators.join(', ')}`).toBe(false);

      // 2. Validação de cores, tipografia e raios computados
      const computedHeroStyles = await page.evaluate(() => {
        const heroEl = document.querySelector('#hero')!;
        const h1El = heroEl.querySelector('#hero-title')!;
        const subheadlineEl = heroEl.querySelector('p')!;
        const eyebrowEl = heroEl.querySelector('[data-testid="hero-eyebrow"]')!;
        const buttonEl = heroEl.querySelector('a[href="/contato"], a[href="#contato"]')!;
        const linkEl = heroEl.querySelector('a[href="/servicos"], a[href="#servicos"], a[href="#sobre"]')!;
        const dividerLineEl = (heroEl.querySelector('[data-testid="hero-divider-line"]') ||
                               heroEl.querySelector('.w-full.border-t.border-border'))!;
        const nodeDotEl = heroEl.querySelector('.rounded-full.bg-primary')!;

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
          dividerLine: {
            borderColor: window.getComputedStyle(dividerLineEl).borderTopColor,
          },
          nodeDot: {
            bgColor: window.getComputedStyle(nodeDotEl).backgroundColor,
            borderRadius: window.getComputedStyle(nodeDotEl).borderRadius,
          },
        };
      });

      // Validação das superfícies e cores conforme tokens do inventário
      if (mode === 'dark') {
        // Dark background #121212 = rgb(18, 18, 18)
        expect(computedHeroStyles.hero.bgColor).toBe('rgb(18, 18, 18)');
        // H1 text #ffffff = rgb(255, 255, 255)
        expect(computedHeroStyles.h1.color).toBe('rgb(255, 255, 255)');
        // Subheadline text-muted-foreground rgb(148, 163, 184) / zinc-400 rgb(161, 161, 170)
        expect(computedHeroStyles.subheadline.color).toMatch(/rgb\((148|161),\s*(163|161),\s*(184|170)\)/);
        // Eyebrow mono font
        expect(computedHeroStyles.eyebrow.fontFamily.toLowerCase()).toMatch(/(geist mono|jetbrains mono|fira code|consolas|monospace)/);
        // Primary button verde esmeralda: hsl(158, 64%, 42%) -> rgb(39, 176, 125)
        expect(computedHeroStyles.button.bgColor).toMatch(/rgb\((16|23|38|39),\s*(160|161|163|175|176|177|185),\s*(110|111|114|124|125|129)\)/);
        expect(computedHeroStyles.button.color).toBe('rgb(255, 255, 255)');
        expect(computedHeroStyles.button.borderRadius).toBe('6px');
        // Border token dark rgb(30, 41, 59)
        expect(computedHeroStyles.dividerLine.borderColor).toBe('rgb(30, 41, 59)');
        // Node dot em esmeralda sólido e 100% arredondado
        expect(computedHeroStyles.nodeDot.bgColor).toMatch(/rgb\((16|23|38|39),\s*(160|161|163|175|176|177|185),\s*(110|111|114|124|125|129)\)/);
        expect(computedHeroStyles.nodeDot.borderRadius).toBe('9999px');
      } else {
        // Light background #ffffff = rgb(255, 255, 255)
        expect(computedHeroStyles.hero.bgColor).toBe('rgb(255, 255, 255)');
        // H1 text rgb(2, 8, 23)
        expect(computedHeroStyles.h1.color).toBe('rgb(2, 8, 23)');
        // Subheadline rgb(81, 94, 113) / zinc-600 rgb(82, 82, 91)
        expect(computedHeroStyles.subheadline.color).toMatch(/rgb\((81|82),\s*(94|82),\s*(113|91)\)/);
        // Primary button esmeralda sólido: hsl(158, 75%, 36%) -> rgb(23, 161, 110)
        expect(computedHeroStyles.button.bgColor).toMatch(/rgb\((16|23|38|39),\s*(160|161|163|175|176|177|185),\s*(110|111|114|124|125|129)\)/);
        expect(computedHeroStyles.button.color).toBe('rgb(255, 255, 255)');
        expect(computedHeroStyles.button.borderRadius).toBe('6px');
        // Border token light rgb(226, 232, 240)
        expect(computedHeroStyles.dividerLine.borderColor).toBe('rgb(226, 232, 240)');
        // Node dot em esmeralda sólido
        expect(computedHeroStyles.nodeDot.bgColor).toMatch(/rgb\((16|23|38|39),\s*(160|161|163|175|176|177|185),\s*(110|111|114|124|125|129)\)/);
        expect(computedHeroStyles.nodeDot.borderRadius).toBe('9999px');
      }
    });
  }
});
