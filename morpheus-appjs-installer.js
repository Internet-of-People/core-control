const fs = require('fs');

const appjsPath = process.argv[2];
if(!appjsPath) {
  console.error('ERROR: the Morpheus installer script must have an argument passed: the path of the app.js file.');
  process.exit(1);
}

if(!fs.existsSync(appjsPath)) {
  console.error(`ERROR: file does not exist at ${appjsPath}`);
  process.exit(1);
}

console.log(`Updating ${appjsPath}...`);

let plugins = fs.readFileSync(appjsPath).toString();
if(plugins.indexOf('@internet-of-people/morpheus-hydra-plugin')>-1) {
  console.log('Plugins already contains Morpheus plugin.');
  process.exit(0);
}

var find = '"@arkecosystem/core-magistrate-transactions"';
var regexp = new RegExp(find, 'g');

plugins = plugins.replace(
  regexp,
  '"@arkecosystem/core-magistrate-transactions", "@internet-of-people/morpheus-hydra-plugin"'
);

fs.writeFileSync(appjsPath, plugins);

console.log('Appjs file has been updated.');