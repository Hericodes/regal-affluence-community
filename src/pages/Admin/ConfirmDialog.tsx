import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

import { Button } from "./Admin.styles";

/* =========================================================
   CONFIRM DIALOG
   Built on the native <dialog> element, which provides
   focus trapping, Escape to close, and a modal backdrop.
========================================================= */

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  tone?: "danger" | "primary";
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  children,
  confirmLabel,
  tone = "danger",
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <Dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onCancel();
      }}
    >
      <h2 id="confirm-title">{title}</h2>

      <Body>{children}</Body>

      <Actions>
        <Button type="button" onClick={onCancel} disabled={busy} autoFocus>
          Cancel
        </Button>

        <Button
          type="button"
          $variant={tone}
          onClick={onConfirm}
          disabled={busy}
          aria-busy={busy}
        >
          {busy ? "Working…" : confirmLabel}
        </Button>
      </Actions>
    </Dialog>
  );
};

export default ConfirmDialog;

const Dialog = styled.dialog`
  width: min(calc(100% - 32px), 460px);

  padding: 28px;

  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  box-shadow: ${({ theme }) => theme.shadows.strong};

  &::backdrop {
    background: rgba(30, 10, 60, 0.45);
  }

  h2 {
    color: ${({ theme }) => theme.colors.purpleDeep};

    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const Body = styled.div`
  margin-top: 12px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 15px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;

  margin-top: 24px;
`;
