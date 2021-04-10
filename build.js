const buildHtml = require('./buildHtml');

const environment = process.env.NODE_ENV || 'production';
const buildOptions = {
  entryPoints: ['index.tsx'],
  bundle: true,
  minify: true,
  target: ['es2020', 'chrome58', 'firefox57', 'safari11'],
  sourcemap: true,
  outdir: './out/pesangon/',
  entryNames: '[dir]/[name]-[hash]',
  metafile: true,
  define: {
    'process.env.NODE_ENV': "\"" + environment + "\"",
  },
};
require('esbuild').build(buildOptions).catch((err) => {
  console.error(err);
  process.exit(1);
}).then((res) => {
  console.log(res)
  buildHtml(res.metafile);
});

// esbuild index.tsx --bundle --minify --sourcemap --outdir=out/pesangon --asset-names=[name]-[hash] --loader:.png=file --target=chrome58,firefox57,safari11,edge16 --define:process.env.NODE_ENV=\"production\"
