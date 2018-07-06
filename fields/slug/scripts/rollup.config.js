const camelcase = require('lodash.camelcase');
const capitalize = require('lodash.capitalize');
const slugify = require('slug');

const packageJson = require('../package.json');
const systemDependencies = require('./system');

const rollupProps = {
    'fileName': slugify(packageJson.name, {
		replace: true,
		remove: /[@]/,
		charmap: Object.assign({}, slugify.charmap, {
			'/': '-',
		}),
		replacement: '-',
		lower: true,
	}),
    'moduleName': capitalize(camelcase(packageJson.name)),
};

const rollupHelpers = require('./rollup.helpers');

module.exports = {
	input: {
		input: `${process.cwd()}/ts-out/fesm2015/${rollupProps.fileName}.js`,
		context: 'this',
		external: systemDependencies,
		plugins: rollupHelpers.getPlugins(),
	},
	output: rollupHelpers.getOutput(packageJson.name, rollupProps.fileName),
};
