import styled, { css, keyframes } from "styled-components";

/* =========================================================
   NEWS — SHARED STYLES
   Follows the editorial language of the Team and About
   pages: ivory canvas, champagne rule, Playfair headings.
========================================================= */

export const Section = styled.section`
  position: relative;

  min-height: 70vh;

  padding:
    clamp(120px, 11vw, 160px)
    0
    clamp(90px, 9vw, 130px);

  background:
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.ivory} 0%,
      #f7f3ec 100%
    );

  @media (max-width: 600px) {
    padding: 104px 0 80px;
  }
`;

export const Container = styled.div`
  width: min(calc(100% - 64px), 1280px);

  margin: 0 auto;

  @media (max-width: 900px) {
    width: min(calc(100% - 44px), 1280px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 32px);
  }
`;

export const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 11px;

  margin-bottom: 20px;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2em;
  line-height: 1;
  text-transform: uppercase;

  &::before {
    content: "";

    width: 31px;
    height: 1px;

    flex-shrink: 0;

    background: ${({ theme }) => theme.colors.champagne};
  }
`;

export const PageHeading = styled.h1`
  max-width: 860px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;

  em {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 400;
  }
`;

export const Lead = styled.p`
  max-width: 640px;

  margin-top: 22px;

  color: rgba(46, 36, 54, 0.74);

  font-size: 17px;
  line-height: 1.75;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

/* =========================================================
   CATEGORY + META
========================================================= */

export const CategoryTag = styled.span`
  display: inline-block;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const MetaRow = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;

  span[aria-hidden="true"] {
    color: ${({ theme }) => theme.colors.champagne};
  }
`;

/* =========================================================
   BUTTONS
========================================================= */

export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  min-height: 48px;

  padding: 0 24px;

  border-radius: ${({ theme }) => theme.radius.pill};

  font-size: 15px;
  font-weight: 600;

  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase}

  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.purpleDark};
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}

  border: 1px solid rgba(91, 33, 182, 0.24);

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.purpleDeep};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

/* =========================================================
   STATUS PANELS (loading / empty / error)
========================================================= */

export const StatusPanel = styled.div`
  display: grid;
  justify-items: center;
  gap: 14px;

  padding: clamp(48px, 8vw, 80px) 24px;

  border: 1px dashed rgba(91, 33, 182, 0.2);
  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(255, 255, 255, 0.6);

  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.purpleDeep};
    font-size: clamp(1.4rem, 3vw, 1.75rem);
    font-weight: 500;
  }

  p {
    max-width: 460px;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 16px;
  }
`;

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

export const Skeleton = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height ?? "16px"};

  border-radius: 6px;

  background: linear-gradient(
    90deg,
    rgba(91, 33, 182, 0.05) 0%,
    rgba(91, 33, 182, 0.1) 50%,
    rgba(91, 33, 182, 0.05) 100%
  );
  background-size: 200% 100%;

  animation: ${shimmer} 1.4s linear infinite;
`;

export const VisuallyHidden = styled.span`
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;

  border: 0;
`;

/* =========================================================
   ARTICLE BODY (prose)
   Also used by the dashboard preview so editors see
   exactly what visitors will see.
========================================================= */

export const ArticleProse = styled.div`
  color: ${({ theme }) => theme.colors.text};

  font-size: 18px;
  line-height: 1.8;

  overflow-wrap: break-word;

  > * + * {
    margin-top: 1.25em;
  }

  h2,
  h3,
  h4 {
    margin-top: 1.9em;

    color: ${({ theme }) => theme.colors.purpleDeep};

    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.015em;
  }

  h2 {
    font-size: clamp(1.6rem, 3vw, 2rem);
  }

  h3 {
    font-size: clamp(1.3rem, 2.4vw, 1.5rem);
  }

  h4 {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.1rem;
  }

  h2 + *,
  h3 + *,
  h4 + * {
    margin-top: 0.6em;
  }

  a {
    color: ${({ theme }) => theme.colors.purple};

    text-decoration: underline;
    text-decoration-color: rgba(91, 33, 182, 0.35);
    text-underline-offset: 3px;

    &:hover {
      text-decoration-color: currentColor;
    }
  }

  strong,
  b {
    font-weight: 700;
  }

  ul,
  ol {
    padding-left: 1.4em;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li + li {
    margin-top: 0.4em;
  }

  li::marker {
    color: ${({ theme }) => theme.colors.champagne};
  }

  blockquote {
    padding: 4px 0 4px 24px;

    border-left: 2px solid ${({ theme }) => theme.colors.champagne};

    color: ${({ theme }) => theme.colors.purpleDeep};

    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.3em;
    font-style: italic;
    line-height: 1.5;
  }

  img {
    width: 100%;

    border-radius: ${({ theme }) => theme.radius.md};
  }

  hr {
    width: 80px;
    margin: 2.4em auto;

    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.champagne};
  }

  code {
    padding: 0.1em 0.35em;

    border-radius: 4px;

    background: rgba(91, 33, 182, 0.06);

    font-size: 0.9em;
  }

  pre {
    padding: 18px;

    overflow-x: auto;

    border-radius: ${({ theme }) => theme.radius.sm};

    background: ${({ theme }) => theme.colors.purpleDeep};
    color: ${({ theme }) => theme.colors.ivory};

    code {
      padding: 0;
      background: none;
    }
  }

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;
