// Cloudflare Worker Entrypoint for Hardus Plumbing
const { handleEdgeRoute } = require('./src/edgeRenderer');

export default {
  async fetch(request, env, ctx) {
    // 1. Try static asset binding if available (Cloudflare Workers Static Assets)
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

    // 2. Resolve HTML / XML / TXT route
    const url = new URL(request.url);
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
