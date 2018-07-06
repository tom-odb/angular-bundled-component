const exec = require('./bash');
const { $fields } = require('../package.json');

Promise.all([
  $fields.map(field => exec(`npm link @fields/${field}`)),
]).then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(1);
  }
);
