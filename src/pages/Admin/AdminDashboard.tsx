import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  getDashboardStats,
  listAdminPosts,
  type AdminStatusFilter,
  type DashboardStats,
} from "../../api/newsAdminApi";
import useAsyncData from "../../hooks/useAsyncData";
import type { AdminPostSummary } from "../../news/types";
import useCategories from "../../news/useCategories";
import {
  formatDateTime,
  getDisplayStatus,
} from "../../news/utils";
import {
  Alert,
  Button,
  Page,
  PageHeader,
  PageIntro,
  PageTitle,
  Panel,
  PanelHeader,
} from "./Admin.styles";
import StatusBadge from "./StatusBadge";

/* =========================================================
   NEWSROOM — OVERVIEW
========================================================= */

const STAT_CARDS: Array<{
  key: keyof DashboardStats;
  label: string;
  filter: AdminStatusFilter;
}> = [
  { key: "total", label: "Total posts", filter: "all" },
  { key: "published", label: "Published", filter: "published" },
  { key: "scheduled", label: "Scheduled", filter: "scheduled" },
  { key: "drafts", label: "Drafts", filter: "draft" },
  { key: "archived", label: "Archived", filter: "archived" },
];

const AdminDashboard = () => {
  const { nameFor } = useCategories();

  const [reloadKey, setReloadKey] = useState(0);

  const { data, error } = useAsyncData(String(reloadKey), async () => {
    const [stats, recent] = await Promise.all([
      getDashboardStats(),
      listAdminPosts({
        page: 0,
        pageSize: 6,
        status: "all",
        category: null,
        search: "",
      }),
    ]);

    return { stats, recent: recent.posts };
  });

  const stats: DashboardStats | null = data?.stats ?? null;
  const recent: AdminPostSummary[] = data?.recent ?? [];
  const failed = Boolean(error);

  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Overview</PageTitle>
          <PageIntro>
            Everything published here appears on the public News
            &amp; Updates page.
          </PageIntro>
        </div>

        <Button as={Link} to="/admin/posts/new" $variant="primary">
          Create new post
        </Button>
      </PageHeader>

      {failed && (
        <Alert role="alert">
          The dashboard couldn't be loaded.{" "}
          <InlineButton type="button" onClick={() => setReloadKey((key) => key + 1)}>
            Try again
          </InlineButton>
        </Alert>
      )}

      <Stats aria-label="Post counts">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.key}
            to={card.filter === "all" ? "/admin/posts" : `/admin/posts?status=${card.filter}`}
          >
            <StatValue aria-busy={!stats}>
              {stats ? stats[card.key] : "–"}
            </StatValue>
            <StatLabel>{card.label}</StatLabel>
          </StatCard>
        ))}
      </Stats>

      <Panel aria-labelledby="recent-heading">
        <PanelHeader>
          <h2 id="recent-heading">Recently updated</h2>
          <Button as={Link} to="/admin/posts" $size="sm" $variant="ghost">
            View all posts →
          </Button>
        </PanelHeader>

        {stats && recent.length === 0 && (
          <Empty>
            <p>No posts yet. Your first article is one click away.</p>
            <Button as={Link} to="/admin/posts/new" $variant="primary" $size="sm">
              Write your first post
            </Button>
          </Empty>
        )}

        {recent.length > 0 && (
          <RecentList>
            {recent.map((post) => (
              <li key={post.id}>
                <RecentLink to={`/admin/posts/${post.id}`}>
                  <RecentTitle>{post.title}</RecentTitle>
                  <RecentMeta>
                    {nameFor(post.category_slug) || "Uncategorised"} · Updated{" "}
                    {formatDateTime(post.updated_at)}
                  </RecentMeta>
                </RecentLink>
                <StatusBadge
                  status={getDisplayStatus(post.status, post.published_at)}
                />
              </li>
            ))}
          </RecentList>
        )}
      </Panel>
    </Page>
  );
};

export default AdminDashboard;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled(Link)`
  display: grid;
  gap: 4px;

  padding: 20px 22px;

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};

  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: rgba(91, 33, 182, 0.3);
  }
`;

const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.25rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
`;

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
  font-weight: 500;
`;

const RecentList = styled.ul`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    padding: 14px 22px;
  }

  li + li {
    border-top: 1px solid rgba(77, 48, 108, 0.07);
  }
`;

const RecentLink = styled(Link)`
  display: grid;
  gap: 2px;

  min-width: 0;

  &:hover span:first-child {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const RecentTitle = styled.span`
  overflow: hidden;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RecentMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 13px;
`;

const Empty = styled.div`
  display: grid;
  justify-items: start;
  gap: 14px;

  padding: 28px 22px;

  color: ${({ theme }) => theme.colors.textMuted};
`;

const InlineButton = styled.button`
  color: inherit;

  font-weight: 700;
  text-decoration: underline;
`;
