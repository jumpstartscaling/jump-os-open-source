# Options: verification strategies

Select verification based on the target's consistency model and the consequence of error.

- Read-after-write checks target identity, tenant, revision, and expected fields.
- Provider reconciliation compares accepted work with downstream business state.
- Event-based verification checks an authenticated event or receipt with freshness and correlation identifiers.
- Human verification may be required when no reliable machine observation exists.

A worker response, gateway health check, or model confidence is not independent verification by itself.

