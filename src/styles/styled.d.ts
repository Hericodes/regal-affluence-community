import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // Brand
      purple: string;
      purpleDark: string;
      purpleDeep: string;
      purpleSoft: string;

      champagne: string;
      champagneLight: string;

      // Backgrounds
      ivory: string;
      cream: string;
      white: string;

      // Text
      black: string;
      text: string;
      textMuted: string;
      textLight: string;

      // UI
      border: string;
      borderLight: string;
      overlay: string;

      // Status
      success: string;
      error: string;
    };

    fonts: {
      display: string;
      body: string;
    };

    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
      "6xl": string;
    };

    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };

    radius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      pill: string;
    };

    shadows: {
      none: string;
      soft: string;
      medium: string;
      strong: string;
    };

    container: {
      maxWidth: string;
      padding: string;
      paddingMobile: string;
    };

    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };

    breakpoints: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
      wide: string;
    };
  }
}