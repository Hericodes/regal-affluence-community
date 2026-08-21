import styled, { keyframes } from "styled-components";

/* ========================================
   TYPES
======================================== */

type GlowPosition =
  | "top"
  | "right"
  | "bottom";

type OrbSize =
  | "small"
  | "large";

type OrbPosition =
  | "one"
  | "two";

/* ========================================
   ANIMATIONS
======================================== */

const heroReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 36px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const badgeReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 16px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const heroImageReveal = keyframes`
  from {
    opacity: 0;
    transform: scale(1.08);
  }

  to {
    opacity: 1;
    transform: scale(1.035);
  }
`;

const orbFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(0, -22px, 0) scale(1.04);
  }
`;

const glowPulse = keyframes`
  0%,
  100% {
    opacity: 0.35;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.08);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-120%) skewX(-18deg);
  }

  100% {
    transform: translateX(220%) skewX(-18deg);
  }
`;

const dotPulse = keyframes`
  0%,
  100% {
    box-shadow:
      0 0 0 0 rgba(232, 207, 159, 0.4);
  }

  50% {
    box-shadow:
      0 0 0 7px rgba(232, 207, 159, 0);
  }
`;

const scrollMove = keyframes`
  0% {
    transform: translateY(-6px);
    opacity: 0;
  }

  35% {
    opacity: 1;
  }

  100% {
    transform: translateY(18px);
    opacity: 0;
  }
