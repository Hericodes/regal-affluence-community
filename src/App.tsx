import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  RouterProvider,
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
   MEMBER PAGES
===================================================== */

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RecoverUsername from "./pages/RecoverUsername";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

/* =====================================================
   NEWS & NEWSROOM (loaded on demand)
===================================================== */

const NewsList = lazy(() => import("./pages/News/NewsList"));
const NewsArticle = lazy(() => import("./pages/News/NewsArticle"));

const AdminLayout = lazy(() => import("./pages/Admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminPosts = lazy(() => import("./pages/Admin/AdminPosts"));
const AdminPostEditor = lazy(() => import("./pages/Admin/AdminPostEditor"));

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
   MEMBER LOGIN PAGE
===================================================== */

function LoginPage() {
  return <Login />;
}

/* =====================================================
   MEMBER PROFILE PAGE
===================================================== */

function ProfilePage() {
  return <Profile />;
}

/* =====================================================
   RECOVER USERNAME PAGE
===================================================== */

function RecoverUsernamePage() {
  return <RecoverUsername />;
}

/* =====================================================
   RESET PASSWORD PAGE
===================================================== */

function ResetPasswordPage() {
  return <ResetPassword />;
}

/* =====================================================
   NEWS PAGES
===================================================== */

function PublicShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <main>
        <Suspense fallback={<PageFallback />}>
          {children}
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

function PageFallback() {
  return <div style={{ minHeight: "100vh" }} aria-busy="true" />;
}

function NewsPage() {
  return (
    <PublicShell>
      <NewsList />
    </PublicShell>
  );
}

function NewsArticlePage() {
  return (
    <PublicShell>
      <NewsArticle />
    </PublicShell>
  );
}

/* =====================================================
   NEWSROOM (ADMIN) PAGES
===================================================== */

function withFallback(element: ReactNode) {
  return (
    <Suspense fallback={<PageFallback />}>
      {element}
    </Suspense>
  );
}

/* =====================================================
   NOT FOUND PAGE
===================================================== */

function NotFoundPage() {
  return (
    <PublicShell>
      <NotFound />
    </PublicShell>
  );
}

/* =====================================================
   ROUTER
===================================================== */

const router = createBrowserRouter(
  createRoutesFromElements(
        <>

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

          {/* =================================================
              MEMBER LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* =================================================
              MEMBER PROFILE
          ================================================= */}

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          {/* =================================================
              RECOVER USERNAME
          ================================================= */}

          <Route
            path="/recover-username"
            element={<RecoverUsernamePage />}
          />

          {/* =================================================
              RESET PASSWORD
          ================================================= */}

          <Route
            path="/reset-password"
            element={<ResetPasswordPage />}
          />

          {/* =================================================
              NEWS & UPDATES
          ================================================= */}

          <Route
            path="/news"
            element={<NewsPage />}
          />

          <Route
            path="/news/:slug"
            element={<NewsArticlePage />}
          />

          {/* =================================================
              NEWSROOM (ADMIN)
          ================================================= */}

          <Route
            path="/admin/login"
            element={<Navigate to="/admin" replace />}
          />

          <Route
            path="/admin"
            element={withFallback(<AdminLayout />)}
          >
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="posts"
              element={<AdminPosts />}
            />

            <Route
              path="posts/new"
              element={<AdminPostEditor />}
            />

            <Route
              path="posts/:id"
              element={<AdminPostEditor />}
            />
          </Route>

          {/* =================================================
              NOT FOUND
          ================================================= */}

          <Route
            path="*"
            element={<NotFoundPage />}
          />

        </>
  ),
  {
    basename: ROUTER_BASENAME,
  }
);

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;