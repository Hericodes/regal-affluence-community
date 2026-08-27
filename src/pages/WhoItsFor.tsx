import styled from "styled-components";

/* ========================================
   DATA
======================================== */

const profiles = [
  {
    number: "01",
    icon: "◆",
    title: "Ambitious",
    description:
      "You have a strong desire to achieve more and are willing to put in the work required to build something meaningful.",
  },
  {
    number: "02",
    icon: "↗",
    title: "Growth-Minded",
    description:
      "You are committed to learning, improving yourself, and becoming better personally, professionally, and financially.",
  },
  {
    number: "03",
    icon: "◎",
    title: "Relationship-Driven",
    description:
      "You understand the value of meaningful relationships and want to connect with people who share your ambition.",
  },
  {
    number: "04",
    icon: "✦",
    title: "Professional",
    description:
      "You value excellence, professionalism, integrity, and the standards required to build a respected career.",
  },
  {
    number: "05",
    icon: "◇",
    title: "Teachable",
    description:
      "You are open to learning from others, developing new skills, and applying what you learn to your growth.",
  },
  {
    number: "06",
    icon: "∞",
    title: "Future-Focused",
    description:
      "You are interested in creating long-term value, building wealth, and positioning yourself for greater opportunities.",
  },
];

/* ========================================
   COMPONENT
======================================== */

const WhoItsFor = () => {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>
            Who Regal Affluence Is For
          </Eyebrow>

          <Heading>
            Built for people
            <br />
            who want to{" "}
            <Highlight>
              grow.
            </Highlight>
          </Heading>

          <Description>
            Regal Affluence is for ambitious, growth-minded people
            who want to build meaningful relationships, develop
            professionally, access opportunities, and create
            long-term wealth through real estate.
          </Description>
        </Header>

        <ProfileGrid>
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.number}
            >
              <Number>
                {profile.number}
              </Number>

              <Icon aria-hidden="true">
                {profile.icon}
              </Icon>

              <Title>
                {profile.title}
              </Title>

              <CardDescription>
                {profile.description}
              </CardDescription>
            </ProfileCard>
          ))}
        </ProfileGrid>

        <BottomStatement>
          <span>Learn.</span>
          <span>Connect.</span>
          <span>Grow.</span>
          <span>Create Wealth.</span>
        </BottomStatement>
      </Container>
    </Section>
  );
};

export default WhoItsFor;

/* ========================================
   SECTION
======================================== */

const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({ theme }) =>
      theme.colors.cream};

  color:
    ${({ theme }) =>
      theme.colors.text};

  overflow: hidden;

  @media (max-width: 768px) {
    padding: 90px 0;
  }

  @media (max-width: 480px) {
    padding: 72px 0;
  }
`;

/* ========================================
   CONTAINER
======================================== */

const Container = styled.div`
  width:
    min(
      100% - 48px,
      1320px
    );

  margin: 0 auto;

  @media (max-width: 768px) {
    width:
      min(
        100% - 32px,
        1320px
      );
  }
`;

/* ========================================
   HEADER
======================================== */

const Header = styled.div`
  max-width: 980px;

  margin-bottom: 76px;

  @media (max-width: 768px) {
    margin-bottom: 56px;
  }
`;

/* ========================================
   EYEBROW
======================================== */

const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    24px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2em;

  line-height: 1.4;

  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background:
      ${({ theme }) =>
        theme.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;

    font-size: 10px;

    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

const Heading = styled.h1`
  max-width: 900px;

  margin: 0;

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      3rem,
      6vw,
      5.8rem
    );

  font-weight: 500;

  line-height: 0.98;

  letter-spacing: -0.045em;

  color:
    ${({ theme }) =>
      theme.colors.text};

  @media (max-width: 768px) {
    font-size:
      clamp(
        2.7rem,
        11vw,
        4.5rem
      );

    line-height: 1;
  }

  @media (max-width: 480px) {
    font-size:
      clamp(
        2.5rem,
        12vw,
        3.6rem
      );
  }
`;

/* ========================================
   HIGHLIGHT
======================================== */

const Highlight = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style: italic;
`;

/* ========================================
   DESCRIPTION
======================================== */

const Description = styled.p`
  max-width: 720px;

  margin:
    30px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 17px;

  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 22px;

    font-size: 15px;

    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 14.5px;
  }
`;

/* ========================================
   PROFILE GRID
======================================== */

const ProfileGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  gap: 1px;

  background:
    ${({ theme }) =>
      theme.colors.border};

  border:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns:
      repeat(
        2,
        minmax(0, 1fr)
      );
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* ========================================
   PROFILE CARD
======================================== */

const ProfileCard = styled.article`
  position: relative;

  min-height: 290px;

  padding: 38px;

  background:
    ${({ theme }) =>
      theme.colors.ivory};

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      ${({ theme }) =>
        theme.colors.white};
  }

  @media (max-width: 900px) {
    min-height: 270px;

    padding: 34px;
  }

  @media (max-width: 600px) {
    min-height: auto;

    padding:
      32px
      28px;
  }
`;

/* ========================================
   NUMBER
======================================== */

const Number = styled.span`
  display: block;

  margin-bottom: 34px;

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 17px;

  font-weight: 600;

  letter-spacing: 0.04em;
`;

/* ========================================
   ICON
======================================== */

const Icon = styled.span`
  position: absolute;

  top: 34px;
  right: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 20px;

  opacity: 0.75;

  @media (max-width: 600px) {
    top: 30px;
    right: 28px;
  }
`;

/* ========================================
   TITLE
======================================== */

const Title = styled.h2`
  margin:
    0
    0
    14px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.7rem,
      2.5vw,
      2.2rem
    );

  font-weight: 600;

  line-height: 1.1;

  letter-spacing: -0.025em;
`;

/* ========================================
   CARD DESCRIPTION
======================================== */

const CardDescription = styled.p`
  max-width: 420px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 14px;

  line-height: 1.75;
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 22px;

  margin-top: 68px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.4rem,
      2.8vw,
      2.2rem
    );

  font-weight: 500;

  letter-spacing: -0.02em;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 22px;

      color:
        ${({ theme }) =>
          theme.colors.champagne};

      font-family:
        ${({ theme }) =>
          theme.fonts.body};

      font-size: 0.6em;

      vertical-align: middle;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    gap:
      8px
      18px;

    margin-top: 52px;

    font-size: 1.6rem;

    span:not(:last-child)::after {
      margin-left: 18px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    gap: 6px;

    font-size: 1.5rem;

    span:not(:last-child)::after {
      display: none;
    }
  }
`;