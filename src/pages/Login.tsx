import { useState } from "react";
import type { FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { loginMember } from "../api/memberApi";

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

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cleanUsername =
      username.trim().toLowerCase();

    if (!cleanUsername || !password) {
      setError(
        "Please enter your username and password."
      );

      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const profile =
        await loginMember(
          cleanUsername,
          password
        );

      /*
       * Store only the information needed
       * for the current member session.
       */
      sessionStorage.setItem(
        "regalMember",
        JSON.stringify({
          username:
            cleanUsername,
          memberId:
            profile.memberId,
        })
      );

      /*
       * Store the current credentials for
       * the existing Profile API design.
       */
      sessionStorage.setItem(
        "regalMemberAuth",
        JSON.stringify({
          username:
            cleanUsername,
          password,
        })
      );

      /*
       * Let the Navbar know immediately
       * that a member session exists.
       */
      window.dispatchEvent(
        new Event("regal-member-session")
      );

      navigate("/profile");
    } catch (loginError) {
      console.error(
        "Member login error:",
        loginError
      );

      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to sign you in. Please check your username and password and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <Glow />
      <GlowSecondary />

      <Container>
        <LoginCard>
          <CardTopGlow />

          <Eyebrow>
            REGAL AFFLUENCE GROUP
          </Eyebrow>

          <Heading>
            Welcome
            <br />
            <Accent>back.</Accent>
          </Heading>

          <Description>
            Sign in to access your Regal
            Affluence member profile and
            complete your membership setup.
          </Description>

          <Form
            onSubmit={handleSubmit}
          >
            {/* =========================================
                USERNAME
            ========================================== */}

            <FieldGroup>
              <Label htmlFor="username">
                Username
              </Label>

              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(
                    event.target.value
                  )
                }
                placeholder="Enter your username"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </FieldGroup>

            {/* =========================================
                PASSWORD
            ========================================== */}

            <FieldGroup>
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </FieldGroup>

            {/* =========================================
                ERROR
            ========================================== */}

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

            {/* =========================================
                SUBMIT
            ========================================== */}

            <SubmitButton
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Signing in..."
                : "Access my profile"}

              {!isLoading && (
                <Arrow
                  aria-hidden="true"
                >
                  →
                </Arrow>
              )}
            </SubmitButton>
          </Form>

          {/* =========================================
              ACCOUNT RECOVERY
          ========================================== */}

          <RecoveryArea>
            <RecoveryDivider>
              <span />
              <RecoveryDividerText>
                ACCOUNT RECOVERY
              </RecoveryDividerText>
              <span />
            </RecoveryDivider>

            <RecoveryText>
              Having trouble accessing your
              account?
            </RecoveryText>

            <RecoveryLinks>
              <RecoveryLink
                type="button"
                onClick={() =>
                  navigate(
                    "/recover-username"
                  )
                }
              >
                Forgot username?
              </RecoveryLink>

              <RecoverySeparator>
                •
              </RecoverySeparator>

              <RecoveryLink
                type="button"
                onClick={() =>
                  navigate(
                    "/reset-password"
                  )
                }
              >
                Forgot password?
              </RecoveryLink>
            </RecoveryLinks>
          </RecoveryArea>

          <HelpText>
            Use the username and password
            you created when you submitted
            your membership application.
          </HelpText>
        </LoginCard>
      </Container>
    </Page>
  );
};

export default Login;

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
    140px
    24px
    80px;

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

  @media (max-width: 768px) {
    padding:
      120px
      16px
      60px;
  }
`;

/* =========================================================
   BACKGROUND GLOW
========================================================= */

const floatGlow = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(-18px, 14px, 0) scale(1.05);
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const floatGlowReverse = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(16px, -12px, 0) scale(1.06);
  }

  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const Glow = styled.div`
  position: absolute;

  width: 520px;

  height: 520px;

  top: -180px;

  right: -160px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        91,
        33,
        182,
        0.09
      ),
      transparent 68%
    );

  filter:
    blur(20px);

  pointer-events:
    none;

  animation:
    ${floatGlow} 9s ease-in-out
      infinite;
`;

const GlowSecondary = styled.div`
  position: absolute;

  width: 430px;

  height: 430px;

  bottom: -180px;

  left: -160px;

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
      transparent 68%
    );

  filter:
    blur(26px);

  pointer-events:
    none;

  animation:
    ${floatGlowReverse}
      11s ease-in-out
      infinite;
`;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  position: relative;

  width:
    min(
      100%,
      560px
    );

  z-index: 1;
`;

/* =========================================================
   LOGIN CARD
========================================================= */

