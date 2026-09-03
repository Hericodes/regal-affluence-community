import { useState } from "react";
import type { FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  requestUsernameRecovery,
  verifyUsernameRecovery,
} from "../api/memberApi";

/* =========================================================
   TYPES
========================================================= */

type RecoveryStep = "email" | "code" | "success";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform:
      translateY(12px);
  }

  to {
    opacity: 1;
    transform:
      translateY(0);
  }
`;

const cardEnter = keyframes`
  from {
    opacity: 0;
    transform:
      translateY(26px)
      scale(0.985);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
`;

const ambientFloat = keyframes`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(-18px, 14px, 0)
      scale(1.05);
  }
`;

const ambientFloatReverse = keyframes`
  0%,
  100% {
    transform:
      translate3d(0, 0, 0)
      scale(1);
  }

  50% {
    transform:
      translate3d(15px, -12px, 0)
      scale(1.06);
  }
`;

/* =========================================================
   COMPONENT
========================================================= */

const RecoverUsername = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [recoveredUsername, setRecoveredUsername] = useState("");

  const [step, setStep] = useState<RecoveryStep>("email");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* =======================================================
     REQUEST CODE
  ======================================================= */

  const handleRequestCode = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Please enter the email address you used to register."
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await requestUsernameRecovery(
        cleanEmail
      );

      /*
       * We intentionally move to the code step even when
       * the backend uses a generic response. This prevents
       * the interface from revealing whether an email exists
       * in the member database.
       */

      setEmail(cleanEmail);
      setMessage(response);
      setStep("code");
    } catch (recoveryError) {
      console.error(
        "Username recovery request error:",
        recoveryError
      );

      setError(
        recoveryError instanceof Error
          ? recoveryError.message
          : "We could not send your verification code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================================================
     VERIFY CODE
  ======================================================= */

  const handleVerifyCode = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanCode = code.replace(/\D/g, "").slice(0, 6);

    if (cleanCode.length !== 6) {
      setError(
        "Please enter the 6-digit verification code."
      );
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const username = await verifyUsernameRecovery(
        email,
        cleanCode
      );

      setRecoveredUsername(username);
      setStep("success");
    } catch (verificationError) {
      console.error(
        "Username verification error:",
        verificationError
      );

      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "We could not verify that code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================================================
     CHANGE EMAIL
  ======================================================= */

  const handleChangeEmail = () => {
    setCode("");
    setError("");
    setMessage("");
    setStep("email");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Page>
      <AmbientGlow />
      <SecondaryGlow />
      <BackgroundGrid />

      <Container>
        <RecoveryCard>
          <TopAccent />

          {step === "email" && (
            <>
              <Eyebrow>ACCOUNT RECOVERY</Eyebrow>

              <Heading>
                Recover your <Accent>username.</Accent>
              </Heading>

              <Description>
                Enter the email address you used when you
                joined Regal Affluence. We will send you a
                temporary verification code.
              </Description>

              <Progress>
                <ProgressStep $active>
                  <ProgressDot $active>1</ProgressDot>

                  <ProgressLabel $active>
                    Email
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>2</ProgressDot>

                  <ProgressLabel>
                    Verify
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>3</ProgressDot>

                  <ProgressLabel>
                    Username
                  </ProgressLabel>
                </ProgressStep>
              </Progress>

              <Form onSubmit={handleRequestCode}>
                <FieldGroup>
                  <Label htmlFor="recovery-email">
                    Registered Email
                  </Label>

                  <Input
                    id="recovery-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    required
                    autoFocus
                  />

                  <FieldHint>
                    Use the same email address you provided
                    during registration.
                  </FieldHint>
                </FieldGroup>

                {error && (
                  <ErrorMessage role="alert">
                    <ErrorIcon>!</ErrorIcon>
                    <span>{error}</span>
                  </ErrorMessage>
                )}

                <SubmitButton
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Sending code..."
                    : "Send verification code"}

                  {!isLoading && (
                    <Arrow aria-hidden="true">→</Arrow>
                  )}
                </SubmitButton>
              </Form>

              <BottomActions>
                <SecondaryButton
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  ← Back to login
                </SecondaryButton>

                <SecondaryButton
                  type="button"
                  onClick={() =>
                    navigate("/reset-password")
                  }
                >
                  Reset password
                </SecondaryButton>
              </BottomActions>
            </>
          )}

          {step === "code" && (
            <>
              <Eyebrow>VERIFY EMAIL</Eyebrow>

              <Heading>
                Check your <Accent>email.</Accent>
              </Heading>

              <Description>
                Enter the 6-digit verification code sent to
                your registered email address.
              </Description>

              {message && (
                <InfoMessage role="status">
                  <InfoIcon>✓</InfoIcon>
                  <span>{message}</span>
                </InfoMessage>
              )}

              <Progress>
                <ProgressStep $complete>
                  <ProgressDot $complete>✓</ProgressDot>

                  <ProgressLabel $complete>
                    Email
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine $complete />

                <ProgressStep $active>
                  <ProgressDot $active>2</ProgressDot>

                  <ProgressLabel $active>
                    Verify
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>3</ProgressDot>

                  <ProgressLabel>
                    Username
                  </ProgressLabel>
                </ProgressStep>
              </Progress>

              <Form onSubmit={handleVerifyCode}>
                <FieldGroup>
                  <Label htmlFor="verification-code">
                    Verification Code
                  </Label>

                  <CodeInput
                    id="verification-code"
                    name="code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(event) =>
                      setCode(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="000000"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                    autoFocus
                  />

                  <CodeMeta>
                    <FieldHint>
                      The code expires in 10 minutes.
                    </FieldHint>

                    <ChangeButton
                      type="button"
                      onClick={handleChangeEmail}
                    >
                      Change email
                    </ChangeButton>
                  </CodeMeta>
                </FieldGroup>

                {error && (
                  <ErrorMessage role="alert">
                    <ErrorIcon>!</ErrorIcon>
                    <span>{error}</span>
                  </ErrorMessage>
                )}

                <SubmitButton
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Verifying..."
                    : "Verify code"}

                  {!isLoading && (
                    <Arrow aria-hidden="true">→</Arrow>
                  )}
                </SubmitButton>
              </Form>

              <BottomActions>
                <SecondaryButton
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  ← Back to login
                </SecondaryButton>
              </BottomActions>
            </>
          )}

          {step === "success" && (
            <SuccessContent>
              <SuccessIcon>✓</SuccessIcon>

              <Eyebrow>VERIFIED</Eyebrow>

              <Heading>
                Username <Accent>found.</Accent>
              </Heading>

              <Description>
                Your Regal Affluence member username is shown
                below.
              </Description>

              <UsernameReveal>
                <UsernameLabel>
                  YOUR USERNAME
                </UsernameLabel>

                <UsernameValue>
                  {recoveredUsername}
                </UsernameValue>
              </UsernameReveal>

              <SuccessNote>
                Keep your username safe. You can now return
                to the member login page and access your
                profile.
              </SuccessNote>

              <SubmitButton
                type="button"
                onClick={() => navigate("/login")}
              >
                Return to login

                <Arrow aria-hidden="true">→</Arrow>
              </SubmitButton>

              <SecondaryButton
                type="button"
                onClick={() =>
                  navigate("/reset-password")
                }
              >
                Reset my password
              </SecondaryButton>
            </SuccessContent>
          )}
        </RecoveryCard>

        <FooterText>
          REGAL AFFLUENCE GROUP
          <span>•</span>
          MEMBER ACCOUNT RECOVERY
        </FooterText>
      </Container>
    </Page>
  );
};

export default RecoverUsername;

/* =========================================================
   PAGE
========================================================= */

const Page = styled.main`
  position: relative;

  min-height: 100svh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding:
    130px
    20px
    70px;

  overflow: hidden;

  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.ivory} 0%,
      ${({ theme }) => theme.colors.ivory} 52%,
      #eee4f6 100%
    );

  color:
    ${({ theme }) =>
      theme.colors.text};

  @media (max-width: 680px) {
    padding:
      110px
      16px
      55px;
  }
