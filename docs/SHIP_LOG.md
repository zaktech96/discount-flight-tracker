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

### SL-005 - Enhanced Interactivity & Component Contrast

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Improved contrast and visibility in `DemoSceneAlert` ("My tracked flights" component) by reducing opacity, lightening the text, and adding an animated pulsing active dot.
- Reduced wordiness in the "Popular right now" and "What makes it magic" sections for a punchier copy.
- Transformed the destination cards grid into a horizontally scrollable snap-carousel on mobile.
- Added a subtle, animated swooping plane effect (`animate-fly-across`) to the section header and a dynamic takeoff plane animation on the destination cards when hovered.

**Verification:** Build passes successfully.

### SL-004 - Enhanced UI Interactions & Contrast

**Scope:** `app/routes/home.tsx`

**Summary:** Fixed low-contrast issue on the destination card "Track it" button by applying a solid `bg-sky-500` and a glass glow effect. Enhanced interactive elements on the landing page by adding scaling hover states (`hover:scale-[1.02]`) to destination cards and applying an animated gradient glow to the primary "Find cheap flights" hero button.

**Verification:** Build passes successfully.

### SL-003 - Convex Production Deployment

**Scope:** `convex/`, `.env.local`

**Summary:** Resolved local package/peer dependency conflicts by clearing node_modules and running a clean `npm install --legacy-peer-deps`. Configured `VITE_CLERK_FRONTEND_API_URL` on the Convex production environment with the local Clerk issuer and successfully pushed schemas, migrations, and functions via `npx convex deploy --yes`.

**Verification:** Convex deployment finished successfully, schemas validated, and table indexes initialized on production.

### SL-002 - Dynamic Tracking Route UI

**Scope:** `app/routes/track.$id.tsx`, `app/components/PriceDisplay.tsx`, `app/routes.ts`, `app/components/FlightSearch.tsx`, `app/components/homepage/footer.tsx`.

**Summary:** Initialized dynamic tracking routes and aero-minimalist price alert UI.

**Verification:** `npx tsc --noEmit` passed.

### SL-001 - Pure Flight Tracker Utility Reset

**Scope:** `app/`, `docs/`, and tailwind configuration values.

**Summary:** Completely purged the repository of legacy boilerplate ("Kaizen", "Moncures") and rebranded it to the standalone "Discount Flight Tracker" utility. Reset color palettes to Deep Black/Navy, Electric Blue, and Emerald. Enforced Inter and JetBrains Mono fonts and strictly enforced hyphen-minus dashes. Established a clean `PRODUCT_SPEC.md` focusing on Real-time flight search, Convex price alerts, and Resend email notifications.

**Verification:** `npx tsc --noEmit` passed.