import styled, { keyframes } from "styled-components";

/* ========================================
   DATA TYPES
======================================== */

interface Activity {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface ParticipationMethod {
  number: string;
  title: string;
  description: string;
}

/* ========================================
   DATA
======================================== */

const activities: Activity[] = [
  {
    number: "01",
    icon: "◎",
    title: "Networking",
    description:
      "Build meaningful relationships with ambitious people and professionals who share a commitment to growth and excellence.",
  },
  {
    number: "02",
    icon: "◇",
    title: "Mentorship",
    description:
      "Learn from experienced professionals and gain guidance that supports your personal, professional, and real estate growth.",
  },
  {
    number: "03",
    icon: "◈",
    title: "Investment Opportunities",
    description:
      "Gain access to valuable real estate and investment opportunities while becoming better equipped to make informed decisions.",
  },
  {
    number: "04",
    icon: "∞",
    title: "Partnerships",
    description:
      "Create relationships that can develop into meaningful collaborations, partnerships, and long-term professional opportunities.",
  },
];

const participation: ParticipationMethod[] = [
  {
    number: "01",
    title: "WhatsApp Groups",
    description:
      "Stay connected with the community, conversations, opportunities, and updates.",
  },
  {
    number: "02",
    title: "Online Events",
    description:
      "Learn, connect, and participate in community activities from wherever you are.",
  },
  {
    number: "03",
    title: "Physical Meetings",
    description:
      "Build stronger relationships through in-person meetings, networking, and community experiences.",
  },
];

/* ========================================
   COMPONENT
======================================== */

const Community = () => {
  return (
    <Section id="community">
      <BackgroundGlow
        $position="top"
        aria-hidden="true"
      />

      <BackgroundGlow
        $position="bottom"
        aria-hidden="true"
      />

      <GridPattern aria-hidden="true" />

      <Container>
        {/* ========================================
            HEADER
        ======================================== */}

        <Header>
          <HeaderContent>
            <Eyebrow>
              The Regal Affluence Community
            </Eyebrow>

            <Heading>
              Where ambitious people
              <br />
              <span>connect and grow.</span>
            </Heading>
          </HeaderContent>

          <HeaderMeta aria-hidden="true">
            <HeaderMetaNumber>
              RA
            </HeaderMetaNumber>

            <HeaderMetaLabel>
              PEOPLE
              <br />
              POWERED
            </HeaderMetaLabel>
          </HeaderMeta>

          <Description>
            Regal Affluence is built around people,
            relationships, opportunities, and growth. Our
            community gives ambitious individuals a platform
            to learn, connect, collaborate, and create
            meaningful opportunities together.
          </Description>
        </Header>

        {/* ========================================
            COMMUNITY EXPERIENCE
        ======================================== */}

        <CommunityLayout>
          <CommunityIntro>
            <CommunityLabel>
              What happens here
            </CommunityLabel>

            <CommunityTitle>
              More than a network.
              <br />
              <span>A place to grow.</span>
            </CommunityTitle>

            <CommunityDescription>
              Members become part of a growing professional
              community where knowledge is shared,
              relationships are built, opportunities are
              discovered, and people are encouraged to become
              better versions of themselves.
            </CommunityDescription>

            <CommunityRule
              aria-hidden="true"
            />
          </CommunityIntro>

          <ActivitiesGrid>
            {activities.map((activity) => (
              <ActivityCard
                key={activity.number}
              >
                <ActivityTop>
                  <ActivityNumber>
                    {activity.number}
                  </ActivityNumber>

                  <ActivityIcon
                    aria-hidden="true"
                  >
                    {activity.icon}
                  </ActivityIcon>
                </ActivityTop>

                <ActivityTitle>
                  {activity.title}
                </ActivityTitle>

                <ActivityDescription>
                  {activity.description}
                </ActivityDescription>

                <ActivityArrow
                  aria-hidden="true"
                >
                  ↗
                </ActivityArrow>
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </CommunityLayout>

        {/* ========================================
            PARTICIPATION
        ======================================== */}

        <Participation>
          <ParticipationHeader>
            <ParticipationContent>
              <Eyebrow>
                How Members Participate
              </Eyebrow>

              <ParticipationTitle>
                Stay connected.
                <br />
                <span>Stay involved.</span>
              </ParticipationTitle>
            </ParticipationContent>

            <ParticipationDescription>
              Community participation currently happens
              through a combination of digital and physical
              experiences, making it easier for members to
              stay connected and engaged.
            </ParticipationDescription>
          </ParticipationHeader>

          <ParticipationList>
            {participation.map((item) => (
              <ParticipationItem
                key={item.number}
              >
                <ParticipationNumber>
                  {item.number}
                </ParticipationNumber>

                <ParticipationText>
                  <strong>
                    {item.title}
                  </strong>

                  <p>
                    {item.description}
                  </p>
                </ParticipationText>

                <ParticipationArrow
                  aria-hidden="true"
                >
                  →
                </ParticipationArrow>
              </ParticipationItem>
            ))}
          </ParticipationList>
        </Participation>

        {/* ========================================
            BOTTOM STATEMENT
        ======================================== */}

        <BottomStatement>
          <BottomLine aria-hidden="true" />

          <div>
            <span>Connect.</span>
            <span>Learn.</span>
            <span>Collaborate.</span>
            <span>Grow.</span>
          </div>

          <BottomLine aria-hidden="true" />
        </BottomStatement>
      </Container>
    </Section>
  );
};

export default Community;

/* ========================================
   ANIMATIONS
======================================== */

const ambientFloat = keyframes`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(0, -22px, 0)
      scale(1.06);
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

const Section = styled.section`
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

  color:
    ${({ theme }) => theme.colors.text};

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

type GlowPosition =
  | "top"
  | "bottom";

interface BackgroundGlowProps {
  $position: GlowPosition;
}

const BackgroundGlow =
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
        rgba(91, 33, 182, 0.1) 0%,
        rgba(91, 33, 182, 0.035) 42%,
        transparent 72%
      );

    animation:
      ${ambientFloat}
      12s
      ease-in-out
      infinite;

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

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `;

/* ========================================
   GRID PATTERN
======================================== */

const GridPattern = styled.div`
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

const Container = styled.div`
  position: relative;

  width:
    min(
      100% - 64px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 36px,
        1320px
      );
  }

  @media (max-width: 480px) {
    width:
      min(
        100% - 28px,
        1320px
      );
  }
`;

/* ========================================
   HEADER
======================================== */

const Header = styled.header`
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

const HeaderContent = styled.div`
  position: relative;
`;

/* ========================================
   EYEBROW
======================================== */

const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 11px;

  margin:
    0 0
    24px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

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
        ${({ theme }) =>
          theme.colors.champagne},
        ${({ theme }) =>
          theme.colors.purple}
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

const Heading = styled.h2`
  max-width: 920px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      3.3rem,
      6vw,
      6.1rem
    );

  font-weight: 500;

  line-height: 0.94;

  letter-spacing: -0.052em;

  text-wrap: balance;

  span {
    position: relative;

    color:
      ${({ theme }) =>
        theme.colors.purple};

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
          ${({ theme }) =>
            theme.colors.champagne},
          transparent
        );

      opacity: 0.65;
    }
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.8rem,
        11vw,
        4.8rem
      );

    line-height: 0.98;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.45rem,
        12vw,
        3.9rem
      );
  }
