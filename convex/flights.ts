import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ── Queries ────────────────────────────────────────────────────────────────

/**
 * Return the most recent price snapshots for a given route.
 */
export const getRecentPrices = query({
  args: {
    origin: v.string(),
    dest: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("flights")
      .withIndex("by_route", (q) =>
        q.eq("origin", args.origin).eq("dest", args.dest)
      )
      .order("desc")
      .take(args.limit ?? 20);
  },
});

/**
 * Return all active price alerts for a user.
 */
export const getUserAlerts = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db
      .query("alerts")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", args.userId).eq("active", true)
      )
      .collect();
  },
});

// ── Mutations ──────────────────────────────────────────────────────────────

/**
 * Persist a raw price snapshot returned by a fetch action.
 */
export const savePriceSnapshot = mutation({
  args: {
    origin: v.string(),
    dest: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    airline: v.optional(v.string()),
    departureDate: v.optional(v.string()),
    source: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("flights", args);
  },
});

/**
 * Create a new price alert for a user.
 */
export const createAlert = mutation({
  args: {
    userId: v.string(),
    origin: v.string(),
    dest: v.string(),
    targetPrice: v.number(),
    currency: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("alerts", {
      ...args,
      active: true,
      createdAt: Date.now(),
    });
  },
});

/**
 * Deactivate a price alert once it has been triggered or cancelled.
 */
export const deactivateAlert = mutation({
  args: { alertId: v.id("alerts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.alertId, {
      active: false,
      triggeredAt: Date.now(),
    });
  },
});

// ── Actions ────────────────────────────────────────────────────────────────

/**
 * Placeholder action for fetching live prices from SkyScanner / Amadeus.
 *
 * Replace the TODO block with real API calls once credentials are available.
 * The action stores each price snapshot via `savePriceSnapshot` so that
 * queries and alert-matching logic work against a consistent dataset.
 */
export const fetchLivePrices = action({
  args: {
    origin: v.string(),
    dest: v.string(),
    departureDate: v.optional(v.string()),
  },
  handler: async (_ctx, args): Promise<{ price: number; source: string }[]> => {
    // TODO: replace with real provider call, e.g.:
    //
    // const response = await fetch(
    //   `https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "x-api-key": process.env.SKYSCANNER_API_KEY!,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       query: {
    //         market: "US",
    //         locale: "en-US",
    //         currency: "USD",
    //         queryLegs: [
    //           {
    //             originPlaceId: { iata: args.origin },
    //             destinationPlaceId: { iata: args.dest },
    //             date: { year: ..., month: ..., day: ... },
    //           },
    //         ],
    //         adults: 1,
    //       },
    //     }),
    //   }
    // );
    // const data = await response.json();
    // return data.content.results.itineraries.map(...);

    void args; // suppress unused-variable warning until real API is wired up
    return [];
  },
});
