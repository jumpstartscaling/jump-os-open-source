# Policy-as-code integration boundaries

OPA/Rego, Cedar, and comparable policy engines can evaluate a policy input and return a decision. None becomes the authority for identity, task ownership, evidence, verification, or rollback.

| Concern | OPA/Rego | Cedar | Jump OS boundary |
|---|---|---|---|
| Decision model | General rule evaluation | Authorization policy evaluation | Record engine, revision, input, decision, and expiry |
| Identity | Supplied as input | Principal/resource/action model | Authenticated principal remains outside the adapter |
| Task authority | Must be modeled explicitly | Must be modeled explicitly | Task owner and scope remain canonical |
| Freshness | Caller controls cache/evaluation | Caller controls cache/evaluation | Stale or unavailable decisions are not silently allowed |
| Audit | Integration responsibility | Integration responsibility | Receipt links decision to task and evidence |

The adapter may deny, allow, or report an evaluation error within its declared scope. A policy result is not permission to mint a task, impersonate a principal, skip verification, or claim rollback.

Open questions include policy conflict resolution, distributed policy freshness, and how human authority supersedes a decision without making the audit trail ambiguous.
