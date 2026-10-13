# Use case: multi-system synchronization

One business event or task must create, update, or reconcile state across multiple systems.

## Additional requirements

- Define the source of truth for each field and system.
- Give each target its own route, attempt, provider response, evidence, and verification result.
- Scope idempotency keys correctly for retries and duplicates.
- Record partial completion explicitly.
- Define reconciliation and compensation before execution.

One successful upstream write does not prove downstream delivery. Imported records, platform totals, click events, or provider conversions are not validated business outcomes without applicable target evidence.

