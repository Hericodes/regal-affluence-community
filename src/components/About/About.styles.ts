import styled, {
  keyframes,
} from "styled-components";

/* ========================================
   TYPES
======================================== */

type GlowPosition = "left" | "right";

/* ========================================
   ANIMATIONS
======================================== */

const floatGlow = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.35;
  }

  50% {
    transform: translate3d(0, -25px, 0) scale(1.08);
    opacity: 0.55;
  }
`;

const lineReveal = keyframes`
  from {
    transform: scaleX(0);
    transform-origin: left;
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    transform-origin: left;
    opacity: 1;
  }
`;

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 140px 0;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.ivory} 0%,
      ${({ theme }) => theme.colors.cream} 100%
    );

  color: ${({ theme }) => theme.colors.text};

  isolation: isolate;

  @media (max-width: 768px) {
    padding: 100px 0;
  }

  @media (max-width: 480px) {
    padding: 78px 0;
  }

  @media (prefers-reduced-motion: reduce) {
    & *,
    & *::before,
    & *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

/* ========================================
   BACKGROUND GLOW
======================================== */

interface BackgroundGlowProps {
  $position: GlowPosition;
}

export const BackgroundGlow =
  styled.div<BackgroundGlowProps>`
    position: absolute;

    z-index: -1;

    width: 420px;
    height: 420px;

    border-radius: 50%;

    pointer-events: none;

    filter: blur(90px);

    background: rgba(99, 43, 151, 0.08);

    animation:
      ${floatGlow}
      10s ease-in-out infinite;

    ${({ $position }) =>
      $position === "left"
        ? `
          left: -240px;
          top: 8%;
        `
        : `
          right: -240px;
          bottom: 4%;
          animation-delay: -4s;
        `}

    @media (max-width: 768px) {
      width: 280px;
      height: 280px;

      filter: blur(70px);
    }
  `;

/* ========================================
   GRID PATTERN
======================================== */

export const GridPattern = styled.div`
  position: absolute;

  inset: 0;

  z-index: -1;

  pointer-events: none;

  opacity: 0.28;

  background-image:
    linear-gradient(
      rgba(72, 35, 111, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(72, 35, 111, 0.035) 1px,
      transparent 1px
    );

  background-size: 80px 80px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      black 15%,
      black 85%,
      transparent
    );
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  position: relative;

  width: min(
    calc(100% - 64px),
    1320px
  );

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(
      calc(100% - 36px),
      1320px
    );
  }

  @media (max-width: 480px) {
    width: min(
      calc(100% - 28px),
      1320px
    );
  }
`;

/* ========================================
   INTRO
======================================== */

export const Intro = styled.div`
  position: relative;

  max-width: 940px;

  margin-bottom: 92px;

  @media (max-width: 768px) {
    margin-bottom: 64px;
  }

  @media (max-width: 480px) {
    margin-bottom: 52px;
  }
`;

/* ========================================
   INTRO ACCENT
======================================== */

export const IntroAccent = styled.span`
  position: absolute;

  top: 2px;
  left: -46px;

  width: 1px;
  height: 86px;

  background:
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.champagne},
      transparent
    );

  animation:
    ${lineReveal}
    1s cubic-bezier(0.2, 0.8, 0.2, 1)
    both;

  @media (max-width: 1400px) {
    display: none;
  }
`;

/* ========================================
   EYEBROW
======================================== */

export const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 11px;

  margin: 0 0 25px;

  color: ${({ theme }) =>
    theme.colors.purple};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.21em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) =>
          theme.colors.champagne},
        ${({ theme }) =>
          theme.colors.purple}
      );
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 9px;

    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

export const Heading = styled.h2`
  max-width: 930px;

  margin: 0;

  color: ${({ theme }) =>
    theme.colors.text};

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size:
    clamp(
      3.2rem,
      6vw,
      6rem
    );

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.052em;

  text-wrap: balance;

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.8rem,
        11vw,
        4.7rem
      );

    line-height: 0.97;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.45rem,
        12vw,
        3.8rem
      );

    letter-spacing: -0.045em;
  }
`;

/* ========================================
   HIGHLIGHT
======================================== */

export const Highlight = styled.span`
  position: relative;

  color: ${({ theme }) =>
    theme.colors.purple};

  font-style: italic;

  &::after {
    content: "";

    position: absolute;

    left: 2%;
    right: 8%;
    bottom: -9px;

    height: 2px;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        transparent,
        ${({ theme }) =>
          theme.colors.champagne},
        transparent
      );

    opacity: 0.65;
  }
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 720px;

  margin: 27px 0 0;

  color: ${({ theme }) =>
    theme.colors.textMuted};

  font-size: 16px;

  line-height: 1.8;

  &:first-of-type {
    max-width: 780px;

    margin-top: 38px;

    color: ${({ theme }) =>
      theme.colors.text};

    font-size: 18px;

    line-height: 1.72;
  }

  @media (max-width: 768px) {
    margin-top: 21px;

    font-size: 15px;

    line-height: 1.72;

    &:first-of-type {
      margin-top: 28px;

      font-size: 17px;
    }
  }

  @media (max-width: 480px) {
    font-size: 14px;

    line-height: 1.68;

    &:first-of-type {
      font-size: 16px;
    }
  }
`;

/* ========================================
   COLUMNS
======================================== */

export const Columns = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border: 1px solid
    rgba(69, 35, 105, 0.11);

  border-radius: 24px;

  background:
    rgba(69, 35, 105, 0.12);

  box-shadow:
    0 30px 80px
      rgba(39, 17, 61, 0.08);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    border-radius: 20px;
  }
`;

