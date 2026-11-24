// Loading Screen Gold entry for make.fun.
// Writes exactly one original one-line loading-screen tip (98 characters)
// to /output/entry.txt. Fully offline and deterministic: no network, no
// clock, no randomness, no environment reads. The line is a fixed literal.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Tip: your agent fixed the bug three prompts ago. It is now waiting for you to stop fixing the fix.";

// Enforce the sealed gate's own rule at runtime: one line, 1-200 chars,
// never only whitespace. Fail loudly instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error("tip must be a single line of 1-200 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written: the file on disk must be byte-identical to
// the line, so a partial or recoded write fails loudly instead of grading.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt on disk differs from the tip");
}
