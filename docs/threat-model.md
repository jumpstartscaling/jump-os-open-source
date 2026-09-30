# Public threat model and trust boundaries

This model covers the public architectural core. It does not describe private infrastructure, credentials, tenant data, or deployment topology.

## Assets and boundaries

Assets include principal identity, task authority, policy decisions, execution receipts, evidence, verification results, rollback material, and interruption state. Boundaries exist between caller and control plane, control plane and policy engine, control plane and worker, protocol adapter and remote system, and execution and independent verification.

## Threats and mitigations

| Threat | Mitigation | Residual question |
|---|---|---|
| Confused deputy | Bind principal, task, scope, and policy to one receipt | How should delegated authority expire across hops? |
| Forged receipt | Authenticate issuers and verify evidence references | Which signing/envelope standard is appropriate? |
| Replay | Idempotency keys, expiry, and task identity | How should cross-region replay caches be bounded? |
| Stale policy | Record revision and expiry; deny on stale decisions | How much clock skew is acceptable? |
| Adapter escalation | Adapters cannot mint authority or bypass verification | How should capability discovery expose denied operations? |
| Incomplete verification | Separate result from verification and preserve `UNKNOWN` | What minimum independent verifier is required per action? |
| Unreachable worker | Mark interruption or outcome uncertainty explicitly | How long before quarantine or compensation? |

The central rule is to prefer explicit uncertainty over confident theater. A schema, receipt, or policy decision alone does not prove a real-world mutation.
