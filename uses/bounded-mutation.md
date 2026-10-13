# Use case: one bounded mutation

An authorized worker changes one resource or one tightly defined set of resources.

## Control sequence

1. Authenticate the principal.
2. Resolve the exact tenant, resource, environment, and route.
3. Create a durable task with expiry and idempotency.
4. Evaluate the action under a named policy revision.
5. Capture rollback or compensation material.
6. Execute through the least-capable approved worker.
7. Record provider and worker responses.
8. Verify the intended target state independently.
9. Record the receipt and remaining proof gap.

`SUCCEEDED` is not verified success until the independent check establishes the intended resource, tenant, fields, and revision. Do not blindly retry a mutation whose first attempt may have committed.

