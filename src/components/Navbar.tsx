import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import styled, {
  keyframes,
} from "styled-components";

/* =====================================================
   BASE URL
===================================================== */

const BASE_URL =
  import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

const BASE_PATH =
  BASE_URL.replace(/\/$/, "");

/* =====================================================
   NAVIGATION
===================================================== */

const navigationItems = [
  {
    label: "About",
    href: "about",
    id: "about",
    type: "route",
  },
  {
    label: "Community",
    href: "#community",
    id: "community",
    type: "hash",
  },
  {
    label: "Team",
    href: "team",
    id: "team",
    type: "route",
  },
  {
    label: "How It Works",
    href: "how-it-works",
    id: "how-it-works",
    type: "route",
  },
] as const;

const DESKTOP_BREAKPOINT = 900;

const HEADER_HEIGHT = 82;

const MOBILE_HEADER_HEIGHT = 72;

/* =====================================================
   ROUTING HELPERS
===================================================== */

const homeHref =
  BASE_URL;

const joinHref =
  `${BASE_URL}join`;

const aboutHref =
  `${BASE_URL}about`;

const teamHref =
  `${BASE_URL}team`;

const howItWorksHref =
  `${BASE_URL}how-it-works`;

const isHomePath = () => {
  const pathname =
    window.location.pathname;

  return (
    pathname === BASE_PATH ||
    pathname ===
      `${BASE_PATH}/`
  );
};

/* =====================================================
   ANIMATIONS
===================================================== */

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`;

const shimmer = keyframes`
  0% {
    transform:
      translateX(-140%)
      skewX(-18deg);
  }

  100% {
    transform:
      translateX(220%)
      skewX(-18deg);
  }
