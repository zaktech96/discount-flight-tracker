# 🛡️ Flight Guardian: Development Journal

A running log of what shipped, what broke, and what we learned. Newest entries at the top.

---

## 📝 2026-04-19 — Phase 2 Backend Migration, Dark Mode & Global Expansion

**Shipped**
- **Phase 2 Implementation:** Migrated alert tracking from `localStorage` to the Convex backend. Authenticated users now have persistent alerts saved directly to the database, enabling cross-device tracking and automated backend polling.
- **Cinematic Hero:** Added an infinite looping plane animation to the hero section background with a gentle motion trail, immediately establishing the "travel watchdog" theme.
- **Interactive Demo:** Overhauled the "Get the ping" demo scene with immersive destination-matching background imagery and a rewarding "Booked!" success state.
- **Cinematic Dark Mode:** Full visual overhaul for dark mode across all routes. Added `dark:` Tailwind variants to gradients, glass cards, and form inputs. Standardized on a deep slate/navy palette (#0F172A).
- **Global Expansion Pack:** Added 40+ high-fidelity destination cards covering Europe (Lisbon, Porto, Santorini, Reykjavik), the Americas (Toronto, Mexico City), South America (Lima, Bogota, Santiago, Montevideo), and Africa (Cairo, Tunis, Zanzibar, Nairobi).
- **Conveyor Belt 2.0:** Re-engineered the trending deals section with a 20x item duplication logic and a precise `-5%` translation loop for a mathematically perfect infinite scroll.
- **Premium Transitions:** Added coordinated Framer Motion entrance animations for the Home and Search pages, providing an "app-like" loading feel.

**Lessons**
- **Type Safety in Transitions:** Framer Motion's `Variants` type is surprisingly strict about the `transition` object structure. Moving transition parameters directly into component props is often cleaner than fighting the interface definition.
- **Dual-Source Dashboard:** Merging backend queries with local state requires careful memoization (`useMemo`) to prevent jitter when the database layer hydrates over the local storage fallback.
- **IATA Codes > City Names:** For a production flight tracker, city names are too ambiguous. Transitioning to 3-letter IATA codes (LHR, JFK) early in Phase 2 was critical for high-performance route matching in Convex.

---

## 📝 2026-04-19 — Convex Production Deployment & Dependency Resolution

**Shipped**
- Resolved local package/peer dependency conflicts by clearing `node_modules` and performing a clean `npm install --legacy-peer-deps`.
- Configured `VITE_CLERK_FRONTEND_API_URL` on the Convex production environment to resolve Clerk authentication schema validation errors.
- Successfully pushed schemas, generated TypeScript bindings, initialized table indexes, and deployed backend functions to production via `npx convex deploy --yes`.

**Lessons**
- **Dependency Conflicts:** The `@convex-dev/migrations` package had strict peer dependencies on `convex` versions, causing `npm install` and `bun install` to fail or leave the workspace in a broken state. `npm install --legacy-peer-deps` was necessary to force resolution and get the Convex CLI working correctly.
- **Convex + Clerk in Prod:** The Convex backend strictly requires `VITE_CLERK_FRONTEND_API_URL` to be present in its environment variables when using Clerk for authentication, otherwise the schema deployment will fail.

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
- **Phase 3 — Real-Time Polling (Crons):** Implement Convex scheduled actions to poll the Amadeus API every 4–6 hours for active routes.
- **Phase 4 — Automated Email Alerts:** Fully wire the Resend template to the alert-trigger logic to notify users the second their target price is hit.
- **Phase 1 (Active) — Live API Integration:** Finalize the Amadeus API provider implementation to replace dummy data with live global flight offers.