`;

/* =========================================================
   BACKGROUND EFFECTS
========================================================= */

const AmbientGlow = styled.div`
  position: absolute;

  width: 560px;
  height: 560px;

  top: -210px;
  right: -190px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        91,
        33,
        182,
        0.1
      ),
      transparent 68%
    );

  filter:
    blur(28px);

  pointer-events:
    none;

  animation:
    ${ambientFloat}
    10s
    ease-in-out
    infinite;
`;

const SecondaryGlow = styled.div`
  position: absolute;

  width: 460px;
  height: 460px;

  bottom: -190px;
  left: -170px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        201,
        169,
        110,
        0.1
      ),
      transparent 70%
    );

  filter:
    blur(28px);

  pointer-events:
    none;

  animation:
    ${ambientFloatReverse}
    12s
    ease-in-out
    infinite;
`;

const BackgroundGrid = styled.div`
  position: absolute;

  inset: 0;

  opacity: 0.14;

  pointer-events: none;

  background-image:
    linear-gradient(
      rgba(
        69,
        35,
        105,
        0.055
      )
      1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(
        69,
        35,
        105,
        0.055
      )
      1px,
      transparent 1px
    );

  background-size:
    58px 58px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      black 20%,
      black 80%,
      transparent
    );
`;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  position: relative;

  width:
    min(
      100%,
      590px
    );

  z-index: 1;
`;

