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

### SL-014 - Hotfix: Missing JSX Closing Tag

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Resolved a critical build failure (`The character "}" is not valid inside a JSX element`) that occurred during the Vercel deployment. 
- The error was traced to a missing closing `</div>` tag introduced during the conveyor belt container resizing. The tag has been restored and the production build now passes successfully.

**Verification:** Build passes successfully via `npm run build`.

### SL-013 - Conveyor Belt Sizing Constraints

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Constrained the "Trending Deals" conveyor belt within the main `max-w-7xl` container rather than stretching across `100vw`. 
- Adjusted the responsive sizing of the destination cards (`w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[380px]`) so that exactly three cards are visible simultaneously on standard desktop viewports, enhancing visual continuity and layout balance without cards getting unnaturally huge.

**Verification:** Build passes successfully.

### SL-012 - Continuous "Conveyor Belt" Scroll

**Scope:** `app/routes/home.tsx`, `app/app.css`

**Summary:** 
- Converted the "Trending Deals" destination carousel into an infinite, continuous "conveyor belt" auto-scrolling animation.
- Implemented CSS keyframes (`animate-conveyor-belt`) to smoothly loop through duplicated arrays of destination cards. The animation gracefully pauses when the user hovers over any card so they can inspect it.
- Added soft gradient edges (`bg-gradient-to-r from-sky-50 to-transparent`) to the sides of the viewport to create a smooth fade-in/fade-out effect as cards enter and leave the screen.

**Verification:** Build passes successfully.

### SL-011 - Horizontal Carousel Fix & New Destinations

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Resolved a UI flickering issue caused by React unmounting and remounting the destination list by removing `key={filter}`.
- Converted the "Trending Deals" grid into a horizontal, native CSS scroll-snap carousel on all screen sizes, solving layout constraints on large desktop screens by explicitly sizing cards instead of forcing a CSS grid.
- Expanded the `DESTINATIONS` list with brand new global locations, adding Cape Town (Africa), Marrakech (Africa), Rio de Janeiro (South America), and Buenos Aires (South America). Updated filters to match.

**Verification:** Build passes successfully.

### SL-010 - Immersive Destination Cards

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Redesigned the destination cards in the "Trending Deals" section to move the text into a distinct, frosted glass card at the bottom.
- Enhanced the interactive "insight drawer" that slides up from the bottom on hover. It now includes a simulated progress bar indicating "High volatility" or "Price dropping" trends and "Chance of drop" metrics, giving users engaging, actionable data.

**Verification:** Build passes successfully.

### SL-009 - Scaled Up Layout & Responsiveness

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Increased the `max-w` constraint across all landing page sections (Hero, Product Demo, Destinations, Bento Grid, Comparison, FAQ, Final CTA) to better utilize screen real estate on larger displays (e.g. upscaling `max-w-5xl` to `max-w-7xl` in Hero, and `max-w-4xl` to `max-w-5xl` in the Demo).
- Upgraded the Hero heading size on large screens to `lg:text-[5.5rem]` to create a more impactful, immersive first impression.
- Tweaked inner paddings and button scaling to maintain breathing room and visual hierarchy on larger viewports.

**Verification:** Build passes successfully.

### SL-008 - Immersive Destination Cards

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Redesigned the destination cards in the "Trending Deals" section to include an interactive "insight drawer" that slides up from the bottom on hover. This drawer reveals engaging, contextual simulated data like "alerts sent this week" and volatility metrics (e.g., "Hot deal" or "Volatile").
- Enhanced the copy and layout to naturally draw users' attention to the price drops and the tracker button without feeling cluttered.

**Verification:** Build passes successfully.

### SL-007 - Expanded Product Demo & Reduced Wordiness

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Expanded the `DEMO_ROUTES` array to include Berlin (Europe), Cape Town (Africa), and Rio de Janeiro (South America), making the `ProductDemo` component richer and more global as it cycles through its automatic demonstrations.
- Tightened up the copy in the "Watch it work" section (changed to "See it in action.") for a punchier, more confident tone.

**Verification:** Build passes successfully.

### SL-006 - Enhanced Landing Page Interactivity & Visual Polish

**Scope:** `app/routes/home.tsx`

**Summary:** 
- Restyled the `DemoSceneAlert` mock dashboard component to bring floating sparkles (`<Sparkles />`) forward (`z-30`) so they overlay the components clearly instead of getting lost in the background.
- Resolved an overlapping UI bug on destination cards where the animating takeoff airplane icon would clip or overlap with the dropped price badge text. The price badge and airplane icon have been explicitly wrapped and spaced.
- Adjusted copy in the header sections ("Trending Deals" and "We do the hunting") to make it snappier and less wordy.

**Verification:** Build passes successfully.

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