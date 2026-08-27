import styled, {
  keyframes,
} from "styled-components";

/* =====================================================
   TYPES
===================================================== */

type GlowPosition =
  | "left"
  | "right";

/* =====================================================
   ANIMATIONS
===================================================== */

const footerGradient = keyframes`
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

const ambientFloat = keyframes`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(0, -18px, 0)
      scale(1.06);
  }
`;

const footerShimmer = keyframes`
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

const logoGlow = keyframes`
  0%,
  100% {
    opacity: 0.88;
  }

  50% {
    opacity: 1;
  }
`;

/* =====================================================
   BASE URL
===================================================== */

const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/* =====================================================
   FOOTER
===================================================== */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Section>
      {/* =================================================
          ATMOSPHERE
      ================================================= */}

      <BackgroundGlow
        $position="left"
        aria-hidden="true"
      />

      <BackgroundGlow
        $position="right"
        aria-hidden="true"
      />

      <DecorativeLine
        aria-hidden="true"
      />

      <Container>
        {/* =================================================
            TOP
        ================================================= */}

        <Top>
          {/* =================================================
              BRAND
          ================================================= */}

          <Brand>
            <BrandLogo
              src={`${BASE_URL}images/regal-affluence-logo.png`}
              alt="Regal Affluence"
              draggable={false}
            />

            <BrandEyebrow>
              THE REGAL AFFLUENCE GROUP
            </BrandEyebrow>

            <BrandName>
              Build relationships.
              <br />
              <span>
                Build wealth.
              </span>
            </BrandName>

            <BrandDescription>
              A professional community built around
              relationships, knowledge, opportunities,
              real estate, and long-term growth.
            </BrandDescription>

            {/* =============================================
                APPLICATION CTA
                WhatsApp is intentionally NOT exposed here.
            ============================================== */}

            <CommunityLink
              href={`${BASE_URL}join`}
              aria-label="Apply to join the Regal Affluence community"
            >
              <span>
                Apply to Join
              </span>

              <CommunityArrow
                aria-hidden="true"
              >
                ↗
              </CommunityArrow>
            </CommunityLink>
          </Brand>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <Links>
            {/* =================================================
                EXPLORE
            ================================================= */}

            <LinkGroup>
              <LinkTitle>
                Explore
              </LinkTitle>

              <LinkList>
                <li>
                  <FooterLink
                    href={`${BASE_URL}#about`}
                  >
                    <span>
                      About
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href={`${BASE_URL}#community`}
                  >
                    <span>
                      Community
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href={`${BASE_URL}benefits`}
                  >
                    <span>
                      Why Join
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href={`${BASE_URL}how-it-works`}
                  >
                    <span>
                      How It Works
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href={`${BASE_URL}who-its-for`}
                  >
                    <span>
                      Who It's For
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>
              </LinkList>
            </LinkGroup>

            {/* =================================================
                CONNECT
            ================================================= */}

            <LinkGroup>
              <LinkTitle>
                Connect
              </LinkTitle>

              <LinkList>
                <li>
                  <FooterLink
                    href={`${BASE_URL}join`}
                  >
                    <span>
                      Apply to Join
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="https://www.instagram.com/regal_affluence_group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      Instagram
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="https://regalaffluencerealty.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      Regal Affluence Realty
                    </span>

                    <LinkArrow
                      aria-hidden="true"
                    >
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>
              </LinkList>
            </LinkGroup>
          </Links>
        </Top>

        {/* =================================================
            LARGE BRAND STATEMENT
        ================================================= */}

        <BottomBrand
          aria-hidden="true"
        >
          <span className="word">
            REGAL
          </span>

          <span className="dot">
            •
          </span>

          <span className="word">
            AFFLUENCE
          </span>
        </BottomBrand>

        {/* =================================================
            BOTTOM
        ================================================= */}

        <Bottom>
          <Copyright>
            © {currentYear} Regal Affluence.
            All rights reserved.
          </Copyright>

          <Legal>
            <LegalLink
              href={`${BASE_URL}privacy`}
            >
              Privacy Policy
            </LegalLink>

            <LegalLink
              href={`${BASE_URL}terms`}
            >
              Terms &amp; Conditions
            </LegalLink>
          </Legal>
        </Bottom>
      </Container>
    </Section>
  );
};

export default Footer;

/* =====================================================
   SECTION
===================================================== */

