import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Globe,
  Clock,
  TrendingDown,
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
  region: "Europe" | "Asia" | "Americas" | "South America" | "Africa";
  vibe: "City" | "Beach" | "Culture";
  from: number;
  wasFrom?: number;
  trackers: number;
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
];

const DESTINATION_FILTERS = [
  "All",
  "Europe",
  "Asia",
  "Americas",
  "South America",
  "Africa",
  "Beach",
] as const;
type DestinationFilter = (typeof DESTINATION_FILTERS)[number];

const FAQS = [
  {
    q: "Is Flight Guardian really free?",
    a: "Yep, 100% free to track flights. No credit card, no hidden catches.",
  },
  {
    q: "How quickly will I get an alert when prices drop?",
    a: "The moment we spot a drop — usually within minutes.",
  },
];

const BENTO_DEALS = [
  {
    from: "London",
    to: "New York",
    price: 340,
    original: 520,
    drop: 34,
    history: [72, 78, 75, 82, 70, 58, 48],
  },
  {
    from: "Manchester",
    to: "Dubai",
    price: 395,
    original: 530,
    drop: 25,
    history: [65, 70, 68, 72, 60, 55, 52],
  },
  {
    from: "Edinburgh",
    to: "Tokyo",
    price: 612,
    original: 820,
    drop: 25,
    history: [85, 82, 88, 80, 75, 72, 68],
  },
];

const RECENT_DROPS = [
  { from: "London", to: "Lisbon", drop: 45, price: 89, time: "2m ago" },
  { from: "Manchester", to: "Paris", drop: 30, price: 65, time: "5m ago" },
  { from: "Edinburgh", to: "Berlin", drop: 22, price: 48, time: "12m ago" },
  { from: "London", to: "New York", drop: 180, price: 340, time: "15m ago" },
  { from: "Birmingham", to: "Madrid", drop: 38, price: 72, time: "20m ago" },
];

