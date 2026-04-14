# 🛡️ Flight Guardian: Development Journal

## 📝 Change Log [2026-04-14]
- **Feature**: Implemented Navigation Bar with dynamic Auth states (Clerk).
- **Feature**: Integrated Clerk `<SignInButton />` and `<SignUpButton />` with modal triggers.
- **Architecture**: Migrated to React Router 7 (RR7) with Full-Stack SSR and Middleware.
- **Fix**: Resolved "Oops!" 500 errors by implementing `rootAuthLoader` and `clerkMiddleware`.
- **Fix**: Resolved "Signal Lost" 404s by explicitly mapping `index` and `search` routes in `app/routes.ts`.
- **Infrastructure**: Connected Convex (Database) and Clerk (Auth) via Vercel Environment Variables.

## 🎓 Lessons Learned (The Hard Way)

### 1. The RR7 "Handshake" & Middleware
In React Router 7, the `clerkMiddleware` must be enabled in `react-router.config.ts` via the `future.v7_middleware: true` flag. Without this, the `rootAuthLoader` cannot intercept the request to provide auth state to the frontend.

### 2. SSR Auth Flow

Because RR7 is full-stack, auth state is a server-to-server handshake. The `loaderData` must be passed into `<ClerkProvider loaderData={loaderData}>` to prevent hydration mismatches and "missing clerkState" errors.

### 3. Environment Variable Prefixes
- `VITE_` prefix: Required for the **Frontend** to see the variable (e.g., Publishable Key).
- No prefix: Required for the **Backend** (e.g., Secret Key). Vercel requires both to be defined to satisfy both the build-time and run-time environments.

### 4. Explicit Route Mapping
When using `app/routes.ts`, file-based routing is ignored. Every new view (Search, Dashboard) must be manually registered to avoid the catch-all `$.tsx` (Signal Lost) page.

---
*Next Task: Implement Resend email notifications for the lock screen prompt.*