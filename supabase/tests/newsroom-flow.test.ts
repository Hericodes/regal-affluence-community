import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  createHandler,
  createLiveDeps,
} from "../functions/newsroom-auth/index.ts";
import { SUPABASE_STUB } from "./supabaseStub";

/* =========================================================
   FIRST SIGN-IN ON A BRAND-NEW PROJECT — end to end
   ---------------------------------------------------------
   Runs the real Edge Function code (index.ts) and the real
   supabase-js client against:
   - a fresh Postgres built from supabase/setup.sql, with
     every RPC executed for real as service_role, and
   - a minimal stand-in for Supabase Auth (GoTrue) that
     writes real auth.users / auth.sessions rows.
   Then checks the issued session against the real RLS
   functions. This is a simulation: it does not prove the
   hosted Supabase Auth behaves identically.
========================================================= */

const URL_BASE = "https://fresh-project.supabase.test";
const ANON_KEY = "anon-key";
const SERVICE_KEY = "service-role-key";
const ORIGIN = "https://www.regalaffluence.com";
const ACCOUNT_EMAIL = "newsroom-service@regalaffluence.com";

const ENV: Record<string, string> = {
  SUPABASE_URL: URL_BASE,
  SUPABASE_ANON_KEY: ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
};

const setupSql = readFileSync(
  fileURLToPath(new URL("../setup.sql", import.meta.url)),
  "utf8"
);

let db: PGlite;
const authCalls: string[] = [];
const oneTimeTokens = new Map<string, string>(); // hash -> user id

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const decodeToken = (token: string) =>
  JSON.parse(Buffer.from(token, "base64url").toString()) as {
    sub: string;
    session_id: string;
    role: string;
  };

/* Executes an RPC the way PostgREST does for the service role. */
const runRpc = async (name: string, args: Record<string, unknown>) => {
  await db.query("begin");

  try {
    await db.query("set local role service_role");

    if (name === "newsroom_attempt_login") {
      const { rows } = await db.query(
        "select * from public.newsroom_attempt_login($1, $2)",
        [args.p_client_key, args.p_passcode]
      );
      return rows;
    }

    if (name === "newsroom_service_account_id") {
      const { rows } = await db.query<{ id: string | null }>(
        "select public.newsroom_service_account_id($1) as id",
        [args.p_email]
      );
      return rows[0].id;
    }

    throw new Error(`unexpected rpc ${name}`);
  } finally {
    await db.query("commit");
  }
};

const fakeSupabase = async (input: RequestInfo | URL, init?: RequestInit) => {
  const request = new Request(input, init);
  const url = new URL(request.url);
  const auth = request.headers.get("authorization");
  const body = request.method === "POST" ? await request.json().catch(() => ({})) : {};

  /* ---------- PostgREST RPC ---------- */
  const rpc = url.pathname.match(/^\/rest\/v1\/rpc\/(\w+)$/);
  if (rpc) {
    if (auth !== `Bearer ${SERVICE_KEY}`) return json({ code: "42501", message: "permission denied" }, 401);

    const result = await runRpc(rpc[1], body);
    const single = request.headers.get("accept")?.includes("vnd.pgrst.object");

    return json(single && Array.isArray(result) ? result[0] : result);
  }

  /* ---------- Auth admin API (service role only) ---------- */
  if (url.pathname.startsWith("/auth/v1/admin/")) {
    authCalls.push(url.pathname);

    if (auth !== `Bearer ${SERVICE_KEY}`) return json({ msg: "not admin" }, 401);

    if (url.pathname === "/auth/v1/admin/users") {
      const exists = await db.query("select 1 from auth.users where lower(email) = lower($1)", [body.email]);
      if (exists.rows.length) return json({ code: "email_exists", msg: "already registered" }, 422);

      const { rows } = await db.query<{ id: string }>(
        "insert into auth.users (id, email) values (gen_random_uuid(), lower($1)) returning id",
        [body.email]
      );
      return json({ id: rows[0].id, email: body.email.toLowerCase(), aud: "authenticated" });
    }

    if (url.pathname === "/auth/v1/admin/generate_link") {
      const { rows } = await db.query<{ id: string }>(
        "select id from auth.users where lower(email) = lower($1)",
        [body.email]
      );
      if (!rows.length) return json({ code: "user_not_found", msg: "User not found" }, 404);

      const hash = `hash-${crypto.randomUUID()}`;
      oneTimeTokens.set(hash, rows[0].id);
      return json({ id: rows[0].id, email: body.email, hashed_token: hash, action_link: "x", email_otp: "0", verification_type: "magiclink" });
    }
  }

  /* ---------- Auth verify (public key) ---------- */
  if (url.pathname === "/auth/v1/verify") {
    authCalls.push(`/auth/v1/verify:${body.type}`);

    const userId = oneTimeTokens.get(body.token_hash);
    oneTimeTokens.delete(body.token_hash); // one-time use
    if (!userId || body.type !== "email") return json({ code: "otp_expired", msg: "Token has expired or is invalid" }, 403);

    const sessionId = crypto.randomUUID();
    await db.query("insert into auth.sessions (id, user_id) values ($1, $2)", [sessionId, userId]);

    const token = Buffer.from(JSON.stringify({ sub: userId, session_id: sessionId, role: "authenticated" })).toString("base64url");
    return json({
      access_token: token,
      refresh_token: "server-side-only",
      token_type: "bearer",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      user: { id: userId, aud: "authenticated" },
    });
  }

  return json({ message: `unexpected ${request.method} ${url.pathname}` }, 404);
};

