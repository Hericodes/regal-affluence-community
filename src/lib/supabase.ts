import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

/* =========================================================
   SUPABASE CLIENT
   ---------------------------------------------------------
   Only the public (anon) key is used here. It is safe to
   ship to the browser because every table it can reach is
   protected by Row-Level Security in the database.

   The service-role key must NEVER be added to this project.
========================================================= */

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL as string | undefined;

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
);

/*
 * The client is created only when configured so that the
 * rest of the website keeps working without news settings.
 *
 * This client never holds a user session: it is the public,
 * read-only view. The newsroom uses its own short-lived
 * token (see src/api/newsAdminApi.ts).
 */
export const supabase: SupabaseClient | null =
  isSupabaseConfigured
    ? createClient(
        SUPABASE_URL as string,
        SUPABASE_ANON_KEY as string,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
          },
        }
      )
    : null;

export const supabaseUrl = SUPABASE_URL ?? "";
export const supabaseAnonKey = SUPABASE_ANON_KEY ?? "";

export class NewsServiceUnavailableError extends Error {
  constructor() {
    super(
      "News & Updates is not available right now. Please try again later."
    );
    this.name = "NewsServiceUnavailableError";
  }
}

export const requireSupabase = (): SupabaseClient => {
  if (!supabase) {
    throw new NewsServiceUnavailableError();
  }

  return supabase;
};
