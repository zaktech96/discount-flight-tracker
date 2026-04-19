# Flight Guardian: How it Works (Simplified)

This document explains the "engine under the hood" of Flight Guardian in plain English.

---

## 1. The Core Architecture

Flight Guardian is built using four main components:

1.  **Frontend (The UI)**: Built with **React Router 7**. This is what you see in the browser. It handles the buttons, the glass cards, and the dark mode toggle.
2.  **Database (The Brain)**: Built with **Convex**. This is where we store your flight alerts, the prices we catch, and your user settings. It's real-time, meaning as soon as a price changes, your dashboard updates.
3.  **Authentication (The Key)**: Built with **Clerk**. This handles the "Sign In" and "Sign Up" features, making sure your alerts are kept private to your account.
4.  **The Watcher (The Engine)**: This is a set of background tasks in Convex that poll for new flight prices even while you're asleep.

---

## 2. The Data Flow (Path of an Alert)

### Step A: Finding a Flight
When you use the `/search` page, the app looks for flight deals. Currently, these come from a high-fidelity "Catalog" we built, but we are wiring it to the **Amadeus API** to fetch every flight in the world.

### Step B: Setting the Guard
When you click **"Track this flight"**:
- **If you are signed in**: The alert is sent to **Convex** and saved permanently to your account.
- **If you are a guest**: The alert is saved to your browser's **localStorage**. It stays there until you clear your cookies or sign in to sync it.

### Step C: The Scanning Loop
Every few hours, our "Watcher" engine (Phase 3):
1.  Gathers all the active routes people are tracking.
2.  Asks the flight providers (Amadeus) for the absolute latest price.
3.  Saves that price into a **Snapshot** table.

### Step D: The Intercept
As soon as a new price snapshot is saved, our system runs a check:
> *"Is this new price (£300) less than or equal to what the user asked for (£350)?"*

If the answer is **YES**:
1.  We trigger the **Resend Email Service** (Phase 4).
2.  An email is sent to you immediately with a "Book Now" link.
3.  The alert is marked as "Triggered" so we stop watching it.

---

## 3. Tech Stack Breakdown

- **React Router 7**: Modern web framework for speed and SEO.
- **Tailwind CSS**: For the glassy, premium "Terminal Minimalist" look.
- **Framer Motion**: For those smooth, app-like entrance animations.
- **Convex**: A backend-as-a-service that handles our DB and background jobs.
- **Clerk**: Industry-standard security for your user account.
- **Lucide React**: Our consistent, sharp iconography.

---

## 4. Current Status
We are currently in **Phase 2 Refined**. 
- The UI is 100% complete and dark-mode ready.
- The Backend is 100% ready to store and match alerts.
- **Next Step**: Plugging in the live API for real-world price data.
