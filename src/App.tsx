import { ThemeProvider } from "styled-components";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Benefits from "./components/Benefits/Benefits";
import Community from "./components/Community/Community";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import WhoItsFor from "./components/WhoItsFor/WhoItsFor";
import Footer from "./components/Footer/Footer";

import Join from "./pages/Join/Join";
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
        <Benefits />
        <Community />
        <HowItWorks />
        <WhoItsFor />
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

      <BrowserRouter>
        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* JOIN */}

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

          {/* PRIVACY POLICY */}

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

          {/* TERMS & CONDITIONS */}

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