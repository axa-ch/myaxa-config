const test = require('tape');
const fs = require('fs').promises;
const prettier = require('prettier');

const api = require('../index');

test('Prettier JS config', async (assert) => {
  const config = {
    ...api.prettier.base,
    filepath: 'test/fixtures/valid.js',
  };

  const [rawValidJS, rawInvalidJS] = await Promise.all([
    fs.readFile('tests/fixtures/valid-ts.ts'),
    fs.readFile('tests/fixtures/invalid-ts.ts'),
  ]);

  const prettierOkOnValidJS = prettier.check(rawValidJS.toString(), config);
  const prettierOkOnInvalidJS = prettier.check(rawInvalidJS.toString(), config);
  assert.deepEqual([prettierOkOnValidJS, prettierOkOnInvalidJS], [true, false], 'Detects unformatted JS files.');
  assert.end();
});