`;

/* ========================================
   HERO SECTION
======================================== */

export const Section = styled.section`
  position: relative;

  width: 100%;
  min-height: 100svh;

  display: flex;
  align-items: center;

  overflow: hidden;
  isolation: isolate;

  background:
    radial-gradient(
      circle at 75% 35%,
      rgba(108, 54, 164, 0.18),
      transparent 30%
    ),
    ${({ theme }) => theme.colors.purpleDeep};

  color: ${({ theme }) => theme.colors.white};

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    z-index: 0;

    pointer-events: none;

    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.018) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.018) 1px,
        transparent 1px
      );

    background-size: 80px 80px;

    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35),
      transparent 70%
    );

    opacity: 0.35;
  }

  @media (max-width: 768px) {
    min-height: 760px;
  }

  @media (prefers-reduced-motion: reduce) {
    & *,
    & *::before,
    & *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

/* ========================================
   BACKGROUND IMAGE
======================================== */

export const BackgroundImage = styled.div`
  position: absolute;

  inset: 0;

  z-index: -3;

  width: 100%;
  height: 100%;

  background-image: url("/images/hero-community.jpeg");

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  transform: scale(1.035);

  pointer-events: none;
  user-select: none;

  animation: ${heroImageReveal} 1.8s ease-out both;

  @media (max-width: 1200px) {
    background-position: 58% center;
  }

  @media (max-width: 1024px) {
    background-position: 60% center;
  }

  @media (max-width: 768px) {
    background-position: 63% center;

    transform: scale(1.06);
  }

  @media (max-width: 480px) {
    background-position: 64% center;

    transform: scale(1.08);
  }
`;

/* ========================================
   IMAGE OVERLAY
======================================== */

export const Overlay = styled.div`
  position: absolute;

  inset: 0;

  z-index: -2;

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      rgba(23, 7, 48, 0.98) 0%,
      rgba(27, 8, 53, 0.95) 20%,
      rgba(32, 10, 62, 0.86) 38%,
      rgba(39, 13, 73, 0.62) 57%,
      rgba(41, 13, 77, 0.32) 78%,
      rgba(25, 7, 46, 0.18) 100%
    ),
    linear-gradient(
      180deg,
      rgba(19, 5, 39, 0.28) 0%,
      rgba(26, 7, 51, 0.08) 40%,
      rgba(18, 5, 37, 0.78) 100%
    );

  @media (max-width: 768px) {
    background:
      linear-gradient(
        180deg,
        rgba(24, 7, 49, 0.74) 0%,
        rgba(28, 8, 56, 0.82) 32%,
        rgba(29, 8, 57, 0.93) 65%,
        rgba(18, 5, 37, 0.99) 100%
      );
  }
`;

/* ========================================
   IMAGE VIGNETTE
======================================== */

export const ImageVignette = styled.div`
  position: absolute;

  inset: 0;

  z-index: -1;

  pointer-events: none;

  background:
    radial-gradient(
      ellipse at center,
      transparent 30%,
      rgba(10, 3, 23, 0.2) 65%,
      rgba(10, 3, 23, 0.72) 100%
    );
`;

/* ========================================
   ATMOSPHERIC GLOW
======================================== */

interface GlowProps {
  $position: GlowPosition;
}

export const Glow = styled.div<GlowProps>`
  position: absolute;

  z-index: -1;

  width: ${({ $position }) =>
    $position === "right" ? "460px" : "360px"};

  height: ${({ $position }) =>
    $position === "right" ? "460px" : "360px"};

  border-radius: 50%;

  pointer-events: none;

  filter: blur(80px);

  background: rgba(111, 54, 170, 0.2);

  animation: ${glowPulse} 8s ease-in-out infinite;

  ${({ $position }) => {
    switch ($position) {
      case "top":
        return `
          top: -180px;
          left: 15%;
        `;

      case "right":
        return `
          right: -180px;
          top: 18%;
        `;

      case "bottom":
        return `
          bottom: -240px;
          left: 35%;
          opacity: 0.18;
        `;

      default:
        return "";
    }
  }}
`;

/* ========================================
   DECORATIVE ORB
======================================== */

interface DecorativeOrbProps {
  $size: OrbSize;
  $position: OrbPosition;
}

export const DecorativeOrb =
  styled.div<DecorativeOrbProps>`
    position: absolute;

    z-index: -1;

    width: ${({ $size }) =>
      $size === "large" ? "280px" : "120px"};

    height: ${({ $size }) =>
      $size === "large" ? "280px" : "120px"};

    border: 1px solid rgba(232, 207, 159, 0.1);

    border-radius: 50%;

    background:
      radial-gradient(
        circle at 35% 30%,
        rgba(232, 207, 159, 0.1),
        transparent 55%
      );

    box-shadow:
      inset 0 0 60px rgba(232, 207, 159, 0.035),
      0 0 80px rgba(99, 44, 151, 0.1);

    pointer-events: none;

    animation: ${orbFloat} 9s ease-in-out infinite;

    ${({ $position }) => {
      if ($position === "one") {
        return `
          right: 8%;
          top: 22%;
          animation-delay: -2s;
        `;
      }

      return `
        right: 18%;
        bottom: 8%;
        opacity: 0.4;
        animation-duration: 13s;
      `;
    }}

    @media (max-width: 768px) {
      display: none;
    }
  `;

/* ========================================
   CONTENT CONTAINER
======================================== */

export const Container = styled.div`
  position: relative;

  z-index: 2;

  width: min(100% - 64px, 1360px);

  min-height: 100svh;

  margin: 0 auto;

  padding-top: 110px;
  padding-bottom: 100px;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: min(100% - 36px, 1360px);

    min-height: 760px;

    padding-top: 120px;
    padding-bottom: 100px;
  }

  @media (max-width: 480px) {
    width: min(100% - 28px, 1360px);

    padding-top: 112px;
    padding-bottom: 92px;
  }
`;

/* ========================================
   CONTENT
======================================== */

export const Content = styled.div`
  position: relative;

  width: min(750px, 100%);

  animation: ${heroReveal} 1s 0.15s ease both;

  @media (max-width: 768px) {
    width: min(650px, 100%);
  }
`;

/* ========================================
   HERO BADGE
======================================== */

export const HeroBadge = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  width: fit-content;

  margin-bottom: 18px;

  padding: 9px 14px;

  border: 1px solid rgba(232, 207, 159, 0.18);

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(255, 255, 255, 0.045);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 10px 30px rgba(0, 0, 0, 0.12);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  animation: ${badgeReveal} 0.8s 0.25s ease both;
`;

export const HeroBadgeDot = styled.span`
  width: 7px;
  height: 7px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ theme }) =>
    theme.colors.champagneLight};

  animation: ${dotPulse} 2.4s ease-in-out infinite;
`;

export const HeroBadgeText = styled.span`
  color: rgba(255, 255, 255, 0.76);

  font-size: 9px;

  font-weight: 700;

  letter-spacing: 0.18em;

  line-height: 1;

  text-transform: uppercase;
