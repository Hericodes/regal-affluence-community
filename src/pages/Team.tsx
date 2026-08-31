import styled from "styled-components";

/* =========================================================
   BASE URL
========================================================= */

const BASE_URL =
  import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

/* =========================================================
   MEMBER DATA
========================================================= */

const members = [
  {
    id: "01",
    name: "OMOJOLAOBA OLAMILEKAN",
    role: "MD / CEO",
    image: `${BASE_URL}images/members/member-01.png`,
    bio:
      "Leading Regal Affluence with a focus on strategy, growth, relationships, and long-term value creation.",
  },

  {
    id: "02",
    name: "Olanrewaju Kingsley Bayo",
    role: "COO",
    image: `${BASE_URL}images/members/member-02.png`,
    bio:
      "Driving operations, coordination, execution, and the systems that keep Regal Affluence moving forward.",
  },

  {
    id: "03",
    name: "Adeola Adedimeji Michael",
    role: "Head of Operations",
    image: `${BASE_URL}images/members/member-03.png`,
    bio:
      "Supporting operational coordination, team execution, collaboration, and the smooth delivery of Regal Affluence initiatives.",
  },

  {
    id: "04",
    name: "Olayimika Inioluwa Ogunmona",
    role: "Technology & Digital Lead",
    affiliation: "Founder & CEO, Avenz",
    image: `${BASE_URL}images/members/member-04.png`,
    bio:
      "Leading the technology and digital direction of Regal Affluence, including digital platforms, systems, creative technology, and technical support.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const Team = () => {
  return (
    <Section>
      <AmbientGlow
        $position="top"
        aria-hidden="true"
      />

      <AmbientGlow
        $position="bottom"
        aria-hidden="true"
      />

      <Container>

        {/* =================================================
            HEADER
        ================================================= */}

        <Header>
          <Eyebrow>
            <Line />
            OUR TEAM
          </Eyebrow>

          <Heading>
            The Team behind{" "}
            <Italic>
              Regal Affluence.
            </Italic>
          </Heading>

          <Description>
            A team connected by ambition,
            professionalism, expertise, and a
            shared commitment to creating meaningful
            opportunities and long-term value.
          </Description>
        </Header>

        {/* =================================================
            TEAM GRID
        ================================================= */}

        <TeamGrid>
          {members.map((member) => (
            <TeamCard key={member.id}>

              {/* =============================================
                  PORTRAIT
              ============================================= */}

              <Portrait>
                <MemberImage
                  src={member.image}
                  alt={member.name}
                  draggable={false}
                  loading="lazy"
                />

                <PortraitOverlay
                  aria-hidden="true"
                />

                <PortraitBrand>
                  REGAL AFFLUENCE
                </PortraitBrand>
              </Portrait>

              {/* =============================================
                  INFORMATION
              ============================================= */}

              <TeamInfo>
                <AccentLine />

                <Role>
                  {member.role}
                </Role>

                <Name>
                  {member.name}
                </Name>

                {member.affiliation && (
                  <Affiliation>
                    {member.affiliation}
                  </Affiliation>
                )}

                <Bio>
                  {member.bio}
                </Bio>
              </TeamInfo>

            </TeamCard>
          ))}
        </TeamGrid>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <Bottom>
          <BottomEyebrow>
            <BottomLine />
            BUILT TOGETHER
          </BottomEyebrow>

          <BottomText>
            Strong relationships.
            <br />
            <Accent>
              Better opportunities.
            </Accent>
          </BottomText>
        </Bottom>

      </Container>
    </Section>
  );
};

export default Team;

/* =========================================================
   SECTION
========================================================= */

const Section = styled.section`
  position: relative;

  padding:
    clamp(92px, 9vw, 135px)
    0
    clamp(100px, 10vw, 150px);

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      ${({ theme }) =>
        theme.colors.ivory}
        0%,
      #f7f3ec
        100%
    );

  scroll-margin-top: 100px;

  @media (max-width: 900px) {
    scroll-margin-top: 82px;
  }

  @media (max-width: 600px) {
    padding:
      74px
      0
      92px;
  }
`;

/* =========================================================
   AMBIENT GLOW
========================================================= */

interface AmbientGlowProps {
  $position: "top" | "bottom";
}

const AmbientGlow =
  styled.div<AmbientGlowProps>`
    position: absolute;

    width: 560px;
    height: 560px;

    border-radius: 50%;

    pointer-events: none;

    filter: blur(110px);

    background:
      ${({ $position }) =>
        $position === "top"
          ? "rgba(91, 33, 182, 0.045)"
          : "rgba(201, 169, 110, 0.04)"};

    ${({ $position }) =>
      $position === "top"
        ? `
          top: -360px;
          right: -190px;
        `
        : `
          bottom: -390px;
          left: -190px;
        `}
`;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  position: relative;

  z-index: 1;

  width:
    min(
      calc(100% - 64px),
      1380px
    );

  margin: 0 auto;

  @media (max-width: 900px) {
    width:
      min(
        calc(100% - 44px),
        1380px
      );
  }

  @media (max-width: 600px) {
    width:
      calc(
        100% - 32px
      );
  }
`;

/* =========================================================
   HEADER
========================================================= */

const Header = styled.header`
  max-width: 850px;
`;

/* =========================================================
   EYEBROW
========================================================= */

const Eyebrow = styled.div`
  display: flex;

  align-items: center;

  gap: 11px;

  margin-bottom: 21px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 0.2em;

  line-height: 1;

  text-transform: uppercase;
`;

/* =========================================================
   HEADER LINE
========================================================= */

const Line = styled.span`
  width: 31px;

  height: 1px;

  flex-shrink: 0;

  background:
    ${({ theme }) =>
      theme.colors.champagne};
`;

/* =========================================================
   HEADING
========================================================= */

const Heading = styled.h1`
  max-width: 860px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      3rem,
      5vw,
      5.2rem
    );

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.048em;

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.65rem,
        9vw,
        4.2rem
      );
  }

  @media (max-width: 480px) {
    font-size: 2.55rem;
  }
