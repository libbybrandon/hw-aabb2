// aabb.ts

/**
 * An Axis-Aligned Bounding Box. This is a rectangular region defined in terms
 * of minimum and maximum X and Y values.
 */
export type Aabb = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

/**
 * Create and return an empty AABB, using Infinity and -Infinity for the min/max
 * values respectively.
 */
export const initAabb = (): Aabb => {
  return {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  }
};



/**
 * Adds a point to a bounding box. If the point is outside the bounding box, the
 * box's extents will grow. If it is inside the box, this has no effect.
 */
export const addPoint = (aabb: Aabb, x: number, y: number): void => {
  aabb.minX = Math.min(aabb.minX, x);
  aabb.maxX = Math.max(aabb.maxX, x);
  aabb.minY = Math.min(aabb.minY, y);
  aabb.maxY = Math.max(aabb.maxY, y);
};

/**
 * If the given AABB has been initialized with at least one point, return true.
 * Otherwise return false.
 */
export const hasData = (aabb: Aabb): boolean => {
  // IMPLEMENT
  return aabb.minX <= aabb.maxX &&
         aabb.minY <= aabb.maxY;
};

/**
 * Returns the height (change in y) of this bounding box. If the bounding box
 * does not have data (according to `hasData`) this returns NaN. If the box has
 * only a single point, it has no width, height, or area, so it should return
 * zero in that case.
 */
export const getHeight = (aabb: Aabb): number => {
  if (!hasData(aabb)){
      return NaN;
  }
  return aabb.maxY - aabb.minY;
};

/**
 * Just like getHeight, but for width.
 */
export const getWidth = (aabb: Aabb): number => {
  if (!hasData(aabb)) {
  return NaN;
  }
  return aabb.maxX - aabb.minX;
};

/**
 * Computes the area (width * height) of a box. If the bounding box does not
 * have data (according to `hasData`) this returns NaN.
 */
export const getArea = (aabb: Aabb): number => {
  if (!hasData(aabb)){
    return NaN;
  }
  return getWidth(aabb) * getHeight(aabb);
};

/**
 * Given two boxes, return their intersection as an AABB.
 *
 * If there is no such overlapping rectangle, return the same thing as
 * initAabb().
 **/
export const intersect = (box1: Aabb, box2: Aabb): Aabb => {
    const minX= Math.max(box1.minX, box2.minX);
    const maxX= Math.min(box1.maxX, box2.maxX);
    const minY= Math.max(box1.minY, box2.minY);
    const maxY= Math.min(box1.maxY, box2.maxY);

    if (minX > maxX || minY > maxY) {
        return initAabb();
    }
    return {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY,
    };
};

