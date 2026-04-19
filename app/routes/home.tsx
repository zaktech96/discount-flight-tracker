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
  Frown,
  X,
} from "lucide-react";

const DEMO_CAPTIONS = [
  "Search",
  "Pick a deal",
  "Set your price",
  "Get the ping",
];

// Slower + more breathable — roughly 1.7× the previous timings.
// Stage 0 (search) is longest because the typing effect plays out there.
const DEMO_DURATIONS = [7200, 5400, 4800, 6200];

type DemoRoute = {
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  date: string;
  airline: string;
  duration: string;
  current: number;
  original: number;
  target: number;
  drop: number;
  deals: {
    airline: string;
    price: number;
    original: number;
    duration: string;
    highlight?: boolean;
  }[];
};

const DEMO_ROUTES: DemoRoute[] = [
  {
    fromCity: "London",
    fromCode: "LHR",
    toCity: "New York",
    toCode: "JFK",
    date: "May 14, 2026",
    airline: "Virgin Atlantic",
    duration: "8h 35m",
    current: 380,
    original: 490,
    target: 340,
    drop: 40,
    deals: [
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
    ],
  },
  {
    fromCity: "Manchester",
    fromCode: "MAN",
    toCity: "Dubai",
    toCode: "DXB",
    date: "Jun 02, 2026",
    airline: "Emirates",
    duration: "6h 45m",
    current: 395,
    original: 530,
    target: 350,
    drop: 45,
    deals: [
      {
        airline: "Emirates",
        price: 395,
        original: 530,
        duration: "6h 45m",
        highlight: true,
      },
      {
        airline: "Qatar Airways",
        price: 440,
        original: 580,
        duration: "7h 10m",
      },
      {
        airline: "Turkish Airlines",
        price: 475,
        original: 610,
        duration: "9h 50m",
      },
    ],
  },
  {
    fromCity: "Edinburgh",
    fromCode: "EDI",
    toCity: "Tokyo",
    toCode: "NRT",
    date: "Sep 18, 2026",
    airline: "ANA",
    duration: "12h 10m",
    current: 612,
    original: 820,
    target: 550,
    drop: 62,
    deals: [
      {
        airline: "ANA",
        price: 612,
        original: 820,
        duration: "12h 10m",
        highlight: true,
      },
      { airline: "JAL", price: 655, original: 840, duration: "12h 25m" },
      { airline: "Lufthansa", price: 720, original: 910, duration: "14h 30m" },
    ],
  },
];

function useTypewriter(text: string, speed = 70, startDelay = 0) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplay("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(id);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return { display, done };
}

type Destination = {
  city: string;
  code: string;
  country: string;
  region: "Europe" | "Asia" | "Americas";
  vibe: "City" | "Beach" | "Culture";
  from: number;
  wasFrom?: number; // if present, the price recently dropped
  trackers: number; // social proof — how many are watching
  image: string;
};

const DESTINATIONS: Destination[] = [
  {
    city: "Paris",
    code: "CDG",
    country: "France",
    region: "Europe",
    vibe: "City",
    from: 189,
    wasFrom: 217,
    trackers: 142,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Tokyo",
    code: "NRT",
    country: "Japan",
    region: "Asia",
    vibe: "City",
    from: 438,
    trackers: 89,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "New York",
    code: "JFK",
    country: "USA",
    region: "Americas",
    vibe: "City",
    from: 298,
    wasFrom: 340,
    trackers: 203,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Dubai",
    code: "DXB",
    country: "UAE",
    region: "Asia",
    vibe: "City",
    from: 315,
    trackers: 67,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Lisbon",
    code: "LIS",
    country: "Portugal",
    region: "Europe",
    vibe: "Culture",
    from: 149,
    wasFrom: 167,
    trackers: 94,
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bali",
    code: "DPS",
    country: "Indonesia",
    region: "Asia",
    vibe: "Beach",
    from: 489,
    trackers: 156,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Barcelona",
    code: "BCN",
    country: "Spain",
    region: "Europe",
    vibe: "Beach",
    from: 168,
    trackers: 112,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Mexico City",
    code: "MEX",
    country: "Mexico",
    region: "Americas",
    vibe: "Culture",
    from: 345,
    wasFrom: 388,
    trackers: 78,
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bangkok",
    code: "BKK",
    country: "Thailand",
    region: "Asia",
    vibe: "Culture",
    from: 412,
    trackers: 58,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
  },
];

