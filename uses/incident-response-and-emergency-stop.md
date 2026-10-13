# Use case: incident response and emergency stop

An operator must pause, cancel, terminate, quarantine, or roll back active work.

## Required evidence

- Who requested the interruption and under which authority.
- Which tasks and workers were in scope.
- Whether the request propagated to each worker.
- Whether each worker acknowledged, stopped, became unreachable, or continued.
- What target state remains and whether rollback was attempted or verified.

An emergency-stop request is not the same as a stopped system. Preserve the distinction between requested, authorized, propagated, acknowledged, stopped, verified, denied, and unreachable states.

