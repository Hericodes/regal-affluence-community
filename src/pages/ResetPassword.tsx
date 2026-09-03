import { useState } from "react";
import type { FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  requestPasswordReset,
  resetPassword,
} from "../api/memberApi";

/* =========================================================
   TYPES
========================================================= */

type ResetStep =
  | "account"
  | "code"
  | "password"
  | "success";

/* =========================================================
   COMPONENT
========================================================= */

const ResetPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [code, setCode] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [step, setStep] =
    useState<ResetStep>("account");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =======================================================
     REQUEST RESET CODE
  ======================================================= */

  const handleRequestReset = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanUsername =
      username.trim().toLowerCase();

    const cleanEmail =
      email.trim().toLowerCase();

    if (
      !cleanUsername ||
      !cleanEmail
    ) {
      setError(
        "Please enter your username and registered email address."
      );

      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response =
        await requestPasswordReset(
          cleanUsername,
          cleanEmail
        );

      setUsername(
        cleanUsername
      );

      setEmail(
        cleanEmail
      );

      setMessage(
        response
      );

      setStep("code");
    } catch (resetError) {
      console.error(
        "Password reset request error:",
        resetError
      );

      setError(
        resetError instanceof Error
          ? resetError.message
          : "We could not send your verification code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =======================================================
     VERIFY CODE
  ======================================================= */

  const handleVerifyCode = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanCode =
      code.replace(
        /\D/g,
        ""
      ).slice(0, 6);

    if (
      cleanCode.length !== 6
    ) {
      setError(
        "Please enter the 6-digit verification code."
      );

      return;
    }

    setCode(cleanCode);
    setError("");
    setMessage("");
    setStep("password");
  };

  /* =======================================================
     RESET PASSWORD
  ======================================================= */

  const handleResetPassword =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (
        newPassword.length < 8
      ) {
        setError(
          "Your new password must be at least 8 characters long."
        );

        return;
      }

      if (
        newPassword.length > 128
      ) {
        setError(
          "Your new password is too long."
        );

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setError(
          "Your passwords do not match."
        );

        return;
      }

      setIsLoading(true);
      setError("");
      setMessage("");

      try {
        const response =
          await resetPassword(
            username,
            email,
            code,
            newPassword
          );

        setMessage(
          response
        );

        setNewPassword(
          ""
        );

        setConfirmPassword(
          ""
        );

        setStep("success");
      } catch (passwordError) {
        console.error(
          "Password reset error:",
          passwordError
        );

        setError(
          passwordError instanceof Error
            ? passwordError.message
            : "We could not reset your password. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

  /* =======================================================
     CHANGE ACCOUNT
  ======================================================= */

  const handleChangeAccount =
    () => {
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setMessage("");
      setStep("account");
    };

  /* =======================================================
     CHANGE CODE
  ======================================================= */

  const handleChangeCode =
    () => {
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setMessage("");
      setStep("code");
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
        <ResetCard>
          <TopAccent />

          {/* =================================================
              STEP 1 — ACCOUNT
          ================================================= */}

          {step === "account" && (
            <>
              <Eyebrow>
                ACCOUNT RECOVERY
              </Eyebrow>

              <Heading>
                Reset your{" "}
                <Accent>
                  password.
                </Accent>
              </Heading>

              <Description>
                Enter the username and email
                address connected to your Regal
                Affluence member account. We will
                send a temporary verification code
                to your email.
              </Description>

              <Progress>
                <ProgressStep $active>
                  <ProgressDot $active>
                    1
                  </ProgressDot>

                  <ProgressLabel $active>
                    Account
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>
                    2
                  </ProgressDot>

                  <ProgressLabel>
                    Verify
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>
                    3
                  </ProgressDot>

                  <ProgressLabel>
                    Password
                  </ProgressLabel>
                </ProgressStep>
              </Progress>

              <Form
                onSubmit={
                  handleRequestReset
                }
              >
                <FieldGroup>
                  <Label htmlFor="reset-username">
                    Username
                  </Label>

                  <Input
                    id="reset-username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(
                      event
                    ) =>
                      setUsername(
                        event.target
                          .value
                      )
                    }
                    placeholder="Enter your username"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={
                      false
                    }
                    required
                    autoFocus
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="reset-email">
                    Registered Email
                  </Label>

                  <Input
                    id="reset-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(
                      event
                    ) =>
                      setEmail(
                        event.target
                          .value
                      )
                    }
                    placeholder="Enter your registered email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={
                      false
                    }
                    required
                  />

                  <FieldHint>
                    This must match the email
                    attached to your member account.
                  </FieldHint>
                </FieldGroup>

                {error && (
                  <ErrorMessage
                    role="alert"
                  >
                    <ErrorIcon>
                      !
                    </ErrorIcon>

                    <span>
                      {error}
                    </span>
                  </ErrorMessage>
                )}

                <SubmitButton
                  type="submit"
                  disabled={
                    isLoading
                  }
                >
                  {isLoading
                    ? "Sending code..."
                    : "Send verification code"}

                  {!isLoading && (
                    <Arrow
                      aria-hidden="true"
                    >
                      →
                    </Arrow>
                  )}
                </SubmitButton>
              </Form>

              <BottomActions>
                <SecondaryButton
                  type="button"
                  onClick={() =>
                    navigate(
                      "/login"
                    )
                  }
                >
                  ← Back to login
                </SecondaryButton>

                <SecondaryButton
                  type="button"
                  onClick={() =>
                    navigate(
                      "/recover-username"
                    )
                  }
                >
                  Forgot username?
                </SecondaryButton>
              </BottomActions>
            </>
          )}

          {/* =================================================
              STEP 2 — VERIFY CODE
          ================================================= */}

          {step === "code" && (
            <>
              <Eyebrow>
                VERIFY EMAIL
              </Eyebrow>

              <Heading>
                Verify your{" "}
                <Accent>
                  account.
                </Accent>
              </Heading>

              <Description>
                Enter the 6-digit code sent to
                your registered email address.
                The code is valid for 10 minutes.
              </Description>

              {message && (
                <InfoMessage
                  role="status"
                >
                  <InfoIcon>
                    ✓
                  </InfoIcon>

                  <span>
                    {message}
                  </span>
                </InfoMessage>
              )}

              <Progress>
                <ProgressStep
                  $complete
                >
                  <ProgressDot
                    $complete
                  >
                    ✓
                  </ProgressDot>

                  <ProgressLabel
                    $complete
                  >
                    Account
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine
                  $complete
                />

                <ProgressStep
                  $active
                >
                  <ProgressDot
                    $active
                  >
                    2
                  </ProgressDot>

                  <ProgressLabel
                    $active
                  >
                    Verify
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine />

                <ProgressStep>
                  <ProgressDot>
                    3
                  </ProgressDot>

                  <ProgressLabel>
                    Password
                  </ProgressLabel>
                </ProgressStep>
              </Progress>

              <Form
                onSubmit={
                  handleVerifyCode
                }
              >
                <FieldGroup>
                  <Label htmlFor="reset-code">
                    Verification Code
                  </Label>

                  <CodeInput
                    id="reset-code"
                    name="code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(
                      event
                    ) =>
                      setCode(
                        event.target
                          .value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(
                            0,
                            6
                          )
                      )
                    }
                    placeholder="000000"
                    maxLength={
                      6
                    }
                    pattern="[0-9]{6}"
                    required
                    autoFocus
                  />

                  <CodeMeta>
                    <FieldHint>
                      Check your inbox and
                      spam folder.
                    </FieldHint>

                    <ChangeButton
                      type="button"
                      onClick={
                        handleChangeAccount
                      }
                    >
                      Change account
                    </ChangeButton>
                  </CodeMeta>
                </FieldGroup>

                {error && (
                  <ErrorMessage
                    role="alert"
                  >
                    <ErrorIcon>
                      !
                    </ErrorIcon>

                    <span>
                      {error}
                    </span>
                  </ErrorMessage>
                )}

                <SubmitButton
                  type="submit"
                  disabled={
                    isLoading
                  }
                >
                  Continue

                  <Arrow
                    aria-hidden="true"
                  >
                    →
                  </Arrow>
                </SubmitButton>
              </Form>

              <BottomActions>
                <SecondaryButton
                  type="button"
                  onClick={() =>
                    navigate(
                      "/login"
                    )
                  }
                >
                  ← Back to login
                </SecondaryButton>

                <SecondaryButton
                  type="button"
                  onClick={
                    handleChangeCode
                  }
                >
                  Re-enter code
                </SecondaryButton>
              </BottomActions>
            </>
          )}

          {/* =================================================
              STEP 3 — NEW PASSWORD
          ================================================= */}

          {step === "password" && (
            <>
              <Eyebrow>
                NEW PASSWORD
              </Eyebrow>

              <Heading>
                Create a{" "}
                <Accent>
                  new password.
                </Accent>
              </Heading>

              <Description>
                Choose a new password for your
                Regal Affluence member account.
                Use at least 8 characters.
              </Description>

              <Progress>
                <ProgressStep
                  $complete
                >
                  <ProgressDot
                    $complete
                  >
                    ✓
                  </ProgressDot>

                  <ProgressLabel
                    $complete
                  >
                    Account
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine
                  $complete
                />

                <ProgressStep
                  $complete
                >
                  <ProgressDot
                    $complete
                  >
                    ✓
                  </ProgressDot>

                  <ProgressLabel
                    $complete
                  >
                    Verify
                  </ProgressLabel>
                </ProgressStep>

                <ProgressLine
                  $complete
                />

                <ProgressStep
                  $active
                >
                  <ProgressDot
                    $active
                  >
                    3
                  </ProgressDot>

                  <ProgressLabel
                    $active
                  >
                    Password
                  </ProgressLabel>
                </ProgressStep>
              </Progress>

              <Form
                onSubmit={
                  handleResetPassword
                }
              >
                <FieldGroup>
                  <Label htmlFor="new-password">
                    New Password
                  </Label>

                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={
                      newPassword
                    }
                    onChange={(
                      event
                    ) =>
                      setNewPassword(
                        event.target
                          .value
                      )
                    }
                    placeholder="Create your new password"
                    autoComplete="new-password"
                    minLength={
                      8
                    }
                    maxLength={
                      128
                    }
                    required
                    autoFocus
                  />

                  <PasswordHint>
                    Minimum 8 characters.
                  </PasswordHint>
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="confirm-password">
                    Confirm New Password
                  </Label>

                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={
                      confirmPassword
                    }
                    onChange={(
                      event
                    ) =>
                      setConfirmPassword(
                        event.target
                          .value
                      )
                    }
                    placeholder="Enter the password again"
                    autoComplete="new-password"
                    minLength={
                      8
                    }
                    maxLength={
                      128
                    }
                    required
                  />
                </FieldGroup>

                {newPassword &&
                  confirmPassword && (
                    <PasswordMatch
                      $match={
                        newPassword ===
                        confirmPassword
                      }
                    >
                      <MatchDot
                        $match={
                          newPassword ===
                          confirmPassword
                        }
                      />

                      {newPassword ===
                      confirmPassword
                        ? "Passwords match."
                        : "Passwords do not match."}
                    </PasswordMatch>
                  )}

                {error && (
                  <ErrorMessage
                    role="alert"
                  >
                    <ErrorIcon>
                      !
                    </ErrorIcon>

                    <span>
                      {error}
                    </span>
                  </ErrorMessage>
                )}

                <SubmitButton
                  type="submit"
                  disabled={
                    isLoading
                  }
                >
                  {isLoading
                    ? "Resetting password..."
                    : "Reset password"}

                  {!isLoading && (
                    <Arrow
                      aria-hidden="true"
                    >
                      →
                    </Arrow>
                  )}
                </SubmitButton>
              </Form>

              <BottomActions>
                <SecondaryButton
                  type="button"
                  onClick={() =>
                    navigate(
                      "/login"
                    )
                  }
                >
                  ← Back to login
                </SecondaryButton>

                <SecondaryButton
                  type="button"
                  onClick={
                    handleChangeCode
                  }
                >
                  Change code
                </SecondaryButton>
              </BottomActions>
            </>
          )}

          {/* =================================================
              STEP 4 — SUCCESS
          ================================================= */}

          {step === "success" && (
            <SuccessContent>
              <SuccessIcon>
                ✓
              </SuccessIcon>

              <Eyebrow>
                PASSWORD UPDATED
              </Eyebrow>

              <Heading>
                You're{" "}
                <Accent>
                  all set.
                </Accent>
              </Heading>

              <Description>
                Your Regal Affluence member
                password has been successfully
                changed.
              </Description>

              <SuccessPanel>
                <SuccessPanelIcon>
                  ✓
                </SuccessPanelIcon>

                <SuccessPanelText>
                  <SuccessPanelTitle>
                    Password reset complete
                  </SuccessPanelTitle>

                  <SuccessPanelDescription>
                    You can now sign in using your
                    username and new password.
                  </SuccessPanelDescription>
                </SuccessPanelText>
              </SuccessPanel>

              <SubmitButton
                type="button"
                onClick={() =>
                  navigate(
                    "/login"
                  )
                }
              >
                Sign in to my account

                <Arrow
                  aria-hidden="true"
                >
                  →
                </Arrow>
              </SubmitButton>

              {message && (
                <SuccessNote>
                  {message}
                </SuccessNote>
              )}
            </SuccessContent>
          )}
        </ResetCard>

        <FooterText>
          REGAL AFFLUENCE GROUP
          <span>•</span>
          MEMBER ACCOUNT RECOVERY
        </FooterText>
      </Container>
    </Page>
  );
};

