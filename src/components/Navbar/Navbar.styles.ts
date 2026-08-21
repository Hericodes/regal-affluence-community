import styled, {
  css,
  keyframes,
} from "styled-components";

/* ========================================
   ANIMATIONS
======================================== */

const shimmer = keyframes`
  0% {
    transform: translateX(-130%) skewX(-20deg);
  }

  100% {
    transform: translateX(230%) skewX(-20deg);
  }
`;

const logoPulse = keyframes`
  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.9);
  }

  50% {
    opacity: 0.7;
    transform: scale(1);
  }
`;

const glowPulse = keyframes`
  0%,
  100% {
    opacity: 0.18;
  }

  50% {
    opacity: 0.42;
  }
`;

/* ========================================
   HEADER
======================================== */

export const Header = styled.header<{
  $scrolled: boolean;
  $menuOpen: boolean;
}>`
  position: fixed;
  inset: 0 0 auto;

  z-index: 1000;

  width: 100%;

  background: ${({ $scrolled, $menuOpen }) =>
    $menuOpen
      ? "rgba(250, 248, 243, 0.97)"
      : $scrolled
        ? "rgba(250, 248, 243, 0.86)"
        : "transparent"};

  backdrop-filter: ${({ $scrolled, $menuOpen }) =>
    $scrolled || $menuOpen
      ? "blur(24px) saturate(160%)"
      : "none"};

  -webkit-backdrop-filter: ${({ $scrolled, $menuOpen }) =>
    $scrolled || $menuOpen
      ? "blur(24px) saturate(160%)"
      : "none"};

  border-bottom: 1px solid
    ${({ $scrolled, $menuOpen, theme }) =>
      $scrolled || $menuOpen
        ? theme.colors.border
        : "transparent"};

  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 10px 45px rgba(47, 29, 73, 0.07)"
      : "none"};

  transition:
    background 0.45s ease,
    border-color 0.45s ease,
    box-shadow 0.45s ease,
    backdrop-filter 0.45s ease,
    -webkit-backdrop-filter 0.45s ease;

  @media (max-width: 900px) {
    background: ${({ $scrolled, $menuOpen }) =>
      $menuOpen
        ? "rgba(250, 248, 243, 0.98)"
        : $scrolled
          ? "rgba(250, 248, 243, 0.95)"
          : "transparent"};

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* ========================================
   SCROLL PROGRESS
======================================== */

export const ScrollProgress = styled.div<{
  $scrolled: boolean;
}>`
  position: absolute;

  left: 0;
  bottom: -1px;

  width: ${({ $scrolled }) =>
    $scrolled ? "100%" : "0%"};

  height: 2px;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.purple},
    ${({ theme }) => theme.colors.champagne},
    ${({ theme }) => theme.colors.purple}
  );

  background-size: 200% 100%;

  opacity: ${({ $scrolled }) =>
    $scrolled ? 0.85 : 0};

  box-shadow:
    0 0 12px
      ${({ theme }) =>
        theme.colors.purple}55;

  transition:
    width 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.35s ease;

  /*
   * IMPORTANT:
   * In styled-components v6, inject the
   * conditional animation as a complete
   * CSS block.
   */
  ${({ $scrolled }) =>
    $scrolled &&
    css`
      animation: ${glowPulse} 3s ease-in-out infinite;
    `}

  pointer-events: none;

  @media (max-width: 900px) {
    height: 1.5px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  position: relative;

  width: min(
    calc(100% - 64px),
    1360px
  );

  height: 88px;

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1180px) {
    width: min(
      calc(100% - 48px),
      1360px
    );
  }

  @media (max-width: 768px) {
    width: min(
      calc(100% - 36px),
      1360px
    );

    height: 76px;
  }

  @media (max-width: 480px) {
    width: min(
      calc(100% - 28px),
      1360px
    );

    height: 72px;
  }
