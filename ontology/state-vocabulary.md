# State vocabulary

These terms prevent a system from collapsing materially different outcomes into `success`.

| State | Meaning | Required caution |
| --- | --- | --- |
| `ACCEPTED` | A boundary or provider accepted the request. | The target outcome is not established. |
| `SUCCEEDED` | The worker reported completion. | Independent verification may still be absent. |
| `VERIFIED` | Independent evidence established the intended outcome. | Verification scope must be stated. |
| `UNVERIFIED` | Execution or acceptance occurred without sufficient independent proof. | Do not present as delivered. |
| `NOT_REVALIDATED` | A historical observation has not been checked against current ownership, route, revision, and runtime. | Downgrade claims until revalidation. |
| `UNKNOWN` | Available evidence cannot distinguish success, failure, or partial completion. | Preserve evidence; do not silently retry a possible mutation. |
| `PARTIALLY_COMPLETED` | Some intended effects occurred and others did not or cannot be established. | Reconcile per target and define compensation. |
| `PROVIDER_ACCEPTED_UNRECONCILED` | The provider accepted work but the business result is not reconciled. | Treat as pending risk, not success. |

