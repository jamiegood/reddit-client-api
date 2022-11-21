import { add } from "../src/index";

describe("testing index file", () => {
  test("empty string should result in zero", () => {
    expect(add("")).toBe(0);
  });

  test("1,2 string should equal three", () => {
    expect(add("1,2")).toBe(3);
  });
});