/* ========================================
   COLUMN
======================================== */

export const Column = styled.article`
  position: relative;

  min-height: 470px;

  padding: 50px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.96),
      rgba(255, 255, 255, 0.82)
    );

  transition:
    transform 0.45s
      cubic-bezier(0.2, 0.8, 0.2, 1),
    background 0.45s ease,
    box-shadow 0.45s ease;

  &::before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 2px;

    background:
      linear-gradient(
        90deg,
        transparent 0%,
        ${({ theme }) =>
          theme.colors.champagne} 25%,
        ${({ theme }) =>
          theme.colors.purple} 75%,
        transparent 100%
      );

    opacity: 0;

    transform: scaleX(0.5);

    transition:
      opacity 0.4s ease,
      transform 0.5s ease;
  }

  &::after {
    content: "";

    position: absolute;

    width: 260px;
    height: 260px;

    right: -130px;
    bottom: -150px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(99, 43, 151, 0.1),
        transparent 68%
      );

    opacity: 0;

    transition:
      opacity 0.5s ease;
  }

  &:hover {
    z-index: 2;

    transform: translateY(-5px);

    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 1),
        rgba(249, 245, 238, 0.96)
      );

    box-shadow:
      0 28px 70px
        rgba(39, 17, 61, 0.12);

    &::before {
      opacity: 1;

      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    min-height: 430px;

    padding: 42px;
  }

  @media (max-width: 768px) {
    min-height: auto;

    padding: 38px 30px;
  }

  @media (max-width: 480px) {
    padding: 32px 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* ========================================
   COLUMN TOP
======================================== */

export const ColumnTop = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 30px;
`;

/* ========================================
   COLUMN NUMBER
======================================== */

export const ColumnNumber = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 42px;
  height: 42px;

  border: 1px solid
    rgba(201, 169, 110, 0.32);

  border-radius: 50%;

  background:
    rgba(201, 169, 110, 0.06);

  color: ${({ theme }) =>
    theme.colors.champagne};

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size: 15px;

  font-weight: 600;

  letter-spacing: 0.03em;
`;

/* ========================================
   COLUMN INDEX
======================================== */

export const ColumnIndex = styled.span`
  color:
    rgba(53, 26, 80, 0.42);

  font-size: 8px;

  font-weight: 800;

  letter-spacing: 0.18em;

  text-transform: uppercase;
`;

/* ========================================
   COLUMN TITLE
======================================== */

export const ColumnTitle = styled.h3`
  max-width: 430px;

  margin: 0 0 19px;

  color: ${({ theme }) =>
    theme.colors.purpleDeep};

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size:
    clamp(
      1.9rem,
      3vw,
      2.7rem
    );

  font-weight: 600;

  line-height: 1.05;

  letter-spacing: -0.032em;
`;

/* ========================================
   COLUMN DESCRIPTION
======================================== */

export const ColumnDescription = styled.p`
  max-width: 510px;

  margin: 0;

  color: ${({ theme }) =>
    theme.colors.textMuted};

  font-size: 15px;

  line-height: 1.78;

  &:nth-of-type(2) {
    color:
      rgba(65, 57, 71, 0.68);
  }

  @media (max-width: 480px) {
    font-size: 14px;

    line-height: 1.7;
  }
`;

/* ========================================
   DIVIDER
======================================== */

export const Divider = styled.div`
  width: 52px;

  height: 1px;

  margin: 29px 0;

  background:
    linear-gradient(
      90deg,
      ${({ theme }) =>
        theme.colors.champagne},
      rgba(201, 169, 110, 0.12)
    );
`;

/* ========================================
   COLUMN FOOTER
======================================== */

export const ColumnFooter = styled.div`
  position: absolute;

  left: 50px;
  right: 50px;
  bottom: 38px;

  padding-top: 18px;

  border-top: 1px solid
    rgba(69, 35, 105, 0.09);

  @media (max-width: 900px) {
    left: 42px;
    right: 42px;
  }

  @media (max-width: 768px) {
    position: static;

    margin-top: 34px;

    padding-top: 17px;
  }

  @media (max-width: 480px) {
    margin-top: 28px;
  }
`;

/* ========================================
   COLUMN LINK
======================================== */

export const ColumnLink = styled.a`
  display: inline-flex;

  align-items: center;

  gap: 9px;

  color: ${({ theme }) =>
    theme.colors.purple};

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  text-decoration: none;

  transition:
    color 0.25s ease,
    gap 0.25s ease;

  span {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.25s ease;
  }

  &:hover {
    color: ${({ theme }) =>
      theme.colors.purpleDeep};

    gap: 12px;

    span {
      transform:
        translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.purple};

    outline-offset: 5px;

    border-radius: 3px;
  }
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

export const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 25px;

  margin-top: 82px;

  color: ${({ theme }) =>
    theme.colors.purpleDeep};

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size:
    clamp(
      1.6rem,
      3vw,
      2.5rem
    );

  font-weight: 500;

  letter-spacing: -0.025em;

  span {
    display: inline-flex;

    align-items: center;

    &:not(:last-child)::after {
      content: "";

      width: 5px;
      height: 5px;

      margin-left: 25px;

      border-radius: 50%;

      background:
        ${({ theme }) =>
          theme.colors.champagne};

      box-shadow:
        0 0 12px
          rgba(201, 169, 110, 0.35);
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    gap: 7px;

    margin-top: 55px;

    font-size: 1.75rem;

    span:not(:last-child)::after {
      display: none;
    }
  }

  @media (max-width: 480px) {
    margin-top: 45px;

    font-size: 1.5rem;
  }
`;