import { describe, expect, it } from "vitest";

import type { PostInput } from "./types";
import {
  buildSearchQuery,
  escapeLike,
  fromLocalInputValue,
  getDisplayStatus,
  slugify,
  toFriendlyError,
  toLocalInputValue,
  validatePost,
} from "./utils";

const baseInput: PostInput = {
  title: "Regal Affluence opens new office",
  slug: "regal-affluence-opens-new-office",
  excerpt: "A short summary.",
  content: "<p>Full article.</p>",
  cover_image_url: null,
  cover_image_alt: "",
  category_slug: "company-news",
  author_name: null,
  status: "draft",
  is_featured: false,
  published_at: null,
  seo_title: null,
  seo_description: null,
};

describe("slugify", () => {
  it("creates clean, URL-safe slugs", () => {
    expect(slugify("  Lagos Property Summit 2026!  ")).toBe(
      "lagos-property-summit-2026"
    );
    expect(slugify("Café & Résumé")).toBe("cafe-and-resume");
    expect(slugify("---")).toBe("");
  });

  it("never exceeds the database limit or ends with a hyphen", () => {
    const slug = slugify(`${"word ".repeat(60)}`);
    expect(slug.length).toBeLessThanOrEqual(120);
    expect(slug.endsWith("-")).toBe(false);
  });
});

describe("getDisplayStatus", () => {
  const now = new Date("2026-10-12T12:00:00Z");

  it("treats future published posts as scheduled", () => {
    expect(getDisplayStatus("published", "2026-10-13T00:00:00Z", now)).toBe(
      "scheduled"
    );
    expect(getDisplayStatus("published", "2026-10-11T00:00:00Z", now)).toBe(
      "published"
    );
    expect(getDisplayStatus("draft", "2026-10-13T00:00:00Z", now)).toBe("draft");
  });
});

describe("buildSearchQuery", () => {
  it("builds a prefix tsquery from plain words", () => {
    expect(buildSearchQuery("Prop invest")).toBe("prop:* & invest:*");
  });

  it("strips tsquery operators so input cannot break the query", () => {
    expect(buildSearchQuery("a & (b | !c) :* ' ")).toBe("a:* & b:* & c:*");
    expect(buildSearchQuery("!!! ()")).toBeNull();
  });
});

describe("escapeLike", () => {
  it("escapes LIKE wildcards", () => {
    expect(escapeLike("50%_off\\")).toBe("50\\%\\_off\\\\");
  });
});

describe("datetime-local conversion", () => {
  it("round-trips an ISO timestamp to the minute", () => {
    const iso = "2026-10-12T09:30:00.000Z";
    expect(fromLocalInputValue(toLocalInputValue(iso))).toBe(iso);
    expect(fromLocalInputValue("")).toBeNull();
  });
});

describe("validatePost", () => {
  it("accepts a valid draft", () => {
    expect(validatePost(baseInput)).toEqual({});
  });

  it("lets drafts be incomplete", () => {
    expect(
      validatePost({ ...baseInput, excerpt: "", content: "", category_slug: null })
    ).toEqual({});
  });

  it("requires category, excerpt, and content before publishing", () => {
    const errors = validatePost({
      ...baseInput,
      status: "published",
      excerpt: "",
      content: "<p> </p>",
      category_slug: null,
    });

    expect(Object.keys(errors).sort()).toEqual([
      "category_slug",
      "content",
      "excerpt",
    ]);
  });

  it("requires cover image alt text before publishing", () => {
    const errors = validatePost({
      ...baseInput,
      status: "published",
      cover_image_url: "https://example.com/a.jpg",
    });

    expect(errors.cover_image_alt).toBeDefined();
  });

  it("rejects malformed slugs and short titles", () => {
    const errors = validatePost({ ...baseInput, title: "Hi", slug: "Bad--Slug" });

    expect(errors.title).toBeDefined();
    expect(errors.slug).toBeDefined();
  });
});

describe("toFriendlyError", () => {
  it("explains duplicate slugs", () => {
    expect(
      toFriendlyError({
        code: "23505",
        message: 'duplicate key value violates unique constraint "news_posts_slug_key"',
      })
    ).toMatch(/URL slug/);
  });

  it("does not leak raw database messages", () => {
    expect(
      toFriendlyError({ code: "XX000", message: "internal: relation secret_table" })
    ).toBe("Something went wrong. Please try again.");
  });

  it("explains permission failures", () => {
    expect(toFriendlyError({ code: "42501", message: "denied" })).toMatch(
      /enter the passcode again/
    );
  });
});
