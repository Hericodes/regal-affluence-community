import styled from "styled-components";

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background: ${({ theme }) => theme.colors.purpleDeep};

  color: ${({ theme }) => theme.colors.white};

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
  display: grid;

  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 72px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

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

  color: ${({ theme }) => theme.colors.champagneLight};

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

    background: currentColor;
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
  max-width: 800px;

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(3rem, 6vw, 5.8rem);

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  color: ${({ theme }) => theme.colors.white};

  span {
    color: ${({ theme }) => theme.colors.champagneLight};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.7rem, 11vw, 4.5rem);

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.5rem, 12vw, 3.6rem);
  }
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 500px;

  justify-self: end;

  color: rgba(255, 255, 255, 0.68);

  font-size: 16px;

  line-height: 1.8;

  @media (max-width: 900px) {
    justify-self: start;

    max-width: 650px;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.7;
  }
`;

/* ========================================
   GRID
======================================== */

export const BenefitsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  border-top: 1px solid rgba(255, 255, 255, 0.12);

  border-left: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* ========================================
   BENEFIT CARD
======================================== */

export const BenefitCard = styled.article`
  position: relative;

  min-height: 300px;

  padding: 36px;

  border-right: 1px solid rgba(255, 255, 255, 0.12);

  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  background: transparent;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.045);
  }

  @media (max-width: 768px) {
    min-height: 270px;

    padding: 30px;
  }
`;

/* ========================================
   NUMBER
======================================== */

export const Number = styled.span`
  position: absolute;

  top: 30px;
  right: 32px;

  color: rgba(255, 255, 255, 0.3);

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 0.12em;
`;

/* ========================================
   ICON
======================================== */

export const Icon = styled.div`
  width: 46px;
  height: 46px;

  display: grid;

  place-items: center;

  margin-bottom: 30px;

  border: 1px solid
    rgba(201, 169, 110, 0.55);

  border-radius: 50%;

  color: ${({ theme }) => theme.colors.champagneLight};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 20px;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  ${BenefitCard}:hover & {
    background: rgba(201, 169, 110, 0.1);

    transform: rotate(8deg);
  }
`;

/* ========================================
   TITLE
======================================== */

export const Title = styled.h3`
  margin-bottom: 14px;

  color: ${({ theme }) => theme.colors.white};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 25px;

  font-weight: 500;

  line-height: 1.15;

  letter-spacing: -0.02em;
`;

/* ========================================
   DESCRIPTION
======================================== */

export const CardDescription = styled.p`
  max-width: 360px;

  color: rgba(255, 255, 255, 0.58);

  font-size: 14px;

  line-height: 1.75;
`;

/* ========================================
   BOTTOM LINE
======================================== */

export const BottomLine = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  gap: 12px 24px;

  margin-top: 64px;

  color: rgba(255, 255, 255, 0.42);

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 24px;

      color: ${({ theme }) => theme.colors.champagne};
    }
  }

  @media (max-width: 600px) {
    gap: 8px 16px;

    line-height: 1.8;

    span:not(:last-child)::after {
      margin-left: 16px;
    }
  }
`;