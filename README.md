# Jump OS

## An open architectural framework for governed enterprise agentic work

Jump OS is an open-source architectural research project for building AI-assisted enterprise systems that are bounded, inspectable, durable, and honest about what they know.

It is a public blueprint, not a product to install. The project defines contracts, design boundaries, and research guidance that organizations can use to build their own governed agent systems across their existing technology choices. It intentionally does not disclose Jumpstart Scaling's private enterprise implementation or prescribe one exact runtime, deployment topology, database, queue, model provider, or policy engine.

The project focuses on the control-plane questions that appear when an agent can do more than answer a question: who is asking, what is allowed, which task owns the work, what changed, what evidence was produced, and how can the change be rolled back?

This repository is a public specification and community starting point. It is not a claim that one reference implementation is production-ready, nor is it a publication of any private Jumpstart Scaling infrastructure, tenant data, credentials, internal hostnames, or deployment topology.

## What this repository gives you

This repository gives you vendor-neutral contracts, design boundaries, examples, and research guidance. It does not give you a runtime to install or a deployment you can safely apply without adapting it to your own identity provider, systems, data stores, network boundaries, workers, and rollback capabilities.

The safest way to read Jump OS is as a control-plane specification:

```text
identity -> route -> task -> policy -> worker -> receipt
                                      -> verification -> rollback
```

Each step has a separate responsibility. A router does not authorize a task. A graph does not prove execution. A provider response does not prove business delivery. A health check does not prove an end-to-end workflow.

## Core ideas

- Separate identity, policy, and task authority.
- Preserve four truth lanes: contracts, source/build intent, runtime observation, and human explanation.
- Treat semantic graphs and embeddings as derived relationships, not authoritative proof.
- Require durable execution receipts that connect identity, task, policy, worker, result, and rollback state.
- Bound production mutations to one intentional change at a time, with rollback material and verification.
- Keep protocol adapters such as MCP and A2A behind the same identity and policy boundaries.
- Prefer an explicit “unknown” or “not revalidated” state over confident theater.
- Separate route, task, policy, worker, receipt, verification, and rollback authority; no router or graph inherits the others' authority.

## Read the paper

The full architectural research paper is in [`docs/architectural-research-paper.txt`](docs/architectural-research-paper.txt).

The sanitized receipt example is in [`examples/execution-receipt.json`](examples/execution-receipt.json). It uses fictional identifiers and endpoints; it is a shape example, not a live receipt.

## Quick validation

The examples can be checked locally with Python 3:

```bash
python3 examples/validate_receipts.py
```

The command should report that the valid example is accepted and the intentionally invalid example is rejected. Passing validation proves that the example matches the public schema. It does not prove a live execution, deployment, provider delivery, or production safety.

## Where to start

- Recommended reading order: [ontology](ontology/README.md) → [request classification guide](guides/how-to-classify-a-request.md) → [use-case patterns](uses/README.md) → [implementation options](options/README.md) → [schemas](schemas/README.md) → [evidence and unknown-state guides](guides/README.md).
- Read the [architectural research paper](docs/architectural-research-paper.txt) for the full model.
- Inspect the [execution receipt schema](schemas/execution-receipt.schema.json) and [fictional receipt](examples/execution-receipt.json).
- Read the [schema index](schemas/README.md) before treating schema validation as proof of an operational outcome.
- Read the [receipt field semantics](docs/receipt-semantics.md), [task lifecycle](docs/task-lifecycle.md), [policy boundaries](docs/policy-engine-boundaries.md), [protocol adapter boundaries](docs/protocol-adapter-boundaries.md), [threat model](docs/threat-model.md), and [emergency-stop architecture](docs/emergency-stop.md).
- Read the [operational lessons and proof boundaries](docs/operational-lessons.md) for route authority, revalidation, Source Fabric, and bounded mutation examples.
- Use the [receipt semantics](docs/receipt-semantics.md) to interpret `SUCCEEDED`, `VERIFIED`, `UNKNOWN`, `NOT_REVALIDATED`, and provider reconciliation states correctly.
- Use the [ontology](ontology/README.md) for the shared vocabulary and authority relationships.
- Choose a case from the [use-case patterns](uses/README.md), compare implementation [options](options/README.md), and follow the [case-by-case guides](guides/README.md).
- Try the [free, simulation-only MCP reference server](examples/mcp-reference-server/README.md) to inspect authority, receipt, verification, and proof-gap behavior without connecting to live systems.
- Installable package metadata and source are in [`examples/mcp-reference-server`](examples/mcp-reference-server/); the package is intentionally simulation-only and does not provide live-system access.
- Follow the [public MCP reference endpoint guide](docs/mcp-public-reference-endpoint.md) only when deploying the simulation-only server behind TLS and a controlled ingress.
- Reproduce the positive and negative receipt checks with the [validation instructions](examples/VALIDATION.md).
- Review the [changelog](CHANGELOG.md) for versioned public changes.
- Review the [project roadmap](docs/PROJECT-ROADMAP.md) to see what is proposed, what is being researched, and what is not promised.
- Check the [changelog](CHANGELOG.md), [citation metadata](CITATION.cff), and [machine-readable metadata](codemeta.json) when referring to a specific release.
- Use GitHub Discussions or Issues for questions, critiques, and narrowly scoped improvements.

## Project status

Current status: architectural research and community specification.

The project does not currently promise a complete runtime, SDK, deployment chart, compliance certification, or production cutover. Contributions should make those boundaries clearer, not blur them.

The public examples are fictional. Historical runtime observations must be treated as `NOT_REVALIDATED` until the current owner, route, revision, runtime, and evidence are checked again.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening an issue or pull request. Start with an issue for substantial changes, especially changes to authority, receipt semantics, policy boundaries, or protocol behavior. Include the proposed contract, a bounded example, and the evidence that would show the change is correct.

Citation metadata is provided in [`CITATION.cff`](CITATION.cff), and machine-readable project metadata is provided in [`codemeta.json`](codemeta.json).

The public GitHub Project and Wiki are used for roadmap tracking and community-facing explanation. They are intentionally separate from the architectural source files in this repository.

## Ownership, authorship, and stewardship

**Christopher Amaya is the owner, creator, and inventor of Jump OS.** The public repository is published through Christopher Amaya's `jumpstartscaling` GitHub account and maintained under the Jumpstart Scaling identity and brand. The project is being released as an open-source contribution to the enterprise agent engineering community.

## Commercial and acquisition strategy

The public core is intentionally permissively licensed so serious companies can evaluate, adopt, integrate, and contribute without a licensing barrier. The commercial value is expected to compound through authorship, community adoption, implementation expertise, support, hosted offerings, private extensions, trademarks, and a trustworthy governance standard—not by restricting basic reading or use of the public architecture.

Apache-2.0 does not promise exclusivity to a future buyer. Once released, the granted rights are broad and generally irrevocable for that release. A future acquisition can still include the company, copyright interests in unreleased work, trademarks, hosted products, commercial extensions, customer relationships, and the maintainer/community network. It cannot retroactively turn the already-published Apache-2.0 release into closed or exclusive software.

## License

Apache License 2.0. See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE). Project names and branding are addressed in [`TRADEMARKS.md`](TRADEMARKS.md).
