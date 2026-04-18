# Going live — swapping dummy data for real flight prices

This is the step-by-step plan to get Flight Guardian off the dummy
`FLIGHTS` array and showing real prices on the dashboard, with
email alerts when a price hits the user's target.

It complements the deeper architecture reference in
[`API_GOOGLE_FLIGHTS.md`](./API_GOOGLE_FLIGHTS.md). Read that first if
you want the full request/response shapes — this doc is the
roadmap.

---

## Where we are today

**Frontend (dummy)**

| File | State |
|---|---|
| `app/lib/flights.ts` | 12 hard-coded flights + local `searchFlights()` |
| `app/lib/tracked-flights.ts` | localStorage (client-only) |
| `app/routes/search.tsx` | Reads dummy array |
| `app/routes/track.$id.tsx` | Writes to localStorage |
| `app/routes/dashboard.tsx` | Reads localStorage |

**Backend (scaffolded, not wired)**

| File | State |
|---|---|
| `convex/schema.ts` | `flights` + `alerts` tables exist |
| `convex/flights.ts` | Queries + mutations done; `fetchLivePrices` is a stub |
| `convex/sendEmails.ts` | Resend component installed, test email works |
| `convex/crons.ts` | **Missing** |

So the backend shape is ready — we just need to fill in three things:
the Amadeus call, a cron, and an email template.

---

## The pieces we need to build

```
┌─────────────┐     ┌───────────────┐     ┌────────────┐
│ /search     │ ──▶ │ Amadeus API   │ ──▶ │ results    │
│ (live)      │ ◀── │ (flight-offers)│◀──  │            │
└─────────────┘     └───────────────┘     └────────────┘
        │
        │ Track this flight (createAlert)
        ▼
┌─────────────┐     ┌───────────────┐
│ alerts      │ ◀── │ Convex cron   │
│ (Convex)    │     │ every N hours │
└─────────────┘     └───────────────┘
        │                    │
        │ price ≤ target?    │
        │                    ▼
        │             ┌──────────────┐
        │             │ Resend email │
        │             │ (price drop) │
        │             └──────────────┘
        ▼
┌─────────────┐
│ /dashboard  │
│ (live data) │
└─────────────┘
```

---

## Phase 1 — Live search results

**Goal:** `/search` returns real flight prices from Amadeus instead
of the dummy array.

### 1.1 Get credentials

1. Sign up at <https://developers.amadeus.com/>
2. Create a "Self-Service" app → get `API Key` and `API Secret`
3. Test environment is free, 2000 calls/month — no card needed
4. Prod environment requires a short app review (usually < 24h)

### 1.2 Add env vars

```bash
# .env.local (dev)
AMADEUS_API_KEY=...
AMADEUS_API_SECRET=...
AMADEUS_BASE_URL=https://test.api.amadeus.com   # swap to api.amadeus.com in prod
```

Also add to Vercel project env vars (Preview + Production).

### 1.3 Fill in `convex/flights.ts` → `fetchLivePrices`

The stub is already at `convex/flights.ts:104`. Replace the TODO
block with:

- OAuth2 token fetch against `/v1/security/oauth2/token`, cached
  in module scope with a `expiresAt` timestamp (token lives ~30 min)
- `POST /v2/shopping/flight-offers` with origin/dest/date
- Map response to `{ price, currency, airline, departureDate, source: "amadeus" }`
- Persist each result via the existing `savePriceSnapshot` mutation
- Return the mapped list

Request/response shapes are documented in
[`API_GOOGLE_FLIGHTS.md`](./API_GOOGLE_FLIGHTS.md) sections 1 and 3.

### 1.4 Wire `/search` to Convex

Turn `app/routes/search.tsx` into a route with a loader that runs
server-side:

```tsx
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const from = url.searchParams.get("from") ?? "LHR";
  const to = url.searchParams.get("to") ?? "JFK";
  const date = url.searchParams.get("date") ?? undefined;

  // Use Convex HTTP client so this also works at build time
  const prices = await convex.action(api.flights.fetchLivePrices, {
    origin: from, dest: to, departureDate: date,
  });

  return { prices };
}
```

Keep the existing dummy `FLIGHTS` as a fallback when env vars are
missing so local dev still works without credentials.

### 1.5 Done check

- `/search?from=LHR&to=JFK` shows real prices
- `flights` table in Convex fills up with snapshots
- Dummy array is only touched in dev-without-env

---

## Phase 2 — Tracked flights on the dashboard

**Goal:** when a signed-in user clicks "Track", the alert is saved
to Convex, not localStorage. Dashboard reads from Convex so it
survives devices.

### 2.1 Migrate `track.$id.tsx` to use `createAlert`

Replace the localStorage write in `app/routes/track.$id.tsx` with a
Convex mutation:

```tsx
const createAlert = useMutation(api.flights.createAlert);

await createAlert({
  userId,              // from Clerk `useAuth()`
  origin: flight.originCode,
  dest: flight.destinationCode,
  targetPrice,
  currency: "GBP",
});
```

For signed-out users, keep the localStorage path as a fallback
(lets people try the product without signup).

### 2.2 Dashboard reads from Convex

`app/routes/dashboard.tsx` currently calls `getTrackedFlights()`
from localStorage. Swap for:

```tsx
const alerts = useQuery(api.flights.getUserAlerts, { userId });
```

