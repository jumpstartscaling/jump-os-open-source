# MCP and A2A adapter boundaries

Protocol adapters translate capability requests; they do not create authority. An adapter must preserve the authenticated principal, task identity, policy revision, expiry, evidence, verification, idempotency, and rollback boundaries defined by Jump OS.

An adapter must reject a mutation when task authority is missing, the policy decision is expired, the requested capability exceeds scope, or the caller cannot be authenticated. The rejection is `NOT_AUTHORIZED`, `EXPIRED`, or an equivalent explicit result—not a successful receipt.

For example, an MCP tool may return “accepted” while the independent verifier has not checked the target. Jump OS records `AWAITING_VERIFICATION` and `UNVERIFIED`; it does not convert the remote response into proof. A2A delegation follows the same rule and cannot elevate privileges merely because another agent requested the work.

Retries use the original idempotency key. Cancellation and emergency-stop requests propagate through the adapter, but acknowledgment and actual stopping require separate evidence.