/* Asks the real RLS check whether a token is a live editor. */
const isEditor = async (token: string) => {
  const claims = decodeToken(token);

  await db.query("begin");
  try {
    await db.query("select set_config('request.jwt.claims', $1, true)", [JSON.stringify(claims)]);
    await db.query("set local role authenticated");
    const { rows } = await db.query<{ ok: boolean }>("select public.is_news_editor() as ok");
    return rows[0].ok;
  } finally {
    await db.query("rollback");
  }
};

const signIn = (handler: (request: Request) => Promise<Response>, passcode: string, ip = "198.51.100.1") =>
  handler(
    new Request(`${URL_BASE}/functions/v1/newsroom-auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: ORIGIN, "x-forwarded-for": ip },
      body: JSON.stringify({ passcode }),
    })
  );

let handler: (request: Request) => Promise<Response>;

beforeAll(async () => {
  db = new PGlite({ extensions: { pgcrypto } });
  await db.exec(SUPABASE_STUB);
  await db.exec(setupSql);

  vi.stubGlobal("fetch", fakeSupabase);
  handler = createHandler(createLiveDeps((name) => ENV[name]));
});

afterAll(async () => {
  vi.unstubAllGlobals();
  await db.close();
});

describe("brand-new project, no newsroom account yet", () => {
  it("starts with no account, no editors and no passcode", async () => {
    expect((await db.query("select 1 from auth.users")).rows).toHaveLength(0);
    expect((await db.query("select 1 from public.news_editors")).rows).toHaveLength(0);

    const response = await signIn(handler, "anything");
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "not_configured" });
    expect(authCalls).toHaveLength(0);
  });

  it("a wrong passcode never creates the account", async () => {
    await db.query("select public.newsroom_set_passcode('Test-Passcode-1')");

    const response = await signIn(handler, "wrong-passcode");

    expect(response.status).toBe(401);
    expect(authCalls).toHaveLength(0);
    expect((await db.query("select 1 from auth.users")).rows).toHaveLength(0);
  });

  it("the first correct passcode creates the account, links it, and returns a working session", async () => {
    const response = await signIn(handler, "Test-Passcode-1");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(Object.keys(body).sort()).toEqual(["access_token", "expires_at"]);

    expect(authCalls).toEqual([
      "/auth/v1/admin/users",
      "/auth/v1/admin/generate_link",
      "/auth/v1/verify:email",
    ]);

    const users = await db.query<{ id: string; email: string }>("select id, email from auth.users");
    expect(users.rows).toHaveLength(1);
    expect(users.rows[0].email).toBe(ACCOUNT_EMAIL);

    const accountId = users.rows[0].id;
    const settings = await db.query<{ service_account_id: string }>("select service_account_id from public.newsroom_settings");
    expect(settings.rows[0].service_account_id).toBe(accountId);

    const editors = await db.query("select user_id from public.news_editors");
    expect(editors.rows).toEqual([{ user_id: accountId }]);

    expect(decodeToken(body.access_token).sub).toBe(accountId);
    expect(await isEditor(body.access_token)).toBe(true);
  });

  it("later sign-ins reuse the same account and get a separate session", async () => {
    authCalls.length = 0;

    const response = await signIn(handler, "Test-Passcode-1");
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(authCalls).toEqual(["/auth/v1/admin/generate_link", "/auth/v1/verify:email"]);
    expect((await db.query("select 1 from auth.users")).rows).toHaveLength(1);
    expect((await db.query("select 1 from auth.sessions")).rows).toHaveLength(2);
    expect(await isEditor(body.access_token)).toBe(true);
  });

  it("signing out (deleting the session) revokes that token only", async () => {
    const first = await (await signIn(handler, "Test-Passcode-1")).json();
    const second = await (await signIn(handler, "Test-Passcode-1")).json();

    await db.query("delete from auth.sessions where id = $1", [decodeToken(first.access_token).session_id]);

    expect(await isEditor(first.access_token)).toBe(false);
    expect(await isEditor(second.access_token)).toBe(true);
  });

  it("changing the passcode signs out every newsroom session", async () => {
    const live = await (await signIn(handler, "Test-Passcode-1")).json();
    expect(await isEditor(live.access_token)).toBe(true);

    await db.query("select public.newsroom_set_passcode('Second-Passcode-2')");

    expect(await isEditor(live.access_token)).toBe(false);
    expect((await signIn(handler, "Test-Passcode-1")).status).toBe(401);
    expect((await signIn(handler, "Second-Passcode-2", "198.51.100.2")).status).toBe(200);
  });

  it("recreates the account if it was deleted in the dashboard", async () => {
    await db.query("delete from auth.sessions");
    await db.query("delete from auth.users"); // cascades news_editors, nulls settings
    expect((await db.query("select 1 from public.news_editors")).rows).toHaveLength(0);

    authCalls.length = 0;
    const body = await (await signIn(handler, "Second-Passcode-2", "198.51.100.3")).json();

    expect(authCalls[0]).toBe("/auth/v1/admin/users");
    expect(await isEditor(body.access_token)).toBe(true);
  });

  it("switching NEWSROOM_ACCOUNT_EMAIL moves access to the new account", async () => {
    const oldAccount = (await db.query<{ id: string }>("select id from auth.users")).rows[0].id;
    const switched = createHandler(
      createLiveDeps((name) => ({ ...ENV, NEWSROOM_ACCOUNT_EMAIL: "newsroom-2@regalaffluence.com" })[name])
    );

    const body = await (await signIn(switched, "Second-Passcode-2", "198.51.100.4")).json();
    const newAccount = decodeToken(body.access_token).sub;

    expect(newAccount).not.toBe(oldAccount);
    expect(await isEditor(body.access_token)).toBe(true);

    const editors = await db.query<{ user_id: string }>("select user_id from public.news_editors");
    expect(editors.rows).toEqual([{ user_id: newAccount }]);
  });
});