const DESTINATION_FILTERS = [
  "All",
  "Europe",
  "Asia",
  "Americas",
  "Beach",
] as const;
type DestinationFilter = (typeof DESTINATION_FILTERS)[number];

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
  const [routeIndex, setRouteIndex] = useState(0);
  const route = DEMO_ROUTES[routeIndex];

  useEffect(() => {
    const id = setTimeout(() => {
      setStage((s) => {
        const next = (s + 1) % DEMO_CAPTIONS.length;
        // Each time we wrap back to stage 0, rotate to the next route
        if (next === 0) {
          setRouteIndex((r) => (r + 1) % DEMO_ROUTES.length);
        }
        return next;
      });
    }, DEMO_DURATIONS[stage]);
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
            No reading. No sign-up. Just watch Flight Guardian go from search to
            savings.
          </p>
        </div>

        {/* Faux browser */}
        <div className="relative glass-card rounded-3xl shadow-2xl shadow-sky-200/60">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/60 bg-white/40">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 h-7 max-w-xs mx-auto rounded-md glass-input border border-white/60 px-3 text-xs text-slate-500 flex items-center justify-center gap-2">
              <Lock className="h-3 w-3" />
              flightguardian.app
            </div>
            <div className="w-14" />
          </div>

          {/* Stage content — keyed by stage+route so it remounts and replays animations on each change */}
          <div
            key={`${routeIndex}-${stage}`}
            className="p-6 md:p-10 min-h-[420px] bg-gradient-to-b from-white/60 to-sky-50/40 animate-fade-in"
          >
            {stage === 0 && (
              <DemoSceneSearch route={route} duration={DEMO_DURATIONS[0]} />
            )}
            {stage === 1 && <DemoSceneResults route={route} />}
            {stage === 2 && <DemoSceneTracking route={route} />}
            {stage === 3 && <DemoSceneAlert route={route} />}
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

function DemoTypingField({
  label,
  icon: Icon,
  text,
  startDelay,
  speed = 65,
  activeNow,
}: {
  label: string;
  icon: typeof MapPin;
  text: string;
  startDelay: number;
  speed?: number;
  activeNow: boolean;
}) {
  const { display, done } = useTypewriter(text, speed, startDelay);
  const borderClass = activeNow
    ? "border-sky-400 shadow-sm shadow-sky-100"
    : done
      ? "border-emerald-300"
      : "border-slate-200";
  return (
    <div>
      <span className="text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-sky-600" /> {label}
      </span>
      <div
        className={`rounded-xl border-2 glass-input px-3.5 py-3 text-sm font-medium text-slate-800 flex items-center min-h-[46px] transition-colors ${borderClass}`}
      >
        <span className="truncate">{display}</span>
        {activeNow && !done && (
          <span className="inline-block w-0.5 h-4 bg-sky-600 ml-0.5 animate-pulse" />
        )}
        {done && (
          <Check className="h-3.5 w-3.5 text-emerald-500 ml-auto shrink-0" />
        )}
      </div>
    </div>
  );
}

function DemoSceneSearch({
  route,
  duration,
}: {
  route: DemoRoute;
  duration: number;
}) {
  // Sequence the typing so fields fill one after another.
  // Each field starts after the previous one would have finished.
  const fromText = `${route.fromCity} (${route.fromCode})`;
  const toText = `${route.toCity} (${route.toCode})`;
  const dateText = route.date;

  const fromStart = 300;
  const fromEnd = fromStart + fromText.length * 65;
  const toStart = fromEnd + 200;
  const toEnd = toStart + toText.length * 65;
  const dateStart = toEnd + 200;
  const dateEnd = dateStart + dateText.length * 65;

  // Track elapsed time locally so we can highlight the field currently typing
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    const stopAt = setTimeout(() => clearInterval(id), duration);
    return () => {
      clearInterval(id);
      clearTimeout(stopAt);
    };
  }, [duration]);

  const activeField =
    elapsed < fromEnd ? 0 : elapsed < toEnd ? 1 : elapsed < dateEnd ? 2 : 3;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Search className="h-4 w-4 text-sky-600" />
        <span>Tell us where you want to fly</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <DemoTypingField
          label="Flying from"
          icon={MapPin}
          text={fromText}
          startDelay={fromStart}
          activeNow={activeField === 0}
        />
        <DemoTypingField
          label="Flying to"
          icon={Plane}
          text={toText}
          startDelay={toStart}
          activeNow={activeField === 1}
        />
        <DemoTypingField
          label="When"
          icon={Calendar}
          text={dateText}
          startDelay={dateStart}
          activeNow={activeField === 2}
        />
      </div>
      <div
        className="flex items-center gap-3 animate-fade-up"
        style={{
          animationDelay: `${dateEnd + 200}ms`,
          animationFillMode: "backwards",
        }}
      >
        <button
          type="button"
          className="glass-button inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 animate-pulse"
        >
          Search flights
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="text-xs text-slate-400 italic">tap!</span>
      </div>
    </div>
  );
}

