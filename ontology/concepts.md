# Core concepts

## Principal

A human, service account, workload, or delegated identity requesting or authorizing work. Authentication identifies a principal; it does not by itself authorize an action.

## Route

The resolved execution target: tenant, resource, service, environment, and adapter path. Route authority answers where work is intended to go. It does not prove that the work was authorized or delivered.

## Task

The durable unit of work. A task owns the requested action, expiry, idempotency key, parent relationship, lifecycle, and attempts. A chat message or transient tool call is not necessarily a task.

## Policy decision

A time-bounded decision by an identified policy authority about whether a task may proceed under a named policy revision. `ALLOW` is permission to attempt, not proof of success.

## Worker

The bounded execution identity permitted to perform a task. A worker may invoke tools or providers, but it cannot enlarge the task's authority.

## Receipt

A durable record connecting principal, task, route or target, policy, worker, evidence, result, verification, and rollback state. A receipt is evidence about an execution attempt, not automatically proof of a real-world outcome.

## Evidence

An observable artifact supporting a claim: a source record, hash, authenticated response, runtime observation, provider receipt, read-after-write result, or human approval. Evidence has provenance and freshness.

## Verification

An independent check of the intended outcome. A worker's self-report is execution evidence; it is not necessarily independent verification.

## Rollback and compensation

Rollback restores a prior state. Compensation performs a logically corrective action when restoration is impossible. Both must be identified before a high-risk mutation when practical.

## Derived graph

A graph, embedding index, or semantic link layer connecting artifacts across truth lanes. It supports discovery and navigation. It is not authoritative proof unless each material link is independently verified.

