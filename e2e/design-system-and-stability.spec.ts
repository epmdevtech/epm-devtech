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
    await expect(heroH1).toContainText('Engenharia de software');
    await expect(heroH1).toContainText('construir, integrar e evoluir sistemas');

    // Aguarda 3 segundos para confirmar que não há re-renderização ou reload disparado
    await page.waitForTimeout(3000);

    expect(reloadCount).toBe(1);

    // O scroll inicial deve estar no topo (Hero)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(150);
  });

  test('Títulos das seções não possuem gradientes artificiais e Hero H1 possui acento visual de marca (SPEC-083)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Garante que nenhuma classe de gradiente em texto existe no DOM
    const gradientElements = page.locator('.text-gradient');
    const count = await gradientElements.count();
    expect(count).toBe(0);

    // Valida H1 do Hero com acento cromático oficial de marca na ação (SPEC-083)
    const heroH1 = page.locator('#hero h1').first();
    await expect(heroH1).toBeVisible();
    await expect(heroH1).toContainText('Engenharia de software para construir, integrar e evoluir sistemas.');
    const heroAccent = heroH1.locator('span.text-text-brand');
    await expect(heroAccent).toBeVisible();
    await expect(heroAccent).toHaveText('construir, integrar e evoluir');

    // Verifica que os headings das demais seções são rigorosamente monocromáticos
    const expectedHeadings = [
      { id: 'servicos', text: 'Engenharia sob medida para os gargalos da sua operação' },
      { id: 'como-trabalhamos', text: 'Engenharia previsível com contato direto com quem constrói' },
      { id: 'autoridade', text: 'Resultados comprovados em operações de grande escala' },
    ];

    for (const item of expectedHeadings) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, item.id);

      await page.waitForTimeout(400);

      const heading = page.locator(`#${item.id} h1, #${item.id} h2`).first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(item.text);

      // Valida ausência de spans ou classes de cor colorida/gradiente dentro do heading
      const coloredSpanInHeading = heading.locator('span[class*="text-emerald"], span[class*="text-green"], span[class*="text-teal"], span[class*="text-primary"]');
      const coloredCount = await coloredSpanInHeading.count();
      expect(coloredCount).toBe(0);
    }
  });

  test('Cor principal de destaque utiliza o verde da marca EPM DEVTECH (#2DD4BF / teal)', async ({ page }) => {
    await page.goto('/contato');
    await page.waitForLoadState('domcontentloaded');

    // Botão de envio no formulário de contato (verde-água oficial brand #2DD4BF)
    const submitButton = page.locator('button[type="submit"]').first();
    await expect(submitButton).toBeVisible({ timeout: 10000 });

    const btnBgColor = await submitButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Verde-água teal oficial (#2DD4BF / brand) — formato rgb(45, 212, 191)
    expect(btnBgColor).toBe('rgb(45, 212, 191)');

    // Garante presença do CTA principal do Hero na home direcionando para /contato
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const heroCta = page.locator('#hero a[href="/contato"], #hero a[href="#contato"]').first();
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toContainText('Vamos conversar');
  });

  test('Navegação e rolagem fluida por âncoras sem salto para o Hero', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Clica no CTA secundário ("Ver soluções" que aponta para #servicos)
    const secondaryCta = page.locator('#hero a[href="#servicos"]').first();
    await expect(secondaryCta).toBeVisible();
    await secondaryCta.click();

    await page.waitForTimeout(600);
    const servicosSection = page.locator('#servicos');
    await expect(servicosSection).toBeInViewport();
  });

  test('ArchitecturalBlueprint renderiza camadas de tecnologias com interação de foco e acessibilidade', async ({ page }) => {
    await page.goto('/engenharia');
    await page.waitForLoadState('domcontentloaded');

    // Rola até a seção de tecnologias
    await page.evaluate(() => {
      const el = document.getElementById('tecnologias');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });

    await page.waitForTimeout(500);

    const blueprint = page.locator('[data-testid="architectural-blueprint"]');
    await expect(blueprint).toBeVisible({ timeout: 10000 });

    // Valida a presença da nuvem tipográfica de especialidades
    const techCloud = page.locator('[data-testid="tech-editorial-cloud"]');
    await expect(techCloud).toBeVisible();
    await expect(page.getByText('// ESPECIALIDADES & STACK')).toBeVisible();
    await expect(page.getByText('Nossas especialidades técnicas')).toBeVisible();

    // Valida nós chaves da arquitetura
    const reactBadge = page.locator('[data-testid="tech-badge-React"]');
    await expect(reactBadge).toBeVisible();

    // Valida ativação por foco via teclado (acessibilidade)
    await reactBadge.focus();
    await page.waitForTimeout(200);

    // Valida foco em outro nó
    const nodejsBadge = page.locator('[data-testid="tech-badge-Node.js"]');
    await nodejsBadge.focus();
    await page.waitForTimeout(200);
  });

  test('ArchitecturalBlueprint exibe tooltip e detalhes contextuais ao interagir com tecnologias', async ({ page }) => {
    await page.goto('/engenharia');
    await page.waitForLoadState('domcontentloaded');

    // Rola até a seção de tecnologias
    await page.evaluate(() => {
      const el = document.getElementById('tecnologias');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });

    await page.waitForTimeout(500);

    const blueprint = page.locator('[data-testid="architectural-blueprint"]');
    await expect(blueprint).toBeVisible({ timeout: 10000 });

    // Valida ausência da badge Certificado na AWS e presença de Core Runtime no Node.js
    await expect(page.getByText('Certificado')).toBeHidden();
    await expect(page.getByText('Core Runtime')).toBeVisible();

    // Valida abertura de tooltip em todas as 9 tecnologias (linha superior e inferior)
    const techExpectations = [
      { name: 'React', textMatch: /Componentização declarativa/i },
      { name: 'TypeScript', textMatch: /Tipagem estática estrita/i },
      { name: 'Node.js', textMatch: /Runtime assíncrono e orientado a eventos/i },
      { name: 'AWS', textMatch: /Computação elástica distribuída/i },
      { name: 'Vue.js', textMatch: /Ecossistema progressivo e ágil/i },
      { name: 'PHP', textMatch: /Back-end maduro e corporativo/i },
      { name: 'Laravel', textMatch: /Framework robusto para desenvolvimento ágil/i },
      { name: 'Angular', textMatch: /Framework corporativo opinado/i },
      { name: 'Azure', textMatch: /Serviços corporativos de nuvem/i },
    ];

    for (const tech of techExpectations) {
      const badge = page.locator(`[data-testid="tech-badge-${tech.name}"]`);
      await expect(badge).toBeVisible();
      await badge.hover();
      await page.waitForTimeout(300);

      const tooltip = page.getByRole('tooltip').filter({ hasText: tech.textMatch });
      await expect(tooltip).toBeVisible();
    }
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

    // 2. Aguarda montagem do LazyRender (delay 2500ms) e rola até o meio da página (> 500px)
    await page.waitForTimeout(3000);
    await page.evaluate(() => {
      window.scrollTo(0, 1000);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(500);

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
    await page.goto('/contato');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    const header = page.locator('header.fixed');
    const contatoLink = page.locator('header.fixed a[href="/contato"]').first();
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

  test('Seção Autoridade (SPEC-056): Valores finais presentes sem 0s de placeholder, com reduced-motion e com animação inibida', async ({ page }) => {
    // 1. Carrega a página com prefers-reduced-motion: reduce
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/#autoridade');
    await page.waitForLoadState('domcontentloaded');

    const authoritySection = page.locator('#autoridade');
    await expect(authoritySection).toBeVisible();

    // 2. Valida presença dos 4 valores finais imediatamente (visual exact match)
    await expect(authoritySection.getByText('99,9%', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('2.500 RPS', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('100%', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('\u221235%', { exact: true })).toBeVisible();

    // 3. Valida ausência absoluta de valores intermediários/zerados (0,0%, 0 RPS, etc.)
    expect(await authoritySection.getByText('0,0%', { exact: true }).count()).toBe(0);
    expect(await authoritySection.getByText('0 RPS', { exact: true }).count()).toBe(0);
    expect(await authoritySection.getByText('\u22120%', { exact: true }).count()).toBe(0);
    
    // Garante que não há concatenação defeituosa como "redução de 35%−0%"
    const sectionText = await authoritySection.innerText();
    expect(sectionText).not.toContain('35%−0%');
    expect(sectionText).not.toContain('35%-0%');

    // 4. Valida atributos de acessibilidade (aria-hidden nos contadores visuais e sr-only nos acessíveis)
    const visualCounters = authoritySection.locator('span[aria-hidden="true"]');
    const counterCount = await visualCounters.count();
    expect(counterCount).toBeGreaterThanOrEqual(4);

    const srOnlyLabels = authoritySection.locator('span.sr-only');
    expect(await srOnlyLabels.count()).toBe(4);
    await expect(authoritySection.locator('span.sr-only').getByText('99,9% de disponibilidade')).toBeAttached();
    await expect(authoritySection.locator('span.sr-only').getByText('2.500 requisições por segundo')).toBeAttached();
    await expect(authoritySection.locator('span.sr-only').getByText('100% de integridade')).toBeAttached();
    await expect(authoritySection.locator('span.sr-only').getByText('redução de 35%')).toBeAttached();
  });

  test('Seção Autoridade (SPEC-056): Valores finais imediatos com camada de animação inativa (rAF stub)', async ({ page }) => {
    // Inibe a camada de animação requestAnimationFrame antes da renderização
    await page.addInitScript(() => {
      window.requestAnimationFrame = () => 0;
    });

    await page.goto('/#autoridade');
    await page.waitForLoadState('domcontentloaded');

    const authoritySection = page.locator('#autoridade');
    await expect(authoritySection).toBeVisible();

    // Os valores finais devem estar imediatamente visíveis no DOM
    await expect(authoritySection.getByText('99,9%', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('2.500 RPS', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('100%', { exact: true })).toBeVisible();
    await expect(authoritySection.getByText('\u221235%', { exact: true })).toBeVisible();

    // Sem placeholders de zero
    expect(await authoritySection.getByText('0,0%', { exact: true }).count()).toBe(0);
    expect(await authoritySection.getByText('0 RPS', { exact: true }).count()).toBe(0);
    expect(await authoritySection.getByText('\u22120%', { exact: true }).count()).toBe(0);
  });

  test('Sistema de Camadas Tonais (SPEC-082): Ritmo tonal e ausência de linhas divisórias em todas as rotas', async ({ page }) => {
    const routesToTest = [
      '/',
      '/servicos',
      '/como-trabalhamos',
      '/experiencia',
      '/engenharia',
      '/sobre',
      '/contato',
      '/duvidas-frequentes',
    ];

    for (const route of routesToTest) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      // Coleta todos os elementos de seção com data-tone dentro da página
      const tonedElements = page.locator('[data-tone]');
      const count = await tonedElements.count();
      expect(count).toBeGreaterThanOrEqual(2);

      // 1. A primeira seção (ou header) deve ser 'anchor'
      const firstTone = await tonedElements.first().getAttribute('data-tone');
      expect(firstTone).toBe('anchor');

      // 2. O Footer (último elemento com data-tone) deve ser 'anchor'
      const lastTone = await tonedElements.last().getAttribute('data-tone');
      expect(lastTone).toBe('anchor');

      // 3. Validação do ritmo: duas seções adjacentes NUNCA podem ter o mesmo tom
      // Note: Header é fixed, então comparamos a sequência de seções do fluxo de conteúdo
      const flowTonedElements = page.locator('main [data-tone], section[data-tone], footer[data-tone]');
      const flowCount = await flowTonedElements.count();
      const flowTones: string[] = [];
      for (let i = 0; i < flowCount; i++) {
        const tone = await flowTonedElements.nth(i).getAttribute('data-tone');
        if (tone) flowTones.push(tone);
      }

      for (let i = 0; i < flowTones.length - 1; i++) {
        expect(
          flowTones[i],
          `Em ${route}, seções adjacentes [${i}] e [${i + 1}] possuem o mesmo tom (${flowTones[i]})`
        ).not.toBe(flowTones[i + 1]);
      }

      // 4. Ausência de linhas divisórias entre seções (border-t / border-b com border-border nas seções principais)
      const sections = page.locator('section[data-tone]');
      const sectionCount = await sections.count();
      for (let i = 0; i < sectionCount; i++) {
        const sectionClasses = (await sections.nth(i).getAttribute('class')) || '';
        expect(sectionClasses).not.toContain('border-t border-border');
        expect(sectionClasses).not.toContain('border-b border-border');
      }
    }
  });

  test('Sistema de Camadas Tonais (SPEC-082): Suporte a Dark e Light Mode com contraste e classes semânticas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Valida tokens em Dark Mode
    const hero = page.locator('#hero');
    await expect(hero).toHaveAttribute('data-tone', 'anchor');
    const servicos = page.locator('#servicos');
    await expect(servicos).toHaveAttribute('data-tone', 'base');

    // Rola para o rodapé e alterna para Light Mode
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(600);

    const lightThemeButton = page.locator('button[title="Tema Light"]');
    await expect(lightThemeButton).toBeVisible({ timeout: 10000 });
    await lightThemeButton.click();
    await page.waitForTimeout(400);

    // Valida em Light Mode
    await expect(hero).toHaveAttribute('data-tone', 'anchor');
    await expect(servicos).toHaveAttribute('data-tone', 'base');

    // Retorna para Dark Mode
    const darkThemeButton = page.locator('button[title="Tema Dark"]');
    await darkThemeButton.click();
    await page.waitForTimeout(400);
  });

  test('Hero (SPEC-083): Renderiza proposta de valor, acento cromático no H1, faixa operacional e seletor interativo de cenários', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Valida H1 com acento visual no verbo de ação
    const heroH1 = page.locator('#hero h1');
    await expect(heroH1).toBeVisible();
    await expect(heroH1.locator('span.text-text-brand')).toHaveText('construir, integrar e evoluir');

    // 2. Valida subheadline editorial de proposta de valor
    const subheadline = page.getByText(
      'Sistemas sob medida para empresas que precisam criar plataformas, conectar operações ou modernizar o software do seu negócio.'
    );
    await expect(subheadline).toBeVisible();

    // 3. Valida CTAs principais
    const ctaPrimario = page.locator('#hero a[href="/contato"]').first();
    await expect(ctaPrimario).toBeVisible();
    await expect(ctaPrimario).toContainText('Vamos conversar');

    const ctaSecundario = page.locator('#hero a[href="#servicos"]').first();
    await expect(ctaSecundario).toBeVisible();
    await expect(ctaSecundario).toContainText('Ver soluções');

    // 4. Valida faixa de confiança operacional
    const trustStrip = page.locator('[data-testid="hero-operational-trust"]');
    await expect(trustStrip).toBeVisible();
    await expect(trustStrip).toContainText('Aplicações corporativas críticas');
    await expect(trustStrip).toContainText('Energia, educação, indústria e varejo');
    await expect(trustStrip).toContainText('Retorno em até 24h úteis');

    // 5. Valida Seletor Interativo de Cenários de Negócio
    const selector = page.locator('[data-testid="hero-scenario-selector"]');
    await expect(selector).toBeVisible();
    await expect(selector).toContainText('O que sua empresa precisa agora?');
    await expect(selector).toContainText('Direcionamento técnico imediato');

    // Valida os 4 links de cenário com navegação ancorada
    const scenarios = [
      { id: 'sistemas', text: 'Criar um novo sistema, portal ou plataforma web', href: '/servicos#sistemas' },
      { id: 'integracoes', text: 'Conectar sistemas antigos e automatizar fluxos de dados', href: '/servicos#integracoes' },
      { id: 'legados', text: 'Modernizar e refatorar um software legado sem parar a operação', href: '/servicos#legados' },
      { id: 'diagnostico', text: 'Avaliar arquitetura e ter uma segunda opinião técnica sênior', href: '/contato' },
    ];

    for (const scenario of scenarios) {
      const scenarioLink = page.locator(`[data-testid="scenario-link-${scenario.id}"]`);
      await expect(scenarioLink).toBeVisible();
      await expect(scenarioLink).toContainText(scenario.text);
      await expect(scenarioLink).toHaveAttribute('href', scenario.href);
    }
  });
});


