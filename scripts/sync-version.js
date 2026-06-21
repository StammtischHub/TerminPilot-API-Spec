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

const mavenDeployPomPath = '.github/maven/maven-deploy-pom.xml';
const mavenDeployPomXml = fs.readFileSync(mavenDeployPomPath, 'utf8');
fs.writeFileSync(
  mavenDeployPomPath,
  mavenDeployPomXml.replace(
    /<version>.*<\/version>/,
    `<version>${packageVersion}</version>`
  )
);
console.log(`✅ .github/maven/maven-deploy-pom.xml version synced to ${packageVersion}`);