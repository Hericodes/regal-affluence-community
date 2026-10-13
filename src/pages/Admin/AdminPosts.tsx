import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import {
  listAdminPosts,
  setPostFeatured,
  type AdminStatusFilter,
} from "../../api/newsAdminApi";
import useAsyncData from "../../hooks/useAsyncData";
import type { AdminPostSummary } from "../../news/types";
import useCategories from "../../news/useCategories";
import {
  formatDateTime,
  getDisplayStatus,
  toFriendlyError,
} from "../../news/utils";
import {
  Alert,
  Button,
  Input,
  Page,
  PageHeader,
  PageIntro,
  PageTitle,
  Panel,
  Select,
} from "./Admin.styles";
import { useNewsroom } from "./newsroomContext";
import StatusBadge from "./StatusBadge";

/* =========================================================
   NEWSROOM — ALL POSTS
   Filters are kept in the URL so the view survives a
   refresh and the Back button.
========================================================= */

const PAGE_SIZE = 15;

const STATUS_TABS: Array<{ value: AdminStatusFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "published", label: "Published" },
  { value: "scheduled", label: "Scheduled" },
  { value: "archived", label: "Archived" },
];

const isStatusFilter = (value: string | null): value is AdminStatusFilter =>
  STATUS_TABS.some((tab) => tab.value === value);

const NEWS_BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/news`;

const AdminPosts = () => {
  const { notify } = useNewsroom();
  const { categories, nameFor } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status");
  const status: AdminStatusFilter = isStatusFilter(statusParam) ? statusParam : "all";
  const category = searchParams.get("category") || null;
  const search = searchParams.get("q") ?? "";
  const page = Math.max(0, Number(searchParams.get("page") ?? 0) || 0);

  const [searchInput, setSearchInput] = useState(search);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const updateParams = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    /* Any filter change returns to the first page. */
    if (!("page" in changes)) params.delete("page");

    setSearchParams(params, { replace: true });
  };

  /* Debounced search as you type. */
  useEffect(() => {
    if (searchInput.trim() === search) return;

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchInput.trim()) params.set("q", searchInput.trim());
      else params.delete("q");
      params.delete("page");
      setSearchParams(params, { replace: true });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [searchInput, search, searchParams, setSearchParams]);

  const { data, error, loading } = useAsyncData(
    JSON.stringify({ page, status, category, search, reloadKey }),
    () => listAdminPosts({ page, pageSize: PAGE_SIZE, status, category, search })
  );

  const posts: AdminPostSummary[] = data?.posts ?? [];
  const total = data?.total ?? 0;
  const failed = Boolean(error);

  const toggleFeatured = async (post: AdminPostSummary) => {
    setTogglingId(post.id);

    try {
      const updated = await setPostFeatured(post.id, !post.is_featured);

      setReloadKey((key) => key + 1);

      notify(
        updated.is_featured
          ? `“${updated.title}” is now featured.`
          : `“${updated.title}” is no longer featured.`
      );
    } catch (error) {
      notify(toFriendlyError(error, "The featured setting could not be changed."), "error");
    } finally {
      setTogglingId(null);
    }
  };

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>All posts</PageTitle>
          <PageIntro>
            Search, filter, and manage every article.
          </PageIntro>
        </div>

        <Button as={Link} to="/admin/posts/new" $variant="primary">
          Create new post
        </Button>
      </PageHeader>

      <Filters>
        <Tabs role="group" aria-label="Filter by status">
          {STATUS_TABS.map((tab) => (
            <Tab
              key={tab.value}
              type="button"
              aria-pressed={status === tab.value}
              onClick={() => updateParams({ status: tab.value === "all" ? null : tab.value })}
            >
              {tab.label}
            </Tab>
          ))}
        </Tabs>

        <FilterControls>
          <Select
            aria-label="Filter by category"
            value={category ?? ""}
            onChange={(event) => updateParams({ category: event.target.value || null })}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </Select>

          <Input
            type="search"
            aria-label="Search post titles"
            placeholder="Search titles"
            value={searchInput}
            maxLength={100}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </FilterControls>
      </Filters>

      {failed && (
        <Alert role="alert">
          Posts couldn't be loaded.{" "}
          <InlineButton type="button" onClick={() => setReloadKey((key) => key + 1)}>
            Try again
          </InlineButton>
        </Alert>
      )}

      <Panel aria-busy={loading}>
        <Table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Featured</th>
              <th scope="col">Publish date</th>
              <th scope="col">Last updated</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => {
              const displayStatus = getDisplayStatus(post.status, post.published_at);

              return (
                <tr key={post.id}>
                  <td data-label="Title">
                    <TitleLink to={`/admin/posts/${post.id}`}>{post.title}</TitleLink>
                    <Slug>/news/{post.slug}</Slug>
                  </td>
                  <td data-label="Category">
                    {nameFor(post.category_slug) || <Muted>None</Muted>}
                  </td>
                  <td data-label="Status">
                    <StatusBadge status={displayStatus} />
                  </td>
                  <td data-label="Featured">
                    <FeatureToggle
                      type="button"
                      aria-pressed={post.is_featured}
                      aria-label={
                        post.is_featured
                          ? `Remove “${post.title}” from featured`
                          : `Feature “${post.title}”`
                      }
                      disabled={togglingId === post.id}
                      onClick={() => toggleFeatured(post)}
                    >
                      <span aria-hidden="true">{post.is_featured ? "★" : "☆"}</span>
                      {post.is_featured ? "Featured" : "Feature"}
                    </FeatureToggle>
                  </td>
                  <td data-label="Publish date">
                    {post.published_at ? formatDateTime(post.published_at) : <Muted>—</Muted>}
                  </td>
                  <td data-label="Last updated">{formatDateTime(post.updated_at)}</td>
                  <td data-label="Actions">
                    <RowActions>
                      <Button as={Link} to={`/admin/posts/${post.id}`} $size="sm">
                        Edit
                      </Button>
                      {displayStatus === "published" && (
                        <Button
                          as="a"
                          href={`${NEWS_BASE}/${post.slug}`}
                          target="_blank"
                          rel="noopener"
                          $size="sm"
                          $variant="ghost"
                        >
                          View ↗
                        </Button>
                      )}
                    </RowActions>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {!loading && !failed && posts.length === 0 && (
          <Empty>
            {search || category || status !== "all"
              ? "No posts match these filters."
              : "No posts yet. Create your first article to get started."}
          </Empty>
        )}

        {loading && posts.length === 0 && <Empty>Loading posts…</Empty>}
      </Panel>

      {total > PAGE_SIZE && (
        <Pagination aria-label="Pagination">
          <Button
            type="button"
            $size="sm"
            disabled={page === 0}
            onClick={() => updateParams({ page: page - 1 > 0 ? String(page - 1) : null })}
          >
            ← Previous
          </Button>
          <span>
            Page {page + 1} of {pageCount} · {total} posts
          </span>
          <Button
            type="button"
            $size="sm"
            disabled={page + 1 >= pageCount}
            onClick={() => updateParams({ page: String(page + 1) })}
          >
            Next →
          </Button>
        </Pagination>
      )}
    </Page>
  );
};

export default AdminPosts;

/* =========================================================
   STYLES
========================================================= */

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  padding: 4px;

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};
`;

