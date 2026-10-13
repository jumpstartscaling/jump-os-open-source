# Public MCP reference endpoint

The Jump OS MCP reference server can run as a public Streamable HTTP endpoint, but it remains a simulation-only service. It has no live-system adapter, credentials, filesystem mutation, shell execution, provider client, or network egress path.

## Endpoint contract

| Path | Method | Purpose |
| --- | --- | --- |
| `/` | `GET` | Service metadata and safety posture. |
| `/healthz` | `GET` | Health status for an operator or load balancer. |
| `/status` | `GET` | Aggregate, privacy-conscious in-memory usage counters. |
| `/mcp` | `POST` | MCP Streamable HTTP requests. |

All other paths and methods return `404`. The server does not enable browser CORS. It is intended for MCP clients and reverse proxies, not browser JavaScript.

## Deployment configuration

| Variable | Default | Public deployment value |
| --- | --- | --- |
| `PORT` | `8787` | Provider-assigned port or `8787` |
| `HOST` | `127.0.0.1` | `0.0.0.0` inside a container or managed runtime |
| `PUBLIC_HOST` | unset | Exact hostname, for example `mcp-reference.jumpstartscaling.com` |

Set `PUBLIC_HOST` to the exact DNS hostname. Requests with another Host header receive `421 Misdirected Request`. Terminate TLS at a managed ingress or reverse proxy; do not expose raw HTTP to the public internet.

## Container build

Build after compiling the server:

```bash
npm install
npm run build
docker build -t jump-os-mcp-reference .
docker run --rm -p 8787:8787 \
  -e HOST=0.0.0.0 \
  -e PUBLIC_HOST=mcp-reference.example.com \
  jump-os-mcp-reference
```

For a public deployment, put the container behind a TLS reverse proxy or managed host. Configure a request-size limit of 64 KiB or lower, rate limiting, HTTPS-only access, and logging that does not store tool inputs by default.

## DNS

After the service has a real provider hostname, add:

```text
Type:  CNAME
Name:  mcp-reference
Value: <provider-assigned-hostname>
TTL:   300
```

If the service uses a stable IP address instead, use an `A` record. Do not publish a DNS record before the provider has assigned the target and TLS is active.

## Operational boundary

The public endpoint can receive only the same safe tools available in the local reference server. It cannot alter Jumpstart Scaling systems, GitHub, cloud resources, CRMs, databases, local files, or any external service. A deployment must preserve that restriction: do not add secrets, network credentials, live adapters, shell tools, or write-capable plugins to this image.

The [public validator guide](mcp-public-validator.md) defines the baseline validation scope, role-specific guidance, result language, and privacy contract.