`;

/* =========================================================
   ITALIC
========================================================= */

const Italic = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style: italic;

  font-weight: 400;
`;

/* =========================================================
   DESCRIPTION
========================================================= */

const Description = styled.p`
  max-width: 650px;

  margin:
    24px
    0
    0;

  color:
    rgba(
      46,
      36,
      54,
      0.72
    );

  font-size: 16px;

  line-height: 1.78;

  @media (max-width: 700px) {
    font-size: 15px;

    line-height: 1.72;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

/* =========================================================
   TEAM GRID
========================================================= */

const TeamGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(
        0,
        1fr
      )
    );

  align-items: stretch;

  gap: 20px;

  margin-top:
    clamp(
      58px,
      7vw,
      82px
    );

  @media (max-width: 1150px) {
    grid-template-columns:
      repeat(
        2,
        minmax(
          0,
          1fr
        )
      );

    gap: 20px;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;

    gap: 22px;

    margin-top: 46px;
  }
`;

/* =========================================================
   TEAM CARD
========================================================= */

const TeamCard = styled.article`
  display: flex;

  flex-direction: column;

  min-width: 0;

  height: 100%;

  overflow: hidden;

  border:
    1px solid
    rgba(
      77,
      48,
      108,
      0.095
    );

  border-radius: 23px;

  background:
    ${({ theme }) =>
      theme.colors.white};

  box-shadow:
    0
    12px
    38px
    rgba(
      35,
      21,
      49,
      0.045
    );

  transition:
    transform 0.4s
      cubic-bezier(
        0.16,
        1,
        0.3,
        1
      ),
    box-shadow 0.4s ease,
    border-color 0.3s ease;

  &:hover {
    transform:
      translateY(-6px);

    border-color:
      rgba(
        91,
        33,
        182,
        0.16
      );

    box-shadow:
      0
      24px
      58px
      rgba(
        35,
        21,
        49,
        0.1
      );
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

/* =========================================================
   PORTRAIT
========================================================= */

const Portrait = styled.div`
  position: relative;

  flex-shrink: 0;

  width: 100%;

  aspect-ratio:
    0.9 / 1;

  overflow: hidden;

  border-bottom:
    1px solid
    rgba(
      77,
      48,
      108,
      0.07
    );

  background:
    ${({ theme }) =>
      theme.colors.white};
