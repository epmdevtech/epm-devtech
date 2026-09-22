/**
 * Vercel Edge Middleware — Proxy de Demo Odontologia
 *
 * Intercepta TODAS as requisições ao subdomínio odontologia.epmdevtech.com.br
 * e as encaminha via proxy transparente ao Worker Cloudflare de origem.
 *
 * Isso resolve o conflito de paths absolutos (/assets/) que ocorre ao servir
 * um Worker compilado sem base path em sub-rota da mesma origem.
 *
 * Referência arquitetural: ADR-006-subdominio-demos-edge-middleware.md
 */

const WORKER_HOST = "dentistry-demo.elessandrodev.workers.dev";
const DEMO_HOST = "odontologia.epmdevtech.com.br";

/** Headers AppSec aplicados a todas as respostas do subdomínio. */
const SEC_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const config = {
  // Intercepta qualquer path no subdomínio de demo
  matcher: "/(.*)",
};

export default async function middleware(
  request: Request
): Promise<Response | undefined> {
  const url = new URL(request.url);

  // Passa adiante se não for o subdomínio de demo
  if (url.hostname !== DEMO_HOST) {
    return undefined;
  }

  // Constrói URL de destino no Worker mantendo path e query string
  const targetUrl = new URL(request.url);
  targetUrl.hostname = WORKER_HOST;
  targetUrl.protocol = "https:";
  targetUrl.port = "";

  // Monta headers de saída: repassa os do cliente mas substitui o host
  const outHeaders = new Headers(request.headers);
  outHeaders.set("host", WORKER_HOST);

  // Executa proxy ao Worker Cloudflare
  const workerResponse = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: outHeaders,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
    redirect: "follow",
  });

  // Copia headers da resposta e injeta AppSec
  const responseHeaders = new Headers(workerResponse.headers);
  for (const [key, value] of Object.entries(SEC_HEADERS)) {
    responseHeaders.set(key, value);
  }

  return new Response(workerResponse.body, {
    status: workerResponse.status,
    statusText: workerResponse.statusText,
    headers: responseHeaders,
  });
}
