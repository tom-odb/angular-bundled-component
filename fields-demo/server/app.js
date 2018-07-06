const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.route('/fields').get((req, res, next) => {
  const root = path.join(__dirname, 'node_modules', '@fields');
  const fields = fs.readdirSync(root);

  res.status(200).json(fields);
});

app.route('/fields/:field').get((req, res, next) => {
  if (!req.params.field) {
    return res.status(400).json({ err: 'no field specified' });
  }

  const bundle = fs.readFileSync(path.join(__dirname, 'node_modules', '@fields', req.params.field, `fields-${req.params.field}.umd.js`), { encoding: 'utf-8' });

  res.status(200).send(bundle);
});

app.listen(3030, () => {
  console.info('Server listening at port 3030');
});
