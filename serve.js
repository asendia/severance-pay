const esbuild = require('esbuild');
const http = require('http');
const buildHtml = require('./buildHtml');

const environment = 'development';

const buildOptions = {
  entryPoints: ['index.tsx'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
  outdir: './out/pesangon/',
  entryNames: '[dir]/[name]',
  define: {
    'process.env.NODE_ENV': "\"" + environment + "\"",
  },
};

esbuild.serve({
  servedir: './out',
}, buildOptions).then((result) => {
  if (environment === 'production') {
    return;
  }
  const metafile = { outputs: {} };
  buildOptions.entryPoints.forEach((entryPoint) => {
    // Hardcoded
    metafile.outputs[buildOptions.outdir.replace('./', '') + entryPoint.replace('.tsx', '.js')] = {
      entryPoint: entryPoint,
    };
  });
  buildHtml(metafile);
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
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
