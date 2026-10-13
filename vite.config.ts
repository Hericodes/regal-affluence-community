import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/*
 * GitHub Pages has no SPA rewrites, so a direct visit to a
 * deep link such as /news/my-article would 404. Serving the
 * app shell as 404.html lets the router handle those URLs.
 */
const spaFallback = (): Plugin => ({
  name: "spa-404-fallback",
  apply: "build",
  closeBundle() {
    const index = resolve("dist", "index.html");

    if (existsSync(index)) {
      copyFileSync(index, resolve("dist", "404.html"));
    }
  },
});

export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === "github";

  return {
    plugins: [react(), spaFallback()],

    base: isGitHubPages
      ? "/regal-affluence-community/"
      : "/",
  };
});
