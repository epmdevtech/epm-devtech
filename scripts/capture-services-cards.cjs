const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const phase = process.argv[2] || 'before';
const outDir = path.resolve(__dirname, `../docs/evidence/services-cards/${phase}`);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '375', width: 375, height: 812 },
];

const themes = ['dark', 'light'];

(async () => {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    for (const theme of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      await page.goto('http://localhost:8070/', { waitUntil: 'networkidle' });

      // Set theme
      await page.evaluate((t) => {
        localStorage.setItem('vite-ui-theme', t);
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(t);
      }, theme);
      await page.waitForTimeout(400);

      // Scroll specifically to section#servicos
      const servicos = page.locator('section#servicos');
      await servicos.waitFor({ state: 'visible', timeout: 5000 });
      await page.evaluate(() => {
        const el = document.querySelector('section#servicos');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await page.waitForTimeout(600);

      await servicos.screenshot({
        path: path.join(outDir, `servicos-${vp.name}-${theme}.png`),
      });

      await context.close();
    }
  }

  await browser.close();
  console.log(`Successfully captured all screenshots for phase: ${phase} to ${outDir}`);
})();
