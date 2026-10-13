type UsageEvent = {
  method: string;
  path: string;
  status: number;
  duration_ms: number;
  request_bytes?: number;
  mcp_tool?: string;
};

const startedAt = new Date().toISOString();
const totals = { requests: 0, errors: 0, routes: new Map<string, number>(), tools: new Map<string, number>() };

export function recordUsage(event: UsageEvent) {
  totals.requests += 1;
  if (event.status >= 400) totals.errors += 1;
  totals.routes.set(event.path, (totals.routes.get(event.path) ?? 0) + 1);
  if (event.mcp_tool) totals.tools.set(event.mcp_tool, (totals.tools.get(event.mcp_tool) ?? 0) + 1);
  console.log(JSON.stringify({ type: "jump_os_mcp_usage", timestamp: new Date().toISOString(), event_id: crypto.randomUUID(), ...event }));
}

export function usageSnapshot() {
  return {
    started_at: startedAt,
    requests: totals.requests,
    errors: totals.errors,
    routes: Object.fromEntries(totals.routes),
    tools: Object.fromEntries(totals.tools),
    privacy: "Aggregate operational metadata only. Tool arguments, request bodies, IP addresses, credentials, and submitted profiles are not logged."
  };
}
