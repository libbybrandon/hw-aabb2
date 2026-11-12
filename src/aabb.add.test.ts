import { addPoint, initAabb } from "./aabb";

test("Tests the addPoint function and resulting data structure state", () => {
  const aabb = initAabb();
  addPoint(aabb, 10, 20);
  expect(aabb.minX).toBeCloseTo(10);
  expect(aabb.maxX).toBeCloseTo(10);
  expect(aabb.minY).toBeCloseTo(20);
  expect(aabb.maxY).toBeCloseTo(20);

  addPoint(aabb, -5, 15);
  expect(aabb.minX).toBeCloseTo(-5);
  expect(aabb.maxX).toBeCloseTo(10);
  expect(aabb.minY).toBeCloseTo(15);
  expect(aabb.maxY).toBeCloseTo(20);

  addPoint(aabb, 5, 18);
  expect(aabb.minX).toBeCloseTo(-5);
  expect(aabb.maxX).toBeCloseTo(10);
  expect(aabb.minY).toBeCloseTo(15);
  expect(aabb.maxY).toBeCloseTo(20);
});
