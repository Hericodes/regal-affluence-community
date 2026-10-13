import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { beforeAll, describe, expect, it } from "vitest";

import { SUPABASE_STUB } from "./supabaseStub";

/* =========================================================
   NEWS CMS — DATABASE PERMISSION TESTS
   ---------------------------------------------------------
   Runs the real migrations against an in-process Postgres
   (PGlite) with a minimal stand-in for the Supabase auth
   and storage schemas, then checks what visitors, ordinary
   signed-in users, and editors can actually do.
========================================================= */

const migration = (name: string) =>
  readFileSync(
    fileURLToPath(new URL(`../migrations/${name}`, import.meta.url)),
    "utf8"
  );

const EDITOR = "11111111-1111-1111-1111-111111111111";
const OUTSIDER = "22222222-2222-2222-2222-222222222222";

/* Sessions named in access tokens (auth.sessions rows). */
const EDITOR_SESSION = "aaaaaaaa-0000-0000-0000-000000000001";
const REVOKED_SESSION = "aaaaaaaa-0000-0000-0000-000000000002";
const OUTSIDER_SESSION = "aaaaaaaa-0000-0000-0000-000000000003";


let db: PGlite;

/* Runs SQL as a given Supabase role / user, in a transaction
   that is always rolled back so tests stay independent. */
const SESSION_FOR: Record<string, string> = {
  [EDITOR]: EDITOR_SESSION,
  [OUTSIDER]: OUTSIDER_SESSION,
};

const as = async <T>(
  role: "anon" | "authenticated" | "service_role",
  userId: string | null,
  run: (sql: (text: string, params?: unknown[]) => Promise<T[]>) => Promise<void>,
  sessionId: string | null = userId ? SESSION_FOR[userId] : null
) => {
  await db.query("begin");

  try {
    const claims = userId ? { sub: userId, role, session_id: sessionId } : { role };

    await db.query(
      "select set_config('request.jwt.claims', $1, true)",
      [JSON.stringify(claims)]
    );
    await db.query(`set local role ${role}`);

    await run(async (text, params) => {
      const result = await db.query<T>(text, params);
      return result.rows;
    });
  } finally {
    await db.query("rollback");
  }
};

const insertPost = (
  slug: string,
  status: string,
  publishedAt: string | null
) =>
  db.query(
    `insert into public.news_posts
       (title, slug, excerpt, content, category_slug, status, published_at)
     values ($1, $2, 'Excerpt', '<p>Body text</p>', 'events', $3, $4)`,
    [`Post ${slug}`, slug, status, publishedAt]
  );

beforeAll(async () => {
  db = new PGlite({ extensions: { pgcrypto } });

  await db.exec(SUPABASE_STUB);
  await db.exec(migration("20261012000000_news_cms.sql"));
  await db.exec(migration("20261012000100_news_images_storage.sql"));
  await db.exec(migration("20261013000000_newsroom_passcode_auth.sql"));

  await db.query(
    "insert into auth.users (id, email) values ($1, 'editor@example.com'), ($2, 'outsider@example.com')",
    [EDITOR, OUTSIDER]
  );
  await db.query("insert into public.news_editors (user_id) values ($1)", [EDITOR]);
  await db.query(
    "insert into auth.sessions (id, user_id) values ($1, $2), ($3, $4)",
    [EDITOR_SESSION, EDITOR, OUTSIDER_SESSION, OUTSIDER]
  );

  await insertPost("live-post", "published", "2020-01-01T00:00:00Z");
  await insertPost("draft-post", "draft", null);
  await insertPost("archived-post", "archived", "2020-01-01T00:00:00Z");
  await insertPost("scheduled-post", "published", "2999-01-01T00:00:00Z");
}, 60000);

