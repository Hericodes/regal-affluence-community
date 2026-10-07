import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

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
   PASSWORD STRENGTH
===================================================== */

const getPasswordStrength = (value: string) => {
  if (!value) {
    return {
      score: 0,
      label: "Use 8+ characters",
    };
  }

  let score = 0;

  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (score <= 2) {
    return {
      score,
      label: "Weak password",
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Good password",
    };
  }

  return {
    score,
    label: "Strong password",
  };
};

/* =====================================================
   COMPONENT
===================================================== */

const Join = () => {
  const navigate = useNavigate();

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

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const termsRef =
    useRef<HTMLDivElement>(null);

  const passwordStrength =
    getPasswordStrength(password);

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

      username: String(
        formData.get("username") || ""
      ).trim().toLowerCase(),

      password: String(
        formData.get("password") || ""
      ),

      termsAccepted: true,
    };

    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (application.password !== confirmPassword) {
      setError(
        "Your passwords do not match. Please check them and try again."
      );

      setIsSubmitting(false);
      return;
    }

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
        const backendMessage = String(
          result.message || ""
        );

        const usernameUnavailable =
          /username|user name|already exists|already taken|taken|duplicate/i.test(
            backendMessage
          );

        throw new Error(
          usernameUnavailable
            ? "That username is not available. Please choose another username and try again."
            : backendMessage ||
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
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (submissionError) {
      console.error(
        "Application submission error:",
        submissionError
      );

      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "";

      setError(
        message ||
          "We couldn't submit your application right now. Please check your connection and try again."
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
              Your application has been
              submitted successfully and
              your member account is ready.

              <br />
              <br />

              The next step is to complete
              your member profile. After
              completing your profile, you
              will be able to join the official
              Regal Affluence community.
            </Description>

            <SubmitButton
              type="button"
              onClick={() => navigate("/login")}
            >
              Complete my profile

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

        <JourneyStrip aria-label="Application steps">
          <JourneyStep>
            <JourneyNumber>01</JourneyNumber>
            <div>
              <JourneyTitle>Your details</JourneyTitle>
              <JourneyText>Tell us who you are.</JourneyText>
            </div>
          </JourneyStep>

          <JourneyLine />

          <JourneyStep>
            <JourneyNumber>02</JourneyNumber>
            <div>
              <JourneyTitle>Your account</JourneyTitle>
              <JourneyText>Create your private login.</JourneyText>
            </div>
          </JourneyStep>

          <JourneyLine />

          <JourneyStep>
            <JourneyNumber>03</JourneyNumber>
            <div>
              <JourneyTitle>Agreement</JourneyTitle>
              <JourneyText>Read, accept and submit.</JourneyText>
            </div>
          </JourneyStep>
        </JourneyStrip>

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
                REFERRAL
            ============================================== */}

            <FieldGroup>
              <Label htmlFor="referralSource">
                Referral{" "}
                <Optional>
                  (Optional)
                </Optional>
              </Label>

              <Input
                id="referralSource"
                name="referralSource"
                type="text"
                placeholder="Enter the name of the person who referred you"
                autoComplete="name"
              />
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

            {/* =============================================
                MEMBER ACCOUNT
            ============================================== */}

            <FullWidth>
              <AccountSection>
                <AccountTopRow>
                  <div>
                    <AccountEyebrow>
                      Create Your Member Account
                    </AccountEyebrow>

                    <AccountTitle>
                      Your login details
                      <br />
                      start here.
                    </AccountTitle>

                    <AccountDescription>
                      The <strong>username and password</strong> you
                      create below will be used to log in to your
                      Regal Affluence account and access your
                      personal member page.
                    </AccountDescription>
                  </div>

                  <AccountBadge>
                    <AccountBadgeIcon>✓</AccountBadgeIcon>
                    <span>Private access</span>
                  </AccountBadge>
                </AccountTopRow>

                <CredentialNotice>
                  <CredentialNoticeIcon>!</CredentialNoticeIcon>
                  <div>
                    <CredentialNoticeTitle>
                      Fill these details wisely.
                    </CredentialNoticeTitle>
                    <CredentialNoticeText>
                      Choose a username you can remember and a strong
                      password you will not forget. Keep your login
                      details private and do not use a password you
                      already use for another important account.
                    </CredentialNoticeText>
                  </div>
                </CredentialNotice>
              </AccountSection>
            </FullWidth>

            <FieldGroup>
              <Label htmlFor="username">
                Username{" "}
                <Required>
                  *
                </Required>
              </Label>

              <InputShell>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g. heritageolayimika"
                  required
                  minLength={3}
                  maxLength={30}
                  pattern="[A-Za-z0-9_.]{3,30}"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                />
                <InputAffix aria-hidden="true">@</InputAffix>
              </InputShell>

              <FieldHint>
                3–30 characters. Use letters, numbers,
                underscores, or periods only.
              </FieldHint>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="password">
                Password{" "}
                <Required>
                  *
                </Required>
              </Label>

              <InputShell>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  required
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

                <PasswordToggle
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </PasswordToggle>
              </InputShell>

              <PasswordStrength>
                <PasswordStrengthTrack>
                  <PasswordStrengthFill
                    $strength={passwordStrength.score}
                  />
                </PasswordStrengthTrack>

                <PasswordStrengthMeta>
                  <span>
                    {password
                      ? passwordStrength.label
                      : "Use 8+ characters"}
                  </span>

                  <span>
                    {password.length}/128
                  </span>
                </PasswordStrengthMeta>
              </PasswordStrength>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="confirmPassword">
                Confirm Password{" "}
                <Required>
                  *
                </Required>
              </Label>

              <InputShell>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Repeat your password"
                  required
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                />

                <PasswordToggle
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </PasswordToggle>
              </InputShell>

              <PasswordMatch
                $visible={confirmPassword.length > 0}
                $match={
                  confirmPassword.length > 0 &&
                  password === confirmPassword
                }
              >
                {confirmPassword.length > 0
                  ? password === confirmPassword
                    ? "Passwords match."
                    : "Passwords do not match yet."
                  : ""}
              </PasswordMatch>
            </FieldGroup>

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
              Please read these Terms &amp; Conditions carefully. You
              must scroll to the end before you can accept them.
            </TermsIntro>

            <TermsBox
              ref={termsRef}
              onScroll={
                handleTermsScroll
              }
              tabIndex={0}
              aria-label="Regal Affluence Terms and Conditions"
            >
              <TermsDocumentTitle>
                REGAL AFFLUENCE GROUP
                <br />
                REALTOR TERMS &amp; CONDITIONS
              </TermsDocumentTitle>

              <TermsMeta>
                Effective upon acceptance
              </TermsMeta>

              <TermsRule />

              <TermsParagraph>
                Welcome to Regal Affluence Group.
              </TermsParagraph>

              <TermsParagraph>
                These Terms &amp; Conditions (“Terms”) govern your registration,
                membership and activities as a Realtor operating through
                Regal Affluence Group (“Regal Affluence Group”, “we”, “us” or
                “the Group”).
              </TermsParagraph>

              <TermsParagraph>
                By registering as a Realtor with Regal Affluence Group and
                selecting “I Agree”, you confirm that you have read,
                understood and agreed to be bound by these Terms.
              </TermsParagraph>

              <TermsHeading>
                1. Professional Conduct
              </TermsHeading>

              <TermsParagraph>
                As a Realtor of Regal Affluence Group, you are expected to
                conduct yourself professionally, honestly and respectfully
                when dealing with clients, prospects, developers, property
                owners, colleagues and the general public.
              </TermsParagraph>

              <TermsParagraph>You agree to:</TermsParagraph>

              <TermsList>
                <li>Provide accurate information about properties, prices, documentation, payment plans and other transaction details.</li>
                <li>Avoid making false, misleading or unauthorised representations.</li>
                <li>Treat clients and other Realtors professionally and respectfully.</li>
                <li>Protect the reputation and integrity of Regal Affluence Group.</li>
                <li>Comply with applicable laws and regulations relating to your activities.</li>
              </TermsList>

              <TermsHeading>
                2. Transparency &amp; Deal Reporting
              </TermsHeading>

              <TermsParagraph>
                Transparency is a fundamental requirement of membership. You
                agree to keep Regal Affluence Group reasonably informed about
                transactions you are handling through the Group, including
                serious prospects, property inspections, offers, negotiations,
                payments and completed transactions.
              </TermsParagraph>

              <TermsParagraph>
                Where the Group has a lead or deal registration system, you
                agree to use it appropriately. Failure to disclose or register
                a transaction may affect the Group’s ability to recognise and
                protect your involvement in that transaction.
              </TermsParagraph>

              <TermsHeading>
                3. Clients &amp; Closing Support
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence Group may provide support to help Realtors
                convert and close transactions. This may include client
                follow-up, negotiations, property inspections, documentation
                guidance, developer communication, sales strategy and closing
                assistance.
              </TermsParagraph>

              <TermsParagraph>
                Where you request or require assistance from the Group, you
                agree to cooperate with the Group and, where reasonably
                necessary, facilitate communication between the Group and your
                client.
              </TermsParagraph>

              <TermsParagraph>
                Where a transaction has been properly registered, the Group
                will make reasonable efforts to recognise and protect the
                Realtor’s involvement in that transaction.
              </TermsParagraph>

              <TermsHeading>
                4. Commission
              </TermsHeading>

              <TermsParagraph>
                Realtor commissions shall be determined according to the
                applicable Regal Affluence Group commission structure for the
                relevant property or transaction.
              </TermsParagraph>

              <TermsParagraph>
                Unless otherwise agreed in writing, commission becomes payable
                after the relevant transaction has been successfully concluded
                and the Group has received the corresponding commission.
              </TermsParagraph>

              <TermsParagraph>
                Where multiple Realtors contribute to a transaction, commission
                may be shared based on their respective contributions and the
                applicable Group policy.
              </TermsParagraph>

              <TermsParagraph>
                The Group reserves the right to review and determine disputed
                commission claims based on available records and evidence.
              </TermsParagraph>

              <TermsHeading>
                5. Lead &amp; Client Protection
              </TermsHeading>

              <TermsParagraph>
                A Realtor who introduces a client or prospect to a property or
                transaction should register the lead in accordance with the
                Group’s procedures.
              </TermsParagraph>

              <TermsParagraph>
                Lead registration helps establish the origin of a client and
                protects the Realtor’s involvement in the transaction.
              </TermsParagraph>

              <TermsParagraph>
                You must not deliberately misrepresent the origin of a lead or
                claim a client you did not introduce.
              </TermsParagraph>

              <TermsParagraph>
                Where a client is already registered or actively being handled
                by another Realtor, the Group may determine how the transaction
                should be managed.
              </TermsParagraph>

              <TermsHeading>
                6. No Bypassing or Circumvention
              </TermsHeading>

              <TermsParagraph>
                You agree not to deliberately bypass or circumvent Regal
                Affluence Group for personal financial benefit in connection
                with a client, developer, property owner, property, lead,
                transaction or business opportunity introduced, developed or
                facilitated through the Group.
              </TermsParagraph>

              <TermsParagraph>
                You must not take a transaction outside the Group simply to
                avoid the Group’s involvement, agreed commission or business
                relationship.
              </TermsParagraph>

              <TermsParagraph>
                This includes using confidential information, introductions,
                negotiated terms, special pricing, contacts or opportunities
                obtained through Regal Affluence Group for the purpose of
                bypassing the Group.
              </TermsParagraph>

              <TermsHeading>
                7. Developer &amp; Property Partner Relationships
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence Group may establish relationships with
                developers, property owners and other real estate partners and
                provide Realtors with access to these relationships and
                opportunities.
              </TermsParagraph>

              <TermsParagraph>
                You agree not to use information, contacts, pricing arrangements
                or business opportunities obtained through the Group to secretly
                circumvent or bypass the Group.
              </TermsParagraph>

              <TermsParagraph>
                If you already have an independent relationship with a developer
                or property owner before joining Regal Affluence Group, you
                should disclose this where it may affect the ownership, handling
                or commission of a transaction.
              </TermsParagraph>

              <TermsHeading>
                8. Confidentiality
              </TermsHeading>

              <TermsParagraph>
                During your membership, you may receive confidential business
                information belonging to Regal Affluence Group.
              </TermsParagraph>

              <TermsParagraph>You agree not to disclose, copy, transfer or use confidential information for unauthorised personal or commercial purposes.</TermsParagraph>

              <TermsList>
                <li>Client information and databases;</li>
                <li>Developer and property-owner contacts;</li>
                <li>Commission arrangements;</li>
                <li>Special pricing and discounts;</li>
                <li>Internal sales strategies;</li>
                <li>Lead information;</li>
                <li>Training materials;</li>
                <li>Business plans; and</li>
                <li>Other non-public information.</li>
              </TermsList>

              <TermsParagraph>
                These confidentiality obligations continue after your membership
                ends for as long as the information remains confidential or
                legally protected.
              </TermsParagraph>

              <TermsHeading>
                9. Client Data &amp; Privacy
              </TermsHeading>

              <TermsParagraph>
                You agree to handle client and prospect information responsibly
                and only for legitimate business purposes.
              </TermsParagraph>

              <TermsParagraph>
                Where client information is shared with Regal Affluence Group
                for purposes such as follow-up, negotiation, documentation or
                closing support, you acknowledge that the Group may process such
                information for those purposes in accordance with applicable
                data-protection requirements and its privacy policy.
              </TermsParagraph>

              <TermsParagraph>
                You must not sell, misuse or unlawfully disclose client
                information.
              </TermsParagraph>

              <TermsHeading>
                10. Branding &amp; Marketing
              </TermsHeading>

              <TermsParagraph>
                As an authorised Realtor, you may use the Regal Affluence Group
                name, logo and approved marketing materials for authorised
                business activities.
              </TermsParagraph>

              <TermsParagraph>You agree not to:</TermsParagraph>

              <TermsList>
                <li>Misrepresent yourself as an authorised representative when you are not;</li>
                <li>Alter official information in a misleading manner;</li>
                <li>Publish false property information;</li>
                <li>Make unauthorised promises or guarantees;</li>
                <li>Misrepresent prices, discounts, returns, documentation or availability; or</li>
                <li>Use the Group’s brand for unauthorised personal activities.</li>
              </TermsList>

              <TermsHeading>
                11. Other Brokerages &amp; Conflicts of Interest
              </TermsHeading>

              <TermsParagraph>
                While actively representing Regal Affluence Group, you agree to
                disclose any other brokerage relationship or business arrangement
                that may create a conflict of interest with your responsibilities
                to the Group.
              </TermsParagraph>

              <TermsParagraph>
                You must not secretly represent competing interests in the same
                transaction where doing so may prejudice the Group, its client or
                another party.
              </TermsParagraph>

              <TermsHeading>
                12. Leaving Regal Affluence Group
              </TermsHeading>

              <TermsParagraph>
                You may voluntarily end your membership in accordance with the
                Group’s applicable exit procedure.
              </TermsParagraph>

              <TermsParagraph>
                However, leaving the Group does not automatically release you
                from obligations relating to:
              </TermsParagraph>

              <TermsList>
                <li>Confidential information;</li>
                <li>Active or pending transactions;</li>
                <li>Outstanding commission matters;</li>
                <li>Non-circumvention obligations;</li>
                <li>Protected business opportunities; or</li>
                <li>Proper use of the Regal Affluence Group brand.</li>
              </TermsList>

              <TermsParagraph>
                Upon leaving, you must stop representing yourself as an active
                Realtor of Regal Affluence Group and must return or delete
                confidential Group information where required.
              </TermsParagraph>

              <TermsParagraph>
                Nothing in these Terms is intended to prevent you from lawfully
                pursuing your career after leaving the Group, subject to your
                continuing obligations under these Terms and applicable law.
              </TermsParagraph>

              <TermsHeading>
                13. Suspension &amp; Termination
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence Group may suspend or terminate your Realtor
                membership where you materially or repeatedly breach these Terms.
              </TermsParagraph>

              <TermsParagraph>This may include:</TermsParagraph>

              <TermsList>
                <li>Fraud or dishonesty;</li>
                <li>Deliberate circumvention of the Group;</li>
                <li>Misuse of client information;</li>
                <li>Misrepresentation of properties or transactions;</li>
                <li>Unauthorised use of the Group’s brand;</li>
                <li>Serious professional misconduct; or</li>
                <li>Conduct that materially damages the reputation or business interests of the Group.</li>
              </TermsList>

              <TermsParagraph>
                Where appropriate, the Group may investigate a complaint or
                alleged breach before taking action.
              </TermsParagraph>

              <TermsHeading>
                14. Changes to These Terms
              </TermsHeading>

              <TermsParagraph>
                Regal Affluence Group may update these Terms from time to time
                to reflect changes in its business, policies, procedures or
                applicable requirements.
              </TermsParagraph>

              <TermsParagraph>
                Where material changes are made, reasonable notice may be
                provided through the Group’s website, communication channels or
                other appropriate means.
              </TermsParagraph>

              <TermsParagraph>
                Your continued membership after the effective date of an updated
                version may constitute acceptance of the revised Terms, subject
                to applicable law.
              </TermsParagraph>

              <TermsHeading>
                15. Governing Law
              </TermsHeading>

              <TermsParagraph>
                These Terms shall be governed by the laws applicable in the
                Federal Republic of Nigeria.
              </TermsParagraph>

              <TermsParagraph>
                If any provision of these Terms is determined to be invalid or
                unenforceable, the remaining provisions shall continue to apply
                to the extent permitted by law.
              </TermsParagraph>

              <TermsRule />

              <TermsEnd>
                END OF REGAL AFFLUENCE GROUP REALTOR TERMS &amp; CONDITIONS
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
                I have read, understood and agree to the Regal Affluence Group
                Realtor Terms &amp; Conditions. I confirm that the information I
                have provided during registration is accurate and complete.
              </AgreementLabel>
            </AgreementRow>
          </TermsSection>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <ErrorMessage
              role="alert"
              aria-live="polite"
            >
              {error}
            </ErrorMessage>
          )}

          {/* =================================================
              NOTE
          ================================================= */}

          <Note>
            By submitting this application, you confirm that you have provided
            accurate information and agree to uphold the professional and ethical
            standards of Regal Affluence Group.
            <br />
            <br />
            <strong>
              Remember: your username and password are your member login
              credentials. Keep them private and make sure you can remember them.
            </strong>
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
      138px 0 110px;

    overflow: hidden;

    background:
      radial-gradient(
        circle at 82% 7%,
        rgba(91, 33, 182, 0.075),
        transparent 27%
      ),
      radial-gradient(
        circle at 8% 92%,
        rgba(201, 169, 110, 0.09),
        transparent 28%
      ),
      linear-gradient(
        135deg,
        ${({ theme }) => theme.colors.ivory} 0%,
        ${({ theme }) => theme.colors.ivory} 55%,
        #eee4f6 100%
      );

    color:
      ${({ theme }) =>
        theme.colors.text};

    isolation: isolate;

    &::before {
      content: "";

      position: absolute;

      inset:
        0 0 auto;

      height: 1px;

      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(201, 169, 110, 0.65),
          transparent
        );

      pointer-events: none;
    }

    &::after {
      content: "";

      position: absolute;

      width: 620px;
      height: 620px;

      right: -360px;
      top: 38%;

      border:
        1px solid
        rgba(91, 33, 182, 0.08);

      border-radius: 50%;

      box-shadow:
        0 0 0 80px rgba(91, 33, 182, 0.018),
        0 0 0 160px rgba(201, 169, 110, 0.018);

      pointer-events: none;

      z-index: -1;
    }

    @media (max-width: 768px) {
      padding:
        112px 0 80px;
    }

    @media (max-width: 480px) {
      padding:
        98px 0 64px;
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
    max-width: 900px;

    margin-bottom: 48px;

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

    font-size: 18px;

    line-height:
      1.85;

    max-width: 760px;

    @media (max-width: 768px) {
      margin-top:
        22px;

      font-size: 15px;

      line-height:
        1.7;
    }
  `;

/* =====================================================
   APPLICATION JOURNEY
===================================================== */

const JourneyStrip =
  styled.div`
    display: grid;

    grid-template-columns:
      1fr auto 1fr auto 1fr;

    align-items: center;

    gap: 18px;

    margin:
      0 0 34px;

    padding:
      18px 20px;

    border:
      1px solid
      rgba(69, 35, 105, 0.1);

    border-radius:
      18px;

    background:
      rgba(255, 255, 255, 0.52);

    box-shadow:
      0 10px 30px
      rgba(60, 35, 82, 0.04);

    backdrop-filter:
      blur(10px);

    @media (max-width: 760px) {
      grid-template-columns: 1fr;

      gap: 12px;

      padding: 16px;
    }
  `;

const JourneyStep =
  styled.div`
    display: flex;

    align-items: center;

    gap: 11px;

    min-width: 0;
  `;

const JourneyNumber =
  styled.span`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 34px;
    height: 34px;

    flex-shrink: 0;

    border:
      1px solid
      rgba(201, 169, 110, 0.42);

    border-radius: 50%;

    background:
      rgba(201, 169, 110, 0.07);

    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-size: 12px;

    font-weight: 800;

    letter-spacing: 0.08em;
  `;

const JourneyTitle =
  styled.strong`
    display: block;

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 13px;

    font-weight: 800;

    letter-spacing: 0.04em;
  `;

const JourneyText =
  styled.span`
    display: block;

    margin-top: 2px;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 13px;

    line-height: 1.5;
  `;

const JourneyLine =
  styled.span`
    width: 36px;

    height: 1px;

    background:
      linear-gradient(
        90deg,
        rgba(201, 169, 110, 0.15),
        rgba(201, 169, 110, 0.55),
        rgba(201, 169, 110, 0.15)
      );

    @media (max-width: 760px) {
      display: none;
    }
  `;

/* =====================================================
   FORM
===================================================== */

const Form =
  styled.form`
    position: relative;

    width: 100%;

    padding: 58px;

    background:
      linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.94),
        rgba(255, 252, 247, 0.88)
      );

    border:
      1px solid
      rgba(
        69,
        35,
        105,
        0.1
      );

    border-radius:
      28px;

    box-shadow:
      0 32px 90px
      rgba(60, 35, 82, 0.1),
      0 8px 24px
      rgba(60, 35, 82, 0.045);

    position: relative;

    &::before {
      content: "";

      position: absolute;

      inset: 0;

      border-radius: inherit;

      padding: 1px;

      background:
        linear-gradient(
          135deg,
          rgba(201, 169, 110, 0.26),
          transparent 25%,
          transparent 75%,
          rgba(91, 33, 182, 0.12)
        );

      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      -webkit-mask-composite: xor;

      mask-composite: exclude;

      pointer-events: none;
    }

    backdrop-filter:
      blur(12px);

    -webkit-backdrop-filter:
      blur(12px);

    @media (max-width: 768px) {
      padding:
        40px 28px;
    }

    @media (max-width: 480px) {
      padding:
        30px 18px;

      border-radius:
        22px;
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
      30px 24px;

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

    font-size: 15px;

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

    min-height: 58px;

    padding:
      0 16px;

    box-sizing: border-box;

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

    font-size: 17px;

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
   TEXTAREA
===================================================== */

const Textarea =
  styled.textarea`
    width: 100%;

    min-height: 145px;

    padding:
      16px;

    box-sizing: border-box;

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

    font-size: 17px;

    line-height:
      1.7;

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
   ACCOUNT SECTION
===================================================== */

const AccountSection = styled.div`
  position: relative;

  padding:
    30px;

  border:
    1px solid
    rgba(201, 169, 110, 0.24);

  border-radius:
    22px;

  background:
    linear-gradient(
      135deg,
      rgba(201, 169, 110, 0.09),
      rgba(91, 33, 182, 0.045)
    );

  overflow: hidden;

  &::after {
    content: "";

    position: absolute;

    width: 180px;
    height: 180px;

    right: -80px;
    bottom: -100px;

    border:
      1px solid
      rgba(91, 33, 182, 0.1);

    border-radius: 50%;
  }

  @media (max-width: 600px) {
    padding:
      24px 20px;
  }
`;

const AccountTopRow =
  styled.div`
    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 24px;

    position: relative;

    z-index: 1;

    @media (max-width: 620px) {
      flex-direction: column;
    }
  `;

const AccountBadge =
  styled.div`
    display: inline-flex;

    align-items: center;

    gap: 8px;

    flex-shrink: 0;

    padding:
      8px 11px;

    border:
      1px solid
      rgba(91, 33, 182, 0.12);

    border-radius: 999px;

    background:
      rgba(255, 255, 255, 0.6);

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-size: 12px;

    font-weight: 800;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  `;

const AccountBadgeIcon =
  styled.span`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 18px;
    height: 18px;

    border-radius: 50%;

    background:
      ${({ theme }) =>
        theme.colors.purple};

    color:
      ${({ theme }) =>
        theme.colors.white};

    font-size: 10px;
  `;

const AccountEyebrow = styled.p`
  margin:
    0 0 8px;

  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-size: 9px;

  font-weight: 800;

  letter-spacing:
    0.18em;

  text-transform: uppercase;
`;

const AccountTitle = styled.h3`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(1.7rem, 3.4vw, 2.5rem);

  font-weight: 600;

  line-height: 1.02;

  letter-spacing:
    -0.035em;
`;

const AccountDescription = styled.p`
  max-width: 680px;

  margin:
    12px 0 0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 16px;

  line-height: 1.8;

  strong {
    color:
      ${({ theme }) =>
        theme.colors.text};

    font-weight: 800;
  }
`;

const CredentialNotice =
  styled.div`
    display: flex;

    align-items: flex-start;

    gap: 12px;

    margin-top: 24px;

    padding:
      15px 16px;

    border:
      1px solid
      rgba(91, 33, 182, 0.1);

    border-radius:
      14px;

    background:
      rgba(255, 255, 255, 0.52);

    position: relative;

    z-index: 1;

    @media (max-width: 480px) {
      padding: 14px;
    }
  `;

const CredentialNoticeIcon =
  styled.span`
    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 24px;
    height: 24px;

    flex-shrink: 0;

    border-radius: 50%;

    background:
      rgba(201, 169, 110, 0.16);

    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    font-size: 11px;

    font-weight: 900;
  `;

const CredentialNoticeTitle =
  styled.strong`
    display: block;

    margin-bottom: 3px;

    color:
      ${({ theme }) =>
        theme.colors.text};

    font-size: 13px;

    font-weight: 800;

    letter-spacing: 0.02em;
  `;

const CredentialNoticeText =
  styled.span`
    display: block;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 15px;

    line-height: 1.7;
  `;

const FieldHint = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size: 13px;

  line-height: 1.6;
`;

const InputShell =
  styled.div`
    position: relative;

    width: 100%;

    ${Input} {
      padding-right: 76px;
    }
  `;

const InputAffix =
  styled.span`
    position: absolute;

    right: 16px;
    top: 50%;

    transform:
      translateY(-50%);

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 13px;

    font-weight: 700;

    pointer-events: none;

    opacity: 0.55;
  `;

const PasswordToggle =
  styled.button`
    position: absolute;

    right: 9px;
    top: 50%;

    transform:
      translateY(-50%);

    min-height: 34px;

    padding:
      0 9px;

    border: 0;

    border-radius: 8px;

    background:
      rgba(91, 33, 182, 0.055);

    color:
      ${({ theme }) =>
        theme.colors.purple};

    font-size: 13px;

    font-weight: 800;

    letter-spacing: 0.04em;

    cursor: pointer;

    transition:
      background 0.2s ease,
      color 0.2s ease;

    &:hover {
      background:
        rgba(91, 33, 182, 0.1);
    }

    &:focus-visible {
      outline:
        2px solid
        ${({ theme }) =>
          theme.colors.champagne};

      outline-offset: 2px;
    }
  `;

const PasswordStrength =
  styled.div`
    margin-top: 8px;
  `;

const PasswordStrengthTrack =
  styled.div`
    width: 100%;
    height: 4px;

    overflow: hidden;

    border-radius: 999px;

    background:
      rgba(69, 35, 105, 0.08);
  `;

const PasswordStrengthFill =
  styled.div<{
    $strength: number;
  }>`
    width:
      ${({ $strength }) =>
        `${Math.min($strength / 6, 1) * 100}%`};

    height: 100%;

    border-radius: inherit;

    background:
      ${({ $strength }) =>
        $strength <= 2
          ? "#c0392b"
          : $strength <= 4
            ? "#b28732"
            : "#39734b"};

    transition:
      width 0.25s ease,
      background 0.25s ease;
  `;

const PasswordStrengthMeta =
  styled.div`
    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-top: 5px;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size: 9px;

    font-weight: 700;

    letter-spacing: 0.03em;
  `;

const PasswordMatch =
  styled.span<{
    $visible: boolean;
    $match: boolean;
  }>`
    min-height: 15px;

    color:
      ${({ $match }) =>
        $match
          ? "#39734b"
          : "#c0392b"};

    font-size: 10px;

    font-weight: 700;

    opacity:
      ${({ $visible }) =>
        $visible ? 1 : 0};

    transition:
      opacity 0.2s ease;
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

    font-size: 12px;

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

    font-size: 12px;

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

    font-size: 16px;

    line-height:
      1.75;
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
        420px,
        52vw,
        560px
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
        theme.radius.xl};

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

export const DraftNotice =
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
      16px;

    line-height:
      1.85;
  `;

/* =====================================================
   TERMS LIST
===================================================== */

const TermsList =
  styled.ul`
    margin:
      0 0 18px;

    padding-left:
      22px;

    color:
      rgba(55, 42, 65, 0.78);

    font-size:
      16px;

    line-height:
      1.8;

    li {
      margin-bottom:
        7px;

      padding-left:
        4px;
    }

    @media (max-width: 600px) {
      font-size:
        15px;

      line-height:
        1.75;
    }
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
      11px;

    font-weight:
      800;

    letter-spacing:
      0.14em;

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
      16px;

    line-height:
      1.75;

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
      15px;

    line-height:
      1.8;

    strong {
      color:
        ${({ theme }) =>
          theme.colors.text};

      font-weight: 800;
    }
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
      58px;

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
      14px;

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
      "#c0392b";

    font-size:
      16px;

    line-height:
      1.65;
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