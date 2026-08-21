import {
  Section,
  BackgroundGlow,
  DecorativeLine,
  Container,
  Top,
  Brand,
  BrandMark,
  BrandMarkSymbol,
  BrandEyebrow,
  BrandName,
  BrandDescription,
  CommunityLink,
  CommunityArrow,
  Links,
  LinkGroup,
  LinkTitle,
  LinkList,
  FooterLink,
  LinkArrow,
  Bottom,
  Copyright,
  Legal,
  LegalLink,
  BottomBrand,
} from "./Footer.styles";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Section>
      {/* Decorative background elements */}
      <BackgroundGlow aria-hidden="true" />
      <DecorativeLine aria-hidden="true" />

      <Container>
        <Top>
          {/* ========================================
              BRAND
          ======================================== */}

          <Brand>
            <BrandMark aria-hidden="true">
              <BrandMarkSymbol>RA</BrandMarkSymbol>
            </BrandMark>

            <BrandEyebrow>
              The Regal Affluence Group
            </BrandEyebrow>

            <BrandName>
              Build relationships.
              <br />
              <span>Build wealth.</span>
            </BrandName>

            <BrandDescription>
              Building meaningful relationships, accessing
              opportunities, and creating long-term wealth
              through real estate, knowledge, and community.
            </BrandDescription>

            <CommunityLink
              href="https://chat.whatsapp.com/LXNSKWf1E8JCxECrBxpm6f?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Regal Affluence WhatsApp community"
            >
              <span>Join the community</span>

              <CommunityArrow aria-hidden="true">
                →
              </CommunityArrow>
            </CommunityLink>
          </Brand>

          {/* ========================================
              NAVIGATION
          ======================================== */}

          <Links>
            <LinkGroup>
              <LinkTitle>Explore</LinkTitle>

              <LinkList>
                <li>
                  <FooterLink href="#about">
                    <span>About</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink href="#benefits">
                    <span>Benefits</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink href="#community">
                    <span>Community</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink href="#how-it-works">
                    <span>How It Works</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>
              </LinkList>
            </LinkGroup>

            <LinkGroup>
              <LinkTitle>Connect</LinkTitle>

              <LinkList>
                <li>
                  <FooterLink href="#who-its-for">
                    <span>Who It's For</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink href="/join">
                    <span>Apply to Join</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="https://www.instagram.com/regal_affluence_group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram — Group</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="https://www.instagram.com/regal_affluence_realty"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram — Realty</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>

                <li>
                  <FooterLink
                    href="https://chat.whatsapp.com/LXNSKWf1E8JCxECrBxpm6f?mode=gi_t"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>WhatsApp Community</span>
                    <LinkArrow aria-hidden="true">
                      ↗
                    </LinkArrow>
                  </FooterLink>
                </li>
              </LinkList>
            </LinkGroup>
          </Links>
        </Top>

        {/* ========================================
            BOTTOM
        ======================================== */}

        <Bottom>
          <Copyright>
            © {currentYear} Regal Affluence. All rights reserved.
          </Copyright>

          <BottomBrand aria-hidden="true">
            REGAL <span>•</span> AFFLUENCE
          </BottomBrand>

          <Legal>
            <LegalLink href="/privacy">
              Privacy Policy
            </LegalLink>

            <LegalLink href="/terms">
              Terms & Conditions
            </LegalLink>
          </Legal>
        </Bottom>
      </Container>
    </Section>
  );
};

export default Footer;