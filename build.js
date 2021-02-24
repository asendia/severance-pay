
const environment = process.env.NODE_ENV || 'production'
require('esbuild').build({
  entryPoints: ['index.tsx'],
  bundle: environment === 'production',
  minify: environment === 'production',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  define: {
    'process.env.NODE_ENV': "\"" + environment + "\"",
  },
  outdir: './out/pesangon/',
}).catch(() => process.exit(1))
