# General advice on what to do

## TLDR

1. ✨ Do this before you forget: click
   https://github.com/apps/codezeug-graderbot/installations/new to connect your
   repo to the grader bot 🤖. It takes five seconds and is required for you to
   submit homework.
2. For help with the specific homework assignment, see `README.md`.
3. Install [NodeJS and NPM](https://nodejs.org/) if they aren't installed yet.
4. Run `npm i` from the homework's top directory to install packages.
5. Incrementally write code: switch between editing and testing.
    * Edit in whichever editor you like
    * Test with `npm test` or `npm test sometestname`
6. You're encouraged to commit incremental improvements to git.
7. Submit homework.

## Command Line, Git, and GitHub

This homework asks you to use a command line interface and git. If you need a
refresher, here are a couple crash courses:

* [Command Line Interface (CLI) Crash Course](https://gist.github.com/johnsogg/bfa37707275b67e4e8ac6a87009cc491)
* [Git and GitHub Crash Course](https://gist.github.com/johnsogg/56df0f970bd9e019da861fd37ceb42f8)

## Install NodeJS and NPM

To work this assignment you'll need NodeJS installed. Node is a runtime
environment that understands Javascript. A related tool is called NPM, which
stands for the Node Package Manager, and it comes along with Node. Go to
[nodejs.org](https://nodejs.org/) to install them. You'll only need to download
and install a single package and you'll get both of those tools. And you only
need to do this one time for the lifetime of your computer.

To determine if these tools are installed on your machine, open a command line
and run `node --version` and `npm --version`. If they're there, they'll report
their version numbers. I happen to get this:

```console
$ node --version
v20.8.0
$ npm --version
10.1.0
```

## One time for this repo: install packages

The homework assignment has a few dependencies - these are separate libraries
that this code requires to build, run, or test. Fortunately, the `npm` tool
makes it very easy to work with dependencies.

Open a terminal, and go to the directory where the `package.json` file is. Then
run `npm install`, or as a shortcut, simply `npm i`. It will read the package
file (and you should check it out too!) and see what the dependencies are. It
then goes off to npmjs.com and fetches them. It also gets the
dependencies-of-dependencies, and all of _their_ dependencies as well.

If you get warnings about packages being deprecated, don't worry about it.

The homework depends on a few things, in case you're curious. The rabbit hole
here is deep, so you can go off and research more if you like, but the summary
is:

* `jest`: this is the unit testing tool, and we will use it to automatically
  grade your work.
* `typescript`: this lets your editor and the other tools understand the
  Typescript language.

## Write Code

Each assignment has a bunch of source files that end with `.ts` which tells the
editor that they're Typescript files. Two broad groups here: _test_ files and
_implementation_ files.

**Test files** have names that end with `test.ts`, such as `aabb.add.test.ts`.
You should not commit any edits you might make to them. If you do, my spies will
know and it will get awkward. Definitely feel free to play around with them,
though - there's a lot to learn from test files!

**Implementation files** are the other `.ts` files, like `aabb.ts`, and these
are the ones you are meant to edit for your homework. They are filled with type
definitions and functions, and many of those are just stubs for you to fill in.
Just look for `// IMPLEMENT` and replace that with your code. Read the comment
for specifics. For example:

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

Here, there's a function called `initAabb`, and it should return an `Aabb`
object. The comment tells you what to do. In this case, there is also a `return`
statement - you'll also need to replace this with something that works. These
are included to make the program compile.

It doesn't technically matter which order you implement things, but the intent
is for you to build things in the order they appear in the file. That's not a
rule, just friendly advice.

You can use any editor you like to work with the code. Personally I use VS Code,
but that's up to you.

## Running Tests

From the command line, make sure you're in the top level directory (the one with
`package.json` in it). From there:

* **`npm test`**: Runs all tests
* **`npm test foo`** Runs all tests that have 'foo' in the name

This will run the `test` target defined in the `package.json` file, which just
defers to the local copy of `jest`. Run all the tests to see what is left to
work on, and then use the second form to run isolated tests.

The test files are all named things like `aabb.calc.test.ts`, so if you want to
focus on knocking out that test by itself, run `npm test calc`. See the pattern?

Each test file will correspond to a batch of points when this is graded.

**Pro Tip** - open the test files that relate to the code you're implementing.
They tell you exactly what they're doing and what they expect. If you're
confused about why your code is failing the tests, you can just read the tests
and find out. Very informative!

There is one special test, `sanity.test.ts` and its related source file,
`sanity.ts`. This is a sanity test of the system setup, and _it should pass out
of the box_, after you've run `npm i`. If it doesn't, there's some bigger
problem and you should ask for help.

## Use Git To Submit Homework

The homework assignment you're looking at comes from GitHub, and you'll make
your own **private** copy of it. Your copy is separate from everybody else's.
You'll edit code, add/commit changes locally, and when you're ready for it to be
graded, you'll push it up to GitHub.

### One-time setup

1. On the homework's GitHub page, click **Use this template** and choose
   **Create a new repository**. Put it in your own account, and set it to
   **Private**. Name it whatever you like. Don't fork it (forks of a public repo
   are public, and then anyone can read your work), and don't clone it and push
   to a new repo: the grader finds your homework through "Use this template".
2. Install the grading app on your new repo: https://github.com/apps/codezeug-graderbot/installations/new. When GitHub asks
   which repositories to allow, choose **Only select repositories** and pick
   just this homework's repo. This is how the grader gets permission to read
   your code, and it works without us having to be added as collaborators.
3. Clone your repo to your computer.
4. Run `npm run check-setup` from the homework directory. It checks that your
   repo is private, is your own copy (not the course template), and that the
   grading app can see it. It tells you what to fix if something's off.

### The edit/test/push loop

The general flow is like this. My username is `johnsogg` and yours will differ.

```console
$ git clone git@github.com:johnsogg/hw-aabb.git
$ cd hw-aabb                     # be sure you're in the homework dir!
$ npm i                          # install dependencies
$ npm test sanity                # ensure setup is correct - should pass!
$ npm test                       # run all tests, see which fail
$                                # edit with any editor you like
$ npm test calc                  # run specific 'calc' test
$ git add -u                     # add edited files to changeset
$ git commit -m "Nailed it"      # commit changeset
$ npm test                       # run tests again, hopefully all pass?
$                                # repeat above process until you're happy
$ git push                       # send it off to GitHub
```

Pushing puts your work where the grader can see it. Grading is done by the
instructors after the due date, using the same `npm test` you run locally, on
the code that is in your repo at that time. If the score you see locally is
different from the score you get back, tell us about it.

You're welcome to read and even experiment with the `*.test.ts` files; that's a
good way to learn how they work. When we grade, we run our own pristine copies
of the tests and config files, so changing them won't change your grade (and
it's not a problem). The real work happens in the source file you're asked to
implement.

You can `git push` as often as you like. Whatever is in your repo at grading
time is what gets graded.
