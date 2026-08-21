import styled, { keyframes } from "styled-components";

/* ========================================
   TYPES
======================================== */

type GlowPosition = "top" | "bottom";

/* ========================================
   ANIMATIONS
======================================== */

const ambientFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -22px, 0) scale(1.06);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(120%);
  }
`;

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 140px 0 130px;

  overflow: hidden;

  isolation: isolate;

  background:
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.cream} 0%,
      ${({ theme }) => theme.colors.ivory} 48%,
      ${({ theme }) => theme.colors.cream} 100%
    );

  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    padding: 100px 0 90px;
  }

  @media (max-width: 480px) {
    padding: 76px 0 72px;
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

    width: 520px;
    height: 520px;

    border-radius: 50%;

    pointer-events: none;

    filter: blur(110px);

    background:
      radial-gradient(
        circle,
        rgba(91, 33, 182, 0.10) 0%,
        rgba(91, 33, 182, 0.035) 42%,
        transparent 72%
      );

    animation: ${ambientFloat} 12s
      ease-in-out infinite;

    ${({ $position }) =>
      $position === "top"
        ? `
          top: -280px;
          right: -180px;
        `
        : `
          bottom: -300px;
          left: -200px;
          animation-delay: -5s;
        `}

    @media (max-width: 768px) {
      width: 340px;
      height: 340px;

      filter: blur(80px);
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

  opacity: 0.22;

  background-image:
    linear-gradient(
      rgba(91, 33, 182, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(91, 33, 182, 0.035) 1px,
      transparent 1px
    );

  background-size: 90px 90px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent 0%,
      black 14%,
      black 86%,
      transparent 100%
    );
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  position: relative;

  width: min(100% - 64px, 1320px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 36px, 1320px);
  }

  @media (max-width: 480px) {
    width: min(100% - 28px, 1320px);
  }
`;

/* ========================================
   HEADER
======================================== */

export const Header = styled.header`
  position: relative;

  display: grid;

  grid-template-columns:
    minmax(0, 1.3fr)
    minmax(80px, 0.2fr)
    minmax(280px, 0.65fr);

  column-gap: 50px;

  align-items: end;

  margin-bottom: 94px;

  @media (max-width: 1100px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(280px, 0.55fr);

    gap: 35px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

    margin-bottom: 64px;
  }
`;

/* ========================================
   HEADER CONTENT
======================================== */

export const HeaderContent = styled.div`
  position: relative;
`;

/* ========================================
   EYEBROW
======================================== */