const Section = styled.footer`
  position: relative;

  width: 100%;

  overflow: hidden;

  isolation: isolate;

  padding:
    105px 0 30px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  /*
   * RICH LUXURY GRADIENT
   *
   * Lavender
   * Warm champagne
   * Ivory
   * Muted lilac
   * Soft purple
   */

  background:
    radial-gradient(
      circle at 8% 18%,
      rgba(
        116,
        76,
        164,
        0.18
      ),
      transparent 30%
    ),
    radial-gradient(
      circle at 92% 78%,
      rgba(
        201,
        169,
        110,
        0.16
      ),
      transparent 28%
    ),
    linear-gradient(
      115deg,
      #d2bfe2 0%,
      #e4d1ca 23%,
      #f0e3d2 43%,
      #ebe0ee 61%,
      #d7c4e4 80%,
      #c3acd5 100%
    );

  background-size:
    auto,
    auto,
    180% 180%;

  background-position:
    center,
    center,
    0% 50%;

  animation:
    ${footerGradient}
    20s
    ease-in-out
    infinite;

  /*
   * Architectural grid.
   */

  &::before {
    content: "";

    position: absolute;

    inset: 0;

    z-index: -2;

    pointer-events: none;

    opacity: 0.28;

    background-image:
      linear-gradient(
        rgba(
          69,
          35,
          105,
          0.045
        ) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(
          69,
          35,
          105,
          0.045
        ) 1px,
        transparent 1px
      );

    background-size:
      85px 85px;

    mask-image:
      linear-gradient(
        to bottom,
        transparent 0%,
        black 16%,
        black 84%,
        transparent 100%
      );
  }

  /*
   * Soft central highlight.
   */

  &::after {
    content: "";

    position: absolute;

    left: 50%;

    top: 48%;

    width: 55vw;

    height: 55vw;

    max-width: 720px;

    max-height: 720px;

    transform:
      translate(
        -50%,
        -50%
      );

    border-radius: 50%;

    background:
      radial-gradient(
        circle,
        rgba(
          255,
          250,
          240,
          0.18
        ),
        transparent 68%
      );

    pointer-events: none;

    z-index: -1;
  }

  @media (max-width: 768px) {
    padding:
      80px 0 26px;
  }

  @media (max-width: 480px) {
    padding:
      68px 0 24px;
  }

  @media (
    prefers-reduced-motion:
      reduce
  ) {
    animation: none;
  }
`;

/* =====================================================
   BACKGROUND GLOW
===================================================== */

interface BackgroundGlowProps {
  $position: GlowPosition;
}

const BackgroundGlow =
  styled.div<BackgroundGlowProps>`
    position: absolute;

    z-index: -1;

    width: 460px;
    height: 460px;

    border-radius: 50%;

    pointer-events: none;

    filter:
      blur(115px);

    background:
      ${({ $position }) =>
        $position === "left"
          ? "rgba(94, 54, 140, 0.12)"
          : "rgba(201, 169, 110, 0.13)"};

    animation:
      ${ambientFloat}
      11s
      ease-in-out
      infinite;

    ${({ $position }) =>
      $position === "left"
        ? `
          left: -280px;
          top: -150px;
        `
        : `
          right: -280px;
          bottom: -180px;
          animation-delay: -4s;
        `}

    @media (max-width: 768px) {
      width: 300px;
      height: 300px;

      filter:
        blur(85px);
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      animation: none;
    }
  `;

/* =====================================================
   DECORATIVE LINE
===================================================== */

const DecorativeLine =
  styled.div`
    position: absolute;

    top: 0;

    left: 50%;

    width:
      min(
        calc(100% - 80px),
        1220px
      );

    height: 1px;

    transform:
      translateX(-50%);

    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(
          91,
          33,
          182,
          0.16
        ),
        rgba(
          201,
          169,
          110,
          0.62
        ),
        rgba(
          91,
          33,
          182,
          0.16
        ),
        transparent
      );

    pointer-events: none;

    @media (max-width: 768px) {
      width:
        calc(
          100% - 40px
        );
    }
  `;

/* =====================================================
   CONTAINER
===================================================== */

const Container = styled.div`
  position: relative;

  width:
    min(
      calc(100% - 64px),
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        calc(100% - 36px),
        1320px
      );
  }

  @media (max-width: 480px) {
    width:
      min(
        calc(100% - 28px),
        1320px
      );
  }
`;

/* =====================================================
   TOP
===================================================== */

const Top = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1.25fr)
    minmax(300px, 0.75fr);

  gap:
    clamp(
      70px,
      9vw,
      120px
    );

  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns:
      1fr;

    gap: 65px;
  }

  @media (max-width: 768px) {
    gap: 52px;
  }