function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 px-6 relative overflow-hidden bg-white/50 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Simple steps
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          How Flight Guardian{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-sky-600">works</span>
            <span
              aria-hidden
              className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
            />
          </span>
          .
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-6 text-xl md:text-2xl max-w-2xl mx-auto">
          It's easier than you think to save big on your next flight.
        </p>

        <div className="mt-24 relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-[40%] left-0 w-full h-24 -translate-y-1/2 -z-0"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 50 50 Q 250 -20 500 50 T 950 50"
                stroke="url(#gradient-path)"
                strokeWidth="3"
                strokeDasharray="8 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient
                  id="gradient-path"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.g
                initial={{ offsetDistance: "0%" }}
                whileInView={{ offsetDistance: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                style={{
                  offsetPath: "path('M 50 50 Q 250 -20 500 50 T 950 50')",
                }}
              >
                <Plane className="h-5 w-5 text-sky-500 -rotate-45 fill-white" />
              </motion.g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative z-10">
            <StepCard
              number="1"
              icon={Search}
              title="Search & Set"
              description="Tell us your desired route and the price you'd pay."
              color="sky"
              delay={0}
            />
            <StepCard
              number="2"
              icon={Clock}
              title="We Watch 24/7"
              description="Our smart system constantly monitors thousands of flights."
              color="emerald"
              delay={0.2}
              isActive
            />
            <StepCard
              number="3"
              icon={Bell}
              title="Get Your Alert"
              description="We'll send you an email the instant your flight hits your target."
              color="amber"
              delay={0.4}
              showNotification
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  color,
  delay,
  isActive = false,
  showNotification = false,
}: any) {
  const colorClasses: any = {
    sky: "bg-sky-50 text-sky-600 ring-sky-200 dark:bg-sky-500/10",
    emerald:
      "bg-emerald-50 text-emerald-600 ring-emerald-200 dark:bg-emerald-500/10",
    amber: "bg-amber-50 text-amber-600 ring-amber-200 dark:bg-amber-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-20">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 font-bold text-white shadow-lg ${
            color === "sky"
              ? "bg-sky-500"
              : color === "emerald"
                ? "bg-emerald-500"
                : "bg-amber-500"
          }`}
        >
          {number}
        </span>
      </div>

      <div className="glass-card glass-gloss p-8 pt-10 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col items-center md:items-start text-center md:text-left bg-white/80 dark:bg-slate-900/80">
        <div
          className={`flex items-center justify-center h-16 w-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500 relative ${colorClasses[color]}`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold mb-3 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function BentoPriceWatching() {
  const [index, setIndex] = useState(0);
  const deal = BENTO_DEALS[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BENTO_DEALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-card-dark glass-gloss md:col-span-4 md:row-span-2 group relative rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-slate-200 hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <Plane className="absolute -top-2 -right-2 h-32 w-32 text-white/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700" />
      <div key={index} className="relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live · tracking {deal.from} → {deal.to}
        </div>
        <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-tight">
          We check the price every hour.
          <br />
          <span className="text-sky-300">
            You get a ping the moment it drops.
          </span>
        </h3>
        <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400">
              {deal.from} → {deal.to}
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-sm">
              <TrendingDown className="h-4 w-4" /> -{deal.drop}%
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {deal.history.map((h, i) => (
              <motion.div
                key={i}
                className={`flex-1 rounded-t-md relative group/bar ${
                  i === 6
                    ? "bg-gradient-to-t from-emerald-400 to-emerald-300 shadow-lg shadow-emerald-500/30"
                    : "bg-white/20 hover:bg-sky-400 transition-all duration-300"
                }`}
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-30">
                  £{Math.floor(deal.original * (h / 100))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between">
            <span className="text-sm text-slate-300">Today's price</span>
            <span className="text-2xl font-bold text-white">£{deal.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveDealStream() {
  const [dealOffset, setDealOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setDealOffset((prev) => (prev + 1) % RECENT_DROPS.length),
      3000,
    );
    return () => clearInterval(id);
  }, []);
  const currentDeals = [
    RECENT_DROPS[dealOffset % RECENT_DROPS.length],
    RECENT_DROPS[(dealOffset + 1) % RECENT_DROPS.length],
  ];

  return (
    <div className="glass-card-dark glass-gloss md:col-span-3 group relative rounded-3xl p-8 hover:-translate-y-1 transition-all duration-500 bg-slate-900 text-white overflow-hidden flex flex-col h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 border border-sky-500/30 shadow-lg">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Signal Feed</h3>
            <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em]">
              Global Scan
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 relative min-h-[220px]">
        <AnimatePresence mode="popLayout">
          {currentDeals.map((drop, i) => (
            <motion.div
              key={`${drop.from}-${drop.to}-${dealOffset + i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8 }}
              className="relative p-5 rounded-[2rem] bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-sky-400" />
                  </div>
                  <div className="text-white">
                    <div className="flex items-center gap-2 font-bold">
                      {drop.from} → {drop.to}
                    </div>
                    <span className="text-[10px] font-medium text-white/40 uppercase">
                      Detected {drop.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-black text-lg">
                    -£{drop.drop}
                  </div>
                  <div className="text-white font-black text-xl">
                    £{drop.price}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProductDemo() {
  const [stage, setStage] = useState(0);
  const [routeIndex, setRouteIndex] = useState(0);
  const route = DEMO_ROUTES[routeIndex];

  useEffect(() => {
    const id = setTimeout(() => {
      setStage((s) => {
        const next = (s + 1) % DEMO_CAPTIONS.length;
        if (next === 0) setRouteIndex((r) => (r + 1) % DEMO_ROUTES.length);
        return next;
      });
    }, DEMO_DURATIONS[stage]);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3"
          >
            <Sparkles className="h-3.5 w-3.5" /> Watch it work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            See it in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">action</span>
              <span
                aria-hidden
                className="absolute left-0 bottom-1 h-3 w-full rounded-full bg-amber-200/70 -z-0"
              />
            </span>
            .
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 mt-6 text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Search, track, and save. It really is that simple.
          </motion.p>
        </div>

        <div className="relative glass-card glass-gloss rounded-[2.5rem] shadow-2xl shadow-sky-200/60 border-white/40 overflow-hidden dark:bg-slate-900/50">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/40">
            <div className="flex gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-red-400/90" />
              <div className="h-3.5 w-3.5 rounded-full bg-amber-400/90" />
              <div className="h-3.5 w-3.5 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex-1 h-9 max-w-md mx-auto rounded-xl glass-input border border-white/60 dark:border-white/10 px-4 text-sm text-slate-500 flex items-center justify-center gap-2">
              <Lock className="h-3.5 w-3.5" /> flightguardian.app
            </div>
            <div className="w-20" />
          </div>

          <div className="h-[550px] md:h-[650px] lg:h-[750px] bg-gradient-to-b from-white/60 to-sky-50/40 dark:from-slate-900/60 dark:to-slate-900/40 relative flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${routeIndex}-${stage}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="w-full px-8 md:px-14 lg:p-20"
              >
                {stage === 0 && (
                  <DemoSceneSearch route={route} duration={DEMO_DURATIONS[0]} />
                )}
                {stage === 1 && <DemoSceneResults route={route} />}
                {stage === 2 && <DemoSceneTracking route={route} />}
                {stage === 3 && <DemoSceneAlert route={route} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-1.5 bg-slate-100/50 relative overflow-hidden">
            <motion.div
              key={`bar-${stage}`}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: DEMO_DURATIONS[stage] / 1000,
                ease: "linear",
              }}
            />
          </div>
        </div>
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
}: any) {
  const { display, done } = useTypewriter(text, speed, startDelay);
  const borderClass = activeNow
    ? "border-sky-400 shadow-sm"
    : done
      ? "border-emerald-300"
      : "border-slate-200 dark:border-white/10";
  return (
    <div>
      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-sky-600" /> {label}
      </span>
      <div
        className={`rounded-xl border-2 glass-input px-3.5 py-3 text-sm font-medium text-slate-800 dark:text-white flex items-center min-h-[46px] transition-colors ${borderClass}`}
      >
        <span className="truncate">{display}</span>
        {activeNow && !done && (
          <span className="inline-block w-0.5 h-4 bg-sky-600 ml-0.5 animate-pulse" />
        )}
      </div>
    </div>
  );
}

function DemoSceneSearch({ route, duration }: any) {
  const fromText = `${route.fromCity} (${route.fromCode})`;
  const toText = `${route.toCity} (${route.toCode})`;
  const dateText = route.date;
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, []);
  const fromEnd = 300 + fromText.length * 65;
  const toEnd = fromEnd + 200 + toText.length * 65;
  const dateEnd = toEnd + 200 + dateText.length * 65;
  const activeField =
    elapsed < fromEnd ? 0 : elapsed < toEnd ? 1 : elapsed < dateEnd ? 2 : 3;

  return (
    <div className="space-y-10 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 text-lg text-slate-500 font-medium dark:text-slate-400">
        <Search className="h-6 w-6 text-sky-600" /> Tell us where you want to
        fly
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DemoTypingField
          label="Flying from"
          icon={MapPin}
          text={fromText}
          startDelay={300}
          activeNow={activeField === 0}
        />
        <DemoTypingField
          label="Flying to"
          icon={Plane}
          text={toText}
          startDelay={fromEnd + 200}
          activeNow={activeField === 1}
        />
        <DemoTypingField
          label="When"
          icon={Calendar}
          text={dateText}
          startDelay={toEnd + 200}
          activeNow={activeField === 2}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeField === 3 ? 1 : 0 }}
        className="flex items-center gap-4"
      >
        <button className="glass-button inline-flex items-center gap-3 rounded-full bg-sky-600 text-white px-10 py-5 text-xl font-bold shadow-xl shadow-sky-200">
          Search flights <ArrowRight className="h-6 w-6" />
        </button>
      </motion.div>
    </div>
  );
}

