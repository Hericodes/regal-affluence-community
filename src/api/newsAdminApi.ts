import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import {
  requireSupabase,
  supabaseAnonKey,
  supabaseUrl,
} from "../lib/supabase";
import { sanitizeArticleHtml } from "../news/sanitize";
import type {
  AdminPost,
  AdminPostSummary,
  PostInput,
  PostStatus,
} from "../news/types";
import { escapeLike } from "../news/utils";

/* =========================================================
   REGAL AFFLUENCE — NEWSROOM (ADMIN) API
   ---------------------------------------------------------
   These calls run with the newsroom session token.
   Authorisation is enforced by Row-Level Security in the
   database: a request without a valid, unexpired editor
   session is rejected server-side, whatever the browser
   sends.
========================================================= */

const SUMMARY_COLUMNS =
  "id, title, slug, excerpt, cover_image_url, cover_image_alt, category_slug, author_name, status, is_featured, published_at, created_at, updated_at";

const FULL_COLUMNS =
  `${SUMMARY_COLUMNS}, content, seo_title, seo_description`;

export const IMAGE_BUCKET = "news-images";

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

/* Thrown when a save conflicts with a newer change. */
export class StaleWriteError extends Error {
  constructor() {
    super(
      "This post was changed or deleted somewhere else. Reload it before saving again."
    );
    this.name = "StaleWriteError";
  }
}

/* =========================================================
   NEWSROOM SESSION
   ---------------------------------------------------------
   The passcode is checked server-side by the
   `newsroom-auth` Edge Function, which returns a short-lived
   access token (no refresh token). The token is kept in
   sessionStorage, so it disappears when the tab closes,
   and it stops working at its expiry time or on sign-out.
========================================================= */

const SESSION_KEY = "regal-newsroom-session";

export const SESSION_EXPIRED_EVENT = "regal-newsroom-session-expired";

interface NewsroomSession {
  accessToken: string;
  expiresAt: number; // epoch milliseconds
}

export class NewsroomSessionError extends Error {
  constructor() {
    super("Your newsroom session has ended. Please enter the passcode again.");
    this.name = "NewsroomSessionError";
  }
}

const clearNewsroomSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* Storage unavailable. */
  }
};

export const getNewsroomSession = (): NewsroomSession | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);

    if (!raw) return null;

    const session = JSON.parse(raw) as Partial<NewsroomSession>;

    if (
      typeof session.accessToken !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      clearNewsroomSession();
      return null;
    }

    return session as NewsroomSession;
  } catch {
    return null;
  }
};

const endSession = () => {
  clearNewsroomSession();
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
};

/* Any 401 from Supabase means the token is no longer valid. */
const guardedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);

  if (response.status === 401) endSession();

  return response;
};

let cachedClient: { token: string; client: SupabaseClient } | null = null;

/* A client that sends the newsroom token with every
   database, RPC, and storage request. */
const adminClient = (): SupabaseClient => {
  requireSupabase();

  const session = getNewsroomSession();

  if (!session) {
    endSession();
    throw new NewsroomSessionError();
  }

  if (cachedClient?.token !== session.accessToken) {
    const token = session.accessToken;

    cachedClient = {
      token,
      client: createClient(supabaseUrl, supabaseAnonKey, {
        accessToken: async () => token,
        global: { fetch: guardedFetch },
      }),
    };
  }

  return cachedClient.client;
};

/* =========================================================
   SIGN IN / OUT
========================================================= */

