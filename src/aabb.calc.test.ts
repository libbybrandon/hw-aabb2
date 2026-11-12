import { addPoint, getArea, getHeight, getWidth, initAabb } from "./aabb";

test("Check width/height/area when the box doesn't have data", () => {
  const aabb = initAabb();
  expect(getWidth(aabb)).toBeNaN();
  expect(getHeight(aabb)).toBeNaN();
  expect(getArea(aabb)).toBeNaN();
});

test("Checks width/height/area if the box has a single point", () => {
  const aabb = initAabb();
  addPoint(aabb, 10, 20);
  expect(getWidth(aabb)).toBeCloseTo(0);
  expect(getHeight(aabb)).toBeCloseTo(0);
  expect(getArea(aabb)).toBeCloseTo(0);
});

test("Checks width/height/area for boxes with two or more points", () => {
  const aabb = initAabb();
  addPoint(aabb, 10, 20);
  addPoint(aabb, 10, 30);
  expect(getHeight(aabb)).toBeCloseTo(10);
  expect(getWidth(aabb)).toBeCloseTo(0);
  expect(getArea(aabb)).toBeCloseTo(0);

  addPoint(aabb, 20, 30);
  expect(getHeight(aabb)).toBeCloseTo(10);
  expect(getWidth(aabb)).toBeCloseTo(10);
  expect(getArea(aabb)).toBeCloseTo(100);
});
