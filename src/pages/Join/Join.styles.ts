import styled from "styled-components";

/* ========================================
   SECTION
======================================== */

export const Section = styled.section`
  width: 100%;
  min-height: 100svh;

  padding: 150px 0 100px;

  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    padding: 120px 0 80px;
  }

  @media (max-width: 480px) {
    padding: 105px 0 64px;
  }
`;

/* ========================================
   CONTAINER
======================================== */

export const Container = styled.div`
  width: min(100% - 48px, 1120px);

  margin: 0 auto;

  @media (max-width: 768px) {
    width: min(100% - 32px, 1120px);
  }
`;

/* ========================================
   HEADER
======================================== */

export const Header = styled.header`
  max-width: 820px;

  margin-bottom: 64px;

  @media (max-width: 768px) {
    margin-bottom: 48px;
  }
`;

/* ========================================
   EYEBROW
======================================== */

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 22px;

  color: ${({ theme }) => theme.colors.purple};

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  line-height: 1.4;
  text-transform: uppercase;

  &::before {
    content: "";

    width: 34px;
    height: 1px;

    flex-shrink: 0;

    background: ${({ theme }) => theme.colors.champagne};
  }

  @media (max-width: 768px) {
    margin-bottom: 18px;

    font-size: 10px;
    letter-spacing: 0.16em;
  }
`;

/* ========================================
   HEADING
======================================== */

export const Heading = styled.h1`
  max-width: 900px;

  color: ${({ theme }) => theme.colors.text};

  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.2rem, 6.5vw, 6rem);
  font-weight: 500;
  line-height: 0.96;
  letter-spacing: -0.045em;

  span {
    color: ${({ theme }) => theme.colors.purple};
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: clamp(2.8rem, 12vw, 4.8rem);
    line-height: 0.98;
  }

  @media (max-width: 480px) {
    font-size: clamp(2.55rem, 12vw, 4rem);
  }
`;

/* ========================================
   DESCRIPTION
======================================== */

export const Description = styled.p`
  max-width: 720px;

  margin-top: 28px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 17px;
  line-height: 1.8;

  @media (max-width: 768px) {
    margin-top: 22px;

    font-size: 15px;
    line-height: 1.7;
  }
`;

/* ========================================
   FORM
======================================== */

export const Form = styled.form`
  width: 100%;

  padding: 52px;

  background: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 768px) {
    padding: 36px 28px;
  }

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

/* ========================================
   FORM GRID
======================================== */

export const FormGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 28px 24px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;

    gap: 24px;
  }
`;

/* ========================================
   FULL WIDTH
======================================== */

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

/* ========================================
   FIELD GROUP
======================================== */

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 9px;
`;

/* ========================================
   LABEL
======================================== */

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

/* ========================================
   REQUIRED
======================================== */

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.purple};
`;

/* ========================================
   INPUT
======================================== */

export const Input = styled.input`
  width: 100%;
  min-height: 52px;

  padding: 0 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  outline: none;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.65;
  }

  &:hover {
    border-color: rgba(91, 33, 182, 0.3);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.purple};

    background: ${({ theme }) => theme.colors.white};

    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.08);
  }
`;

/* ========================================
   SELECT
======================================== */

export const Select = styled.select`
  width: 100%;
  min-height: 52px;

  padding: 0 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;

  outline: none;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(91, 33, 182, 0.3);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.purple};

    background: ${({ theme }) => theme.colors.white};

    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.08);
  }
`;

/* ========================================
   TEXTAREA
======================================== */

export const Textarea = styled.textarea`
  width: 100%;

  min-height: 140px;

  padding: 15px 16px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.ivory};
  color: ${({ theme }) => theme.colors.text};

  font-size: 15px;
  line-height: 1.65;

  outline: none;

  resize: vertical;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.65;
  }

  &:hover {
    border-color: rgba(91, 33, 182, 0.3);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.purple};

    background: ${({ theme }) => theme.colors.white};

    box-shadow: 0 0 0 3px rgba(91, 33, 182, 0.08);
  }
`;

/* ========================================
   NOTE
======================================== */

export const Note = styled.p`
  max-width: 700px;

  margin-top: 32px;

  color: ${({ theme }) => theme.colors.textMuted};

  font-size: 12px;
  line-height: 1.7;
`;

/* ========================================
   SUBMIT BUTTON
======================================== */

export const SubmitButton = styled.button`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 12px;

  min-height: 56px;

  margin-top: 24px;

  padding: 0 28px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.purple};

  color: ${({ theme }) => theme.colors.white};

  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  text-decoration: none;

  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);

    background: ${({ theme }) => theme.colors.purpleDark};

    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.champagne};

    outline-offset: 4px;
  }

  &:disabled {
    opacity: 0.65;

    cursor: not-allowed;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

/* ========================================
   SUBMIT ARROW
======================================== */

export const SubmitArrow = styled.span`
  font-size: 18px;

  line-height: 1;
`;

/* ========================================
   ERROR
======================================== */

export const ErrorMessage = styled.p`
  margin-top: 24px;

  padding: 14px 16px;

  border: 1px solid rgba(192, 57, 43, 0.2);
  border-radius: ${({ theme }) => theme.radius.sm};

  background: rgba(192, 57, 43, 0.06);

  color: ${({ theme }) => theme.colors.error};

  font-size: 13px;
  line-height: 1.5;
`;

/* ========================================
   SUCCESS
======================================== */

export const SuccessMessage = styled.div`
  max-width: 760px;

  margin: 0 auto;

  padding: 80px 0;

  text-align: center;

  animation: successIn 0.6s ease both;

  @keyframes successIn {
    from {
      opacity: 0;
      transform: translateY(18px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${Eyebrow} {
    justify-content: center;
  }

  ${Description} {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;