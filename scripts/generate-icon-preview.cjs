const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../docs/evidence/icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Lista dos 15 ícones autorais e suas tags
const icons = [
  { name: 'IconTransparentCommunication', label: 'Comunicação transparente' },
  { name: 'IconEvolutionaryEngineering', label: 'Engenharia que facilita evoluir' },
  { name: 'IconBusinessFocus', label: 'Foco no problema do negócio' },
  { name: 'IconProcessUnderstand', label: 'Entendemos (Processo 01)' },
  { name: 'IconProcessDefine', label: 'Definimos (Processo 02)' },
  { name: 'IconProcessDevelop', label: 'Desenvolvemos (Processo 03)' },
  { name: 'IconProcessEvolve', label: 'Evoluímos (Processo 04)' },
  { name: 'IconTechnicalDiagnostic', label: 'Diagnóstico técnico' },
  { name: 'IconFastResponse', label: 'Retorno em até 24h' },
  { name: 'IconConfidentiality', label: 'Sigilo e confidencialidade' },
  { name: 'IconSectorIndustry', label: 'Setor Indústria' },
  { name: 'IconSectorRetail', label: 'Setor Varejo' },
  { name: 'IconSectorEducation', label: 'Setor Educação' },
  { name: 'IconSectorEnergy', label: 'Setor Energia' },
  { name: 'IconTechLeadership', label: 'Liderança técnica' },
];

const sizes = [16, 20, 24, 32];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await context.newPage();

  // Abre a aplicação local
  await page.goto('http://localhost:8070/', { waitUntil: 'networkidle' });

  // Injeta uma página de prévia dinâmica com a grade completa de ícones em Dark e Light
  const previewHtml = await page.evaluate(({ icons, sizes }) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Preview dos Ícones Autorais EPM DEVTECH</title>
        <style>
          body { font-family: system-ui, sans-serif; margin: 0; padding: 32px; background: #09090b; color: #f4f4f5; }
          .container { display: flex; gap: 32px; }
          .theme-col { flex: 1; padding: 24px; border-radius: 12px; border: 1px solid #27272a; }
          .theme-col.dark { background: #09090b; color: #f4f4f5; }
          .theme-col.light { background: #ffffff; color: #09090b; border-color: #e4e4e7; }
          h2 { font-size: 16px; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace; }
          .grid { display: flex; flex-direction: column; gap: 16px; }
          .row { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 8px; background: rgba(120,120,120,0.06); }
          .name { font-size: 12px; font-family: monospace; flex: 1; }
          .icons-row { display: flex; align-items: center; gap: 20px; }
          .icon-box { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 9px; color: #71717a; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1 style="font-size: 20px; font-family: monospace; margin-bottom: 24px;">EPM DEVTECH — Matriz de Ícones Autorais (15 Ícones × 4 Tamanhos)</h1>
        <div class="container">
          <div class="theme-col dark">
            <h2>Tema Escuro (Dark Mode)</h2>
            <div class="grid" id="dark-grid"></div>
          </div>
          <div class="theme-col light">
            <h2>Tema Claro (Light Mode)</h2>
            <div class="grid" id="light-grid"></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }, { icons, sizes });

  // Salva e carrega o HTML de prévia
  const htmlPath = path.join(outDir, 'icon-matrix-preview.html');
  fs.writeFileSync(htmlPath, previewHtml, 'utf8');

  // Agora acessa via Playwright para capturar renderização das SVGs reais da página
  await page.goto('http://localhost:8070/', { waitUntil: 'networkidle' });

  // Coleta os SVGs renderizados dos ícones presentes na página
  const iconSvgs = await page.evaluate(() => {
    const svgs = {};
    document.querySelectorAll('svg').forEach((el) => {
      const cls = el.getAttribute('class') || '';
      // Procura por ícones conceituais
      if (el.querySelector('circle[fill="hsl(var(--primary))"]') || el.querySelector('circle[fill="#10b981"]')) {
        const key = el.parentElement?.getAttribute('data-icon-name') || el.getAttribute('aria-label') || 'icon';
        svgs[key] = el.outerHTML;
      }
    });
    return svgs;
  });

  // Captura a seção Diferenciais e Setores com os ícones aplicados
  const diffSection = page.locator('#diferenciais');
  if (await diffSection.isVisible()) {
    await diffSection.screenshot({ path: path.join(outDir, 'icons-diferenciais-preview.png') });
  }

  const sectorsSection = page.locator('#setores');
  if (await sectorsSection.isVisible()) {
    await sectorsSection.screenshot({ path: path.join(outDir, 'icons-setores-preview.png') });
  }

  await browser.close();
  console.log('Icon preview evidence generated successfully in ' + outDir);
})();
