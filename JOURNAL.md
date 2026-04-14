# 🛡️ Flight Guardian: Development Journal

## 📝 Change Log [2026-04-14]
- **Feature**: Implemented Navigation Bar with dynamic Auth states (Clerk).
- **Architecture**: Migrated to React Router 7 (RR7) with Full-Stack SSR.
- **Fix**: Resolved "Oops!" 500 errors by implementing `rootAuthLoader` and `clerkMiddleware`.
- **Infrastructure**: Connected Convex (Database) and Clerk (Auth) via Vercel Environment Variables.
- **Routing**: Fixed 404s by explicitly mapping routes in `app/routes.ts`.

## 🎓 Lessons Learned (The Hard Way)

### 1. The RR7 "Handshake"
In React Router 7, you cannot just wrap the app in a Provider. Because it renders on the server first, you **must** use a `loader` (like `rootAuthLoader`) to fetch the auth state before the page reaches the browser.

### 2. Environment Variable Prefixes
- `VITE_` prefix: Required for any variable you want to access in the **browser** (Frontend).
- No prefix: Only accessible on the **server** (Backend/Middleware).
- *Mistake:* Using `VITE_CLERK_SECRET_KEY` is a security risk; keeping it just `CLERK_SECRET_KEY` is the correct way.

### 3. Route Mapping
RR7 overrides file-based routing if `app/routes.ts` exists. Always ensure new pages (like `/search`) are added to the export array in that file.

### 4. Vercel Deployment Sync
Changing environment variables in Vercel **requires a Redeploy**. Simply saving the keys doesn't update the live server; it needs a fresh build to "bake" them in.

---
*Next Task: Implement Resend email notifications for the lock screen prompt.*