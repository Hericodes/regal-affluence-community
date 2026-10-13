/* =========================================================
   REGAL AFFLUENCE — NEWSROOM PASSCODE SIGN-IN
   Supabase Edge Function: newsroom-auth
   ---------------------------------------------------------
   Single self-contained file, so it can be pasted into the
   Supabase dashboard editor (Edge Functions → Deploy a new
   function → Via Editor) without the CLI.

   POST { "passcode": "…" }

   1. The database checks the passcode against its bcrypt
      hash and enforces rate limits, atomically
      (public.newsroom_attempt_login).
   2. On success, this function signs in the hidden newsroom
      account (created automatically on first use) and
      returns ONLY its short-lived access token. The refresh
      token never leaves the server, so the session ends
      when the access token expires.

   Needs no custom secrets. Supabase provides SUPABASE_URL,
   SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY to every
   Edge Function automatically. Optional overrides:
   NEWSROOM_ALLOWED_ORIGINS, NEWSROOM_ACCOUNT_EMAIL.
========================================================= */

import { createClient } from "npm:@supabase/supabase-js@2";

/* =========================================================
   CONFIGURATION
========================================================= */

const DEFAULT_ALLOWED_ORIGINS = [
  "https://www.regalaffluence.com",
  "https://regalaffluence.com",
  "https://hericodes.github.io",
  "http://localhost:5173",
];

const DEFAULT_ACCOUNT_EMAIL = "newsroom-service@regalaffluence.com";

const MAX_BODY_BYTES = 2048;
const MAX_PASSCODE_LENGTH = 72;

/* =========================================================
   HANDLER (dependencies injected so it can be unit tested)
========================================================= */

export type AttemptStatus = "ok" | "invalid" | "locked" | "not_configured";

export interface Session {
  access_token: string;
  expires_at: number;
}

export interface HandlerDeps {
  allowedOrigins: string[];
  attemptLogin: (
    clientKey: string,
    passcode: string
  ) => Promise<{ status: AttemptStatus; retryAfterSeconds: number }>;
  createSession: () => Promise<Session>;
  log?: (message: string) => void;
}

const sha256Hex = async (value: string): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

/* The client IP as seen by the Supabase edge proxy. */
const clientIp = (request: Request): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

export const createHandler = (deps: HandlerDeps) => {
  const log = deps.log ?? (() => undefined);

  const corsHeaders = (origin: string | null): Record<string, string> => {
    const headers: Record<string, string> = {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "authorization, apikey, content-type, x-client-info",
      "Access-Control-Max-Age": "600",
      Vary: "Origin",
    };

    if (origin && deps.allowedOrigins.includes(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
    }

    return headers;
  };

  const respond = (
    origin: string | null,
    status: number,
    body: Record<string, unknown>,
    extra: Record<string, string> = {}
  ) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        ...corsHeaders(origin),
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        ...extra,
      },
    });

  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return respond(origin, 405, { error: "method_not_allowed" });
    }

    /* Browsers on other websites are refused. (Non-browser
       clients can omit Origin; rate limiting still applies.) */
    if (origin && !deps.allowedOrigins.includes(origin)) {
      return respond(origin, 403, { error: "origin_not_allowed" });
    }

    let passcode: unknown;

    try {
      const raw = await request.text();

      if (raw.length > MAX_BODY_BYTES) {
        return respond(origin, 413, { error: "invalid_request" });
      }

      passcode = (JSON.parse(raw) as { passcode?: unknown }).passcode;
    } catch {
      return respond(origin, 400, { error: "invalid_request" });
    }

    if (
      typeof passcode !== "string" ||
      passcode.length === 0 ||
      passcode.length > MAX_PASSCODE_LENGTH
    ) {
      return respond(origin, 400, { error: "invalid_request" });
    }

    try {
      const clientKey = await sha256Hex(clientIp(request));
      const attempt = await deps.attemptLogin(clientKey, passcode);

      if (attempt.status === "locked") {
        return respond(
          origin,
          429,
          { error: "too_many_attempts", retryAfterSeconds: attempt.retryAfterSeconds },
          { "Retry-After": String(attempt.retryAfterSeconds) }
        );
      }

      if (attempt.status === "not_configured") {
        return respond(origin, 503, { error: "not_configured" });
      }

      if (attempt.status !== "ok") {
        return respond(origin, 401, { error: "invalid_passcode" });
      }

      const session = await deps.createSession();

      return respond(origin, 200, {
        access_token: session.access_token,
        expires_at: session.expires_at,
      });
    } catch (error) {
      /* Never include the passcode or secrets in logs. */
      log(
        `newsroom-auth failure: ${error instanceof Error ? error.message : "unknown error"}`
      );

      return respond(origin, 503, { error: "unavailable" });
    }
  };
};

