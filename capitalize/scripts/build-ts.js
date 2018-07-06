const ngPackage = require("ng-packagr");

ngPackage
  .ngPackagr()
  .forProject('ng-package.json')
  .withTsConfig('tsconfig.lib.json')
  .build()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