For each alert, also query `getRecentPrices({ origin, dest, limit: 1 })`
to get the current price from the latest snapshot, so the dashboard
card shows how close we are to the target.

### 2.3 Delete `app/lib/tracked-flights.ts`

Once the migration is done and dashboard is verified, the
localStorage module is dead code.

---

## Phase 3 — Hourly polling (cron)

**Goal:** keep prices fresh so we can detect a drop.

### 3.1 Create `convex/crons.ts`

```ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "poll-active-routes",
  { hours: 4 },                          // Amadeus free tier is tight
  internal.flights.pollActiveRoutes,
);

export default crons;
```

### 3.2 Add `pollActiveRoutes` as an internal action

In `convex/flights.ts`, add:

```ts
export const pollActiveRoutes = internalAction({
  args: {},
  handler: async (ctx) => {
    const alerts = await ctx.runQuery(internal.flights.listActiveRoutes);
    const uniqueRoutes = dedupeRoutes(alerts); // dedupe by origin+dest+date

    for (const route of uniqueRoutes) {
      await ctx.runAction(internal.flights.fetchLivePrices, route);
      await sleep(200); // rate limit
    }
  },
});
```

Amadeus free tier is **500 calls/month**. At 4 hours × 30 days = 180
polls/month × 1 route = 180 calls. Each additional unique route eats
another 180 calls, so you can track about 2 concurrent routes on the
free tier. Bump the interval to `{ hours: 6 }` or upgrade for more.

### 3.3 Trigger the email in `savePriceSnapshot`

After inserting a snapshot, check if any active alert matches:

```ts
const matching = await ctx.db
  .query("alerts")
  .withIndex("by_route", (q) =>
    q.eq("origin", args.origin).eq("dest", args.dest),
  )
  .filter((q) =>
    q.and(
      q.eq(q.field("active"), true),
      q.lte(q.field("targetPrice"), args.price), // wrong direction — fix below
    ),
  )
  .collect();
```

Correct condition: alert is triggered when `args.price <= alert.targetPrice`.
For each match, schedule `sendPriceDropEmail` and call
`deactivateAlert(alert._id)`.

---

## Phase 4 — Price-drop email via Resend

**Goal:** the user gets a friendly email the moment their target
price is hit.

### 4.1 Add `RESEND_API_KEY` env var

Already supported by `convex/sendEmails.ts` — `isEmailEnabled()`
reads it. Set in `.env.local` and Vercel.

### 4.2 Add `sendPriceDropEmail` action

In `convex/sendEmails.ts`, add a new action modelled on
`sendTestEmail` but templated:

```ts
export const sendPriceDropEmail = internalAction({
  args: {
    toEmail: v.string(),
    origin: v.string(),
    dest: v.string(),
    currentPrice: v.number(),
    targetPrice: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, a) => {
    if (!isEmailEnabled()) return;
    await resend.sendEmail(
      ctx,
      "Flight Guardian <alerts@your-domain.com>",
      a.toEmail,
      `Price just dropped: ${a.origin} → ${a.dest} at ${a.currency}${a.currentPrice}`,
      renderPriceDropHtml(a),   // see template below
    );
  },
});
```

Template (keep it on-brand — white card, sky-blue accent, not the
old "GUARDIAN INTERCEPT" hacker style):

```html
<div style="font-family:system-ui;background:#f0f9ff;padding:32px">
  <div style="background:#fff;border-radius:16px;padding:32px;max-width:480px;margin:0 auto;box-shadow:0 4px 24px rgba(14,165,233,0.15)">
    <p style="color:#059669;font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;margin:0">Price dropped!</p>
    <h1 style="font-size:24px;margin:8px 0 16px">${origin} → ${dest}</h1>
    <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:24px">
      <span style="font-size:36px;font-weight:700">${currency}${currentPrice}</span>
      <span style="color:#059669;font-weight:600">You asked for ${currency}${targetPrice}</span>
    </div>
    <a href="https://flightguardian.app/dashboard" style="background:#0284c7;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">Book now →</a>
  </div>
</div>
```

### 4.3 Domain setup

Resend needs a verified sending domain. For MVP, use
`onboarding@resend.dev` (works but looks unprofessional). For real
launch, add a subdomain like `mail.flightguardian.app` in Resend and
add the DNS records to Vercel.

---

## Ship order

1. **Phase 1** — hardest, gets live data in front of you. Swap
   dummy → Amadeus. Verify manually by searching LHR → JFK.
2. **Phase 2** — moves tracking to Convex so it survives refresh and
   devices. Needed before polling makes sense.
3. **Phase 3** — cron + polling. No user-visible change until prices
   actually move, but the system is now watching.
4. **Phase 4** — Resend template + trigger. This is the payoff.

Each phase is deployable on its own. Don't wait until phase 4 to
merge — ship phase 1 behind a feature flag if you want, but get it
into main.

---

## Open questions to decide later

- **Scraping as a fallback?** If Amadeus quota is hit, a Playwright
  scrape of Google Flights would work but is fragile and TOS-iffy.
  Better: upgrade Amadeus or add Travelpayouts (affiliate-friendly).
- **Currency conversion?** Amadeus returns USD/EUR depending on
  market. The UI shows £ everywhere. Either force GBP in the request
  body (`currencyCode: "GBP"`) or convert client-side.
- **Price history chart on the dashboard?** The `flights` table
  already stores snapshots with timestamps — a sparkline per
  tracked route is a ~1-day task once phase 3 is running.