`;

const mobileItemReveal = keyframes`
  from {
    opacity: 0;
    transform:
      translateY(10px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }
`;

/* =====================================================
   NAVBAR
===================================================== */

const Navbar = () => {
  const [scrolled, setScrolled] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("");

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const firstMobileLinkRef =
    useRef<HTMLAnchorElement>(null);

  const previousBodyOverflow =
    useRef("");

  /* ===================================================
     CLOSE MENU
  =================================================== */

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  /* ===================================================
     SCROLL STATE
  =================================================== */

  useEffect(() => {
    let ticking = false;

    const updateNavigation = () => {
      const scrollY =
        window.scrollY;

      setScrolled(
        scrollY > 24
      );

      /*
       * Only track sections that
       * actually live on the homepage.
       *
       * About is now its own page,
       * so it is intentionally NOT
       * included here.
       */

      if (!isHomePath()) {
        setActiveSection("");

        ticking = false;

        return;
      }

      const sections =
        navigationItems
          .filter(
            (item) =>
              item.type ===
                "hash"
          )
          .map((item) =>
            document.getElementById(
              item.id
            )
          )
          .filter(
            (
              section
            ): section is HTMLElement =>
              section instanceof
              HTMLElement
          );

      if (
        scrollY < 70 ||
        sections.length === 0
      ) {
        setActiveSection("");

        ticking = false;

        return;
      }

      const activationPoint =
        window.innerHeight *
        0.28;

      let currentSection = "";

      for (
        const section of sections
      ) {
        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <=
          activationPoint
        ) {
          currentSection =
            section.id;
        } else {
          break;
        }
      }

      setActiveSection(
        currentSection
      );

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(
        updateNavigation
      );
    };

    updateNavigation();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  /* ===================================================
     MOBILE MENU
  =================================================== */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow =
        previousBodyOverflow.current;

      return;
    }

    previousBodyOverflow.current =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const focusTimer =
      window.setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 120);

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        closeMenu();

        window.setTimeout(() => {
          menuButtonRef.current?.focus();
        }, 50);
      }
    };

    const handleResize = () => {
      if (
        window.innerWidth >=
        DESKTOP_BREAKPOINT
      ) {
        closeMenu();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.clearTimeout(
        focusTimer
      );

      document.body.style.overflow =
        previousBodyOverflow.current;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    menuOpen,
    closeMenu,
  ]);

  /* ===================================================
     HASH SCROLL
  =================================================== */

  const scrollToHash = useCallback(
    (
      hash: string,
      behavior: ScrollBehavior =
        "smooth"
    ) => {
      const target =
        document.getElementById(
          hash
        );

      if (!target) return;

      const offset =
        window.innerWidth <= 768
          ? MOBILE_HEADER_HEIGHT
          : HEADER_HEIGHT;

      const position =
        target.getBoundingClientRect()
          .top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(
          0,
          position
        ),
        behavior,
      });

      setActiveSection(hash);
    },
    []
  );

  /* ===================================================
     HASH ON INITIAL LOAD
  =================================================== */

  useEffect(() => {
    if (!isHomePath()) {
      return;
    }

    const hash =
      window.location.hash.replace(
        /^#/,
        ""
      );

    if (!hash) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        scrollToHash(
          hash,
          "auto"
        );
      }, 150);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    scrollToHash,
  ]);

  /* ===================================================
     NAVIGATION HANDLER
  =================================================== */

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    item:
      (typeof navigationItems)[number]
  ) => {
    closeMenu();

    /*
     * ROUTE NAVIGATION
     *
     * About
     * Team
     * How It Works
     */

    if (
      item.type === "route"
    ) {
      return;
    }

    /*
     * HASH NAVIGATION
     *
     * Community
     */

    const target =
      document.getElementById(
        item.id
      );

    /*
     * If we're not on the
     * homepage or the section
     * doesn't exist, allow the
     * browser to navigate normally.
     */

    if (
      !isHomePath() ||
      !target
    ) {
      return;
    }

    event.preventDefault();

    const offset =
      window.innerWidth <= 768
        ? MOBILE_HEADER_HEIGHT
        : HEADER_HEIGHT;

    const targetPosition =
      target.getBoundingClientRect()
        .top +
      window.scrollY -
      offset;

    const newUrl =
      `${BASE_URL}#${item.id}`;

    window.history.pushState(
      null,
      "",
      newUrl
    );

    window.scrollTo({
      top: Math.max(
        0,
        targetPosition
      ),
      behavior: "smooth",
    });

    setActiveSection(
      item.id
    );
  };

  /* ===================================================
     LOGO
  =================================================== */

  const handleLogoClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    closeMenu();

    if (!isHomePath()) {
      return;
    }

    event.preventDefault();

    window.history.replaceState(
      null,
      "",
      homeHref
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveSection("");
  };

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <Header
        $scrolled={scrolled}
        $menuOpen={menuOpen}
      >
        <HeaderInner>

          {/* =================================================
              LOGO
          ================================================= */}

          <Logo
            href={homeHref}
            aria-label="Regal Affluence home"
            onClick={
              handleLogoClick
            }
          >
            <LogoImage
              src={`${BASE_URL}images/regal-affluence-logo.png`}
              alt="Regal Affluence"
              draggable={false}
            />
          </Logo>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <DesktopNav
            aria-label="Primary navigation"
          >
            {navigationItems.map(
              (item) => {
                const active =
                  item.type ===
                    "hash" &&
                  activeSection ===
                    item.id;

                const href =
                  item.type ===
                  "hash"
                    ? `${BASE_URL}${item.href}`
                    : item.id ===
                      "about"
                      ? aboutHref
                      : item.id ===
                        "team"
                        ? teamHref
                        : howItWorksHref;

                return (
                  <NavItem
                    key={item.id}
                    href={href}
                    $active={active}
                    aria-current={
                      active
                        ? "location"
                        : undefined
                    }
                    onClick={(
                      event
                    ) =>
                      handleNavigation(
                        event,
                        item
                      )
                    }
                  >
                    <span className="nav-text">
                      {item.label}
                    </span>

                    <span
                      className="nav-indicator"
                      aria-hidden="true"
                    />
                  </NavItem>
                );
              }
            )}
          </DesktopNav>

          {/* =================================================
              CTA
          ================================================= */}

          <JoinButton
            href={joinHref}
            aria-label="Join the Regal Affluence community"
          >
            <span
              className="button-shine"
              aria-hidden="true"
            />

            <span className="button-content">
              <span>
                Join Community
              </span>

              <span
                className="button-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </JoinButton>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <MenuButton
            ref={menuButtonRef}
            type="button"
            $open={menuOpen}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              menuOpen
            }
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current
              )
            }
          >
            <span className="menu-text">
              {menuOpen
                ? "Close"
                : "Menu"}
            </span>

            <span
              className="menu-icon"
              aria-hidden="true"
            >
              <span
                className={
                  menuOpen
                    ? "line line-one open"
                    : "line line-one"
                }
              />

              <span
                className={
                  menuOpen
                    ? "line line-two open"
                    : "line line-two"
                }
              />
            </span>
          </MenuButton>

        </HeaderInner>
      </Header>

      {/* =================================================
          MOBILE BACKDROP
      ================================================= */}

      <MobileBackdrop
        $open={menuOpen}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      <MobileMenu
        id="mobile-navigation"
        $open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="menu-glow" />

        <div className="menu-inner">

          {/* =================================================
              INTRO
          ================================================= */}

          <div className="mobile-intro">
            <span className="intro-line" />

            <span className="intro-label">
              REGAL AFFLUENCE
            </span>

            <span className="intro-mark">
              ✦
            </span>
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="mobile-heading">
            <span>
              Explore.
            </span>

            <span className="heading-muted">
              Connect.
            </span>
          </div>

          {/* =================================================
              MOBILE NAV
          ================================================= */}

          <MobileNav
            aria-label="Mobile navigation"
          >
            {navigationItems.map(
              (item, index) => {
                const active =
                  item.type ===
                    "hash" &&
                  activeSection ===
                    item.id;

                const href =
                  item.type ===
                  "hash"
                    ? `${BASE_URL}${item.href}`
                    : item.id ===
                      "about"
                      ? aboutHref
                      : item.id ===
                        "team"
                        ? teamHref
                        : howItWorksHref;

                return (
                  <MobileNavItem
                    key={item.id}
                    ref={
                      index === 0
                        ? firstMobileLinkRef
                        : undefined
                    }
                    href={href}
                    $active={active}
                    style={{
                      animationDelay:
                        `${index * 70}ms`,
                    }}
                    onClick={(
                      event
                    ) =>
                      handleNavigation(
                        event,
                        item
                      )
                    }
                  >
                    <span className="number">
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="label">
                      {item.label}
                    </span>

                    <span
                      className="arrow"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </MobileNavItem>
                );
              }
            )}
          </MobileNav>

          {/* =================================================
              MOBILE CTA
          ================================================= */}

          <MobileJoinButton
            href={joinHref}
            onClick={
              closeMenu
            }
          >
            <span className="mobile-cta-main">
              Join Community
            </span>

            <span className="mobile-cta-meta">
              It's Free

              <span aria-hidden="true">
                ↗
              </span>
            </span>
          </MobileJoinButton>

          {/* =================================================
              MOBILE FOOTER
          ================================================= */}

          <div className="mobile-footer">
            <span>
              BUILD. CONNECT. ELEVATE.
            </span>

            <span>
              REGAL AFFLUENCE GROUP
            </span>
          </div>

        </div>
      </MobileMenu>
    </>
  );
};

