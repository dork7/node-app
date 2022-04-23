const functions = require("../utils/functions");

const initFn = () => console.log("init ran before  ");
const exitFn = () => console.log("exit ran after ");

beforeEach(() => initFn); // will run after each
afterEach(() => exitFn); // will run after each

beforeAll(() => initFn); // will run after each
afterAll(() => exitFn); // will run after each

describe("checking Name", () => {
  beforeEach(() => {
    console.log("running describe checking Name");
  });
  beforeAll(() => {
    console.log("running describe checking Name before All");
  });

  test("User is Jeff", () => {
    const user = "Jeff";
    expect(user).toBe("Jeff");
  });
});

test("null value", () => {
  expect(functions.isNull()).toBeNull();
});

test("check value should be falsy", () => {
  expect(functions.checkValue(0)).toBeFalsy();
});

test("User should be dork7", () => {
  expect(functions.createUser(0)).toEqual({
    firstName: "Dork",
    lastName: "7",
  });
});

test("Should be under 1000", () => {
  expect(functions.compareLoad(100, 100)).toBeLessThan(1000);
});

test("Check if theres and i in team", () => {
  expect("team").not.toMatch(/i/);
});

test("fetch User", async () => {
  expect.assertions(1);
  const user = await functions.fetchUser(1);
  expect(user.data.name).toBe("Leanne Graham");
});

test("reverseStringTest function exist test", () => {
  expect(functions.reverseString).toBeDefined();
});

test("reverseStringTest", () => {
  expect(functions.reverseString("lol")).toBe("lol");
});

test("chunk array test", () => {
  expect(functions.chunkArray([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
});

test("check isAnagram", () => {
  expect(functions.isAnagram("abc", "bca")).toBeTruthy();
});
