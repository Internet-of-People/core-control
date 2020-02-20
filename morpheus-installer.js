const fs = require('fs');

const pluginsPath = process.argv[2];
if(!pluginsPath) {
  console.error('ERROR: the Morpheus installer script must have an argument passed: the path of the plugins.js file.');
  process.exit(1);
}

if(!fs.existsSync(pluginsPath)) {
  console.error(`ERROR: file does not exist at ${pluginsPath}`);
  process.exit(1);
}

console.log(`Updating ${pluginsPath}...`);

let plugins = fs.readFileSync(pluginsPath).toString();
if(plugins.indexOf('@internet-of-people/morpheus-hydra-plugin')>-1) {
  console.log('Plugins already contains Morpheus plugin.');
  process.exit(0);
}

plugins = plugins.replace('"@arkecosystem/core-transaction-pool"','"@internet-of-people/morpheus-hydra-plugin": {},\n    "@arkecosystem/core-transaction-pool"');

fs.writeFileSync(pluginsPath, plugins);

console.log('Plugins file has been updated.');