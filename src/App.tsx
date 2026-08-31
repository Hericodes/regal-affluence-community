import { ThemeProvider } from "styled-components";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

/* =====================================================
   COMPONENTS
===================================================== */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Community from "./components/Community";
import Footer from "./components/Footer";

/* =====================================================
   PAGES
===================================================== */

import About from "./components/About";
import Join from "./pages/Join/Join";
import Benefits from "./pages/Benefits";
import HowItWorks from "./pages/HowItWorks";
import WhoItsFor from "./pages/WhoItsFor";
import Team from "./pages/Team";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";

/* =====================================================
   ROUTER BASE
===================================================== */

/*
 * GitHub Pages:
 * /regal-affluence-community
 *
 * Cloudflare custom domain:
 * /
 *
 * vite.config.ts controls which
 * environment is being built.
 */

const ROUTER_BASENAME =
  import.meta.env.MODE === "github"
    ? "/regal-affluence-community"
    : "";

/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Community />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   ABOUT PAGE
===================================================== */

function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <About />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   JOIN PAGE
===================================================== */

function JoinPage() {
  return (
    <>
      <Navbar />

      <main>
        <Join />
      </main>
    </>
  );
}

/* =====================================================
   BENEFITS PAGE
===================================================== */

function BenefitsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Benefits />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   HOW IT WORKS PAGE
===================================================== */

function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <main>
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   WHO IT'S FOR PAGE
===================================================== */

function WhoItsForPage() {
  return (
    <>
      <Navbar />

      <main>
        <WhoItsFor />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   TEAM PAGE
===================================================== */

function TeamPage() {
  return (
    <>
      <Navbar />

      <main>
        <Team />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   PRIVACY PAGE
===================================================== */

function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main>
        <Privacy />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   TERMS PAGE
===================================================== */

function TermsPage() {
  return (
    <>
      <Navbar />

      <main>
        <Terms />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <BrowserRouter
        basename={ROUTER_BASENAME}
      >
        <Routes>

          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* =================================================
              ABOUT
          ================================================= */}

          <Route
            path="/about"
            element={<AboutPage />}
          />

          {/* =================================================
              JOIN
          ================================================= */}

          <Route
            path="/join"
            element={<JoinPage />}
          />

          {/* =================================================
              BENEFITS
          ================================================= */}

          <Route
            path="/benefits"
            element={<BenefitsPage />}
          />

          {/* =================================================
              HOW IT WORKS
          ================================================= */}

          <Route
            path="/how-it-works"
            element={<HowItWorksPage />}
          />

          {/* =================================================
              WHO IT'S FOR
          ================================================= */}

          <Route
            path="/who-its-for"
            element={<WhoItsForPage />}
          />

          {/* =================================================
              TEAM
          ================================================= */}

          <Route
            path="/team"
            element={<TeamPage />}
          />

          {/* =================================================
              PRIVACY
          ================================================= */}

          <Route
            path="/privacy"
            element={<PrivacyPage />}
          />

          {/* =================================================
              TERMS
          ================================================= */}

          <Route
            path="/terms"
            element={<TermsPage />}
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;