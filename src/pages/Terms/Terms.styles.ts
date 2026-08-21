import styled from "styled-components";

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  width: 100%;

  padding: 150px 0 120px;

  background: ${({ theme }) => theme.colors.ivory};

  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    padding: 120px 0 90px;
  }

  @media (max-width: 480px) {
    padding: 105px 0 72px;
  }
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  width: min(100% - 48px, 1100px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1100px);
  }
`;

/* ========================================
   HEADER
======================================== */

export const Header = styled.header`
  max-width: 850px;

  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
`;

/* ========================================
   EYEBROW
======================================== */

export const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 24px;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background: ${({ theme }) => theme.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

export const Heading = styled.h1`
  max-width: 900px;

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(4rem, 8vw, 7rem);

  font-weight: 500;

  line-height: 0.92;

  letter-spacing: -0.05em;

  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(3.2rem, 15vw, 5.5rem);

    line-height: 0.96;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.9rem, 14vw, 4.2rem);
  }
`;

/* ========================================
   INTRO
======================================== */

export const Intro = styled.p`
  max-width: 760px;

  margin-top: 34px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 18px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 26px;

    font-size: 16px;

    line-height: 1.7;
  }
`;

/* ========================================
   UPDATED
======================================== */

export const Updated = styled.p`
  margin-top: 28px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`;

/* ========================================
   CONTENT
======================================== */

export const Content = styled.div`
  max-width: 850px;
`;

/* ========================================
   ARTICLE
======================================== */

export const Article = styled.article`
  max-width: 800px;
`;

/* ========================================
   TITLE
======================================== */

export const Title = styled.h2`
  margin-bottom: 22px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(1.7rem, 3vw, 2.35rem);

  font-weight: 600;

  line-height: 1.15;

  letter-spacing: -0.025em;
`;

/* ========================================
   PARAGRAPH
======================================== */

export const Paragraph = styled.p`
  max-width: 780px;

  margin-top: 18px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 16px;

  line-height: 1.85;

  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.75;
  }
`;

/* ========================================
   LIST
======================================== */

export const List = styled.ul`
  margin: 22px 0 0;

  padding-left: 22px;
`;

/* ========================================
   LIST ITEM
======================================== */

export const ListItem = styled.li`
  margin-bottom: 12px;

  padding-left: 6px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 16px;

  line-height: 1.7;

  &::marker {
    color: ${({ theme }) => theme.colors.champagne};
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

/* ========================================
   DIVIDER
======================================== */

export const Divider = styled.div`
  width: 100%;

  height: 1px;

  margin: 64px 0;

  background: ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    margin: 48px 0;
  }
`;

/* ========================================
   CONTACT BOX
======================================== */

export const ContactBox = styled.div`
  margin-top: 30px;

  padding: 32px;

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: ${({ theme }) => theme.colors.white};

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

/* ========================================
   CONTACT TITLE
======================================== */

export const ContactTitle = styled.h3`
  margin-bottom: 12px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;
`;