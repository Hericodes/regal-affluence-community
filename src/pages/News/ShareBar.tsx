import { useEffect, useState } from "react";
import styled from "styled-components";

/* =========================================================
   SHARE BAR
   Uses the device share sheet where supported, plus direct
   links for the networks the community uses most.
========================================================= */

interface ShareBarProps {
  title: string;
  url: string;
}

const ShareBar = ({ title, url }: ShareBarProps) => {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  useEffect(() => {
    if (copyState === "idle") return;

    const timer = window.setTimeout(() => setCopyState("idle"), 2500);

    return () => window.clearTimeout(timer);
  }, [copyState]);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      /* The user closed the share sheet. */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <Bar aria-label="Share this article">
      <Label>Share this article</Label>

      <Actions>
        {canNativeShare && (
          <ShareButton type="button" onClick={nativeShare}>
            Share…
          </ShareButton>
        )}

        {links.map((link) => (
          <ShareButton
            key={link.label}
            as="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </ShareButton>
        ))}

        <ShareButton type="button" onClick={copyLink}>
          {copyState === "copied" ? "Link copied" : "Copy link"}
        </ShareButton>
      </Actions>

      <Status role="status">
        {copyState === "failed" &&
          "Copying isn't available here. Copy the address from your browser instead."}
      </Status>
    </Bar>
  );
};

export default ShareBar;

const Bar = styled.section`
  display: grid;
  gap: 14px;

  padding-top: 28px;

  border-top: 1px solid rgba(77, 48, 108, 0.12);
`;

const Label = styled.h2`
  color: ${({ theme }) => theme.colors.textMuted};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ShareButton = styled.button`
  display: inline-flex;
  align-items: center;

  min-height: 40px;

  padding: 0 16px;

  border: 1px solid rgba(91, 33, 182, 0.18);
  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 14px;
  font-weight: 500;

  &:hover {
    border-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Status = styled.p`
  min-height: 1em;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 14px;
`;
