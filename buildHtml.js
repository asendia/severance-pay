const fs = require('fs');
module.exports = function buildHtml(metafile) {
  // { entryPoint: outputFilePath }
  const buildOutputs = {};

  // Hardcoded
  let html = fs.readFileSync('./public/index.html', { encoding: 'utf8' });
  Object.keys(metafile.outputs).forEach((outFile) => {
    const output = metafile.outputs[outFile];
    if (output.entryPoint) {
      buildOutputs[output.entryPoint] = outFile.replace('out', '');
      html = html.replace(`###${output.entryPoint}###`, buildOutputs[output.entryPoint]);
    }
  });
  if (!fs.existsSync('./out/pesangon/')){
    fs.mkdirSync('./out/pesangon/');
}
  fs.writeFileSync('./out/pesangon/index.html', html, 'utf8');
  fs.copyFileSync('./public/special-case.html', './out/pesangon/special-case.html');
}
