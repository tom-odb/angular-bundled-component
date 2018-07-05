const copy = require('copy');

copy(
    `${process.cwd()}/ts-out/**/*.d.ts`,
    `${process.cwd()}/dist`,
    err => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        console.log('Types copied to dist.');
        process.exit();
    }
);