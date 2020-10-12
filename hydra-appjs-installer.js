const fs = require('fs');

const appjsPath = process.argv[2];
if(!appjsPath) {
  console.error('ERROR: the Hydra installer script must have an argument passed: the path of the app.js file.');
  process.exit(1);
}

if(!fs.existsSync(appjsPath)) {
  console.error(`ERROR: file does not exist at ${appjsPath}`);
  process.exit(1);
}

console.log(`Updating ${appjsPath}...`);

let appjs = fs.readFileSync(appjsPath).toString();
if(appjs.indexOf('@internet-of-people/hydra-plugin')>-1) {
  console.log('Plugins already contains Morpheus plugin.');
  process.exit(0);
}

var replaceTarget, replaceTo;

if(appjs.indexOf('@internet-of-people/morpheus-hydra-plugin')>-1) { // upgrading from 2.6.31+p2
  replaceTarget = '@internet-of-people/morpheus-hydra-plugin';
  replaceTo = '@internet-of-people/hydra-plugin';
}
else {
  replaceTarget = '"@arkecosystem/core-magistrate-transactions"';
  replaceTo = '"@arkecosystem/core-magistrate-transactions", "@internet-of-people/hydra-plugin"';
}

var regexp = new RegExp(replaceTarget, 'g');

appjs = appjs.replace(
  regexp,
  replaceTo
);

fs.writeFileSync(appjsPath, appjs);

console.log('Appjs file has been updated.');