describe("public visitors (anon)", () => {
  it("only see published posts whose time has come", async () => {
    await as("anon", null, async (sql) => {
      const rows = await sql("select slug from public.news_posts order by slug");
      expect(rows).toEqual([{ slug: "live-post" }]);
    });
  });

  it("cannot read internal audit columns", async () => {
    await as("anon", null, async (sql) => {
      await expect(sql("select created_by from public.news_posts")).rejects.toThrow(
        /permission denied/
      );
    });
  });

  it.each([
    "insert into public.news_posts (title, slug, status) values ('Hacked post', 'hacked', 'published')",
    "update public.news_posts set title = 'Changed title'",
    "delete from public.news_posts",
  ])("cannot run: %s", async (statement) => {
    await as("anon", null, async (sql) => {
      await expect(sql(statement)).rejects.toThrow(/permission denied/);
    });
  });

  it("can read categories but not change them", async () => {
    await as("anon", null, async (sql) => {
      const rows = await sql("select slug from public.news_categories");
      expect(rows).toHaveLength(6);

      await expect(
        sql("insert into public.news_categories (slug, name) values ('x', 'X')")
      ).rejects.toThrow(/permission denied/);
    });
  });

  it("are not editors", async () => {
    await as("anon", null, async (sql) => {
      const rows = await sql("select public.is_news_editor() as ok");
      expect(rows).toEqual([{ ok: false }]);
    });
  });
});

describe("signed-in users who are not editors", () => {
  it("see only the public posts", async () => {
    await as("authenticated", OUTSIDER, async (sql) => {
      const rows = await sql("select slug from public.news_posts order by slug");
      expect(rows).toEqual([{ slug: "live-post" }]);
    });
  });

  it("cannot create posts", async () => {
    await as("authenticated", OUTSIDER, async (sql) => {
      await expect(
        sql(
          "insert into public.news_posts (title, slug, status) values ('Sneaky post', 'sneaky', 'published')"
        )
      ).rejects.toThrow(/row-level security/);
    });
  });

  it("cannot publish, edit, or delete existing posts", async () => {
    await as("authenticated", OUTSIDER, async (sql) => {
      const updated = await sql(
        "update public.news_posts set status = 'published', published_at = now() where slug = 'draft-post' returning id"
      );
      expect(updated).toHaveLength(0);

      const edited = await sql(
        "update public.news_posts set title = 'Defaced' where slug = 'live-post' returning id"
      );
      expect(edited).toHaveLength(0);

      const deleted = await sql("delete from public.news_posts returning id");
      expect(deleted).toHaveLength(0);
    });
  });

  it("cannot add themselves to the editor list", async () => {
    await as("authenticated", OUTSIDER, async (sql) => {
      await expect(
        sql("insert into public.news_editors (user_id) values ($1)", [OUTSIDER])
      ).rejects.toThrow(/permission denied/);
    });
  });

  it("cannot upload images", async () => {
    await as("authenticated", OUTSIDER, async (sql) => {
      await expect(
        sql(
          "insert into storage.objects (bucket_id, name) values ('news-images', 'covers/evil.png')"
        )
      ).rejects.toThrow(/row-level security/);
    });
  });
});

