# Jump OS public roadmap

This roadmap describes the direction of the public Jump OS research project. It is a transparent research plan, not a promise of a production runtime or delivery date.

## Now: make the architecture easy to inspect

- Clarify the control-plane model and the four truth lanes.
- Keep the execution receipt schema small, explicit, and vendor-neutral.
- Add examples that use fictional identities, endpoints, and task records.
- Document the boundary between authorization, task ownership, execution, verification, and rollback.
- Collect community criticism through issues and discussions.

## Next: test the contracts

- Define receipt field semantics and required versus optional fields.
- Add schema validation examples and negative cases.
- Describe idempotency, retry, expiry, and rollback state transitions.
- Compare policy-as-code integration patterns, including OPA/Rego and Cedar.
- Describe safe adapter boundaries for MCP and A2A clients.

## Later: reference implementations

- Build small, independently testable reference components.
- Add a durable task-state example without tying the design to one datastore.
- Add an evidence and verification example for a bounded mutation.
- Document threat models, trust boundaries, and operational failure modes.
- Evaluate interoperability with existing enterprise identity and audit systems.

## Explicitly out of scope for this repository

- Jumpstart Scaling private infrastructure or deployment topology.
- Customer data, tenant identifiers, credentials, private hostnames, or production telemetry.
- A claim of production readiness, compliance certification, or guaranteed safety.
- A hosted service, commercial support plan, or proprietary implementation.

## How to influence the roadmap

Open a focused issue with the problem, the proposed contract or behavior, an example, and the evidence that would show the change is correct. For larger design questions, start a discussion before opening a pull request.
