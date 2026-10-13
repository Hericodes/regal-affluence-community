import { afterEach, describe, expect, it, vi } from "vitest";

import { createHandler, createLiveDeps, type HandlerDeps } from "./index.ts";

/* =========================================================
   newsroom-auth — tests
   The handler is tested with fakes; the Supabase wiring is
   tested against the real supabase-js client with network
   calls intercepted. Nothing here talks to a live project.
========================================================= */

const ORIGIN = "https://www.regalaffluence.com";

const makeDeps = (overrides: Partial<HandlerDeps> = {}) => {
  const deps: HandlerDeps = {
    allowedOrigins: [ORIGIN],
    attemptLogin: vi.fn(async (_key: string, passcode: string) => ({
      status: passcode === "Test-Passcode-1" ? ("ok" as const) : ("invalid" as const),
      retryAfterSeconds: 0,
    })),
    createSession: vi.fn(async () => ({
      access_token: "short-lived-access-token",
      expires_at: 1_900_000_000,
    })),
    log: vi.fn(),
    ...overrides,
  };

  return { deps, handler: createHandler(deps) };
};

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("https://project.supabase.co/functions/v1/newsroom-auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN,
      "x-forwarded-for": "203.0.113.7",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("newsroom-auth handler", () => {
  it("returns only a short-lived access token for the correct passcode", async () => {
    const { handler } = makeDeps();

    const response = await handler(post({ passcode: "Test-Passcode-1" }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ access_token: "short-lived-access-token", expires_at: 1_900_000_000 });
    expect(JSON.stringify(body)).not.toMatch(/refresh/);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
  });

  it("rejects a wrong passcode without creating a session", async () => {
    const { deps, handler } = makeDeps();

    const response = await handler(post({ passcode: "wrong" }));

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: "invalid_passcode" });
    expect(deps.createSession).not.toHaveBeenCalled();
  });

  it("refuses while locked out", async () => {
    const { deps, handler } = makeDeps({
      attemptLogin: async () => ({ status: "locked", retryAfterSeconds: 600 }),
    });

    const response = await handler(post({ passcode: "Test-Passcode-1" }));

    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("600");
    expect(await response.json()).toEqual({ error: "too_many_attempts", retryAfterSeconds: 600 });
    expect(deps.createSession).not.toHaveBeenCalled();
  });

  it("reports when no passcode has been set yet", async () => {
    const { deps, handler } = makeDeps({
      attemptLogin: async () => ({ status: "not_configured", retryAfterSeconds: 0 }),
    });

    const response = await handler(post({ passcode: "anything" }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "not_configured" });
    expect(deps.createSession).not.toHaveBeenCalled();
  });

  it("rate-limits by a hash of the client IP, never the raw IP", async () => {
    const { deps, handler } = makeDeps();

    await handler(post({ passcode: "wrong" }));

    const key = (deps.attemptLogin as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(key).toMatch(/^[0-9a-f]{64}$/);
    expect(key).not.toContain("203.0.113.7");
  });

  it.each([
    ["missing passcode", {}],
    ["non-string passcode", { passcode: 123 }],
    ["empty passcode", { passcode: "" }],
    ["oversized passcode", { passcode: "x".repeat(73) }],
    ["invalid JSON", "{not json"],
  ])("rejects %s with 400 before touching the database", async (_label, body) => {
    const { deps, handler } = makeDeps();

    const response = await handler(post(body));

    expect(response.status).toBe(400);
    expect(deps.attemptLogin).not.toHaveBeenCalled();
  });

  it("rejects oversized request bodies", async () => {
    const { handler } = makeDeps();

    const response = await handler(post({ passcode: "x", padding: "x".repeat(5000) }));

    expect(response.status).toBe(413);
  });

  it("refuses browser requests from other websites", async () => {
    const { deps, handler } = makeDeps();

    const response = await handler(post({ passcode: "Test-Passcode-1" }, { Origin: "https://evil.example" }));

    expect(response.status).toBe(403);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    expect(deps.attemptLogin).not.toHaveBeenCalled();
  });

  it("only accepts POST, and answers CORS preflight for allowed origins only", async () => {
    const { handler } = makeDeps();
    const request = (method: string, origin: string) =>
      handler(
        new Request("https://project.supabase.co/functions/v1/newsroom-auth", {
          method,
          headers: { Origin: origin },
        })
      );

    expect((await request("GET", ORIGIN)).status).toBe(405);
    expect((await request("OPTIONS", ORIGIN)).headers.get("Access-Control-Allow-Origin")).toBe(ORIGIN);
    expect((await request("OPTIONS", "https://evil.example")).headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("fails closed with a generic error and never logs the passcode", async () => {
    const log = vi.fn();
    const { handler } = makeDeps({
      log,
      createSession: async () => {
        throw new Error("session creation failed");
      },
    });

    const response = await handler(post({ passcode: "Test-Passcode-1" }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "unavailable" });
    expect(JSON.stringify(log.mock.calls)).not.toContain("Test-Passcode-1");
  });
});

/* =========================================================
   SUPABASE WIRING (real supabase-js, intercepted network)
========================================================= */

const URL_BASE = "https://project.supabase.test";

const ENV: Record<string, string> = {
  SUPABASE_URL: URL_BASE,
  SUPABASE_ANON_KEY: "anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
};

type Call = { method: string; path: string; auth: string | null; body: unknown };

const interceptSupabase = (accountExists: boolean) => {
  const calls: Call[] = [];
  let created = accountExists;

  vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    const url = new URL(request.url);
    const body = request.method === "POST" ? await request.json().catch(() => null) : null;
    const json = (data: unknown, status = 200) =>
      new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

    calls.push({ method: request.method, path: url.pathname, auth: request.headers.get("authorization"), body });

    switch (url.pathname) {
      case "/rest/v1/rpc/newsroom_attempt_login":
        /* .single() asks PostgREST for one object via Accept. */
        return json(
          request.headers.get("accept")?.includes("vnd.pgrst.object")
            ? { status: "ok", retry_after_seconds: 0 }
            : [{ status: "ok", retry_after_seconds: 0 }]
        );
      case "/rest/v1/rpc/newsroom_service_account_id":
        return json(created ? "8a6f0000-0000-0000-0000-000000000001" : null);
      case "/auth/v1/admin/users":
        created = true;
        return json({ id: "8a6f0000-0000-0000-0000-000000000001", email: "newsroom-service@regalaffluence.com" });
      case "/auth/v1/admin/generate_link":
        return json({ id: "8a6f…", hashed_token: "one-time-hash", action_link: "x", email_otp: "1", verification_type: "magiclink" });
      case "/auth/v1/verify":
        return json({
          access_token: "minted-access-token",
          refresh_token: "MUST-NOT-LEAK",
          token_type: "bearer",
          expires_in: 3600,
          expires_at: 1_900_000_000,
          user: { id: "8a6f0000-0000-0000-0000-000000000001", aud: "authenticated" },
        });
      default:
        return json({ message: `unexpected ${url.pathname}` }, 404);
    }
  });

  return calls;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("newsroom-auth Supabase wiring", () => {
  it("checks the passcode through the database with the service role", async () => {
    const calls = interceptSupabase(true);
    const deps = createLiveDeps((name) => ENV[name]);

    const result = await deps.attemptLogin("client-key", "Test-Passcode-1");

    expect(result).toEqual({ status: "ok", retryAfterSeconds: 0 });
    expect(calls[0]).toMatchObject({
      path: "/rest/v1/rpc/newsroom_attempt_login",
      auth: "Bearer service-role-key",
      body: { p_client_key: "client-key", p_passcode: "Test-Passcode-1" },
    });
  });

  it("creates the hidden account on first use, then mints a session without a password", async () => {
    const calls = interceptSupabase(false);
    const deps = createLiveDeps((name) => ENV[name]);

    const session = await deps.createSession();

    expect(session).toEqual({ access_token: "minted-access-token", expires_at: 1_900_000_000 });
    expect(JSON.stringify(session)).not.toContain("MUST-NOT-LEAK");

    const paths = calls.map((call) => call.path);
    expect(paths).toEqual([
      "/rest/v1/rpc/newsroom_service_account_id",
      "/auth/v1/admin/users",
      "/rest/v1/rpc/newsroom_service_account_id",
      "/auth/v1/admin/generate_link",
      "/auth/v1/verify",
    ]);

    const createUser = calls[1];
    expect(createUser.auth).toBe("Bearer service-role-key");
    expect(createUser.body).toMatchObject({ email: "newsroom-service@regalaffluence.com", email_confirm: true });
    expect(createUser.body).not.toHaveProperty("password");

    expect(calls[3].body).toMatchObject({ type: "magiclink", email: "newsroom-service@regalaffluence.com" });

    /* The one-time token is redeemed with the PUBLIC key, not the service role. */
    expect(calls[4].auth).not.toBe("Bearer service-role-key");
    expect(calls[4].body).toMatchObject({ token_hash: "one-time-hash", type: "email" });
  });

  it("reuses the existing account on later sign-ins", async () => {
    const calls = interceptSupabase(true);
    const deps = createLiveDeps((name) => ENV[name]);

    await deps.createSession();

    expect(calls.map((call) => call.path)).not.toContain("/auth/v1/admin/users");
  });

  it("uses the default allowed origins unless overridden", () => {
    expect(createLiveDeps((name) => ENV[name]).allowedOrigins).toContain("https://www.regalaffluence.com");
    expect(
      createLiveDeps((name) => ({ ...ENV, NEWSROOM_ALLOWED_ORIGINS: "https://a.example, https://b.example" })[name])
        .allowedOrigins
    ).toEqual(["https://a.example", "https://b.example"]);
  });

  it("refuses to start without the Supabase-provided keys", () => {
    expect(() => createLiveDeps(() => undefined)).toThrow(/Missing SUPABASE_URL/);
  });
});
