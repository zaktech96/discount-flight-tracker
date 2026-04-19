# Flight Guardian — Social Media Playbook

A working doc for what to post, where, and when. Organised around the current product reality (friendly tracker, glass UI, RR7 + Convex + Clerk + Vercel stack) — not the original "radar terminal" pitch.

---

## The Positioning (one sentence)

**"Tell us the flight and the price you'd pay. We'll email you the moment it drops."**

Set-and-forget flight alerts. Not another search engine. Not another newsletter. A watchdog.

---

## Platforms & Who's There

| Platform | Audience | Post cadence | Voice |
| --- | --- | --- | --- |
| **X / Twitter** | Travel hackers, indie hackers, devs building in public | 3–5/week | Short, concrete, screenshots |
| **LinkedIn** | Founders, PMs, ex-colleagues, devs | 1–2/week | Lessons from building, tech deep-dives |
| **Reddit** (r/travel, r/flights, r/churning, r/SaaS, r/webdev) | Deal hunters & builders | 1/week, never spammy | Answer first, mention product only when asked |
| **Indie Hackers / Product Hunt** | Builder community | Launch moments only | Milestone + numbers |
| **TikTok / Shorts** (optional) | Gen-Z travel audience | 1–2/week if you've got the stomach | "Flight hack" demos |

---

## Four Content Pillars

### 1. 🪙 Save Stories ("we caught this drop")
Real screenshots of price drops the tracker flagged. The single highest-leverage content type — it *is* the product demo.

**What to include**
- Route + dates
- Price before → price after (big numbers)
- Days/hours the watch was active
- Link to start tracking the same route

**Example post (X):**
> Caught one this morning 🎯
> LHR → JFK (14 May)
> £612 → £438 in 36 hours
> Someone's weekend just got £174 cheaper.
> Track any flight free → flight-guardian.com

---

### 2. 🛠️ Build-in-Public
Screenshots from the journal. Devs reward honesty; travel folks don't care but aren't the audience here.

**Angles**
- "Convex + Clerk auth deployment hurdles. Schema validation failing on production because `VITE_CLERK_FRONTEND_API_URL` was missing from the Convex dashboard env variables. Always sync your Clerk keys!"
- "Resolving nasty React/Convex peer dependency conflicts. Sometimes you just have to nuke `node_modules` and `npm install --legacy-peer-deps` to get the CLI working again."
- "Here's what the glass UI looks like — backdrop-blur is pretty on desktop, murder on mobile. Here's how I gated it:" + code snippet
- "React Router 7 + Clerk middleware nearly killed me. The one line that fixed it."
- "Swapped gradient placeholders for real destination photos. Delta in how the page *feels* is massive."
- Before/after of the ProductDemo (3-route rotation + typing caret)

**Why LinkedIn loves this:** genuine lessons > humble-brag announcements.

---

### 3. ✈️ Travel Intelligence
Findings from the data — even if the data is small, package it well.

**Post formats**
- "Cheapest day to book X route, based on N tracked flights"
- "Which airlines drop prices most often in the last 14 days before departure"
- "The £/month a flight watcher typically saves"
- Myth-busting: "Tuesday booking is a myth. Here's what our data actually shows."

Once there's real Amadeus data (Phase 1), this pillar gets serious weight.

---

### 4. 🧪 Behind the Product
Short explainers of *how* the product works. Demystifies and markets simultaneously.

**Angles**
- "Why we don't show flights — we watch them"
- "How we pick the right target price" (the 50-below heuristic in `track.$id.tsx`)
- The email template when a deal fires
- The journey from "I need to book this" to "I'll book when it hits £X"

---

## Ready-to-Post Drafts (drop these in when you have capacity)

### Launch post (X / LinkedIn)
> Built a thing.
> **Flight Guardian** — you pick a flight + the price you'd pay. We email you when it drops.
> No searching. No daily checking. No 47 open tabs.
> Free to use. Glassy UI. Real flights.
> → discount-flight-tracker.vercel.app

### Reddit (r/travel) — lead with value, not product
> **A tool I made to stop checking flight prices 6× a day**
> I hated obsessively refreshing Skyscanner before every trip. So I built a tracker that emails me the second the price hits my target.
> It's free, no signup-wall — happy to share the link in the comments if it's useful to anyone else.

### Tech post (LinkedIn)
> 4 weeks ago this project was a blank Vite template.
> This week it shipped: React Router 7 SSR + Clerk middleware + Convex real-time DB + a glass UI on Vercel.
> Biggest lessons:
> 1. RR7 middleware needs `future.v7_middleware: true` — cost me a weekend.
> 2. `backdrop-blur` on mobile will tank your FPS. Gate it with `@media (min-width: 768px)`.
> 3. Real destination photos > gradient placeholders. The page went from "template" to "product" in one PR.
> Full write-up: [link to JOURNAL.md on GitHub]

### Save Story (X)
> 2 hours after I added this route to the tracker:
> MAN → DXB dropped £395 → £340.
> This is why I built the thing.
> [screenshot]

---

## Hashtags (use sparingly)

**Travel side:** `#CheapFlights` `#TravelDeals` `#FlightDeals` `#TravelHacks`
**Builder side:** `#BuildInPublic` `#IndieHackers` `#ReactRouter` `#Convex`
**Meta:** `#FlightGuardian`

Don't stack more than 2–3. Hashtag salad reads as spam.

---

## Launch Moment Plan

Hold the "launch" post until **at least 5 real save stories exist.** A launch without proof is just noise.

| Week | Action |
| --- | --- |
| -2 | Quiet posts: build-in-public, UI screenshots, lessons. Start collecting save stories. |
| -1 | Warm up email list / Discord / follower base. Tease: "shipping Friday." |
| 0 | Launch post on X + LinkedIn + Product Hunt + Indie Hackers + 2 subreddits. Full journal link. |
| +1 | Reply-guy mode: answer every question, post save stories daily. |
| +2 | "One week in: here's what we learned" post with metrics. |

---

## What NOT to Post

- **Fake testimonials.** The product page doesn't have them. The socials shouldn't either.
- **"We're revolutionising travel."** We're not — we're emailing people when prices drop.
- **Screenshots with any real user's email or flight.** Always use seeded/demo data or anonymise.
- **Daily "still building 👷" with no substance.** Silence beats filler.

---

## Metrics to Track (tie to Vercel Analytics + UTM tags)

| Metric | Why it matters |
| --- | --- |
| Visits from each post | Which platform actually converts |
| Track-flight form submissions | The only conversion event that matters pre-email |
| Email opens on alert fires | Proof the core loop works |
| Save story engagement rate | Which routes/savings drive sharing |

Tag every outbound link with `?utm_source=twitter&utm_campaign=launch` etc. so you can actually read the data.

---

## One-Line North Star

> Every post either (a) proves the tracker works, (b) teaches something real, or (c) makes someone want to set their first alert. Anything else is filler.
