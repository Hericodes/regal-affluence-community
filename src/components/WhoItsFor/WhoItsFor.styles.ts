import styled from "styled-components";

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background: ${({ theme }) => theme.colors.cream};

  color: ${({ theme }) => theme.colors.text};

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 90px 0;
  }

  @media (max-width: 480px) {
    padding: 72px 0;
  }
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  width: min(100% - 48px, 1320px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1320px);
  }
`;

/* ========================================
   HEADER
======================================== */

export const Header = styled.div`
  max-width: 980px;

  margin-bottom: 76px;

  @media (max-width: 768px) {
    margin-bottom: 56px;
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

export const Heading = styled.h2`
  max-width: 900px;

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(3rem, 6vw, 5.8rem);

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: clamp(2.7rem, 11vw, 4.5rem);

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.5rem, 12vw, 3.6rem);
  }
`;

/* ========================================
   HIGHLIGHT
======================================== */

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.purple};

  font-style: italic;
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 720px;

  margin-top: 30px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 17px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 22px;

    font-size: 15px;

    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 14.5px;
  }
`;

/* ========================================
   PROFILE GRID
======================================== */

export const ProfileGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 1px;

  background: ${({ theme }) => theme.colors.border};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* ========================================
   PROFILE CARD
======================================== */

export const ProfileCard = styled.article`
  position: relative;

  min-height: 290px;

  padding: 38px;

  background: ${({ theme }) => theme.colors.ivory};

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: 900px) {
    min-height: 270px;

    padding: 34px;
  }

  @media (max-width: 600px) {
    min-height: auto;

    padding: 32px 28px;
  }
`;

/* ========================================
   NUMBER
======================================== */

export const Number = styled.span`
  display: block;

  margin-bottom: 34px;

  color: ${({ theme }) => theme.colors.champagne};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 17px;

  font-weight: 600;

  letter-spacing: 0.04em;
`;

/* ========================================
   ICON
======================================== */

export const Icon = styled.span`
  position: absolute;

  top: 34px;
  right: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  color: ${({ theme }) => theme.colors.purple};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 20px;

  opacity: 0.75;

  @media (max-width: 600px) {
    top: 30px;
    right: 28px;
  }
`;

/* ========================================
   TITLE
======================================== */

export const Title = styled.h3`
  margin-bottom: 14px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(1.7rem, 2.5vw, 2.2rem);

  font-weight: 600;

  line-height: 1.1;

  letter-spacing: -0.025em;
`;

/* ========================================
   CARD DESCRIPTION
======================================== */

export const CardDescription = styled.p`
  max-width: 420px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;

  line-height: 1.75;
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

export const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 22px;

  margin-top: 68px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(1.4rem, 2.8vw, 2.2rem);

  font-weight: 500;

  letter-spacing: -0.02em;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color: ${({ theme }) => theme.colors.champagne};

      font-family: ${({ theme }) => theme.fonts.body};

      font-size: 0.6em;

      vertical-align: middle;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    gap: 8px 18px;

    margin-top: 52px;

    font-size: 1.6rem;

    span:not(:last-child)::after {
      margin-left: 18px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    gap: 6px;

    font-size: 1.5rem;

    span:not(:last-child)::after {
      display: none;
    }
  }
`;