const cardEnter = keyframes`
  from {
    opacity: 0;
    transform:
      translateY(28px)
      scale(0.985);
  }

  to {
    opacity: 1;
    transform:
      translateY(0)
      scale(1);
  }
`;

const LoginCard = styled.section`
  position: relative;

  width: 100%;

  padding: 54px;

  overflow: hidden;

  background:
    rgba(
      255,
      255,
      255,
      0.88
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
    blur(14px);

  -webkit-backdrop-filter:
    blur(14px);

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
      36px
      24px;
  }

  @media (max-width: 420px) {
    padding:
      28px
      20px;
  }
`;

const CardTopGlow = styled.div`
  position: absolute;

  top: -90px;

  right: -80px;

  width: 220px;

  height: 220px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        91,
        33,
        182,
        0.07
      ),
      transparent 70%
    );

  pointer-events:
    none;
`;

/* =========================================================
   EYEBROW
========================================================= */

const Eyebrow = styled.p`
  display: inline-flex;

  align-items: center;

  gap: 10px;

  margin:
    0
    0
    20px;

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
      0.6s
      0.1s
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

/* =========================================================
   HEADING
========================================================= */

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
      3.3rem,
      8vw,
      5.4rem
    );

  font-weight:
    500;

  line-height:
    0.94;

  letter-spacing:
    -0.045em;

  animation:
    ${fadeUp}
      0.7s
      0.16s
      both;
`;

const Accent = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.purple};

  font-style:
    italic;
`;

/* =========================================================
   DESCRIPTION
========================================================= */

const Description = styled.p`
  max-width:
    470px;

  margin:
    24px
    0
    38px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    15px;

  line-height:
    1.75;

  animation:
    ${fadeUp}
      0.7s
      0.22s
      both;
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
    22px;
`;

/* =========================================================
   FIELD
========================================================= */

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
      0.28s
      both;

  &:nth-child(2) {
    animation-delay:
      0.34s;
  }
`;

/* =========================================================
   LABEL
========================================================= */

const Label = styled.label`
  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size:
    12px;

  font-weight:
    700;

  letter-spacing:
    0.04em;
`;

/* =========================================================
   INPUT
========================================================= */

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

/* =========================================================
   ERROR
========================================================= */

const shakeIn = keyframes`
  0% {
    opacity: 0;
    transform:
      translateX(-6px);
  }

  40% {
    transform:
      translateX(5px);
  }

  70% {
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

  margin:
    -2px
    0
    0;

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
    1.5;

  animation:
    ${shakeIn}
      0.45s
      ease both;
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
    11px;

  font-weight:
    900;
`;

/* =========================================================
   SUBMIT
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

  margin-top:
    4px;

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
    13px;

  font-weight:
    800;

  letter-spacing:
    0.04em;

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
      0.65s
      0.4s
      both;

  &:hover:not(:disabled) {
    transform:
      translateY(-2px);

    box-shadow:
      0
      16px
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

/* =========================================================
   ARROW
========================================================= */

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

/* =========================================================
   ACCOUNT RECOVERY
========================================================= */

const RecoveryArea = styled.div`
  margin-top:
    30px;

  padding-top:
    24px;

  border-top:
    1px solid
    rgba(
      69,
      35,
      105,
      0.09
    );

  animation:
    ${fadeUp}
      0.7s
      0.48s
      both;
`;

const RecoveryDivider = styled.div`
  display:
    flex;

  align-items:
    center;

  gap:
    10px;

  margin-bottom:
    13px;

  span {
    flex:
      1;

    height:
      1px;

    background:
      rgba(
        69,
        35,
        105,
        0.07
      );
  }
`;

const RecoveryDividerText = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    8px;

  font-weight:
    800;

  letter-spacing:
    0.16em;

  white-space:
    nowrap;
`;

const RecoveryText = styled.p`
  margin:
    0
    0
    11px;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    12px;

  line-height:
    1.6;

  text-align:
    center;
`;

const RecoveryLinks = styled.div`
  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    9px;

  flex-wrap:
    wrap;
`;

const RecoveryLink = styled.button`
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
    12px;

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

const RecoverySeparator = styled.span`
  color:
    ${({ theme }) =>
      theme.colors.champagne};

  font-size:
    11px;
`;

/* =========================================================
   HELP TEXT
========================================================= */

const HelpText = styled.p`
  margin:
    24px
    0
    0;

  color:
    ${({ theme }) =>
      theme.colors.textMuted};

  font-size:
    12px;

  line-height:
    1.7;

  text-align:
    center;
`;

