import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import {
  getFeaturedPost,
  listPublishedPosts,
} from "../../api/newsApi";
import useAsyncData from "../../hooks/useAsyncData";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { isSupabaseConfigured } from "../../lib/supabase";
import type { PublicPostSummary } from "../../news/types";
import useCategories from "../../news/useCategories";
import { formatDate } from "../../news/utils";
import CoverImage from "./CoverImage";
import NewsCard from "./NewsCard";
import {
  CategoryTag,
  Container,
  Eyebrow,
  Lead,
  MetaRow,
  PageHeading,
  PrimaryButton,
  SecondaryButton,
  Section,
  Skeleton,
  StatusPanel,
  VisuallyHidden,
} from "./News.styles";

/* =========================================================
   NEWS & UPDATES — PUBLIC LISTING
   Filters live in the URL (?category=…&q=…) so filtered
   views can be bookmarked and shared.
========================================================= */

type LoadState = "loading" | "ready" | "error";

interface MorePages {
  key: string;
  page: number;
  posts: PublicPostSummary[];
  total: number;
  hasMore: boolean;
}

const uniqueById = (items: PublicPostSummary[]) => {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const NewsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || null;
  const search = searchParams.get("q")?.trim() || "";
  const isFiltered = Boolean(category || search);

  const { categories, nameFor } = useCategories();

  const [searchInput, setSearchInput] = useState(search);
  const [syncedSearch, setSyncedSearch] = useState(search);
  const [reloadKey, setReloadKey] = useState(0);
  const [more, setMore] = useState<MorePages | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreErrorKey, setLoadMoreErrorKey] = useState<string | null>(null);

  useDocumentMeta({
    title: "News & Updates",
    description:
      "The latest news, announcements, real estate insights, events, and opportunities from Regal Affluence Group.",
    canonicalPath: `${import.meta.env.BASE_URL}news`,
  });

  /* Keep the search box in step with back / forward. */
  if (search !== syncedSearch) {
    setSyncedSearch(search);
    setSearchInput(search);
  }

  /* First page (and featured post) whenever filters change. */
  const filterKey = JSON.stringify({ category, search, reloadKey });

  const firstPage = useAsyncData(
    isSupabaseConfigured ? filterKey : null,
    async () => {
      const featuredPost = isFiltered ? null : await getFeaturedPost();

      const result = await listPublishedPosts({
        page: 0,
        category,
        search,
        excludeId: featuredPost?.id ?? null,
      });

      return { ...result, featured: featuredPost };
    }
  );

  const state: LoadState = !isSupabaseConfigured
    ? "error"
    : firstPage.loading
      ? "loading"
      : firstPage.error
        ? "error"
        : "ready";

  /* Pages added with "Load more" belong to one set of filters. */
  const extra = more?.key === filterKey ? more : null;
  const featured = state === "ready" ? firstPage.data?.featured ?? null : null;
  const posts = uniqueById([
    ...(firstPage.data?.posts ?? []),
    ...(extra?.posts ?? []),
  ]);
  const total = extra?.total ?? firstPage.data?.total ?? 0;
  const hasMore = extra ? extra.hasMore : firstPage.data?.hasMore ?? false;
  const loadMoreError = loadMoreErrorKey === filterKey;

  const loadMore = async () => {
    const nextPage = (extra?.page ?? 0) + 1;
    const key = filterKey;

    setLoadingMore(true);
    setLoadMoreErrorKey(null);

    try {
      const result = await listPublishedPosts({
        page: nextPage,
        category,
        search,
        excludeId: featured?.id ?? null,
      });

      setMore({
        key,
        page: nextPage,
        posts: [...(extra?.posts ?? []), ...result.posts],
        total: result.total,
        hasMore: result.hasMore,
      });
    } catch {
      setLoadMoreErrorKey(key);
    } finally {
      setLoadingMore(false);
    }
  };

  const updateParams = (next: { category?: string | null; q?: string }) => {
    const params = new URLSearchParams(searchParams);

    if (next.category !== undefined) {
      if (next.category) params.set("category", next.category);
      else params.delete("category");
    }

    if (next.q !== undefined) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }

    setSearchParams(params);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateParams({ q: searchInput.trim() });
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams(new URLSearchParams());
  };

  const shownCount = posts.length + (featured ? 1 : 0);
  const totalCount = total + (featured ? 1 : 0);

  return (
    <Section aria-labelledby="news-heading">
      <Container>
        {/* =============================================
            HEADER
        ============================================= */}

        <header>
          <Eyebrow>Regal Affluence Group</Eyebrow>

          <PageHeading id="news-heading">
            News &amp; <em>Updates.</em>
          </PageHeading>

          <Lead>
            Follow the latest news, announcements, real estate
            insights, opportunities, and community activities from
            Regal Affluence Group.
          </Lead>
        </header>

        {/* =============================================
            FILTERS
        ============================================= */}

        <Toolbar>
          {categories.length > 0 && (
            <Categories aria-label="Filter by category">
              <Chip
                type="button"
                aria-pressed={!category}
                onClick={() => updateParams({ category: null })}
              >
                All
              </Chip>

              {categories.map((item) => (
                <Chip
                  key={item.slug}
                  type="button"
                  aria-pressed={category === item.slug}
                  onClick={() => updateParams({ category: item.slug })}
                >
                  {item.name}
                </Chip>
              ))}
            </Categories>
          )}

          <SearchForm role="search" onSubmit={handleSearch}>
            <VisuallyHidden as="label" htmlFor="news-search">
              Search news
            </VisuallyHidden>

            <SearchInput
              id="news-search"
              type="search"
              placeholder="Search articles"
              value={searchInput}
              maxLength={100}
              onChange={(event) => setSearchInput(event.target.value)}
            />

            <SearchButton type="submit">Search</SearchButton>
          </SearchForm>
        </Toolbar>

        {/* =============================================
            RESULTS SUMMARY (announced to screen readers)
        ============================================= */}

        <ResultsSummary aria-live="polite">
          {state === "ready" && isFiltered && (
            <>
              <span>
                {total === 1 ? "1 article" : `${total} articles`}
                {category && nameFor(category) && ` in ${nameFor(category)}`}
                {search && ` matching “${search}”`}
              </span>

              <ClearButton type="button" onClick={clearFilters}>
                Clear filters
              </ClearButton>
            </>
          )}
        </ResultsSummary>

        {/* =============================================
            CONTENT
        ============================================= */}

        {state === "loading" && <LoadingGrid />}

        {state === "error" && (
          <StatusPanel role="alert">
            <h2>News is unavailable right now</h2>
            <p>
              We couldn't load the latest updates. Please check your
              connection and try again.
            </p>
            {isSupabaseConfigured && (
              <PrimaryButton
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                Try again
              </PrimaryButton>
            )}
          </StatusPanel>
        )}

        {state === "ready" && (
          <>
            {featured && (
              <FeaturedStory
                post={featured}
                categoryName={nameFor(featured.category_slug)}
              />
            )}

            {posts.length > 0 ? (
              <Grid>
                {posts.map((post) => (
                  <NewsCard
                    key={post.id}
                    post={post}
                    categoryName={nameFor(post.category_slug)}
                  />
                ))}
              </Grid>
            ) : (
              !featured && (
                <StatusPanel>
                  {isFiltered ? (
                    <>
                      <h2>No articles found</h2>
                      <p>
                        Nothing matches these filters yet. Try another
                        category or search term.
                      </p>
                      <SecondaryButton type="button" onClick={clearFilters}>
                        Show all news
                      </SecondaryButton>
                    </>
                  ) : (
                    <>
                      <h2>No updates yet</h2>
                      <p>
                        News and announcements from Regal Affluence Group
                        will appear here. Please check back soon.
                      </p>
                      <SecondaryButton as={Link} to="/">
                        Back to home
                      </SecondaryButton>
                    </>
                  )}
                </StatusPanel>
              )
            )}

            {(hasMore || loadMoreError) && (
              <LoadMoreArea>
                <p>
                  Showing {shownCount} of {totalCount}
                </p>

                {loadMoreError && (
                  <ErrorText role="alert">
                    More articles could not be loaded. Please try again.
                  </ErrorText>
                )}

                <SecondaryButton
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  aria-busy={loadingMore}
                >
                  {loadingMore ? "Loading…" : "Load more articles"}
                </SecondaryButton>
              </LoadMoreArea>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

export default NewsList;

/* =========================================================
   FEATURED STORY
========================================================= */

const FeaturedStory = ({
  post,
  categoryName,
}: {
  post: PublicPostSummary;
  categoryName: string;
}) => (
  <Featured aria-labelledby="featured-heading">
    <FeaturedMedia>
      <CoverImage
        src={post.cover_image_url}
        alt={post.cover_image_alt}
        ratio="16 / 10"
        eager
      />
    </FeaturedMedia>

    <FeaturedBody>
      <FeaturedLabel>
        Featured{categoryName && <> · <CategoryTag as="span">{categoryName}</CategoryTag></>}
      </FeaturedLabel>

      <FeaturedTitle id="featured-heading">
        <Link to={`/news/${post.slug}`}>{post.title}</Link>
      </FeaturedTitle>

      {post.excerpt && <FeaturedExcerpt>{post.excerpt}</FeaturedExcerpt>}

      <MetaRow>
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        {post.author_name && (
          <>
            <span aria-hidden="true">·</span>
            <span>{post.author_name}</span>
          </>
        )}
      </MetaRow>

      <div>
        <PrimaryButton as="span" aria-hidden="true">
          Read article →
        </PrimaryButton>
      </div>
    </FeaturedBody>
  </Featured>
);

/* =========================================================
   LOADING
========================================================= */

const LoadingGrid = () => (
  <Grid aria-busy="true" aria-label="Loading articles">
    {Array.from({ length: 6 }, (_, index) => (
      <SkeletonCard key={index}>
        <SkeletonImage />
        <SkeletonBody>
          <Skeleton $height="12px" style={{ width: "35%" }} />
          <Skeleton $height="22px" />
          <Skeleton $height="22px" style={{ width: "70%" }} />
          <Skeleton $height="14px" style={{ width: "90%" }} />
        </SkeletonBody>
      </SkeletonCard>
    ))}
  </Grid>
);

/* =========================================================
   STYLES
========================================================= */

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px 32px;

  margin-top: clamp(44px, 6vw, 64px);
  padding-bottom: 24px;

  border-bottom: 1px solid rgba(77, 48, 108, 0.1);
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 600px) {
    flex-wrap: nowrap;

    width: calc(100% + 32px);
    margin: 0 -16px;
    padding: 2px 16px 6px;

    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Chip = styled.button`
  flex-shrink: 0;

  min-height: 40px;

  padding: 0 16px;

  border: 1px solid rgba(91, 33, 182, 0.18);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple};
  }

  &[aria-pressed="true"] {
    border-color: ${({ theme }) => theme.colors.purple};
    background: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const SearchForm = styled.form`
  display: flex;

  width: min(100%, 360px);

  border: 1px solid rgba(91, 33, 182, 0.18);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.1);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;

  height: 46px;

  padding: 0 4px 0 20px;

  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};

  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SearchButton = styled.button`
  margin: 4px;
  padding: 0 18px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.purpleDeep};
  color: ${({ theme }) => theme.colors.white};

  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.colors.purple};
  }
`;

const ResultsSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;

  min-height: 24px;

  margin: 20px 0 28px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 15px;
`;

const ClearButton = styled.button`
  color: ${({ theme }) => theme.colors.purple};

  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 24px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

const Featured = styled.article`
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);

  margin-bottom: 40px;

  overflow: hidden;

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 0 18px 50px rgba(35, 21, 49, 0.06);

  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedMedia = styled.div`
  min-height: 100%;

  > div {
    height: 100%;
  }

  @media (max-width: 900px) {
    > div {
      height: auto;
    }
  }
`;

const FeaturedBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;

  padding: clamp(28px, 4vw, 52px);
`;

const FeaturedLabel = styled.p`
  color: ${({ theme }) => theme.colors.champagne};

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h2`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.025em;

  a::after {
    content: "";
    position: absolute;
    inset: 0;
  }

  a:focus-visible {
    outline: none;
  }

  a:focus-visible::after {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
    outline-offset: -2px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;

const FeaturedExcerpt = styled.p`
  color: rgba(46, 36, 54, 0.76);

  font-size: 17px;
  line-height: 1.7;
`;

const LoadMoreArea = styled.div`
  display: grid;
  justify-items: center;
  gap: 14px;

  margin-top: 48px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const SkeletonCard = styled.div`
  overflow: hidden;

  border: 1px solid rgba(77, 48, 108, 0.08);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};
`;

const SkeletonImage = styled(Skeleton)`
  height: auto;

  aspect-ratio: 16 / 10;

  border-radius: 0;
`;

const SkeletonBody = styled.div`
  display: grid;
  gap: 12px;

  padding: 24px;
`;
