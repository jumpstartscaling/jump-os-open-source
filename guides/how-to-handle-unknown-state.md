# Guide: handle unknown state

Use `UNKNOWN` when the evidence cannot distinguish success, failure, or partial completion. Do not convert uncertainty into failure merely to make a retry easy, or into success because a provider responded.

1. Stop or quarantine further mutation according to policy.
2. Preserve request, idempotency key, task, worker, provider response, and timing.
3. Check whether an authoritative read or reconciliation path exists.
4. Determine whether rollback or compensation is safe.
5. Decide whether to hold, reconcile, retry, compensate, or escalate.
6. Record the decision and remaining proof gap.

If an observation is simply stale, use `NOT_REVALIDATED` and identify the revalidation needed.

