# Jump OS public roadmap

This roadmap describes the direction of the public Jump OS research project. It is a transparent research plan, not a promise of a production runtime or delivery date.

## Now: make the architecture easy to inspect

- Clarify the control-plane model and the four truth lanes.
- Keep the execution receipt schema small, explicit, and vendor-neutral.
- Add examples that use fictional identities, endpoints, and task records.
- Document the boundary between authorization, task ownership, execution, verification, and rollback.
- Collect community criticism through issues and discussions.

## Completed in the current architecture pass

- Define receipt field semantics and required versus optional fields in [receipt-semantics.md](receipt-semantics.md).
- Add schema validation examples and negative cases in [examples/VALIDATION.md](../examples/VALIDATION.md).
- Describe idempotency, retry, expiry, and rollback state transitions in [task-lifecycle.md](task-lifecycle.md).
- Compare policy-as-code integration patterns, including OPA/Rego and Cedar, in [policy-engine-boundaries.md](policy-engine-boundaries.md).
- Describe safe adapter boundaries for MCP and A2A clients in [protocol-adapter-boundaries.md](protocol-adapter-boundaries.md).
- Publish the [threat model](threat-model.md) and [emergency-stop architecture](emergency-stop.md), including unreachable-worker and incomplete-verification behavior.

## Next: reference implementations

- Build small, independently testable reference components.
- Add a durable task-state example without tying the design to one datastore.
- Add an evidence and verification example for a bounded mutation.
- Build small, independently testable reference components.
- Evaluate interoperability with existing enterprise identity and audit systems.

## Explicitly out of scope for this repository

- Jumpstart Scaling private infrastructure or deployment topology.
- Customer data, tenant identifiers, credentials, private hostnames, or production telemetry.
- A claim of production readiness, compliance certification, or guaranteed safety.
- A hosted service, commercial support plan, or proprietary implementation.

## How to influence the roadmap

Open a focused issue with the problem, the proposed contract or behavior, an example, and the evidence that would show the change is correct. For larger design questions, start a discussion before opening a pull request.