export const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 11px;

  margin: 0 0 24px;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.2em;

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
        ${({ theme }) => theme.colors.champagne},
        ${({ theme }) => theme.colors.purple}
      );
  }

  @media (max-width: 768px) {
    margin-bottom: 19px;

    font-size: 9px;

    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

export const Heading = styled.h2`
  max-width: 920px;

  margin: 0;

  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(3.3rem, 6vw, 6.1rem);

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.052em;

  text-wrap: balance;

  span {
    position: relative;

    color: ${({ theme }) => theme.colors.purple};

    font-style: italic;

    &::after {
      content: "";

      position: absolute;

      left: 3%;
      right: 12%;
      bottom: -8px;

      height: 2px;

      border-radius: 999px;

      background:
        linear-gradient(
          90deg,
          transparent,
          ${({ theme }) => theme.colors.champagne},
          transparent
        );

      opacity: 0.65;
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(2.8rem, 11vw, 4.8rem);

    line-height: 0.98;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.45rem, 12vw, 3.9rem);
  }
`;

/* ========================================
   HEADER META
======================================== */

export const HeaderMeta = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  width: 76px;
  height: 76px;

  border: 1px solid
    rgba(201, 169, 110, 0.32);

  border-radius: 50%;

  background:
    rgba(255, 255, 255, 0.3);

  box-shadow:
    inset 0 0 0 7px
      rgba(255, 255, 255, 0.12);

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const HeaderMetaNumber = styled.span`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 20px;

  font-weight: 600;

  line-height: 1;
`;

export const HeaderMetaLabel = styled.span`
  margin-top: 5px;

  color: ${({ theme }) => theme.colors.champagne};

  font-size: 5px;

  font-weight: 800;

  letter-spacing: 0.16em;

  line-height: 1.3;

  text-align: center;
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 520px;

  margin: 0;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 15px;

  line-height: 1.82;

  @media (max-width: 900px) {
    max-width: 650px;
  }

  @media (max-width: 768px) {
    font-size: 14.5px;

    line-height: 1.72;
  }
`;

/* ========================================
   COMMUNITY LAYOUT
======================================== */

export const CommunityLayout = styled.div`
  display: grid;

  grid-template-columns:
    minmax(260px, 0.7fr)
    minmax(0, 1.3fr);

  gap: 72px;

  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    gap: 46px;
  }
`;

/* ========================================
   COMMUNITY INTRO
======================================== */

export const CommunityIntro = styled.div`
  position: sticky;

  top: 120px;

  @media (max-width: 1000px) {
    position: static;
  }
`;

/* ========================================
   COMMUNITY LABEL
======================================== */

export const CommunityLabel = styled.p`
  margin: 0 0 19px;

  color: ${({ theme }) => theme.colors.champagne};

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1.4;

  text-transform: uppercase;
`;

/* ========================================
   COMMUNITY TITLE
======================================== */

export const CommunityTitle = styled.h3`
  max-width: 470px;

  margin: 0;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(2.35rem, 4vw, 3.8rem);

  font-weight: 500;

  line-height: 1.01;

  letter-spacing: -0.04em;

  span {
    color: ${({ theme }) => theme.colors.purple};

    font-style: italic;
  }
`;

/* ========================================
   COMMUNITY DESCRIPTION
======================================== */

export const CommunityDescription = styled.p`
  max-width: 450px;

  margin: 26px 0 0;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`;

/* ========================================
   COMMUNITY RULE
======================================== */

export const CommunityRule = styled.div`
  position: relative;

  width: 120px;

  height: 1px;

  margin-top: 38px;

  overflow: hidden;

  background:
    rgba(91, 33, 182, 0.12);

  &::after {
    content: "";

    position: absolute;

    inset: 0;

    width: 50%;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.champagne},
        ${({ theme }) => theme.colors.purple}
      );

    animation: ${shimmer} 4s
      ease-in-out infinite;
  }
`;

/* ========================================
   ACTIVITIES GRID
======================================== */

export const ActivitiesGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 1px;

  overflow: hidden;

  border: 1px solid
    rgba(69, 35, 105, 0.12);

  border-radius: 24px;

  background:
    rgba(69, 35, 105, 0.12);

  box-shadow:
    0 28px 70px
      rgba(39, 17, 61, 0.07);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    border-radius: 20px;
  }
