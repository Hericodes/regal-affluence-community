import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  getPublishedPostBySlug,
  listRelatedPosts,
} from "../../api/newsApi";
import useAsyncData from "../../hooks/useAsyncData";
import useDocumentMeta, {
  absoluteUrl,
  SITE_NAME,
} from "../../hooks/useDocumentMeta";
import { isSupabaseConfigured } from "../../lib/supabase";
import type {
  PublicPost,
  PublicPostSummary,
} from "../../news/types";
import useCategories from "../../news/useCategories";
import {
  formatDate,
  readingMinutes,
  SLUG_PATTERN,
} from "../../news/utils";
import ArticleContent from "./ArticleContent";
import CoverImage from "./CoverImage";
import NewsCard from "./NewsCard";
import {
  CategoryTag,
  Container,
  MetaRow,
  PrimaryButton,
  SecondaryButton,
  Section,
  Skeleton,
  StatusPanel,
} from "./News.styles";
import ShareBar from "./ShareBar";

/* =========================================================
   NEWS ARTICLE — PUBLIC
   Only published posts whose publication time has passed
   can be loaded; anything else shows "not found".
========================================================= */

type LoadState = "loading" | "ready" | "not-found" | "error";

const NEWS_PATH = `${import.meta.env.BASE_URL}news`;

const NewsArticle = () => {
  const { slug = "" } = useParams();
  const { nameFor } = useCategories();

  const [reloadKey, setReloadKey] = useState(0);
  const validSlug = SLUG_PATTERN.test(slug);

  const article = useAsyncData(
    isSupabaseConfigured && validSlug ? `${slug}:${reloadKey}` : null,
    () => getPublishedPostBySlug(slug)
  );

  const state: LoadState = !isSupabaseConfigured
    ? "error"
    : !validSlug
      ? "not-found"
      : article.loading
        ? "loading"
        : article.error
          ? "error"
          : article.data
            ? "ready"
            : "not-found";

  const post: PublicPost | null = state === "ready" ? article.data ?? null : null;
  const postId = post?.id ?? null;

  /* Related articles are optional; failures are silent. */
  const relatedQuery = useAsyncData(postId, () =>
    post ? listRelatedPosts(post) : Promise.resolve([])
  );
  const related: PublicPostSummary[] =
    relatedQuery.loading || relatedQuery.error ? [] : relatedQuery.data ?? [];

  useEffect(() => {
    if (postId) window.scrollTo({ top: 0 });
  }, [postId]);

  const ready = state === "ready" && post;

  useDocumentMeta(
    ready
      ? {
          title: post.seo_title || post.title,
          description: post.seo_description || post.excerpt || undefined,
          canonicalPath: `${NEWS_PATH}/${post.slug}`,
          image: post.cover_image_url,
          imageAlt: post.cover_image_alt,
          type: "article",
          publishedTime: post.published_at,
        }
      : {
          title: state === "not-found" ? "Article not found" : "News & Updates",
          noIndex: state === "not-found",
        }
  );

  const categoryName = post ? nameFor(post.category_slug) : "";

  return (
    <Section>
      <Container>
        <BackLink to="/news">
          <span aria-hidden="true">←</span> All news &amp; updates
        </BackLink>

        {state === "loading" && <ArticleSkeleton />}

        {state === "not-found" && (
          <StatusPanel>
            <h1>Article not found</h1>
            <p>
              This article may have been moved or is no longer
              available.
            </p>
            <PrimaryButton as={Link} to="/news">
              Browse all news
            </PrimaryButton>
          </StatusPanel>
        )}

        {state === "error" && (
          <StatusPanel role="alert">
            <h1>This article couldn't be loaded</h1>
            <p>Please check your connection and try again.</p>
            {isSupabaseConfigured && (
              <SecondaryButton
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                Try again
              </SecondaryButton>
            )}
          </StatusPanel>
        )}

        {ready && (
          <Article>
            <ArticleHeader>
              {categoryName && (
                <CategoryLink
                  to={`/news?category=${encodeURIComponent(post.category_slug ?? "")}`}
                >
                  <CategoryTag>{categoryName}</CategoryTag>
                </CategoryLink>
              )}

              <Title>{post.title}</Title>

              {post.excerpt && <Standfirst>{post.excerpt}</Standfirst>}

              <MetaRow>
                <time dateTime={post.published_at}>
                  {formatDate(post.published_at)}
                </time>

                {post.author_name && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>By {post.author_name}</span>
                  </>
                )}

                <span aria-hidden="true">·</span>
                <span>{readingMinutes(post.content)} min read</span>
              </MetaRow>
            </ArticleHeader>

            {post.cover_image_url && (
              <Hero>
                <CoverImage
                  src={post.cover_image_url}
                  alt={post.cover_image_alt}
                  ratio="16 / 9"
                  eager
                />
              </Hero>
            )}

            <BodyColumn>
              <ArticleContent html={post.content} />

              <ShareBar
                title={post.title}
                url={absoluteUrl(`${NEWS_PATH}/${post.slug}`)}
              />
            </BodyColumn>

            <StructuredData post={post} />
          </Article>
        )}

        {ready && related.length > 0 && (
          <Related aria-labelledby="related-heading">
            <RelatedHeading id="related-heading">
              More from Regal Affluence
            </RelatedHeading>

            <RelatedGrid>
              {related.map((item) => (
                <NewsCard
                  key={item.id}
                  post={item}
                  categoryName={nameFor(item.category_slug)}
                  headingLevel="h3"
                />
              ))}
            </RelatedGrid>
          </Related>
        )}
      </Container>
    </Section>
  );
};

