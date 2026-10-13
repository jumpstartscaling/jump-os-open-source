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
- `jump_validate_receipt` validates a supplied receipt in memory.
- `jump_simulate_bounded_mutation` produces fictional accepted, verified, unknown, partial, unreconciled, and rollback-requested outcomes.
- `jump_explain_proof_gap` explains why supplied facts do not establish independent verification.

## Future transport work

Remote Streamable HTTP is intentionally not included in this first reference. Adding it would require explicit authentication, origin validation, tenant isolation, per-tool authorization, session handling, rate limiting, cancellation propagation, and deployment guidance. It must not be added merely to make the demo reachable from the public internet.
