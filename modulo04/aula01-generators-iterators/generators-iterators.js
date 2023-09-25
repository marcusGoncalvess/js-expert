const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 + arg2;
}

function* main() {
  yield 'Hello';
  yield '-';
  yield 'World';
  // * indica que é para executar a funcao
  yield* calculation(20, 10);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World', done: false });
assert.deepStrictEqual(generator.next(), { value: 30, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// retorna todos os resultados
assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'World', 30]);
assert.deepStrictEqual([...main()], ['Hello', '-', 'World', 30]);

// --- async interators
const { readFile, stat, readdir } = require('fs/promises');

// function* promisified() {
//   yield readFile(__filename);
//   yield Promise.resolve('hey');
// }

// Promise.all([...promisified()]).then((results) =>
//   console.log('results', results)
// );

// (async () => {
//   for await (const item of promisified()) {
//     console.log('for await', item.toString());
//   }
// })();

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

(async () => {
  for await (const item of systemInfo()) {
    console.log('systemInfo', item);
  }
})();
