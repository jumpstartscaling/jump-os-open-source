# Authority and evidence relationships

The following relationships are architectural constraints, not a requirement that every relationship be a separate microservice.

```text
principal --requests--> task
task --resolves--> route
policy authority --evaluates--> task
task --assigns--> worker
worker --produces--> receipt
receipt --references--> evidence
verification authority --checks--> intended outcome
rollback authority --restores or compensates--> target state
```

## Non-transitive authority

Authority does not transfer implicitly:

- Route authority does not grant policy authority.
- Policy `ALLOW` does not grant task ownership.
- Task ownership does not grant unrestricted worker capability.
- Worker success does not grant verification authority.
- A provider receipt does not prove downstream reconciliation.
- A semantic graph does not inherit runtime authority from its source documents.

An implementation may combine responsibilities for operational reasons, but its records should still identify which decision was made by which authority and what evidence supports it.

## Truth lanes

1. **Declarative contracts:** schemas, policies, registries, and interfaces.
2. **Source and build intent:** source revisions, tests, artifacts, and release configuration.
3. **Runtime observation:** listeners, authenticated requests, telemetry, provider responses, and receipts.
4. **Human explanation:** architecture, decisions, incidents, and runbooks.
5. **Derived relationships:** graphs and embeddings that connect the first four lanes without replacing them.

