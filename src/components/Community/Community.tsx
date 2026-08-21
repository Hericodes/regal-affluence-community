import {
  Section,
  BackgroundGlow,
  GridPattern,
  Container,
  Header,
  HeaderContent,
  Eyebrow,
  Heading,
  Description,
  HeaderMeta,
  HeaderMetaNumber,
  HeaderMetaLabel,
  CommunityLayout,
  CommunityIntro,
  CommunityLabel,
  CommunityTitle,
  CommunityDescription,
  CommunityRule,
  ActivitiesGrid,
  ActivityCard,
  ActivityTop,
  ActivityNumber,
  ActivityIcon,
  ActivityTitle,
  ActivityDescription,
  ActivityArrow,
  Participation,
  ParticipationHeader,
  ParticipationContent,
  ParticipationTitle,
  ParticipationDescription,
  ParticipationList,
  ParticipationItem,
  ParticipationNumber,
  ParticipationText,
  ParticipationArrow,
  BottomStatement,
  BottomLine,
} from "./Community.styles";

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
    icon: "↗",
    title: "Business Opportunities",
    description:
      "Connect with people, ideas, and opportunities that can create new possibilities for your career and business.",
  },
  {
    number: "04",
    icon: "◈",
    title: "Investment Opportunities",
    description:
      "Gain access to valuable real estate and investment opportunities while becoming better equipped to make informed decisions.",
  },
  {
    number: "05",
    icon: "✦",
    title: "Training",
    description:
      "Develop practical knowledge and professional skills through training designed to help members become better at what they do.",
  },
  {
    number: "06",
    icon: "∞",
    title: "Partnerships",
    description:
      "Create relationships that can develop into meaningful collaborations, partnerships, and long-term professional opportunities.",
  },
  {
    number: "07",
    icon: "✧",
    title: "Personal Development",
    description:
      "Grow beyond real estate by developing the mindset, confidence, discipline, and professional standards required for long-term success.",
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

const Community = () => {
  return (
    <Section id="community">
      {/* Decorative atmosphere */}
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
            <Eyebrow>The Regal Affluence Community</Eyebrow>

            <Heading>
              Where ambitious people
              <br />
              <span>connect and grow.</span>
            </Heading>
          </HeaderContent>

          <HeaderMeta aria-hidden="true">
            <HeaderMetaNumber>RA</HeaderMetaNumber>

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

            <CommunityRule aria-hidden="true" />
          </CommunityIntro>

          <ActivitiesGrid>
            {activities.map((activity) => (
              <ActivityCard key={activity.number}>
                <ActivityTop>
                  <ActivityNumber>
                    {activity.number}
                  </ActivityNumber>

                  <ActivityIcon aria-hidden="true">
                    {activity.icon}
                  </ActivityIcon>
                </ActivityTop>

                <ActivityTitle>
                  {activity.title}
                </ActivityTitle>

                <ActivityDescription>
                  {activity.description}
                </ActivityDescription>

                <ActivityArrow aria-hidden="true">
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
              <Eyebrow>How Members Participate</Eyebrow>

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
              <ParticipationItem key={item.number}>
                <ParticipationNumber>
                  {item.number}
                </ParticipationNumber>

                <ParticipationText>
                  <strong>{item.title}</strong>

                  <p>{item.description}</p>
                </ParticipationText>

                <ParticipationArrow aria-hidden="true">
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