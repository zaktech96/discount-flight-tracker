import { Link } from "react-router";
import {
  Plane,
  Bell,
  PiggyBank,
  Search,
  Heart,
  Check,
  ChevronDown,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";

const DESTINATIONS = [
  { city: "Paris", code: "CDG", from: 189, gradient: "from-rose-400 via-pink-500 to-fuchsia-500" },
  { city: "Tokyo", code: "NRT", from: 438, gradient: "from-fuchsia-500 via-purple-500 to-indigo-600" },
  { city: "New York", code: "JFK", from: 298, gradient: "from-sky-500 via-blue-500 to-indigo-600" },
  { city: "Dubai", code: "DXB", from: 315, gradient: "from-amber-400 via-orange-500 to-rose-500" },
  { city: "Lisbon", code: "LIS", from: 149, gradient: "from-teal-400 via-cyan-500 to-sky-500" },
  { city: "Bali", code: "DPS", from: 489, gradient: "from-emerald-400 via-teal-500 to-cyan-600" },
];

const FAQS = [
  {
    q: "Is Flight Guardian really free?",
    a: "Yep, 100% free to track flights. No credit card, no trial, no hidden catches. We only make money if you choose to upgrade for premium features later on.",
  },
  {
    q: "How quickly will I get an alert when prices drop?",
    a: "The moment we spot a drop — usually within minutes. We check thousands of routes every hour, so you won't miss anything.",
  },
  {
    q: "Can I track flights from any airport?",
    a: "Absolutely. We watch flights from airports all over the world, whether you're flying from London, Lagos, or Los Angeles.",
  },
  {
    q: "What happens when my flight hits the target price?",
    a: "You'll get a friendly email with a direct link to book on the airline's site. No middleman, no markup — just you and a great deal.",
  },
  {
    q: "Can I stop tracking a flight?",
    a: "Of course! Head to your dashboard, click the remove button, and it's gone. We won't email you about it again.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900 overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-28 pb-24 px-6">
        {/* Soft animated background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl animate-blob-drift" />
          <div
            className="absolute top-40 right-1/4 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl animate-blob-drift"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-amber-100/50 blur-3xl animate-blob-drift"
            style={{ animationDelay: "6s" }}
          />

          {/* Subtle plane drifting across */}
          <svg
            viewBox="0 0 24 24"
            className="absolute h-8 w-8 text-sky-500/40 animate-fly-across"
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-slate-100 text-slate-700 px-4 py-1.5 text-sm font-medium animate-fade-up"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Watching <span className="font-semibold text-sky-600">12,843</span> flights right now
          </span>

          <h1 className="mt-8 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-up delay-75">
            Book flights at the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-sky-600">perfect moment</span>
              <span
                aria-hidden
                className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
              />
            </span>
            .
          </h1>

          <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up delay-150">
            Tell us where you want to go. We'll watch prices 24/7 and email you
            when it's time to book — so you never overpay again.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 animate-fade-up delay-300">
            <Link
              to="/search"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 text-white px-8 py-4 font-semibold shadow-lg shadow-sky-200 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-300 hover:-translate-y-0.5 transition-all"
            >
              <Search className="h-5 w-5 transition-transform group-hover:rotate-6" />
              Find cheap flights
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 border border-slate-200 px-8 py-4 font-semibold hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all"
            >
              My tracked flights
            </Link>
          </div>

          <p className="mt-4 text-slate-500 text-sm animate-fade-up delay-450">
            Free to get started · No credit card needed
          </p>

          {/* Price-drop preview card */}
          <div className="mt-16 max-w-md mx-auto animate-fade-up delay-600">
            <div className="rounded-2xl bg-white shadow-xl shadow-sky-100 border border-slate-100 p-5 text-left flex items-center gap-4 animate-float-gentle hover:shadow-2xl hover:shadow-sky-200 transition-shadow">
              <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Bell className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Price dropped!
                </p>
                <p className="text-slate-900 font-semibold mt-0.5">
                  London → New York
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900">£340</span>
                  <span className="text-sm text-slate-400 line-through">£520</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save 35%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "£2.3M+", label: "Saved by travelers" },
            { value: "12,000+", label: "Happy flyers" },
            { value: "£220", label: "Average savings per trip" },
            { value: "4.9★", label: "User rating" },
          ].map(({ value, label }) => (
            <div key={label} className="group">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                {value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Three steps. Zero stress.
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              Set it up in a minute, save hundreds for years.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                step: "1",
                title: "Tell us your trip",
                body: "Pick your route and dates. Takes about 30 seconds — promise.",
              },
              {
                icon: Heart,
                step: "2",
                title: "Set your happy price",
                body: "Let us know what feels good to pay. No pressure to book now — we'll wait.",
              },
              {
                icon: Bell,
                step: "3",
                title: "Get a friendly ping",
                body: "When it drops, you get an email with a direct booking link. Book in minutes.",
              },
            ].map(({ icon: Icon, step, title, body }, i) => (
              <div
                key={step}
                className="group relative rounded-2xl bg-white border border-slate-100 p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-100 hover:border-sky-200 transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold shadow-md shadow-sky-200 group-hover:scale-110 transition-transform">
                    {step}
                  </span>
                  <Icon className="h-5 w-5 text-sky-600 transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRAVELERS LOVE US */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              Why you'll love it
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built to save you money. And time.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: PiggyBank, title: "Save hundreds per trip", body: "Our members typically save 30–50% by catching flights at the perfect moment." },
              { icon: Zap, title: "Instant email alerts", body: "The second your flight drops, your inbox pings. Book before the deal disappears." },
              { icon: Globe, title: "Works for any route", body: "Weekend getaways, dream honeymoons, back-home visits — track as many trips as you like." },
              { icon: Heart, title: "No spam, ever", body: "We only email you about deals that hit your price. No newsletters, no sales pitches." },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100 hover:border-sky-200 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center text-sky-600 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{body}</p>

                {/* Decorative hover corner */}
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-100/0 group-hover:bg-sky-100/50 transition-colors duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Popular right now
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Where are you dreaming of?
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              Some of the best deals our members are tracking today.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.code}
                to="/search"
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dest.gradient} group-hover:scale-110 transition-transform duration-700 ease-out animate-gradient-shift`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Plane flies on hover */}
                <Plane className="absolute top-6 right-6 h-6 w-6 text-white/70 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-2xl font-bold">{dest.city}</div>
                  <div className="text-white/70 text-sm">{dest.code}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="text-white/60 text-xs">from</div>
                      <div className="text-lg font-semibold">£{dest.from}</div>
                    </div>
                    <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Track it →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              Stories from travelers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Real people. Real savings.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stars: 5,
                quote: "Saved us £400 on our family trip to Lisbon. I set the alert, went about my week, and got a ping on Tuesday morning. Booked in 5 minutes.",
                name: "Sarah M.",
                role: "Traveler from Manchester",
              },
              {
                stars: 5,
                quote: "I'd been eyeing a trip to Tokyo for months and couldn't justify the price. Woke up to an email saying it dropped £180. Booked that same day.",
                name: "Jordan K.",
                role: "Flew to Tokyo",
              },
              {
                stars: 5,
                quote: "Honestly the lowest-effort, highest-reward app I use. Set it once, forget about it, and save money.",
                name: "Priya S.",
                role: "Frequent flyer",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <svg key={j} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              Good questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Quick answers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-white border border-slate-100 p-5 hover:border-sky-200 transition-colors open:shadow-md open:border-sky-200"
              >
                <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 cursor-pointer list-none">
                  {q}
                  <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-600 p-12 md:p-16 text-white shadow-xl shadow-sky-200 overflow-hidden animate-gradient-shift">
            {/* Decorative circles */}
            <div
              aria-hidden
              className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 animate-blob-drift"
            />
            <div
              aria-hidden
              className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 animate-blob-drift"
              style={{ animationDelay: "4s" }}
            />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready for your next trip?
              </h2>
              <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
                Start watching a flight now. It's free, and you can cancel the
                alert any time.
              </p>
              <Link
                to="/search"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-sky-700 px-8 py-4 font-semibold shadow-lg hover:bg-slate-50 hover:scale-[1.02] transition-all"
              >
                <Plane className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12" />
                Start tracking a flight
              </Link>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-sky-100">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Free to start
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
