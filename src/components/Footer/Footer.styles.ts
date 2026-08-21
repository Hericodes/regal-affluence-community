import styled, { keyframes } from "styled-components";

/* ========================================
   ANIMATIONS
======================================== */

const glowPulse = keyframes`
  0%,
  100% {
    opacity: 0.35;
    transform: scale(1);
  }

  50% {
    opacity: 0.55;
    transform: scale(1.08);
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

export const Section = styled.footer`
  position: relative;

  width: 100%;

  padding: 110px 0 28px;

  background:
    radial-gradient(
      circle at 82% 15%,
      rgba(124, 58, 237, 0.16),
      transparent 32%
    ),
    radial-gradient(
      circle at 15% 85%,
      rgba(201, 169, 110, 0.07),
      transparent 30%
    ),
    ${({ theme }) => theme.colors.purpleDeep};

  color: ${({ theme }) => theme.colors.white};

  overflow: hidden;

  isolation: isolate;

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    z-index: -3;

    background-image:
      linear-gradient(
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.025) 1px,
        transparent 1px
      );

    background-size: 80px 80px;

    mask-image: linear-gradient(
      to bottom,
      transparent,
      black 20%,
      black 80%,
      transparent
    );

    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 82px 0 24px;
  }

  @media (max-width: 480px) {
    padding: 70px 0 22px;
  }
`;

/* ========================================
   BACKGROUND GLOW
======================================== */

export const BackgroundGlow = styled.div`
  position: absolute;

  top: -180px;
  right: -120px;

  width: 460px;
  height: 460px;

  z-index: -2;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(124, 58, 237, 0.25) 0%,
      rgba(91, 33, 182, 0.12) 35%,
      transparent 70%
    );

  filter: blur(10px);

  animation: ${glowPulse} 8s ease-in-out infinite;

  pointer-events: none;

  @media (max-width: 768px) {
    top: -160px;
    right: -180px;

    width: 360px;
    height: 360px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* ========================================
   DECORATIVE LINE
======================================== */

export const DecorativeLine = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 1px;

  overflow: hidden;

  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(201, 169, 110, 0.2) 20%,
    rgba(201, 169, 110, 0.75) 50%,
    rgba(124, 58, 237, 0.55) 70%,
    transparent 100%
  );

  &::after {
    content: "";

    position: absolute;

    top: 0;
    left: 0;

    width: 25%;
    height: 1px;

    background: ${({ theme }) => theme.colors.champagneLight};

    filter: blur(1px);

    animation: ${shimmer} 6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  position: relative;

  z-index: 2;

  width: min(100% - 48px, 1320px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1320px);
  }
`;

/* ========================================
   TOP
======================================== */

export const Top = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.45fr)
    minmax(320px, 0.85fr);

  gap: clamp(60px, 9vw, 150px);

  padding-bottom: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 70px;
  }

  @media (max-width: 768px) {
    padding-bottom: 64px;

    gap: 56px;
  }
`;

/* ========================================
   BRAND
======================================== */

export const Brand = styled.div`
  position: relative;

  max-width: 650px;
`;

/* ========================================
   BRAND MARK
======================================== */

export const BrandMark = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  margin-bottom: 28px;

  border: 1px solid rgba(201, 169, 110, 0.42);

  border-radius: 50%;

  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(255, 255, 255, 0.12),
      transparent 45%
    ),
    rgba(255, 255, 255, 0.025);

  box-shadow:
    inset 0 0 20px rgba(124, 58, 237, 0.12),
    0 10px 35px rgba(0, 0, 0, 0.18);
`;

export const BrandMarkSymbol = styled.span`
  color: ${({ theme }) => theme.colors.champagneLight};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: 14px;

  font-weight: 600;

  letter-spacing: -0.04em;
`;

/* ========================================
   BRAND EYEBROW
======================================== */

export const BrandEyebrow = styled.p`
  margin-bottom: 16px;

  color: ${({ theme }) => theme.colors.champagneLight};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  opacity: 0.85;
`;

/* ========================================
   BRAND NAME
======================================== */

export const BrandName = styled.h2`
  max-width: 650px;

  margin: 0;

  color: ${({ theme }) => theme.colors.white};

  font-family: ${({ theme }) => theme.fonts.display};

  font-size: clamp(3rem, 5.2vw, 5.4rem);

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.05em;

  span {
    color: ${({ theme }) => theme.colors.champagneLight};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.8rem, 11vw, 4.6rem);

    line-height: 0.98;
  }
`;

/* ========================================
   BRAND DESCRIPTION
======================================== */

export const BrandDescription = styled.p`
  max-width: 510px;

  margin-top: 28px;

  color: rgba(255, 255, 255, 0.58);

  font-size: 15px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 22px;

    font-size: 14px;

    line-height: 1.7;
  }