`;

/* ========================================
   HEADER META
======================================== */

const HeaderMeta = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  width: 76px;
  height: 76px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.32
    );

  border-radius: 50%;

  background:
    rgba(
      255,
      255,
      255,
      0.3
    );

  box-shadow:
    inset
      0 0 0 7px
      rgba(
        255,
        255,
        255,
        0.12
      );

  @media (max-width: 1100px) {
    display: none;
  }
`;

const HeaderMetaNumber = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 20px;

  font-weight: 600;

  line-height: 1;
`;

const HeaderMetaLabel = styled.span`
  margin-top: 5px;

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-size: 5px;

  font-weight: 800;

  letter-spacing: 0.16em;

  line-height: 1.3;

  text-align: center;
`;

/* ========================================
   DESCRIPTION
======================================== */

const Description = styled.p`
  max-width: 520px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

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

const CommunityLayout = styled.div`
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

const CommunityIntro = styled.div`
  position: sticky;

  top: 120px;

  @media (max-width: 1000px) {
    position: static;
  }
`;

/* ========================================
   COMMUNITY LABEL
======================================== */

const CommunityLabel = styled.p`
  margin:
    0 0
    19px;

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-size: 9px;

  font-weight: 800;

  letter-spacing: 0.18em;

  line-height: 1.4;

  text-transform: uppercase;
