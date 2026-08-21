const theme = {
  colors: {
    // Brand
    purple: "#5B21B6",
    purpleDark: "#32105F",
    purpleDeep: "#1E0A3C",
    purpleSoft: "#7C3AED",

    champagne: "#C9A96E",
    champagneLight: "#E4D2A8",

    // Backgrounds
    ivory: "#FAF8F3",
    cream: "#F3EDE2",
    white: "#FFFFFF",

    // Text
    black: "#17151A",
    text: "#262229",
    textMuted: "#706B73",
    textLight: "#A09AA3",

    // UI
    border: "rgba(23, 21, 26, 0.10)",
    borderLight: "rgba(23, 21, 26, 0.06)",
    overlay: "rgba(23, 21, 26, 0.45)",

    // Status
    success: "#198754",
    error: "#C0392B",
  },

  fonts: {
    display: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.75rem",
    "5xl": "3.5rem",
    "6xl": "4.5rem",
  },

  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
  },

  radius: {
    sm: "8px",
    md: "14px",
    lg: "24px",
    xl: "32px",
    pill: "999px",
  },

  shadows: {
    none: "none",
    soft: "0 10px 40px rgba(23, 21, 26, 0.08)",
    medium: "0 20px 60px rgba(23, 21, 26, 0.12)",
    strong: "0 24px 80px rgba(23, 21, 26, 0.16)",
  },

  container: {
    maxWidth: "1320px",
    padding: "24px",
    paddingMobile: "16px",
  },

  transitions: {
    fast: "0.2s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1440px",
  },
};

export default theme;