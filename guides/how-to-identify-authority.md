# Guide: identify authority

For each decision, name the authority explicitly:

| Decision | Authority to identify | Evidence to preserve |
| --- | --- | --- |
| Who requested it? | Identity authority | Principal and authentication method |
| Where should it go? | Route authority | Tenant, resource, environment, route |
| May it proceed? | Policy authority | Policy revision, decision, expiry |
| Who may execute? | Worker authority | Worker identity and capability boundary |
| What happened? | Receipt authority | Durable receipt and correlated evidence |
| Did it work? | Verification authority | Independent target-state observation |
| Can it be undone? | Rollback authority | Snapshot, inverse action, or compensation |

If one service performs several roles, record the role boundaries anyway. Do not infer authority merely because a component can reach a system.

