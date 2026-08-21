import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

  /* ========================================
     ROOT
  ======================================== */

  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  /* ========================================
     RESET
  ======================================== */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 84px;
  }

  body {
    margin: 0;
    padding: 0;

    min-width: 320px;

    background: ${({ theme }) => theme.colors.ivory};
    color: ${({ theme }) => theme.colors.text};

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.6;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-x: hidden;
  }

  /* ========================================
     TYPOGRAPHY
  ======================================== */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;

    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    line-height: 1.1;

    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* ========================================
     FORM ELEMENTS
  ======================================== */

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    margin: 0;
    padding: 0;

    border: 0;

    background: transparent;

    cursor: pointer;
  }

  input,
  textarea,
  select {
    margin: 0;
  }

  textarea {
    resize: vertical;
  }

  /* ========================================
     MEDIA
  ======================================== */

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  img {
    height: auto;
  }

  /* ========================================
     LISTS
  ======================================== */

  ul,
  ol {
    margin: 0;
    padding: 0;

    list-style: none;
  }

  /* ========================================
     ACCESSIBILITY
  ======================================== */

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.champagne};
    outline-offset: 3px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }

  /* ========================================
     MOBILE
  ======================================== */

  @media (max-width: 768px) {
    html {
      scroll-padding-top: 72px;
    }

    body {
      font-size: 15px;
    }
  }

  /* ========================================
     REDUCED MOTION
  ======================================== */

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;