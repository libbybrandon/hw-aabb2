import { intersect } from "./aabb";

const star = {
  minX: 16,
  maxX: 66,
  minY: 114,
  maxY: 164,
};

const triangle = {
  minX: 16,
  maxX: 113.68,
  minY: 57.79,
  maxY: 155.47,
};

const dude = {
  minX: 97,
  maxX: 197,
  minY: 52,
  maxY: 197,
};

const outside = {
  minX: 13,
  maxX: 150,
  minY: 16,
  maxY: 146,
};
const inside = {
  minX: 58,
  maxX: 104,
  minY: 62,
  maxY: 107,
};

const square = {
  minX: 121,
  maxX: 167,
  minY: 171,
  maxY: 216,
};

const pent = {
  minX: 158,
  maxX: 204,
  minY: 114,
  maxY: 159,
};

test("Checks if we can get the correct intersection between two AABBs [star and triangle]", () => {
  const ix = intersect(star, triangle);
  expect(ix).not.toBeNull();
  expect(ix.minX).toBeCloseTo(16);
  expect(ix.minY).toBeCloseTo(114);
  expect(ix.maxX).toBeCloseTo(66);
  expect(ix.maxY).toBeCloseTo(155.47);
});

test("Checks if we can get no intersection between two AABBs [star and dude]", () => {
  const nada = intersect(star, dude); // the dude and the star, obviously no overlap.
  expect(nada).not.toBeNull();
  expect(nada.minY).toEqual(Infinity);
  expect(nada.minX).toEqual(Infinity);
  expect(nada.maxY).toEqual(-Infinity);
  expect(nada.maxX).toEqual(-Infinity);
});

test("Checks if we can get fully contained intersection between two AABBs", () => {
  const contained = intersect(outside, inside);
  expect(contained).not.toBeNull();
  expect(contained.minX).toBeCloseTo(inside.minX);
  expect(contained.minY).toBeCloseTo(inside.minY);
  expect(contained.maxX).toBeCloseTo(inside.maxX);
  expect(contained.maxY).toBeCloseTo(inside.maxY);
});

test("Checks for no overlap when two boxes overlap in one dimension only", () => {
  const nadaPent = intersect(pent, outside);
  expect(nadaPent).not.toBeNull();
  expect(nadaPent.minY).toEqual(Infinity);
  expect(nadaPent.minX).toEqual(Infinity);
  expect(nadaPent.maxY).toEqual(-Infinity);
  expect(nadaPent.maxX).toEqual(-Infinity);

  const nadaSquare = intersect(square, outside);
  expect(nadaSquare).not.toBeNull();
  expect(nadaSquare.minY).toEqual(Infinity);
  expect(nadaSquare.minX).toEqual(Infinity);
  expect(nadaSquare.maxY).toEqual(-Infinity);
  expect(nadaSquare.maxX).toEqual(-Infinity);
});
