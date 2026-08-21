import { useState } from "react";
import type { SubmitEvent } from "react";

import {
  Section,
  Container,
  Header,
  Eyebrow,
  Heading,
  Description,
  Form,
  FormGrid,
  FieldGroup,
  Label,
  Required,
  Input,
  Select,
  Textarea,
  FullWidth,
  SubmitButton,
  SubmitArrow,
  Note,
  SuccessMessage,
  ErrorMessage,
} from "./Join.styles";

/* ========================================
   GOOGLE SHEETS API
======================================== */

const GOOGLE_SHEETS_API =
  "https://script.google.com/macros/s/AKfycbzNHL0mcmPqJ15NAiRM1io3ilwUXlulo8vrV7qdSgy9qYxyjkzk5O5VjNgpvxaeeCSh/exec";

/* ========================================
   WHATSAPP COMMUNITY LINK
======================================== */

const COMMUNITY_LINK =
  "https://chat.whatsapp.com/LXNSKWf1E8JCxECrBxpm6f?mode=gi_t";

const Join = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

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
    };

    try {
      const response = await fetch(
        GOOGLE_SHEETS_API,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify(application),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to submit application."
        );
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message ||
            "Application submission failed."
        );
      }

      /*
       * Only show the success screen after
       * Google Apps Script confirms success.
       */
      setSubmitted(true);

      form.reset();
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

  /* ========================================
     SUCCESS STATE
  ======================================== */

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
              <span>Regal Affluence.</span>
            </Heading>

            <Description>
              Your application has been submitted
              successfully. You can now join the
              Regal Affluence community on WhatsApp.
            </Description>

            <SubmitButton
              as="a"
              href={COMMUNITY_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the community

              <SubmitArrow aria-hidden="true">
                →
              </SubmitArrow>
            </SubmitButton>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  /* ========================================
     APPLICATION FORM
  ======================================== */

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>
            Join Regal Affluence
          </Eyebrow>

          <Heading>
            Your next chapter
            <br />
            starts <span>here.</span>
          </Heading>

          <Description>
            Tell us a little about yourself and why
            you want to be part of the Regal
            Affluence community. There are no
            membership requirements — we are
            looking for ambitious people who are
            ready to learn, grow, connect, and
            create long-term wealth.
          </Description>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGrid>

            {/* FULL NAME */}

            <FieldGroup>
              <Label htmlFor="fullName">
                Full Name <Required>*</Required>
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

            {/* EMAIL */}

            <FieldGroup>
              <Label htmlFor="email">
                Email Address <Required>*</Required>
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

            {/* PHONE */}

            <FieldGroup>
              <Label htmlFor="phone">
                Phone Number <Required>*</Required>
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

            {/* OCCUPATION */}

            <FieldGroup>
              <Label htmlFor="occupation">
                Occupation <Required>*</Required>
              </Label>

              <Input
                id="occupation"
                name="occupation"
                type="text"
                placeholder="What do you do?"
                required
              />
            </FieldGroup>

            {/* BUSINESS */}

            <FieldGroup>
              <Label htmlFor="businessName">
                Business Name{" "}
                <span>(Optional)</span>
              </Label>

              <Input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Your business name"
              />
            </FieldGroup>

            {/* LOCATION */}

            <FieldGroup>
              <Label htmlFor="location">
                Location <Required>*</Required>
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

            {/* SOCIAL MEDIA */}

            <FieldGroup>
              <Label htmlFor="socialMedia">
                Social Media Handles{" "}
                <Required>*</Required>
              </Label>

              <Input
                id="socialMedia"
                name="socialMedia"
                type="text"
                placeholder="@username or links"
                required
              />
            </FieldGroup>

            {/* REFERRAL SOURCE */}

            <FieldGroup>
              <Label htmlFor="referralSource">
                How did you hear about us?{" "}
                <Required>*</Required>
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

            {/* WHY JOIN */}

            <FullWidth>
              <FieldGroup>
                <Label htmlFor="whyJoin">
                  Why do you want to join Regal
                  Affluence?{" "}
                  <Required>*</Required>
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

            {/* SKILLS */}

            <FullWidth>
              <FieldGroup>
                <Label htmlFor="skills">
                  Skills / Expertise{" "}
                  <Required>*</Required>
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

          {/* ERROR */}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          {/* NOTE */}

          <Note>
            By submitting this application, you
            agree to provide accurate information
            and uphold the professional and ethical
            standards of the Regal Affluence
            community.
          </Note>

          {/* SUBMIT */}

          <SubmitButton
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}

            {!isSubmitting && (
              <SubmitArrow aria-hidden="true">
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