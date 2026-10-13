import { useEffect } from "react";

/* =========================================================
   DOCUMENT META
   ---------------------------------------------------------
   Updates the title, description, canonical URL, and the
   Open Graph / Twitter tags already declared in index.html,
   then restores the originals when the page unmounts so
   the rest of the site keeps its default metadata.
========================================================= */

interface DocumentMeta {
  title: string;
  description?: string;
  canonicalPath?: string;
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string | null;
  noIndex?: boolean;
}

type TagSpec = {
  selector: string;
  create: () => HTMLElement;
  attr: "content" | "href";
};

const metaTag = (key: "name" | "property", value: string): TagSpec => ({
  selector: `meta[${key}="${value}"]`,
  create: () => {
    const element = document.createElement("meta");
    element.setAttribute(key, value);
    return element;
  },
  attr: "content",
});

const TAGS = {
  description: metaTag("name", "description"),
  robots: metaTag("name", "robots"),
  ogType: metaTag("property", "og:type"),
  ogTitle: metaTag("property", "og:title"),
  ogDescription: metaTag("property", "og:description"),
  ogUrl: metaTag("property", "og:url"),
  ogImage: metaTag("property", "og:image"),
  ogImageAlt: metaTag("property", "og:image:alt"),
  articlePublished: metaTag("property", "article:published_time"),
  twitterTitle: metaTag("name", "twitter:title"),
  twitterDescription: metaTag("name", "twitter:description"),
  twitterImage: metaTag("name", "twitter:image"),
  twitterImageAlt: metaTag("name", "twitter:image:alt"),
  canonical: {
    selector: 'link[rel="canonical"]',
    create: () => {
      const element = document.createElement("link");
      element.setAttribute("rel", "canonical");
      return element;
    },
    attr: "href",
  } satisfies TagSpec,
};

export const SITE_NAME = "Regal Affluence";

export const absoluteUrl = (path: string): string =>
  new URL(path, window.location.origin).toString();

const useDocumentMeta = ({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  noIndex = false,
}: DocumentMeta) => {
  useEffect(() => {
    const previousTitle = document.title;
    const restorers: Array<() => void> = [];

    const set = (spec: TagSpec, value: string | undefined) => {
      if (value === undefined) return;

      let element = document.head.querySelector<HTMLElement>(spec.selector);
      const existed = Boolean(element);
      const previous = element?.getAttribute(spec.attr) ?? null;

      if (!element) {
        element = spec.create();
        document.head.appendChild(element);
      }

      element.setAttribute(spec.attr, value);

      restorers.push(() => {
        if (!existed) {
          element?.remove();
        } else if (previous !== null) {
          element?.setAttribute(spec.attr, previous);
        }
      });
    };

    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = canonicalPath ? absoluteUrl(canonicalPath) : undefined;
    const imageUrl = image ? absoluteUrl(image) : undefined;

    document.title = fullTitle;

    set(TAGS.description, description);
    set(TAGS.robots, noIndex ? "noindex, nofollow" : undefined);
    set(TAGS.canonical, url);
    set(TAGS.ogType, type);
    set(TAGS.ogTitle, fullTitle);
    set(TAGS.ogDescription, description);
    set(TAGS.ogUrl, url);
    set(TAGS.ogImage, imageUrl);
    set(TAGS.ogImageAlt, imageUrl ? imageAlt || title : undefined);
    set(TAGS.twitterTitle, fullTitle);
    set(TAGS.twitterDescription, description);
    set(TAGS.twitterImage, imageUrl);
    set(TAGS.twitterImageAlt, imageUrl ? imageAlt || title : undefined);
    set(
      TAGS.articlePublished,
      type === "article" && publishedTime ? publishedTime : undefined
    );

    return () => {
      document.title = previousTitle;
      restorers.reverse().forEach((restore) => restore());
    };
  }, [
    title,
    description,
    canonicalPath,
    image,
    imageAlt,
    type,
    publishedTime,
    noIndex,
  ]);
};

export default useDocumentMeta;
