const fs = require('fs');
const yaml = require('js-yaml');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const specPath = './src/openapi.yaml';
const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));

spec.info.version = pkg.version;

fs.writeFileSync(specPath, yaml.dump(spec, { lineWidth: -1 }));
console.log(`✅ openapi.yaml version synced to ${pkg.version}`);