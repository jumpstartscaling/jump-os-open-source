# Guide: classify a request

Answer these questions before selecting a schema or adapter:

1. Is the request read-only, advisory, mutating, or an interruption?
2. What exact resource, tenant, environment, and business outcome are in scope?
3. Is the outcome reversible, compensatable, or irreversible?
4. Is this one target or coordinated work across systems?
5. Who owns authorization, execution, verification, and rollback?
6. What evidence exists before execution, and what will establish the outcome?
7. What happens if the provider accepts but reconciliation fails?
8. What happens if the worker disappears after the request is sent?

Map the answers to a use case. If they are incomplete, constrain the action to read-only or require human clarification and approval.