export default Navbar;

/* =====================================================
   HEADER
===================================================== */

const Header = styled.header<{
  $scrolled: boolean;
  $menuOpen: boolean;
}>`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 1000;

  width: 100%;

  padding: 13px 0;

  background:
    linear-gradient(
      110deg,
      rgba(243, 237, 255, 0.96),
      rgba(250, 248, 243, 0.97),
      rgba(238, 231, 250, 0.96)
    );

  background-size:
    180% 180%;

  backdrop-filter:
    blur(18px)
    saturate(125%);

  -webkit-backdrop-filter:
    blur(18px)
    saturate(125%);

  border-bottom:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  box-shadow:
    ${({ $scrolled }) =>
      $scrolled
        ? "0 10px 35px rgba(48, 28, 72, 0.10)"
        : "0 4px 18px rgba(48, 28, 72, 0.04)"};

  transition:
    box-shadow 0.35s ease,
    background 0.35s ease;

  animation:
    ${gradientShift}
    18s ease infinite;

  @media (max-width: 900px) {
    padding: 10px 0;

    background:
      linear-gradient(
        120deg,
        rgba(243, 237, 255, 0.98),
        rgba(250, 248, 243, 0.98),
        rgba(238, 231, 250, 0.98)
      );
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    animation: none;

    transition: none;
  }
`;

