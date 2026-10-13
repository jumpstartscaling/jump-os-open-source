export const roles = ["architect", "operator", "implementer", "security_reviewer", "contributor"] as const;
export const components = ["ontology", "identity", "route", "task", "policy", "worker", "receipt", "evidence", "verification", "rollback", "mcp_adapter"] as const;

type Profile = Record<string, unknown>;

const guidance: Record<(typeof roles)[number], { focus: string; documents: string[]; checklist: string[] }> = {
  architect: { focus: "Authority separation and bounded system design.", documents: ["ontology/relationships.md", "guides/how-to-identify-authority.md", "docs/operational-lessons.md"], checklist: ["Name each authority.", "Separate route from task authority.", "Define proof and rollback boundaries."] },
  operator: { focus: "Runtime observability, safe execution, and incident handling.", documents: ["uses/incident-response-and-emergency-stop.md", "guides/how-to-handle-unknown-state.md", "docs/emergency-stop.md"], checklist: ["Capture runtime evidence.", "Define unknown-state handling.", "Verify stop and rollback independently."] },
  implementer: { focus: "Machine contracts, adapters, and validation.", documents: ["schemas/README.md", "docs/protocol-adapter-boundaries.md", "examples/VALIDATION.md"], checklist: ["Use durable idempotency.", "Keep adapters non-authoritative.", "Validate receipts and negative cases."] },
  security_reviewer: { focus: "Trust boundaries, least privilege, and evidence integrity.", documents: ["docs/threat-model.md", "options/identity-and-workload-auth.md", "options/policy-engines.md"], checklist: ["Bind principal, task, target, and policy.", "Reject expired or missing authority.", "Protect credentials and private infrastructure."] },
  contributor: { focus: "Making bounded, evidence-based public contributions.", documents: ["CONTRIBUTING.md", "guides/case-study-template.md", "ontology/README.md"], checklist: ["Classify normative versus illustrative content.", "Use fictional data.", "Update contract, example, and validation together."] }
};

export function guidanceFor(role: (typeof roles)[number], component?: string) {
  const base = guidance[role];
  const componentNote = component && components.includes(component as (typeof components)[number])
    ? `Selected component: ${component}. Review its authority, evidence, verification, and rollback relationship before implementation.`
    : "No recognized component was selected; start with ontology and request classification.";
  return { role, component: component ?? null, ...base, component_note: componentNote, scope: "Guidance only. This does not authorize, deploy, or validate a live system." };
}

export function validateProfile(profile: Profile) {
  const findings: Array<{ level: "error" | "warning" | "info"; component: string; message: string }> = [];
  if (typeof profile.name !== "string" || profile.name.length === 0) findings.push({ level: "error", component: "profile", message: "Provide a non-secret system name." });
  const declared = Array.isArray(profile.components) ? profile.components.filter((value): value is string => typeof value === "string") : [];
  const required = ["identity", "route", "task", "policy", "worker", "receipt", "evidence", "verification", "rollback"];
  for (const component of required) if (!declared.includes(component)) findings.push({ level: "warning", component, message: `Baseline profile does not declare ${component}.` });
  if (profile.mutates_state === true && !declared.includes("rollback")) findings.push({ level: "error", component: "rollback", message: "A mutating profile requires a rollback or compensation boundary." });
  if (profile.mutates_state === true && !declared.includes("verification")) findings.push({ level: "error", component: "verification", message: "A mutating profile requires an independent verification boundary." });
  if (profile.uses_mcp === true && !declared.includes("mcp_adapter")) findings.push({ level: "warning", component: "mcp_adapter", message: "MCP use is declared without an adapter boundary." });
  if (profile.uses_mcp === true && !declared.includes("policy")) findings.push({ level: "error", component: "policy", message: "MCP adapter use requires a policy boundary before mutation." });
  if (profile.runtime_proof === true) findings.push({ level: "info", component: "evidence", message: "Runtime proof is asserted by the submitter and was not independently inspected by this public validator." });
  const errors = findings.filter((finding) => finding.level === "error").length;
  const warnings = findings.filter((finding) => finding.level === "warning").length;
  return { assessment: errors ? "insufficient_baseline" : warnings ? "partial_baseline" : "declared_baseline", declared_components: declared, findings, limitations: ["Profile validation uses only submitted data.", "No endpoint, credential, repository, runtime, or external system was contacted.", "A declared baseline is not proof of a production-ready Jump OS deployment."] };
}
