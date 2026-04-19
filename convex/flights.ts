import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// ── Queries ────────────────────────────────────────────────────────────────

/**
 * Return the most recent price snapshots for a given route.
 */
export const getRecentPrices = query({
  args: {
    originCode: v.string(),
    destCode: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("flights")
      .withIndex("by_route", (q) =>
        q.eq("originCode", args.originCode).eq("destCode", args.destCode),
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
        q.eq("userId", args.userId).eq("active", true),
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
    originCode: v.string(),
    destCode: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    airline: v.optional(v.string()),
    departureDate: v.optional(v.string()),
    source: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const flightId = await ctx.db.insert("flights", args);

    // Check if any alerts should be triggered by this new price
    // @ts-ignore - internal.flights exists in generated API
    await ctx.scheduler.runAfter(0, internal.flights.checkAndTriggerAlerts, {
      originCode: args.originCode,
      destCode: args.destCode,
      departureDate: args.departureDate,
      currentPrice: args.price,
      currency: args.currency,
      airline: args.airline,
    });

    return flightId;
  },
});

/**
 * Internal mutation to check and trigger price alerts.
 * This is called automatically when a new price snapshot is saved.
 */
export const checkAndTriggerAlerts = mutation({
  args: {
    originCode: v.string(),
    destCode: v.string(),
    departureDate: v.optional(v.string()),
    currentPrice: v.number(),
    currency: v.optional(v.string()),
    airline: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { originCode, destCode, departureDate, currentPrice, currency, airline },
  ) => {
    // Find all active alerts for this specific route and date
    const activeAlerts = await ctx.db
      .query("alerts")
      .withIndex("by_route", (q) =>
        q.eq("originCode", originCode).eq("destCode", destCode),
      )
      .filter((q) =>
        q.and(
          q.eq(q.field("active"), true),
          q.eq(q.field("departureDate"), departureDate),
        ),
      )
      .collect();

    for (const alert of activeAlerts) {
      // Trigger if current price is at or below target
      if (currentPrice <= alert.targetPrice) {
        // Get user details
        const user = await ctx.db
          .query("users")
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", alert.userId))
          .unique();

        if (user && user.email) {
          // Send email alert
          await ctx.scheduler.runAfter(
            0,
            internal.sendEmails.sendPriceAlertEmail,
            {
              email: user.email,
              origin: alert.origin,
              dest: alert.dest,
              price: currentPrice,
              targetPrice: alert.targetPrice,
              currency: currency || alert.currency || "£",
              airline: airline,
            },
          );

          // Deactivate the alert
          await ctx.db.patch(alert._id, {
            active: false,
            triggeredAt: Date.now(),
          });

          console.log(
            `🚀 Price alert triggered for ${user.email}: ${alert.origin} -> ${alert.dest} at ${currentPrice}`,
          );
        }
      }
    }
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
    originCode: v.string(),
    destCode: v.string(),
    departureDate: v.optional(v.string()),
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

/**
 * Internal query to list all active routes being tracked by users.
 * Used by the cron job to know which prices to poll.
 */
export const listActiveRoutes = query({
  args: {},
  handler: async (ctx) => {
    const alerts = await ctx.db
      .query("alerts")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();

    // Group by unique route to save API calls
    const unique = new Map<string, any>();
    for (const a of alerts) {
      const key = `${a.originCode}-${a.destCode}-${a.departureDate || "ANY"}`;
      if (!unique.has(key)) {
        unique.set(key, {
          origin: a.origin,
          dest: a.dest,
          originCode: a.originCode,
          destCode: a.destCode,
          departureDate: a.departureDate,
        });
      }
    }
    return Array.from(unique.values());
  },
});

// ── Actions ────────────────────────────────────────────────────────────────

/**
 * Placeholder action for fetching live prices from Amadeus API.
 *
 * PRODUCTION FLOW:
 * 1. Fetch OAuth2 token from Amadeus
 * 2. POST /v2/shopping/flight-offers
 * 3. Map results and call `savePriceSnapshot` mutation for each
 * 4. Return the results to the frontend
 */
export const fetchLivePrices = action({
  args: {
    origin: v.string(),
    dest: v.string(),
    originCode: v.string(),
    destCode: v.string(),
    departureDate: v.optional(v.string()),
  },
  handler: async (_ctx, args): Promise<{ price: number; source: string }[]> => {
    // TODO: replace with real Amadeus API call
    void args;
    return [];
  },
});