/* =====================================================
   HEADER INNER
===================================================== */

const HeaderInner = styled.div`
  width:
    min(
      calc(100% - 64px),
      1360px
    );

  min-height: 56px;

  margin: 0 auto;

  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 30px;

  @media (max-width: 1180px) {
    width:
      min(
        calc(100% - 48px),
        1360px
      );

    gap: 20px;
  }

  @media (max-width: 900px) {
    min-height: 52px;

    width:
      min(
        calc(100% - 36px),
        1360px
      );
  }

  @media (max-width: 480px) {
    min-height: 52px;

    width:
      min(
        calc(100% - 28px),
        1360px
      );
  }
`;

/* =====================================================
   LOGO
===================================================== */

const Logo = styled.a`
  display: inline-flex;

  align-items: center;

  flex-shrink: 0;

  text-decoration: none;

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    transform:
      translateY(-1px);
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.purple};

    outline-offset: 6px;

    border-radius: 6px;
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* =====================================================
   LOGO IMAGE
===================================================== */

const LogoImage = styled.img`
  display: block;

  width: 175px;

  height: auto;

  object-fit: contain;

  user-select: none;

  @media (max-width: 900px) {
    width: 155px;
  }

  @media (max-width: 480px) {
    width: 140px;
  }
`;

/* =====================================================
   DESKTOP NAV
===================================================== */

const DesktopNav = styled.nav`
  display: flex;

  align-items: center;

  gap: 4px;

  margin-left: auto;

  margin-right: 8px;

  @media (max-width: 1180px) {
    gap: 0;

    margin-right: 4px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

/* =====================================================
   NAV ITEM
===================================================== */

const NavItem = styled.a<{
  $active: boolean;
}>`
  position: relative;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 42px;

  padding:
    0 15px;

  color:
    ${({ $active, theme }) =>
      $active
        ? theme.colors.purple
        : theme.colors.text};

  font-size: 11px;

  font-weight: 700;

  letter-spacing:
    0.045em;

  text-decoration: none;

  white-space: nowrap;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  .nav-text {
    position: relative;

    z-index: 2;
  }

  .nav-indicator {
    position: absolute;

    left: 14px;
    right: 14px;

    bottom: 5px;

    height: 2px;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) =>
          theme.colors.purple},
        ${({ theme }) =>
          theme.colors.champagne}
      );

    transform:
      scaleX(
        ${({ $active }) =>
          $active ? 1 : 0}
      );

    transform-origin:
      center;

    opacity:
      ${({ $active }) =>
        $active ? 1 : 0};

    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  &:hover {
    color:
      ${({ theme }) =>
        theme.colors.purple};

    transform:
      translateY(-1px);
  }

  &:hover .nav-indicator {
    transform:
      scaleX(1);

    opacity: 1;
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.purple};

    outline-offset: 4px;

    border-radius: 6px;
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

/* =====================================================
   JOIN BUTTON
===================================================== */

const JoinButton = styled.a`
  position: relative;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 46px;

  padding:
    0 21px;

  overflow: hidden;

  flex-shrink: 0;

  border:
    1px solid
    rgba(
      91,
      33,
      182,
      0.12
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  background:
    linear-gradient(
      135deg,
      ${({ theme }) =>
        theme.colors.purple},
      #7652a8
    );

  color:
    ${({ theme }) =>
      theme.colors.white};

  font-size: 11px;

  font-weight: 800;

  letter-spacing:
    0.07em;

  text-decoration: none;

  text-transform:
    uppercase;

  box-shadow:
    0
    9px
    26px
    rgba(
      91,
      33,
      182,
      0.17
    );

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  .button-shine {
    position: absolute;

    top: -30%;

    left: -110%;

    width: 55%;

    height: 160%;

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(
          255,
          255,
          255,
          0.4
        ),
        transparent
      );

    transform:
      skewX(-18deg);

    pointer-events: none;
  }

  .button-content {
    position: relative;

    z-index: 2;

    display: inline-flex;

    align-items: center;

    gap: 10px;
  }

  .button-arrow {
    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.3s ease;
  }

  &:hover {
    transform:
      translateY(-2px);

    box-shadow:
      0
      14px
      32px
      rgba(
        91,
        33,
        182,
        0.25
      );
  }

  &:hover .button-shine {
    animation:
      ${shimmer}
      0.8s
      ease
      forwards;
  }

  &:hover .button-arrow {
    transform:
      translate(
        2px,
        -2px
      );
  }

  &:active {
    transform:
      translateY(0)
      scale(0.99);
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset: 5px;
  }

  @media (max-width: 900px) {
    display: none;
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    &:hover,
    &:active {
      transform: none;
    }

    &:hover .button-shine {
      animation: none;
    }

    &:hover .button-arrow {
      transform: none;
    }
  }
`;

/* =====================================================
   MOBILE MENU BUTTON
===================================================== */

const MenuButton = styled.button<{
  $open: boolean;
}>`
  display: none;

  align-items: center;

  justify-content: center;

  gap: 9px;

  width: 82px;

  height: 42px;

  padding: 0;

  border:
    1px solid
    rgba(
      91,
      33,
      182,
      0.14
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  background:
    rgba(
      255,
      255,
      255,
      0.42
    );

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  cursor: pointer;

  backdrop-filter:
    blur(10px);

  -webkit-backdrop-filter:
    blur(10px);

  transition:
    transform 0.25s ease,
    background 0.25s ease;

  .menu-text {
    font-size: 10px;

    font-weight: 800;

    letter-spacing:
      0.12em;

    text-transform:
      uppercase;
  }

  .menu-icon {
    display: flex;

    flex-direction:
      column;

    justify-content:
      center;

    gap: 4px;
  }

  .line {
    display: block;

    width: 16px;

    height: 1px;

    background:
      currentColor;

    transform-origin:
      center;

    transition:
      transform 0.3s ease;
  }

  .line-one.open {
    transform:
      translateY(2.5px)
      rotate(45deg);
  }

  .line-two.open {
    transform:
      translateY(-2.5px)
      rotate(-45deg);
  }

  &:hover {
    transform:
      translateY(-1px);

    background:
      rgba(
        255,
        255,
        255,
        0.62
      );
  }

  &:active {
    transform:
      scale(0.97);
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.purple};

    outline-offset: 4px;
  }

  @media (max-width: 900px) {
    display: flex;
  }

  @media (max-width: 480px) {
    width: 76px;

    height: 40px;
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    .line {
      transition: none;
    }

    &:hover,
    &:active {
      transform: none;
    }
  }
`;

/* =====================================================
   MOBILE BACKDROP
===================================================== */

const MobileBackdrop = styled.div<{
  $open: boolean;
}>`
  position: fixed;

  inset: 0;

  z-index: 998;

  background:
    rgba(
      32,
      18,
      50,
      0.48
    );

  backdrop-filter:
    blur(7px);

  -webkit-backdrop-filter:
    blur(7px);

  opacity:
    ${({ $open }) =>
      $open ? 1 : 0};

  visibility:
    ${({ $open }) =>
      $open
        ? "visible"
        : "hidden"};

  pointer-events:
    ${({ $open }) =>
      $open
        ? "auto"
        : "none"};

  transition:
    opacity 0.35s ease,
    visibility 0.35s ease;

  @media (min-width: 901px) {
    display: none;
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;
  }
`;

/* =====================================================
   MOBILE MENU
===================================================== */

const MobileMenu = styled.div<{
  $open: boolean;
}>`
  position: fixed;

  top: 84px;

  left: 12px;

  right: 12px;

  z-index: 999;

  max-height:
    calc(
      100vh - 98px
    );

  overflow-y: auto;

  border:
    1px solid
    rgba(
      91,
      33,
      182,
      0.12
    );

  border-radius: 24px;

  background:
    linear-gradient(
      145deg,
      rgba(
        246,
        241,
        255,
        0.98
      ),
      rgba(
        250,
        248,
        243,
        0.98
      ),
      rgba(
        239,
        232,
        251,
        0.98
      )
    );

  box-shadow:
    0
    28px
    80px
    rgba(
      38,
      22,
      57,
      0.2
    );

  opacity:
    ${({ $open }) =>
      $open ? 1 : 0};

  visibility:
    ${({ $open }) =>
      $open
        ? "visible"
        : "hidden"};

  pointer-events:
    ${({ $open }) =>
      $open
        ? "auto"
        : "none"};

  transform:
    ${({ $open }) =>
      $open
        ? "translateY(0) scale(1)"
        : "translateY(-10px) scale(.98)"};

  transition:
    opacity 0.3s ease,
    transform 0.4s
      cubic-bezier(
        0.16,
        1,
        0.3,
        1
      ),
    visibility 0.3s ease;

  .menu-glow {
    position: absolute;

    top: -90px;

    right: -80px;

    width: 230px;

    height: 230px;

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(
          123,
          84,
          181,
          0.16
        ),
        transparent 68%
      );

    filter:
      blur(30px);

    pointer-events:
      none;
  }

  .menu-inner {
    position: relative;

    z-index: 1;

    padding:
      28px
      24px
      22px;
  }

  .mobile-intro {
    display: flex;

    align-items: center;

    gap: 9px;

    margin-bottom:
      15px;

    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.16em;
  }

  .intro-line {
    width: 24px;

    height: 1px;

    background:
      ${({ theme }) =>
        theme.colors.champagne};
  }

  .intro-mark {
    margin-left: auto;

    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size: 11px;
  }

  .mobile-heading {
    display: flex;

    flex-direction:
      column;

    margin-bottom:
      24px;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size: 38px;

    font-weight: 500;

    line-height:
      0.94;

    letter-spacing:
      -0.045em;
  }

  .heading-muted {
    color:
      ${({ theme }) =>
        theme.colors.textMuted};
  }

  .mobile-footer {
    display: flex;

    align-items: center;

    justify-content:
      space-between;

    gap: 12px;

    margin-top:
      20px;

    padding-top:
      17px;

    border-top:
      1px solid
      ${({ theme }) =>
        theme.colors.border};

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 8px;

    font-weight: 800;

    letter-spacing:
      0.09em;
  }

  @media (max-width: 768px) {
    top: 78px;
  }

  @media (max-width: 480px) {
    top: 76px;

    left: 8px;

    right: 8px;

    max-height:
      calc(
        100vh - 86px
      );

    border-radius:
      21px;

    .menu-inner {
      padding:
        24px
        20px
        18px;
    }

    .mobile-heading {
      font-size: 34px;
    }
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    transform: none;
  }
