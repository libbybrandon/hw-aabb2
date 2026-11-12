import { getArea, getHeight, getWidth, initAabb } from "./aabb";

test("Build an AABB", () => {
  const aabb = initAabb();

  expect(aabb.minY).toBeCloseTo(Infinity);
  expect(aabb.minX).toBeCloseTo(Infinity);
  expect(aabb.maxY).toBeCloseTo(-Infinity);
  expect(aabb.maxX).toBeCloseTo(-Infinity);

  // until the aabb has data, the width/height/area should all be NaN
  expect(getWidth(aabb)).toBe(NaN);
  expect(getHeight(aabb)).toBe(NaN);
  expect(getArea(aabb)).toBe(NaN);
});