`;

/* =====================================================
   BRAND
===================================================== */

const Brand = styled.div`
  position: relative;

  max-width: 700px;
`;

/* =====================================================
   BRAND LOGO
===================================================== */

const BrandLogo =
  styled.img`
    display: block;

    width: 190px;

    height: auto;

    margin-bottom: 28px;

    object-fit: contain;

    opacity: 0.96;

    filter:
      drop-shadow(
        0
        8px
        22px
        rgba(
          61,
          30,
          94,
          0.13
        )
      );

    animation:
      ${logoGlow}
      4s
      ease-in-out
      infinite;

    @media (max-width: 480px) {
      width: 155px;

      margin-bottom: 23px;
    }
  `;

/* =====================================================
   BRAND EYEBROW
===================================================== */

const BrandEyebrow =
  styled.p`
    display: inline-flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 20px;

    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.2em;

    line-height:
      1.4;

    text-transform:
      uppercase;

    &::before {
      content: "";

      width: 30px;

      height: 1px;

      flex-shrink: 0;

      background:
        ${({ theme }) =>
          theme.colors.champagne};
    }

    @media (max-width: 480px) {
      font-size: 8px;

      letter-spacing:
        0.16em;
    }
  `;

/* =====================================================
   BRAND NAME
===================================================== */

const BrandName =
  styled.h2`
    max-width: 680px;

    margin: 0;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        3.2rem,
        6vw,
        5.8rem
      );

    font-weight: 500;

    line-height:
      0.92;

    letter-spacing:
      -0.05em;

    text-wrap:
      balance;

    span {
      color:
        ${({ theme }) =>
          theme.colors.purple};

      font-style:
        italic;
    }

    @media (max-width: 768px) {
      font-size:
        clamp(
          2.8rem,
          11vw,
          4.6rem
        );

      line-height:
        0.96;
    }

    @media (max-width: 480px) {
      font-size:
        clamp(
          2.5rem,
          12vw,
          3.9rem
        );
    }
  `;

/* =====================================================
   BRAND DESCRIPTION
===================================================== */

const BrandDescription =
  styled.p`
    max-width: 560px;

    margin:
      28px 0 0;

    color:
      rgba(
        53,
        40,
        65,
        0.68
      );

    font-size: 15px;

    line-height:
      1.82;

    @media (max-width: 768px) {
      margin-top: 22px;

      font-size: 14px;

      line-height:
        1.72;
    }

    @media (max-width: 480px) {
      font-size:
        13.5px;
    }
  `;

/* =====================================================
   COMMUNITY / APPLICATION LINK
===================================================== */

const CommunityLink =
  styled.a`
    position: relative;

    display: inline-flex;

    align-items: center;

    justify-content:
      center;

    gap: 12px;

    min-height: 53px;

    margin-top: 28px;

    padding:
      0 22px;

    overflow: hidden;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.17
      );

    border-radius:
      ${({ theme }) =>
        theme.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({ theme }) =>
          theme.colors.purple},
        #7956a8
      );

    color:
      ${({ theme }) =>
        theme.colors.white};

    font-size: 10px;

    font-weight: 800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    text-decoration:
      none;

    box-shadow:
      0
      12px
      32px
      rgba(
        91,
        33,
        182,
        0.16
      );

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &::before {
      content: "";

      position: absolute;

      top: -40%;

      left: -100%;

      width: 45%;

      height: 180%;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(
            255,
            255,
            255,
            0.5
          ),
          transparent
        );

      transform:
        skewX(-18deg);

      pointer-events: none;
    }

    &:hover {
      transform:
        translateY(-3px);

      box-shadow:
        0
        18px
        42px
        rgba(
          91,
          33,
          182,
          0.24
        );

      &::before {
        animation:
          ${footerShimmer}
          0.75s
          ease
          forwards;
      }
    }

    &:active {
      transform:
        translateY(-1px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.purple};

      outline-offset:
        5px;
    }

    @media (max-width: 480px) {
      width: 100%;
    }

    @media (
      prefers-reduced-motion:
        reduce
    ) {
      transition: none;

      &:hover,
      &:active {
        transform: none;
      }

      &:hover::before {
        animation: none;
      }
    }
  `;

/* =====================================================
   COMMUNITY ARROW
===================================================== */

const CommunityArrow =
  styled.span`
    position: relative;

    z-index: 2;

    font-size: 15px;

    line-height: 1;

    transition:
      transform 0.25s ease;

    ${CommunityLink}:hover & {
      transform:
        translate(
          2px,
          -2px
        );
    }
  `;

/* =====================================================
   LINKS
===================================================== */

const Links = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(
        0,
        1fr
      )
    );

  gap: 58px;

  padding-top: 4px;

  @media (max-width: 500px) {
    gap: 32px;
  }
`;