`;

/* ========================================
   COMMUNITY LINK
======================================== */

export const CommunityLink = styled.a`
  position: relative;

  display: inline-flex;

  align-items: center;

  gap: 14px;

  margin-top: 34px;

  padding: 15px 20px;

  border: 1px solid rgba(201, 169, 110, 0.35);

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(255, 255, 255, 0.035);

  color: ${({ theme }) => theme.colors.champagneLight};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.13em;

  text-transform: uppercase;

  text-decoration: none;

  overflow: hidden;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    background: linear-gradient(
      110deg,
      transparent 25%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 75%
    );

    transform: translateX(-120%);

    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);

    border-color: rgba(201, 169, 110, 0.7);

    background: rgba(201, 169, 110, 0.08);

    box-shadow:
      0 14px 40px rgba(0, 0, 0, 0.2),
      0 0 30px rgba(201, 169, 110, 0.08);

    &::before {
      transform: translateX(120%);
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.champagneLight};

    outline-offset: 4px;
  }

  @media (max-width: 480px) {
    width: 100%;

    justify-content: space-between;
  }
`;

/* ========================================
   COMMUNITY ARROW
======================================== */

export const CommunityArrow = styled.span`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  width: 25px;
  height: 25px;

  border-radius: 50%;

  background: rgba(201, 169, 110, 0.12);

  font-size: 16px;

  line-height: 1;

  transition:
    transform 0.3s ease,
    background 0.3s ease;

  ${CommunityLink}:hover & {
    transform: translateX(4px);

    background: rgba(201, 169, 110, 0.22);
  }
`;

/* ========================================
   LINKS
======================================== */

export const Links = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(120px, 1fr));

  gap: 52px;

  align-self: start;

  padding-top: 16px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 28px;
  }
`;

/* ========================================
   LINK GROUP
======================================== */

export const LinkGroup = styled.div`
  min-width: 0;
`;

/* ========================================
   LINK TITLE
======================================== */

export const LinkTitle = styled.h3`
  display: flex;

  align-items: center;

  gap: 10px;

  margin: 0 0 24px;

  color: ${({ theme }) => theme.colors.champagneLight};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 18px;
    height: 1px;

    background: ${({ theme }) => theme.colors.champagne};

    opacity: 0.7;
  }
`;

/* ========================================
   LINK LIST
======================================== */

export const LinkList = styled.ul`
  display: flex;

  flex-direction: column;

  gap: 5px;

  margin: 0;

  padding: 0;

  list-style: none;
`;

/* ========================================
   LINK ARROW
======================================== */

export const LinkArrow = styled.span`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.champagne};

  font-size: 12px;

  opacity: 0;

  transform: translate(0, 0);

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

  @media (max-width: 768px) {
    opacity: 0.65;
  }
`;

/* ========================================
   FOOTER LINK
======================================== */

export const FooterLink = styled.a`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  width: 100%;

  padding: 8px 0;

  color: rgba(255, 255, 255, 0.58);

  font-size: 13px;

  line-height: 1.5;

  text-decoration: none;

  transition:
    color 0.25s ease,
    padding-left 0.25s ease;

  &:hover {
    padding-left: 5px;

    color: ${({ theme }) => theme.colors.white};
  }

  &:hover ${LinkArrow} {
    opacity: 1;

    transform: translate(2px, -2px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.champagneLight};

    outline-offset: 4px;

    border-radius: 3px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

/* ========================================
   BOTTOM BRAND
======================================== */

export const BottomBrand = styled.div`
  color: rgba(255, 255, 255, 0.22);

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.22em;

  white-space: nowrap;

  span {
    margin: 0 6px;

    color: ${({ theme }) => theme.colors.champagne};

    opacity: 0.6;
  }
`;

/* ========================================
   BOTTOM
======================================== */

export const Bottom = styled.div`
  display: grid;

  grid-template-columns: 1fr auto 1fr;

  align-items: center;

  gap: 24px;

  padding-top: 25px;

  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 800px) {
    grid-template-columns: 1fr auto;
  }

  @media (max-width: 600px) {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 18px;
  }
`;

/* ========================================
   COPYRIGHT
======================================== */

export const Copyright = styled.p`
  margin: 0;

  color: rgba(255, 255, 255, 0.35);

  font-size: 10px;

  letter-spacing: 0.04em;

  line-height: 1.5;
`;

/* ========================================
   LEGAL
======================================== */

export const Legal = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 24px;

  @media (max-width: 600px) {
    justify-content: flex-start;

    gap: 18px;
  }
`;

/* ========================================
   LEGAL LINK
======================================== */

export const LegalLink = styled.a`
  position: relative;

  color: rgba(255, 255, 255, 0.35);

  font-size: 10px;

  line-height: 1.5;

  text-decoration: none;

  transition: color 0.25s ease;

  &::after {
    content: "";

    position: absolute;

    right: 0;
    bottom: -4px;
    left: 0;

    height: 1px;

    background: ${({ theme }) => theme.colors.champagne};

    transform: scaleX(0);

    transform-origin: right;

    transition: transform 0.25s ease;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.75);

    &::after {
      transform: scaleX(1);

      transform-origin: left;
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.champagneLight};

    outline-offset: 4px;
  }
`;