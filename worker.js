// Cloudflare Worker Entrypoint for Hardus Plumbing
import edgeRenderer from './src/edgeRenderer.js';
const { handleEdgeRoute } = edgeRenderer;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname.endsWith('.localhost');

    let shouldRedirect = false;

    // 1. Force HTTPS (301 Permanent Redirect)
    const proto = (request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '')).toLowerCase();
    if (!isLocalhost && proto === 'http') {
      url.protocol = 'https:';
      shouldRedirect = true;
    }

    // 2. Canonical Hostname: Force apex domain (strip www.)
    if (!isLocalhost && url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.replace(/^www\./, '');
      shouldRedirect = true;
    }

    // 3. Legacy 301 Redirect: /states/[state]/[city]/ -> /[state]/[city]/
    if (url.pathname.startsWith('/states/') && url.pathname !== '/states/' && url.pathname !== '/states') {
      url.pathname = url.pathname.replace(/^\/states\//, '/');
      shouldRedirect = true;
    }

    // 4. Trailing Slash Normalization (301 Permanent Redirect)
    // Enforce trailing slashes on all page/directory routes to match canonical URLs exactly.
    // Skip static assets with extensions (.css, .js, .png, .jpg, .svg, .webp, .ico, .xml, .txt)
    if (url.pathname !== '/' && !url.pathname.endsWith('/') && !url.pathname.includes('.')) {
      url.pathname += '/';
      shouldRedirect = true;
    }

    // Issue single 301 Permanent Redirect if needed
    if (shouldRedirect) {
      return Response.redirect(url.toString(), 301);
    }

    // 5. Try static asset binding if available (Cloudflare Workers Static Assets)
    if (env && env.ASSETS) {
      try {
        const assetRes = await env.ASSETS.fetch(request);
        if (assetRes && assetRes.status !== 404) {
          return assetRes;
        }
      } catch (e) {
        // Fall through to in-memory edge renderer
      }
    }

    // 6. Resolve HTML / XML / TXT route via edge renderer
    const result = handleEdgeRoute(url.pathname);

    return new Response(result.body, {
      status: result.status,
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
        'X-Powered-By': 'Hardus-Plumbing-Edge'
      }
    });
  }
};

