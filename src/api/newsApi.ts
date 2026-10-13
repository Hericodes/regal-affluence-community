import { requireSupabase } from "../lib/supabase";
import type {
  NewsCategory,
  PublicPost,
  PublicPostSummary,
} from "../news/types";
import { buildSearchQuery } from "../news/utils";

/* =========================================================
   REGAL AFFLUENCE — PUBLIC NEWS API
   ---------------------------------------------------------
   Every query here runs with the anonymous key. The
   database only returns posts that are published and whose
   publication time has passed, so drafts, archived posts,
   and scheduled posts can never be fetched from here.
========================================================= */

const SUMMARY_COLUMNS =
  "id, title, slug, excerpt, cover_image_url, cover_image_alt, category_slug, author_name, is_featured, published_at, updated_at";

const ARTICLE_COLUMNS =
  `${SUMMARY_COLUMNS}, content, seo_title, seo_description`;

export const NEWS_PAGE_SIZE = 9;

/* The policy already enforces this; repeating it keeps
   editors (who can read everything) seeing the public view
   when they browse the public pages while signed in. */
const livePosts = () =>
  requireSupabase()
    .from("news_posts")
    .select(SUMMARY_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString());

/* =========================================================
   CATEGORIES
========================================================= */

export const listCategories = async (): Promise<NewsCategory[]> => {
  const { data, error } = await requireSupabase()
    .from("news_categories")
    .select("slug, name, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  return data ?? [];
};

/* =========================================================
   FEATURED
========================================================= */

export const getFeaturedPost =
  async (): Promise<PublicPostSummary | null> => {
    const { data, error } = await livePosts()
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    return (data?.[0] as PublicPostSummary | undefined) ?? null;
  };

/* =========================================================
   LISTING
========================================================= */

interface ListOptions {
  page: number;
  category?: string | null;
  search?: string | null;
  excludeId?: string | null;
}

export interface PostPage {
  posts: PublicPostSummary[];
  total: number;
  hasMore: boolean;
}

export const listPublishedPosts = async ({
  page,
  category,
  search,
  excludeId,
}: ListOptions): Promise<PostPage> => {
  const from = page * NEWS_PAGE_SIZE;
  const to = from + NEWS_PAGE_SIZE - 1;

  let query = livePosts();

  if (category) {
    query = query.eq("category_slug", category);
  }

  const tsQuery = search ? buildSearchQuery(search) : null;

  if (tsQuery) {
    query = query.textSearch("search_vector", tsQuery, {
      config: "english",
    });
  }

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error, count } = await query
    .order("published_at", { ascending: false })
    .order("id", { ascending: true })
    .range(from, to);

  if (error) throw error;

  const total = count ?? 0;

  return {
    posts: (data ?? []) as PublicPostSummary[],
    total,
    hasMore: to + 1 < total,
  };
};

/* =========================================================
   ARTICLE
========================================================= */

export const getPublishedPostBySlug = async (
  slug: string
): Promise<PublicPost | null> => {
  const { data, error } = await requireSupabase()
    .from("news_posts")
    .select(ARTICLE_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;

  return (data as PublicPost | null) ?? null;
};

export const listRelatedPosts = async (
  post: Pick<PublicPost, "id" | "category_slug">,
  limit = 3
): Promise<PublicPostSummary[]> => {
  const related: PublicPostSummary[] = [];

  if (post.category_slug) {
    const { data, error } = await livePosts()
      .eq("category_slug", post.category_slug)
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    related.push(...((data ?? []) as PublicPostSummary[]));
  }

  /* Top up with the latest articles from any category. */
  if (related.length < limit) {
    const exclude = [post.id, ...related.map((item) => item.id)];

    const { data, error } = await livePosts()
      .not("id", "in", `(${exclude.join(",")})`)
      .order("published_at", { ascending: false })
      .limit(limit - related.length);

    if (error) throw error;

    related.push(...((data ?? []) as PublicPostSummary[]));
  }

  return related;
};
