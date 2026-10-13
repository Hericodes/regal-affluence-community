import styled, { css } from "styled-components";

import { buttonBase } from "../News/News.styles";

/* =========================================================
   NEWSROOM — SHARED STYLES
   Same tokens as the public site, tuned for density and
   quick scanning rather than editorial presentation.
========================================================= */

export const Page = styled.div`
  display: grid;
  gap: 28px;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`;

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -0.02em;
`;

export const PageIntro = styled.p`
  margin-top: 6px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 15px;
`;

export const Panel = styled.section`
  border: 1px solid rgba(77, 48, 108, 0.1);
  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.white};
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 18px 22px;

  border-bottom: 1px solid rgba(77, 48, 108, 0.08);

  h2 {
    color: ${({ theme }) => theme.colors.purpleDeep};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    font-weight: 700;
  }
`;

export const PanelBody = styled.div`
  padding: 22px;
`;

/* =========================================================
   BUTTONS
========================================================= */

const small = css`
  min-height: 38px;
  padding: 0 16px;

  font-size: 14px;
`;

export const Button = styled.button<{
  $variant?: "primary" | "secondary" | "danger" | "ghost";
  $size?: "sm" | "md";
}>`
  ${buttonBase}

  ${({ $size }) => $size === "sm" && small}

  ${({ $variant = "secondary", theme }) => {
    switch ($variant) {
      case "primary":
        return css`
          background: ${theme.colors.purple};
          color: ${theme.colors.white};

          &:hover:not(:disabled) {
            background: ${theme.colors.purpleDark};
          }
        `;
      case "danger":
        return css`
          background: ${theme.colors.error};
          color: ${theme.colors.white};

          &:hover:not(:disabled) {
            background: #a5301f;
          }
        `;
      case "ghost":
        return css`
          color: ${theme.colors.purple};

          &:hover:not(:disabled) {
            background: rgba(91, 33, 182, 0.06);
          }
        `;
      default:
        return css`
          border: 1px solid rgba(91, 33, 182, 0.24);

          background: ${theme.colors.white};
          color: ${theme.colors.purpleDeep};

          &:hover:not(:disabled) {
            border-color: ${theme.colors.purple};
          }
        `;
    }
  }}
`;

/* =========================================================
   FORMS
========================================================= */

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.purpleDeep};

  font-size: 14px;
  font-weight: 600;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const control = css<{ $invalid?: boolean }>`
  width: 100%;

  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.error : "rgba(77, 48, 108, 0.2)"};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.purple};

    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.12);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.ivory};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Input = styled.input<{ $invalid?: boolean }>`
  ${control}

  height: 46px;

  padding: 0 14px;
`;

export const Textarea = styled.textarea<{ $invalid?: boolean }>`
  ${control}

  min-height: 96px;

  padding: 12px 14px;

  line-height: 1.6;
`;

export const Select = styled.select<{ $invalid?: boolean }>`
  ${control}

  height: 46px;

  padding: 0 12px;
`;

export const Hint = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 13px;
  line-height: 1.5;
`;

export const FieldError = styled.p`
  color: ${({ theme }) => theme.colors.error};

  font-size: 13px;
  font-weight: 500;
`;

export const CharCount = styled.span<{ $over?: boolean }>`
  color: ${({ $over, theme }) =>
    $over ? theme.colors.error : theme.colors.textMuted};

  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  cursor: pointer;

  input {
    width: 18px;
    height: 18px;

    margin-top: 3px;

    accent-color: ${({ theme }) => theme.colors.purple};
  }
`;

export const Alert = styled.div<{ $tone?: "error" | "info" | "success" }>`
  padding: 14px 16px;

  border: 1px solid
    ${({ $tone = "error" }) =>
      $tone === "error"
        ? "rgba(192, 57, 43, 0.3)"
        : $tone === "success"
          ? "rgba(25, 135, 84, 0.3)"
          : "rgba(91, 33, 182, 0.2)"};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ $tone = "error" }) =>
    $tone === "error"
      ? "rgba(192, 57, 43, 0.06)"
      : $tone === "success"
        ? "rgba(25, 135, 84, 0.06)"
        : "rgba(91, 33, 182, 0.05)"};

  color: ${({ $tone = "error", theme }) =>
    $tone === "error"
      ? theme.colors.error
      : $tone === "success"
        ? theme.colors.success
        : theme.colors.purpleDeep};

  font-size: 14px;
  line-height: 1.55;
`;
