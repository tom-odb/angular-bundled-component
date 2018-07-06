const babel = require('rollup-plugin-babel');
const { uglify } = require('rollup-plugin-uglify');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const minify = require('uglify-es').minify;
const camelcase = require('lodash.camelcase');
const capitalize = require('lodash.capitalize');

const conf = require('../package.json').$package;
const systemDependencies = require('./system');

const getSingleOuput = (name, fileName, format) => {
    return {
        file: `${process.cwd()}/dist/${fileName}.${format}.js`,
        format: format,
        name: name,
        sourcemap: true,
		sourcemapFile: `${process.cwd()}/dist/${fileName}.${format}.sourcemap.js`,
		globals: getGlobals(systemDependencies),
    };
};

const getOutput = (name, fileName) => {
    return [
        getSingleOuput(name, fileName, "amd"),
        getSingleOuput(name, fileName, "cjs"),
        getSingleOuput(name, fileName, "es"),
        getSingleOuput(name, fileName, "umd"),
    ];
};

const getPlugins = () => {
    return [
        resolve({
            main: true,
            only: getExternal(conf.dependencies),
            jsnext: true,
        }),
        commonjs({
            include: [
                'node_modules/**'
            ],
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: [
                'external-helpers',
            ],
        }),
        // uglify({
        //     mangle: false
        // }, minify),
    ];
};

const getExternal = (deps = []) => {
	return deps.filter(dep => systemDependencies.indexOf(dep) < 0);
};

const getGlobals = (deps = {}) => {
	return deps.reduce((globals, dep) => Object.assign(globals, {
		[dep]: capitalize(camelcase(dep)),
	}), {});
};

module.exports = {
    getSingleOuput,
    getOutput,
	getPlugins,
	getExternal,
	getGlobals,
};