`;

/* ========================================
   EYEBROW
======================================== */

export const Eyebrow = styled.p`
  display: flex;

  align-items: center;

  gap: 10px;

  margin: 0 0 20px;

  color: ${({ theme }) =>
    theme.colors.champagneLight};

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 30px;
    height: 1px;

    flex-shrink: 0;

    background: currentColor;

    box-shadow:
      0 0 12px rgba(232, 207, 159, 0.45);
  }

  @media (max-width: 768px) {
    margin-bottom: 17px;

    font-size: 9px;

    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

export const Heading = styled.h1`
  position: relative;

  max-width: 820px;

  margin: 0;

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size: clamp(3.9rem, 7.1vw, 7.4rem);

  font-weight: 500;

  line-height: 0.88;

  letter-spacing: -0.052em;

  color: ${({ theme }) => theme.colors.white};

  text-wrap: balance;

  text-shadow:
    0 8px 35px rgba(0, 0, 0, 0.18);

  span {
    position: relative;

    color: ${({ theme }) =>
      theme.colors.champagneLight};

    background:
      linear-gradient(
        120deg,
        ${({ theme }) =>
          theme.colors.champagneLight},
        ${({ theme }) => theme.colors.champagne},
        #f4e3b7
      );

    -webkit-background-clip: text;
    background-clip: text;

    -webkit-text-fill-color: transparent;

    &::after {
      content: "";

      position: absolute;

      left: 4%;
      right: 2%;
      bottom: -7px;

      height: 1px;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(232, 207, 159, 0.75),
          transparent
        );

      opacity: 0.65;
    }
  }

  @media (max-width: 768px) {
    font-size: clamp(3.3rem, 15vw, 5.4rem);

    line-height: 0.91;

    letter-spacing: -0.045em;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.9rem, 14.5vw, 4.4rem);
  }
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 590px;

  margin: 30px 0 0;

  color: rgba(255, 255, 255, 0.74);

  font-size: 16px;

  font-weight: 400;

  line-height: 1.75;

  letter-spacing: -0.005em;

  text-wrap: pretty;

  @media (max-width: 768px) {
    max-width: 550px;

    margin-top: 23px;

    font-size: 15px;

    line-height: 1.68;
  }

  @media (max-width: 480px) {
    margin-top: 20px;

    font-size: 14px;

    line-height: 1.65;
  }
`;

/* ========================================
   ACTIONS
======================================== */

export const Actions = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  margin-top: 35px;

  @media (max-width: 520px) {
    flex-direction: column;

    align-items: stretch;

    gap: 10px;

    margin-top: 29px;
  }
`;

/* ========================================
   PRIMARY BUTTON
======================================== */

export const PrimaryButton = styled.a`
  position: relative;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 14px;

  min-height: 56px;

  padding: 0 25px;

  overflow: hidden;

  border: 1px solid rgba(255, 245, 218, 0.4);

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background:
    linear-gradient(
      135deg,
      ${({ theme }) =>
        theme.colors.champagneLight},
      ${({ theme }) => theme.colors.champagne}
    );

  color: ${({ theme }) =>
    theme.colors.purpleDeep};

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 0.095em;

  text-transform: uppercase;

  text-decoration: none;

  box-shadow:
    0 12px 35px rgba(201, 169, 110, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);

  transition:
    transform 0.3s
      cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.3s ease,
    filter 0.3s ease;

  &::before {
    content: "";

    position: absolute;

    top: -40%;
    left: 0;

    width: 38%;
    height: 180%;

    background: rgba(255, 255, 255, 0.35);

    filter: blur(10px);

    transform:
      translateX(-140%)
      skewX(-18deg);

    pointer-events: none;
  }

  .arrow {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 25px;
    height: 25px;

    border-radius: 50%;

    background: rgba(30, 10, 60, 0.1);

    font-size: 16px;

    line-height: 1;

    transition:
      transform 0.3s ease,
      background 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);

    filter: brightness(1.04);

    box-shadow:
      0 20px 45px rgba(201, 169, 110, 0.28),
      0 0 35px rgba(201, 169, 110, 0.08);

    &::before {
      animation: ${shimmer} 0.75s ease;
    }

    .arrow {
      transform: translateX(3px);

      background: rgba(30, 10, 60, 0.16);
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagneLight};

    outline-offset: 4px;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

/* ========================================
   SECONDARY BUTTON
======================================== */

export const SecondaryButton = styled.a`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  min-height: 56px;

  padding: 0 23px;

  border: 1px solid rgba(255, 255, 255, 0.23);

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background: rgba(255, 255, 255, 0.025);

  color: ${({ theme }) => theme.colors.white};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.085em;

  text-transform: uppercase;

  text-decoration: none;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  .secondaryArrow {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 23px;
    height: 23px;

    border: 1px solid
      rgba(255, 255, 255, 0.18);

    border-radius: 50%;

    font-size: 13px;

    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);

    background: rgba(255, 255, 255, 0.08);

    border-color: rgba(232, 207, 159, 0.4);

    box-shadow:
      0 14px 35px rgba(0, 0, 0, 0.14);

    .secondaryArrow {
      transform: translateY(3px);

      border-color: rgba(232, 207, 159, 0.4);
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagneLight};

    outline-offset: 4px;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

/* ========================================
   STAT STRIP
======================================== */

export const StatStrip = styled.div`
  display: flex;

  align-items: center;

  width: fit-content;

  margin-top: 43px;

  padding: 14px 0;

  border-top: 1px solid
    rgba(255, 255, 255, 0.1);

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.1);

  @media (max-width: 600px) {
    width: 100%;

    margin-top: 34px;
  }
