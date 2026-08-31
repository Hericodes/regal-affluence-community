import { ThemeProvider } from "styled-components";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Community from "./components/Community";
import Footer from "./components/Footer";

import Join from "./pages/Join/Join";
import Benefits from "./pages/Benefits";
import HowItWorks from "./pages/HowItWorks";
import WhoItsFor from "./pages/WhoItsFor";
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
 * vite.config.ts controls the mode used
 * when building for each environment.
 */

const ROUTER_BASENAME =
  import.meta.env.MODE === "github"
    ? "/regal-affluence-community"
    : "";

/* =====================================================
   HOME
===================================================== */

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Community />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   JOIN
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
   BENEFITS
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
   HOW IT WORKS
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
   WHO IT'S FOR
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
   PRIVACY
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
   TERMS
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