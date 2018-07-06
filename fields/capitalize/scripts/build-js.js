const rollup = require('rollup');

const { input, output } = require('./rollup.config');

function generateBundle(output) {
    return rollup.rollup(input).then(bundle => {
        return bundle.generate(output)
            .then(
                () => bundle.write(output),
                err => {
                    throw err;
                }
            );
    }, err => {
        throw err;
    });
}

async function build() {
    Promise.all(output.map(o => generateBundle(o)))
    .then(() => {
        console.info('Bundles generated in dist.');
        process.exit();
    }, err => {
        console.error(err);
        process.exit(1)
    });
}

build();