import {
  Section,
  Container,
  Header,
  Eyebrow,
  Heading,
  Highlight,
  Description,
  ProfileGrid,
  ProfileCard,
  Number,
  Icon,
  Title,
  CardDescription,
  BottomStatement,
} from "./WhoItsFor.styles";

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

const WhoItsFor = () => {
  return (
    <Section id="who-its-for">
      <Container>
        <Header>
          <Eyebrow>Who Regal Affluence Is For</Eyebrow>

          <Heading>
            Built for people
            <br />
            who want to <Highlight>grow.</Highlight>
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
            <ProfileCard key={profile.number}>
              <Number>{profile.number}</Number>

              <Icon aria-hidden="true">{profile.icon}</Icon>

              <Title>{profile.title}</Title>

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