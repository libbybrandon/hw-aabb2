import { sanity } from "./sanity";

test("Sanity checks the test setup", () => {
  expect(sanity()).toBeTruthy();
});
