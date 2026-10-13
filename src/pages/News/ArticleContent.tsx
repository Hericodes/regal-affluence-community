import { useMemo } from "react";

import { sanitizeArticleHtml } from "../../news/sanitize";
import { ArticleProse } from "./News.styles";

/* =========================================================
   ARTICLE CONTENT
   The only place article HTML is rendered. Content is
   sanitised immediately before rendering, regardless of
   where it came from.
========================================================= */

const ArticleContent = ({ html }: { html: string }) => {
  const clean = useMemo(() => sanitizeArticleHtml(html), [html]);

  return <ArticleProse dangerouslySetInnerHTML={{ __html: clean }} />;
};

export default ArticleContent;
