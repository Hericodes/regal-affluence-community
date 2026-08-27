import styled from "styled-components";

/* ========================================
   DATA
======================================== */

const steps = [
  {
    number: "01",
    icon: "↗",
    title: "Submit Your Application",
    description:
      "Tell us a little about yourself, what you do, and why you want to be part of the Regal Affluence community.",
  },
  {
    number: "02",
    icon: "◎",
    title: "Get Reviewed",
    description:
      "Your application goes through an automated review process designed to help us understand your application and community fit.",
  },
  {
    number: "03",
    icon: "◇",
    title: "Join the Community",
    description:
      "Once your application is approved, you receive an invitation to join the Regal Affluence WhatsApp community.",
  },
  {
    number: "04",
    icon: "✦",
    title: "Connect & Grow",
    description:
      "Get involved, build relationships, learn, access opportunities, and grow alongside other ambitious professionals.",
  },
];

/* ========================================
   COMPONENT
======================================== */

const HowItWorks = () => {
  return (
    <Section>
      <Container>
        <Header>
          <div>
            <Eyebrow>How It Works</Eyebrow>

            <Heading>
              Getting started is
              <br />
              <span>simple.</span>
            </Heading>
          </div>

          <Description>
            Joining Regal Affluence is designed to be straightforward.
            Apply, get reviewed, join the community, and start building
            relationships and opportunities that support your growth.
          </Description>
        </Header>

        <Steps>
          {steps.map((step, index) => (
            <Step key={step.number}>
              <StepHeader>
                <StepNumber>{step.number}</StepNumber>

                <StepIcon aria-hidden="true">
                  {step.icon}
                </StepIcon>
              </StepHeader>

              <StepContent>
                <StepTitle>{step.title}</StepTitle>

                <StepDescription>
                  {step.description}
                </StepDescription>
              </StepContent>

              {index !== steps.length - 1 && (
                <StepLine aria-hidden="true" />
              )}
            </Step>
          ))}
        </Steps>

        <BottomStatement>
          <span>Apply.</span>
          <span>Connect.</span>
          <span>Grow.</span>
        </BottomStatement>
      </Container>
    </Section>
  );
};

export default HowItWorks;

/* ========================================
   SECTION
======================================== */

const Section = styled.section`
  position: relative;

  width: 100%;

  padding: 120px 0;

  background:
    ${({ theme }) =>
      theme.colors.ivory};

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
  display: grid;

  grid-template-columns:
    minmax(0, 1.2fr)
    minmax(280px, 0.8fr);

  gap: 80px;

  align-items: end;

  margin-bottom: 90px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 28px;

    margin-bottom: 64px;
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
  max-width: 850px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.text};

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

  span {
    color:
      ${({ theme }) =>
        theme.colors.purple};

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
  max-width: 520px;

  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 16px;

  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 15px;

    line-height: 1.7;
  }
`;

/* ========================================
   STEPS
======================================== */

const Steps = styled.div`
  position: relative;

  display: grid;

  grid-template-columns:
    repeat(
      4,
      minmax(0, 1fr)
    );

  border:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  overflow: hidden;

  background:
    ${({ theme }) =>
      theme.colors.border};

  gap: 1px;

  @media (max-width: 1000px) {
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
   STEP
======================================== */

const Step = styled.article`
  position: relative;

  min-height: 330px;

  padding: 36px;

  background:
    ${({ theme }) =>
      theme.colors.white};

  transition:
    background 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background:
      ${({ theme }) =>
        theme.colors.cream};
  }

  @media (max-width: 1000px) {
    min-height: 300px;
  }

  @media (max-width: 768px) {
    min-height: 260px;

    padding: 30px;
  }

  @media (max-width: 600px) {
    min-height: auto;

    padding:
      30px
      28px;
  }
`;

/* ========================================
   STEP HEADER
======================================== */

const StepHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 70px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

/* ========================================
   STEP NUMBER
======================================== */

const StepNumber = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size: 18px;

  font-weight: 600;

  letter-spacing: 0.04em;
`;

/* ========================================
   STEP ICON
======================================== */

const StepIcon = styled.span`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  border:
    1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.pill};

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size: 16px;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  ${Step}:hover & {
    background:
      ${({ theme }) =>
        theme.colors.purple};

    border-color:
      ${({ theme }) =>
        theme.colors.purple};

    color:
      ${({ theme }) =>
        theme.colors.white};
  }
`;

/* ========================================
   STEP CONTENT
======================================== */

const StepContent = styled.div`
  max-width: 300px;
`;

/* ========================================
   STEP TITLE
======================================== */

const StepTitle = styled.h2`
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
      1.55rem,
      2.5vw,
      2rem
    );

  font-weight: 600;

  line-height: 1.1;

  letter-spacing: -0.025em;
`;

/* ========================================
   STEP DESCRIPTION
======================================== */

const StepDescription = styled.p`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 14px;

  line-height: 1.75;
`;

/* ========================================
   STEP LINE
======================================== */

const StepLine = styled.span`
  position: absolute;

  top: 56px;

  right: -1px;

  width: 1px;

  height: 54px;

  background:
    ${({ theme }) =>
      theme.colors.champagne};

  opacity: 0.35;

  @media (max-width: 1000px) {
    display: none;
  }
`;

/* ========================================
   BOTTOM STATEMENT
======================================== */

const BottomStatement = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  gap: 22px;

  margin-top: 72px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      1.5rem,
      3vw,
      2.3rem
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

  @media (max-width: 600px) {
    flex-direction: column;

    gap: 8px;

    margin-top: 52px;

    font-size: 1.7rem;

    span:not(:last-child)::after {
      display: none;
    }
  }
`;