`;

/* =========================================================
   MEMBER IMAGE
========================================================= */

const MemberImage = styled.img`
  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

  object-fit: cover;

  object-position:
    center top;

  transition:
    transform 0.7s
      cubic-bezier(
        0.16,
        1,
        0.3,
        1
      );

  ${TeamCard}:hover & {
    transform:
      scale(1.035);
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    transition: none;

    ${TeamCard}:hover & {
      transform: none;
    }
  }
`;

/* =========================================================
   PORTRAIT OVERLAY
========================================================= */

const PortraitOverlay = styled.div`
  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(
        20,
        8,
        34,
        0
      ) 42%,
      rgba(
        20,
        8,
        34,
        0.6
      ) 100%
    );

  pointer-events:
    none;
`;

/* =========================================================
   PORTRAIT BRAND
========================================================= */

const PortraitBrand = styled.span`
  position: absolute;

  left: 20px;

  bottom: 18px;

  z-index: 2;

  color:
    rgba(
      255,
      255,
      255,
      0.86
    );

  font-size: 7px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1;

  text-transform: uppercase;
`;

/* =========================================================
   TEAM INFO
========================================================= */

const TeamInfo = styled.div`
  display: flex;

  flex: 1;

  flex-direction: column;

  min-width: 0;

  min-height: 315px;

  padding:
    25px
    22px
    24px;

  background:
    ${({ theme }) =>
      theme.colors.white};

  @media (max-width: 600px) {
    min-height: 0;

    padding:
      23px
      21px
      25px;
  }
`;

/* =========================================================
   ACCENT LINE
========================================================= */

const AccentLine = styled.span`
  display: block;

  width: 37px;

  height: 2px;

  margin-bottom: 15px;

  border-radius: 999px;

  background:
    linear-gradient(
      90deg,
      ${({ theme }) =>
        theme.colors.purple},
      ${({ theme }) =>
        theme.colors.champagne}
    );
`;

/* =========================================================
   ROLE
========================================================= */

const Role = styled.span`
  display: block;

  margin-bottom: 9px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 10px;

  font-weight: 900;

  letter-spacing: 0.135em;

  line-height: 1.35;

  text-transform: uppercase;
`;

/* =========================================================
   NAME
========================================================= */

const Name = styled.h2`
  margin: 0;

  color:
    #24122f;

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.7rem,
      1.75vw,
      2.15rem
    );

  font-weight: 600;

  line-height: 1.02;

  letter-spacing: -0.03em;

  overflow-wrap: break-word;

  @media (max-width: 1150px) {
    font-size:
      clamp(
        1.85rem,
        3.2vw,
        2.35rem
      );
  }

  @media (max-width: 620px) {
    font-size: 2.15rem;
  }

  @media (max-width: 380px) {
    font-size: 1.95rem;
  }
`;

/* =========================================================
   AFFILIATION
========================================================= */

const Affiliation = styled.p`
  margin:
    8px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 10px;

  font-weight: 800;

  line-height: 1.45;

  letter-spacing: 0.02em;
`;

/* =========================================================
   BIO
========================================================= */

const Bio = styled.p`
  margin:
    auto
    0
    0;

  padding-top: 20px;

  color:
    rgba(
      51,
      42,
      58,
      0.76
    );

  font-size: 13px;

  line-height: 1.72;

  @media (max-width: 700px) {
    font-size: 13.5px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

/* =========================================================
   BOTTOM
========================================================= */

const Bottom = styled.div`
  margin-top:
    clamp(
      82px,
      9vw,
      112px
    );

  padding-top:
    34px;

  border-top:
    1px solid
    ${({ theme }) =>
      theme.colors.border};
`;

/* =========================================================
   BOTTOM EYEBROW
========================================================= */

const BottomEyebrow = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  margin-bottom: 20px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 8px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1;

  text-transform: uppercase;
`;

/* =========================================================
   BOTTOM LINE
========================================================= */

const BottomLine = styled.span`
  width: 27px;

  height: 1px;

  background:
    ${({ theme }) =>
      theme.colors.champagne};
`;

/* =========================================================
   BOTTOM TEXT
========================================================= */

const BottomText = styled.p`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      2.4rem,
      4.1vw,
      4.4rem
    );

  font-weight: 500;

  line-height: 0.95;

  letter-spacing: -0.045em;

  @media (max-width: 600px) {
    font-size: 2.3rem;
  }
`;

/* =========================================================
   ACCENT
========================================================= */

const Accent = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style: italic;

  font-weight: 400;
`;