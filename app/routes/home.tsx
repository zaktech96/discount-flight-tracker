import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: "Flight Guardian — Never overpay for flights again" },
  {
    name: "description",
    content:
      "Pick a route, set a target price, and we'll email you the moment it drops. Free to use, no credit card.",
  },
];
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
  Clock,
  TrendingDown,
  Coffee,
  Calendar,
  MapPin,
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";

const DEMO_CAPTIONS = [
  "Search",
  "Pick a deal",
  "Set your price",
  "Get the ping",
];

const DEMO_DURATIONS = [4200, 3600, 3200, 4500];

const DESTINATIONS = [
  {
    city: "Paris",
    code: "CDG",
    from: 189,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Tokyo",
    code: "NRT",
    from: 438,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "New York",
    code: "JFK",
    from: 298,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Dubai",
    code: "DXB",
    from: 315,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Lisbon",
    code: "LIS",
    from: 149,
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bali",
    code: "DPS",
    from: 489,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
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

function ProductDemo() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setTimeout(
      () => setStage((s) => (s + 1) % DEMO_CAPTIONS.length),
      DEMO_DURATIONS[stage],
    );
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl animate-blob-drift" />
        <div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl animate-blob-drift"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Watch it work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            The whole journey, in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">one minute</span>
              <span
                aria-hidden
                className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
              />
            </span>
            .
          </h2>
          <p className="text-slate-600 mt-4 text-lg max-w-xl mx-auto">
            No reading. No sign-up. Just watch Flight Guardian go from search
            to savings.
          </p>
        </div>

        {/* Faux browser */}
        <div className="relative rounded-3xl bg-white shadow-2xl shadow-sky-200/60 border border-slate-100 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 h-7 max-w-xs mx-auto rounded-md bg-white border border-slate-200 px-3 text-xs text-slate-500 flex items-center justify-center gap-2">
              <Lock className="h-3 w-3" />
              flightguardian.app
            </div>
            <div className="w-14" />
          </div>

          {/* Stage content — keyed so it remounts and replays animations */}
          <div
            key={stage}
            className="p-6 md:p-10 min-h-[420px] bg-gradient-to-b from-white to-sky-50/30 animate-fade-in"
          >
            {stage === 0 && <DemoSceneSearch />}
            {stage === 1 && <DemoSceneResults />}
            {stage === 2 && <DemoSceneTracking />}
            {stage === 3 && <DemoSceneAlert />}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-slate-100 relative overflow-hidden">
            <div
              key={`bar-${stage}`}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 to-indigo-500"
              style={{
                animation: `progress ${DEMO_DURATIONS[stage]}ms linear forwards`,
              }}
            />
          </div>
        </div>

        {/* Stage dots */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          {DEMO_CAPTIONS.map((cap, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStage(i)}
              className={`group flex items-center gap-2 transition-colors ${
                stage === i
                  ? "text-sky-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  stage === i
                    ? "bg-sky-600 text-white shadow-md shadow-sky-200 scale-110"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-sm font-medium">{cap}</span>
            </button>
          ))}
        </div>

        <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
      </div>
    </section>
  );
}

function DemoField({
  label,
  value,
  icon: Icon,
  delay,
  active,
}: {
  label: string;
  value: string;
  icon: typeof MapPin;
  delay: number;
  active?: boolean;
}) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
    >
      <span className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-sky-600" /> {label}
      </span>
      <div
        className={`rounded-xl border-2 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 flex items-center min-h-[46px] ${
          active ? "border-sky-400 shadow-sm shadow-sky-100" : "border-slate-200"
        }`}
      >
        {value}
        {active && (
          <span className="inline-block w-0.5 h-4 bg-sky-600 ml-1 animate-pulse" />
        )}
      </div>
    </div>
  );
}

function DemoSceneSearch() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Search className="h-4 w-4 text-sky-600" />
        <span>Tell us where you want to fly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <DemoField
          label="Flying from"
          value="London (LHR)"
          icon={MapPin}
          delay={100}
          active
        />
        <DemoField
          label="Flying to"
          value="New York (JFK)"
          icon={Plane}
          delay={900}
          active
        />
        <DemoField
          label="When"
          value="May 14, 2026"
          icon={Calendar}
          delay={1700}
          active
        />
      </div>
      <div
        className="flex items-center gap-3 animate-fade-up"
        style={{ animationDelay: "2600ms", animationFillMode: "backwards" }}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 animate-pulse"
        >
          Search flights
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="text-xs text-slate-400 italic">tap!</span>
      </div>
    </div>
  );
}

function DemoSceneResults() {
  const deals = [
    {
      airline: "Virgin Atlantic",
      price: 380,
      original: 490,
      duration: "8h 35m",
      highlight: true,
    },
    {
      airline: "British Airways",
      price: 420,
      original: 560,
      duration: "8h 20m",
    },
    { airline: "United", price: 485, original: 640, duration: "11h 20m" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 text-sky-700 px-2.5 py-1 text-xs font-semibold">
          <MapPin className="h-3 w-3" /> London → New York
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-semibold">
          <Calendar className="h-3 w-3" /> May 14, 2026
        </span>
        <span className="text-xs text-slate-400 ml-auto">3 great deals</span>
      </div>
      <div className="space-y-2.5">
        {deals.map((f, i) => (
          <div
            key={i}
            className={`animate-fade-up rounded-xl bg-white p-4 flex items-center justify-between gap-3 transition-all ${
              f.highlight
                ? "border-2 border-sky-300 shadow-lg shadow-sky-100"
                : "border border-slate-100"
            }`}
            style={{
              animationDelay: `${i * 220}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <Plane className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">
                  {f.airline}
                </p>
                <p className="text-xs text-slate-500">
                  Direct · {f.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 leading-none">
                  £{f.price}
                </p>
                <p className="text-xs text-slate-400 line-through">
                  £{f.original}
                </p>
              </div>
              {f.highlight && (
                <span className="rounded-full bg-sky-600 text-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap animate-pulse">
                  Track →
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSceneTracking() {
  return (
    <div className="space-y-5">
      <div className="animate-fade-up rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
          <Plane className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm">
            London → New York
          </p>
          <p className="text-xs text-slate-500">
            Virgin Atlantic · May 14 · currently £380
          </p>
        </div>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shrink-0">
          <Check className="h-3 w-3 text-emerald-500" /> Selected
        </span>
      </div>
      <div
        className="animate-fade-up"
        style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
      >
        <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
          <Bell className="h-3.5 w-3.5 text-sky-600" /> Ping me when it drops
          below
        </label>
        <div className="rounded-xl border-2 border-sky-400 bg-white px-4 py-4 flex items-center justify-between shadow-sm shadow-sky-100">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">£340</span>
            <span className="inline-block w-0.5 h-7 bg-sky-600 ml-1 animate-pulse" />
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 font-semibold">
            £40 under current
          </span>
        </div>
      </div>
      <div
        className="animate-fade-up flex items-center gap-3"
        style={{ animationDelay: "1300ms", animationFillMode: "backwards" }}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 animate-pulse"
        >
          <Bell className="h-4 w-4" />
          Start watching
        </button>
        <span className="text-xs text-slate-400 italic">
          then go live your life
        </span>
      </div>
    </div>
  );
}

function DemoSceneAlert() {
  return (
    <div className="relative min-h-[360px]">
      {/* Dimmed dashboard in background */}
      <div className="opacity-40 pointer-events-none select-none">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            My tracked flights
          </h3>
          <span className="text-xs text-slate-500">1 watching</span>
        </div>
        <div className="rounded-xl bg-white border border-slate-100 p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
            <Plane className="h-5 w-5 text-sky-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">London → New York</p>
            <p className="text-xs text-slate-500">Alert set at £340</p>
          </div>
        </div>
      </div>

      {/* Email notification sliding in */}
      <div
        className="absolute top-0 right-0 left-0 sm:left-auto sm:max-w-sm animate-fade-up"
        style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
      >
        <div className="rounded-2xl bg-white shadow-2xl shadow-emerald-200/50 border border-emerald-100 p-5">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
            <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center">
              <Mail className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                Flight Guardian
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                to you · just now
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              New
            </span>
          </div>
          <p className="font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
            <TrendingDown className="h-4 w-4 text-emerald-600" />
            Price just dropped!
          </p>
          <p className="text-sm text-slate-600 leading-snug mb-4">
            Your <span className="font-semibold">London → New York</span>{" "}
            flight hit{" "}
            <span className="font-bold text-emerald-600">£340</span> — down{" "}
            <span className="font-semibold">£40</span> from when you started
            watching.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
          >
            Book now <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Floating sparkles */}
      <Sparkles className="absolute top-4 left-6 h-5 w-5 text-amber-400 animate-float-gentle" />
      <Sparkles
        className="absolute top-24 left-1/3 h-4 w-4 text-sky-400 animate-float-gentle"
        style={{ animationDelay: "0.8s" }}
      />
      <Sparkles
        className="absolute bottom-12 left-12 h-3 w-3 text-emerald-400 animate-float-gentle"
        style={{ animationDelay: "1.4s" }}
      />
    </div>
  );
}

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

      <ProductDemo />

      {/* WHY TRAVELERS LOVE US — Bento layout */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-white to-sky-50 overflow-hidden">
        {/* Soft background glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl animate-blob-drift" />
          <div
            className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl animate-blob-drift"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              What makes it magic
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              We do the hunting.{" "}
              <span className="relative inline-block">
                <span className="relative z-10">You do the holidaying.</span>
                <span
                  aria-hidden
                  className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
                />
              </span>
            </h2>
            <p className="text-slate-600 mt-5 text-lg max-w-xl mx-auto">
              Here's what happens behind the scenes while you're busy living
              your life.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
            {/* BIG card — live price-watching demo */}
            <div className="md:col-span-4 md:row-span-2 group relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-8 md:p-10 text-white overflow-hidden shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-sky-200 transition-all duration-500">
              {/* Decorative plane */}
              <Plane className="absolute -top-2 -right-2 h-32 w-32 text-white/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-xs font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live · last checked 2 min ago
                </div>

                <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-tight">
                  We check the price every hour.
                  <br />
                  <span className="text-sky-300">
                    You get a ping the moment it drops.
                  </span>
                </h3>

                <p className="mt-3 text-slate-300 leading-relaxed max-w-md">
                  No refreshing travel sites at 2am. No "did I miss it?"
                  regret. Just a friendly email when it's time to book.
                </p>

                {/* Mini price chart */}
                <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-slate-400">
                      London → New York · last 7 days
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-sm">
                      <TrendingDown className="h-4 w-4" /> -34%
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {[72, 78, 75, 82, 70, 58, 48].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-md animate-fade-up ${
                          i === 6
                            ? "bg-gradient-to-t from-emerald-400 to-emerald-300 shadow-lg shadow-emerald-500/30"
                            : "bg-white/20"
                        }`}
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 90}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500">Mon</span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      Today
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-sm text-slate-300">
                      Today's price
                    </span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">
                        £340
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        £520
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small — savings stat */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100 hover:border-emerald-200 transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <PiggyBank className="h-6 w-6" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-slate-900">£220</span>
                <span className="text-sm font-semibold text-slate-500">
                  avg saved
                </span>
              </div>
              <p className="text-slate-600 mt-2 leading-relaxed">
                per booking, according to our members. Some save way more.
              </p>
              <div
                aria-hidden
                className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-100/0 group-hover:bg-emerald-100/60 transition-colors duration-500"
              />
            </div>

            {/* Small — setup time */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-100 hover:border-amber-200 transition-all duration-300">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                <Clock className="h-6 w-6" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold text-slate-900">30s</span>
                <span className="text-sm font-semibold text-slate-500">
                  to set up
                </span>
              </div>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Pick your route, set a target price, go make a cup of tea.
              </p>
              <Coffee
                aria-hidden
                className="absolute bottom-4 right-4 h-16 w-16 text-amber-100 group-hover:text-amber-200 group-hover:rotate-12 transition-all duration-500"
              />
            </div>

            {/* Medium — no spam */}
            <div className="md:col-span-3 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-white border border-slate-100 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100 hover:border-rose-200 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Zero spam. Promise.</h3>
                  <p className="text-slate-600 mt-1.5 leading-relaxed">
                    The only email we'll send you is{" "}
                    <span className="font-semibold text-slate-800">
                      "Your flight just dropped £180."
                    </span>{" "}
                    That's the whole business.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium — any route */}
            <div className="md:col-span-3 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-sky-50 border border-slate-100 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-200 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    Every route. Every airline.
                  </h3>
                  <p className="text-slate-600 mt-1.5 leading-relaxed">
                    London to Lagos. Boston to Bali. Tokyo to Toronto. If it's
                    flying, we're watching.
                  </p>
                </div>
              </div>
            </div>
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
                <img
                  src={dest.image}
                  alt={`${dest.city} cityscape`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 group-hover:from-black/80 transition-colors duration-500" />

                {/* Plane flies on hover */}
                <Plane className="absolute top-6 right-6 h-6 w-6 text-white drop-shadow-md group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-2xl font-bold drop-shadow">
                    {dest.city}
                  </div>
                  <div className="text-white/80 text-sm tracking-wide">
                    {dest.code}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-white/70 text-xs">from</div>
                      <div className="text-xl font-semibold drop-shadow">
                        £{dest.from}
                      </div>
                    </div>
                    <span className="rounded-full bg-white/25 backdrop-blur-md border border-white/30 px-3 py-1 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
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