describe("editors", () => {
  it("can see every post, including drafts and scheduled posts", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      const rows = await sql("select slug from public.news_posts order by slug");
      expect(rows.map((row) => (row as { slug: string }).slug)).toEqual([
        "archived-post",
        "draft-post",
        "live-post",
        "scheduled-post",
      ]);
    });
  });

  it("can create a draft, and the author is recorded server-side", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      const rows = await sql(
        `insert into public.news_posts (title, slug, status, created_by)
         values ('Fresh draft', 'fresh-draft', 'draft', $1)
         returning created_by, published_at`,
        [OUTSIDER]
      );
      expect(rows).toEqual([{ created_by: EDITOR, published_at: null }]);
    });
  });

  it("publishing without a date goes live immediately", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      const rows = await sql(
        "update public.news_posts set status = 'published' where slug = 'draft-post' returning published_at is not null as stamped"
      );
      expect(rows).toEqual([{ stamped: true }]);

      await sql("reset role");
      await sql("set local role anon");

      const visible = await sql(
        "select slug from public.news_posts where slug = 'draft-post'"
      );
      expect(visible).toHaveLength(1);
    });
  });

  it("unpublishing removes a post from public view", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      await sql("update public.news_posts set status = 'draft' where slug = 'live-post'");

      await sql("reset role");
      await sql("set local role anon");

      const visible = await sql("select slug from public.news_posts");
      expect(visible).toHaveLength(0);
    });
  });

  it("a scheduled post becomes public once its time passes", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      await sql(
        "update public.news_posts set published_at = now() - interval '1 second' where slug = 'scheduled-post'"
      );

      await sql("reset role");
      await sql("set local role anon");

      const visible = await sql(
        "select slug from public.news_posts where slug = 'scheduled-post'"
      );
      expect(visible).toHaveLength(1);
    });
  });

  it("cannot reuse an existing slug", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      await expect(
        sql("insert into public.news_posts (title, slug) values ('Duplicate', 'live-post')")
      ).rejects.toThrow(/duplicate key/);
    });
  });

  it("cannot store an invalid status or slug", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      await expect(
        sql("insert into public.news_posts (title, slug, status) values ('Bad status', 'bad-status', 'live')")
      ).rejects.toThrow(/check constraint/);
    });

    await as("authenticated", EDITOR, async (sql) => {
      await expect(
        sql("insert into public.news_posts (title, slug) values ('Bad slug', 'Bad Slug!')")
      ).rejects.toThrow(/check constraint/);
    });
  });

  it("can delete posts", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      const rows = await sql(
        "delete from public.news_posts where slug = 'archived-post' returning id"
      );
      expect(rows).toHaveLength(1);
    });
  });

  it("can upload images to the news bucket only", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      const rows = await sql(
        "insert into storage.objects (bucket_id, name) values ('news-images', 'covers/2026/a.png') returning name"
      );
      expect(rows).toHaveLength(1);
    });
  });

  it("finds posts with prefix full-text search", async () => {
    await as("anon", null, async (sql) => {
      const rows = await sql(
        "select slug from public.news_posts where search_vector @@ to_tsquery('english', 'bod:* & tex:*')"
      );
      expect(rows).toEqual([{ slug: "live-post" }]);
    });
  });
});

describe("newsroom sessions", () => {
  it("an editor token whose session was revoked (signed out) has no access", async () => {
    await as(
      "authenticated",
      EDITOR,
      async (sql) => {
        expect(await sql("select public.is_news_editor() as ok")).toEqual([{ ok: false }]);

        const rows = await sql("select slug from public.news_posts order by slug");
        expect(rows).toEqual([{ slug: "live-post" }]);

        await expect(
          sql("insert into public.news_posts (title, slug) values ('After logout', 'after-logout')")
        ).rejects.toThrow(/row-level security/);
      },
      REVOKED_SESSION
    );
  });

  it("an editor token without a session id has no access", async () => {
    await as(
      "authenticated",
      EDITOR,
      async (sql) => {
        expect(await sql("select public.is_news_editor() as ok")).toEqual([{ ok: false }]);
      },
      null
    );
  });

  it("a time-boxed session past its not_after has no access", async () => {
    await db.query(
      "update auth.sessions set not_after = now() - interval '1 minute' where id = $1",
      [EDITOR_SESSION]
    );

    try {
      await as("authenticated", EDITOR, async (sql) => {
        expect(await sql("select public.is_news_editor() as ok")).toEqual([{ ok: false }]);
      });
    } finally {
      await db.query("update auth.sessions set not_after = null where id = $1", [EDITOR_SESSION]);
    }
  });

  it("a valid editor session has access", async () => {
    await as("authenticated", EDITOR, async (sql) => {
      expect(await sql("select public.is_news_editor() as ok")).toEqual([{ ok: true }]);
    });
  });
});

