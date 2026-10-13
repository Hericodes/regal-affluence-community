import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

import {
  getNewsroomSession,
  isCurrentUserEditor,
  NewsroomSessionError,
  SESSION_EXPIRED_EVENT,
  signOutNewsroom,
} from "../../api/newsAdminApi";
import useDocumentMeta from "../../hooks/useDocumentMeta";
import { isSupabaseConfigured } from "../../lib/supabase";
import { Alert, Button } from "./Admin.styles";
import {
  NewsroomContext,
  type ToastTone,
} from "./newsroomContext";
import PasscodeScreen, { type PasscodeReason } from "./PasscodeScreen";

/* =========================================================
   NEWSROOM LAYOUT
   ---------------------------------------------------------
   Shows the passcode screen until the database confirms a
   valid newsroom session. This is a usability gate only:
   every read of private content and every write is checked
   by Row-Level Security, whatever the browser does.
========================================================= */

const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

type AccessState = "checking" | "locked" | "granted" | "unavailable";

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

const initialAccess = (): AccessState =>
  !isSupabaseConfigured
    ? "unavailable"
    : getNewsroomSession()
      ? "checking"
      : "locked";

const AdminLayout = () => {
  const [access, setAccess] = useState<AccessState>(initialAccess);
  const [reason, setReason] = useState<PasscodeReason>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [signingOut, setSigningOut] = useState(false);
  const toastId = useRef(0);

  useDocumentMeta({ title: "Newsroom", noIndex: true });

  const notify = useCallback((message: string, tone: ToastTone = "success") => {
    const id = ++toastId.current;

    setToasts((current) => [...current, { id, message, tone }]);

    window.setTimeout(
      () => setToasts((current) => current.filter((toast) => toast.id !== id)),
      tone === "error" ? 8000 : 4500
    );
  }, []);

  /* Confirm the stored token with the database. */
  useEffect(() => {
    if (access !== "checking") return;

    let active = true;

    isCurrentUserEditor()
      .then(async (allowed) => {
        if (!active) return;

        if (!allowed) {
          await signOutNewsroom();
          setReason("expired");
          setAccess("locked");
          return;
        }

        setExpiresAt(getNewsroomSession()?.expiresAt ?? null);
        setHasEntered(true);
        setAccess("granted");
      })
      .catch((error: unknown) => {
        if (!active) return;

        if (error instanceof NewsroomSessionError) {
          setReason("expired");
          setAccess("locked");
        } else {
          setAccess("unavailable");
        }
      });

    return () => {
      active = false;
    };
  }, [access]);

  /* Lock as soon as the session ends: at its expiry time,
     or when the server rejects the token. */
  useEffect(() => {
    if (access !== "granted") return;

    const lock = () => {
      setReason("expired");
      setAccess("locked");
    };

    const session = getNewsroomSession();
    const timer = window.setTimeout(
      () => {
        void signOutNewsroom();
        lock();
      },
      Math.max(0, (session?.expiresAt ?? 0) - Date.now())
    );

    window.addEventListener(SESSION_EXPIRED_EVENT, lock);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(SESSION_EXPIRED_EVENT, lock);
    };
  }, [access]);

  const contextValue = useMemo(() => ({ notify }), [notify]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOutNewsroom();
    setSigningOut(false);
    setHasEntered(false);
    setReason("signed-out");
    setAccess("locked");
  };

  const handlePasscodeSuccess = () => {
    setReason(null);
    setAccess("checking");
  };

  if (access === "checking" && !hasEntered) {
    return (
      <Shell>
        <Centered aria-busy="true">Checking your access…</Centered>
      </Shell>
    );
  }

  if (access === "locked" && !hasEntered) {
    return (
      <PasscodeScreen
        variant="page"
        reason={reason}
        onSuccess={handlePasscodeSuccess}
      />
    );
  }

  if (access === "unavailable") {
    return (
      <Shell>
        <Centered>
          <Alert role="alert">
            The newsroom can't be reached right now. If this keeps
            happening, the news service may not be configured yet.
          </Alert>
          <Button as={Link} to="/" $size="sm">
            Back to website
          </Button>
        </Centered>
      </Shell>
    );
  }

  return (
    <NewsroomContext.Provider value={contextValue}>
      <Shell>
        <TopBar>
          <TopBarInner>
            <Brand to="/admin">
              <img
                src={`${BASE_URL}images/regal-affluence-logo.png`}
                alt="Regal Affluence"
              />
              <span>Newsroom</span>
            </Brand>

            <Nav aria-label="Newsroom">
              <NavLink to="/admin" end>
                Overview
              </NavLink>
              <NavLink to="/admin/posts" end>
                All posts
              </NavLink>
              <NavLink to="/news" target="_blank" rel="noopener">
                View site ↗
              </NavLink>
            </Nav>

            <Account>
              {expiresAt && (
                <Email>Session ends {timeFormat.format(expiresAt)}</Email>
              )}

              <Button
                type="button"
                $size="sm"
                $variant="ghost"
                onClick={handleSignOut}
                disabled={signingOut}
              >
                {signingOut ? "Signing out…" : "Sign out"}
              </Button>

              <Button as={Link} to="/admin/posts/new" $size="sm" $variant="primary">
                New post
              </Button>
            </Account>
          </TopBarInner>
        </TopBar>

        <Main id="newsroom-main">
          <Suspense fallback={<Centered aria-busy="true">Loading…</Centered>}>
            <Outlet />
          </Suspense>
        </Main>

        {access === "locked" && (
          <PasscodeScreen
            variant="dialog"
            reason={reason}
            onSuccess={handlePasscodeSuccess}
          />
        )}

        <Toasts aria-live="polite" aria-atomic="false">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              $tone={toast.tone}
              role={toast.tone === "error" ? "alert" : "status"}
            >
              {toast.message}
            </ToastItem>
          ))}
        </Toasts>
      </Shell>
    </NewsroomContext.Provider>
  );
};