function DemoSceneResults({ route }: any) {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 flex-wrap mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 px-4 py-2 text-sm font-bold border border-sky-100 dark:border-sky-500/20">
          <MapPin className="h-4 w-4" /> {route.fromCity} → {route.toCity}
        </span>
      </div>
      <div className="space-y-4">
        {route.deals.map((f: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-[1.5rem] glass-card-soft p-6 md:p-8 flex items-center justify-between gap-4 dark:bg-slate-900/60 ${f.highlight ? "ring-2 ring-sky-400" : ""}`}
          >
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center text-sky-600">
                <Plane className="h-7 w-7" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  {f.airline}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                £{f.price}
              </p>
              {f.highlight && (
                <span className="text-sky-600 dark:text-sky-400 text-sm font-bold">
                  Best Deal
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DemoSceneTracking({ route }: any) {
  return (
    <div className="space-y-10 max-w-2xl mx-auto w-full">
      <div className="rounded-2xl border-2 border-sky-400 glass-input px-6 py-8 flex items-center justify-between shadow-2xl dark:bg-slate-900/60">
        <div className="flex items-baseline">
          <span className="text-5xl font-black text-slate-900 dark:text-white">
            £{route.target}
          </span>
          <span className="inline-block w-1 h-10 bg-sky-600 ml-2 animate-pulse rounded-full" />
        </div>
        <span className="text-sm text-emerald-700 bg-emerald-50 px-4 py-2 font-bold rounded-full">
          Target Set
        </span>
      </div>
      <button className="glass-button w-full inline-flex items-center justify-center gap-3 rounded-full bg-sky-600 text-white px-10 py-5 text-xl font-bold shadow-xl shadow-sky-200">
        <Bell className="h-6 w-6" /> Start watching
      </button>
    </div>
  );
}

function DemoSceneAlert({ route }: any) {
  return (
    <div className="relative min-h-[360px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-soft rounded-2xl shadow-2xl p-8 max-w-sm bg-white dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-white/10">
          <Mail className="h-6 w-6 text-emerald-600" />
          <div>
            <p className="font-bold dark:text-white leading-tight">
              Price dropped!
            </p>
            <p className="text-xs text-slate-400">Flight Guardian</p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Your flight to <b>{route.toCity}</b> hit <b>£{route.target}</b>!
        </p>
        <button className="glass-button w-full rounded-full bg-sky-600 text-white py-3 font-bold">
          Book Now
        </button>
      </motion.div>
    </div>
  );
}

function DestinationsSection() {
  const [filter, setFilter] = useState<DestinationFilter>("All");
  const visible = DESTINATIONS.filter(
    (d) =>
      filter === "All" ||
      d.region === filter ||
      (filter === "Beach" && d.vibe === "Beach"),
  );
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">
            Pick your next getaway.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-lg">
            Tap to start tracking. We'll handle the rest.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DESTINATION_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === f ? "bg-sky-600 text-white" : "glass-card-soft dark:bg-slate-900/50 dark:text-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((dest, i) => (
            <Link
              key={i}
              to="/search"
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">{dest.city}</p>
                <p className="text-sm opacity-80">{dest.country}</p>
                <p className="mt-2 text-xl font-bold">from £{dest.from}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden"
    >
      <motion.section
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
        }}
        className="relative pt-28 pb-24 px-6"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-sky-200/40 dark:bg-sky-500/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]"
          >
            Book flights at the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-sky-600">perfect moment</span>
              <span
                aria-hidden
                className="absolute left-0 bottom-2 h-4 w-full rounded-full bg-amber-200/70 -z-0"
              />
            </span>
            .
          </motion.h1>
          <p className="mt-8 text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Tell us where you want to go. We'll watch prices 24/7 and email you
            when it's time to book.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link
              to="/search"
              className="glass-button glass-gloss rounded-full bg-sky-600 text-white px-10 py-5 text-lg font-semibold shadow-lg"
            >
              Find cheap flights
            </Link>
          </div>
        </div>
      </motion.section>

      <ProductDemo />

      <motion.section
        variants={{ initial: { opacity: 0 }, whileInView: { opacity: 1 } }}
        viewport={{ once: true }}
        className="relative py-24 px-6 bg-gradient-to-b from-white to-sky-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <BentoPriceWatching />
            <div className="glass-card glass-gloss md:col-span-2 group relative rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden dark:bg-slate-900/60">
              <div>
                <PiggyBank className="h-10 w-10 text-emerald-600 mb-6" />
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">£220</span>
                  <span className="text-sm font-bold opacity-40 uppercase">
                    avg saved
                  </span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                  Community Total
                </p>
                <p className="text-lg font-bold text-emerald-600">£1.4M+</p>
              </div>
            </div>
            <div className="glass-card glass-gloss md:col-span-2 group relative rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden dark:bg-slate-900/60">
              <div>
                <Clock className="h-10 w-10 text-amber-600 mb-6" />
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">30s</span>
                  <span className="text-sm font-bold opacity-40 uppercase">
                    to set up
                  </span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-white/10"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="glass-card glass-gloss md:col-span-3 group relative rounded-3xl p-8 hover:-translate-y-1 transition-all bg-gradient-to-br from-white to-rose-50/30 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
              <Heart className="h-10 w-10 text-rose-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Zero spam. Promise.</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                No newsletters, no marketing, no noise. Only drop alerts.
              </p>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b dark:border-white/5">
                  <Mail className="h-4 w-4 text-sky-500" />
                  <div className="text-[10px] font-bold">
                    Price Drop: London → NYC
                  </div>
                </div>
                <div className="text-[10px] opacity-60">
                  Good news! Your flight hit £340.
                </div>
              </div>
            </div>
            <LiveDealStream />
          </div>
        </div>
      </motion.section>

      <HowItWorks />
      <DestinationsSection />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-24 px-6 bg-sky-50 dark:bg-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="glass-card glass-gloss rounded-[2.5rem] p-10 md:p-14 bg-white dark:bg-slate-900/60">
              <Frown className="h-10 w-10 text-slate-400 mb-8" />
              <h3 className="text-2xl font-black mb-6">Hunting alone</h3>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-center gap-3">
                  <X className="h-4 w-4 text-rose-500" /> 17 Chrome tabs open
                </li>
                <li className="flex items-center gap-3">
                  <X className="h-4 w-4 text-rose-500" /> Missed every price
                  drop
                </li>
              </ul>
            </div>
            <div className="glass-card glass-gloss rounded-[2.5rem] p-10 md:p-14 bg-white dark:bg-slate-900 ring-4 ring-sky-500/20">
              <Plane className="h-10 w-10 text-sky-600 mb-8" />
              <h3 className="text-2xl font-black mb-6">With Guardian</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold">
                  <Check className="h-4 w-4 text-emerald-500" /> Set once,
                  forget forever
                </li>
                <li className="flex items-center gap-3 font-bold">
                  <Check className="h-4 w-4 text-emerald-500" /> Email the
                  second it drops
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-24 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-600 p-16 text-white shadow-xl overflow-hidden">
            <h2 className="text-4xl font-bold mb-4">
              Ready for your next trip?
            </h2>
            <p className="text-sky-100 mb-8 max-w-xl mx-auto">
              Start watching a flight now. It's free and takes 30 seconds.
            </p>
            <Link
              to="/search"
              className="glass-button glass-gloss rounded-full bg-white text-sky-700 px-10 py-5 text-xl font-bold"
            >
              Start tracking now
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
