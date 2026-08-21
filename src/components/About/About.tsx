import {
  Section,
  Container,
  Intro,
  Eyebrow,
  Heading,
  Highlight,
  Description,
  Columns,
  Column,
  ColumnTop,
  ColumnNumber,
  ColumnIndex,
  ColumnTitle,
  ColumnDescription,
  Divider,
  ColumnFooter,
  ColumnLink,
  BottomStatement,
  BackgroundGlow,
  GridPattern,
  IntroAccent,
} from "./About.styles";

const About = () => {
  return (
    <Section id="about">
      <BackgroundGlow
        $position="left"
        aria-hidden="true"
      />

      <BackgroundGlow
        $position="right"
        aria-hidden="true"
      />

      <GridPattern aria-hidden="true" />

      <Container>
        <Intro>
          <IntroAccent aria-hidden="true" />

          <Eyebrow>
            About Regal Affluence
          </Eyebrow>

          <Heading>
            More than real estate.
            <br />
            <Highlight>
              A community built for growth.
            </Highlight>
          </Heading>

          <Description>
            Regal Affluence is a real estate company and
            growing professional community built around
            property, wealth creation, and excellence.
          </Description>

          <Description>
            We help individuals discover valuable real estate
            opportunities, make informed property decisions,
            and build long-term wealth through strategic
            property investment, sales, and advisory services.
          </Description>
        </Intro>

        <Columns>
          {/* ================================
              COMMUNITY
          ================================= */}

          <Column>
            <ColumnTop>
              <ColumnNumber>
                01
              </ColumnNumber>

              <ColumnIndex>
                COMMUNITY
              </ColumnIndex>
            </ColumnTop>

            <ColumnTitle>
              Regal Affluence Group
            </ColumnTitle>

            <ColumnDescription>
              A growing community of ambitious,
              knowledgeable, ethical, and high-performing
              real estate professionals.
            </ColumnDescription>

            <Divider />

            <ColumnDescription>
              We create a platform where people can learn,
              build relationships, access opportunities, and
              grow alongside other like-minded professionals.
            </ColumnDescription>

            <ColumnFooter>
              <ColumnLink href="#community">
                Explore the community
                <span aria-hidden="true">
                  ↗
                </span>
              </ColumnLink>
            </ColumnFooter>
          </Column>

          {/* ================================
              REAL ESTATE
          ================================= */}

          <Column>
            <ColumnTop>
              <ColumnNumber>
                02
              </ColumnNumber>

              <ColumnIndex>
                REAL ESTATE
              </ColumnIndex>
            </ColumnTop>

            <ColumnTitle>
              Regal Affluence Realty
            </ColumnTitle>

            <ColumnDescription>
              A real estate platform connecting clients with
              quality property opportunities and providing
              professional real estate solutions.
            </ColumnDescription>

            <Divider />

            <ColumnDescription>
              Through strategic property investment, sales,
              and advisory services, we help turn opportunity
              into real results.
            </ColumnDescription>

            <ColumnFooter>
              <ColumnLink href="#realty">
                Explore our realty
                <span aria-hidden="true">
                  ↗
                </span>
              </ColumnLink>
            </ColumnFooter>
          </Column>
        </Columns>

        <BottomStatement>
          <span>People.</span>
          <span>Opportunities.</span>
          <span>Wealth.</span>
        </BottomStatement>
      </Container>
    </Section>
  );
};

export default About;