import { Link } from "react-router-dom";
import styled from "styled-components";

import type { PublicPostSummary } from "../../news/types";
import { formatDate } from "../../news/utils";
import CoverImage from "./CoverImage";
import { CategoryTag, MetaRow } from "./News.styles";

/* =========================================================
   NEWS CARD
   The whole card is clickable through the headline link,
   so keyboard and screen-reader users get one clear target.
========================================================= */

interface NewsCardProps {
  post: PublicPostSummary;
  categoryName: string;
  headingLevel?: "h2" | "h3";
}

const NewsCard = ({
  post,
  categoryName,
  headingLevel = "h2",
}: NewsCardProps) => (
  <Card>
    <Media>
      <CoverImage
        src={post.cover_image_url}
        alt={post.cover_image_alt}
      />
    </Media>

    <Body>
      {categoryName && <CategoryTag>{categoryName}</CategoryTag>}

      <Title as={headingLevel}>
        <CardLink to={`/news/${post.slug}`}>{post.title}</CardLink>
      </Title>

      {post.excerpt && <Excerpt>{post.excerpt}</Excerpt>}

      <Footer>
        <MetaRow>
          <time dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>

          {post.author_name && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.author_name}</span>
            </>
          )}
        </MetaRow>

        <ReadMore aria-hidden="true">Read more →</ReadMore>
      </Footer>
    </Body>
  </Card>
);

export default NewsCard;

const Card = styled.article`
  position: relative;

  display: flex;
  flex-direction: column;

  min-width: 0;
  height: 100%;

  overflow: hidden;

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};

  box-shadow: 0 12px 38px rgba(35, 21, 49, 0.045);

  transition:
    border-color 0.3s ease,
    box-shadow 0.4s ease;

  &:hover,
  &:focus-within {
    border-color: rgba(91, 33, 182, 0.22);
    box-shadow: 0 22px 54px rgba(35, 21, 49, 0.09);
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const Media = styled.div`
  flex-shrink: 0;

  border-bottom: 1px solid rgba(77, 48, 108, 0.07);
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;

  padding: 24px 24px 26px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(1.3rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
`;

/* Stretches the link over the whole card. */
const CardLink = styled(Link)`
  &::after {
    content: "";

    position: absolute;
    inset: 0;

    border-radius: inherit;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    outline: 2px solid ${({ theme }) => theme.colors.purple};
    outline-offset: -2px;
  }
`;

const Excerpt = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  overflow: hidden;

  color: rgba(46, 36, 54, 0.74);

  font-size: 15.5px;
  line-height: 1.65;
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  margin-top: auto;
  padding-top: 14px;

  border-top: 1px solid rgba(77, 48, 108, 0.07);
`;

const ReadMore = styled.span`
  color: ${({ theme }) => theme.colors.purple};

  font-size: 14px;
  font-weight: 600;
`;
