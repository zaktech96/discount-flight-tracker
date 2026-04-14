# Flight Guardian - API Implementation Plan

## Overview

Flight Guardian uses Convex Actions to fetch live flight prices from external
providers and Convex Cron Jobs to poll on a fixed schedule. When a price drops
below a user-defined target, the system fires a "Guardian Intercept" email via
Resend.

---

## 1. Endpoint Strategy

All external API calls are executed inside **Convex Actions** (`convex/flights.ts`).
Actions run in a Node.js environment with full `fetch` access and are isolated
from the deterministic query/mutation layer.

### Primary Provider - Amadeus Flight Offers Search

```
POST https://api.amadeus.com/v2/shopping/flight-offers
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request body:**

```json
{
  "currencyCode": "USD",
  "originDestinations": [
    {
      "id": "1",
      "originLocationCode": "LHR",
      "destinationLocationCode": "JFK",
      "departureDateTimeRange": {
        "date": "2026-06-15"
      }
    }
  ],
  "travelers": [{ "id": "1", "travelerType": "ADULT" }],
  "sources": ["GDS"],
  "searchCriteria": {
    "maxFlightOffers": 10
  }
}
```

### Fallback Provider - SkyScanner Flights Live Search

```
POST https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create
x-api-key: {SKYSCANNER_API_KEY}
Content-Type: application/json
```

**Request body:**

```json
{
  "query": {
    "market": "US",
    "locale": "en-US",
    "currency": "USD",
    "queryLegs": [
      {
        "originPlaceId": { "iata": "LHR" },
        "destinationPlaceId": { "iata": "JFK" },
        "date": { "year": 2026, "month": 6, "day": 15 }
      }
    ],
    "adults": 1
  }
}
```

### Auth Token Flow (Amadeus)

Amadeus uses OAuth2 client credentials. The token is fetched once and cached for
its `expires_in` duration (typically 1799 seconds).

```
POST https://api.amadeus.com/v1/security/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id={API_KEY}&client_secret={API_SECRET}
```

**Environment variables required:**

| Variable               | Description                         |
|------------------------|-------------------------------------|
| `AMADEUS_API_KEY`      | Amadeus API key                     |
| `AMADEUS_API_SECRET`   | Amadeus API secret                  |
| `SKYSCANNER_API_KEY`   | SkyScanner partner API key          |

---

## 2. Polled Refresh - Cron Jobs

A Convex Cron Job runs the `fetchLivePrices` action every 4 hours for each
active alert route. This balances API quota against price freshness.

### Cron Configuration (`convex/crons.ts`)

```typescript
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "poll-active-routes",
  { hours: 4 },
  internal.flights.pollActiveRoutes,
);

export default crons;
```

### Poll Logic (`convex/flights.ts` - internal action)

```
pollActiveRoutes:
  1. Query all distinct (origin, dest) pairs from active alerts
  2. For each unique route, call fetchLivePrices action
  3. Save each result via savePriceSnapshot mutation
  4. Check saved prices against alert targets
  5. For any match, trigger Guardian Intercept email
```

### Rate Limiting

- Amadeus free tier: 10 requests/second, 500 requests/month
- SkyScanner: 50 requests/minute on partner tier
- The 4-hour polling interval keeps a single route well within limits
- Batch routes into sequential calls with 200ms delay between each

---

## 3. Data Mapping

### Amadeus Response to `flights` Schema

| Amadeus Field                                      | Schema Field     |
|----------------------------------------------------|------------------|
| `data[].source`                                    | `source`         |
| `data[].itineraries[0].segments[0].departure.iataCode` | `origin`    |
| `data[].itineraries[0].segments[-1].arrival.iataCode`  | `dest`      |
| `data[].price.grandTotal`                          | `price`          |
| `data[].price.currency`                            | `currency`       |
| `data[].validatingAirlineCodes[0]`                 | `airline`        |
| `data[].itineraries[0].segments[0].departure.at`   | `departureDate`  |
| `Date.now()`                                       | `timestamp`      |

### SkyScanner Response to `flights` Schema

| SkyScanner Field                                   | Schema Field     |
|----------------------------------------------------|------------------|
| `"SkyScanner"`                                     | `source`         |
| `content.results.itineraries[].legs[0].originPlaceId`  | `origin`    |
| `content.results.itineraries[].legs[0].destinationPlaceId` | `dest`  |
| `content.results.itineraries[].pricingOptions[0].price.amount` | `price` |
| `"USD"`                                            | `currency`       |
| `content.results.itineraries[].legs[0].carriers[0]` | `airline`      |
| `content.results.itineraries[].legs[0].departureDateTime` | `departureDate` |
| `Date.now()`                                       | `timestamp`      |

---

## 4. Guardian Intercept - Alert Emails via Resend

When a polled price hits or drops below a user's `targetPrice`, the system
deactivates the alert and sends a notification email.

### Trigger Flow

```
savePriceSnapshot
  -> check price <= alert.targetPrice
  -> if match:
       1. Call deactivateAlert(alertId)
       2. Schedule sendGuardianIntercept email via Resend
```

### Email Template (`convex/sendEmails.ts` - new internal action)

```typescript
export const sendGuardianIntercept = internalAction({
  args: {
    email: v.string(),
    origin: v.string(),
    dest: v.string(),
    price: v.number(),
    targetPrice: v.number(),
    airline: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await resend.emails.send({
      from: "Flight Guardian <alerts@flightguardian.app>",
      to: args.email,
      subject: `Guardian Intercept - [${args.origin}] - [${args.dest}] at $${args.price}`,
      html: `
        <div style="font-family: monospace; background: #1A1A1A; color: #fff; padding: 32px;">
          <h1 style="color: #0F7A73;">GUARDIAN INTERCEPT</h1>
          <p>Price drop detected on your watched route.</p>
          <table style="font-family: monospace; margin: 16px 0;">
            <tr><td style="color: #666; padding-right: 16px;">Route</td><td>[${args.origin}] - [${args.dest}]</td></tr>
            <tr><td style="color: #666; padding-right: 16px;">Current</td><td style="color: #00FF41;">$${args.price}</td></tr>
            <tr><td style="color: #666; padding-right: 16px;">Target</td><td>$${args.targetPrice}</td></tr>
            ${args.airline ? `<tr><td style="color: #666; padding-right: 16px;">Airline</td><td>${args.airline}</td></tr>` : ""}
          </table>
          <p style="color: #666; font-size: 12px;">This alert has been deactivated. Set a new one at flightguardian.app</p>
        </div>
      `,
    });
  },
});
```

---

## 5. Environment Variable Checklist

| Variable               | Required | Used By              |
|------------------------|----------|----------------------|
| `AMADEUS_API_KEY`      | Yes      | `fetchLivePrices`    |
| `AMADEUS_API_SECRET`   | Yes      | `fetchLivePrices`    |
| `SKYSCANNER_API_KEY`   | No       | Fallback provider    |
| `RESEND_API_KEY`       | Yes      | Guardian Intercept   |
| `CONVEX_DEPLOYMENT`    | Yes      | Convex runtime       |

---

## 6. Implementation Sequence

1. Wire up Amadeus OAuth2 token fetch in `convex/flights.ts`
2. Implement `fetchLivePrices` with real Amadeus API call
3. Add `pollActiveRoutes` internal action with route deduplication
4. Create `convex/crons.ts` with 4-hour polling interval
5. Add `sendGuardianIntercept` to `convex/sendEmails.ts`
6. Wire trigger logic in `savePriceSnapshot` to check alerts
7. Add SkyScanner as fallback provider (optional)
