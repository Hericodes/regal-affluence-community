/* =========================================================
   NEWS TYPES
   Mirrors public.news_posts / public.news_categories.
========================================================= */

export const POST_STATUSES = [
  "draft",
  "published",
  "archived",
] as const;

export type PostStatus =
  (typeof POST_STATUSES)[number];

/*
 * "scheduled" is not stored: it is a published post whose
 * published_at is still in the future.
 */
export type DisplayStatus =
  | PostStatus
  | "scheduled";

export interface NewsCategory {
  slug: string;
  name: string;
  sort_order: number;
}

/* Columns visitors are allowed to read. */
export interface PublicPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string;
  category_slug: string | null;
  author_name: string | null;
  is_featured: boolean;
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  updated_at: string;
}

export type PublicPostSummary = Omit<
  PublicPost,
  "content" | "seo_title" | "seo_description"
>;

/* Full row, available to editors only. */
export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string;
  category_slug: string | null;
  author_name: string | null;
  status: PostStatus;
  is_featured: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export type AdminPostSummary = Omit<
  AdminPost,
  "content" | "seo_title" | "seo_description"
>;

/* What the editor form submits. */
export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string;
  category_slug: string | null;
  author_name: string | null;
  status: PostStatus;
  is_featured: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
}
