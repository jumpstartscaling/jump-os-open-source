import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { validateProfile } from "../dist/validator.js";

test("validator and privacy-conscious usage modules exist", () => {
  assert.equal(existsSync(new URL("../src/validator.ts", import.meta.url)), true, "validator module must exist");
  assert.equal(existsSync(new URL("../src/usage.ts", import.meta.url)), true, "usage module must exist");
});

test("mutating MCP profiles require policy, verification, rollback, and adapter boundaries", () => {
  const result = validateProfile({ name: "fictional", components: ["identity", "route", "task", "worker"], mutates_state: true, uses_mcp: true });
  assert.equal(result.assessment, "insufficient_baseline");
  assert.ok(result.findings.some((finding) => finding.component === "policy" && finding.level === "error"));
  assert.ok(result.findings.some((finding) => finding.component === "verification" && finding.level === "error"));
  assert.ok(result.findings.some((finding) => finding.component === "rollback" && finding.level === "error"));
});
