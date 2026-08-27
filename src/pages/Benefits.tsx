import styled from "styled-components";

/* ========================================
   DATA
======================================== */

const benefits = [
  {
    number: "01",
    icon: "↗",
    title: "Learn & Develop",
    description:
      "Grow your knowledge through training, mentorship, personal development, and exposure to experienced professionals.",
  },
  {
    number: "02",
    icon: "◎",
    title: "Build Relationships",
    description:
      "Connect with ambitious people, build meaningful relationships, and become part of a growing professional community.",
  },
  {
    number: "03",
    icon: "◇",
    title: "Access Opportunities",
    description:
      "Discover business, partnership, investment, and real estate opportunities through a network built around access.",
  },
  {
    number: "04",
    icon: "↗",
    title: "Grow Your Career",
    description:
      "Develop the confidence, skills, relationships, and professional mindset needed to build a successful career in real estate.",
  },
  {
    number: "05",
    icon: "∞",
    title: "Create Long-Term Wealth",
    description:
      "Position yourself to make informed property decisions and pursue long-term wealth creation through real estate.",
  },
  {
    number: "06",
    icon: "✦",
    title: "Grow With Purpose",
    description:
      "Be part of a community committed to excellence, ethical standards, professional growth, and creating real results.",
  },
];

/* ========================================
   COMPONENT
======================================== */

const Benefits = () => {
  return (
    <Section>
      <Container>
        <Header>
          <div>
            <Eyebrow>Why Join Regal Affluence</Eyebrow>

            <Heading>
              A community designed
              <br />
              for <span>ambition.</span>
            </Heading>
          </div>

          <Description>
            Regal Affluence offers more than a place to work in
            real estate. It provides a platform to learn, grow,
            build relationships, access opportunities, and create
            long-term wealth.
          </Description>
        </Header>

        <BenefitsGrid>
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.number}>
              <Number>{benefit.number}</Number>

              <Icon aria-hidden="true">
                {benefit.icon}
              </Icon>

              <Title>{benefit.title}</Title>

              <CardDescription>
                {benefit.description}
              </CardDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>

        <BottomLine>
          <span>Learn</span>
          <span>Connect</span>
          <span>Access</span>
          <span>Grow</span>
          <span>Build Wealth</span>
        </BottomLine>
      </Container>
    </Section>
  );
};

export default Benefits;

/* ========================================
   SECTION
======================================== */

const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  color:
    ${({ theme }) =>
      theme.colors.white};

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
  display: grid;

  grid-template-columns:
    minmax(0, 1.35fr)
    minmax(280px, 0.65fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 72px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

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
    0 0
    24px;

  color:
    ${({ theme }) =>
      theme.colors.champagneLight};

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

    background: currentColor;
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
  max-width: 800px;

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
      theme.colors.white};

  span {
    color:
      ${({ theme }) =>
        theme.colors.champagneLight};

    font-style: italic;
  }

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
   DESCRIPTION
======================================== */

const Description = styled.p`
  max-width: 500px;

  justify-self: end;

  margin: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.68
    );

  font-size: 16px;

  line-height: 1.8;

  @media (max-width: 900px) {
    justify-self: start;

    max-width: 650px;
  }

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.7;
  }
`;

/* ========================================
   GRID
======================================== */

const BenefitsGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0, 1fr)
    );

  border-top:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-left:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

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
   BENEFIT CARD
======================================== */

const BenefitCard = styled.article`
  position: relative;

  min-height: 300px;

  padding: 36px;

  border-right:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-bottom:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  background:
    transparent;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      rgba(
        255,
        255,
        255,
        0.045
      );
  }

  @media (max-width: 768px) {
    min-height: 270px;

    padding: 30px;
  }
`;

/* ========================================
   NUMBER
======================================== */

const Number = styled.span`
  position: absolute;

  top: 30px;
  right: 32px;

  color:
    rgba(
      255,
      255,
      255,
      0.3
    );

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 0.12em;
`;

/* ========================================
   ICON
======================================== */

const Icon = styled.div`
  display: grid;

  place-items: center;

  width: 46px;
  height: 46px;

  margin-bottom: 30px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.55
    );

  border-radius: 50%;

  color:
    ${({ theme }) =>
      theme.colors.champagneLight};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 20px;

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  ${BenefitCard}:hover & {
    background:
      rgba(
        201,
        169,
        110,
        0.1
      );

    transform:
      rotate(8deg);
  }
`;

/* ========================================
   TITLE
======================================== */

const Title = styled.h2`
  margin:
    0 0
    14px;

  color:
    ${({ theme }) =>
      theme.colors.white};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 25px;

  font-weight: 500;

  line-height: 1.15;

  letter-spacing: -0.02em;
`;

/* ========================================
   DESCRIPTION
======================================== */

const CardDescription = styled.p`
  max-width: 360px;

  margin: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.58
    );

  font-size: 14px;

  line-height: 1.75;
`;

/* ========================================
   BOTTOM LINE
======================================== */

const BottomLine = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  gap:
    12px 24px;

  margin-top: 64px;

  color:
    rgba(
      255,
      255,
      255,
      0.42
    );

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  span {
    &:not(:last-child)::after {
      content: "•";

      margin-left: 24px;

      color:
        ${({ theme }) =>
          theme.colors.champagne};
    }
  }

  @media (max-width: 600px) {
    gap:
      8px 16px;

    line-height: 1.8;

    span:not(:last-child)::after {
      margin-left: 16px;
    }
  }
`;