/* =========================================================
   CARD
========================================================= */

const RecoveryCard = styled.section`
  position: relative;

  overflow: hidden;

  width: 100%;

  padding:
    54px;

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

  background:
    rgba(
      255,
      255,
      255,
      0.88
    );

  box-shadow:
    0
    30px
    80px
    rgba(
      60,
      35,
      82,
      0.1
    );

  backdrop-filter:
    blur(16px);

  -webkit-backdrop-filter:
    blur(16px);

  animation:
    ${cardEnter}
    0.7s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    )
    both;

  @media (max-width: 600px) {
    padding:
      38px
      26px;
  }

  @media (max-width: 420px) {
    padding:
      30px
      20px;
  }
`;

const TopAccent = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  height: 3px;

  background:
    linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) =>
        theme.colors.champagne}
        20%,
      ${({ theme }) =>
        theme.colors.purple}
        50%,
      ${({ theme }) =>
        theme.colors.champagne}
        80%,
      transparent 100%
    );
`;

/* =========================================================
   TYPOGRAPHY
========================================================= */

const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    18px;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-size:
    10px;

  font-weight:
    800;

  letter-spacing:
    0.18em;

  text-transform:
    uppercase;

  animation:
    ${fadeUp}
    0.55s
    0.08s
    both;

  &::before {
    content: "";

    width:
      30px;

    height:
      1px;

    background:
      ${({ theme }) =>
        theme.colors.champagne};
  }
`;

const Heading = styled.h1`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-family:
    ${({ theme }) =>
      theme.fonts.display};

  font-size:
    clamp(
      2.9rem,
      7vw,
      5rem
    );

  font-weight:
    500;

  line-height:
    0.97;

  letter-spacing:
    -0.045em;

  animation:
    ${fadeUp}
    0.65s
    0.14s
    both;
`;

const Accent = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style:
    italic;
`;

const Description = styled.p`
  max-width:
    470px;

  margin:
    20px
    0
    30px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    14px;

  line-height:
    1.75;

  animation:
    ${fadeUp}
    0.65s
    0.2s
    both;
`;

/* =========================================================
   PROGRESS
========================================================= */

const Progress = styled.div`
  display:
    flex;

  align-items:
    center;

  width: 100%;

  margin:
    4px
    0
    32px;

  animation:
    ${fadeUp}
    0.6s
    0.25s
    both;
`;

const ProgressStep = styled.div<{
  $active?: boolean;
  $complete?: boolean;
}>`
  display:
    flex;

  align-items:
    center;

  gap:
    8px;

  flex-shrink:
    0;
