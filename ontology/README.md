# Jump OS ontology

This directory defines the vocabulary and relationships used throughout Jump OS. It is normative at the conceptual level: implementations may use different products and data models, but they should preserve these distinctions when they claim conformance with the architecture.

Start with [concepts](concepts.md), then read [relationships](relationships.md) and the [state vocabulary](state-vocabulary.md). The ontology explains what a term means; the schemas define what a machine-readable record may contain.

## Design rule

Do not use one object to stand in for identity, routing, authorization, task ownership, execution, evidence, verification, and rollback. Those concerns may be implemented by one service or several services, but their authority and evidence boundaries must remain identifiable.

