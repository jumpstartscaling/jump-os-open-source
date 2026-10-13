import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { Ajv } from "@modelcontextprotocol/server/validators/ajv";
import { z } from "zod";
import receiptSchema from "../../../schemas/execution-receipt.schema.json" with { type: "json" };

const server = new McpServer({ name: "jump-os-reference", version: "0.3.0" });
const ajv = new Ajv({ allErrors: true, strict: false });
const validateReceipt = ajv.compile(receiptSchema);

const requestType = z.enum(["read_only", "advisory", "bounded_mutation", "synchronization", "interruption"]);
const outcome = z.enum(["accepted", "succeeded_unverified", "succeeded_verified", "unknown", "partially_completed", "provider_accepted_unreconciled", "rollback_requested"]);

function result(payload: Record<string, unknown>) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] };
}

server.registerTool(
  "jump_classify_request",
  {
    description: "Classify a request without executing it or contacting any external system.",
    inputSchema: z.object({
      request: z.string().min(1),
      mutates_state: z.boolean().optional(),
      coordinates_multiple_systems: z.boolean().optional(),
      interrupts_active_work: z.boolean().optional()
    })
  },
  async ({ request, mutates_state = false, coordinates_multiple_systems = false, interrupts_active_work = false }) => {
    const type = interrupts_active_work ? "interruption" : coordinates_multiple_systems ? "synchronization" : mutates_state ? "bounded_mutation" : "read_only";
    return result({ request, classification: type, advisory_only: true, executed: false, next_step: "Identify authorities and evidence before selecting an adapter." });
  }
);

server.registerTool(
  "jump_inspect_authority",
  {
    description: "Return an authority matrix for a proposed action; this tool never authorizes or executes the action.",
    inputSchema: z.object({ action: z.string().min(1), target: z.string().min(1), principal: z.string().min(1) })
  },
  async ({ action, target, principal }) => result({
    action, target, principal, executed: false,
    authorities: {
      identity: { status: "identified", owner: principal },
      route: { status: "requires_resolution", owner: null },
      task: { status: "requires_creation", owner: null },
      policy: { status: "requires_evaluation", owner: null },
      worker: { status: "requires_selection", owner: null },
      verification: { status: "requires_independent_observation", owner: null },
      rollback: { status: "requires_plan", owner: null }
    },
    decision: "NOT_AUTHORIZED"
  }));

server.registerTool(
  "jump_validate_receipt",
  {
    description: "Validate a Jump OS receipt structurally in memory; this tool does not claim that the receipt proves a live outcome.",
    inputSchema: z.object({ receipt: z.record(z.string(), z.unknown()) })
  },
  async ({ receipt }) => {
    const valid = validateReceipt(receipt);
    return result({ valid, executed: false, proof_claim: "Structural validation only; this does not establish authorization, delivery, reconciliation, or production safety.", errors: valid ? [] : validateReceipt.errors ?? [] });
  }
);

server.registerTool(
  "jump_simulate_bounded_mutation",
  {
    description: "Simulate a bounded mutation outcome entirely in memory; never contacts or changes a live system.",
    inputSchema: z.object({ action: z.string().min(1), target: z.string().min(1), outcome })
  },
  async ({ action, target, outcome: selectedOutcome }) => {
    const mapping: Record<string, Record<string, unknown>> = {
      accepted: { result_status: "ACCEPTED", verification: "NOT_ATTEMPTED" },
      succeeded_unverified: { result_status: "SUCCEEDED", verification: "UNVERIFIED" },
      succeeded_verified: { result_status: "SUCCEEDED", verification: "VERIFIED" },
      unknown: { result_status: "UNKNOWN", verification: "UNVERIFIED" },
      partially_completed: { result_status: "UNKNOWN", execution_state: "PARTIALLY_COMPLETED", verification: "UNVERIFIED" },
      provider_accepted_unreconciled: { result_status: "ACCEPTED", verification: "UNVERIFIED", provider_reconciliation: "PENDING" },
      rollback_requested: { result_status: "UNKNOWN", interruption: "ROLLBACK", verification: "UNVERIFIED" }
    };
    return result({ action, target, ...mapping[selectedOutcome], outcome: selectedOutcome, simulation: true, external_side_effects: false, notice: "Fictional in-memory result. No provider, filesystem, network, credential, or live system was contacted." });
  }
);

server.registerTool(
  "jump_explain_proof_gap",
  {
    description: "Explain why a result is not independently verified; this tool only analyzes supplied facts.",
    inputSchema: z.object({ result_status: z.string(), verification: z.string(), provider_reconciliation: z.string().optional(), observation_status: z.string().optional(), rollback_state: z.string().optional() })
  },
  async ({ result_status, verification, provider_reconciliation, observation_status, rollback_state }) => {
    const gaps = [];
    if (verification !== "VERIFIED") gaps.push("No independent verification is recorded.");
    if (provider_reconciliation === "PENDING" || provider_reconciliation === "UNKNOWN") gaps.push("Provider acceptance has not been reconciled with the intended business result.");
    if (observation_status === "NOT_REVALIDATED") gaps.push("The observation is historical and has not been revalidated.");
    if (!rollback_state || rollback_state === "NOT_ATTEMPTED") gaps.push("Rollback or compensation evidence is absent or not attempted.");
    return result({ result_status, verification, proof_gaps: gaps, verified: gaps.length === 0, executed: false });
  }
);

await serveStdio(() => server);
