# 🛡️ Flight Guardian: Development Journal

A running log of what shipped, what broke, and what we learned. Newest entries at the top.

---

## 📝 2026-04-19 — Glass UI & Smarter Product Demo

**Shipped**
- Site-wide glass/gloss system (`.glass-card`, `.glass-button`, `.glass-input`) in `app/app.css`. Layered backdrop-blur + saturate + inset highlight + `::before` sheen + `::after` shimmer sweep on hover.
- ProductDemo now cycles through 3 real routes (London→NYC, Manchester→Dubai, Edinburgh→Tokyo) with a per-field typewriter effect and blinking caret.
- Stage timings slowed (`[7200, 5400, 4800, 6200]` ms) so the sequence reads instead of flashing by.
- Applied glass treatment to every surface: hero, bento grid, before/after comparison, FAQ, search/dashboard/track routes, navbar, auth pages.
- Deployed to production: [discount-flight-tracker.vercel.app](https://discount-flight-tracker.vercel.app).

**Lessons**
- **Mobile blur costs paint.** Dropped blur radius under 768px and gated shimmer sweep behind `prefers-reduced-motion` — keeps it premium without killing low-end devices.
- **Key on index+stage.** `key={`${routeIndex}-${stage}`}` cleanly remounts the scene subtree so the fade-in animation replays for every route rotation without manual resets.
- **Glass needs something behind it.** `.glass-card-soft` (no backdrop-blur) is the fallback for sections that sit on plain white — real blur only earns its cost when there's color underneath.

---

## 📝 2026-04-18 — Product Demo, Bento & Before/After

**Shipped**
- Auto-playing "Watch it work" demo replacing stats strip (commit `73e1c64`).
- Bento "why you'll love it" grid with real destination photography (commit `62acd47`).
- Before/after comparison card replacing the fake-testimonial section (commit `8b892e1`).
- Favicon + meta tags (plane SVG, OG tags) so the link previews correctly (commit `92874ab`).

**Lessons**
- **Real photos > gradients for travel UI.** The destination cards felt generic until we swapped to actual imagery — the page stopped looking like a template.
- **Fake testimonials are a tell.** Replaced them with a concrete before/after story (manual price-checking vs. set-and-forget) — more honest and more convincing.

---

## 📝 2026-04-17 — Track Flow & Landing Page Animation

**Shipped**
- Full tracking flow: `/track/:id` form → `/track/confirm?id=` success screen (commit `3f66179`).
- Working search filter over an expanded dummy catalog (commit `a6b6c40`).
- Friendly, traveler-focused copy replacing the "radar terminal" aesthetic (commit `609e16f`).

**Lessons**
- **Tone matters more than features.** Rewriting copy from "precision tracking" to "we'll email you when the price drops" doubled the perceived clarity without a single product change.
- **Dummy catalogs need variety.** A search bar that only returns 3 routes looks broken — we expanded the fixture set to ~20 so filtering actually feels alive.

---

## 📝 2026-04-14 — Auth, Routing & Deploy Foundations

**Shipped**
- Navigation bar with dynamic auth states via Clerk (`<SignedIn>` / `<SignedOut>` + modal triggers).
- Migrated to React Router 7 with SSR middleware and `rootAuthLoader`.
- Connected Convex (DB) and Clerk (Auth) via Vercel environment variables.

**Lessons (the hard way)**

### The RR7 "handshake"
`clerkMiddleware` must be enabled in `react-router.config.ts` via `future.v7_middleware: true`. Without it, `rootAuthLoader` can't inject auth state into the frontend — you get silent "Oops!" 500s.

### SSR auth is a server-to-server dance
`loaderData` must be passed into `<ClerkProvider loaderData={loaderData}>` or hydration desyncs and you get "missing clerkState" errors.

### Vercel env prefixes
- `VITE_` — frontend-visible (publishable key).
- No prefix — backend-only (secret key).
- Vercel needs **both** defined to satisfy build-time and run-time environments.

### Explicit route mapping
Once `app/routes.ts` exists, file-based routing is ignored. Every new view must be registered manually or it falls into the catch-all `$.tsx` ("Signal Lost") page.

---

## 🎯 Next Up
- **Phase 1 — Real prices.** Wire Amadeus (or equivalent) to replace the dummy flight catalog. Blocked on API credentials.
- **Phase 2 — Resend alerts.** Email the user when `currentPrice <= targetPrice`. Convex scheduled action polling every N hours.
- **Phase 3 — User-tied tracked flights.** Move `addTrackedFlight` from localStorage to Convex, keyed by Clerk `userId`.
