import { defineConfig } from "vitest/config";

/*
 * The Edge Function imports supabase-js the Deno way
 * ("npm:…"). Point that at the installed package so the
 * same file can be tested in Node.
 */
export default defineConfig({
  test: {
    /* bcrypt in WebAssembly (database tests) is slow. */
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
  resolve: {
    alias: {
      "npm:@supabase/supabase-js@2": "@supabase/supabase-js",
    },
  },
});
