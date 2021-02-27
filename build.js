
const environment = process.env.NODE_ENV || 'production'

require('esbuild').build({
  entryPoints: ['index.tsx'],
  bundle: true,
  minify: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  define: {
    'process.env.NODE_ENV': "\"" + environment + "\"",
  },
  sourcemap: true,
  outdir: './out/pesangon/',
  // no entryNames yet :(
  // assetNames: '[name]-[hash]',
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

// esbuild index.tsx --bundle --minify --sourcemap --outdir=out/pesangon --asset-names=[name]-[hash] --loader:.png=file --target=chrome58,firefox57,safari11,edge16 --define:process.env.NODE_ENV=\"production\"