export default AdminLayout;

/* =========================================================
   STYLES
========================================================= */

const Shell = styled.div`
  min-height: 100vh;

  background: ${({ theme }) => theme.colors.ivory};
`;

const Centered = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;

  max-width: 520px;

  margin: 0 auto;
  padding: 120px 24px;

  color: ${({ theme }) => theme.colors.textMuted};

  text-align: center;
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;

  border-bottom: 1px solid rgba(77, 48, 108, 0.1);

  background: rgba(255, 255, 255, 0.96);
`;

const TopBarInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;

  width: min(calc(100% - 40px), 1240px);
  min-height: 72px;

  margin: 0 auto;
  padding: 10px 0;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: auto;
    height: 38px;
  }

  span {
    padding-left: 12px;

    border-left: 1px solid rgba(77, 48, 108, 0.16);

    color: ${({ theme }) => theme.colors.purpleDeep};

    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 18px;
    font-style: italic;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  a {
    padding: 8px 12px;

    border-radius: ${({ theme }) => theme.radius.sm};

    color: ${({ theme }) => theme.colors.textMuted};

    font-size: 15px;
    font-weight: 500;

    &:hover {
      color: ${({ theme }) => theme.colors.purpleDeep};
    }

    &.active {
      background: rgba(91, 33, 182, 0.08);
      color: ${({ theme }) => theme.colors.purple};
    }
  }

  @media (max-width: 760px) {
    order: 3;

    width: 100%;
  }
`;

const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-left: auto;
`;

const Email = styled.span`
  max-width: 220px;

  overflow: hidden;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 980px) {
    display: none;
  }
`;

const Main = styled.main`
  width: min(calc(100% - 40px), 1240px);

  margin: 0 auto;
  padding: 36px 0 80px;

  @media (max-width: 600px) {
    width: calc(100% - 28px);
    padding-top: 24px;
  }
`;

const Toasts = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 50;

  display: grid;
  gap: 10px;

  width: min(calc(100% - 40px), 380px);
`;

const ToastItem = styled.div<{ $tone: ToastTone }>`
  padding: 14px 18px;

  border-left: 3px solid
    ${({ $tone, theme }) =>
      $tone === "error" ? theme.colors.error : theme.colors.success};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.purpleDeep};
  color: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme }) => theme.shadows.medium};

  font-size: 14px;
  line-height: 1.5;
`;
