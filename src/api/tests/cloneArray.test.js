const cloneArray = require("../utils/cloneArray");

test("cloneArrayTest", () => {
  const arr = [1, 2, 3, 4];
  expect(cloneArray(arr)).toEqual(arr);
});
