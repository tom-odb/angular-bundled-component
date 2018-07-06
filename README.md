# Bundled Angular Components

This is a PoC to research the possibilities and restrictions in dynamically loading and compiling Angular (2+) components.

# Getting Started

Run `init.sh` and watch the magic happen.

## The magic

The init script will run these npm commands in order:

- move into each field (capitalize & slug), run `install`, `build` and `link` the dist folder
- move into the demo app, run `install` (will run the `install` and `link` for the server in `postinstall`)
- `start` the demo app

# Do's and dont's

The goal of this PoC was to find out if it is at all possible to dynamically load a script file into a running app. In the current state, this is possible if certain conditions are met:

- the bundle cannot have any external dependencies (aside from Angular)
- the bundle cannot declare global variables that could conflict with the app scope

Besides the dependency issue, some restrictions should be followed:

- the bundle should prioritize size, always
- the bundle should be scoped

# Modules

To keep the development of a module as close to "normal" as possible, [rollup](https://rollupjs.org/guide/en) is added *after* [ng-packagr](https://github.com/dherges/ng-packagr) in the build chain.

We run the `fesm2015` bundle (which is the default for the angular-cli as well) through rollup and try to resolve any dependencies.

The resulting bundle will contain bundles in varying module formats and a cleaned up `package.json`.

# Dependencies

List your npm dependencies like you would normally:

- in the `package.json` file
- in the `ng-package.json` file as `whiteListedNonPeerDependencies` (or turn off the warning [if you know what you are doing](https://github.com/dherges/ng-packagr/blob/master/docs/dependencies.md))

Any dependencies found in the `package.json` file will be handled by [rollup](https://rollupjs.org/guide/en) and added to the compiled bundle.

Keep in mind that nested dependencies will not be added automatically, since the code that imports them will not be analyzed. If you need to include these in your bundle, you need to handle this manually, either in the code or rollup.