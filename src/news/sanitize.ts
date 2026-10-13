import DOMPurify from "dompurify";

/* =========================================================
   ARTICLE HTML SANITISER
   ---------------------------------------------------------
   Used when saving from the editor AND when rendering on
   the public site, so stored content is never trusted.
   Only the formatting the editor can produce is allowed.
========================================================= */

const ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "h4",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
  "img",
  "code",
  "pre",
];

const ALLOWED_ATTR = [
  "href",
  "src",
  "alt",
  "title",
  "target",
  "rel",
];

const SAFE_LINK = /^(https?:|mailto:|tel:|\/|#)/i;
const SAFE_IMAGE = /^https?:/i;

let hooksInstalled = false;

const installHooks = () => {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      const href = node.getAttribute("href") ?? "";

      if (!SAFE_LINK.test(href.trim())) {
        node.removeAttribute("href");
      }

      /* External links open safely in a new tab. */
      if (/^https?:/i.test(href.trim())) {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer nofollow");
      } else {
        node.removeAttribute("target");
        node.removeAttribute("rel");
      }
    }

    if (node.tagName === "IMG") {
      const src = node.getAttribute("src") ?? "";

      if (!SAFE_IMAGE.test(src.trim())) {
        node.remove();
        return;
      }

      node.setAttribute("loading", "lazy");
      node.setAttribute("decoding", "async");
    }
  });
};

export const sanitizeArticleHtml = (html: string): string => {
  installHooks();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [...ALLOWED_ATTR, "loading", "decoding"],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
  });
};
