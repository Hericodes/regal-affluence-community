import {
  Actions,
  BackgroundImage,
  BottomNote,
  Container,
  Content,
  Description,
  DecorativeOrb,
  Eyebrow,
  Glow,
  Heading,
  HeroBadge,
  HeroBadgeDot,
  HeroBadgeText,
  ImageVignette,
  Overlay,
  PrimaryButton,
  ScrollIndicator,
  ScrollLine,
  ScrollText,
  Section,
  SecondaryButton,
  Stat,
  StatLabel,
  StatStrip,
  StatValue,
} from "./Hero.styles";

const Hero = () => {
  return (
    <Section>
      {/* ========================================
          CINEMATIC BACKGROUND
      ======================================== */}

      <BackgroundImage aria-hidden="true" />

      <Overlay aria-hidden="true" />

      <ImageVignette aria-hidden="true" />

      {/* Atmospheric lighting */}
      <Glow $position="top" aria-hidden="true" />
      <Glow $position="right" aria-hidden="true" />
      <Glow $position="bottom" aria-hidden="true" />

      {/* Decorative luxury elements */}
      <DecorativeOrb
        $size="small"
        $position="one"
        aria-hidden="true"
      />

      <DecorativeOrb
        $size="large"
        $position="two"
        aria-hidden="true"
      />

      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <Container>
        <Content>
          <HeroBadge>
            <HeroBadgeDot aria-hidden="true" />

            <HeroBadgeText>
              The Regal Affluence Group
            </HeroBadgeText>
          </HeroBadge>

          <Eyebrow>
            A community built for the ambitious
          </Eyebrow>

          <Heading>
            Build your
            <br />
            network.
            <br />
            Build your <span>wealth.</span>
          </Heading>

          <Description>
            A growing community of ambitious people building
            meaningful relationships, accessing opportunities,
            and creating long-term wealth through real estate.
          </Description>

          <Actions>
            <PrimaryButton href="/join">
              <span>Join the community</span>

              <span
                className="arrow"
                aria-hidden="true"
              >
                →
              </span>
            </PrimaryButton>

            <SecondaryButton href="#about">
              <span>Discover Regal Affluence</span>

              <span
                className="secondaryArrow"
                aria-hidden="true"
              >
                ↓
              </span>
            </SecondaryButton>
          </Actions>

          <StatStrip>
            <Stat>
              <StatValue>01</StatValue>
              <StatLabel>Community</StatLabel>
            </Stat>

            <Stat>
              <StatValue>∞</StatValue>
              <StatLabel>Possibilities</StatLabel>
            </Stat>

            <Stat>
              <StatValue>Global</StatValue>
              <StatLabel>Mindset</StatLabel>
            </Stat>
          </StatStrip>
        </Content>
      </Container>

      {/* ========================================
          SCROLL INDICATOR
      ======================================== */}

      <ScrollIndicator
        href="#about"
        aria-label="Scroll to discover more"
      >
        <ScrollText>Explore</ScrollText>

        <ScrollLine aria-hidden="true">
          <span />
        </ScrollLine>
      </ScrollIndicator>

      {/* ========================================
          BOTTOM NOTE
      ======================================== */}

      <BottomNote>
        <span aria-hidden="true" />

        Open to ambitious minds worldwide

        <span aria-hidden="true" />
      </BottomNote>
    </Section>
  );
};

export default Hero;