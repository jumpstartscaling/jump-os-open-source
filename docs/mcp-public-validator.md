# Public Jump OS baseline validator

The public MCP reference endpoint is a safe, self-service baseline validator for people designing or documenting a Jump OS-style system. It evaluates only the facts submitted to it. It does not scan a submitter's network, inspect repositories, accept credentials, invoke tools, or contact a claimed runtime.

## What it can do

- Provide role-specific documentation and checklists.
- Classify a proposed request.
- Map missing authority boundaries.
- Structurally validate an execution receipt.
- Evaluate a non-secret architecture profile against the public baseline.
- Explain why submitted evidence does not establish a verified outcome.
- Simulate safe fictional outcomes.

## What it cannot do

- Certify a Jump OS implementation.
- Establish production readiness, compliance, security, or delivery.
- Validate a live endpoint, listener, database, provider, tenant, or deployment.
- Replace an independent code review, penetration test, runtime observation, or human approval.

## Role-specific guidance

| Role | Primary question | Starting documents |
| --- | --- | --- |
| Architect | Are authorities and boundaries explicit? | Ontology, authority guide, operational lessons |
| Operator | Can work be observed, stopped, recovered, and explained? | Incident use case, unknown-state guide, emergency stop |
| Implementer | Do contracts and adapters preserve task, policy, and evidence boundaries? | Schemas, protocol adapter boundaries, validation examples |
| Security reviewer | Are identity, authorization, and evidence integrity bounded? | Threat model, identity options, policy options |
| Contributor | Does a change fit the public architecture and evidence rules? | Contributing guide, case-study template, ontology |

Use `jump_get_guidance` with a role and optional component to receive the relevant reading path and checklist.

## Baseline profile

Use `jump_validate_profile` with a non-secret JSON object. The public baseline recognizes these components:

```text
ontology, identity, route, task, policy, worker,
receipt, evidence, verification, rollback, mcp_adapter
```

For a system that changes state, the validator requires declared verification and rollback or compensation boundaries. For an MCP-based system, it also requires a declared policy boundary and MCP adapter boundary.

The fictional [public profile](../examples/mcp-reference-server/examples/public-profile.json) is a safe starting shape. Do not submit credentials, internal URLs, customer information, tenant identifiers, production logs, or source code that you are not authorized to disclose.

## Usage monitoring and privacy

The public endpoint emits one structured JSON usage event to standard output per request. It records only timestamp, generated event ID, HTTP method and path, response status, duration, request size, and declared MCP tool name. It intentionally excludes request bodies, tool arguments, submitted profiles, IP addresses, credentials, cookies, authorization headers, tenant identifiers, and user-agent strings.

`/status` exposes only aggregate in-memory counters. A hosting provider may retain standard infrastructure logs independently; configure that retention and access policy deliberately.

## Honest result language

`declared_baseline` means the submitted profile declared the expected baseline components. It is not proof that those components are implemented or operating. `partial_baseline` identifies missing declared elements. `insufficient_baseline` identifies a contradiction, such as a mutating system with no declared verification or rollback boundary.
