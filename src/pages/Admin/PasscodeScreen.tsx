import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { signInWithPasscode } from "../../api/newsAdminApi";
import { isSupabaseConfigured } from "../../lib/supabase";
import { Alert, Button, Field, Input, Label } from "./Admin.styles";

/* =========================================================
   NEWSROOM PASSCODE
   The passcode is sent to the `newsroom-auth` Edge Function
   and checked there. Nothing in this file knows the
   passcode or can verify it.

   "page"   — full screen, shown when entering /admin.
   "dialog" — modal over the dashboard when a session ends,
              so unsaved work in the editor is kept.
========================================================= */

const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export type PasscodeReason = "expired" | "signed-out" | null;

const REASONS: Record<Exclude<PasscodeReason, null>, string> = {
  expired: "Your session has ended. Enter the passcode to continue.",
  "signed-out": "You have been signed out.",
};

interface PasscodeScreenProps {
  variant: "page" | "dialog";
  reason: PasscodeReason;
  onSuccess: () => void;
}

const PasscodeScreen = ({ variant, reason, onSuccess }: PasscodeScreenProps) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (variant === "dialog" && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [variant]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passcode) {
      setError("Enter the newsroom passcode.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await signInWithPasscode(passcode);
      setPasscode("");
      onSuccess();
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : "Sign-in failed. Please try again."
      );
      setPasscode("");
      setSubmitting(false);
    }
  };

  const content = (
    <Card>
      <Link to="/" aria-label="Regal Affluence home">
        <Logo
          src={`${BASE_URL}images/regal-affluence-logo.png`}
          alt="Regal Affluence"
        />
      </Link>

      <Heading id="passcode-heading">Newsroom</Heading>
      <Intro>Enter the passcode to manage News &amp; Updates.</Intro>

      {!isSupabaseConfigured ? (
        <Alert role="alert">
          The newsroom has not been configured on this deployment.
          Contact the website administrator.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit} noValidate>
          {reason && !error && <Alert $tone="info">{REASONS[reason]}</Alert>}
          {error && <Alert role="alert">{error}</Alert>}

          <Field>
            <Label htmlFor="newsroom-passcode">Passcode</Label>
            <Input
              id="newsroom-passcode"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={passcode}
              maxLength={256}
              onChange={(event) => setPasscode(event.target.value)}
              disabled={submitting}
              required
            />
          </Field>

          <Button
            type="submit"
            $variant="primary"
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? "Checking…" : "Enter newsroom"}
          </Button>
        </Form>
      )}

      <Footnote>
        <Link to="/">← Back to the website</Link>
      </Footnote>
    </Card>
  );

  if (variant === "dialog") {
    return (
      <Dialog
        ref={dialogRef}
        aria-labelledby="passcode-heading"
        onCancel={(event) => event.preventDefault()}
      >
        {content}
      </Dialog>
    );
  }

  return <Screen>{content}</Screen>;
};

export default PasscodeScreen;

const Screen = styled.main`
  display: grid;
  place-items: center;

  min-height: 100vh;

  padding: 40px 16px;

  background:
    radial-gradient(
      circle at 85% 0%,
      rgba(91, 33, 182, 0.08),
      transparent 45%
    ),
    ${({ theme }) => theme.colors.ivory};
`;

const Dialog = styled.dialog`
  padding: 0;

  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};

  background: transparent;

  &::backdrop {
    background: rgba(30, 10, 60, 0.55);
  }
`;

const Card = styled.div`
  display: grid;
  gap: 14px;

  width: min(calc(100vw - 32px), 420px);

  padding: clamp(28px, 6vw, 44px);

  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Logo = styled.img`
  width: auto;
  height: 52px;

  margin-bottom: 10px;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 2rem;
  font-weight: 500;
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 15px;
`;

const Form = styled.form`
  display: grid;
  gap: 18px;

  margin-top: 10px;
`;

const Footnote = styled.p`
  margin-top: 8px;
  padding-top: 18px;

  border-top: 1px solid rgba(77, 48, 108, 0.08);

  font-size: 14px;

  a {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: 600;
  }
`;
