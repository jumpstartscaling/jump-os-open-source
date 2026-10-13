# Jump OS schemas

This directory contains machine-readable contracts. It is intentionally narrower than the surrounding documentation.

## Current contracts

- [Execution receipt](execution-receipt.schema.json): the durable record connecting a principal, task, authority boundary, worker, evidence, result, verification, interruption, and rollback state.

## How to use these schemas

1. Classify the request with the [guides](../guides/README.md).
2. Select the applicable [use-case pattern](../uses/README.md).
3. Identify the concepts and authority relationships in the [ontology](../ontology/README.md).
4. Compare implementation choices in [options](../options/README.md).
5. Validate records against the relevant schema.

Schema validation establishes structural conformance only. It does not establish authorization, runtime ownership, provider delivery, business reconciliation, or production safety. Those claims require evidence and verification as described in the guides.

