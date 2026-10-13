# News & Updates CMS — setup guide

Public pages: `/news` and `/news/:slug`. Private newsroom: `/admin` (passcode only).

The website stays on GitHub Pages. News content, images and the newsroom
sign-in run on **Supabase**. Setup takes about 15 minutes in the Supabase and
GitHub dashboards. You don't need the Supabase CLI, and you don't need to edit
any code.

---

## ✅ Part A — Already done in the repository

- [x] Public News & Updates pages, newsroom dashboard and article editor.
- [x] **`supabase/setup.sql`**: the complete database setup in one file:
      tables, security rules, image storage, passcode storage, and rate limiting.
      It is safe to run more than once and never deletes news content.
- [x] **`supabase/functions/newsroom-auth/index.ts`**: the sign-in Edge
      Function, as a single file you can paste into the dashboard. It needs **no
      secrets** from you: Supabase supplies its keys automatically.
- [x] **The hidden newsroom account creates itself** on the first successful
      sign-in and adds itself to the editor list. You don't create any user or
      password.
- [x] The deploy workflow (`.github/workflows/deploy.yml`) runs the tests and
      passes your two public Supabase settings into the website build.
- [x] **`npm run newsroom:verify`**: checks the live setup for you (Part C).
- [x] Automated tests: database permissions, passcode checking, rate limits,
      sign-out revocation, and the Edge Function. They run in CI on every push.

---

## 🔧 Part B — Steps you need to do (your accounts, your approval)

Never paste passwords or keys into chat, issues, or the repository. Everything
below goes only into the Supabase dashboard, GitHub settings, or your own
`.env.local` file.

### Step 1 — Create the Supabase project (skip if you already have one)

1. Open <https://supabase.com/dashboard> → **New project**.
2. Choose a name (e.g. `regal-affluence`), a strong database password (store
   it in your password manager), and the region closest to your visitors.
3. Wait until the project finishes setting up.

### Step 2 — Turn off public sign-ups

1. In your project: **Authentication → Sign In / Providers**.
2. Under **User Signups**, switch **Allow new users to sign up** to **off**. Save.
3. Leave the **Email** provider **enabled**. The newsroom uses it internally
   to start sessions. No emails are sent.

### Step 3 — Create the database (one paste)

1. **SQL Editor → New query**.
2. Open `supabase/setup.sql` from this repository, copy **all** of it, and
   paste it into the editor.
3. Click **Run**. You should see "Success. No rows returned".

### Step 4 — Set the passcode

1. Choose a passcode. For the live site use a passphrase of 4–5 random words
   that you make up yourself. Don't reuse any example from documentation, and
   never write the real passcode in this repository, an issue, or a chat.
2. **SQL Editor → New query**, paste this, replace the placeholder with your
   passcode (keep the single quotes), and click **Run**:

   ```sql
   select public.newsroom_set_passcode('your passcode here');
   ```

3. The result explains what happened. A passcode shorter than 12 characters is
   accepted but flagged as suitable for testing only.
4. Close that query tab without saving it, so the passcode isn't kept in a
   saved snippet. (Only people with access to your Supabase dashboard could see
   it anyway.)

Running it again with a new passcode replaces the old one and immediately signs
out every open newsroom session.

The passcode is stored only as a bcrypt hash, in a table that no website
visitor or API key can read.

### Step 5 — Deploy the sign-in function

1. **Edge Functions → Deploy a new function → Via Editor**.
2. Function name: **`newsroom-auth`** (exactly this).
3. Delete the example code. Open
   `supabase/functions/newsroom-auth/index.ts` from this repository, copy all of
   it, and paste it in.
