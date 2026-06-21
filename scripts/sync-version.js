const fs = require('fs');

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const packageVersion = packageJSON.version;

const openapiSpecPath = './src/openapi.yaml';
const openapiSpecContent = fs.readFileSync(openapiSpecPath, 'utf8');
openapiSpecContent.replace(/^version:.*$/m, `version: ${packageVersion}`);
fs.writeFileSync(
  openapiSpecPath,
  openapiSpecContent.replace(
    /^version:.*$/m,
    `version: ${packageVersion}`
  )
);
console.log(`✅ src/openapi.yaml version synced to ${packageVersion}`);
