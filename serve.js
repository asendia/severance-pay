const esbuild = require('esbuild');
const http = require('http');

const environment = process.env.NODE_ENV || 'development'
esbuild.serve({
  servedir: './out',
}, {
  entryPoints: ['index.tsx'],
  bundle: true,
  minify: environment === 'production',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: './out/pesangon/',
  define: {
    'process.env.NODE_ENV': "\"" + environment + "\"",
  },
}).then((result) => {
  if (environment === 'production') {
    return;
  }
  // The result tells us where esbuild's local server is
  const {host, port} = result

  console.log('Starting local server at host & port:', host, port)
  // Then start a proxy server on port 3000
  http.createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>A custom 404 page</h1>');
        return;
      }

      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true });
  }).listen(3000);
});
