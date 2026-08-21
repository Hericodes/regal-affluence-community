import {
  Section,
  Container,
  Header,
  Eyebrow,
  Heading,
  Description,
  BenefitsGrid,
  BenefitCard,
  Number,
  Icon,
  Title,
  CardDescription,
  BottomLine,
} from "./Benefits.styles";

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

const Benefits = () => {
  return (
    <Section id="benefits">
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