`;

const ProgressDot = styled.span<{
  $active?: boolean;
  $complete?: boolean;
}>`
  width:
    28px;

  height:
    28px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50%;

  border:
    1px solid
    ${({ $active, $complete }) =>
      $active || $complete
        ? "rgba(91, 33, 182, 0.24)"
        : "rgba(69, 35, 105, 0.12)"};

  background:
    ${({ $active, $complete, theme }) =>
      $active
        ? theme.colors.purple
        : $complete
          ? "rgba(42, 145, 92, 0.1)"
          : "rgba(255, 255, 255, 0.65)"};

  color:
    ${({ $active, $complete, theme }) =>
      $active
        ? theme.colors.white
        : $complete
          ? "#267e52"
          : theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  box-shadow:
    ${({ $active }) =>
      $active
        ? "0 7px 18px rgba(91, 33, 182, 0.18)"
        : "none"};

  transition:
    transform
      0.2s ease;
`;

const ProgressLabel = styled.span<{
  $active?: boolean;
  $complete?: boolean;
}>`
  color:
    ${({ $active, $complete, theme }) =>
      $active || $complete
        ? theme.colors.text
        : theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.06em;

  text-transform:
    uppercase;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ProgressLine = styled.span<{
  $complete?: boolean;
}>`
  flex:
    1;

  height:
    1px;

  margin:
    0
    10px;

  background:
    ${({ $complete }) =>
      $complete
        ? "rgba(42, 145, 92, 0.28)"
        : "rgba(69, 35, 105, 0.09)"};
`;

/* =========================================================
   FORM
========================================================= */

const Form = styled.form`
  display:
    flex;

  flex-direction:
    column;

  gap:
    20px;
`;

const FieldGroup = styled.div`
  display:
    flex;

  flex-direction:
    column;

  gap:
    9px;

  animation:
    ${fadeUp}
    0.6s
    0.3s
    both;
`;

const Label = styled.label`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    11px;

  font-weight:
    800;

  letter-spacing:
    0.06em;
`;

const Input = styled.input`
  width: 100%;

  min-height:
    54px;

  padding:
    0
    16px;

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

  font-size:
    15px;

  outline: none;

  transition:
    border-color
      0.25s ease,
    background
      0.25s ease,
    box-shadow
      0.25s ease,
    transform
      0.25s ease;

  &::placeholder {
    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    opacity:
      0.6;
  }

  &:hover {
    border-color:
      rgba(
        91,
        33,
        182,
        0.28
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
      0 4px
      rgba(
        91,
        33,
        182,
        0.08
      );

    transform:
      translateY(-1px);
  }
`;

const CodeInput = styled(Input)`
  min-height:
    64px;

  text-align:
    center;

  font-size:
    28px;

  font-weight:
    800;

  letter-spacing:
    0.42em;

  padding-left:
    calc(16px + 0.42em);

  color:
    ${({ theme }) =>
      theme.colors.purple};

  &::placeholder {
    letter-spacing:
      0.42em;
  }
`;

const FieldHint = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    11px;

  line-height:
    1.55;
`;

const CodeMeta = styled.div`
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    16px;
`;

const ChangeButton = styled.button`
  padding: 0;

  border: none;

  background:
    transparent;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-family:
    inherit;

  font-size:
    11px;

  font-weight:
    800;

  cursor:
    pointer;

  white-space:
    nowrap;

  &:hover {
    text-decoration:
      underline;
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset:
      3px;

    border-radius:
      3px;
  }
`;

/* =========================================================
   ALERTS
========================================================= */

const shakeIn = keyframes`
  0% {
    opacity: 0;
    transform:
      translateX(-7px);
  }

  35% {
    transform:
      translateX(6px);
  }

  65% {
    transform:
      translateX(-3px);
  }

  100% {
    opacity: 1;
    transform:
      translateX(0);
  }
`;

const ErrorMessage = styled.div`
  display:
    flex;

  align-items:
    flex-start;

  gap:
    10px;

  padding:
    13px
    14px;

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
    #c0392b;

  font-size:
    13px;

  line-height:
    1.55;

  animation:
    ${shakeIn}
    0.45s
    ease
    both;
`;

const ErrorIcon = styled.span`
  width:
    20px;

  height:
    20px;

  flex:
    0 0 20px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50%;

  background:
    rgba(
      192,
      57,
      43,
      0.12
    );

  font-size:
    10px;

  font-weight:
    900;
`;

const InfoMessage = styled.div`
  display:
    flex;

  align-items:
    flex-start;

  gap:
    10px;

  margin-bottom:
    20px;

  padding:
    13px
    14px;

  border:
    1px solid
    rgba(
      42,
      145,
      92,
      0.18
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    rgba(
      42,
      145,
      92,
      0.06
    );

  color:
    #267e52;

  font-size:
    12px;

  line-height:
    1.55;

  animation:
    ${fadeUp}
    0.45s
    both;
`;

const InfoIcon = styled.span`
  width:
    20px;

  height:
    20px;

  flex:
    0 0 20px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50%;

  background:
    rgba(
      42,
      145,
      92,
      0.1
    );

  font-size:
    10px;

  font-weight:
    900;
`;

/* =========================================================
   BUTTONS
========================================================= */

const SubmitButton = styled.button`
  width:
    100%;

  min-height:
    56px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

  padding:
    0
    22px;

  border:
    none;

  border-radius:
    ${({ theme }) =>
      theme.radius.sm};

  background:
    ${({ theme }) =>
      theme.colors.purple};

  color:
    ${({ theme }) =>
      theme.colors.white};

  font-size:
    12px;

  font-weight:
    800;

  letter-spacing:
    0.04em;

  cursor:
    pointer;

  box-shadow:
    0
    13px
    32px
    rgba(
      91,
      33,
      182,
      0.18
    );

  transition:
    transform
      0.25s ease,
    box-shadow
      0.25s ease,
    opacity
      0.25s ease;

  animation:
    ${fadeUp}
    0.6s
    0.36s
    both;

  &:hover:not(:disabled) {
    transform:
      translateY(-2px);

    box-shadow:
      0
      17px
      38px
      rgba(
        91,
        33,
        182,
        0.24
      );
  }

  &:active:not(:disabled) {
    transform:
      translateY(0);
  }

  &:disabled {
    opacity:
      0.5;

    cursor:
      not-allowed;

    box-shadow:
      none;
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset:
      4px;
  }
`;

const Arrow = styled.span`
  font-size:
    18px;

  line-height:
    1;

  transition:
    transform
      0.25s ease;

  ${SubmitButton}:hover & {
    transform:
      translateX(3px);
  }
`;

const BottomActions = styled.div`
  display:
    flex;

  align-items:
    center;

  justify-content:
    space-between;

  gap:
    12px;

  margin-top:
    24px;

  padding-top:
    20px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.08
    );

  @media (max-width: 470px) {
    flex-direction:
      column;

    align-items:
      stretch;
  }
`;

const SecondaryButton = styled.button`
  padding:
    0;

  border:
    none;

  background:
    transparent;

  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-family:
    inherit;

  font-size:
    11px;

  font-weight:
    800;

  cursor:
    pointer;

  transition:
    color
      0.2s ease,
    transform
      0.2s ease;

  &:hover {
    color:
      ${({ theme }) =>
        theme.colors.purpleDeep};

    transform:
      translateY(-1px);
  }

  &:focus-visible {
    outline:
      2px solid
      ${({ theme }) =>
        theme.colors.champagne};

    outline-offset:
      3px;

    border-radius:
      3px;
  }
`;

/* =========================================================
   SUCCESS
========================================================= */

const successPulse = keyframes`
  0%,
  100% {
    transform:
      scale(1);
  }

  50% {
    transform:
      scale(1.05);
  }
`;

const successEnter = keyframes`
  from {
    opacity: 0;
    transform:
      translateY(20px)
      scale(0.98);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
`;

const SuccessContent = styled.div`
  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  text-align:
    center;

  animation:
    ${successEnter}
    0.65s
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    )
    both;

  ${Description} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const SuccessIcon = styled.div`
  width:
    72px;

  height:
    72px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  margin:
    0
    0
    24px;

  border:
    1px solid
    rgba(
      42,
      145,
      92,
      0.22
    );

  border-radius:
    50%;

  background:
    rgba(
      42,
      145,
      92,
      0.08
    );

  color:
    #267e52;

  font-size:
    30px;

  font-weight:
    800;

  box-shadow:
    0
    0
    0 10px
    rgba(
      42,
      145,
      92,
      0.04
    );

  animation:
    ${successPulse}
    2.4s
    ease-in-out
    infinite;
`;

const UsernameReveal = styled.div`
  width: 100%;

  margin:
    4px
    0
    18px;

  padding:
    24px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.25
    );

  border-radius:
    ${({ theme }) =>
      theme.radius.md};

  background:
    linear-gradient(
      145deg,
      rgba(
        255,
        252,
        247,
        0.95
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
    0
    1px
    0
    rgba(
      255,
      255,
      255,
      0.8
    );
`;

const UsernameLabel = styled.span`
  display:
    block;

  margin-bottom:
    8px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.16em;
`;

const UsernameValue = styled.div`
  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-family:
    "SFMono-Regular",
    Consolas,
    "Liberation Mono",
    monospace;

  font-size:
    clamp(
      1.35rem,
      4vw,
      2rem
    );

  font-weight:
    800;

  letter-spacing:
    0.03em;

  overflow-wrap:
    anywhere;
`;

const SuccessNote = styled.p`
  max-width:
    430px;

  margin:
    0
    0
    22px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    12px;

  line-height:
    1.7;
`;

/* =========================================================
   FOOTER
========================================================= */

const FooterText = styled.div`
  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    8px;

  margin-top:
    18px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    9px;

  font-weight:
    800;

  letter-spacing:
    0.12em;

  text-align:
    center;
`;

