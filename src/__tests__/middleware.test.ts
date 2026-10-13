import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import middleware, { config } from '../../middleware';

describe('Vercel Edge Middleware — Multi-Subdomains Reverse Proxy', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('deve ter matcher configurado para capturar todas as rotas', () => {
    expect(config.matcher).toBe('/(.*)');
  });

  it('deve retornar undefined para domínios que não estão no mapa PROXIES (site principal)', async () => {
    const req = new Request('https://epmdevtech.com.br/services');
    const res = await middleware(req);
    expect(res).toBeUndefined();
  });

  it('deve retornar undefined para www ou domínios não mapeados', async () => {
    const req = new Request('https://www.epmdevtech.com.br/');
    const res = await middleware(req);
    expect(res).toBeUndefined();
  });

  it('deve proxear requisições de odontologia.epmdevtech.com.br para dentistry-demo worker', async () => {
    const mockResponse = new Response('<html>Odonto Demo</html>', {
      status: 200,
      headers: { 'content-type': 'text/html' },
    });
    const fetchSpy = vi.fn().mockResolvedValue(mockResponse);
    globalThis.fetch = fetchSpy;

    const req = new Request('https://odontologia.epmdevtech.com.br/agendamento?dr=silva', {
      method: 'GET',
      headers: {
        host: 'odontologia.epmdevtech.com.br',
        'user-agent': 'TestAgent',
      },
    });

    const res = await middleware(req);
    expect(res).toBeInstanceOf(Response);
    expect(res?.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [targetUrl, options] = fetchSpy.mock.calls[0];

    expect(targetUrl).toBe('https://dentistry-demo.elessandrodev.workers.dev/agendamento?dr=silva');
    expect(options.method).toBe('GET');
    expect(options.redirect).toBe('manual');
    expect(options.headers.get('host')).toBeNull();
    expect(options.headers.get('x-forwarded-host')).toBe('odontologia.epmdevtech.com.br');
    expect(options.headers.get('x-forwarded-proto')).toBe('https');

    // Headers AppSec
    expect(res?.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res?.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
    expect(res?.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(res?.headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
  });

  it('deve proxear requisições de brs.epmdevtech.com.br para brs-automotive-repair worker com body e duplex half', async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
    const fetchSpy = vi.fn().mockResolvedValue(mockResponse);
    globalThis.fetch = fetchSpy;

    const req = new Request('https://brs.epmdevtech.com.br/api/orcamento', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        host: 'brs.epmdevtech.com.br',
      },
      body: JSON.stringify({ placa: 'ABC1234' }),
    });

    const res = await middleware(req);
    expect(res).toBeInstanceOf(Response);
    expect(res?.status).toBe(201);

    const [targetUrl, options] = fetchSpy.mock.calls[0];
    expect(targetUrl).toBe('https://brs-automotive-repair.elessandrodev.workers.dev/api/orcamento');
    expect(options.method).toBe('POST');
    expect(options.duplex).toBe('half');
    expect(options.headers.get('x-forwarded-host')).toBe('brs.epmdevtech.com.br');
    expect(options.headers.get('x-forwarded-proto')).toBe('https');
  });

  it('deve reescrever o cabeçalho Location quando o upstream responder redirect 302', async () => {
    const mockResponse = new Response(null, {
      status: 302,
      headers: {
        location: 'https://brs-automotive-repair.elessandrodev.workers.dev/painel/dashboard?session=123',
      },
    });
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const req = new Request('https://brs.epmdevtech.com.br/login', {
      method: 'POST',
    });

    const res = await middleware(req);
    expect(res?.status).toBe(302);
    expect(res?.headers.get('location')).toBe(
      'https://brs.epmdevtech.com.br/painel/dashboard?session=123'
    );
  });

  it('deve preservar redirecionamento para URLs externas no header Location', async () => {
    const mockResponse = new Response(null, {
      status: 302,
      headers: {
        location: 'https://api.whatsapp.com/send?phone=5511999999999',
      },
    });
    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse);

    const req = new Request('https://brs.epmdevtech.com.br/contato-whatsapp');

    const res = await middleware(req);
    expect(res?.status).toBe(302);
    expect(res?.headers.get('location')).toBe(
      'https://api.whatsapp.com/send?phone=5511999999999'
    );
  });
});