`;

/* ========================================
   COMMUNITY TITLE
======================================== */

const CommunityTitle = styled.h3`
  max-width: 470px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      2.35rem,
      4vw,
      3.8rem
    );

  font-weight: 500;

  line-height: 1.01;

  letter-spacing: -0.04em;

  span {
    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-style: italic;
  }
`;

/* ========================================
   COMMUNITY DESCRIPTION
======================================== */

const CommunityDescription = styled.p`
  max-width: 450px;

  margin:
    26px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`;

/* ========================================
   COMMUNITY RULE
======================================== */

const CommunityRule = styled.div`
  position: relative;

  width: 120px;
  height: 1px;

  margin-top: 38px;

  overflow: hidden;

  background:
    rgba(
      91,
      33,
      182,
      0.12
    );

  &::after {
    content: "";

    position: absolute;

    inset: 0;

    width: 50%;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) =>
          theme.colors.champagne},
        ${({ theme }) =>
          theme.colors.purple}
      );

    animation:
      ${shimmer}
      4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

/* ========================================
   ACTIVITIES GRID
======================================== */

const ActivitiesGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      2,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius: 24px;

  background:
    rgba(
      69,
      35,
      105,
      0.12
    );

  box-shadow:
    0 28px 70px
    rgba(
      39,
      17,
      61,
      0.07
    );

  @media (max-width: 600px) {
    grid-template-columns: 1fr;

    border-radius: 20px;
  }