export default NewsArticle;

/* =========================================================
   STRUCTURED DATA (schema.org NewsArticle)
========================================================= */

const StructuredData = ({ post }: { post: PublicPost }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.seo_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    author: post.author_name
      ? { "@type": "Person", name: post.author_name }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(
          `${import.meta.env.BASE_URL}images/regal-affluence-logo.png`
        ),
      },
    },
    mainEntityOfPage: absoluteUrl(`${NEWS_PATH}/${post.slug}`),
  };

  /* "<" is escaped so content can never close the script tag. */
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

/* =========================================================
   LOADING
========================================================= */

const ArticleSkeleton = () => (
  <SkeletonWrap aria-busy="true" aria-label="Loading article">
    <Skeleton $height="12px" style={{ width: 120 }} />
    <Skeleton $height="48px" />
    <Skeleton $height="48px" style={{ width: "65%" }} />
    <Skeleton $height="16px" style={{ width: 220 }} />
    <Skeleton $height="360px" style={{ marginTop: 20 }} />
  </SkeletonWrap>
);

/* =========================================================
   STYLES
========================================================= */

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  margin-bottom: clamp(32px, 5vw, 48px);

  color: ${({ theme }) => theme.colors.purple};

  font-size: 15px;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.purpleDark};
  }
`;

const Article = styled.article`
  display: grid;
  gap: clamp(32px, 5vw, 52px);
`;

const ArticleHeader = styled.header`
  display: grid;
  justify-items: start;
  gap: 20px;

  max-width: 720px;
  margin: 0 auto;
  width: 100%;
`;

const CategoryLink = styled(Link)`
  &:hover span {
    color: ${({ theme }) => theme.colors.purpleDark};
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(2.2rem, 5vw, 3.75rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.035em;
`;

const Standfirst = styled.p`
  color: rgba(46, 36, 54, 0.78);

  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.65;
`;

const Hero = styled.figure`
  margin: 0;

  overflow: hidden;

  border-radius: ${({ theme }) => theme.radius.md};

  box-shadow: 0 22px 60px rgba(35, 21, 49, 0.1);
`;

const BodyColumn = styled.div`
  display: grid;
  gap: 48px;

  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const Related = styled.section`
  margin-top: clamp(72px, 9vw, 110px);
  padding-top: clamp(40px, 5vw, 56px);

  border-top: 1px solid rgba(77, 48, 108, 0.12);
`;

const RelatedHeading = styled.h2`
  margin-bottom: 28px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 500;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonWrap = styled.div`
  display: grid;
  gap: 16px;

  max-width: 860px;
  margin: 0 auto;
`;