`;

/* =====================================================
   MOBILE NAV
===================================================== */

const MobileNav = styled.nav`
  display: flex;

  flex-direction:
    column;

  border-top:
    1px solid
    ${({ theme }) =>
      theme.colors.border};
`;

/* =====================================================
   MOBILE NAV ITEM
===================================================== */

const MobileNavItem = styled.a<{
  $active: boolean;
}>`
  position: relative;

  display: grid;

  grid-template-columns:
    30px
    1fr
    24px;

  align-items: center;

  min-height: 66px;

  gap: 8px;

  padding: 0 3px;

  border-bottom:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  color:
    ${({ $active, theme }) =>
      $active
        ? theme.colors.purple
        : theme.colors.text};

  text-decoration: none;

  animation:
    ${mobileItemReveal}
    0.45s
    ease
    both;

  .number {
    color:
      ${({ $active, theme }) =>
        $active
          ? theme.colors.champagne
          : theme.colors.textMuted};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.08em;
  }

  .label {
    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size: 23px;

    font-weight: 500;

    letter-spacing:
      -0.025em;

    transition:
      transform 0.25s ease;
  }

  .arrow {
    justify-self: end;

    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size: 16px;

    opacity:
      ${({ $active }) =>
        $active ? 1 : 0.35};

    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  &::before {
    content: "";

    position: absolute;

    left: -12px;

    top: 50%;

    width: 3px;

    height: 0;

    border-radius: 999px;

    background:
      ${({ theme }) =>
        theme.colors.purple};

    transform:
      translateY(-50%);

    transition:
      height 0.3s ease;
  }

  &:hover {
    color:
      ${({ theme }) =>
        theme.colors.purple};

    .label {
      transform:
        translateX(3px);
    }

    .arrow {
      opacity: 1;

      transform:
        translate(
          2px,
          -2px
        );
    }

    &::before {
      height: 28px;
    }
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.purple};

    outline-offset: 3px;

    border-radius: 5px;
  }

  @media (max-width: 480px) {
    min-height: 62px;

    .label {
      font-size: 21px;
    }
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    animation: none;

    .label,
    .arrow {
      transition: none;
    }

    &:hover .label {
      transform: none;
    }

    &::before {
      transition: none;
    }
  }
