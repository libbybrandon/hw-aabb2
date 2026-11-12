#!/usr/bin/env node
// Checks that your homework repo is set up the way the grader expects.
// No dependencies; needs Node 18+ (for built-in fetch) and git.
//
//   npm run check-setup
//
// This is a convenience check. The instructors' grader makes the final call.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

// Where the grader publishes the list of repos it can read. See the grader
// repo's "publish installations" workflow. The list contains sha256 hashes of
// lowercase "owner/repo" strings, not the names themselves.
const INSTALLATIONS_URL = "https://codezeug.github.io/grader/installations.json";
const GRADER_APP_URL = "https://github.com/apps/codezeug-graderbot/installations/new";
const TEMPLATE_OWNER = "codezeug";

let failures = 0;
let warnings = 0;
const ok = (msg) => console.log(`  ok    ${msg}`);
const warn = (msg) => {
  warnings++;
  console.log(`  warn  ${msg}`);
};
const fail = (msg) => {
  failures++;
  console.log(`  FAIL  ${msg}`);
};

const getRemote = () => {
  if (process.env.CHECK_SETUP_REMOTE) return process.env.CHECK_SETUP_REMOTE; // for testing
  try {
    return execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
};

// Handles git@github.com:owner/repo.git, ssh://git@github.com/owner/repo.git,
// and https://github.com/owner/repo(.git)
const parseRemote = (url) => {
  const m = url.match(/github\.com[:/]+([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
  return m ? { owner: m[1], repo: m[2] } : null;
};

const main = async () => {
  console.log("Checking your homework setup...\n");

  const remote = getRemote();
  if (!remote) {
    fail("This folder has no git remote named 'origin'.");
    console.log(
      "        Make your own copy with 'Use this template' on GitHub, then clone *that*."
    );
    return;
  }
  const parsed = parseRemote(remote);
  if (!parsed) {
    fail(`Couldn't recognize 'origin' as a GitHub repo: ${remote}`);
    return;
  }
  const { owner, repo } = parsed;
  const full = `${owner}/${repo}`;
  console.log(`  repo: ${full}\n`);

  // 1. Is this the template itself rather than the student's own copy?
  if (owner.toLowerCase() === TEMPLATE_OWNER) {
    fail(`'origin' is the course template (${full}), not your own copy.`);
    console.log(
      "        On the template's GitHub page, click 'Use this template' -> 'Create a new\n" +
        "        repository', make it Private under your own account, and clone that."
    );
    return;
  }
  ok("origin is not the course template");

  // 2. Is the repo public? An unauthenticated request only succeeds for
  //    public repos, so a 200 means anyone can read your work.
  try {
    const res = await fetch(`https://api.github.com/repos/${full}`, {
      headers: { "User-Agent": "hw-check-setup", Accept: "application/vnd.github+json" },
    });
    if (res.status === 200) {
      const body = await res.json();
      if (body.private === false) {
        fail("Your repo is PUBLIC. Anyone can read your code.");
        console.log(
          `        Fix: github.com/${full}/settings -> Danger Zone -> Change visibility -> Private.`
        );
      } else {
        ok("repo is private");
      }
    } else if (res.status === 404) {
      ok("repo is private (not visible without logging in)");
    } else if (res.status === 403 || res.status === 429) {
      warn("GitHub rate-limited this check; couldn't tell if the repo is private.");
    } else {
      warn(`Unexpected response from GitHub (${res.status}); skipped privacy check.`);
    }
  } catch {
    warn("Couldn't reach GitHub (offline?); skipped the privacy check.");
  }

  // 3. Has the grading app been installed on this repo?
  if (!INSTALLATIONS_URL) {
    warn("Grader install check isn't enabled yet; skipping it.");
  } else {
    try {
      const res = await fetch(INSTALLATIONS_URL, { headers: { "User-Agent": "hw-check-setup" } });
      if (!res.ok) throw new Error(String(res.status));
      const { hashes } = await res.json();
      const h = createHash("sha256").update(full.toLowerCase()).digest("hex");
      if (hashes.includes(h)) {
        ok("the grading app can see your repo");
      } else {
        fail("The grading app isn't installed on your repo yet.");
        console.log(
          `        Install it: ${GRADER_APP_URL}\n` +
            "        Choose 'Only select repositories' and pick just this repo.\n" +
            "\n" +
            "        If you installed the Codezeug Robot within the past two hours, this check\n" +
            "        can still wrongly say it isn't installed (the list it reads is only\n" +
            "        refreshed about every two hours). If you did install it recently, just\n" +
            "        wait a bit, run this check again, and it will probably say it is OK."
        );
      }
    } catch {
      warn("Couldn't read the grader's list; skipped the app install check.");
    }
  }
};

await main();

console.log("");
if (failures > 0) {
  console.log(`${failures} problem(s) need fixing before your work can be graded.`);
  process.exit(1);
} else if (warnings > 0) {
  console.log("No problems found, but some checks were skipped (see warnings above).");
} else {
  console.log("All good.");
}