/* =========================================================
   SUPABASE WIRING
========================================================= */

type Env = (name: string) => string | undefined;

export const createLiveDeps = (env: Env): HandlerDeps => {
  const required = (name: string, ...fallbacks: string[]): string => {
    for (const key of [name, ...fallbacks]) {
      const value = env(key);
      if (value) return value;
    }
    throw new Error(`Missing ${name}`);
  };

  const url = required("SUPABASE_URL");
  const anonKey = required("SUPABASE_ANON_KEY");
  const serviceKey = required("SUPABASE_SERVICE_ROLE_KEY");
  const accountEmail = env("NEWSROOM_ACCOUNT_EMAIL") || DEFAULT_ACCOUNT_EMAIL;
  const allowedOrigins = (env("NEWSROOM_ALLOWED_ORIGINS") || DEFAULT_ALLOWED_ORIGINS.join(","))
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const noSession = { auth: { persistSession: false, autoRefreshToken: false } };

  /* Service role: stays inside this function. */
  const admin = createClient(url, serviceKey, noSession);

  const accountId = async (): Promise<string | null> => {
    const { data, error } = await admin.rpc("newsroom_service_account_id", {
      p_email: accountEmail,
    });

    if (error) throw new Error("service account lookup failed");

    return (data as string | null) ?? null;
  };

  /* Creates the hidden newsroom account on first use. It has
     no password; sessions are minted through the admin API. */
  const ensureAccount = async () => {
    if (await accountId()) return;

    const { error } = await admin.auth.admin.createUser({
      email: accountEmail,
      email_confirm: true,
      user_metadata: { purpose: "Regal Affluence newsroom service account" },
    });

    /* A parallel first sign-in may have created it already. */
    if (!(await accountId())) {
      throw new Error(`service account creation failed${error ? `: ${error.message}` : ""}`);
    }
  };

  return {
    allowedOrigins,

    attemptLogin: async (clientKey, passcode) => {
      const { data, error } = await admin
        .rpc("newsroom_attempt_login", { p_client_key: clientKey, p_passcode: passcode })
        .single<{ status: AttemptStatus; retry_after_seconds: number }>();

      if (error || !data) throw new Error("passcode check failed");

      return { status: data.status, retryAfterSeconds: data.retry_after_seconds };
    },

    createSession: async () => {
      await ensureAccount();

      /* A one-time sign-in token; no email is sent. */
      const { data: link, error: linkError } = await admin.auth.admin.generateLink({
        type: "magiclink",
        email: accountEmail,
      });

      const tokenHash = link?.properties?.hashed_token;

      if (linkError || !tokenHash) throw new Error("sign-in token generation failed");

      const client = createClient(url, anonKey, noSession);
      let { data, error } = await client.auth.verifyOtp({
        token_hash: tokenHash,
        type: "email",
      });

      /* Older Auth versions only accept the legacy type name. */
      if (error) {
        ({ data, error } = await client.auth.verifyOtp({
          token_hash: tokenHash,
          type: "magiclink",
        }));
      }

      if (error || !data.session?.expires_at) throw new Error("session creation failed");

      /* The refresh token is deliberately dropped here. */
      return {
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,
      };
    },

    log: (message) => console.error(message),
  };
};

/* =========================================================
   ENTRY POINT (Deno / Supabase Edge Runtime)
========================================================= */

const deno = (globalThis as {
  Deno?: {
    env: { get: (name: string) => string | undefined };
    serve: (handler: (request: Request) => Promise<Response>) => void;
  };
}).Deno;

if (deno) {
  deno.serve(createHandler(createLiveDeps((name) => deno.env.get(name))));
}
