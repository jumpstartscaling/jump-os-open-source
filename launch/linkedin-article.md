# Jump OS: A Control Plane for Enterprise Agentic Work

The most dangerous sentence in an enterprise AI system is: “The agent said it was done.”

If an agent can change a CRM record, deploy a service, rotate a credential, or trigger a financial workflow, a convincing response is not enough. An operator needs to know who requested the action, what policy allowed it, which task owned it, what actually ran, what evidence came out, and how the system can recover if verification fails.

That is the problem Jump OS is designed to make inspectable.

## Jump OS treats agent execution as governed work

Jump OS is an open architectural research project for bounded, inspectable, and durable enterprise agent execution. It keeps responsibilities that are often blurred together in agent platforms distinct:

- identity: who is requesting the action;
- policy: what the principal is allowed to do;
- task authority: which durable task owns the work;
- execution: which worker or tool performs it;
- evidence: what can be proven afterward;
- rollback: how the system recovers when verification fails.

That separation gives an enterprise a chain it can inspect before, during, and after an action. It also gives the system somewhere honest to say “unknown,” “not authorized,” or “not revalidated” instead of turning uncertainty into a successful-looking answer.

## Four truth lanes

Jump OS distinguishes between four different kinds of knowledge:

1. Machine language: contracts, schemas, and policy definitions.
2. Source intent: repositories, build artifacts, tests, and release configuration.
3. Runtime observation: authenticated requests, active services, telemetry, and durable receipts.
4. Human explanation: architecture, runbooks, decisions, and incident narratives.

The framework also allows a derived semantic graph to connect these lanes. A graph is not authority. An embedding can suggest a relationship; it cannot prove that the relationship is true.

That distinction matters because enterprise systems fail when a plan is mistaken for an observation, a health check is mistaken for an end-to-end result, or a document is mistaken for runtime proof.

## Receipts connect action to evidence

A useful execution receipt should let an operator trace an operation from request to outcome:

- principal identity and authentication method;
- task identity and idempotency key;
- policy revision and decision;
- worker or tool identity;
- input and output evidence;
- verification result;
- rollback state.

A receipt turns “the agent said it happened” into “here is the authority, here is the operation, here is the evidence, and here is the recovery state.”

## One bounded production mutation at a time

For changes to production state, Jump OS uses a deliberately conservative lifecycle:

1. Resolve the identity, target, and authoritative contract.
2. Capture rollback material.
3. Apply one approved mutation.
4. Verify the resulting state.
5. Roll back if verification fails.
6. Emit the durable receipt.

This is not a claim that every system needs the same implementation. It is a design discipline: ambiguity becomes expensive when an agent can alter reality.

## Open by design, private where it should be

The public Jump OS repository is intentionally an architectural specification and community starting point. It does not expose private Jumpstart Scaling infrastructure, tenant data, credentials, private hostnames, or deployment-specific mechanisms.

The public core is licensed under Apache-2.0 so engineers and companies can evaluate, adapt, integrate, and contribute. The project name and Jumpstart Scaling identity remain governed separately through trademark guidance.

## What I want the community to challenge

I’m looking for thoughtful feedback on:

- receipt fields needed for independent audit;
- policy-as-code boundaries using OPA/Rego, Cedar, or other approaches;
- MCP and A2A adapter design that exposes capability without gaining mutation authority;
- datastore and event-stream patterns for durable task state;
- evidence required before declaring a safe cutover;
- compliance and rollback requirements that should be part of the baseline.

Jump OS was created, owned, and invented by Christopher Amaya. It is published and maintained through the `jumpstartscaling` GitHub account under the Jumpstart Scaling identity.

Read the architecture, inspect the examples, and contribute here:

https://github.com/jumpstartscaling/jump-os-open-source

The repository is architectural research, not a claim that a diagram, schema, or health check alone proves a production workflow.
