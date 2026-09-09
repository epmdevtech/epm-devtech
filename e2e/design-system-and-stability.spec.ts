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
    await expect(heroH1).toContainText('Software sob medida');
    await expect(heroH1).toContainText('construído para escalar');

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

    // Verifica que os headings de cada seção existem, contêm os textos padronizados e são 100% monocromáticos
    const expectedHeadings = [
      { id: 'hero', text: 'Software sob medida construído para escalar o seu negócio.' },
      { id: 'sobre', text: 'Engenharia de software com excelência técnica comprovada' },
      { id: 'servicos', text: 'Soluções de engenharia de ponta a ponta' },
      { id: 'tecnologias', text: 'Tecnologias Modernas' },
      { id: 'diferenciais', text: 'Por Que Escolher a EPM DEVTECH' },
      { id: 'autoridade', text: 'Autoridade técnica e impacto em missão crítica' },
      { id: 'contato', text: 'Vamos entender o seu desafio' },
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

      // Valida ausência de spans ou classes de cor colorida/gradiente dentro do heading
      const coloredSpanInHeading = heading.locator('span[class*="text-emerald"], span[class*="text-green"], span[class*="text-teal"], span[class*="text-primary"]');
      const coloredCount = await coloredSpanInHeading.count();
      expect(coloredCount).toBe(0);
    }
  });

  test('Cor principal de destaque utiliza o verde da marca EPM DEVTECH (#10b981 / emerald)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Rola até a seção de contato para carregar a LazySection
    await page.evaluate(() => {
      const el = document.querySelector('#contato');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    // Botão de envio no formulário de contato (verde esmeralda oficial)
    const submitButton = page.locator('#contato button[type="submit"]');
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    const btnBgColor = await submitButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Verde esmeralda oficial (#10B981 / emerald-600) — formato rgb(5, 150, 105)
    expect(btnBgColor).toMatch(/rgb\((5|16|23|24|26|36|38|39),\s*(150|155|160|161|173|175|176|185),\s*(105|107|112|114|123|124|125|129)\)/);

    // Garante que os botões de CTA foram removidos da seção Hero conforme especificado
    const heroCta = page.locator('#hero a[href="#contato"], #hero a[href="#servicos"]');
    await expect(heroCta).toHaveCount(0);
  });

  test('Navegação e rolagem fluida por âncoras sem salto para o Hero', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Clica no CTA secundário ("Ver serviços" / "Conhecer serviços")
    const secondaryCta = page.locator('a[href="#servicos"]').first();
    await expect(secondaryCta).toBeVisible();
    await secondaryCta.click();

    await page.waitForTimeout(800);

    // O scroll não pode ter saltado para o Hero (deve estar em serviços)
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

    await page.waitForTimeout(800);

    const constellation = page.locator('[data-testid="tech-constellation"]');
    await expect(constellation).toBeVisible({ timeout: 10000 });

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

    await page.waitForTimeout(800);

    const constellation = page.locator('[data-testid="tech-constellation"]');
    await expect(constellation).toBeVisible({ timeout: 10000 });

    const detailsPanel = page.locator('[data-testid="tech-details-panel"]');
    await expect(detailsPanel).toBeVisible();
    await expect(detailsPanel).toContainText('Exploração Interativa do Grafo');

    // Interage com o nó React via hover
    const reactNode = page.locator('[data-testid="tech-node-React"]');
    await reactNode.hover({ force: true });

    await expect(detailsPanel).toContainText('React', { timeout: 10000 });
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
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(800);

    const lightThemeButton = page.locator('button[title="Tema Light"]');
    await expect(lightThemeButton).toBeVisible({ timeout: 10000 });
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

  test('Botão Voltar ao Topo eleva-se dinamicamente no rodapé sem ocluir o copyright', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. No topo, botão não deve estar visível
    const scrollTopBtn = page.locator('button[aria-label="Voltar ao topo"]');
    await expect(scrollTopBtn).toBeHidden();

    // 2. Rola até o meio da página (> 500px)
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(800);

    // O botão deve aparecer
    await expect(scrollTopBtn).toBeVisible({ timeout: 10000 });

    // 3. Rola até o final da página (rodapé visível no viewport)
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // O container do botão deve receber o atributo data-elevated="true"
    const container = page.locator('[data-testid="scroll-to-top-container"]');
    await expect(container).toHaveAttribute('data-elevated', 'true');

    // 4. Valida que o copyright está visível e legível
    const copyright = page.locator('footer p:has-text("Todos os direitos reservados")');
    await expect(copyright).toBeVisible();
  });

  test('Abertura do dropdown de tipo de projeto não causa layout shift no menu superior (Header fixo)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/#contato');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    const header = page.locator('header');
    const contatoLink = page.locator('header nav a[href="#contato"]');
    const trigger = page.locator('#projectType');

    // Medições antes do clique
    const headerBefore = await header.boundingBox();
    const contatoBefore = await contatoLink.boundingBox();
    expect(headerBefore).not.toBeNull();
    expect(contatoBefore).not.toBeNull();

    // Abre o dropdown
    await trigger.click();
    const selectContent = page.locator('[role="listbox"]');
    await expect(selectContent).toBeVisible();

    // Medições após a abertura do dropdown
    const headerAfter = await header.boundingBox();
    const contatoAfter = await contatoLink.boundingBox();
    const contentBox = await selectContent.boundingBox();
    const triggerBox = await trigger.boundingBox();

    expect(headerAfter).not.toBeNull();
    expect(contatoAfter).not.toBeNull();
    expect(contentBox).not.toBeNull();
    expect(triggerBox).not.toBeNull();

    // Valida imunidade contra Layout Shift (Zero horizontal shift)
    expect(Math.abs(headerAfter!.x - headerBefore!.x)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(headerAfter!.width - headerBefore!.width)).toBeLessThanOrEqual(0.5);
    expect(Math.abs(contatoAfter!.x - contatoBefore!.x)).toBeLessThanOrEqual(0.5);

    // Valida confinamento do dropdown à largura do trigger
    expect(contentBox!.width).toBeLessThanOrEqual(triggerBox!.width + 1);

    // Valida que body NÃO recebeu margin-right ou overflow-hidden da biblioteca
    // (verifica que nossa regra CSS de alta especificidade está vencendo)
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const computed = window.getComputedStyle(body);
      return {
        marginRight: computed.marginRight,
        overflow: computed.overflow,
        hasScrollLocked: body.hasAttribute('data-scroll-locked'),
      };
    });

    // body[data-scroll-locked] deve estar presente (a biblioteca aplica o atributo)
    expect(bodyStyles.hasScrollLocked).toBe(true);
    // mas o margin-right deve ser 0 (nossa CSS de especificidade elevada vence)
    expect(bodyStyles.marginRight).toBe('0px');
    // e o overflow deve ser visible (não hidden da biblioteca)
    expect(bodyStyles.overflow).toBe('visible');

    // Fecha o dropdown via Escape e valida estabilidade contínua
    await page.keyboard.press('Escape');
    await expect(selectContent).toBeHidden();

    const headerClosed = await header.boundingBox();
    expect(Math.abs(headerClosed!.x - headerBefore!.x)).toBeLessThanOrEqual(0.5);
  });

  test('Formulário de Contato: Máscara dinâmica e validação estrita de WhatsApp/Telefone', async ({ page }) => {
    await page.goto('/#contato');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    const phoneInput = page.locator('#phone');
    await expect(phoneInput).toBeVisible();

    // 1. Digita texto aleatório ("wewqewqeq")
    await phoneInput.fill('wewqewqeq');
    await phoneInput.blur();

    // Mensagem de erro deve ser exibida logo abaixo em vermelho
    const errorMessage = page.locator('p.text-destructive', {
      hasText: /Informe um número de WhatsApp\/Telefone válido com DDD/i,
    });
    await expect(errorMessage).toBeVisible();

    // 2. Corrige para um número brasileiro válido com 11 dígitos
    await phoneInput.fill('11999998888');
    await phoneInput.blur();

    // O valor do input deve estar formatado com a máscara dinâmica
    await expect(phoneInput).toHaveValue('(11) 99999-8888');

    // A mensagem de erro deve desaparecer
    await expect(errorMessage).toBeHidden();
  });

});


