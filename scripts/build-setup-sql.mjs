#!/usr/bin/env node
/* =========================================================
   Builds supabase/setup.sql — every migration in order, in
   one file, for pasting into the Supabase SQL Editor.

     npm run newsroom:build-setup

   A test fails if setup.sql is out of date.
========================================================= */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = join(root, "supabase", "migrations");
const target = join(root, "supabase", "setup.sql");

export const buildSetupSql = () => {
  const files = readdirSync(migrationsDir)
    .filter((name) => name.endsWith(".sql"))
    .sort();

  const header = `/* =========================================================
   REGAL AFFLUENCE — NEWSROOM SETUP (all-in-one)
   ---------------------------------------------------------
   GENERATED FILE — do not edit. Built from
   supabase/migrations by \`npm run newsroom:build-setup\`.

   Paste this whole file into Supabase → SQL Editor → New
   query, then click Run. It is safe to run again: it only
   creates what is missing and never deletes news content.
========================================================= */
`;

  const parts = files.map((name) => {
    const sql = readFileSync(join(migrationsDir, name), "utf8").replace(/\r\n/g, "\n").trim();
    return `\n-- ---------------------------------------------------------\n-- ${name}\n-- ---------------------------------------------------------\n\n${sql}\n`;
  });

  return header + parts.join("");
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  writeFileSync(target, buildSetupSql());
  console.log(`Wrote ${target}`);
}
