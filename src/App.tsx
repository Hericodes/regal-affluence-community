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

/* ========================================
   HOME PAGE
======================================== */

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

/* ========================================
   APP
======================================== */

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <BrowserRouter basename="/regal-affluence-community">
        <Routes>

          {/* ========================================
              HOME
          ======================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* ========================================
              JOIN
          ======================================== */}

          <Route
            path="/join"
            element={
              <>
                <Navbar />

                <main>
                  <Join />
                </main>
              </>
            }
          />

          {/* ========================================
              BENEFITS / WHY JOIN
          ======================================== */}

          <Route
            path="/benefits"
            element={
              <>
                <Navbar />

                <main>
                  <Benefits />
                </main>

                <Footer />
              </>
            }
          />

          {/* ========================================
              HOW IT WORKS
          ======================================== */}

          <Route
            path="/how-it-works"
            element={
              <>
                <Navbar />

                <main>
                  <HowItWorks />
                </main>

                <Footer />
              </>
            }
          />

          {/* ========================================
              WHO IT'S FOR
          ======================================== */}

          <Route
            path="/who-its-for"
            element={
              <>
                <Navbar />

                <main>
                  <WhoItsFor />
                </main>

                <Footer />
              </>
            }
          />

          {/* ========================================
              PRIVACY POLICY
          ======================================== */}

          <Route
            path="/privacy"
            element={
              <>
                <Navbar />

                <main>
                  <Privacy />
                </main>

                <Footer />
              </>
            }
          />

          {/* ========================================
              TERMS & CONDITIONS
          ======================================== */}

          <Route
            path="/terms"
            element={
              <>
                <Navbar />

                <main>
                  <Terms />
                </main>

                <Footer />
              </>
            }
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;