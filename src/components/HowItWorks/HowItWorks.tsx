import {
  Section,
  Container,
  Header,
  Eyebrow,
  Heading,
  Description,
  Steps,
  Step,
  StepHeader,
  StepNumber,
  StepIcon,
  StepContent,
  StepTitle,
  StepDescription,
  StepLine,
  BottomStatement,
} from "./HowItWorks.styles";

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

const HowItWorks = () => {
  return (
    <Section id="how-it-works">
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

              {index !== steps.length - 1 && <StepLine />}
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