export default ResetPassword;

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
      ${({ theme }) =>
        theme.colors.ivory}
        0%,
      ${({ theme }) =>
        theme.colors.ivory}
        52%,
      #eee4f6
        100%
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

  width:
    560px;

  height:
    560px;

  top:
    -210px;

  right:
    -190px;

  border-radius:
    50%;

  background:
    radial-gradient(
      circle,
      rgba(
        91,
        33,
        182,
        0.1
      ),
      transparent
        68%
    );

  filter:
    blur(28px);

  pointer-events:
    none;

  animation:
    ambientFloat
      10s
      ease-in-out
      infinite;
`;

const SecondaryGlow = styled.div`
  position: absolute;

  width:
    460px;

  height:
    460px;

  bottom:
    -190px;

  left:
    -170px;

  border-radius:
    50%;

  background:
    radial-gradient(
      circle,
      rgba(
        201,
        169,
        110,
        0.1
      ),
      transparent
        70%
    );

  filter:
    blur(28px);

  pointer-events:
    none;

  animation:
    ambientFloatReverse
      12s
      ease-in-out
      infinite;
`;

const BackgroundGrid = styled.div`
  position: absolute;

  inset: 0;

  opacity:
    0.14;

  pointer-events:
    none;

  background-image:
    linear-gradient(
      rgba(
        69,
        35,
        105,
        0.055
      )
      1px,
      transparent
      1px
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
      transparent
      1px
    );

  background-size:
    58px
    58px;

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

  z-index:
    1;
