const packageJson = require('../package.json');
const systemDependencies = require('./system');

const rollupProps = {
    'fileName': 'fields-slug',
    'moduleName': 'FieldsSlug'
};

const rollupHelpers = require('./rollup.helpers');

module.exports = {
	input: {
		input: `${process.cwd()}/ts-out/fesm2015/fields-slug.js`,
		context: 'this',
		external: systemDependencies,
		plugins: rollupHelpers.getPlugins(),
	},
	output: rollupHelpers.getOutput(packageJson.name, rollupProps.fileName),
};
