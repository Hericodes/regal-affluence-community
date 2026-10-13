import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { describe, expect, it } from "vitest";

// @ts-expect-error — plain JS build script without type declarations.
import { buildSetupSql } from "../../scripts/build-setup-sql.mjs";
import { SUPABASE_STUB } from "./supabaseStub";

/* =========================================================
   supabase/setup.sql — the file pasted into the dashboard
========================================================= */

const setupSql = readFileSync(
  fileURLToPath(new URL("../setup.sql", import.meta.url)),
  "utf8"
).replace(/\r\n/g, "\n");

describe("supabase/setup.sql", () => {
  it("is up to date with the migrations (run `npm run newsroom:build-setup`)", () => {
    expect(setupSql).toBe(buildSetupSql());
  });

  it("applies cleanly to a fresh project and is safe to run twice", async () => {
    const db = new PGlite({ extensions: { pgcrypto } });

    await db.exec(SUPABASE_STUB);
    await db.exec(setupSql);
    await db.query(
      "insert into public.news_posts (title, slug, status, published_at) values ('Kept post', 'kept-post', 'published', now())"
    );
    await db.query("select public.newsroom_set_passcode('Test-Passcode-1')");

    await db.exec(setupSql);

    const posts = await db.query("select slug from public.news_posts");
    const categories = await db.query("select slug from public.news_categories");
    const settings = await db.query<{ passcode_hash: string | null }>(
      "select passcode_hash from public.newsroom_settings"
    );

    expect(posts.rows).toEqual([{ slug: "kept-post" }]);
    expect(categories.rows).toHaveLength(6);
    expect(settings.rows).toHaveLength(1);
    expect(settings.rows[0].passcode_hash).not.toBeNull();

    await db.close();
  }, 60000);

  it("contains no passcode, password, or key", () => {
    expect(setupSql).not.toMatch(/newsroom_set_passcode\('(?!your passcode)/);
    expect(setupSql).not.toMatch(/service_role_key|sb_secret_|eyJhbGci/i);
  });
});