`;

/* =========================================================
   CARD
========================================================= */

const ResetCard = styled.section`
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
    cardEnter
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

  height:
    3px;

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
  display:
    inline-flex;

  align-items:
    center;

  gap:
    10px;

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
    fadeUp
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
    fadeUp
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
    fadeUp
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

  width:
    100%;

  margin:
    4px
    0
    32px;

  animation:
    fadeUp
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
    display:
      none;
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
    fadeUp
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
  width:
    100%;

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

  outline:
    none;

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
      translateY(
        -1px
      );
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
    calc(
      16px +
        0.42em
    );

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

const PasswordHint = styled.span`
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

/* =========================================================
   PASSWORD STATUS
========================================================= */

const PasswordMatch = styled.div<{
  $match: boolean;
}>`
  display:
    flex;

  align-items:
    center;

  gap:
    8px;

  margin-top:
    -4px;

  color:
    ${({ $match }) =>
      $match
        ? "#267e52"
        : "#c0392b"};

  font-size:
    11px;

  font-weight:
    700;
`;

const MatchDot = styled.span<{
  $match: boolean;
}>`
  width:
    7px;

  height:
    7px;

  flex:
    0 0 7px;

  border-radius:
    50%;

  background:
    ${({ $match }) =>
      $match
        ? "#2a915c"
        : "#c0392b"};

  box-shadow:
    0 0 9px
    ${({ $match }) =>
      $match
        ? "rgba(42,145,92,0.28)"
        : "rgba(192,57,43,0.22)"};
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
    fadeUp
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

  &:hover:not(:disabled) {
    transform:
      translateY(
        -2px
      );

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
      translateX(
        3px
      );
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
  padding: 0;

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
      translateY(
        -1px
      );
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

const ChangeButton = styled.button`
  padding: 0;

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
   SUCCESS
========================================================= */

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
    successEnter
      0.65s
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      )
      both;

  ${Description} {
    margin-left:
      auto;

    margin-right:
      auto;
  }
`;

const SuccessIcon = styled.div`
  width:
    76px;

  height:
    76px;

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
    successPulse
      2.4s
      ease-in-out
      infinite;
`;

const SuccessPanel = styled.div`
  display:
    flex;

  align-items:
    flex-start;

  gap:
    14px;

  width:
    100%;

  margin:
    4px
    0
    22px;

  padding:
    18px;

  border:
    1px solid
    rgba(
      201,
      169,
      110,
      0.24
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
        0.96
      ),
      rgba(
        240,
        232,
        245,
        0.72
      )
    );

  text-align:
    left;
`;

const SuccessPanelIcon = styled.span`
  width:
    26px;

  height:
    26px;

  flex:
    0 0 26px;

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  margin-top:
    1px;

  border-radius:
    50%;

  background:
    rgba(
      42,
      145,
      92,
      0.1
    );

  color:
    #267e52;

  font-size:
    12px;

  font-weight:
    900;
`;

const SuccessPanelText = styled.div`
  min-width:
    0;
`;

const SuccessPanelTitle = styled.p`
  margin:
    0
    0
    5px;

  color:
    ${({ theme }) =>
      theme.colors.purpleDeep};

  font-size:
    12px;

  font-weight:
    800;
`;

const SuccessPanelDescription =
  styled.p`
    margin: 0;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    font-size:
      11px;

    line-height:
      1.6;
  `;

const SuccessNote = styled.p`
  margin:
    18px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    11px;

  line-height:
    1.6;
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












