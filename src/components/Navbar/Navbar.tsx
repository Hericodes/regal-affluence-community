import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import {
  Header,
  Container,
  Logo,
  LogoImage,
  DesktopNav,
  NavLink,
  JoinButton,
  MenuButton,
  MenuLine,
  MobileBackdrop,
  MobileMenu,
  MobileNav,
  MobileNavLink,
  MobileJoinButton,
  ScrollProgress,
} from "./Navbar.styles";

/* ========================================
   NAVIGATION
======================================== */

const navigationItems = [
  {
    label: "About",
    href: "/#about",
    id: "about",
  },
  {
    label: "Why Join",
    href: "/#benefits",
    id: "benefits",
  },
  {
    label: "Community",
    href: "/#community",
    id: "community",
  },
  {
    label: "How It Works",
    href: "/#how-it-works",
    id: "how-it-works",
  },
  {
    label: "Who It's For",
    href: "/#who-its-for",
    id: "who-its-for",
  },
] as const;

const HEADER_OFFSET = 88;
const DESKTOP_BREAKPOINT = 900;
const MOBILE_SCROLL_OFFSET = 76;

/* ========================================
   NAVBAR
======================================== */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const firstMobileLinkRef =
    useRef<HTMLAnchorElement>(null);

  const previousBodyOverflowRef =
    useRef<string>("");

  /* ========================================
     CLOSE MENU
  ======================================== */

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  /* ========================================
     SCROLL STATE + ACTIVE SECTION
  ======================================== */

  useEffect(() => {
    let ticking = false;

    const updateNavigation = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 28);

      const sections = navigationItems
        .map((item) =>
          document.getElementById(item.id)
        )
        .filter(
          (section): section is HTMLElement =>
            section instanceof HTMLElement
        );

      if (
        scrollY < 80 ||
        sections.length === 0
      ) {
        setActiveSection("");
        ticking = false;
        return;
      }

      const activationPoint =
        window.innerHeight * 0.28;

      let currentSection = "";

      for (const section of sections) {
        const rect =
          section.getBoundingClientRect();

        if (rect.top <= activationPoint) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);

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

      ticking = false;
    };
  }, []);

  /* ========================================
     MOBILE MENU
  ======================================== */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow =
        previousBodyOverflowRef.current;

      return;
    }

    previousBodyOverflowRef.current =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 120);

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
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
      window.clearTimeout(focusTimer);

      document.body.style.overflow =
        previousBodyOverflowRef.current;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [menuOpen, closeMenu]);

  /* ========================================
     HASH / DEEP LINK SUPPORT
  ======================================== */

  const scrollToHash = useCallback(
    (behavior: ScrollBehavior = "auto") => {
      const hash = window.location.hash.replace(
        /^#/,
        ""
      );

      if (!hash) {
        setActiveSection("");
        return;
      }

      const target =
        document.getElementById(hash);

      if (!target) return;

      const offset =
        window.innerWidth <= 768
          ? MOBILE_SCROLL_OFFSET
          : HEADER_OFFSET;

      const position =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: Math.max(0, position),
        behavior,
      });

      setActiveSection(hash);
    },
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollToHash("auto");
    }, 120);

    const handleHashChange = () => {
      scrollToHash("smooth");
    };

    window.addEventListener(
      "hashchange",
      handleHashChange
    );

    return () => {
      window.clearTimeout(timer);

      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, [scrollToHash]);

  /* ========================================
     NAVIGATION
  ======================================== */

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const hashIndex = href.indexOf("#");

    if (hashIndex === -1) {
      closeMenu();
      return;
    }

    const hash = href.slice(
      hashIndex + 1
    );

    if (!hash) {
      closeMenu();
      return;
    }

    const isHomePage =
      window.location.pathname === "/";

    const target =
      document.getElementById(hash);

    if (!isHomePage || !target) {
      closeMenu();
      return;
    }

    event.preventDefault();

    closeMenu();

    const offset =
      window.innerWidth <= 768
        ? MOBILE_SCROLL_OFFSET
        : HEADER_OFFSET;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.history.pushState(
      null,
      "",
      `/#${hash}`
    );

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setActiveSection(hash);
  };

  /* ========================================
     LOGO
  ======================================== */

  const handleLogoClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    closeMenu();

    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    window.history.replaceState(
      null,
      "",
      "/"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveSection("");
  };

  /* ========================================
     RENDER
  ======================================== */

  return (
    <>
      <Header
        $scrolled={scrolled}
        $menuOpen={menuOpen}
      >
        {/* FIXED: Render ScrollProgress as a component */}
        <ScrollProgress
          $scrolled={scrolled}
        />

        <Container>
          {/* ==================================
              BRAND
          ================================== */}

          <Logo
            href="/"
            $scrolled={scrolled}
            aria-label="Regal Affluence home"
            onClick={handleLogoClick}
          >
            <LogoImage
              src="/images/regal-affluence-logo.png"
              alt="Regal Affluence"
              draggable={false}
            />

            <span
              className="logo-glow"
              aria-hidden="true"
            />
          </Logo>

          {/* ==================================
              DESKTOP NAVIGATION
          ================================== */}

          <DesktopNav
            aria-label="Primary navigation"
          >
            <span
              className="nav-orbit"
              aria-hidden="true"
            />

            {navigationItems.map((item) => {
              const active =
                activeSection === item.id;

              return (
                <NavLink
                  key={item.id}
                  href={item.href}
                  $scrolled={scrolled}
                  $active={active}
                  aria-current={
                    active
                      ? "location"
                      : undefined
                  }
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      item.href
                    )
                  }
                >
                  <span
                    className="nav-dot"
                    aria-hidden="true"
                  />

                  <span className="nav-label">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </DesktopNav>

          {/* ==================================
              DESKTOP CTA
          ================================== */}

          <JoinButton
            href="/join"
            $scrolled={scrolled}
            aria-label="Join the Regal Affluence community"
          >
            <span
              className="cta-shine"
              aria-hidden="true"
            />

            <span className="cta-content">
              <span>Join Community</span>

              <span
                className="arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </JoinButton>

          {/* ==================================
              MOBILE MENU BUTTON
          ================================== */}

          <MenuButton
            ref={menuButtonRef}
            type="button"
            $scrolled={scrolled}
            $open={menuOpen}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (current) => !current
              )
            }
          >
            <span className="menu-label">
              {menuOpen
                ? "Close"
                : "Menu"}
            </span>

            <span
              className="menu-icon"
              aria-hidden="true"
            >
              <MenuLine
                $open={menuOpen}
                $index={0}
              />

              <MenuLine
                $open={menuOpen}
                $index={1}
              />
            </span>
          </MenuButton>
        </Container>
      </Header>

      {/* ======================================
          MOBILE BACKDROP
      ====================================== */}

      <MobileBackdrop
        $open={menuOpen}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* ======================================
          MOBILE MENU
      ====================================== */}

      <MobileMenu
        id="mobile-navigation"
        $open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div
          className="mobile-menu-glow"
          aria-hidden="true"
        />

        <div className="mobile-menu-inner">
          {/* MENU HEADER */}

          <div className="mobile-menu-eyebrow">
            <span className="eyebrow-line" />

            <span>
              REGAL AFFLUENCE
            </span>

            <span
              className="eyebrow-star"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>

          <div className="mobile-menu-heading">
            <span>Explore.</span>

            <span className="muted">
              Connect.
            </span>
          </div>

          {/* NAV */}

          <MobileNav
            aria-label="Mobile navigation"
          >
            {navigationItems.map(
              (item, index) => {
                const active =
                  activeSection === item.id;

                return (
                  <MobileNavLink
                    key={item.id}
                    ref={
                      index === 0
                        ? firstMobileLinkRef
                        : undefined
                    }
                    href={item.href}
                    $active={active}
                    $index={index}
                    aria-current={
                      active
                        ? "location"
                        : undefined
                    }
                    onClick={(event) =>
                      handleNavigation(
                        event,
                        item.href
                      )
                    }
                  >
                    <span
                      className="number"
                      aria-hidden="true"
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
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
                  </MobileNavLink>
                );
              }
            )}
          </MobileNav>

          {/* CTA */}

          <MobileJoinButton
            href="/join"
            onClick={closeMenu}
          >
            <span
              className="button-glow"
              aria-hidden="true"
            />

            <span className="mobile-cta-content">
              <span>
                Join Community
              </span>

              <span className="cta-small">
                It's Free
                <span aria-hidden="true">
                  {" "}↗
                </span>
              </span>
            </span>
          </MobileJoinButton>

          {/* FOOTER */}

          <div className="mobile-menu-footer">
            <span>
              BUILD. CONNECT. ELEVATE.
            </span>

            <span className="status">
              <i aria-hidden="true" />
              COMMUNITY IS OPEN
            </span>
          </div>
        </div>
      </MobileMenu>
    </>
  );
};

export default Navbar;