4. Click **Deploy function**.
5. Open the function's **Details** (or **Settings**) tab. Turn **off** the
   option **Verify JWT** ("Enforce JWT verification" / "Verify JWT with legacy
   secret"), and save. This is the sign-in endpoint, so callers don't have a
   token yet; the function checks every request itself.

No secrets need to be added. (Optional: `NEWSROOM_ALLOWED_ORIGINS` under
**Edge Functions → Secrets**, a comma-separated list, if the site ever moves
to another domain. The defaults are `https://www.regalaffluence.com`,
`https://regalaffluence.com`, `https://hericodes.github.io` and
`http://localhost:5173`.)

### Step 6 — Connect the website to Supabase

You need two **public** values from **Project Settings → API Keys**. The
project URL is on **Project Settings → Data API**, or on the project home page
under **Connect**.

| Name                     | Value                                                           |
| ------------------------ | --------------------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Project URL, e.g. `https://abcdefgh.supabase.co`                |
| `VITE_SUPABASE_ANON_KEY` | The **anon / public** key (or the **Publishable** key)          |

⚠️ Never use the **service_role** or **secret** key here. Anything prefixed
`VITE_` becomes part of the public website.

**a) GitHub (for the live site)**
1. Open <https://github.com/Hericodes/regal-affluence-community/settings/variables/actions>
   (**Settings → Secrets and variables → Actions → Variables** tab).
2. **New repository variable** → Name `VITE_SUPABASE_URL` → Value → **Add variable**.
3. Repeat for `VITE_SUPABASE_ANON_KEY`.

**b) Your computer (for testing and `npm run newsroom:verify`)**
1. Copy `.env.example` to a new file named `.env.local` in the project folder.
2. Fill in the same two values. `.env.local` is git-ignored and never committed.

### Step 7 — Publish the website update

The site rebuilds when changes are pushed to `main`, or when you run the
workflow by hand: **GitHub → Actions → "Deploy Regal Affluence to GitHub Pages"
→ Run workflow**. (The newsroom code must be committed and pushed first; tell
me when you want that done.)

---

## 🧪 Part C — Live testing (after Part B)

### 1. Automatic checks (2 minutes)

In the project folder:

```bash
npm run newsroom:verify
```

This only reads. It checks that the database is set up, visitors can't see
drafts or private columns, visitors can't create posts, check passcodes, read
settings or upload images, and the Edge Function is deployed and refuses
other websites.

Then the full sign-in test:

```bash
npm run newsroom:verify:full
```

You type the passcode at a hidden prompt. The script:
- makes **one** deliberately wrong attempt (1 of the 5 allowed per 15 minutes)
- signs in and confirms it gets a short-lived session with no refresh token
- **if you answer `y`**, creates a temporary draft, confirms visitors can't
  see it, then deletes it
- signs out and confirms the old session token stops working immediately

### 2. In the browser

- [ ] Open `https://www.regalaffluence.com/admin`. You see the passcode screen and no email field.
- [ ] A wrong passcode shows "That passcode is incorrect."
- [ ] The right passcode opens the dashboard.
- [ ] Create a draft, then open `/news/<its-slug>` in a private window: "Article not found".
- [ ] Publish it: it appears on `/news`.
- [ ] Upload a cover image: the preview shows and the published article displays it.
- [ ] Schedule a post a few minutes ahead: it appears on `/news` only after that time.
- [ ] **Sign out**: you're back at the passcode screen.
- [ ] The member login (`/login`) and the rest of the site work as before.

The live sign-in and security are only verified once these checks pass on
the real project.

### Troubleshooting

| Check that fails / symptom                                  | Fix                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------- |
| "Database setup applied" fails                              | Run Step 3 again; make sure the **whole** `setup.sql` was pasted.   |
| "Edge Function deployed" fails                              | Step 5: check the name is exactly `newsroom-auth` and it deployed.  |
| "refuses other websites" fails with HTTP 401                | Step 5.5: turn **off** Verify JWT for `newsroom-auth`.              |
| Newsroom says "passcode has not been set yet"               | Step 4.                                                             |
| Newsroom says "The newsroom is unavailable right now"       | Supabase → Edge Functions → `newsroom-auth` → **Logs** shows why.   |
| "Too many incorrect attempts"                               | Wait 15 minutes, or run `delete from public.newsroom_login_attempts;` in the SQL Editor. |
| News page says "unavailable"                                | Step 6a variables, then rebuild (Step 7).                           |

