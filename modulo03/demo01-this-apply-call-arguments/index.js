'use strict';

const {
  watch,
  promises: { readFile },
} = require('fs');

class File {
  watch(event, filename) {
    console.log('arguments', arguments);
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();
watch(__filename, file.watch.bind(file));

// parecido com mock dos testes, substitui a função quando é chamada lá dentro
file.watch.call(
  { showContent: () => console.log('call: hey sinon') },
  null,
  __filename
);

// igual o anterior, mas passa um array de segundo parametro
file.watch.apply({ showContent: () => console.log('call: hey sinon') }, [
  undefined,
  __filename,
]);
