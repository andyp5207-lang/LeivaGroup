# Leiva Group — Property Management Website

A Next.js (App Router) implementation of the Leiva Group marketing site and
admin panel, built from the `Leiva Group.dc.html` Claude Design prototype.

Public pages: Home, Services, Rentals (+ detail pages with a photo
lightbox), About, Reviews, Contact. A booking calendar lets visitors pick
an open date/time and request an appointment. `/admin` is a login-gated
panel for creating/editing rental listings (with photo uploads) and
viewing appointment requests.

## Stack

- **Next.js 16** (App Router, TypeScript, Server Actions)
- **Prisma + Postgres** for data (rentals, rental photos, appointments)
- **Resend** for email notifications when someone books an appointment
  (optional — the site works without it, see below)
- Plain CSS (`app/globals.css`) carrying the design tokens ported from the
  original prototype — no CSS framework

## Local development

Requires Node 20+ and a Postgres database.

1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (a local or
   hosted Postgres connection string) and the other variables below.
3. `npx prisma migrate deploy` — creates the tables.
4. `npx prisma db seed` — adds 4 sample rental listings so the Rentals
   page isn't empty. Safe to skip; re-running is a no-op once any rental
   exists.
5. `npm run dev` and open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string. Any standard host works (Vercel Postgres, Neon, Supabase, Railway, RDS, self-hosted). |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Yes | Credentials for `/admin`. Change these before going live — see "Admin access" below. |
| `SESSION_SECRET` | Yes | Random string used to sign the admin session cookie. Generate one with `openssl rand -base64 32`. |
| `RESEND_API_KEY` | No | [Resend](https://resend.com) API key. When set, a booking triggers an email to `NOTIFY_EMAIL`. When unset, bookings still save to the database — the app just logs instead of emailing. |
| `NOTIFY_EMAIL` | No | Where booking notifications go. Defaults to `info.andyperez@gmail.com`. |

## Admin access

Default local credentials (from `.env`): `RayRay` / `IloveRemy3!` — the
same login used in the original prototype. **Change `ADMIN_PASSWORD`
before deploying** — it's a single shared operator login (no per-user
accounts, no roles), which matches the current design's scope. The
session is a signed, httpOnly cookie valid for 30 days; there's no
password-reset flow, so rotate `ADMIN_PASSWORD` directly in your hosting
provider's environment variables if it needs to change.

## Deploying (Vercel + hosted Postgres)

1. Push this repo to GitHub and import it in Vercel (or run `vercel`
   from this directory).
2. Provision a Postgres database — Vercel Postgres, [Neon](https://neon.tech),
   or [Supabase](https://supabase.com) all work with zero schema changes.
   Copy its connection string into `DATABASE_URL`.
3. Set the environment variables from the table above in the Vercel
   project settings.
4. On first deploy, run `npx prisma migrate deploy` against the
   production `DATABASE_URL` (via `vercel env pull` + a local run, or a
   one-off script/Vercel deploy hook) to create the tables, then
   optionally `npx prisma db seed`.
5. For email, sign up at resend.com, verify a sending domain (or use
   their `onboarding@resend.dev` sender for testing), and set
   `RESEND_API_KEY`.

No other setup is required — uploaded rental photos are stored inline in
the database as data URLs, so there's no separate object-storage service
to configure. If listing photo volume grows large, swap
`lib/actions/listings.ts` / `lib/file-to-data-url.ts` to upload to S3 or
Vercel Blob instead and store the resulting URL.

## Project structure

- `app/` — pages (App Router), grouped by route
- `app/admin/(authed)/` — the logged-in admin panel (route group so
  `/admin/login` doesn't inherit its tab-nav chrome)
- `components/` — shared UI (Header, Footer, booking calendar, rental
  photo gallery/lightbox, etc.)
- `lib/` — data access (`rentals.ts`, `prisma.ts`), business logic
  (`booking-logic.ts`), and Server Actions (`lib/actions/*`)
- `lib/session.ts` + `proxy.ts` — admin auth (signed cookie + route
  guard)
- `prisma/schema.prisma` — Rental, RentalPhoto, Appointment models
- `prisma/seed.ts` — sample rental listings

## What's out of scope

This implements the site as it exists in the final `Leiva Group.dc.html`
prototype: a public marketing/rentals site plus one shared admin login.
An earlier, larger request in that project's design history (separate
Owner/Tenant/Admin portals, invite-code accounts, maintenance ticketing,
financial dashboards) was explicitly walked back by the site owner mid-project
("get rid of the tenant and owner portal, just make the website a front
[end] for potential owners looking to buy our services") — none of that
is present here, matching the prototype's final state.
