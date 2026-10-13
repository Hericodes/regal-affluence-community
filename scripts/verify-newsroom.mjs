#!/usr/bin/env node
/* =========================================================
   LIVE NEWSROOM CHECK — run against the real Supabase project

     npm run newsroom:verify            read-only security checks
     npm run newsroom:verify:full       also signs in with the passcode

   Uses only the PUBLIC values from .env.local (or the
   environment): VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
   No secrets are needed or read.

   Default mode changes nothing. It sends one deliberately
   cross-site request to the Edge Function, which is refused
   before the passcode is looked at, so it uses up no attempts.

   --full asks for the passcode at a hidden prompt, then:
   signs in, creates a temporary draft (after asking you),
   checks visitors cannot see it, deletes it, signs out, and
   checks the old token no longer works. It also makes ONE
   deliberately wrong attempt (1 of the 5 allowed per 15 min).
========================================================= */

import { existsSync, readFileSync } from "node:fs";
import { createInterface } from "node:readline";

const SITE_ORIGIN = "https://www.regalaffluence.com";

/* ---------- configuration ---------- */

const readEnvFile = (path) => {
  if (!existsSync(path)) return {};

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, "")])
  );
};

const fileEnv = { ...readEnvFile(".env"), ...readEnvFile(".env.local") };
const URL_BASE = (process.env.VITE_SUPABASE_URL || fileEnv.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const ANON = process.env.VITE_SUPABASE_ANON_KEY || fileEnv.VITE_SUPABASE_ANON_KEY || "";
/* `npm run newsroom:verify:full` passes --full directly. In Windows
   PowerShell, `npm run newsroom:verify -- --full` loses the `--`, so
   npm keeps --full for itself and exposes it as npm_config_full. */
const FULL =
  process.argv.includes("--full") || process.env.npm_config_full === "true";

if (!URL_BASE || !ANON) {
  console.error(
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local first (see docs/NEWS_CMS.md)."
  );
  process.exit(1);
}

/* Catch common copy-paste mistakes before calling Supabase.
   Only the key's type is reported, never its value. */
const keyProblem = (() => {
  if (/^sb_secret_/.test(ANON)) return "this is a SECRET key; use the publishable / anon key instead";
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(ANON)) return null;

  if (/^eyJ[\w-]+\.[\w-]+\.[\w-]+$/.test(ANON)) {
    try {
      const role = JSON.parse(Buffer.from(ANON.split(".")[1], "base64url").toString()).role;
      return role === "anon" ? null : `this key has role "${role}"; use the anon key instead`;
    } catch {
      return "the key could not be read";
    }
  }

  return "it should start with sb_publishable_ (or be the legacy anon key starting eyJ); check for extra characters such as a doubled '='";
})();

if (keyProblem) {
  console.error(`VITE_SUPABASE_ANON_KEY looks wrong: ${keyProblem}.`);
  process.exit(1);
}

/* ---------- helpers ---------- */

let failures = 0;

