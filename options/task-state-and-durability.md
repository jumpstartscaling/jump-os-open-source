# Options: task state and durability

Choose task storage and messaging based on durability, ordering, replay, expiry, idempotency, contention, operational ownership, and recovery objectives.

Relational storage can provide strong task and receipt transactions. Redis, Kafka, or other event systems may help with coordination and replay but do not automatically provide business reconciliation. SQLite may suit a bounded local reference component and not a multi-worker control plane.

