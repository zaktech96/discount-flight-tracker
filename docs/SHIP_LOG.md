# Flight Guardian - Ship Log

Operational record of every surgical strike on the codebase. Each entry is
verified before merge - no exceptions.

---

## Standing Orders

1. **No commit without `npx tsc --noEmit` verification.** If types break, the
   commit does not ship. Pre-existing errors in `project-docs/` are excluded
   from this gate.

2. **Every UI change must adhere to the Terminal Minimalist aesthetic.**
   Charcoal (#1A1A1A) base, Signature Teal (#0F7A73) accents, JetBrains Mono
   for data, hyphen-minus (-) for all dashes, zero purple or blue gradients.

3. **Commits reference the Ship Log entry number.** Format: `[SL-XXX]` in the
   commit body when the change is non-trivial.

---

## Log

### SL-001 - 2026-04-14 - Initial UI Overhaul

**Scope:** `app/components/FlightHero.tsx`, `app/components/homepage/integrations.tsx`,
`app/routes/home.tsx`, `app/app.css`, `convex/schema.ts`, `convex/flights.ts`

**Summary:** Transitioned from generic purple/blue Kaizen gradients to
aero-minimalist charcoal/teal radar terminal. Replaced hero section with
Flight Guardian Command Center - 40px teal radar grid, JetBrains Mono for
IATA codes and prices, neon-green (#00FF41) price-drop indicators, live
price-anomaly feed. Added `flights` and `alerts` tables to Convex schema
with a placeholder action for SkyScanner/Amadeus integration.

**Verification:** `npx tsc --noEmit` - zero errors in `app/` and `convex/`.

---

### SL-002 - 2026-04-14 - Glass Terminal Refinement

**Scope:** `app/components/FlightHero.tsx`, `app/components/FlightSearch.tsx`,
`app/app.css`, `app/routes/home.tsx`, `docs/API_IMPLEMENTATION.md`

**Summary:** Refined hero to Glass Terminal spec - 20px white/5 grid, tight
kerning headlines (`tracking-[-0.03em]`), black+teal-border buttons with
300ms white hover and teal glow shadow. Created FlightSearch component with
backdrop-blur transparent cell inputs and radar-sweep pulsing empty state.
Purged all 12 instances of blue (#0071e3) and purple (#af52de) from theme -
replaced with teal across light and dark modes. Created API integration
documentation covering Amadeus/SkyScanner endpoints, 4-hour cron polling,
and Guardian Intercept email flow.

**Verification:** `npx tsc --noEmit` - zero errors in `app/` and `convex/`.
