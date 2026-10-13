import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("reference server package declares no live-system integration", async () => {
  const source = await readFile(new URL("../src/server.ts", import.meta.url), "utf8");
  assert.match(source, /external_side_effects: false/);
  assert.doesNotMatch(source, /fetch\(|child_process|exec\(|spawn\(|writeFile\(/);
});
