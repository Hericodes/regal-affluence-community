import type {
  DisplayStatus,
  PostInput,
  PostStatus,
} from "./types";

/* =========================================================
   LIMITS (kept in sync with the database constraints)
========================================================= */

export const LIMITS = {
  titleMin: 3,
  titleMax: 200,
  slugMax: 120,
  excerptMax: 400,
  contentMax: 200000,
  altMax: 250,
  authorMax: 120,
  seoTitleMax: 120,
  seoDescriptionMax: 320,
} as const;

export const SLUG_PATTERN =
  /^[a-z0-9]+(-[a-z0-9]+)*$/;

/* =========================================================
   SLUGS
========================================================= */

export const slugify = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.slugMax)
    .replace(/-+$/g, "");

/* =========================================================
   STATUS
========================================================= */

export const getDisplayStatus = (
  status: PostStatus,
  publishedAt: string | null,
  now: Date = new Date()
): DisplayStatus => {
  if (
    status === "published" &&
    publishedAt &&
    new Date(publishedAt).getTime() > now.getTime()
  ) {
    return "scheduled";
  }

  return status;
};

export const STATUS_LABELS: Record<DisplayStatus, string> = {
  draft: "Draft",
  published: "Published",
  scheduled: "Scheduled",
  archived: "Archived",
};

/* =========================================================
   DATES
========================================================= */

export const formatDate = (iso: string | null): string => {
  if (!iso) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
};

export const formatDateTime = (iso: string | null): string => {
  if (!iso) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
};

/* ISO string -> value for <input type="datetime-local">. */
export const toLocalInputValue = (iso: string | null): string => {
  if (!iso) return "";

  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
};

/* <input type="datetime-local"> value -> ISO string. */
export const fromLocalInputValue = (value: string): string | null => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date.toISOString();
};

/* =========================================================
   READING TIME
========================================================= */

export const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const readingMinutes = (html: string): number => {
  const words = stripHtml(html)
    .split(" ")
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
};

/* =========================================================
   SEARCH
   Builds a safe Postgres tsquery with prefix matching, so
   "prop invest" matches "property investment". Anything
   other than letters and digits is discarded, which means
   user input can never produce tsquery syntax errors.
========================================================= */

export const buildSearchQuery = (input: string): string | null => {
  const terms = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 0)
    .slice(0, 8);

  if (terms.length === 0) return null;

  return terms
    .map((term) => `${term}:*`)
    .join(" & ");
};

/* Escapes LIKE wildcards in user input. */
export const escapeLike = (value: string): string =>
  value.replace(/[\\%_]/g, (match) => `\\${match}`);

/* =========================================================
   VALIDATION
   Mirrors the database CHECK constraints so editors get
   clear messages before a request is sent. The database
   remains the source of truth.
========================================================= */

export type PostFieldErrors = Partial<
  Record<keyof PostInput, string>
>;

export const validatePost = (
  input: PostInput
): PostFieldErrors => {
  const errors: PostFieldErrors = {};
  const title = input.title.trim();

  if (title.length < LIMITS.titleMin) {
    errors.title = "Enter a title of at least 3 characters.";
  } else if (title.length > LIMITS.titleMax) {
    errors.title = `Keep the title under ${LIMITS.titleMax} characters.`;
  }

  if (!input.slug) {
    errors.slug = "Enter a URL slug.";
  } else if (input.slug.length > LIMITS.slugMax) {
    errors.slug = `Keep the slug under ${LIMITS.slugMax} characters.`;
  } else if (!SLUG_PATTERN.test(input.slug)) {
    errors.slug =
      "Use lowercase letters, numbers, and single hyphens only.";
  }

  if (input.excerpt.length > LIMITS.excerptMax) {
    errors.excerpt = `Keep the excerpt under ${LIMITS.excerptMax} characters.`;
  }

  if (input.content.length > LIMITS.contentMax) {
    errors.content = "The article is too long to save.";
  }

  if (input.cover_image_alt.length > LIMITS.altMax) {
    errors.cover_image_alt = `Keep the description under ${LIMITS.altMax} characters.`;
  }

  if (
    input.cover_image_url &&
    !input.cover_image_alt.trim() &&
    input.status === "published"
  ) {
    errors.cover_image_alt =
      "Describe the cover image for screen readers before publishing.";
  }

  if ((input.author_name ?? "").length > LIMITS.authorMax) {
    errors.author_name = `Keep the author name under ${LIMITS.authorMax} characters.`;
  }

  if ((input.seo_title ?? "").length > LIMITS.seoTitleMax) {
    errors.seo_title = `Keep the SEO title under ${LIMITS.seoTitleMax} characters.`;
  }

  if (
    (input.seo_description ?? "").length >
    LIMITS.seoDescriptionMax
  ) {
    errors.seo_description = `Keep the meta description under ${LIMITS.seoDescriptionMax} characters.`;
  }

  /* Publishing has stricter requirements than a draft. */
  if (input.status === "published") {
    if (!input.category_slug) {
      errors.category_slug = "Choose a category before publishing.";
    }

    if (!input.excerpt.trim()) {
      errors.excerpt = "Write a short excerpt before publishing.";
    }

    if (!stripHtml(input.content)) {
      errors.content = "Write the article before publishing.";
    }
  }

  return errors;
};

/* =========================================================
   ERROR MESSAGES
   Translates database / API errors into plain language
   without exposing internal details.
========================================================= */

interface ErrorLike {
  code?: string;
  message?: string;
  status?: number;
  statusCode?: string | number;
}

export const toFriendlyError = (
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string => {
  if (!error || typeof error !== "object") return fallback;

  const { code, message = "", status, statusCode } =
    error as ErrorLike;

  if (code === "23505") {
    return message.includes("slug")
      ? "Another post already uses this URL slug. Choose a different one."
      : "This item already exists.";
  }

  if (code === "23503") {
    return "The selected category no longer exists. Choose another.";
  }

  if (code === "23514" || code === "22001") {
    return "Some details are invalid or too long. Check the form and try again.";
  }

  if (
    code === "42501" ||
    status === 401 ||
    status === 403 ||
    statusCode === "403" ||
    statusCode === 403 ||
    code === "PGRST301" ||
    code === "PGRST303"
  ) {
    return "Your newsroom session has ended or is not allowed to do that. Please enter the passcode again.";
  }

  if (message.toLowerCase().includes("failed to fetch")) {
    return "We could not reach the server. Check your connection and try again.";
  }

  if (
    error instanceof Error &&
    (error.name === "NewsServiceUnavailableError" ||
      error.name === "NewsroomSessionError")
  ) {
    return error.message;
  }

  return fallback;
};
