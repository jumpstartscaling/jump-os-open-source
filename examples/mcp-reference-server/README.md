# Jump OS MCP Reference Server

This is a free, public, simulation-only MCP server for learning and testing Jump OS boundaries. It is intentionally incapable of changing a live system.

## Safety boundary

The server:

- Does not make network requests.
- Does not read or write user files at runtime.
- Does not execute shell commands.
- Does not accept credentials.
- Does not connect to GitHub, CRM, cloud, database, filesystem, or production APIs.
- Does not mutate the repository or any external system.
- Produces only in-memory classifications, validation results, authority analysis, proof-gap explanations, and fictional mutation outcomes.

The package is a reference implementation, not a production gateway or authorization system. A result from this server does not prove that any live action occurred.

## Requirements

- Node.js 20 or newer
- An MCP-compatible client

## Install and build locally

From this directory:

```bash
npm install
npm test
npm run build
```

The package is published as `@jumpstartscaling/jump-os-mcp-reference` when a public npm release is available. The GitHub source remains the canonical reference and can be installed locally without trusting a hosted service.

The server uses local `stdio` transport. It does not open a network listener.

## Public Streamable HTTP mode

The same simulation-only tools can be served over HTTP with:

```bash
npm run build
HOST=127.0.0.1 npm run start:http
```

For a real public deployment, use the [public endpoint guide](../../docs/mcp-public-reference-endpoint.md). Keep the service behind TLS, set `PUBLIC_HOST` to its exact hostname, and configure rate limiting at the ingress. The HTTP mode has no live-system adapter and must remain that way.

### Caddy + systemd reference deployment

The versioned deployment assets under [`deploy/`](deploy/) run the service as
an unprivileged user on `127.0.0.1:8787` and expose it only through Caddy on
`https://mcp-reference.jumpstartscaling.com`. Validate the Caddy configuration
before reloading it, then verify `/healthz`, `/status`, and an MCP `POST /mcp`
request from outside the host. TLS belongs at Caddy; the Node process must not
listen on 443 or on a public interface.

## Configure an MCP client

After building, point an MCP client at the local executable:

```json
{
  "mcpServers": {
    "jump-os-reference": {
      "command": "node",
      "args": ["/absolute/path/to/examples/mcp-reference-server/dist/server.js"]
    }
  }
}
```

Use an absolute path and inspect the client configuration before enabling it. No environment variables or secrets are required.

## Tools

- `jump_classify_request` classifies a request without executing it.
- `jump_inspect_authority` shows which authority decisions remain unresolved.
- `jump_get_guidance` gives role- and component-specific documentation and checklists.
- `jump_validate_profile` evaluates a submitted, non-secret architecture profile against the public baseline.
- `jump_validate_receipt` validates a supplied receipt in memory.
- `jump_simulate_bounded_mutation` produces fictional accepted, verified, unknown, partial, unreconciled, and rollback-requested outcomes.
- `jump_explain_proof_gap` explains why supplied facts do not establish independent verification.

The [public validator guide](../../docs/mcp-public-validator.md) explains appropriate inputs, role-specific reading paths, result meaning, monitoring, and privacy limitations. A fictional [profile example](examples/public-profile.json) is included.

## Monitoring

Every request emits a structured usage event to standard output. The event contains only operational metadata: timestamp, generated event ID, route, method, status, duration, request size, and MCP tool name. It does not log request bodies, tool arguments, submitted profiles, IP addresses, credentials, cookies, authorization headers, tenant identifiers, or user-agent strings.

`GET /status` returns aggregate, in-memory request and error counters. Use your host's log collection and uptime checks for durable monitoring. Do not configure raw request-body logging for this public endpoint.
