# Flight Tracker - Ship Log

Operational record of every surgical strike on the codebase. Each entry is
verified before merge - no exceptions.

---

## Standing Orders

1. **No commit without `npx tsc --noEmit` verification.** If types break, the
   commit does not ship. Pre-existing errors in `project-docs/` are excluded
   from this gate.

2. **Every UI change must adhere to the Terminal Minimalist aesthetic.**
   Deep Black/Navy (#0F172A) base, Electric Blue (#3B82F6) primary accent, Emerald (#10B981) success accent, JetBrains Mono
   for data, hyphen-minus (-) for all dashes.

3. **Commits reference the Ship Log entry number.** Format: `[SL-XXX]` in the
   commit body when the change is non-trivial.

---

## Log

### SL-002 - Dynamic Tracking Route UI

**Scope:** `app/routes/track.$id.tsx`, `app/components/PriceDisplay.tsx`, `app/routes.ts`, `app/components/FlightSearch.tsx`, `app/components/homepage/footer.tsx`.

**Summary:** Initialized dynamic tracking routes and aero-minimalist price alert UI.

**Verification:** `npx tsc --noEmit` passed.

### SL-001 - Pure Flight Tracker Utility Reset

**Scope:** `app/`, `docs/`, and tailwind configuration values.

**Summary:** Completely purged the repository of legacy boilerplate ("Kaizen", "Moncures") and rebranded it to the standalone "Discount Flight Tracker" utility. Reset color palettes to Deep Black/Navy, Electric Blue, and Emerald. Enforced Inter and JetBrains Mono fonts and strictly enforced hyphen-minus dashes. Established a clean `PRODUCT_SPEC.md` focusing on Real-time flight search, Convex price alerts, and Resend email notifications.

**Verification:** `npx tsc --noEmit` passed.