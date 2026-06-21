const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;

// openapi.yaml sync
const specPath = './src/openapi.yaml';
let spec = fs.readFileSync(specPath, 'utf8');
spec = spec.replace(/^version:.*$/m, `version: ${version}`);
fs.writeFileSync(specPath, spec);
console.log(`✅ openapi.yaml version synced to ${version}`);

// deploy.xml sync
const deployPath = '.github/maven/maven-deploy.xml';
let deploy = fs.readFileSync(deployPath, 'utf8');
deploy = deploy.replace(/<version>.*<\/version>/, `<version>${version}</version>`);
fs.writeFileSync(deployPath, deploy);
console.log(`✅ deploy.xml version synced to ${version}`);