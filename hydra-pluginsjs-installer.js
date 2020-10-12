const fs = require('fs');

const pluginsPath = process.argv[2];
if(!pluginsPath) {
  console.error('ERROR: the Hydra installer script must have an argument passed: the path of the plugins.js file.');
  process.exit(1);
}

if(!fs.existsSync(pluginsPath)) {
  console.error(`ERROR: file does not exist at ${pluginsPath}`);
  process.exit(1);
}

console.log(`Updating ${pluginsPath}...`);

let plugins = fs.readFileSync(pluginsPath).toString();
if(plugins.indexOf('@internet-of-people/hydra-plugin')>-1) {
  console.log('Plugins already contains the Hydra plugin.');
  process.exit(0);
}

var replaceTarget, replaceTo;

if(plugins.indexOf('@internet-of-people/morpheus-hydra-plugin')>-1) { // upgrading from 2.6.31+p2
  replaceTarget = '@internet-of-people/morpheus-hydra-plugin';
  replaceTo = '@internet-of-people/hydra-plugin';
}
else {
  replaceTarget = '"@arkecosystem/core-transaction-pool"';
  replaceTo = '"@internet-of-people/hydra-plugin": {},\n    "@arkecosystem/core-transaction-pool"';
}

plugins = plugins.replace(replaceTarget, replaceTo);

fs.writeFileSync(pluginsPath, plugins);

console.log('Plugins file has been updated.');