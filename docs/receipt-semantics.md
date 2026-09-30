# Execution receipt field semantics

The execution receipt is an auditable statement about one task attempt. It is not automatically proof that a real-world change occurred.

| Field | Required | Meaning |
|---|---:|---|
| `receipt_id` | yes | Stable identifier for this receipt instance. |
| `schema_version` | yes | Contract version used to interpret the receipt. |
| `timestamp` | yes | Time at which this receipt was issued. |
| `task` | yes | Task identity, action, idempotency key, parent relationship, and expiry. |
| `principal` | yes | Authenticated caller identity and authentication method. |
| `authority_boundary` | yes | Policy revision, decision, decision time, and decision expiry. A policy engine is not the task authority. |
| `execution` | yes | Worker identity, lifecycle state, and attempt number. |
| `evidence_chain` | yes | Input/output hashes, evidence references, and rollback state. Evidence references point to material; they do not assert verification by themselves. |
| `result` | yes | Outcome and independent verification status. `SUCCEEDED` with `UNVERIFIED` is intentionally possible. |
| `interruption` | no | Pause, cancel, terminate, quarantine, or rollback state when an interruption is requested. |
| `notice` | no | Human-readable explanation that does not override structured fields. |

Required fields are needed to connect identity, task, policy, worker, result, evidence, and rollback. Optional fields must not be used to smuggle authority or convert an uncertain outcome into success.

The public examples are fictional. The valid example is structurally valid but explicitly `UNVERIFIED`; the invalid example contains an undeclared field and must fail validation.
