# Changelog

All notable public changes to Jump OS are documented here.

## [0.3.0] - 2026-10-13

Documentation, architecture navigation, and safe MCP reference release.

### Added

- Operational lessons covering route/task authority separation, proof gaps, revalidation, Source Fabric, and bounded mutation failure states.
- Receipt fields for observation freshness, revalidation evidence, and provider reconciliation.
- Clearer deployment-context guidance in the research paper, replacing the fixed assistant intake directive.
- A core ontology covering concepts, authority relationships, truth lanes, and state vocabulary.
- Case-based use patterns for read-only research, bounded mutation, synchronization, and emergency stop.
- Implementation option guidance for identity, policy engines, task durability, and verification.
- Case-by-case decision guides for request classification, authority mapping, evidence selection, unknown state, and case studies.
- Schema index documentation clarifying structural validation versus operational proof.
- Repository-wide README navigation for ontology, schemas, uses, options, and guides.
- Updated citation and machine-readable project metadata.
- A free, simulation-only MCP reference server using the official TypeScript SDK.
- Local `stdio` installation with no network client, credentials, filesystem mutation, shell execution, or live-system adapter.
- MCP tools for request classification, authority inspection, receipt validation, proof-gap explanation, and fictional bounded-mutation outcomes.

### Verification

- Valid receipt accepted.
- Intentionally invalid receipt rejected.
- JSON and schema parsing passed.
- All relative Markdown links resolved.
- `git diff --check` passed.

### Scope

This remains an architectural research and community specification. It does not provide a production runtime, SDK, deployment chart, hosted service, compliance certification, or guarantee of safe execution.

The MCP reference server is an educational, simulation-only example. It is not a production gateway and does not mutate external systems.

## [0.2.0] - 2026-10-13

## [0.1.0] - 2026-09-30

First public architecture release.

### Added

- Canonical execution receipt field semantics and Draft 2020-12 schema.
- Fictional valid and invalid receipt examples with reproducible validation.
- Durable task lifecycle guidance for idempotency, retries, expiry, uncertainty, and rollback.
- Policy-as-code boundary comparison covering OPA/Rego and Cedar.
- MCP and A2A adapter boundary guidance.
- Public threat model and trust-boundary review.
- Emergency-stop architecture for pause, cancel, terminate, quarantine, and rollback.

### Scope

This release is an architectural research and community specification. It does not provide a production runtime, SDK, deployment chart, hosted service, compliance certification, or guarantee of safe execution.