describe("passcode sign-in (database side)", () => {
  const attempt = async (client: string, passcode: string) => {
    const { rows } = await db.query<{ status: string; retry_after_seconds: number }>(
      "select * from public.newsroom_attempt_login($1, $2)",
      [client, passcode]
    );
    return rows[0];
  };

  const setPasscode = async (passcode: string) => {
    const { rows } = await db.query<{ message: string }>(
      "select public.newsroom_set_passcode($1) as message",
      [passcode]
    );
    return rows[0].message;
  };

  it("reports not_configured until a passcode is set", async () => {
    expect(await attempt("client-x", "anything")).toEqual({ status: "not_configured", retry_after_seconds: 0 });
  });

  it("stores only a bcrypt hash, never the passcode", async () => {
    expect(await setPasscode("abc")).toMatch(/testing only/);

    const message = await setPasscode("Test-Passcode-1");
    expect(message).not.toMatch(/WARNING/);

    const { rows } = await db.query<{ passcode_hash: string }>(
      "select passcode_hash from public.newsroom_settings"
    );
    expect(rows[0].passcode_hash).toMatch(/^\$2[aby]\$12\$/);
    expect(rows[0].passcode_hash).not.toContain("Test-Passcode-1");
  });

  it("accepts the right passcode and rejects others", async () => {
    await setPasscode("Test-Passcode-1");

    expect((await attempt("client-ok", "Test-Passcode-1")).status).toBe("ok");
    expect((await attempt("client-ok", "test-passcode-1")).status).toBe("invalid");
    expect((await attempt("client-ok", "Test-Passcode-1 ")).status).toBe("invalid");
  });

  it("does not warn about long passcodes, and rejects too-short ones", async () => {
    expect(await setPasscode("four random words here")).not.toMatch(/WARNING/);
    await expect(setPasscode("ab")).rejects.toThrow(/at least 3/);
    await setPasscode("Test-Passcode-1");
  });

  it("locks a client after 5 wrong attempts, even for the right passcode", async () => {
    await setPasscode("Test-Passcode-1");

    for (let i = 0; i < 5; i++) {
      expect((await attempt("client-a", `wrong-${i}`)).status).toBe("invalid");
    }

    const locked = await attempt("client-a", "Test-Passcode-1");
    expect(locked.status).toBe("locked");
    expect(locked.retry_after_seconds).toBeGreaterThan(800);
    expect(locked.retry_after_seconds).toBeLessThanOrEqual(900);

    expect((await attempt("client-b", "Test-Passcode-1")).status).toBe("ok");
  }, 60000);

  it("clears a client's failures after a successful sign-in", async () => {
    await setPasscode("Test-Passcode-1");

    for (let i = 0; i < 4; i++) await attempt("client-c", "wrong");
    expect((await attempt("client-c", "Test-Passcode-1")).status).toBe("ok");

    for (let i = 0; i < 4; i++) {
      expect((await attempt("client-c", "wrong")).status).toBe("invalid");
    }
    expect((await attempt("client-c", "Test-Passcode-1")).status).toBe("ok");
  }, 60000);

  it("locks everyone after 50 failures in total (IP rotation backstop)", async () => {
    await setPasscode("Test-Passcode-1");

    await db.query(
      "insert into public.newsroom_login_attempts (client_key) select 'rotating-' || i from generate_series(1, 49) i"
    );
    expect((await attempt("rotating-50", "wrong")).status).toBe("invalid");

    expect((await attempt("fresh-client", "Test-Passcode-1")).status).toBe("locked");
  });

  it("forgets failures older than 15 minutes", async () => {
    await setPasscode("Test-Passcode-1");

    for (let i = 0; i < 5; i++) await attempt("client-d", "wrong");
    await db.query(
      "update public.newsroom_login_attempts set created_at = now() - interval '16 minutes' where client_key = 'client-d'"
    );

    expect((await attempt("client-d", "Test-Passcode-1")).status).toBe("ok");
  });

  it("changing the passcode clears lockouts and signs out newsroom sessions", async () => {
    await db.query("update public.newsroom_settings set service_account_id = $1", [OUTSIDER]);
    await db.query("insert into auth.sessions (id, user_id) values ($1, $2)", [
      "bbbbbbbb-0000-0000-0000-000000000001",
      OUTSIDER,
    ]);
    for (let i = 0; i < 5; i++) await attempt("client-e", "wrong");

    expect(await setPasscode("Another-Passcode-2")).toMatch(/signed out|testing only/);

    const sessions = await db.query("select 1 from auth.sessions where user_id = $1", [OUTSIDER]);
    expect(sessions.rows).toHaveLength(0);
    expect((await attempt("client-e", "Another-Passcode-2")).status).toBe("ok");
    expect((await attempt("client-e", "Test-Passcode-1")).status).toBe("invalid");

    await db.query("insert into auth.sessions (id, user_id) values ($1, $2)", [OUTSIDER_SESSION, OUTSIDER]);
    await db.query("update public.newsroom_settings set service_account_id = null");
    await setPasscode("Test-Passcode-1");
  }, 60000);

  it("links the service account by email and adds it to the editor list", async () => {
    await db.query("insert into auth.users (id, email) values ($1, 'newsroom-service@regalaffluence.com')", [
      "cccccccc-0000-0000-0000-000000000001",
    ]);

    try {
      const missing = await db.query<{ id: string | null }>(
        "select public.newsroom_service_account_id('nobody@example.com') as id"
      );
      expect(missing.rows[0].id).toBeNull();

      const found = await db.query<{ id: string }>(
        "select public.newsroom_service_account_id('Newsroom-Service@regalaffluence.com') as id"
      );
      expect(found.rows[0].id).toBe("cccccccc-0000-0000-0000-000000000001");

      const editor = await db.query("select 1 from public.news_editors where user_id = $1", [
        "cccccccc-0000-0000-0000-000000000001",
      ]);
      expect(editor.rows).toHaveLength(1);
    } finally {
      await db.query("update public.newsroom_settings set service_account_id = null");
      await db.query("delete from public.news_editors where user_id = $1", ["cccccccc-0000-0000-0000-000000000001"]);
      await db.query("delete from auth.users where id = $1", ["cccccccc-0000-0000-0000-000000000001"]);
    }
  });

  it.each([
    ["anon", "select * from public.newsroom_attempt_login('x', 'y')"],
    ["anon", "select public.newsroom_set_passcode('hijacked')"],
    ["anon", "select public.newsroom_service_account_id('x@example.com')"],
    ["anon", "select * from public.newsroom_settings"],
    ["anon", "select * from public.newsroom_login_attempts"],
    ["authenticated", "select * from public.newsroom_attempt_login('x', 'y')"],
    ["authenticated", "select public.newsroom_set_passcode('hijacked')"],
    ["authenticated", "select public.newsroom_service_account_id('x@example.com')"],
    ["authenticated", "select * from public.newsroom_settings"],
    ["authenticated", "select * from public.newsroom_login_attempts"],
    ["service_role", "select public.newsroom_set_passcode('hijacked')"],
  ] as const)("%s cannot run: %s", async (role, statement) => {
    await as(role, role === "authenticated" ? EDITOR : null, async (sql) => {
      await expect(sql(statement)).rejects.toThrow(/permission denied/);
    });
  });

  it("the Edge Function (service role) can check passcodes", async () => {
    await as("service_role", null, async (sql) => {
      const rows = await sql("select * from public.newsroom_attempt_login('service-check', 'wrong')");
      expect(rows).toEqual([{ status: "invalid", retry_after_seconds: 0 }]);
    });
  });
});

describe("storage bucket", () => {
  it("enforces a 5 MB limit and image-only MIME types", async () => {
    const { rows } = await db.query<{
      public: boolean;
      file_size_limit: number;
      allowed_mime_types: string[];
    }>(
      "select public, file_size_limit, allowed_mime_types from storage.buckets where id = 'news-images'"
    );

    expect(rows[0].public).toBe(true);
    expect(Number(rows[0].file_size_limit)).toBe(5242880);
    expect(rows[0].allowed_mime_types).toEqual([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ]);
  });
});