`;

/* ========================================
   LOGO
======================================== */

export const Logo = styled.a<{
  $scrolled: boolean;
}>`
  position: relative;

  display: flex;
  align-items: center;

  text-decoration: none;

  cursor: pointer;

  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;

  .logo-glow {
    position: absolute;

    left: 50%;
    bottom: -8px;

    width: 70%;
    height: 16px;

    border-radius: 50%;

    background: ${({ theme }) =>
      theme.colors.purple};

    filter: blur(16px);

    opacity: ${({ $scrolled }) =>
      $scrolled ? 0.12 : 0.2};

    transform:
      translateX(-50%)
      scale(0.9);

    pointer-events: none;

    animation:
      ${logoPulse}
      4s ease-in-out infinite;
  }

  &:hover {
    transform:
      translateY(-2px)
      scale(1.015);
  }

  &:active {
    transform:
      translateY(0)
      scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 7px;

    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    .logo-glow {
      animation: none;
    }

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

/* ========================================
   LOGO IMAGE
======================================== */

export const LogoImage = styled.img`
  position: relative;

  z-index: 1;

  display: block;

  width: 182px;
  height: auto;

  object-fit: contain;

  user-select: none;

  @media (max-width: 768px) {
    width: 158px;
  }

  @media (max-width: 380px) {
    width: 142px;
  }
`;

/* ========================================
   DESKTOP NAV
======================================== */

export const DesktopNav = styled.nav`
  position: absolute;

  left: 50%;

  transform: translateX(-50%);

  display: flex;
  align-items: center;

  gap: 5px;

  padding: 5px;

  border: 1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 999px;

  background: rgba(
    255,
    255,
    255,
    0.035
  );

  transition:
    background 0.35s ease,
    border-color 0.35s ease;

  .nav-orbit {
    position: absolute;

    inset: 0;

    border-radius: inherit;

    pointer-events: none;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(197, 163, 91, 0.08),
      transparent
    );

    opacity: 0.5;
  }

  @media (max-width: 1100px) {
    gap: 1px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

/* ========================================
   NAV LINK
======================================== */

export const NavLink = styled.a<{
  $scrolled: boolean;
  $active: boolean;
}>`
  position: relative;

  display: flex;
  align-items: center;

  min-height: 38px;

  padding: 0 13px;

  border-radius: 999px;

  color: ${({ $scrolled, $active, theme }) =>
    $active
      ? theme.colors.purple
      : $scrolled
        ? theme.colors.text
        : theme.colors.white};

  font-size: 11px;

  font-weight: 650;

  letter-spacing: 0.045em;

  text-decoration: none;

  white-space: nowrap;

  transition:
    color 0.3s ease,
    background 0.3s ease,
    transform 0.3s ease;

  .nav-dot {
    position: absolute;

    left: 50%;
    bottom: 5px;

    width: 4px;
    height: 4px;

    border-radius: 50%;

    background: ${({ theme }) =>
      theme.colors.champagne};

    box-shadow:
      0 0 10px
        ${({ theme }) =>
          theme.colors.champagne};

    transform:
      translateX(-50%)
      scale(
        ${({ $active }) =>
          $active ? 1 : 0}
      );

    opacity: ${({ $active }) =>
      $active ? 1 : 0};

    transition:
      transform 0.3s
        cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.25s ease;
  }

  .nav-label {
    position: relative;

    z-index: 1;
  }

  &:hover {
    color: ${({ $scrolled, theme }) =>
      $scrolled
        ? theme.colors.purple
        : theme.colors.champagneLight};

    background: ${({ $scrolled }) =>
      $scrolled
        ? "rgba(77, 48, 108, 0.055)"
        : "rgba(255, 255, 255, 0.07)"};

    transform: translateY(-1px);
  }

  &:hover .nav-dot {
    transform:
      translateX(-50%)
      scale(1);

    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 3px;
  }

  @media (max-width: 1100px) {
    padding: 0 9px;

    font-size: 10px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* ========================================
   DESKTOP CTA
======================================== */

export const JoinButton = styled.a<{
  $scrolled: boolean;
}>`
  position: relative;

  overflow: hidden;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 46px;

  padding: 0 21px;

  border: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled
        ? `${theme.colors.purple}22`
        : "rgba(255,255,255,0.16)"};

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background: ${({ $scrolled, theme }) =>
    $scrolled
      ? theme.colors.purple
      : theme.colors.champagne};

  color: ${({ $scrolled, theme }) =>
    $scrolled
      ? theme.colors.white
      : theme.colors.purpleDeep};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.09em;

  text-transform: uppercase;

  text-decoration: none;

  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 10px 30px rgba(77, 48, 108, 0.2)"
      : "0 10px 32px rgba(197, 163, 91, 0.2)"};

  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.35s ease,
    box-shadow 0.35s ease;

  .cta-shine {
    position: absolute;

    top: -30%;
    left: -100%;

    width: 55%;
    height: 160%;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );

    transform: skewX(-20deg);

    pointer-events: none;
  }

  .cta-content {
    position: relative;

    z-index: 2;

    display: inline-flex;
    align-items: center;

    gap: 10px;
  }

  .arrow {
    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.35s
        cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform:
      translateY(-3px)
      scale(1.015);

    box-shadow: ${({ $scrolled }) =>
      $scrolled
        ? "0 16px 38px rgba(77, 48, 108, 0.28)"
        : "0 16px 40px rgba(197, 163, 91, 0.3)"};
  }

  &:hover .cta-shine {
    animation:
      ${shimmer}
      0.75s ease forwards;
  }

  &:hover .arrow {
    transform:
      translate(3px, -3px);
  }

  &:active {
    transform:
      translateY(-1px)
      scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 5px;
  }

  @media (max-width: 900px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }

    &:hover .cta-shine {
      animation: none;
    }

    &:hover .arrow {
      transform: none;
    }
  }
`;

/* ========================================
   MOBILE MENU BUTTON
======================================== */

export const MenuButton = styled.button<{
  $scrolled: boolean;
  $open: boolean;
}>`
  display: none;

  align-items: center;
  justify-content: center;

  gap: 9px;

  width: 82px;
  height: 44px;

  padding: 0;

  border: 1px solid
    ${({ $scrolled, $open, theme }) =>
      $scrolled || $open
        ? theme.colors.border
        : "rgba(255,255,255,0.28)"};

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background: ${({ $scrolled, $open }) =>
    $scrolled || $open
      ? "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.07)"};

  color: ${({ $scrolled, $open, theme }) =>
    $scrolled || $open
      ? theme.colors.purpleDark
      : theme.colors.white};

  backdrop-filter: blur(14px);

  -webkit-backdrop-filter: blur(14px);

  cursor: pointer;

  transition:
    transform 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  .menu-label {
    font-size: 9px;

    font-weight: 800;

    letter-spacing: 0.14em;

    text-transform: uppercase;
  }

  .menu-icon {
    display: flex;

    flex-direction: column;

    gap: 4px;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform:
      translateY(0)
      scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 4px;
  }

  @media (max-width: 900px) {
    display: flex;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

/* ========================================
   MENU LINES
======================================== */

export const MenuLine = styled.span<{
  $open: boolean;
  $index: number;
}>`
  display: block;

  width: 16px;
  height: 1px;

  background: currentColor;

  transform-origin: center;

  transition:
    transform 0.35s
      cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.2s ease;

  ${({ $open, $index }) =>
    $open &&
    ($index === 0
      ? `
          transform:
            translateY(2.5px)
            rotate(45deg);
        `
      : `
          transform:
            translateY(-2.5px)
            rotate(-45deg);
        `)}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* ========================================
   MOBILE BACKDROP
======================================== */

export const MobileBackdrop = styled.div<{
  $open: boolean;
}>`
  position: fixed;

  inset: 0;

  z-index: 998;

  background:
    rgba(
      24,
      14,
      38,
      0.58
    );

  backdrop-filter: blur(8px);

  -webkit-backdrop-filter: blur(8px);

  opacity: ${({ $open }) =>
    $open ? 1 : 0};

  visibility: ${({ $open }) =>
    $open
      ? "visible"
      : "hidden"};

  pointer-events: ${({ $open }) =>
    $open
      ? "auto"
      : "none"};

  transition:
    opacity 0.4s ease,
    visibility 0.4s ease;

  @media (min-width: 901px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/* ========================================
   MOBILE MENU
======================================== */

export const MobileMenu = styled.div<{
  $open: boolean;
}>`
  position: fixed;

  top: 82px;
  left: 12px;
  right: 12px;

  z-index: 999;

  max-height:
    calc(
      100vh - 96px
    );

  overflow-y: auto;
  overflow-x: hidden;

  overscroll-behavior: contain;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius: 26px;

  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(77, 48, 108, 0.1),
      transparent 32%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(197, 163, 91, 0.08),
      transparent 28%
    ),
    rgba(
      250,
      248,
      243,
      0.98
    );

  box-shadow:
    0 35px 100px
      rgba(30, 18, 44, 0.25),
    0 10px 30px
      rgba(30, 18, 44, 0.1);

  transform: ${({ $open }) =>
    $open
      ? "translateY(0) scale(1)"
      : "translateY(-18px) scale(0.975)"};

  opacity: ${({ $open }) =>
    $open ? 1 : 0};

  visibility: ${({ $open }) =>
    $open
      ? "visible"
      : "hidden"};

  pointer-events: ${({ $open }) =>
    $open
      ? "auto"
      : "none"};

  transition:
    transform 0.45s
      cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease,
    visibility 0.45s ease;

  .mobile-menu-glow {
    position: absolute;

    top: -90px;
    right: -80px;

    width: 210px;
    height: 210px;

    border-radius: 50%;

    background: ${({ theme }) =>
      theme.colors.purple};

    filter: blur(70px);

    opacity: 0.1;

    pointer-events: none;
  }

  .mobile-menu-inner {
    position: relative;

    z-index: 1;

    padding: 28px 24px 22px;
  }

  .mobile-menu-eyebrow {
    display: flex;

    align-items: center;

    gap: 9px;

    margin-bottom: 14px;

    color: ${({ theme }) =>
      theme.colors.champagne};

    font-size: 8px;

    font-weight: 850;

    letter-spacing: 0.19em;

    .eyebrow-line {
      width: 24px;
      height: 1px;

      background: ${({ theme }) =>
        theme.colors.champagne};
    }

    .eyebrow-star {
      margin-left: auto;

      font-size: 11px;

      opacity: 0.7;
    }
  }

  .mobile-menu-heading {
    display: flex;

    flex-direction: column;

    margin-bottom: 24px;

    font-family: ${({ theme }) =>
      theme.fonts.display};

    font-size: 38px;

    font-weight: 500;

    line-height: 0.95;

    letter-spacing: -0.045em;

    color: ${({ theme }) =>
      theme.colors.purpleDeep};

    .muted {
      color: ${({ theme }) =>
        theme.colors.textMuted};
    }
  }

  .mobile-menu-footer {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 14px;

    margin-top: 22px;

    padding-top: 18px;

    border-top: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    color: ${({ theme }) =>
      theme.colors.textMuted};

    font-size: 7px;

    font-weight: 800;

    letter-spacing: 0.1em;

    .status {
      display: flex;

      align-items: center;

      gap: 6px;

      white-space: nowrap;
    }

    i {
      display: block;

      width: 5px;
      height: 5px;

      flex: 0 0 auto;

      border-radius: 50%;

      background: #55a76c;

      box-shadow:
        0 0 0 3px
          rgba(85, 167, 108, 0.12),
        0 0 10px
          rgba(85, 167, 108, 0.35);
    }
  }

  @media (min-width: 901px) {
    display: none;
  }

  @media (max-width: 768px) {
    top: 82px;
  }

  @media (max-width: 480px) {
    top: 78px;

    left: 8px;
    right: 8px;

    max-height:
      calc(
        100vh - 88px
      );

    border-radius: 22px;

    .mobile-menu-inner {
      padding: 24px 20px 18px;
    }

    .mobile-menu-heading {
      font-size: 34px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    transform: none;
  }
`;

/* ========================================
   MOBILE NAV
======================================== */

export const MobileNav = styled.nav`
  display: flex;

  flex-direction: column;

  border-top: 1px solid
    ${({ theme }) =>
      theme.colors.border};
`;

/* ========================================
   MOBILE NAV LINK
======================================== */

export const MobileNavLink = styled.a<{
  $active: boolean;
  $index: number;
}>`
  position: relative;

  display: grid;

  grid-template-columns:
    32px
    1fr
    24px;

  align-items: center;

  gap: 8px;

  min-height: 68px;

  padding: 0 4px;

  border-bottom: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  color: ${({ $active, theme }) =>
    $active
      ? theme.colors.purple
      : theme.colors.text};

  text-decoration: none;

  transition:
    color 0.3s ease,
    padding-left 0.35s
      cubic-bezier(0.16, 1, 0.3, 1),
    background 0.3s ease;

  .number {
    color: ${({ $active, theme }) =>
      $active
        ? theme.colors.champagne
        : theme.colors.textMuted};

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 0.08em;

    transition:
      color 0.3s ease;
  }

  .label {
    position: relative;

    font-family: ${({ theme }) =>
      theme.fonts.display};

    font-size: 25px;

    font-weight: 500;

    letter-spacing: -0.025em;

    transition:
      transform 0.35s
        cubic-bezier(0.16, 1, 0.3, 1);
  }

  .arrow {
    justify-self: end;

    color: ${({ theme }) =>
      theme.colors.champagne};

    font-size: 17px;

    opacity: ${({ $active }) =>
      $active ? 1 : 0.28};

    transform: ${({ $active }) =>
      $active
        ? "translate(0, 0)"
        : "translate(-4px, 4px)"};

    transition:
      opacity 0.3s ease,
      transform 0.35s
        cubic-bezier(0.16, 1, 0.3, 1);
  }

  &::before {
    content: "";

    position: absolute;

    left: -24px;

    top: 50%;

    width: 3px;

    height: 0;

    border-radius: 999px;

    background: ${({ theme }) =>
      theme.colors.purple};

    box-shadow:
      0 0 14px
        ${({ theme }) =>
          theme.colors.purple}66;

    transform:
      translateY(-50%);

    transition:
      height 0.35s
        cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    padding-left: 10px;

    color: ${({ theme }) =>
      theme.colors.purple};

    background:
      linear-gradient(
        90deg,
        rgba(77, 48, 108, 0.045),
        transparent
      );
  }

  &:hover .label {
    transform: translateX(3px);
  }

  &:hover .arrow {
    opacity: 1;

    transform:
      translate(2px, -2px);
  }

  &:hover::before {
    height: 28px;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 3px;

    border-radius: 4px;
  }

  @media (max-width: 480px) {
    min-height: 62px;

    .label {
      font-size: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      padding-left: 4px;
    }

    &:hover .label {
      transform: none;
    }

    &:hover .arrow {
      transform:
        translate(-4px, 4px);
    }

    &:hover::before {
      height: 0;
    }
  }
`;

/* ========================================
   MOBILE CTA
======================================== */

export const MobileJoinButton = styled.a`
  position: relative;

  overflow: hidden;

  display: flex;

  align-items: center;

  min-height: 66px;

  margin-top: 22px;

  padding: 0 21px;

  border: 1px solid
    rgba(255, 255, 255, 0.12);

  border-radius: ${({ theme }) =>
    theme.radius.pill};

  background:
    linear-gradient(
      135deg,
      ${({ theme }) =>
        theme.colors.purple},
      ${({ theme }) =>
        theme.colors.purpleDark}
    );

  color: ${({ theme }) =>
    theme.colors.white};

  text-decoration: none;

  box-shadow:
    0 16px 35px
      rgba(77, 48, 108, 0.22),
    inset 0 1px 0
      rgba(255, 255, 255, 0.12);

  transition:
    transform 0.35s
      cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s ease;

  .button-glow {
    position: absolute;

    inset: -100%;

    background:
      radial-gradient(
        circle,
        rgba(255, 255, 255, 0.15),
        transparent 45%
      );

    transform: translateX(-30%);

    transition:
      transform 0.6s ease;

    pointer-events: none;
  }

  .mobile-cta-content {
    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;

    justify-content: space-between;

    width: 100%;

    font-size: 11px;

    font-weight: 800;

    letter-spacing: 0.075em;

    text-transform: uppercase;
  }

  .cta-small {
    display: inline-flex;

    align-items: center;

    gap: 5px;

    color: ${({ theme }) =>
      theme.colors.champagneLight};

    font-size: 9px;

    letter-spacing: 0.07em;
  }

  &:hover {
    transform: translateY(-3px);

    box-shadow:
      0 20px 42px
        rgba(77, 48, 108, 0.3),
      inset 0 1px 0
        rgba(255, 255, 255, 0.15);
  }

  &:hover .button-glow {
    transform: translateX(30%);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }

    &:hover .button-glow {
      transform: translateX(-30%);
    }
  }
`;

/* ========================================
   REDUCED MOTION
======================================== */

export const MotionSafe = styled.div`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;