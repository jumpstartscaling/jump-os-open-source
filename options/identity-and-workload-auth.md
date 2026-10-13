# Options: identity and workload authentication

Evaluate an identity option against principal uniqueness, workload identity, key rotation, audience and scope validation, revocation, auditability, and operator ownership.

Possible families include an enterprise IdP such as Entra ID or Okta, a self-hosted IdP such as Keycloak, signed JWT workload identity, and mutual TLS for service boundaries. A human login, service account, and worker identity may require different credentials and lifecycle controls.

The receipt should identify the principal and authentication method without exposing secrets.