---

## Everyday tasks

**Change the passcode:** SQL Editor → `select public.newsroom_set_passcode('new passphrase here');` → Run.
Everyone currently signed in is signed out.

**Unlock after too many attempts:** SQL Editor → `delete from public.newsroom_login_attempts;`

**Shorter or longer sessions:** sessions last as long as the project's
access-token lifetime, 1 hour by default. You'll find it under **Project
Settings → JWT Keys** (or **Authentication → Sessions**) → access token expiry.

**Don't delete** the user `newsroom-service@regalaffluence.com` under
Authentication → Users. It's the newsroom's hidden account. If it is deleted,
it is recreated automatically on the next sign-in.

---

## How the security works

1. The manager enters the passcode at `/admin`. The website sends it to the
   **`newsroom-auth` Edge Function**. The website never checks or stores the passcode.
2. The function asks the database (`newsroom_attempt_login`) to check it. In
   one locked step the database:
   - applies **rate limits**: 5 wrong attempts per IP address per 15 minutes,
     and 50 per 15 minutes in total (stops attackers who rotate IP addresses)
   - records the attempt
   - compares the passcode with its **bcrypt hash**

   Only the Edge Function's server-side key can call this.
3. If it matches, the function starts a session for the hidden newsroom account
   and returns **only the 1-hour access token**. The refresh token stays on the
   server, so the session can't be extended.
4. Every newsroom request carries that token. The database's Row-Level
   Security accepts it only if the account is a newsroom editor **and its
   session still exists**. Signing out deletes the session, so the token stops
   working immediately. When the hour is up, the passcode is needed again;
   unsaved editor work is kept while it's re-entered.
5. Visitors, and any request without a valid token, can only read published
   articles whose publication time has passed. Drafts, scheduled and archived
   articles stay private, including by direct URL.

Keys: the website contains only the public URL and anon/publishable key. The
service-role key exists only inside the Edge Function, where Supabase injects it.

## How publishing works

| Saved state                              | Shown as  | Public?                    |
| ---------------------------------------- | --------- | -------------------------- |
| `draft`                                  | Draft     | No                         |
| `published`, `published_at` in the past  | Published | Yes                        |
| `published`, `published_at` in future    | Scheduled | Automatically at that time |
| `archived`                               | Archived  | No                         |

Scheduling needs no cron job: visitors only ever receive posts with
`published_at <= now()`. Article HTML is sanitised when saved and again when shown.

## For developers

```bash
npm install
npm run dev                       # local site (uses .env.local)
npm test                          # unit, Edge Function and database tests
npm run lint
npm run build
npm run newsroom:build-setup      # regenerate supabase/setup.sql after editing a migration
npm run newsroom:verify           # live checks, read-only
npm run newsroom:verify:full      # live checks including passcode sign-in
```

`supabase/setup.sql` is generated from `supabase/migrations/`. A test fails if
it is out of date. CLI users can apply the migrations with `supabase db push`
and deploy with `supabase functions deploy newsroom-auth --no-verify-jwt`.

## Known limitations

- **One shared passcode:** anyone who knows it has full newsroom access, and
  changes aren't attributed to a person. Change it when someone leaves.
- **Global lockout:** an attacker can deliberately lock the newsroom for up to
  15 minutes (see "Unlock" above).
- **Token in the browser tab:** the 1-hour token is kept in `sessionStorage`. A
  static site can't use httpOnly cookies. Article HTML sanitisation and short
  sessions limit the risk.
- **Social previews:** WhatsApp, Facebook, X and LinkedIn show the site-wide
  preview rather than each article's own title and image. That's because the
  site is built in the browser.
- **GitHub Pages deep links** are served through `404.html`. Visitors are
  unaffected, but search engines see a 404 status for article URLs.
- **Images:** replaced images aren't deleted from storage automatically.
