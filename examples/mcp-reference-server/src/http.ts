import { createServer } from "node:http";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { createReferenceServer } from "./server.js";
import { recordUsage, usageSnapshot } from "./usage.js";

const PORT = Number(process.env.PORT ?? "8787");
const HOST = process.env.HOST ?? "127.0.0.1";
const PUBLIC_HOST = process.env.PUBLIC_HOST;
const MAX_BODY_BYTES = 64 * 1024;
const handler = createMcpHandler(createReferenceServer, {
  // Keep the standard 2025-era initialize handshake available for broadly
  // compatible public MCP clients. HTTP legacy traffic is intentionally
  // stateless; the SDK's newer envelope-based mode remains available too.
  legacy: "stateless",
  responseMode: "json",
  maxRequestBodySize: MAX_BODY_BYTES
});

function securityHeaders(response: import("node:http").ServerResponse) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
}

async function bodyOf(request: import("node:http").IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BODY_BYTES) throw new Error("REQUEST_TOO_LARGE");
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

const httpServer = createServer(async (request, response) => {
  const started = Date.now();
  const record = (status: number, requestBytes?: number, tool?: string) => recordUsage({ method: request.method ?? "UNKNOWN", path: new URL(request.url ?? "/", "http://localhost").pathname, status, duration_ms: Date.now() - started, request_bytes: requestBytes, mcp_tool: tool });
  securityHeaders(response);
  if (PUBLIC_HOST && request.headers.host !== PUBLIC_HOST) {
    response.writeHead(421, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "misdirected_request" }));
    record(421);
    return;
  }
  const origin = `http://${request.headers.host ?? "localhost"}`;
  const url = new URL(request.url ?? "/", origin);

  if (request.method === "GET" && url.pathname === "/healthz") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok", service: "jump-os-mcp-reference", simulation_only: true }));
    record(200);
    return;
  }

  if (request.method === "GET" && url.pathname === "/") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ service: "jump-os-mcp-reference", endpoint: "/mcp", transport: "Streamable HTTP", simulation_only: true, live_system_access: false }));
    record(200);
    return;
  }

  if (request.method === "GET" && url.pathname === "/status") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(usageSnapshot()));
    record(200);
    return;
  }

  if (request.method !== "POST" || url.pathname !== "/mcp") {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "not_found" }));
    record(404);
    return;
  }

  try {
    const body = await bodyOf(request);
    let tool: string | undefined;
    try {
      const parsed = JSON.parse(body.toString()) as { params?: { name?: unknown } };
      tool = typeof parsed.params?.name === "string" ? parsed.params.name : undefined;
    } catch { /* The MCP handler returns the protocol error. */ }
    const headers = new Headers();
    for (const [name, value] of Object.entries(request.headers)) {
      if (value) headers.set(name, Array.isArray(value) ? value.join(",") : value);
    }
    const init = { method: "POST", headers, body: new Uint8Array(body), duplex: "half" } as RequestInit & { duplex: "half" };
    const webRequest = new Request(url, init);
    const mcpResponse = await handler.fetch(webRequest);
    response.writeHead(mcpResponse.status, Object.fromEntries(mcpResponse.headers.entries()));
    response.end(Buffer.from(await mcpResponse.arrayBuffer()));
    record(mcpResponse.status, body.length, tool);
  } catch (error) {
    const status = error instanceof Error && error.message === "REQUEST_TOO_LARGE" ? 413 : 400;
    response.writeHead(status, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: status === 413 ? "request_too_large" : "invalid_request" }));
    record(status);
  }
});

httpServer.listen(PORT, HOST, () => {
  console.error(`Jump OS MCP reference server listening on http://${HOST}:${PORT}/mcp`);
});
