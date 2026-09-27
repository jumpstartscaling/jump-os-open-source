# Jump OS

## An open architectural framework for governed enterprise agentic work

Jump OS is an open-source architectural research project for building AI-assisted enterprise systems that are bounded, inspectable, durable, and honest about what they know.

The project focuses on the control-plane questions that appear when an agent can do more than answer a question: who is asking, what is allowed, which task owns the work, what changed, what evidence was produced, and how can the change be rolled back?

This repository is a public specification and community starting point. It is not a claim that one reference implementation is production-ready, nor is it a publication of any private Jumpstart Scaling infrastructure, tenant data, credentials, internal hostnames, or deployment topology.

## Core ideas

- Separate identity, policy, and task authority.
- Preserve four truth lanes: contracts, source/build intent, runtime observation, and human explanation.
- Treat semantic graphs and embeddings as derived relationships, not authoritative proof.
- Require durable execution receipts that connect identity, task, policy, worker, result, and rollback state.
- Bound production mutations to one intentional change at a time, with rollback material and verification.
- Keep protocol adapters such as MCP and A2A behind the same identity and policy boundaries.
- Prefer an explicit “unknown” or “not revalidated” state over confident theater.

## Read the paper

The full architectural research paper is in [`docs/architectural-research-paper.txt`](docs/architectural-research-paper.txt).

The sanitized receipt example is in [`examples/execution-receipt.json`](examples/execution-receipt.json). It uses fictional identifiers and endpoints; it is a shape example, not a live receipt.

## Project status

Current status: architectural research and community specification.

The project does not currently promise a complete runtime, SDK, deployment chart, compliance certification, or production cutover. Contributions should make those boundaries clearer, not blur them.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening an issue or pull request. Start with an issue for substantial changes, especially changes to authority, receipt semantics, policy boundaries, or protocol behavior.

## Author and stewardship

Jump OS was created and is maintained by **Christopher Amaya / Jumpstart Scaling**. The project is being released as an open-source contribution to the enterprise agent engineering community.

## Commercial and acquisition strategy

The public core is intentionally permissively licensed so serious companies can evaluate, adopt, integrate, and contribute without a licensing barrier. The commercial value is expected to compound through authorship, community adoption, implementation expertise, support, hosted offerings, private extensions, trademarks, and a trustworthy governance standard—not by restricting basic reading or use of the public architecture.

Apache-2.0 does not promise exclusivity to a future buyer. Once released, the granted rights are broad and generally irrevocable for that release. A future acquisition can still include the company, copyright interests in unreleased work, trademarks, hosted products, commercial extensions, customer relationships, and the maintainer/community network. It cannot retroactively turn the already-published Apache-2.0 release into closed or exclusive software.

## License

Apache License 2.0. See [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE). Project names and branding are addressed in [`TRADEMARKS.md`](TRADEMARKS.md).
