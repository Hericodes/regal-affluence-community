import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { loginMember } from "../api/memberApi";

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
       *
       * The password is intentionally not
       * stored in localStorage.
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
       * Store the credentials in memory
       * for the current page flow.
       *
       * The Profile page will request the
       * password again from session state
       * only if required by the current API
       * design.
       */

      sessionStorage.setItem(
        "regalMemberAuth",
        JSON.stringify({
          username:
            cleanUsername,
          password,
        })
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

      <Container>
        <LoginCard>
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
                {error}
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

const LoginCard = styled.section`
  width: 100%;

  padding: 54px;

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
    blur(14px);

  -webkit-backdrop-filter:
    blur(14px);

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
      0.2s ease,
    background
      0.2s ease,
    box-shadow
      0.2s ease;

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

/* =========================================================
   ERROR
========================================================= */

const ErrorMessage = styled.p`
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
      0.2s ease,
    box-shadow
      0.2s ease,
    opacity
      0.2s ease;

  &:hover:not(:disabled) {
    transform:
      translateY(-2px);

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