`;

export const Stat = styled.div`
  min-width: 105px;

  padding: 0 20px;

  &:first-child {
    padding-left: 0;
  }

  & + & {
    border-left: 1px solid
      rgba(255, 255, 255, 0.11);
  }

  @media (max-width: 600px) {
    min-width: 0;

    flex: 1;

    padding: 0 13px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }
`;

export const StatValue = styled.strong`
  display: block;

  color: ${({ theme }) =>
    theme.colors.champagneLight};

  font-family: ${({ theme }) =>
    theme.fonts.display};

  font-size: 20px;

  font-weight: 500;

  line-height: 1;
`;

export const StatLabel = styled.span`
  display: block;

  margin-top: 5px;

  color: rgba(255, 255, 255, 0.47);

  font-size: 8px;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 7px;

    letter-spacing: 0.08em;
  }
`;

/* ========================================
   SCROLL INDICATOR
======================================== */

export const ScrollIndicator = styled.a`
  position: absolute;

  right: 38px;
  bottom: 58px;

  z-index: 5;

  display: flex;

  align-items: center;

  gap: 11px;

  color: rgba(255, 255, 255, 0.52);

  text-decoration: none;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.champagneLight};

    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagneLight};

    outline-offset: 6px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ScrollText = styled.span`
  font-size: 8px;

  font-weight: 700;

  letter-spacing: 0.18em;

  text-transform: uppercase;

  writing-mode: vertical-rl;

  transform: rotate(180deg);
`;

export const ScrollLine = styled.span`
  position: relative;

  display: block;

  width: 1px;
  height: 55px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.16);

  span {
    position: absolute;

    top: 0;
    left: 0;

    width: 1px;
    height: 22px;

    background: ${({ theme }) =>
      theme.colors.champagneLight};

    animation: ${scrollMove} 2.1s
      ease-in-out infinite;
  }
`;

/* ========================================
   BOTTOM NOTE
======================================== */

export const BottomNote = styled.p`
  position: absolute;

  left: 50%;
  bottom: 27px;

  z-index: 5;

  transform: translateX(-50%);

  display: flex;

  align-items: center;

  gap: 12px;

  margin: 0;

  color: rgba(255, 255, 255, 0.46);

  font-size: 8px;

  font-weight: 700;

  letter-spacing: 0.18em;

  line-height: 1.4;

  text-transform: uppercase;

  white-space: nowrap;

  pointer-events: none;

  span {
    width: 26px;
    height: 1px;

    flex-shrink: 0;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.25)
      );
  }

  span:last-child {
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.25),
        transparent
      );
  }

  @media (max-width: 520px) {
    bottom: 19px;

    gap: 7px;

    font-size: 7px;

    letter-spacing: 0.1em;

    span {
      width: 14px;
    }
  }
`;