export const signInWithPasscode = async (passcode: string): Promise<void> => {
  requireSupabase();

  let response: Response;

  try {
    response = await fetch(`${supabaseUrl}/functions/v1/newsroom-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ passcode }),
    });
  } catch {
    throw new Error(
      "We couldn't reach the newsroom service. Check your connection and try again."
    );
  }

  const body = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    expires_at?: number;
    retryAfterSeconds?: number;
    error?: string;
  };

  if (response.status === 401) {
    throw new Error("That passcode is incorrect.");
  }

  if (response.status === 429) {
    const minutes = Math.max(1, Math.ceil((body.retryAfterSeconds ?? 900) / 60));

    throw new Error(
      `Too many incorrect attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`
    );
  }

  if (body.error === "not_configured") {
    throw new Error(
      "The newsroom passcode has not been set yet. Ask the site administrator to complete setup."
    );
  }

  if (!response.ok || !body.access_token || !body.expires_at) {
    throw new Error(
      "The newsroom is unavailable right now. Please try again later."
    );
  }

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      accessToken: body.access_token,
      expiresAt: body.expires_at * 1000,
    } satisfies NewsroomSession)
  );
};

/* Revokes the session on the server, so the token stops
   working immediately, then forgets it locally. */
export const signOutNewsroom = async (): Promise<void> => {
  const session = getNewsroomSession();

  clearNewsroomSession();
  cachedClient = null;

  if (!session || !supabaseUrl) return;

  try {
    await fetch(`${supabaseUrl}/auth/v1/logout?scope=local`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
  } catch {
    /* Offline: the token still expires on its own shortly. */
  }
};

/* Confirms with the database that the token is valid, the
   session still exists, and the account is an editor. */
export const isCurrentUserEditor = async (): Promise<boolean> => {
  const { data, error } = await adminClient().rpc("is_news_editor");

  if (error) throw error;

  return data === true;
};

/* =========================================================
   DASHBOARD STATS
========================================================= */

export interface DashboardStats {
  total: number;
  published: number;
  scheduled: number;
  drafts: number;
  archived: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const client = adminClient();
  const now = new Date().toISOString();

  const count = () =>
    client
      .from("news_posts")
      .select("id", { count: "exact", head: true });

  const results = await Promise.all([
    count(),
    count().eq("status", "published").lte("published_at", now),
    count().eq("status", "published").gt("published_at", now),
    count().eq("status", "draft"),
    count().eq("status", "archived"),
  ]);

  const failed = results.find((result) => result.error);

  if (failed?.error) throw failed.error;

  const [total, published, scheduled, drafts, archived] =
    results.map((result) => result.count ?? 0);

  return { total, published, scheduled, drafts, archived };
};

/* =========================================================
   LIST POSTS
========================================================= */

export type AdminStatusFilter =
  | "all"
  | "draft"
  | "published"
  | "scheduled"
  | "archived";

interface AdminListOptions {
  page: number;
  pageSize: number;
  status: AdminStatusFilter;
  category: string | null;
  search: string;
}

export const listAdminPosts = async ({
  page,
  pageSize,
  status,
  category,
  search,
}: AdminListOptions): Promise<{
  posts: AdminPostSummary[];
  total: number;
}> => {
  const now = new Date().toISOString();
  const from = page * pageSize;

  let query = adminClient()
    .from("news_posts")
    .select(SUMMARY_COLUMNS, { count: "exact" });

  if (status === "published") {
    query = query.eq("status", "published").lte("published_at", now);
  } else if (status === "scheduled") {
    query = query.eq("status", "published").gt("published_at", now);
  } else if (status !== "all") {
    query = query.eq("status", status);
  }

  if (category) {
    query = query.eq("category_slug", category);
  }

  const term = search.trim();

  if (term) {
    query = query.ilike("title", `%${escapeLike(term)}%`);
  }

  const { data, error, count } = await query
    .order("updated_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) throw error;

  return {
    posts: (data ?? []) as AdminPostSummary[],
    total: count ?? 0,
  };
};

/* =========================================================
   SINGLE POST
========================================================= */

export const getAdminPost = async (
  id: string
): Promise<AdminPost | null> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .select(FULL_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return (data as AdminPost | null) ?? null;
};

/* =========================================================
   WRITE HELPERS
========================================================= */

const toRow = (input: PostInput) => ({
  title: input.title.trim(),
  slug: input.slug,
  excerpt: input.excerpt.trim(),
  content: sanitizeArticleHtml(input.content),
  cover_image_url: input.cover_image_url || null,
  cover_image_alt: input.cover_image_alt.trim(),
  category_slug: input.category_slug || null,
  author_name: input.author_name?.trim() || null,
  status: input.status,
  is_featured: input.is_featured,
  published_at: input.published_at,
  seo_title: input.seo_title?.trim() || null,
  seo_description: input.seo_description?.trim() || null,
});

export const createPost = async (
  input: PostInput
): Promise<AdminPost> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .insert(toRow(input))
    .select(FULL_COLUMNS)
    .single();

  if (error) throw error;

  return data as AdminPost;
};

/*
 * Updates only succeed when the row has not changed since
 * it was loaded (compared on updated_at). This prevents one
 * tab silently overwriting another's work.
 */
export const updatePost = async (
  id: string,
  input: PostInput,
  expectedUpdatedAt: string
): Promise<AdminPost> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .update(toRow(input))
    .eq("id", id)
    .eq("updated_at", expectedUpdatedAt)
    .select(FULL_COLUMNS);

  if (error) throw error;

  if (!data || data.length === 0) throw new StaleWriteError();

  return data[0] as AdminPost;
};

export const setPostStatus = async (
  id: string,
  status: PostStatus,
  expectedUpdatedAt: string
): Promise<AdminPost> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .update({ status })
    .eq("id", id)
    .eq("updated_at", expectedUpdatedAt)
    .select(FULL_COLUMNS);

  if (error) throw error;

  if (!data || data.length === 0) throw new StaleWriteError();

  return data[0] as AdminPost;
};

export const setPostFeatured = async (
  id: string,
  isFeatured: boolean
): Promise<AdminPostSummary> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .update({ is_featured: isFeatured })
    .eq("id", id)
    .select(SUMMARY_COLUMNS);

  if (error) throw error;

  if (!data || data.length === 0) throw new StaleWriteError();

  return data[0] as AdminPostSummary;
};

export const deletePost = async (id: string): Promise<void> => {
  const { data, error } = await adminClient()
    .from("news_posts")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) throw error;

  if (!data || data.length === 0) {
    throw new Error(
      "The post could not be deleted. It may already have been removed."
    );
  }
};

export const isSlugAvailable = async (
  slug: string,
  currentId: string | null
): Promise<boolean> => {
  let query = adminClient()
    .from("news_posts")
    .select("id", { count: "exact", head: true })
    .eq("slug", slug);

  if (currentId) {
    query = query.neq("id", currentId);
  }

  const { count, error } = await query;

  if (error) throw error;

  return (count ?? 0) === 0;
};

/* =========================================================
   IMAGES
========================================================= */

export const validateImageFile = (file: File): string | null => {
  if (!IMAGE_TYPES[file.type]) {
    return "Use a JPG, PNG, WebP, or AVIF image.";
  }

  if (file.size > IMAGE_MAX_BYTES) {
    return "Images must be 5 MB or smaller.";
  }

  return null;
};

export const uploadNewsImage = async (
  file: File,
  folder: "covers" | "content"
): Promise<string> => {
  const problem = validateImageFile(file);

  if (problem) throw new Error(problem);

  const client = adminClient();
  const extension = IMAGE_TYPES[file.type];
  const year = new Date().getFullYear();
  const path = `${folder}/${year}/${crypto.randomUUID()}.${extension}`;

  const { error } = await client.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    const message = error.message.toLowerCase();

    if (message.includes("size") || message.includes("too large")) {
      throw new Error("Images must be 5 MB or smaller.");
    }

    if (message.includes("mime") || message.includes("type")) {
      throw new Error("Use a JPG, PNG, WebP, or AVIF image.");
    }

    if (message.includes("bucket not found")) {
      throw new Error(
        "Image storage has not been set up yet. Ask the site administrator to run the storage migration."
      );
    }

    throw new Error(
      "The image could not be uploaded. Please try again."
    );
  }

  return client.storage.from(IMAGE_BUCKET).getPublicUrl(path).data
    .publicUrl;
};