const Tab = styled.button`
  min-height: 36px;

  padding: 0 14px;

  border-radius: ${({ theme }) => theme.radius.pill};

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.purpleDeep};
  }

  &[aria-pressed="true"] {
    background: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FilterControls = styled.div`
  display: grid;
  grid-template-columns: 200px 260px;
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  font-size: 14px;

  th {
    padding: 14px 16px;

    border-bottom: 1px solid rgba(77, 48, 108, 0.1);

    color: ${({ theme }) => theme.colors.textMuted};

    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 14px 16px;

    border-bottom: 1px solid rgba(77, 48, 108, 0.07);

    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: rgba(250, 248, 243, 0.7);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  /* Stacked cards on narrow screens. */
  @media (max-width: 860px) {
    thead {
      display: none;
    }

    tr {
      display: grid;
      gap: 10px;

      padding: 18px;

      border-bottom: 1px solid rgba(77, 48, 108, 0.08);
    }

    td {
      display: grid;
      grid-template-columns: 110px 1fr;
      align-items: center;
      gap: 12px;

      padding: 0;

      border: 0;

      &::before {
        content: attr(data-label);

        color: ${({ theme }) => theme.colors.textMuted};

        font-size: 12px;
        font-weight: 600;
      }
    }

    td[data-label="Title"],
    td[data-label="Actions"] {
      grid-template-columns: 1fr;

      &::before {
        display: none;
      }
    }
  }
`;

const TitleLink = styled(Link)`
  display: block;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;

  &:hover {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Slug = styled.span`
  display: block;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 12.5px;
  word-break: break-all;
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const FeatureToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 4px 8px;

  border-radius: ${({ theme }) => theme.radius.sm};

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  span {
    font-size: 16px;
  }

  &[aria-pressed="true"] {
    color: #8a6a2c;
  }

  &:hover:not(:disabled) {
    background: rgba(201, 169, 110, 0.14);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6px;

  @media (max-width: 860px) {
    justify-content: flex-start;
  }
`;

const Empty = styled.p`
  padding: 36px 22px;

  color: ${({ theme }) => theme.colors.textMuted};

  text-align: center;
`;

const Pagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
`;

const InlineButton = styled.button`
  color: inherit;

  font-weight: 700;
  text-decoration: underline;
`;
