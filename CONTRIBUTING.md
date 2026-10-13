# Contributing to Jump OS

Thank you for helping improve the public Jump OS architecture.

## Good first contributions

- Add implementation-neutral guidance for identity, policy, task authority, receipts, or rollback.
- Propose mappings to standards such as OPA/Rego, Cedar, OpenTelemetry, MCP, or A2A.
- Add datastore or protocol adapter design notes without claiming unverified runtime behavior.
- Identify missing compliance, audit, privacy, or threat-model requirements.
- Improve examples using fictional data only.

## Where changes belong

- `ontology/` defines shared concepts, relationships, truth lanes, and state vocabulary.
- `schemas/` contains machine-readable contracts. Schema changes require validation updates and a compatibility note.
- `uses/` documents bounded, case-specific applications of the architecture.
- `options/` compares implementation choices without declaring a universal vendor or stack.
- `guides/` provides repeatable decision procedures and case-study templates.
- `docs/` contains deeper research, lifecycle, threat, protocol, and operational guidance.

Use the [case-study template](guides/case-study-template.md) when proposing a new use case. Keep normative concepts, illustrative examples, and implementation options clearly separated.

## Evidence standard

Please distinguish clearly between a contract, source intent, a runtime observation, a historical observation, and a human explanation. A schema, test, build, health check, or diagram does not by itself prove an end-to-end production workflow.

Do not submit credentials, customer information, private hostnames, internal routes, tenant identifiers, personal data, or screenshots containing sensitive infrastructure.

## Pull requests

Explain the problem, the proposed boundary or behavior, the evidence supporting the change, and any unresolved questions. For changes to receipt fields or authority semantics, include a compatibility note and a migration or versioning plan.

Documentation changes should state whether they are normative, illustrative, experimental, or historical. If a change affects a schema, state vocabulary, authority boundary, or lifecycle state, update the corresponding ontology, schema, examples, and validation guidance together.

## Versioning

Use semantic versioning for public contracts. A breaking schema or state-vocabulary change requires a major version. Backward-compatible contract additions and substantial architecture guidance generally require a minor version. Typographical corrections and non-contract documentation fixes may use a patch release. Keep `CHANGELOG.md`, `CITATION.cff`, `codemeta.json`, tags, and GitHub release notes aligned.

By submitting a contribution for inclusion, you agree that it may be distributed under the project's Apache-2.0 terms. For substantial or strategic contributions, the maintainer may request a separate contributor license agreement so the project can preserve clear ownership and support future commercial licensing or acquisition diligence.