/* =====================================================
   LINK GROUP
===================================================== */

const LinkGroup =
  styled.div`
    min-width: 0;
  `;

/* =====================================================
   LINK TITLE
===================================================== */

const LinkTitle =
  styled.h3`
    display: flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 20px;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.18em;

    text-transform:
      uppercase;

    &::before {
      content: "";

      width: 23px;

      height: 1px;

      background:
        ${({ theme }) =>
          theme.colors.champagne};
    }
  `;

/* =====================================================
   LINK LIST
===================================================== */

const LinkList =
  styled.ul`
    display: flex;

    flex-direction:
      column;

    gap: 13px;

    margin: 0;

    padding: 0;

    list-style:
      none;
  `;

/* =====================================================
   FOOTER LINK
===================================================== */

const FooterLink =
  styled.a`
    display: inline-flex;

    align-items: center;

    gap: 8px;

    color:
      rgba(
        53,
        38,
        68,
        0.66
      );

    font-size: 12px;

    font-weight: 500;

    line-height:
      1.45;

    text-decoration:
      none;

    transition:
      color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      color:
        ${({ theme }) =>
          theme.colors.purpleDeep};

      transform:
        translateX(3px);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.purple};

      outline-offset:
        4px;

      border-radius:
        4px;
    }

    @media (max-width: 480px) {
      font-size:
        11.5px;
    }
  `;

/* =====================================================
   LINK ARROW
===================================================== */

const LinkArrow =
  styled.span`
    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size: 13px;

    line-height: 1;

    opacity: 0.82;

    transition:
      transform 0.25s ease,
      opacity 0.25s ease;

    ${FooterLink}:hover & {
      opacity: 1;

      transform:
        translate(
          2px,
          -2px
        );
    }
  `;

/* =====================================================
   BOTTOM BRAND
===================================================== */

const BottomBrand =
  styled.div`
    display: flex;

    align-items: center;

    justify-content:
      center;

    gap: 14px;

    margin:
      82px 0 24px;

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        2.3rem,
        6vw,
        5rem
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing:
      -0.04em;

    user-select:
      none;

    .word {
      color:
        rgba(
          69,
          35,
          105,
          0.17
        );
    }

    .dot {
      color:
        ${({ theme }) =>
          theme.colors.champagne};

      font-family:
        ${({ theme }) =>
          theme.fonts.body};

      font-size:
        0.22em;
    }

    @media (max-width: 768px) {
      margin-top:
        62px;

      font-size:
        clamp(
          2rem,
          8vw,
          4rem
        );
    }

    @media (max-width: 480px) {
      margin-top:
        52px;

      font-size:
        2rem;
    }
  `;

/* =====================================================
   BOTTOM
===================================================== */

const Bottom = styled.div`
  display: flex;

  align-items: center;

  justify-content:
    space-between;

  gap: 24px;

  padding-top: 19px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.14
    );

  @media (max-width: 700px) {
    flex-direction:
      column;

    align-items:
      flex-start;

    gap: 14px;
  }
`;

/* =====================================================
   COPYRIGHT
===================================================== */

const Copyright =
  styled.p`
    margin: 0;

    color:
      rgba(
        53,
        38,
        68,
        0.45
      );

    font-size: 9px;

    font-weight: 600;

    letter-spacing:
      0.06em;

    line-height:
      1.5;
  `;

/* =====================================================
   LEGAL
===================================================== */

const Legal =
  styled.div`
    display: flex;

    align-items: center;

    gap: 22px;

    @media (max-width: 480px) {
      gap: 16px;

      flex-wrap: wrap;
    }
  `;

/* =====================================================
   LEGAL LINK
===================================================== */

const LegalLink =
  styled.a`
    color:
      rgba(
        53,
        38,
        68,
        0.52
      );

    font-size: 9px;

    font-weight: 700;

    letter-spacing:
      0.03em;

    line-height:
      1.4;

    text-decoration:
      none;

    transition:
      color 0.25s ease;

    &:hover {
      color:
        ${({ theme }) =>
          theme.colors.purpleDeep};
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.purple};

      outline-offset:
        4px;

      border-radius:
        4px;
    }
  `;