function DemoSceneResults({ route }: { route: DemoRoute }) {
  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 text-sky-700 px-2.5 py-1 text-xs font-semibold">
          <MapPin className="h-3 w-3" /> {route.fromCity} → {route.toCity}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-semibold">
          <Calendar className="h-3 w-3" /> {route.date}
        </span>
        <span className="text-xs text-slate-400 ml-auto">
          {route.deals.length} great deals
        </span>
      </div>
      <div className="space-y-2.5">
        {route.deals.map((f, i) => (
          <div
            key={i}
            className={`animate-fade-up rounded-xl glass-card-soft p-4 flex items-center justify-between gap-3 transition-all ${
              f.highlight ? "ring-2 ring-sky-300 shadow-lg shadow-sky-100" : ""
            }`}
            style={{
              animationDelay: `${i * 260}ms`,
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
                <p className="text-xs text-slate-500">Direct · {f.duration}</p>
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

function DemoSceneTracking({ route }: { route: DemoRoute }) {
  const shortDate = route.date.split(",")[0];
  return (
    <div className="space-y-5">
      <div className="animate-fade-up rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
          <Plane className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-900 text-sm">
            {route.fromCity} → {route.toCity}
          </p>
          <p className="text-xs text-slate-500">
            {route.airline} · {shortDate} · currently £{route.current}
          </p>
        </div>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shrink-0">
          <Check className="h-3 w-3 text-emerald-500" /> Selected
        </span>
      </div>
      <div
        className="animate-fade-up"
        style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
      >
        <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
          <Bell className="h-3.5 w-3.5 text-sky-600" /> Ping me when it drops
          below
        </label>
        <div className="rounded-xl border-2 border-sky-400 glass-input px-4 py-4 flex items-center justify-between shadow-sm shadow-sky-100">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-slate-900">
              £{route.target}
            </span>
            <span className="inline-block w-0.5 h-7 bg-sky-600 ml-1 animate-pulse" />
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 font-semibold">
            £{route.drop} under current
          </span>
        </div>
      </div>
      <div
        className="animate-fade-up flex items-center gap-3"
        style={{ animationDelay: "1600ms", animationFillMode: "backwards" }}
      >
        <button
          type="button"
          className="glass-button inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 animate-pulse"
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

function DemoSceneAlert({ route }: { route: DemoRoute }) {
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
        <div className="rounded-xl glass-card-soft p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
            <Plane className="h-5 w-5 text-sky-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">
              {route.fromCity} → {route.toCity}
            </p>
            <p className="text-xs text-slate-500">
              Alert set at £{route.target}
            </p>
          </div>
        </div>
      </div>

      {/* Email notification sliding in */}
      <div
        className="absolute top-0 right-0 left-0 sm:left-auto sm:max-w-sm animate-fade-up"
        style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
      >
        <div className="glass-card-soft rounded-2xl shadow-2xl shadow-emerald-200/50 p-5">
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
            Your{" "}
            <span className="font-semibold">
              {route.fromCity} → {route.toCity}
            </span>{" "}
            flight hit{" "}
            <span className="font-bold text-emerald-600">£{route.target}</span>{" "}
            — down <span className="font-semibold">£{route.drop}</span> from
            when you started watching.
          </p>
          <button
            type="button"
            className="glass-button inline-flex items-center gap-1.5 rounded-full bg-sky-600 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-700 transition"
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

function matchesFilter(dest: Destination, filter: DestinationFilter) {
  if (filter === "All") return true;
  if (filter === "Beach") return dest.vibe === "Beach";
  return dest.region === filter;
}

function DestinationsSection() {
  const [filter, setFilter] = useState<DestinationFilter>("All");
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const visible = DESTINATIONS.filter((d) => matchesFilter(d, filter));

  return (
    <section className="py-24 px-6 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
      >
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-sky-200/40 blur-3xl animate-blob-drift" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-indigo-200/30 blur-3xl animate-blob-drift"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Popular right now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Where are you dreaming of?
          </h2>
          <p className="text-slate-600 mt-3 text-lg">
            Tap a destination to start tracking — we'll ping you when it drops.
          </p>
        </div>

        {/* Filter pills */}
        <div
          role="tablist"
          aria-label="Filter destinations"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {DESTINATION_FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  active
                    ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200 scale-105"
                    : "glass-card-soft text-slate-700 border-white/70 hover:border-sky-200 hover:text-sky-700 hover:-translate-y-0.5"
                }`}
              >
                {f === "All" ? "All deals" : f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        {visible.length === 0 ? (
          <div className="glass-card text-center rounded-2xl p-10 text-slate-600">
            No matches yet — try another filter.
          </div>
        ) : (
          <div key={filter} className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {visible.map((dest, i) => {
              const hovered = hoveredCode === dest.code;
              const savings = dest.wasFrom ? dest.wasFrom - dest.from : 0;

              return (
                <Link
                  key={dest.code}
                  to="/search"
                  onMouseEnter={() => setHoveredCode(dest.code)}
                  onMouseLeave={() =>
                    setHoveredCode((c) => (c === dest.code ? null : c))
                  }
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-sky-400/30 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-fade-up focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
                  style={{ animationDelay: `${i * 70}ms` }}
                  aria-label={`Track flights to ${dest.city}, ${dest.country}, from £${dest.from}`}
                >
                  <img
                    src={dest.image}
                    alt={`${dest.city} cityscape`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-500" />

                  {/* Top-left: live tracker count */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    {dest.trackers} tracking
                  </div>

                  {/* Top-right: dropped badge if applicable, else plane */}
                  {dest.wasFrom ? (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2.5 py-1 text-[11px] font-bold shadow-lg animate-float-gentle">
                      <TrendingDown className="h-3 w-3" />
                      -£{savings}
                    </div>
                  ) : (
                    <Plane className="absolute top-4 right-4 h-5 w-5 text-white/90 drop-shadow-md transition-all duration-500 group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:rotate-12" />
                  )}

                  {/* Bottom content */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-bold drop-shadow">
                        {dest.city}
                      </span>
                      <span className="text-white/70 text-xs font-medium">
                        {dest.code}
                      </span>
                    </div>
                    <div className="text-white/75 text-xs tracking-wide mb-3">
                      {dest.country} · {dest.vibe}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-white/70 text-[11px]">from</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-semibold drop-shadow">
                            £{dest.from}
                          </span>
                          {dest.wasFrom ? (
                            <span className="text-xs text-white/60 line-through">
                              £{dest.wasFrom}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <span
                        className={`glass-button rounded-full px-3 py-1.5 text-[13px] font-bold flex items-center gap-1.5 transition-all duration-300 ${
                          hovered
                            ? "opacity-100 translate-y-0 bg-sky-500 text-white border border-sky-400/80 shadow-lg shadow-sky-500/40"
                            : "opacity-0 translate-y-2 bg-white/20 text-white/90 backdrop-blur-md border border-white/30"
                        }`}
                      >
                        Track it <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer hint */}
        <p className="text-center text-sm text-slate-500 mt-10">
          Don't see your route?{" "}
          <Link
            to="/search"
            className="text-sky-600 font-semibold hover:text-sky-700 underline underline-offset-4"
          >
            Search any flight
          </Link>
        </p>
      </div>
    </section>
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
          <span className="glass-card-soft inline-flex items-center gap-2 rounded-full text-slate-700 px-4 py-1.5 text-sm font-medium animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Watching <span className="font-semibold text-sky-600">12,843</span>{" "}
            flights right now
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

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 animate-fade-up delay-300 relative z-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
              <Link
                to="/search"
                className="relative glass-button inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 text-white px-8 py-4 font-semibold shadow-lg shadow-sky-200/50 hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-400/60 hover:-translate-y-0.5 transition-all w-full"
              >
                <Search className="h-5 w-5 transition-transform group-hover:rotate-6" />
                Find cheap flights
              </Link>
            </div>
            <Link
              to="/dashboard"
              className="glass-button-light inline-flex items-center justify-center gap-2 rounded-full bg-white/80 text-slate-900 border border-slate-200/60 px-8 py-4 font-semibold hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              My tracked flights
            </Link>
          </div>

          <p className="mt-4 text-slate-500 text-sm animate-fade-up delay-450">
            Free to get started · No credit card needed
          </p>

          {/* Price-drop preview card */}
          <div className="mt-16 max-w-md mx-auto animate-fade-up delay-600">
            <div className="glass-card rounded-2xl shadow-xl shadow-sky-100 p-5 text-left flex items-center gap-4 animate-float-gentle hover:shadow-2xl hover:shadow-sky-200 transition-shadow">
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
                  <span className="text-2xl font-bold text-slate-900">
                    £340
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    £520
                  </span>
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
            <div className="glass-card-dark md:col-span-4 md:row-span-2 group relative rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-sky-200 transition-all duration-500">
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
                  No refreshing travel sites at 2am. No "did I miss it?" regret.
                  Just a friendly email when it's time to book.
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
            <div className="glass-card md:col-span-2 group relative rounded-3xl p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300">
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
            <div className="glass-card md:col-span-2 group relative rounded-3xl p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-100 transition-all duration-300">
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
            <div className="glass-card md:col-span-3 group relative rounded-3xl p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100 transition-all duration-300 bg-gradient-to-br from-rose-50/80 via-white/85 to-white/80">
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
            <div className="glass-card md:col-span-3 group relative rounded-3xl p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 bg-gradient-to-br from-indigo-50/80 via-white/85 to-sky-50/80">
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
      <DestinationsSection />

      {/* THE DIFFERENCE — before / after comparison */}
      <section className="py-24 px-6 bg-sky-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              The difference
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Flight hunting,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">reinvented</span>
                <span
                  aria-hidden
                  className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
                />
              </span>
              .
            </h2>
            <p className="text-slate-600 mt-4 text-lg max-w-xl mx-auto">
              Here's what changes when you stop doing this yourself.
            </p>
          </div>

          <div className="relative grid md:grid-cols-2 gap-5">
            {/* BEFORE card */}
            <div className="glass-card group rounded-3xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
                  <Frown className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Before
                  </p>
                  <h3 className="text-xl font-bold text-slate-700">
                    Hunting flights alone
                  </h3>
                </div>
              </div>
              <ul className="space-y-3.5">
                {[
                  "17 Chrome tabs. Across three devices.",
                  "Prices change every hour and you always miss the drop.",
                  '"Is this a good deal?" — asked 40 times a day.',
                  "Book now, watch it drop £100 tomorrow, cry a little.",
                  "Skyscanner rabbit hole at 2am. Every week.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fade-up"
                    style={{
                      animationDelay: `${i * 90}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-slate-500 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AFTER card */}
            <div className="glass-card group relative rounded-3xl p-7 md:p-8 shadow-xl shadow-sky-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200 bg-gradient-to-br from-white/95 via-white/90 to-sky-50/80 ring-2 ring-sky-200/70">
              <div
                aria-hidden
                className="absolute -inset-px rounded-3xl bg-gradient-to-br from-sky-300/40 via-transparent to-emerald-200/40 blur-xl -z-10"
              />
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-sky-100">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-sky-200 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Plane className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    With Flight Guardian
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    Hunting handled.
                  </h3>
                </div>
              </div>
              <ul className="space-y-3.5">
                {[
                  "One saved search. One email when it drops. Done.",
                  "We check every hour, so you don't have to.",
                  "Know with confidence you got the best price.",
                  "Set once, forget, save hundreds — without lifting a finger.",
                  "Sleep well at 2am. Travel happy at 2pm.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 animate-fade-up"
                    style={{
                      animationDelay: `${i * 90 + 200}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-slate-800 leading-relaxed font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow pivot between cards — desktop only */}
            <div
              aria-hidden
              className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center pointer-events-none"
            >
              <div className="glass-card h-12 w-12 rounded-full flex items-center justify-center text-sky-600 animate-float-gentle shadow-lg">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
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
                className="glass-card group rounded-2xl p-5 hover:shadow-md transition-shadow open:shadow-md"
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
                className="glass-button-light group inline-flex items-center gap-2 rounded-full bg-white text-sky-700 px-8 py-4 font-semibold shadow-lg hover:scale-[1.02] transition-all"
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
