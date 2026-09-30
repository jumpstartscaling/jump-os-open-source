# Emergency-stop architecture

Emergency controls interrupt active work while preserving the audit trail. `PAUSE` prevents new progress while retaining resumability; `CANCEL` requests cooperative termination; `TERMINATE` attempts forceful stopping; `QUARANTINE` isolates work or outputs; `ROLLBACK` requests a compensating action. These are distinct operations.

## Lifecycle

`REQUESTED` → `AUTHORIZED` → `PROPAGATED` → `ACKNOWLEDGED` → `STOPPING` → `STOPPED` → `VERIFIED`.

Requests may be `DENIED` or become `UNREACHABLE`. An unreachable worker is not evidence of stopping. In-flight mutations remain `UNKNOWN` or `PARTIALLY_COMPLETED` until independently checked, and rollback may be requested under its own authority.

The requester must be authorized for the task scope. The receipt records interruption kind, requester, state transitions, timestamps, propagation targets, acknowledgments, and verification evidence. New admission is blocked for a stopped or quarantined scope until an authorized release.

The public architecture does not guarantee a universal interruption latency, forceful termination of an unreachable system, or automatic rollback of arbitrary side effects. Implementations must publish their maximum expected latency and failure behavior.