const report = (ok, name, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

const request = async (path, { method = "GET", token = ANON, body, headers = {} } = {}) => {
  const response = await fetch(`${URL_BASE}${path}`, {
    method,
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${token}`,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let json = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* not JSON */
  }

  return { status: response.status, ok: response.ok, json, text, headers: response.headers };
};

/* One shared reader with a line queue, so answers typed (or
   piped) ahead of a prompt are not lost. */
let reader = null;
let muted = false;
const lines = [];
const waiting = [];

const ask = (question, hidden = false) => {
  if (!reader) {
    reader = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const write = reader._writeToOutput?.bind(reader);
    reader._writeToOutput = (text) => {
      if (!muted) write?.(text);
    };
    reader.on("line", (raw) => {
      /* PowerShell prefixes piped input with an invisible byte-order mark. */
      const line = raw.replace(/^﻿/, "");
      const next = waiting.shift();
      if (next) next(line);
      else lines.push(line);
    });
  }

  process.stdout.write(question);
  muted = hidden;

  return new Promise((resolve) => {
    const finish = (answer) => {
      muted = false;
      if (hidden) process.stdout.write("\n");
      resolve(answer);
    };

    if (lines.length) finish(lines.shift());
    else waiting.push(finish);
  });
};

/* ---------- read-only checks ---------- */

console.log(`\nChecking ${URL_BASE}\n`);

const categories = await request("/rest/v1/news_categories?select=slug");
report(
  categories.ok && Array.isArray(categories.json) && categories.json.length >= 6,
  "Database setup applied (categories readable)",
  categories.ok && Array.isArray(categories.json)
    ? `${categories.json.length} categories`
    : `HTTP ${categories.status}${categories.json?.message ? `: ${categories.json.message}` : ""}`
);

const publicPosts = await request("/rest/v1/news_posts?select=slug,status,published_at");
const now = Date.now();
const leaked = (Array.isArray(publicPosts.json) ? publicPosts.json : []).filter(
  (post) => post.status !== "published" || new Date(post.published_at).getTime() > now
);
report(
  publicPosts.ok && leaked.length === 0,
  "Visitors only see published, live posts",
  publicPosts.ok && Array.isArray(publicPosts.json)
    ? `${publicPosts.json.length} visible`
    : `HTTP ${publicPosts.status}`
);

const audit = await request("/rest/v1/news_posts?select=created_by&limit=1");
report(!audit.ok, "Visitors cannot read internal columns", `HTTP ${audit.status}`);

const anonInsert = await request("/rest/v1/news_posts", {
  method: "POST",
  body: { title: "Unauthorised test", slug: `unauthorised-${now}`, status: "published" },
});
report(!anonInsert.ok, "Visitors cannot create posts", `HTTP ${anonInsert.status}`);

for (const [path, body, label] of [
  ["/rest/v1/rpc/newsroom_attempt_login", { p_client_key: "x", p_passcode: "x" }, "check passcodes directly"],
  ["/rest/v1/rpc/newsroom_set_passcode", { p_passcode: "hijack" }, "change the passcode"],
  ["/rest/v1/newsroom_settings?select=*", undefined, "read newsroom settings"],
  ["/rest/v1/newsroom_login_attempts?select=*", undefined, "read login attempts"],
]) {
  const result = await request(path, body ? { method: "POST", body } : {});
  report(!result.ok, `Visitors cannot ${label}`, `HTTP ${result.status}`);
}

const bucket = await request("/storage/v1/object/public/news-images/__verify-missing__.jpg");
report(
  !/bucket not found/i.test(bucket.text),
  "Image storage bucket exists",
  `HTTP ${bucket.status}`
);

const upload = await fetch(`${URL_BASE}/storage/v1/object/news-images/verify/${now}.png`, {
  method: "POST",
  headers: { apikey: ANON, Authorization: `Bearer ${ANON}`, "Content-Type": "image/png" },
  body: new Uint8Array([137, 80, 78, 71]),
});
report(!upload.ok, "Visitors cannot upload images", `HTTP ${upload.status}`);

const preflight = await fetch(`${URL_BASE}/functions/v1/newsroom-auth`, {
  method: "OPTIONS",
  headers: { Origin: SITE_ORIGIN, "Access-Control-Request-Method": "POST" },
});
report(
  preflight.headers.get("access-control-allow-origin") === SITE_ORIGIN,
  "Edge Function deployed and allows the website",
  `HTTP ${preflight.status}`
);

const crossSite = await request("/functions/v1/newsroom-auth", {
  method: "POST",
  body: { passcode: "x" },
  headers: { Origin: "https://not-regal-affluence.example" },
});
report(
  crossSite.status === 403,
  "Edge Function refuses other websites",
  crossSite.status === 401 ? "HTTP 401: turn OFF 'Verify JWT' for newsroom-auth" : `HTTP ${crossSite.status}`
);

/* ---------- full sign-in checks ---------- */

if (FULL) {
  console.log("");

  const signIn = (passcode) =>
    request("/functions/v1/newsroom-auth", {
      method: "POST",
      body: { passcode },
      headers: { Origin: SITE_ORIGIN },
    });

  const wrong = await signIn(`definitely-wrong-${now}`);
  report(wrong.status === 401, "Wrong passcode is rejected", `HTTP ${wrong.status}`);

  const passcode = await ask("Newsroom passcode (hidden): ", true);
  const login = await signIn(passcode);
  const token = login.json?.access_token;

  report(
    login.status === 200 && typeof token === "string",
    "Correct passcode signs in",
    login.status === 200 ? "" : `HTTP ${login.status} ${login.json?.error ?? ""}`
  );

  if (token) {
    report(!("refresh_token" in login.json), "No refresh token is sent to the browser");

    const lifetime = login.json.expires_at - Math.floor(Date.now() / 1000);
    report(lifetime > 0 && lifetime <= 3700, "Session is short-lived", `${Math.round(lifetime / 60)} minutes`);

    const editor = await request("/rest/v1/rpc/is_news_editor", { method: "POST", token, body: {} });
    report(editor.json === true, "Session is recognised as a newsroom editor");

    const answer = await ask(
      "Create and then delete a temporary DRAFT post to test privacy? [y/N] "
    );

    if (/^y/i.test(answer.trim())) {
      const slug = `verify-draft-${now}`;
      const created = await request("/rest/v1/news_posts", {
        method: "POST",
        token,
        body: { title: "Temporary verification draft", slug, status: "draft" },
        headers: { Prefer: "return=representation" },
      });
      report(created.status === 201, "Newsroom can create a draft", `HTTP ${created.status}`);

      const peek = await request(`/rest/v1/news_posts?select=slug&slug=eq.${slug}`);
      report(peek.ok && peek.json.length === 0, "Visitors cannot see the draft");

      const removed = await request(`/rest/v1/news_posts?slug=eq.${slug}`, {
        method: "DELETE",
        token,
        headers: { Prefer: "return=representation" },
      });
      report(removed.ok && removed.json?.length === 1, "Newsroom can delete the draft");
    }

    const logout = await fetch(`${URL_BASE}/auth/v1/logout?scope=local`, {
      method: "POST",
      headers: { apikey: ANON, Authorization: `Bearer ${token}` },
    });
    report(logout.ok, "Sign out succeeds", `HTTP ${logout.status}`);

    const after = await request("/rest/v1/rpc/is_news_editor", { method: "POST", token, body: {} });
    report(after.json !== true, "Old token stops working immediately after sign out");

    const afterWrite = await request("/rest/v1/news_posts", {
      method: "POST",
      token,
      body: { title: "After sign out", slug: `after-signout-${now}`, status: "draft" },
    });
    report(!afterWrite.ok, "Old token cannot write after sign out", `HTTP ${afterWrite.status}`);
  }
}

console.log(
  failures === 0
    ? `\nAll checks passed${FULL ? "" : ". Run npm run newsroom:verify:full to test signing in."}`
    : `\n${failures} check(s) failed. See docs/NEWS_CMS.md → Troubleshooting.`
);

reader?.close();
process.exit(failures === 0 ? 0 : 1);
