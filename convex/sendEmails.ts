import { components, internal } from "./_generated/api";
import { Resend, vEmailId, vEmailEvent } from "@convex-dev/resend";
import { internalMutation, action } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  onEmailEvent: internal.sendEmails.handleEmailEvent,
  testMode: false, // Set to false to allow sending to real email addresses
});

// Determine whether email sending should be attempted at all.
// Honors project feature flags synced into env and also falls back to API key presence.
const isEmailEnabled = (): boolean => {
  if (process.env.EMAIL_ENABLED === "true") return true;
  if (process.env.RESEND_ENABLED === "true") return true;
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 0)
    return true;
  return false;
};

export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args) => {
    console.log("Email event received:", args.id, args.event);
    // Handle email events here (deliveries, bounces, etc.)
    // You can update your database or trigger other actions based on the event
  },
});

export const sendTestEmail = internalMutation({
  handler: async (ctx) => {
    await resend.sendEmail(
      ctx,
      "Test <test@mydomain.com>",
      "delivered@resend.dev",
      "Test Email from Kaizen",
      "This is a test email from your Kaizen app!",
    );
  },
});

export const sendTestEmailToAddress = action({
  args: {
    toEmail: v.string(),
    subject: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, { toEmail, subject, message }) => {
    // Check if user is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Must be authenticated to send test emails");
    }

    const fromEmail = process.env.SENDER_EMAIL || "test@resend.dev";
    const companyName = process.env.COMPANY_NAME || "Kaizen";

    try {
      await resend.sendEmail(
        ctx,
        `${companyName} <${fromEmail}>`,
        toEmail,
        subject || `Test Email from ${companyName}`,
        message ||
          `<h1>Test Email</h1><p>This is a test email sent from your ${companyName} application!</p><p>If you received this, your email configuration is working correctly.</p>`,
      );

      return { success: true, message: "Test email sent successfully!" };
    } catch (error) {
      console.error("Failed to send test email:", error);
      throw new Error(
        "Failed to send test email. Check your email configuration.",
      );
    }
  },
});

export const sendPriceAlertEmail = internalMutation({
  args: {
    email: v.string(),
    origin: v.string(),
    dest: v.string(),
    price: v.number(),
    targetPrice: v.number(),
    currency: v.optional(v.string()),
    airline: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { email, origin, dest, price, targetPrice, currency, airline },
  ) => {
    if (!isEmailEnabled()) {
      console.log(
        "📭 Email disabled by config; skipping price alert for",
        email,
      );
      return;
    }

    const fromEmail = process.env.SENDER_EMAIL || "alerts@flightguardian.app";
    const companyName = "Flight Guardian";
    const symbol = currency === "USD" ? "$" : "£";
    const savings = targetPrice > price ? targetPrice - price : 0;

    await resend.sendEmail(
      ctx,
      `${companyName} <${fromEmail}>`,
      email,
      `Price Drop Alert: ${origin} to ${dest} is now ${symbol}${price}!`,
      `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h1 style="color: #3b82f6;">Your flight just dropped!</h1>
        <p style="font-size: 16px;">Good news! The flight you've been watching from <strong>${origin}</strong> to <strong>${dest}</strong> has hit your target price.</p>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
          <p style="margin: 0; font-size: 14px; color: #15803d; font-weight: bold; text-transform: uppercase;">New Deal Found</p>
          <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #064e3b;">${symbol}${price}</p>
          <p style="margin: 5px 0 0; font-size: 14px; color: #374151;">Airline: ${airline || "Any"}</p>
        </div>

        <p style="font-size: 14px; color: #6b7280;">
          Target Price: ${symbol}${targetPrice}<br/>
          Current Savings: ${symbol}${savings} from your target!
        </p>

        <div style="margin-top: 30px;">
          <a href="https://flightguardian.app/dashboard" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block;">View Deal & Book</a>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          You received this because you set a price alert on Flight Guardian.<br/>
          This alert has now been deactivated.
        </p>
      </div>
      `,
    );
  },
});

export const sendWelcomeEmail = internalMutation({
  args: { email: v.string(), name: v.string() },
  handler: async (ctx, { email, name }) => {
    // Respect config toggle: do not send if email feature disabled
    if (!isEmailEnabled()) {
      console.log(
        "📭 Email disabled by config; skipping welcome email for",
        email,
      );
      return;
    }
    const fromEmail = process.env.SENDER_EMAIL || "welcome@resend.dev";
    const companyName = process.env.COMPANY_NAME || "Kaizen";

    await resend.sendEmail(
      ctx,
      `${companyName} <${fromEmail}>`,
      email,
      `Welcome to ${companyName}, ${name}!`,
      `<h1>Welcome aboard, ${name}!</h1><p>We're excited to have you with us at ${companyName}.</p>`,
    );
  },
});
