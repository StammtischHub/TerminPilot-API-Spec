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
console.log(`✅ openapi.yaml version synced to ${packageVersion}`);

const mavenDeployPath = '.github/maven/maven-deploy.xml';
const mavenDeployXml = fs.readFileSync(mavenDeployPath, 'utf8');
fs.writeFileSync(
  mavenDeployPath,
  mavenDeployXml.replace(
    /<version>.*<\/version>/,
    `<version>${packageVersion}</version>`
  )
);
console.log(`✅ deploy.xml version synced to ${packageVersion}`);