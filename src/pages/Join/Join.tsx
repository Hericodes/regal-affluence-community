import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  SubmitEvent,
} from "react";

import styled, {
  keyframes,
} from "styled-components";

/* =====================================================
   GOOGLE SHEETS API
===================================================== */

const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbzNHL0mcmPqJ15NAiRM1io3ilwUXlulo8vrV7qdSgy9qYxyjkzk5O5VjNgpvxaeeCSh/exec";

/* =====================================================
   WHATSAPP COMMUNITY LINK

   IMPORTANT:
   This is only shown AFTER a successful
   application submission.
===================================================== */

const COMMUNITY_LINK =
  "https://chat.whatsapp.com/LXNSKWf1E8JCxECrBxpm6f?mode=gi_t";

/* =====================================================
   COMPONENT
===================================================== */

const Join = () => {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const [termsRead, setTermsRead] =
    useState(false);

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const termsRef =
    useRef<HTMLDivElement>(null);

  /* ===================================================
     TERMS SCROLL DETECTION
  =================================================== */

  const handleTermsScroll = () => {
    const terms = termsRef.current;

    if (!terms || termsRead) {
      return;
    }

    const reachedBottom =
      terms.scrollTop +
        terms.clientHeight >=
      terms.scrollHeight - 8;

    if (reachedBottom) {
      setTermsRead(true);
    }
  };

  /* ===================================================
     ACCESSIBILITY / INITIAL CHECK
  =================================================== */

  useEffect(() => {
    const terms = termsRef.current;

    if (!terms) {
      return;
    }

    const alreadyFits =
      terms.scrollHeight <=
      terms.clientHeight + 8;

    if (alreadyFits) {
      setTermsRead(true);
    }
  }, []);

  /* ===================================================
     SUBMIT
  =================================================== */

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!termsRead) {
      setError(
        "Please read the Terms & Conditions to the end before submitting your application."
      );

      return;
    }

    if (!termsAccepted) {
      setError(
        "Please confirm that you have read and agree to the Terms & Conditions."
      );

      return;
    }

    setIsSubmitting(true);
    setError("");

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const application = {
      fullName: String(
        formData.get("fullName") || ""
      ).trim(),

      email: String(
        formData.get("email") || ""
      ).trim(),

      phone: String(
        formData.get("phone") || ""
      ).trim(),

      occupation: String(
        formData.get("occupation") || ""
      ).trim(),

      businessName: String(
        formData.get("businessName") || ""
      ).trim(),

      location: String(
        formData.get("location") || ""
      ).trim(),

      socialMedia: String(
        formData.get("socialMedia") || ""
      ).trim(),

      referralSource: String(
        formData.get("referralSource") || ""
      ).trim(),

      whyJoin: String(
        formData.get("whyJoin") || ""
      ).trim(),

      skills: String(
        formData.get("skills") || ""
      ).trim(),

      termsAccepted: true,
    };

    try {
      const response =
        await fetch(
          GOOGLE_SHEETS_API,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8",
            },

            body:
              JSON.stringify(
                application
              ),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to submit application."
        );
      }

      const result =
        await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Application submission failed."
        );
      }

      /*
       * Only mark the application as
       * submitted after Google Sheets
       * confirms success.
       */

      setSubmitted(true);

      form.reset();

      /*
       * Reset local agreement state.
       * This doesn't affect the success
       * screen because submitted is true.
       */

      setTermsAccepted(false);
      setTermsRead(false);
    } catch (submissionError) {
      console.error(
        "Application submission error:",
        submissionError
      );

      setError(
        "Something went wrong while submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ===================================================
     SUCCESS STATE
  =================================================== */

  if (submitted) {
    return (
      <Section>
        <Container>
          <SuccessMessage>
            <Eyebrow>
              Application Received
            </Eyebrow>

            <Heading>
              Welcome to
              <br />
              <span>
                Regal Affluence.
              </span>
            </Heading>

            <Description>
              Your application has
              been submitted
              successfully.

              <br />
              <br />

              You can now join the
              Regal Affluence
              community on WhatsApp.
            </Description>

            <SubmitButton
              as="a"
              href={COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the community

              <SubmitArrow
                aria-hidden="true"
              >
                →
              </SubmitArrow>
            </SubmitButton>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  /* ===================================================
     APPLICATION FORM
  =================================================== */

  return (
    <Section>
      <Container>
        {/* =================================================
            HEADER
        ================================================= */}

        <Header>
          <Eyebrow>
            Join Regal Affluence
          </Eyebrow>

          <Heading>
            Your next chapter
            <br />
            starts{" "}
            <span>
              here.
            </span>
          </Heading>

          <Description>
            Tell us a little about
            yourself and why you want
            to be part of the Regal
            Affluence community.

            <br />
            <br />

            There are no membership
            requirements — we are
            looking for ambitious
            people who are ready to
            learn, grow, connect,
            and create long-term
            wealth.
          </Description>
        </Header>

        {/* =================================================
            FORM
        ================================================= */}

        <Form
          onSubmit={handleSubmit}
        >
          <FormGrid>

            {/* =============================================
                FULL NAME
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="fullName">
                Full Name{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your full name"
                required
                autoComplete="name"
              />
            </FieldGroup>

            {/* =============================================
                EMAIL
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="email">
                Email Address{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </FieldGroup>

            {/* =============================================
                PHONE
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="phone">
                Phone Number{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+234..."
                required
                autoComplete="tel"
              />
            </FieldGroup>

            {/* =============================================
                OCCUPATION
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="occupation">
                Occupation{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="occupation"
                name="occupation"
                type="text"
                placeholder="What do you do?"
                required
              />
            </FieldGroup>

            {/* =============================================
                BUSINESS NAME
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="businessName">
                Business Name{" "}
                <Optional>
                  (Optional)
                </Optional>
              </Label>

              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Your business name"
              />
            </FieldGroup>

            {/* =============================================
                LOCATION
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="location">
                Location{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="location"
                name="location"
                type="text"
                placeholder="City / Country"
                required
                autoComplete="address-level2"
              />
            </FieldGroup>

            {/* =============================================
                SOCIAL MEDIA
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="socialMedia">
                Social Media Handles{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Input
                id="socialMedia"
                name="socialMedia"
                type="text"
                placeholder="@username or links"
                required
              />
            </FieldGroup>

            {/* =============================================
                REFERRAL SOURCE
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="referralSource">
                How did you hear
                about us?{" "}
                <Required>
                  *
                </Required>
              </Label>

              <Select
                id="referralSource"
                name="referralSource"
                defaultValue=""
                required
              >
                <option
                  value=""
                  disabled
                >
                  Select an option
                </option>

                <option value="instagram">
                  Instagram
                </option>

                <option value="whatsapp">
                  WhatsApp
                </option>

                <option value="referral">
                  Friend / Referral
                </option>

                <option value="event">
                  Event
                </option>

                <option value="google">
                  Google / Search
                </option>

                <option value="other">
                  Other
                </option>
              </Select>
            </FieldGroup>

            {/* =============================================
                WHY JOIN
            ============================================== */}

            <FullWidth>
              <FieldGroup>
                <Label htmlFor="whyJoin">
                  Why do you want
                  to join Regal
                  Affluence?{" "}
                  <Required>
                    *
                  </Required>
                </Label>

                <Textarea
                  id="whyJoin"
                  name="whyJoin"
                  placeholder="Tell us what you hope to learn, build, or achieve..."
                  rows={6}
                  required
                />
              </FieldGroup>
            </FullWidth>

            {/* =============================================
                SKILLS
            ============================================== */}

            <FullWidth>
              <FieldGroup>
                <Label htmlFor="skills">
                  Skills / Expertise{" "}
                  <Required>
                    *
                  </Required>
                </Label>

                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="Tell us about your skills, experience, or areas of expertise..."
                  rows={5}
                  required
                />
              </FieldGroup>
            </FullWidth>

          </FormGrid>

          {/* =================================================
              TERMS & CONDITIONS
          ================================================= */}

          <TermsSection>
            <TermsHeader>
              <div>
                <TermsEyebrow>
                  Before You Submit
                </TermsEyebrow>

                <TermsTitle>
                  Terms &amp;
                  Conditions
                </TermsTitle>
              </div>

              <TermsStatus
                $read={termsRead}
              >
                <StatusDot
                  $read={termsRead}
                />

                {termsRead
                  ? "Read"
                  : "Please read"}
              </TermsStatus>
            </TermsHeader>

            <TermsIntro>
              Please read the following
              temporary Terms &amp;
              Conditions carefully. You
              must scroll to the end before
              you can accept them.
            </TermsIntro>

            <TermsBox
              ref={termsRef}
              onScroll={
                handleTermsScroll
              }
              tabIndex={0}
              aria-label="Regal Affluence Terms and Conditions"
            >
              {/* =========================================
                  TEMPORARY DOCUMENT
              ========================================== */}

              <DraftNotice>
                TEMPORARY DOCUMENT — DRAFT
              </DraftNotice>

              <TermsDocumentTitle>
                REGAL AFFLUENCE
                <br />
                COMMUNITY TERMS
                &amp; CONDITIONS
              </TermsDocumentTitle>

              <TermsMeta>
                Working Draft
              </TermsMeta>

              <TermsRule />

              <TermsHeading>
                1. Purpose of the
                Community
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence is a
                professional community
                created to bring together
                ambitious individuals
                interested in learning,
                building meaningful
                relationships, discovering
                opportunities, and pursuing
                long-term personal and
                professional growth.
              </TermsParagraph>

              <TermsParagraph>
                Membership is intended for
                individuals who are willing
                to contribute positively to
                the community and conduct
                themselves with
                professionalism, integrity,
                and respect.
              </TermsParagraph>

              <TermsHeading>
                2. Application &
                Membership
              </TermsHeading>

              <TermsParagraph>
                Submission of an
                application does not
                automatically guarantee
                membership. Regal Affluence
                reserves the right to review
                applications and determine
                whether an applicant is a
                suitable fit for the
                community.
              </TermsParagraph>

              <TermsParagraph>
                Applicants are expected to
                provide truthful and
                accurate information during
                the application process.
                Providing misleading,
                fraudulent, or intentionally
                false information may result
                in rejection of an application
                or removal from the community.
              </TermsParagraph>

              <TermsHeading>
                3. Professional Conduct
              </TermsHeading>

              <TermsParagraph>
                Members are expected to
                communicate respectfully
                with other members and
                representatives of Regal
                Affluence.
              </TermsParagraph>

              <TermsParagraph>
                Harassment, discrimination,
                abusive communication,
                deliberate disruption,
                impersonation, scams,
                fraudulent activity, and
                other conduct that may
                negatively affect the
                community are not permitted.
              </TermsParagraph>

              <TermsHeading>
                4. Opportunities &amp;
                Information
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence may share
                information relating to
                property, business,
                networking, investment,
                training, partnerships, and
                other opportunities.
              </TermsParagraph>

              <TermsParagraph>
                Members are responsible for
                conducting their own
                research and due diligence
                before making decisions
                based on information or
                opportunities shared within
                the community.
              </TermsParagraph>

              <TermsParagraph>
                Participation in the
                community does not
                constitute a guarantee of
                financial returns, business
                success, investment
                performance, employment,
                partnership, or any specific
                outcome.
              </TermsParagraph>

              <TermsHeading>
                5. Confidentiality &amp;
                Respect
              </TermsHeading>

              <TermsParagraph>
                Members should respect the
                privacy of other members
                and avoid sharing private
                conversations, personal
                information, or confidential
                community materials without
                appropriate permission.
              </TermsParagraph>

              <TermsHeading>
                6. Community Access
              </TermsHeading>

              <TermsParagraph>
                Access to private community
                channels, groups, events,
                resources, or opportunities
                may be subject to membership
                approval and additional
                requirements communicated
                by Regal Affluence.
              </TermsParagraph>

              <TermsParagraph>
                Community access may be
                suspended or withdrawn where
                there is a reasonable basis
                to believe that a member has
                violated community standards
                or otherwise acted against
                the interests of the
                community.
              </TermsParagraph>

              <TermsHeading>
                7. Content &amp;
                Communication
              </TermsHeading>

              <TermsParagraph>
                Members are responsible for
                the content they contribute
                to community discussions,
                events, and communication
                channels.
              </TermsParagraph>

              <TermsParagraph>
                Members should not knowingly
                publish misleading, illegal,
                harmful, defamatory, or
                inappropriate content within
                the community.
              </TermsParagraph>

              <TermsHeading>
                8. Changes to These Terms
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence may update
                these Terms &amp; Conditions
                from time to time as the
                community develops.
              </TermsParagraph>

              <TermsParagraph>
                Updated terms may replace
                this temporary draft and
                members may be required to
                review and accept the updated
                version where appropriate.
              </TermsParagraph>

              <TermsHeading>
                9. Acceptance
              </TermsHeading>

              <TermsParagraph>
                By accepting these terms,
                you confirm that you have
                read the document and agree
                to respect the standards,
                principles, and expectations
                described above.
              </TermsParagraph>

              <TermsParagraph>
                This document is currently a
                temporary working draft and
                may be replaced by the final
                Regal Affluence Terms &amp;
                Conditions before or after
                community launch.
              </TermsParagraph>

              <TermsRule />

              <TermsEnd>
                END OF TEMPORARY TERMS
                &amp; CONDITIONS
              </TermsEnd>
            </TermsBox>

            {/* =========================================
                READING STATUS
            ========================================== */}

            <ReadingHint
              $read={termsRead}
            >
              <HintIcon
                $read={termsRead}
              >
                {termsRead
                  ? "✓"
                  : "↓"}
              </HintIcon>

              <span>
                {termsRead
                  ? "You have reached the end of the document."
                  : "Read to the very end of the document to unlock the agreement."}
              </span>
            </ReadingHint>

            {/* =========================================
                AGREEMENT
            ========================================== */}

            <AgreementRow
              $enabled={termsRead}
              onClick={() => {
                if (!termsRead) return;

                setTermsAccepted(
                  (current) => !current
                );
              }}
              role="checkbox"
              aria-checked={termsAccepted}
              aria-disabled={!termsRead}
              tabIndex={termsRead ? 0 : -1}
              onKeyDown={(event) => {
                if (
                  !termsRead
                ) {
                  return;
                }

                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();

                  setTermsAccepted(
                    (current) => !current
                  );
                }
              }}
            >
              <CheckboxWrapper
                $enabled={termsRead}
              >
                <CheckboxVisual
                  $checked={termsAccepted}
                  $enabled={termsRead}
                  aria-hidden="true"
                >
                  {termsAccepted && "✓"}
                </CheckboxVisual>
              </CheckboxWrapper>

              <AgreementLabel
                $enabled={termsRead}
              >
                I have read the Terms
                &amp; Conditions and agree
                to abide by the standards
                of the Regal Affluence
                community.
              </AgreementLabel>
            </AgreementRow>
          </TermsSection>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {/* =================================================
              NOTE
          ================================================= */}

          <Note>
            By submitting this
            application, you agree to
            provide accurate information
            and uphold the professional
            and ethical standards of the
            Regal Affluence community.
          </Note>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <SubmitButton
            type="submit"
            disabled={
              isSubmitting ||
              !termsRead ||
              !termsAccepted
            }
            title={
              !termsRead
                ? "Read the Terms & Conditions first"
                : !termsAccepted
                  ? "Accept the Terms & Conditions first"
                  : "Submit your application"
            }
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}

            {!isSubmitting && (
              <SubmitArrow
                aria-hidden="true"
              >
                →
              </SubmitArrow>
            )}
          </SubmitButton>
        </Form>
      </Container>
    </Section>
  );
};

export default Join;

/* =====================================================
   ANIMATIONS
===================================================== */

const successIn =
  keyframes`
    from {
      opacity: 0;

      transform:
        translateY(20px);
    }

    to {
      opacity: 1;

      transform:
        translateY(0);
    }
  `;

/* =====================================================
   SECTION
===================================================== */

const Section =
  styled.section`
    position: relative;

    width: 100%;

    min-height: 100svh;

    padding:
      150px 0 100px;

    overflow: hidden;

    background:
      linear-gradient(
        135deg,
        ${({ theme }) =>
          theme.colors.ivory}
          0%,
        ${({ theme }) =>
          theme.colors.cream}
          52%,
        #eee4f6
          100%
      );

    color:
      ${({ theme }) =>
        theme.colors.text};

    isolation: isolate;

    &::before {
      content: "";

      position: absolute;

      top: -180px;

      right: -180px;

      width: 480px;

      height: 480px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(
            91,
            33,
            182,
            0.08
          ),
          transparent 68%
        );

      filter:
        blur(40px);

      pointer-events:
        none;

      z-index: -1;
    }

    &::after {
      content: "";

      position: absolute;

      bottom: -220px;

      left: -180px;

      width: 460px;

      height: 460px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(
            201,
            169,
            110,
            0.09
          ),
          transparent 68%
        );

      filter:
        blur(45px);

      pointer-events:
        none;

      z-index: -1;
    }

    @media (max-width: 768px) {
      padding:
        120px 0 80px;
    }

    @media (max-width: 480px) {
      padding:
        105px 0 64px;
    }
  `;

/* =====================================================
   CONTAINER
===================================================== */

const Container =
  styled.div`
    position: relative;

    width:
      min(
        calc(100% - 48px),
        1120px
      );

    margin: 0 auto;

    @media (max-width: 768px) {
      width:
        min(
          calc(100% - 32px),
          1120px
        );
    }
  `;

/* =====================================================
   HEADER
===================================================== */

const Header =
  styled.header`
    max-width: 820px;

    margin-bottom: 64px;

    @media (max-width: 768px) {
      margin-bottom: 48px;
    }
  `;

/* =====================================================
   EYEBROW
===================================================== */

const Eyebrow =
  styled.p`
    display: inline-flex;

    align-items: center;

    gap: 10px;

    margin:
      0 0 22px;

    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-size: 11px;

    font-weight: 700;

    letter-spacing:
      0.2em;

    line-height:
      1.4;

    text-transform:
      uppercase;

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
      margin-bottom:
        18px;

      font-size: 10px;

      letter-spacing:
        0.16em;
    }
  `;

/* =====================================================
   HEADING
===================================================== */

const Heading =
  styled.h1`
    max-width: 900px;

    margin: 0;

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        3.2rem,
        6.5vw,
        6rem
      );

    font-weight: 500;

    line-height:
      0.96;

    letter-spacing:
      -0.045em;

    text-wrap:
      balance;

    span {
      color:
        ${({ theme }) =>
          theme.colors.purple};

      font-style:
        italic;
    }

    @media (max-width: 768px) {
      font-size:
        clamp(
          2.8rem,
          12vw,
          4.8rem
        );

      line-height:
        0.98;
    }

    @media (max-width: 480px) {
      font-size:
        clamp(
          2.55rem,
          12vw,
          4rem
        );
    }
  `;

/* =====================================================
   DESCRIPTION
===================================================== */

const Description =
  styled.p`
    max-width: 720px;

    margin:
      28px 0 0;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 17px;

    line-height:
      1.8;

    @media (max-width: 768px) {
      margin-top:
        22px;

      font-size: 15px;

      line-height:
        1.7;
    }
  `;

/* =====================================================
   FORM
===================================================== */

const Form =
  styled.form`
    position: relative;

    width: 100%;

    padding: 52px;

    background:
      rgba(
        255,
        255,
        255,
        0.86
      );

    border:
      1px solid
      rgba(
        69,
        35,
        105,
        0.12
      );

    border-radius:
      ${({ theme }) =>
        theme.radius.lg};

    box-shadow:
      0
      25px
      70px
      rgba(
        60,
        35,
        82,
        0.08
      );

    backdrop-filter:
      blur(12px);

    -webkit-backdrop-filter:
      blur(12px);

    @media (max-width: 768px) {
      padding:
        36px 28px;
    }

    @media (max-width: 480px) {
      padding:
        28px 20px;
    }
  `;

/* =====================================================
   FORM GRID
===================================================== */

const FormGrid =
  styled.div`
    display: grid;

    grid-template-columns:
      repeat(
        2,
        minmax(
          0,
          1fr
        )
      );

    gap:
      28px 24px;

    @media (max-width: 680px) {
      grid-template-columns:
        1fr;

      gap: 24px;
    }
  `;

/* =====================================================
   FULL WIDTH
===================================================== */

const FullWidth =
  styled.div`
    grid-column:
      1 / -1;
  `;

/* =====================================================
   FIELD GROUP
===================================================== */

const FieldGroup =
  styled.div`
    display: flex;

    flex-direction:
      column;

    gap: 9px;
  `;

/* =====================================================
   LABEL
===================================================== */

const Label =
  styled.label`
    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 12px;

    font-weight: 700;

    letter-spacing:
      0.04em;
  `;

/* =====================================================
   REQUIRED
===================================================== */

const Required =
  styled.span`
    color:
      ${({ theme }) =>
        theme.colors.purple};
  `;

/* =====================================================
   OPTIONAL
===================================================== */

const Optional =
  styled.span`
    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-weight: 500;
  `;

/* =====================================================
   INPUT
===================================================== */

const Input =
  styled.input`
    width: 100%;

    min-height: 52px;

    padding:
      0 16px;

    border:
      1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius:
      ${({ theme }) =>
        theme.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 15px;

    outline: none;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color:
        ${({ theme }) =>
          theme.colors.textMuted};

      opacity:
        0.65;
    }

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({ theme }) =>
          theme.colors.purple};

      background:
        ${({ theme }) =>
          theme.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `;

/* =====================================================
   SELECT
===================================================== */

const Select =
  styled.select`
    width: 100%;

    min-height: 52px;

    padding:
      0 16px;

    border:
      1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius:
      ${({ theme }) =>
        theme.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 15px;

    outline: none;

    cursor:
      pointer;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({ theme }) =>
          theme.colors.purple};

      background:
        ${({ theme }) =>
          theme.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `;

/* =====================================================
   TEXTAREA
===================================================== */

const Textarea =
  styled.textarea`
    width: 100%;

    min-height: 140px;

    padding:
      15px 16px;

    border:
      1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius:
      ${({ theme }) =>
        theme.radius.sm};

    background:
      rgba(
        250,
        248,
        243,
        0.9
      );

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 15px;

    line-height:
      1.65;

    outline: none;

    resize:
      vertical;

    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color:
        ${({ theme }) =>
          theme.colors.textMuted};

      opacity:
        0.65;
    }

    &:hover {
      border-color:
        rgba(
          91,
          33,
          182,
          0.3
        );
    }

    &:focus {
      border-color:
        ${({ theme }) =>
          theme.colors.purple};

      background:
        ${({ theme }) =>
          theme.colors.white};

      box-shadow:
        0
        0
        0 3px
        rgba(
          91,
          33,
          182,
          0.08
        );
    }
  `;

/* =====================================================
   TERMS SECTION
===================================================== */

const TermsSection =
  styled.section`
    margin-top:
      52px;

    padding-top:
      44px;

    border-top:
      1px solid
      rgba(
        69,
        35,
        105,
        0.12
      );

    @media (max-width: 768px) {
      margin-top:
        42px;

      padding-top:
        36px;
    }
  `;

/* =====================================================
   TERMS HEADER
===================================================== */

const TermsHeader =
  styled.div`
    display: flex;

    align-items:
      flex-end;

    justify-content:
      space-between;

    gap: 24px;

    margin-bottom:
      16px;

    @media (max-width: 600px) {
      align-items:
        flex-start;

      flex-direction:
        column;

      gap: 14px;
    }
  `;

/* =====================================================
   TERMS EYEBROW
===================================================== */

const TermsEyebrow =
  styled.p`
    margin:
      0 0 8px;

    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.18em;

    text-transform:
      uppercase;
  `;

/* =====================================================
   TERMS TITLE
===================================================== */

const TermsTitle =
  styled.h2`
    margin: 0;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        2rem,
        4vw,
        3rem
      );

    font-weight: 500;

    line-height:
      1;

    letter-spacing:
      -0.035em;
  `;

/* =====================================================
   TERMS STATUS
===================================================== */

const TermsStatus =
  styled.div<{
    $read: boolean;
  }>`
    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding:
      8px 12px;

    border:
      1px solid
      ${({ $read }) =>
        $read
          ? "rgba(73, 137, 92, 0.24)"
          : "rgba(201, 169, 110, 0.25)"};

    border-radius:
      999px;

    background:
      ${({ $read }) =>
        $read
          ? "rgba(73, 137, 92, 0.055)"
          : "rgba(201, 169, 110, 0.055)"};

    color:
      ${({ $read, theme }) =>
        $read
          ? "#39734b"
          : theme.colors.textMuted};

    font-size: 9px;

    font-weight: 800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    white-space:
      nowrap;
  `;

/* =====================================================
   STATUS DOT
===================================================== */

const StatusDot =
  styled.span<{
    $read: boolean;
  }>`
    width: 6px;

    height: 6px;

    border-radius:
      50%;

    background:
      ${({ $read, theme }) =>
        $read
          ? "#4c985f"
          : theme.colors.champagne};

    box-shadow:
      ${({ $read }) =>
        $read
          ? "0 0 10px rgba(76, 152, 95, 0.3)"
          : "none"};
  `;

/* =====================================================
   TERMS INTRO
===================================================== */

const TermsIntro =
  styled.p`
    max-width: 680px;

    margin:
      0 0 20px;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 13px;

    line-height:
      1.7;
  `;

/* =====================================================
   TERMS BOX
===================================================== */

const TermsBox =
  styled.div`
    position: relative;

    width: 100%;

    height:
      clamp(
        360px,
        50vw,
        500px
      );

    padding:
      34px 36px;

    overflow-y:
      auto;

    overflow-x:
      hidden;

    border:
      1px solid
      rgba(
        69,
        35,
        105,
        0.13
      );

    border-radius:
      ${({ theme }) =>
        theme.radius.md ||
        theme.radius.lg};

    background:
      linear-gradient(
        145deg,
        rgba(
          248,
          244,
          237,
          0.96
        ),
        rgba(
          240,
          232,
          245,
          0.72
        )
      );

    box-shadow:
      inset
      0 1px 0
      rgba(
        255,
        255,
        255,
        0.75
      );

    scrollbar-width:
      thin;

    scrollbar-color:
      rgba(
        91,
        33,
        182,
        0.32
      )
      transparent;

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.purple};

      outline-offset:
        3px;
    }

    &::-webkit-scrollbar {
      width:
        8px;
    }

    &::-webkit-scrollbar-track {
      background:
        transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius:
        999px;

      background:
        rgba(
          91,
          33,
          182,
          0.28
        );
    }

    &::-webkit-scrollbar-thumb:hover {
      background:
        rgba(
          91,
          33,
          182,
          0.42
        );
    }

    @media (max-width: 768px) {
      height:
        400px;

      padding:
        28px 24px;
    }

    @media (max-width: 480px) {
      height:
        380px;

      padding:
        25px 20px;
    }
  `;

/* =====================================================
   DRAFT NOTICE
===================================================== */

const DraftNotice =
  styled.div`
    display: inline-flex;

    align-items: center;

    margin-bottom:
      22px;

    padding:
      7px 10px;

    border:
      1px solid
      rgba(
        201,
        169,
        110,
        0.38
      );

    border-radius:
      999px;

    background:
      rgba(
        201,
        169,
        110,
        0.08
      );

    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size: 8px;

    font-weight: 800;

    letter-spacing:
      0.16em;

    text-transform:
      uppercase;
  `;

/* =====================================================
   TERMS DOCUMENT TITLE
===================================================== */

const TermsDocumentTitle =
  styled.h3`
    margin:
      0;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      clamp(
        2rem,
        4vw,
        3rem
      );

    font-weight:
      600;

    line-height:
      0.98;

    letter-spacing:
      -0.04em;
  `;

/* =====================================================
   TERMS META
===================================================== */

const TermsMeta =
  styled.p`
    margin:
      12px 0 0;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size:
      10px;

    font-weight:
      700;

    letter-spacing:
      0.12em;

    text-transform:
      uppercase;
  `;

/* =====================================================
   TERMS RULE
===================================================== */

const TermsRule =
  styled.div`
    width:
      70px;

    height:
      1px;

    margin:
      28px 0;

    background:
      linear-gradient(
        90deg,
        ${({ theme }) =>
          theme.colors.champagne},
        transparent
      );
  `;

/* =====================================================
   TERMS HEADING
===================================================== */

const TermsHeading =
  styled.h4`
    margin:
      28px 0 10px;

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-family:
      ${({ theme }) =>
        theme.fonts.display};

    font-size:
      1.25rem;

    font-weight:
      600;

    line-height:
      1.15;

    letter-spacing:
      -0.02em;
  `;

/* =====================================================
   TERMS PARAGRAPH
===================================================== */

const TermsParagraph =
  styled.p`
    margin:
      0 0 14px;

    color:
      rgba(
        55,
        42,
        65,
        0.7
      );

    font-size:
      13px;

    line-height:
      1.78;
  `;

/* =====================================================
   TERMS END
===================================================== */

const TermsEnd =
  styled.p`
    margin:
      0;

    color:
      ${({ theme }) =>
        theme.colors.champagne};

    font-size:
      9px;

    font-weight:
      800;

    letter-spacing:
      0.16em;

    text-transform:
      uppercase;

    text-align:
      center;
  `;

/* =====================================================
   READING HINT
===================================================== */

const ReadingHint =
  styled.div<{
    $read: boolean;
  }>`
    display: flex;

    align-items: center;

    gap: 10px;

    margin-top:
      14px;

    color:
      ${({ $read, theme }) =>
        $read
          ? "#39734b"
          : theme.colors.textMuted};

    font-size:
      11px;

    line-height:
      1.5;

    transition:
      color 0.25s ease;
  `;

/* =====================================================
   HINT ICON
===================================================== */

const HintIcon =
  styled.span<{
    $read: boolean;
  }>`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 22px;

    height: 22px;

    flex-shrink: 0;

    border:
      1px solid
      ${({ $read, theme }) =>
        $read
          ? "rgba(73, 137, 92, 0.25)"
          : theme.colors.border};

    border-radius:
      50%;

    background:
      ${({ $read }) =>
        $read
          ? "rgba(73, 137, 92, 0.07)"
          : "rgba(255,255,255,0.45)"};

    color:
      ${({ $read, theme }) =>
        $read
          ? "#39734b"
          : theme.colors.champagne};

    font-size:
      12px;

    font-weight:
      800;
  `;

/* =====================================================
   AGREEMENT ROW
===================================================== */

const AgreementRow =
  styled.div<{
    $enabled: boolean;
  }>`
    display: flex;

    align-items:
      flex-start;

    gap: 13px;

    margin-top:
      21px;

    padding:
      17px 18px;

    border:
      1px solid
      ${({ $enabled }) =>
        $enabled
          ? "rgba(91, 33, 182, 0.18)"
          : "rgba(69, 35, 105, 0.08)"};

    border-radius:
      ${({ theme }) =>
        theme.radius.sm};

    background:
      ${({ $enabled }) =>
        $enabled
          ? "rgba(255,255,255,0.72)"
          : "rgba(255,255,255,0.38)"};

    cursor:
      ${({ $enabled }) =>
        $enabled
          ? "pointer"
          : "not-allowed"};

    user-select: none;

    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.2s ease,
      box-shadow 0.25s ease;

    ${({ $enabled }) =>
      $enabled &&
      `
        &:hover {
          border-color:
            rgba(91, 33, 182, 0.28);

          background:
            rgba(255,255,255,0.92);

          box-shadow:
            0 8px 24px
            rgba(69, 35, 105, 0.06);

          transform:
            translateY(-1px);
        }

        &:focus-visible {
          outline:
            2px solid
            rgba(91, 33, 182, 0.4);

          outline-offset: 3px;
        }
      `}

    @media (max-width: 480px) {
      padding:
        15px;
    }
  `;

/* =====================================================
   CHECKBOX WRAPPER
===================================================== */

const CheckboxWrapper =
  styled.div<{
    $enabled: boolean;
  }>`
    position: relative;

    width: 20px;

    height: 20px;

    flex-shrink: 0;

    margin-top:
      1px;

    opacity:
      ${({ $enabled }) =>
        $enabled ? 1 : 0.45};
  `;

/* =====================================================
   CHECKBOX VISUAL
===================================================== */

const CheckboxVisual =
  styled.span<{
    $checked: boolean;
    $enabled: boolean;
  }>`
    display: flex;

    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;

    border:
      1px solid
      ${({ $checked, $enabled, theme }) =>
        $checked
          ? theme.colors.purple
          : $enabled
            ? "rgba(91, 33, 182, 0.3)"
            : theme.colors.border};

    border-radius:
      5px;

    background:
      ${({ $checked, theme }) =>
        $checked
          ? theme.colors.purple
          : "rgba(255,255,255,0.65)"};

    color:
      ${({ theme }) =>
        theme.colors.white};

    font-size:
      12px;

    font-weight:
      900;

    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;

    ${({ $enabled }) =>
      $enabled &&
      `
        box-shadow:
          0 0 0 3px
          rgba(91, 33, 182, 0.05);
      `}

    ${({ $checked }) =>
      $checked &&
      `
        transform:
          scale(1.04);
      `}
  `;

/* =====================================================
   AGREEMENT LABEL
===================================================== */

const AgreementLabel =
  styled.span<{
    $enabled: boolean;
  }>`
    color:
      ${({ $enabled, theme }) =>
        $enabled
          ? theme.colors.text
          : theme.colors.textMuted};

    font-size:
      12px;

    line-height:
      1.65;

    cursor:
      ${({ $enabled }) =>
        $enabled
          ? "pointer"
          : "not-allowed"};

    transition:
      color 0.25s ease;
  `;

/* =====================================================
   NOTE
===================================================== */

const Note =
  styled.p`
    max-width:
      700px;

    margin:
      32px 0 0;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size:
      12px;

    line-height:
      1.7;
  `;

/* =====================================================
   SUBMIT BUTTON
===================================================== */

const SubmitButton =
  styled.button`
    display: inline-flex;

    align-items:
      center;

    justify-content:
      center;

    gap:
      12px;

    min-height:
      56px;

    margin-top:
      24px;

    padding:
      0 28px;

    border:
      1px solid
      rgba(
        91,
        33,
        182,
        0.16
      );

    border-radius:
      ${({ theme }) =>
        theme.radius.pill};

    background:
      linear-gradient(
        135deg,
        ${({ theme }) =>
          theme.colors.purple},
        #7956a8
      );

    color:
      ${({ theme }) =>
        theme.colors.white};

    font-size:
      12px;

    font-weight:
      800;

    letter-spacing:
      0.08em;

    text-transform:
      uppercase;

    text-decoration:
      none;

    cursor:
      pointer;

    box-shadow:
      0
      12px
      30px
      rgba(
        91,
        33,
        182,
        0.14
      );

    transition:
      transform 0.25s ease,
      background 0.25s ease,
      box-shadow 0.25s ease,
      opacity 0.25s ease;

    &:hover:not(:disabled) {
      transform:
        translateY(-2px);

      background:
        linear-gradient(
          135deg,
          ${({ theme }) =>
            theme.colors.purpleDark},
          ${({ theme }) =>
            theme.colors.purple}
        );

      box-shadow:
        0
        16px
        36px
        rgba(
          91,
          33,
          182,
          0.22
        );
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.champagne};

      outline-offset:
        4px;
    }

    &:disabled {
      opacity:
        0.42;

      cursor:
        not-allowed;

      box-shadow:
        none;
    }

    @media (max-width: 520px) {
      width: 100%;
    }
  `;

/* =====================================================
   SUBMIT ARROW
===================================================== */

const SubmitArrow =
  styled.span`
    font-size:
      18px;

    line-height:
      1;
  `;

/* =====================================================
   ERROR
===================================================== */

const ErrorMessage =
  styled.p`
    margin-top:
      24px;

    padding:
      14px 16px;

    border:
      1px solid
      rgba(
        192,
        57,
        43,
        0.2
      );

    border-radius:
      ${({ theme }) =>
        theme.radius.sm};

    background:
      rgba(
        192,
        57,
        43,
        0.06
      );

    color:
      ${({ theme }) =>
        theme.colors.error};

    font-size:
      13px;

    line-height:
      1.5;
  `;

/* =====================================================
   SUCCESS
===================================================== */

const SuccessMessage =
  styled.div`
    max-width:
      760px;

    margin:
      0 auto;

    padding:
      80px 0;

    text-align:
      center;

    animation:
      ${successIn}
      0.6s
      ease
      both;

    ${Eyebrow} {
      justify-content:
        center;
    }

    ${Description} {
      margin-left:
        auto;

      margin-right:
        auto;
    }

    @media (max-width: 768px) {
      padding:
        50px 0;
    }
  `;