`;

/* ========================================
   ACTIVITY CARD
======================================== */

const ActivityCard = styled.article`
  position: relative;

  min-height: 258px;

  padding: 32px;

  overflow: hidden;

  background:
    linear-gradient(
      145deg,
      rgba(
        255,
        255,
        255,
        0.95
      ),
      rgba(
        250,
        248,
        243,
        0.92
      )
    );

  transition:
    transform 0.4s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      ),
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
        ${({ theme }) =>
          theme.colors.champagne},
        ${({ theme }) =>
          theme.colors.purple},
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
        rgba(
          91,
          33,
          182,
          0.11
        ),
        transparent 68%
      );

    opacity: 0;

    transition:
      opacity 0.45s ease;

    pointer-events: none;
  }

  &:hover {
    z-index: 2;

    transform:
      translateY(-4px);

    background:
      linear-gradient(
        145deg,
        ${({ theme }) =>
          theme.colors.white},
        rgba(
          250,
          248,
          243,
          0.98
        )
      );

    box-shadow:
      0
      24px
      55px
      rgba(
        39,
        17,
        61,
        0.11
      );

    &::before {
      opacity: 1;

      transform:
        scaleX(1);
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

    padding:
      27px
      24px;
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

const ActivityTop = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 29px;
`;

/* ========================================
   ACTIVITY NUMBER
======================================== */

const ActivityNumber = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.35
    );

  border-radius: 50%;

  background:
    rgba(
      201,
      169,
      110,
      0.06
    );

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 13px;

  font-weight: 600;
`;

/* ========================================
   ACTIVITY ICON
======================================== */

const ActivityIcon = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 40px;
  height: 40px;

  border:
    1px solid
    rgba(
      91,
      33,
      182,
      0.14
    );

  border-radius: 50%;

  background:
    rgba(
      91,
      33,
      182,
      0.035
    );

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 17px;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;

  ${ActivityCard}:hover & {
    background:
      ${({ theme }) =>
        theme.colors.purple};

    color:
      ${({ theme }) =>
        theme.colors.white};

    transform:
      rotate(8deg);
  }
`;

/* ========================================
   ACTIVITY TITLE
======================================== */

const ActivityTitle = styled.h4`
  max-width: 360px;

  margin:
    0
    0
    12px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 1.5rem;

  font-weight: 600;

  line-height: 1.08;

  letter-spacing: -0.025em;
`;

/* ========================================
   ACTIVITY DESCRIPTION
======================================== */

const ActivityDescription = styled.p`
  max-width: 400px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 13.5px;

  line-height: 1.72;
`;

/* ========================================
   ACTIVITY ARROW
======================================== */

const ActivityArrow = styled.span`
  position: absolute;

  right: 30px;
  bottom: 25px;

  color:
    rgba(
      91,
      33,
      182,
      0.3
    );

  font-size: 17px;

  opacity: 0;

  transform:
    translate(
      -7px,
      7px
    );

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${ActivityCard}:hover & {
    opacity: 1;

    transform:
      translate(
        0,
        0
      );

    color:
      ${({ theme }) =>
        theme.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ========================================
   PARTICIPATION
======================================== */

const Participation = styled.section`
  margin-top: 120px;

  padding-top: 92px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.13
    );

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

const ParticipationHeader = styled.div`
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

const ParticipationContent = styled.div`
  min-width: 0;
`;

/* ========================================
   PARTICIPATION TITLE
======================================== */

const ParticipationTitle = styled.h3`
  max-width: 650px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      2.7rem,
      5vw,
      4.8rem
    );

  font-weight: 500;

  line-height: 0.96;

  letter-spacing: -0.045em;

  span {
    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.5rem,
        10vw,
        4rem
      );
  }
`;

/* ========================================
   PARTICIPATION DESCRIPTION
======================================== */

const ParticipationDescription = styled.p`
  max-width: 500px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 14.5px;

  line-height: 1.82;
`;

/* ========================================
   PARTICIPATION LIST
======================================== */

const ParticipationList = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1px;

  overflow: hidden;

  border:
    1px solid
    rgba(
      69,
      35,
      105,
      0.12
    );

  border-radius: 22px;

  background:
    rgba(
      69,
      35,
      105,
      0.12
    );

  box-shadow:
    0
    25px
    60px
    rgba(
      39,
      17,
      61,
      0.06
    );

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    border-radius: 19px;
  }
`;

/* ========================================
   PARTICIPATION ITEM
======================================== */

const ParticipationItem = styled.article`
  position: relative;

  min-height: 220px;

  padding: 32px;

  background:
    rgba(
      255,
      255,
      255,
      0.94
    );

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
        ${({ theme }) =>
          theme.colors.purple},
        ${({ theme }) =>
          theme.colors.champagne}
      );

    transform:
      scaleX(0);

    transform-origin: left;

    transition:
      transform 0.4s
      cubic-bezier(
        0.2,
        0.8,
        0.2,
        1
      );
  }

  &:hover {
    z-index: 2;

    background:
      ${({ theme }) =>
        theme.colors.ivory};

    transform:
      translateY(-3px);

    &::before {
      transform:
        scaleX(1);
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

const ParticipationNumber = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 38px;
  height: 38px;

  margin-bottom: 31px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.32
    );

  border-radius: 50%;

  background:
    rgba(
      201,
      169,
      110,
      0.055
    );

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 13px;

  font-weight: 600;
`;

/* ========================================
   PARTICIPATION TEXT
======================================== */

const ParticipationText = styled.div`
  strong {
    display: block;

    margin-bottom: 10px;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size: 1.4rem;

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.02em;
  }

  p {
    max-width: 350px;

    margin: 0;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 13.5px;

    line-height: 1.7;
  }
`;

/* ========================================
   PARTICIPATION ARROW
======================================== */

const ParticipationArrow = styled.span`
  position: absolute;

  right: 28px;
  top: 32px;

  color:
    rgba(
      91,
      33,
      182,
      0.25
    );

  font-size: 18px;

  opacity: 0;

  transform:
    translateX(-6px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  ${ParticipationItem}:hover & {
    opacity: 1;

    transform:
      translateX(0);

    color:
      ${({ theme }) =>
        theme.colors.purple};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  gap: 28px;

  margin-top: 82px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  > div {
    display: flex;

    align-items: center;

    justify-content: center;

    flex-wrap: wrap;

    gap: 22px;
  }

  span {
    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        1.45rem,
        3vw,
        2.25rem
      );

    font-weight: 500;

    line-height: 1;

    letter-spacing: -0.025em;

    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({ theme }) =>
          theme.colors.champagne};

      font-family:
        ${({ theme }) =>
          theme.fonts.body};

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

const BottomLine = styled.span`
  display: block;

  flex: 1;

  max-width: 160px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(
        201,
        169,
        110,
        0.55
      )
    );

  &:last-child {
    background:
      linear-gradient(
        90deg,
        rgba(
          201,
          169,
          110,
          0.55
        ),
        transparent
      );
  }

  @media (max-width: 768px) {
    display: none;
  }
`;