/**
 * Vercel Edge Middleware — Proxy Reverso Multi-Subdomínios
 *
 * Intercepta requisições aos subdomínios mapeados em PROXIES
 * e as encaminha via proxy transparente aos respectivos Workers Cloudflare.
 *
 * Para adicionar um novo subdomínio de demonstração:
 * 1. Conecte o domínio customizado no painel da Vercel.
 * 2. Adicione uma linha no mapa PROXIES abaixo.
 *
 * Referências arquiteturais: ADR-006, ADR-008 e SPEC-116.
 */

const PROXIES: Record<string, string> = {
  "odontologia.epmdevtech.com.br": "dentistry-demo.elessandrodev.workers.dev",
  "brs.epmdevtech.com.br": "brs-automotive-repair.elessandrodev.workers.dev",
};

/** Headers AppSec aplicados a todas as respostas dos subdomínios proxyados. */
const SEC_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const config = {
  // Intercepta qualquer path nos subdomínios e site principal
  matcher: "/(.*)",
};

export default async function middleware(
  request: Request
): Promise<Response | undefined> {
  const url = new URL(request.url);
  const upstream = PROXIES[url.hostname];

  // Se o hostname não estiver no mapa, passa adiante (site principal)
  if (!upstream) {
    return undefined;
  }

  // Constrói URL de destino no Worker mantendo path e query string
  const targetUrl = new URL(url.pathname + url.search, `https://${upstream}`);

  // Monta headers de saída: repassa os do cliente, remove 'host' e injeta cabeçalhos de encaminhamento
  const outHeaders = new Headers(request.headers);
  outHeaders.delete("host");
  outHeaders.set("x-forwarded-host", url.hostname);
  outHeaders.set("x-forwarded-proto", "https");

  // Prepara corpo e opções da requisição para o fetch upstream
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const fetchOptions: RequestInit & { duplex?: "half" } = {
    method: request.method,
    headers: outHeaders,
    body: hasBody ? request.body : undefined,
    redirect: "manual",
    ...(hasBody ? { duplex: "half" } : {}),
  };

  // Executa proxy reverso ao Worker Cloudflare
  const workerResponse = await fetch(targetUrl.toString(), fetchOptions as RequestInit);

  // Copia headers da resposta do upstream
  const responseHeaders = new Headers(workerResponse.headers);

  // Reescreve o header Location de redirects (30x) para manter o usuário no domínio público
  const location = responseHeaders.get("location");
  if (location) {
    try {
      const locUrl = new URL(location, `https://${upstream}`);
      if (locUrl.hostname === upstream) {
        locUrl.hostname = url.hostname;
        locUrl.protocol = "https:";
        locUrl.port = "";
        responseHeaders.set("location", locUrl.toString());
      }
    } catch {
      // Preserva o valor original se não for possível converter para URL
    }
  }

  // Injeta cabeçalhos de segurança AppSec corporativos
  for (const [key, value] of Object.entries(SEC_HEADERS)) {
    responseHeaders.set(key, value);
  }

  return new Response(workerResponse.body, {
    status: workerResponse.status,
    statusText: workerResponse.statusText,
    headers: responseHeaders,
  });
}