`;

/* ========================================
   ACTIVITY CARD
======================================== */

export const ActivityCard = styled.article`
  position: relative;

  min-height: 258px;

  padding: 32px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.95),
      rgba(250, 248, 243, 0.92)
    );

  transition:
    transform 0.4s
      cubic-bezier(0.2, 0.8, 0.2, 1),
    background 0.4s ease,
    box-shadow 0.4s ease;

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
        transparent,
        ${({ theme }) => theme.colors.champagne},
        ${({ theme }) => theme.colors.purple},
        transparent
      );

    opacity: 0;

    transform: scaleX(0.4);

    transition:
      opacity 0.4s ease,
      transform 0.45s ease;
  }

  &::after {
    content: "";

    position: absolute;

    width: 190px;
    height: 190px;

    right: -100px;
    bottom: -100px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(91, 33, 182, 0.11),
        transparent 68%
      );

    opacity: 0;

    transition: opacity 0.45s ease;

    pointer-events: none;
  }

  &:hover {
    z-index: 2;

    transform: translateY(-4px);

    background:
      linear-gradient(
        145deg,
        ${({ theme }) => theme.colors.white},
        rgba(250, 248, 243, 0.98)
      );

    box-shadow:
      0 24px 55px
        rgba(39, 17, 61, 0.11);

    &::before {
      opacity: 1;

      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-height: 235px;

    padding: 28px;
  }

  @media (max-width: 480px) {
    min-height: 220px;

    padding: 27px 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* ========================================
   ACTIVITY TOP
======================================== */

export const ActivityTop = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 29px;
`;

/* ========================================
   ACTIVITY NUMBER
======================================== */

export const ActivityNumber = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border: 1px solid
    rgba(201, 169, 110, 0.35);

  border-radius: 50%;

  background:
    rgba(201, 169, 110, 0.06);

  color: ${({ theme }) => theme.colors.champagne};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 13px;

  font-weight: 600;
`;

/* ========================================
   ACTIVITY ICON
======================================== */

export const ActivityIcon = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border: 1px solid
    rgba(91, 33, 182, 0.14);

  border-radius: 50%;

  background:
    rgba(91, 33, 182, 0.035);

  color: ${({ theme }) => theme.colors.purple};

  font-size: 17px;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;

  ${ActivityCard}:hover & {
    background:
      ${({ theme }) => theme.colors.purple};

    color:
      ${({ theme }) => theme.colors.white};

    transform: rotate(8deg);
  }
`;

/* ========================================
   ACTIVITY TITLE
======================================== */

export const ActivityTitle = styled.h4`
  max-width: 360px;

  margin: 0 0 12px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;

  line-height: 1.08;

  letter-spacing: -0.025em;
`;

/* ========================================
   ACTIVITY DESCRIPTION
======================================== */

export const ActivityDescription = styled.p`
  max-width: 400px;

  margin: 0;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 13.5px;

  line-height: 1.72;

  @media (max-width: 480px) {
    font-size: 13.5px;
  }
`;

/* ========================================
   ACTIVITY ARROW
======================================== */

export const ActivityArrow = styled.span`
  position: absolute;

  right: 30px;
  bottom: 25px;

  color: rgba(91, 33, 182, 0.3);

  font-size: 17px;

  opacity: 0;

  transform:
    translate(-7px, 7px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${ActivityCard}:hover & {
    opacity: 1;

    transform:
      translate(0, 0);

    color:
      ${({ theme }) => theme.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ========================================
   PARTICIPATION
======================================== */

export const Participation = styled.section`
  margin-top: 120px;

  padding-top: 92px;

  border-top:
    1px solid
    rgba(69, 35, 105, 0.13);

  @media (max-width: 768px) {
    margin-top: 82px;

    padding-top: 65px;
  }

  @media (max-width: 480px) {
    margin-top: 68px;

    padding-top: 55px;
  }
`;

/* ========================================
   PARTICIPATION HEADER
======================================== */

export const ParticipationHeader = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(280px, 0.62fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 58px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 24px;

    margin-bottom: 40px;
  }
`;

/* ========================================
   PARTICIPATION CONTENT
======================================== */

export const ParticipationContent = styled.div`
  min-width: 0;
`;

/* ========================================
   PARTICIPATION TITLE
======================================== */

export const ParticipationTitle = styled.h3`
  max-width: 650px;

  margin: 0;

  color: ${({ theme }) => theme.colors.purpleDeep};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(2.7rem, 5vw, 4.8rem);

  font-weight: 500;

  line-height: 0.96;

  letter-spacing: -0.045em;

  span {
    color: ${({ theme }) => theme.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
`;

/* ========================================
   PARTICIPATION DESCRIPTION
======================================== */

export const ParticipationDescription = styled.p`
  max-width: 500px;

  margin: 0;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`;

/* ========================================
   PARTICIPATION LIST
======================================== */

export const ParticipationList = styled.div`
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(69, 35, 105, 0.12);

  border-radius: 22px;

  background:
    rgba(69, 35, 105, 0.12);

  box-shadow:
    0 25px 60px
      rgba(39, 17, 61, 0.06);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    border-radius: 19px;
  }
`;

/* ========================================
   PARTICIPATION ITEM
======================================== */

export const ParticipationItem = styled.article`
  position: relative;

  min-height: 220px;

  padding: 32px;

  background:
    rgba(255, 255, 255, 0.94);

  overflow: hidden;

  transition:
    background 0.3s ease,
    transform 0.35s ease;

  &::before {
    content: "";

    position: absolute;

    left: 0;
    bottom: 0;

    width: 100%;
    height: 3px;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.purple},
        ${({ theme }) => theme.colors.champagne}
      );

    transform: scaleX(0);

    transform-origin: left;

    transition:
      transform 0.4s
        cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &:hover {
    z-index: 2;

    background:
      ${({ theme }) => theme.colors.ivory};

    transform: translateY(-3px);

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    min-height: auto;

    padding: 28px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* ========================================
   PARTICIPATION NUMBER
======================================== */

export const ParticipationNumber = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 38px;
  height: 38px;

  margin-bottom: 31px;

  border:
    1px solid
    rgba(201, 169, 110, 0.32);

  border-radius: 50%;

  background:
    rgba(201, 169, 110, 0.055);

  color: ${({ theme }) => theme.colors.champagne};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 13px;

  font-weight: 600;
`;

/* ========================================
   PARTICIPATION TEXT
======================================== */

export const ParticipationText = styled.div`
  strong {
    display: block;

    margin-bottom: 10px;

    color: ${({ theme }) => theme.colors.purpleDeep};

    font-family: ${({ theme }) => theme.fonts.display};

    font-size: 1.4rem;

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.02em;
  }

  p {
    max-width: 350px;

    margin: 0;

    color: ${({ theme }) => theme.colors.textMuted};

    font-size: 13.5px;

    line-height: 1.7;
  }
`;

/* ========================================
   PARTICIPATION ARROW
======================================== */

export const ParticipationArrow = styled.span`
  position: absolute;

  right: 28px;
  top: 32px;

  color:
    rgba(91, 33, 182, 0.25);

  font-size: 18px;

  opacity: 0;

  transform: translateX(-6px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${ParticipationItem}:hover & {
    opacity: 1;

    transform: translateX(0);

    color:
      ${({ theme }) => theme.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

export const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  gap: 28px;

  margin-top: 82px;

  color: ${({ theme }) => theme.colors.purpleDeep};

  > div {
    display: flex;

    align-items: center;

    justify-content: center;

    flex-wrap: wrap;

    gap: 22px;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.display};

    font-size: clamp(1.45rem, 3vw, 2.25rem);

    font-weight: 500;

    line-height: 1;

    letter-spacing: -0.025em;

    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({ theme }) => theme.colors.champagne};

      font-family: ${({ theme }) => theme.fonts.body};

      font-size: 0.55em;

      vertical-align: middle;
    }
  }

  @media (max-width: 768px) {
    margin-top: 58px;

    gap: 15px;

    > div {
      gap: 8px 15px;
    }

    span {
      font-size: 1.65rem;

      &:not(:last-child)::after {
        display: none;
      }
    }
  }

  @media (max-width: 480px) {
    margin-top: 48px;

    > div {
      flex-direction: column;

      gap: 9px;
    }

    span {
      font-size: 1.5rem;
    }
  }
`;

/* ========================================
   BOTTOM LINE
======================================== */

export const BottomLine = styled.span`
  display: block;

  flex: 1;

  max-width: 160px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(201, 169, 110, 0.55)
    );

  &:last-child {
    background:
      linear-gradient(
        90deg,
        rgba(201, 169, 110, 0.55),
        transparent
      );
  }

  @media (max-width: 768px) {
    display: none;
  }
`;