`;

/* =====================================================
   MOBILE CTA
===================================================== */

const MobileJoinButton =
  styled.a`
    display: flex;

    align-items: center;

    justify-content:
      space-between;

    gap: 16px;

    min-height: 62px;

    margin-top: 20px;

    padding:
      0 20px;

    border-radius:
      ${({ theme }) =>
        theme.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({ theme }) =>
          theme.colors.purple},
        #7551a7
      );

    color:
      ${({ theme }) =>
        theme.colors.white};

    text-decoration: none;

    box-shadow:
      0
      14px
      32px
      rgba(
        91,
        33,
        182,
        0.19
      );

    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;

    .mobile-cta-main {
      font-size: 11px;

      font-weight: 800;

      letter-spacing:
        0.065em;

      text-transform:
        uppercase;
    }

    .mobile-cta-meta {
      display: inline-flex;

      align-items: center;

      gap: 6px;

      color:
        ${({ theme }) =>
          theme.colors.champagneLight};

      font-size: 10px;

      font-weight: 700;

      letter-spacing:
        0.05em;
    }

    &:hover {
      transform:
        translateY(-2px);

      box-shadow:
        0
        18px
        36px
        rgba(
          91,
          33,
          182,
          0.26
        );
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.champagne};

      outline-offset: 5px;
    }

    @media (
      prefers-reduced-motion: reduce
    ) {
      transition: none;

      &:hover {
        transform: none;
      }
    }
  `;