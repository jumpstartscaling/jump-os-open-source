# Durable task lifecycle

Jump OS describes task behavior without selecting a queue, database, worker framework, or vendor. A receipt records what was claimed and what evidence exists; it does not turn an unverified claim into proof.

## States

`QUEUED` → `CLAIMED` → `RUNNING` → `AWAITING_VERIFICATION` → `SUCCEEDED` or `FAILED`.

At any point before completion, an authorized request may produce `CANCEL_REQUESTED`, followed by `CANCELLED` when the worker confirms it stopped. A mutation that needs isolation enters `QUARANTINED`; a compensating action uses `ROLLBACK_REQUESTED` and may end in `ROLLED_BACK`. `EXPIRED` applies when admission or execution is no longer permitted. `PARTIALLY_COMPLETED` and `UNKNOWN` preserve uncertainty rather than inventing success.

## Idempotency and retries

The pair `(task_id, idempotency_key)` identifies one logical request. A retry with the same pair must return or reference the existing outcome; it must not silently create a second mutation. A new intent requires a new task identity. Retries increment the receipt attempt count and retain prior evidence.

Timeouts do not imply failure. If the worker outcome cannot be established, the task is `UNKNOWN` until reconciliation or independent verification resolves it.

## Expiry and rollback

Expiry prevents new execution after the task or policy decision expires. It does not erase history. Rollback is a compensating operation with its own authority, evidence, verification, and possible failure; it is not deletion of the original receipt.

## Failure examples

- A duplicate request returns the original receipt because its idempotency key is already complete.
- A worker times out after a write; the task becomes `UNKNOWN`, not `FAILED`, until the target is checked.
- A partial write becomes `PARTIALLY_COMPLETED`, then `ROLLBACK_REQUESTED`; failed compensation leaves it `QUARANTINED`.
- An expired policy decision is rejected before execution and produces no successful result.

These states map to the canonical fields in `schemas/execution-receipt.schema.json`.
