import styled from "styled-components";

import type { DisplayStatus } from "../../news/types";
import { STATUS_LABELS } from "../../news/utils";

/* =========================================================
   STATUS BADGE
   Text label plus colour, so status never relies on
   colour alone.
========================================================= */

const TONES: Record<DisplayStatus, { fg: string; bg: string }> = {
  draft: { fg: "#5b5560", bg: "rgba(112, 107, 115, 0.12)" },
  scheduled: { fg: "#7a5a1e", bg: "rgba(201, 169, 110, 0.22)" },
  published: { fg: "#146c43", bg: "rgba(25, 135, 84, 0.12)" },
  archived: { fg: "#5B21B6", bg: "rgba(91, 33, 182, 0.08)" },
};

const StatusBadge = ({ status }: { status: DisplayStatus }) => (
  <Badge $status={status}>{STATUS_LABELS[status]}</Badge>
);

export default StatusBadge;

const Badge = styled.span<{ $status: DisplayStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 4px 10px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ $status }) => TONES[$status].bg};
  color: ${({ $status }) => TONES[$status].fg};

  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;

  &::before {
    content: "";

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: currentColor;
  }
`;
