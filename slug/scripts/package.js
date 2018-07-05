const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));
delete packageJson['scripts'];
delete packageJson['private'];
delete packageJson['devDependencies'];
delete packageJson['directories'];
delete packageJson['$rollup'];

fs.writeFileSync(`${process.cwd()}/dist/package.json`, JSON.stringify(packageJson, undefined, 2));

process.exit();
