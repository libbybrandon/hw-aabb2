# Axis Aligned Bounding Boxes

> ✨ Remember to click https://github.com/apps/codezeug-graderbot/installations/new to connect your repo to the grader bot if you are going to turn this in as homework in CF1 or CF2 🤖

**NOTE:** for general advice on how to get, edit, and submit homework, check out
the [GENERAL.md](GENERAL.md) file. That will be the case for all homeworks.

## Overview

An Axis Aligned Bounding Box (AABB) in 2D is sometimes called a [Minimum
Bounding Rectangle](https://en.wikipedia.org/wiki/Minimum_bounding_rectangle).
It is the smallest rectangle whose edges are parallel to the coordinate axes. 

An AABB lets you do useful things like hit tests. These test if two objects
_might_ overlap, or if a user _might_ have clicked on something. The
calculations involved are extremely fast. If a hit test can exclude most things,
then we can run more computationally expensive routines on what remains.

![alt text](<Statue of Liberty AABB.png>)

In this picture of the Statue of Liberty, the lightly shaded region represents
the AABB. The red lines represent the minimum or maximum X and Y values, and are
all parallel to the X and Y axes. An AABB is _not_ allowed to be rotated to make
it even smaller.

## Why are we looking at AABBs?

An AABB is very simple, and nobody I know would argue that it is a classical
data structure typically covered in a class like this. We are starting with
AABBs because they are useful, easy to understand, and might be something you'll
eventually need to build yourself. They're the sort of "in the wild" data
structure that you'll build and use all the time.

Despite that, they share properties with classical structures:

* They record structured data. Specifically, AABBs describe the minimum and
  maximum extents of some geometry. We have some choices around how we record
  this:
    * Record a center point with width and height
    * Record a minimum X,Y location and a width and height
    * Record minimum and maximum X, Y locations (this is what we will do here)
* There are operations you can perform to modify and query them:
    * How do we initialize the structure?
    * How do we augment it? In this case, adding geometry in the form of points.
    * What questions can it answer? Like what is the area? Or do two AABBs
      intersect? What is the intersection?

Over the rest of this class we'll look at more complex data structures but they
all come down to this: they record data and give us operations to modify and
query them.

## This is a meta-homework

The code you'll write for this assignment is "straightforward" - scare quotes
because many of you are still just learning syntax, so we will cover nearly
everything in detail so you can more or less follow along and complete the
assignment without struggling.

The point here is to get into the swing of things. We will use GitHub
to distribute the assignments, and you'll need to use Git, edit code on your
local computer with an editor of your choice (maybe VS Code), run commands on
the command line, and (of course) do the data structures work. All of this is
important, as you'll need to use Git to turn in your work.

## Read the README

The README.md file has all you need to understand the structure of the homework
assignment - how to get the code, set up the project locally, run tests, and
add/commit/push your code to Github for grading.

The process should be very similar for all homework assignments in the course.

## Specific AABB advice

The file you edit for this homework is `aabb.ts`.

There are four test files. They test the capabilities of your data structure.
Here they are, in the order you should probably tackle them:

* `init`: create a new AABB that has a special 'no value' value.
* `add`: add 2D points that might extend the AABB's bounds, or not.
* `calc`: query the AABB to get the width, height, and area values.
* `intersect`: find the overlap (if any) of two AABB structures.

The intersection tests uses bounding boxes derived from these super sweet
images:

![alt text](<AABB Examples.png>) ![alt text](<AABB Examples - containment.png>)

## Example Solution for `initAabb`

Open up the `aabb.ts` file. The first thing that says `// IMPLEMENT` is the
`initAabb` function. It looks like this:

```ts
/**
 * Create and return an empty AABB, using Infinity and -Infinity for the min/max
 * values respectively.
 */
export const initAabb = (): Aabb => {
    // IMPLEMENT
    return null;
}
```

The comment tells you what to do. In general, that is the case - any data type
or function that you are to implement will have a comment that says what it is
supposed to be or do. The `README.md` file won't spell out the details (this is
the exception).

Now look at the `aabb.init.test.ts` file. It has something like this (I'm
trimming out the things that I don't mention here):

```ts
test("Build an AABB", () => {
    const aabb = initAabb();
    expect(aabb.minY).toBeCloseTo(Infinity);
    expect(getArea(aabb)).toBe(NaN);
});
```

This says: There is a test called 'Build an AABB', and when it runs, first
create a new `aabb` that is the result of calling `initAabb`. The `aabb.minY`
property is expected to be positive infinity, and calling `getArea` using the
`aabb` as an argument is expected to return `NaN` ("not a number" - this is a
special value in Javascript).

The actual test has other things involved as well, but they follow that pattern.

Run this particular test with `npm test init`. The command you use is simply the
bit of the file name that is different from the others, so in this case, `init`.
Same pattern for all the rest. When you run that command without editing the
solution file at all, it will report 

    TypeError: Cannot read properties of null (reading 'minY')

That's to be expected, because the initial implementation of `initAabb` simply
returns `null`. The error message kind of sucks when you first start out (and
frankly, for years after that as well). But you'll learn to interpret cryptic
messages like this in time. I promise!

Now if you read the comment in the implementation file, you can write the file.
Two mildly tricky things here:

1. How to write "negative infinity". (A: just stick a `-` in front).
2. What is the exact structure of the `Aabb` type? (A: look at the type
   definition at the top of the file!)

Here is the full implementation:

```ts
/**
 * Create and return an empty AABB, using Infinity and -Infinity for the min/max
 * values respectively.
 */
export const initAabb = (): Aabb => {
    return ({
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
    });
}
```

Notice how the `// IMPLEMENT` and `return null` parts aren't there. If you
remove the `// IMPLEMENT` then you can just search through the file for all the
things that you haven't done yet. Not at all required for the autograding, but
that will make your life better.

**Good Luck!**
