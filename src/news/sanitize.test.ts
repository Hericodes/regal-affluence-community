// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { sanitizeArticleHtml } from "./sanitize";

describe("sanitizeArticleHtml", () => {
  it("keeps the formatting the editor produces", () => {
    const html =
      "<h2>Heading</h2><p><strong>Bold</strong> and <em>italic</em></p><ul><li>One</li></ul><blockquote><p>Quote</p></blockquote>";

    expect(sanitizeArticleHtml(html)).toBe(html);
  });

  it("removes scripts, event handlers, and inline styles", () => {
    const clean = sanitizeArticleHtml(
      '<p onclick="alert(1)" style="color:red">Hi</p><script>alert(1)</script><iframe src="https://evil.example"></iframe>'
    );

    expect(clean).toBe("<p>Hi</p>");
  });

  it("removes javascript: and data: links", () => {
    expect(sanitizeArticleHtml('<a href="javascript:alert(1)">x</a>')).toBe(
      "<a>x</a>"
    );
    expect(
      sanitizeArticleHtml('<a href="data:text/html;base64,PHNjcmlwdD4=">x</a>')
    ).toBe("<a>x</a>");
  });

  it("opens external links safely in a new tab", () => {
    expect(sanitizeArticleHtml('<a href="https://example.com">x</a>')).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">x</a>'
    );
  });

  it("drops images that are not served over http(s)", () => {
    expect(
      sanitizeArticleHtml('<img src="data:image/png;base64,AAAA" alt="x">')
    ).toBe("");
    expect(
      sanitizeArticleHtml('<img src="https://cdn.example.com/a.jpg" alt="A view" onerror="alert(1)">')
    ).toBe(
      '<img src="https://cdn.example.com/a.jpg" alt="A view" loading="lazy" decoding="async">'
    );
  });
});
