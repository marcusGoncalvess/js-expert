const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/fiveItems-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);

    await assert.rejects(result, expected);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const expected = [
      {
        id: 1,
        name: "xuxa",
        profession: "dev",
        age: 12,
      },
      {
        id: 2,
        name: "marcus",
        profession: "manager",
        age: 30,
      },
      {
        id: 3,
        name: "joao",
        profession: "QA",
        age: 54,
      },
    ];
    const result = await File.csvToJSON(filePath);
    assert.deepEqual(result, expected);
  }
})();
