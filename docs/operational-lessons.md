# Operational lessons and proof boundaries

Jump OS is intended for systems that can change enterprise state. The most important lessons are boundaries around what each signal is allowed to prove.

## Authority is split by responsibility

| Concern | Question it answers | What it does not prove |
| --- | --- | --- |
| Identity authority | Who is requesting this work? | That the request is allowed or completed |
| Route authority | Which tenant, service, or execution path is the intended target? | Task ownership, authorization, or delivery |
| Task authority | Which durable task owns the attempt and its retries? | That a worker actually ran successfully |
| Policy authority | Is this action allowed under a named policy revision? | That the target state changed |
| Worker authority | Which bounded worker may perform the action? | That the provider accepted or reconciled the result |
| Receipt authority | What durable record connects request, policy, execution, and evidence? | That an unverified claim is true |
| Verification authority | What independent observation establishes the intended outcome? | That rollback is available |
| Rollback authority | What can restore or compensate the target state? | That the original action succeeded |

Jump Route, an MCP adapter, an A2A peer, or a semantic graph may help locate or connect these authorities. None inherits the authority of the others.

## A live surface is not a working workflow

A health check, HTTP 200, active listener, browser result, SQL row, provider response, or imported record proves only the observation that was actually made. It does not prove correct ownership, policy enforcement, tenant routing, downstream reconciliation, duplicate suppression, or a usable business outcome.

Claims should retain their proof state:

- **Observed:** a dated runtime observation exists.
- **Accepted:** a provider or boundary accepted the request.
- **Succeeded:** the worker reported completion.
- **Verified:** an independent check established the intended target state.
- **Not revalidated:** an older observation has not been checked against the current owner, route, revision, and runtime.
- **Unknown:** the evidence cannot distinguish success, failure, or partial completion.
- **Provider accepted, unreconciled:** an upstream system accepted work but the downstream business result is not proven.

The last three states are controls against confident theater.

## Revalidation and proof gaps

Every runtime claim should carry an observation time and, where possible, the owner, target, revision, route, and evidence references used to make the claim. When any material dimension changes—or when the observation becomes stale—the claim must be downgraded to `NOT_REVALIDATED` until checked again.

A semantic graph, embedding, or narrative may create a candidate link. It cannot upgrade that link to proof. Independent runtime evidence, a durable receipt, or a human-approved source record must do that.

## Source Fabric

Source Fabric is the evidence chain between intended source and observed runtime:

```text
contract/policy -> source revision -> build artifact -> deployed revision
    -> owner/listener/route -> authenticated request -> task -> receipt
    -> independent verification -> rollback or compensation evidence
```

Forward traversal asks whether an intended capability reached the correct runtime. Backward traversal starts with an outcome and identifies the request, task, policy revision, worker, evidence, and rollback state that explain it.

Source Fabric is not a second graph of presumed truth. Its links must identify their evidence type and freshness. If a link is inferred, historical, or not revalidated, the system must say so.

## Bounded mutation example

Consider a request to update one CRM record. A safe flow is:

1. Authenticate the principal and resolve the intended tenant and route.
2. Create a durable task with an idempotency key and expiry.
3. Evaluate the action against a named policy revision.
4. Capture rollback material before the worker mutates state.
5. Execute once through the approved worker and write a receipt.
6. Verify the CRM state independently, including tenant, record identity, and expected fields.

If the CRM returns success but the read-after-write check cannot establish the correct tenant or record, the result is `ACCEPTED` or `SUCCEEDED` with `UNVERIFIED`, not verified success. If the provider accepted the request but reconciliation is missing, record `PROVIDER_ACCEPTED_UNRECONCILED`. If the worker or target becomes unreachable, record `UNKNOWN` and preserve the interruption and rollback state.

## Fizzled paths

The following are intentionally not control-plane authorities:

- Obsidian or graph explorer interfaces that have not demonstrated an end-to-end execution path.
- Embeddings and semantic retrieval used without independent evidence.
- A healthy service or gateway response used as proof of business delivery.
- Historical runtime observations presented as current state.
- A provider conversion, imported contact, or platform total presented as a validated website outcome without applicable-site evidence.

These tools can remain useful for discovery, navigation, and explanation. Their boundary must remain visible.
