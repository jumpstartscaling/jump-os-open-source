import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("public HTTP entry point has bounded, simulation-only routes", () => {
  const path = new URL("../src/http.ts", import.meta.url);
  assert.equal(existsSync(path), true, "src/http.ts must provide the public HTTP entry point");
  const source = readFileSync(path, "utf8");
  assert.match(source, /MAX_BODY_BYTES/);
  assert.match(source, /healthz/);
  assert.match(source, /\/mcp/);
  assert.doesNotMatch(source, /^\s*(await\s+)?fetch\(/m);
  assert.doesNotMatch(source, /child_process|exec\(|spawn\(|writeFile\(/);
});
