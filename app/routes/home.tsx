import { useEffect, useState, useMemo } from "react";
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
    target: 315,
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
    city: "Rome",
    code: "FCO",
    country: "Italy",
    region: "Europe",
    vibe: "Culture",
    from: 145,
    wasFrom: 195,
    trackers: 284,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "London",
    code: "LHR",
    country: "UK",
    region: "Europe",
    vibe: "City",
    from: 0,
    wasFrom: 0,
    trackers: 542,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Barcelona",
    code: "BCN",
    country: "Spain",
    region: "Europe",
    vibe: "Beach",
    from: 112,
    wasFrom: 168,
    trackers: 195,
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Lisbon",
    code: "LIS",
    country: "Portugal",
    region: "Europe",
    vibe: "City",
    from: 125,
    wasFrom: 180,
    trackers: 242,
    image:
      "https://images.unsplash.com/photo-1548705085-101177834f47?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Porto",
    code: "OPO",
    country: "Portugal",
    region: "Europe",
    vibe: "Culture",
    from: 110,
    wasFrom: 155,
    trackers: 134,
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Athens",
    code: "ATH",
    country: "Greece",
    region: "Europe",
    vibe: "Culture",
    from: 145,
    wasFrom: 210,
    trackers: 187,
    image:
      "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Santorini",
    code: "JTR",
    country: "Greece",
    region: "Europe",
    vibe: "Beach",
    from: 195,
    wasFrom: 280,
    trackers: 412,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Reykjavik",
    code: "KEF",
    country: "Iceland",
    region: "Europe",
    vibe: "Culture",
    from: 220,
    wasFrom: 310,
    trackers: 156,
    image:
      "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Toronto",
    code: "YYZ",
    country: "Canada",
    region: "Americas",
    vibe: "City",
    from: 385,
    wasFrom: 490,
    trackers: 198,
    image:
      "https://images.unsplash.com/photo-1720585248084-936d396a305b?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Amsterdam",
    code: "AMS",
    country: "Netherlands",
    region: "Europe",
    vibe: "City",
    from: 138,
    wasFrom: 175,
    trackers: 167,
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80",
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
    city: "Bangkok",
    code: "BKK",
    country: "Thailand",
    region: "Asia",
    vibe: "City",
    from: 395,
    wasFrom: 480,
    trackers: 312,
    image:
      "https://images.unsplash.com/photo-1655815917186-76a5e56b58d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Mexico City",
    code: "MEX",
    country: "Mexico",
    region: "Americas",
    vibe: "Culture",
    from: 412,
    wasFrom: 520,
    trackers: 184,
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Cancun",
    code: "CUN",
    country: "Mexico",
    region: "Americas",
    vibe: "Beach",
    from: 356,
    wasFrom: 440,
    trackers: 295,
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Seoul",
    code: "ICN",
    country: "South Korea",
    region: "Asia",
    vibe: "City",
    from: 412,
    wasFrom: 520,
    trackers: 156,
    image:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bali",
    code: "DPS",
    country: "Indonesia",
    region: "Asia",
    vibe: "Beach",
    from: 465,
    wasFrom: 590,
    trackers: 428,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Lima",
    code: "LIM",
    country: "Peru",
    region: "South America",
    vibe: "Culture",
    from: 485,
    wasFrom: 560,
    trackers: 156,
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Santiago",
    code: "SCL",
    country: "Chile",
    region: "South America",
    vibe: "City",
    from: 520,
    wasFrom: 640,
    trackers: 112,
    image:
      "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Montevideo",
    code: "MVD",
    country: "Uruguay",
    region: "South America",
    vibe: "Beach",
    from: 495,
    wasFrom: 580,
    trackers: 84,
    image:
      "https://images.unsplash.com/photo-1693192357825-b50aa54738ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Bogota",
    code: "BOG",
    country: "Colombia",
    region: "South America",
    vibe: "City",
    from: 442,
    wasFrom: 510,
    trackers: 128,
    image:
      "https://images.unsplash.com/photo-1583531172005-814191b8b6c0?auto=format&fit=crop&w=800&q=80",
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
    city: "Miami",
    code: "MIA",
    country: "USA",
    region: "Americas",
    vibe: "Beach",
    from: 312,
    wasFrom: 395,
    trackers: 245,
    image:
      "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Los Angeles",
    code: "LAX",
    country: "USA",
    region: "Americas",
    vibe: "City",
    from: 345,
    wasFrom: 420,
    trackers: 187,
    image:
      "https://images.unsplash.com/photo-1597982087634-9884f03198ce?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Istanbul",
    code: "IST",
    country: "Turkiye",
    region: "Asia",
    vibe: "Culture",
    from: 156,
    wasFrom: 198,
    trackers: 175,
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Rio de Janeiro",
    code: "GIG",
    country: "Brazil",
    region: "South America",
    vibe: "Beach",
    from: 495,
    wasFrom: 540,
    trackers: 215,
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Buenos Aires",
    code: "EZE",
    country: "Argentina",
    region: "South America",
    vibe: "Culture",
    from: 512,
    wasFrom: 620,
    trackers: 134,
    image:
      "https://images.unsplash.com/photo-1679417302656-9b5170584526?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Cairo",
    code: "CAI",
    country: "Egypt",
    region: "Africa",
    vibe: "Culture",
    from: 285,
    wasFrom: 360,
    trackers: 412,
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Tunis",
    code: "TUN",
    country: "Tunisia",
    region: "Africa",
    vibe: "Culture",
    from: 195,
    wasFrom: 240,
    trackers: 86,
    image:
      "https://images.unsplash.com/photo-1743888768224-c15f2be65e1e?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Zanzibar",
    code: "ZNZ",
    country: "Tanzania",
    region: "Africa",
    vibe: "Beach",
    from: 420,
    wasFrom: 510,
    trackers: 342,
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Nairobi",
    code: "NBO",
    country: "Kenya",
    region: "Africa",
    vibe: "City",
    from: 395,
    wasFrom: 470,
    trackers: 156,
    image:
      "https://images.unsplash.com/photo-1594491837471-bd439938f0b7?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Marrakech",
    code: "RAK",
    country: "Morocco",
    region: "Africa",
    vibe: "Culture",
    from: 120,
    wasFrom: 180,
    trackers: 95,
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
  },
  {
    city: "Cape Town",
    code: "CPT",
    country: "South Africa",
    region: "Africa",
    vibe: "Beach",
    from: 445,
    wasFrom: 580,
    trackers: 167,
    image:
      "https://images.unsplash.com/photo-1728466852402-f233aed0d299?auto=format&fit=crop&w=800&q=80",
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
    to: "Lisbon",
    price: 89,
    original: 168,
    drop: 47,
    history: [80, 85, 82, 76, 70, 62, 53],
  },
  {
    from: "London",
    to: "Tokyo",
    price: 612,
    original: 840,
    drop: 27,
    history: [70, 75, 72, 78, 68, 62, 55],
  },
];

const RECENT_DROPS = [
  { from: "London", to: "Lisbon", drop: 45, price: 89, time: "2m ago" },
  { from: "Manchester", to: "Paris", drop: 30, price: 65, time: "5m ago" },
  { from: "Edinburgh", to: "Berlin", drop: 22, price: 48, time: "12m ago" },
  { from: "London", to: "New York", drop: 180, price: 340, time: "15m ago" },
];

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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
    <div className="w-full">
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

function DemoSceneSearch({ route }: any) {
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
        <button className="glass-button glass-gloss inline-flex items-center gap-3 rounded-full bg-sky-600 text-white px-10 py-5 text-xl font-bold shadow-xl shadow-sky-200">
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
            className={`rounded-[1.5rem] glass-card glass-gloss p-6 md:p-8 flex items-center justify-between gap-4 bg-white/80 dark:bg-slate-950/60 ${f.highlight ? "ring-2 ring-sky-400" : ""}`}
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
                <span className="text-sky-600 dark:text-sky-400 text-sm font-bold uppercase tracking-wider">
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
      <div className="rounded-2xl border-2 border-sky-400 glass-input px-6 py-8 flex items-center justify-between shadow-2xl dark:bg-slate-950/60 bg-white/50">
        <div className="flex items-baseline">
          <span className="text-5xl font-black text-slate-900 dark:text-white">
            £{route.target}
          </span>
          <span className="inline-block w-1 h-10 bg-sky-600 ml-2 animate-pulse rounded-full" />
        </div>
        <span className="text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 font-bold rounded-full">
          Target Set
        </span>
      </div>
      <button className="glass-button glass-gloss w-full inline-flex items-center justify-center gap-3 rounded-full bg-sky-600 text-white px-10 py-5 text-xl font-bold shadow-xl shadow-sky-200">
        <Bell className="h-6 w-6" /> Start watching
      </button>
    </div>
  );
}

function DemoSceneAlert({ route }: any) {
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="relative min-h-[420px] flex items-center justify-center overflow-hidden rounded-[3rem]">
      {/* Background Ambience */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src={
            DESTINATIONS.find((d) => d.city === route.toCity)?.image ||
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
          }
          className="w-full h-full object-cover blur-[1px] brightness-[0.35]"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isBooked ? (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10 w-full max-w-[320px] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-10 h-24 w-24 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-sky-500/20 animate-pulse" />
              <Mail className="h-10 w-10 text-white" />
            </motion.div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 mb-4 opacity-80">
              Target Price Hit
            </h3>

            <h2 className="text-5xl font-black text-white tracking-tighter mb-2">
              {route.toCity}
            </h2>

            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px w-8 bg-white/20" />
              <span className="text-4xl font-black text-emerald-400">
                £{route.target}
              </span>
              <div className="h-px w-8 bg-white/20" />
            </div>

            <button
              onClick={() => setIsBooked(true)}
              className="group relative w-full py-6 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white" />
              <span className="relative z-10 text-black font-black uppercase tracking-[0.2em] text-sm group-hover:tracking-[0.25em] transition-all">
                Confirm Booking
              </span>
            </button>

            <p className="mt-6 text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">
              Verified by Flight Guardian Scan
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative z-10"
          >
            <div className="text-7xl mb-6">✈️</div>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-4">
              PACK YOUR BAGS
            </h3>
            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">
              Confirmation sent to your secure inbox
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BentoPriceWatching() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [trackedSet, setTrackedSet] = useState<Set<number>>(new Set());
  const deal = BENTO_DEALS[index];
  const isTracked = trackedSet.has(index);
  const priceAt = (h: number) => Math.round((h / 100) * deal.original);
  const displayPrice = hoveredBar !== null ? priceAt(deal.history[hoveredBar]) : deal.price;
  const displayLabel =
    hoveredBar === null
      ? "Current"
      : hoveredBar === 6
        ? "Today"
        : `Day -${6 - hoveredBar}`;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BENTO_DEALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isPaused]);

  const toggleTrack = () => {
    setTrackedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredBar(null);
      }}
      className="glass-card-dark glass-gloss md:col-span-3 group relative rounded-3xl p-6 md:p-7 text-white shadow-xl shadow-slate-200 hover:shadow-2xl transition-all duration-500 overflow-hidden bg-slate-950 border border-white/5"
    >
      <Plane className="absolute -top-2 -right-2 h-28 w-28 text-white/5 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                  isPaused ? "" : "animate-ping"
                }`}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {isPaused ? "Paused" : "Active Scanning"}
          </div>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Deal selector">
            {BENTO_DEALS.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${d.from} to ${d.to}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-6 bg-emerald-400"
                    : "w-1.5 bg-white/15 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-0.5"
            >
              <p className="text-sky-400 text-xs font-black uppercase tracking-widest">
                {deal.from} → {deal.to}
              </p>
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-none">
                CATCHING DROPS.
              </h3>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 rounded-2xl bg-white/5 border border-white/5 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                Snapshot
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-black text-xs tracking-tighter">
                <TrendingDown className="h-3 w-3" /> -{deal.drop}% DROP
              </span>
            </div>

            <div className="flex items-end gap-1.5 h-12">
              {deal.history.map((h, i) => {
                const isActive = i === 6;
                const isHover = hoveredBar === i;
                return (
                  <motion.button
                    type="button"
                    key={`${index}-${i}`}
                    onMouseEnter={() => setHoveredBar(i)}
                    onFocus={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onBlur={() => setHoveredBar(null)}
                    aria-label={`Day ${i + 1}: £${priceAt(h)}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className={`flex-1 rounded-sm cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? isHover
                          ? "bg-emerald-300"
                          : "bg-emerald-400"
                        : isHover
                          ? "bg-white/40"
                          : "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                {displayLabel}
              </span>
              <motion.span
                key={`${index}-${hoveredBar ?? "live"}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-black tabular-nums"
              >
                £{displayPrice}
              </motion.span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTrack}
            aria-pressed={isTracked}
            className={`mt-3 w-full rounded-xl py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer ${
              isTracked
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {isTracked ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="h-3 w-3" /> Tracking this route
              </span>
            ) : (
              "+ Track this route"
            )}
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold">
          <span className="text-white/40 font-black uppercase tracking-[0.2em] text-[9px]">
            Network
          </span>
          <div className="flex items-center gap-4 font-mono">
            <span className="text-white/60 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              LHR <span className="text-emerald-400/80">12ms</span>
            </span>
            <span className="text-white/60 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              JFK <span className="text-emerald-400/80">18ms</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FLIGHT_BOARD_ROWS = [
  { route: "LHR→JFK", was: 520, now: 340, status: "DROP" },
  { route: "LHR→LIS", was: 134, now: 89, status: "DROP" },
  { route: "MAN→CDG", was: 95, now: 65, status: "DROP" },
  { route: "MAN→DXB", was: 530, now: 395, status: "LIVE" },
  { route: "EDI→BER", was: 70, now: 48, status: "DROP" },
  { route: "LGW→BCN", was: 180, now: 112, status: "LIVE" },
] as const;

function FlipDigit({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden align-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function FlightBoardPrice({ amount }: { amount: number }) {
  const digits = `£${amount}`.split("");
  return (
    <span className="inline-flex">
      {digits.map((d, i) => (
        <FlipDigit key={`${i}-${d}`} value={d} />
      ))}
    </span>
  );
}

function LiveDealStream() {
  const [tick, setTick] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setClock(
        `${d.getUTCHours().toString().padStart(2, "0")}:${d
          .getUTCMinutes()
          .toString()
          .padStart(2, "0")}:${d.getUTCSeconds().toString().padStart(2, "0")} UTC`,
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const rows = FLIGHT_BOARD_ROWS.map((r, i) => ({
    ...r,
    now: r.now - ((tick + i) % 3),
  }));
  const activeIndex = tick % rows.length;

  return (
    <div className="glass-card-dark glass-gloss md:col-span-6 group relative rounded-3xl p-6 sm:p-7 hover:-translate-y-1 transition-all duration-500 bg-slate-950 border border-white/5 text-white overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 border border-sky-500/30 shadow-lg">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-none">
              Signal Feed
            </h3>
            <p className="text-[9px] text-sky-400 font-black uppercase tracking-[0.25em] mt-1">
              Global Scan
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-black/40 border border-white/5 p-4 font-mono backdrop-blur-sm">
        <div className="grid grid-cols-[1fr_56px_64px_72px] items-center gap-2 pb-2 mb-2 border-b border-white/5 text-[8.5px] font-black uppercase tracking-[0.25em] text-white/30">
          <span>Route</span>
          <span className="text-right">Was</span>
          <span className="text-right">Now</span>
          <span className="text-right">Status</span>
        </div>

        <div className="space-y-1.5">
          {rows.map((row, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={row.route}
                animate={{
                  backgroundColor: isActive
                    ? "rgba(16, 185, 129, 0.06)"
                    : "rgba(255,255,255,0)",
                }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-[1fr_56px_64px_72px] items-center gap-2 py-1.5 px-2 rounded-md text-[11px]"
              >
                <span className="text-white font-bold tracking-[0.12em]">
                  {row.route}
                </span>
                <span className="text-right text-white/35 line-through tabular-nums">
                  £{row.was}
                </span>
                <span className="text-right text-white font-black tabular-nums">
                  <FlightBoardPrice amount={row.now} />
                </span>
                <span className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded ${
                      row.status === "DROP"
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                    }`}
                  >
                    {row.status === "DROP" ? "▼DROP" : "●LIVE"}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.25em] text-white/30 font-mono">
        <span>Last sync</span>
        <span className="text-emerald-400/70 tabular-nums">{clock || "--:--:-- UTC"}</span>
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
    return () => clearInterval(id);
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] dark:text-white"
          >
            See it in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-sky-600">action</span>
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

        <div className="relative glass-card glass-gloss rounded-[2.5rem] shadow-2xl shadow-sky-200/60 border-white/40 overflow-hidden dark:bg-slate-950/50">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-950/40">
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

          <div className="h-[550px] md:h-[650px] lg:h-[750px] bg-gradient-to-b from-white/60 to-sky-50/40 dark:from-slate-950/60 dark:to-slate-950/40 relative flex flex-col justify-center overflow-hidden">
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

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {DEMO_CAPTIONS.map((cap, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStage(i)}
              className={`group flex items-center gap-3 transition-all outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full px-2 py-1 ${
                stage === i
                  ? "text-sky-600 scale-110"
                  : "text-slate-400 hover:text-slate-600 hover:scale-105"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  stage === i
                    ? "bg-sky-600 text-white shadow-xl shadow-sky-200"
                    : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-base font-bold tracking-tight dark:text-slate-200">
                {cap}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  description,
  color,
  delay,
}: any) {
  const colorClasses: any = {
    sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10",
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
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-950 font-bold text-white shadow-lg ${
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

      <div className="glass-card glass-gloss p-8 pt-10 rounded-3xl shadow-xl h-full flex flex-col items-center md:items-start text-center md:text-left bg-white/80 dark:bg-slate-950/80">
        <div
          className={`flex items-center justify-center h-16 w-16 rounded-2xl mb-6 relative ${colorClasses[color]}`}
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

function HowItWorks() {
  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="py-24 px-6 relative overflow-hidden bg-white/50 dark:bg-slate-950/50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Simple steps
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] dark:text-white">
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
            />
            <StepCard
              number="3"
              icon={Bell}
              title="Get Your Alert"
              description="We'll send you an email the instant your flight hits your target."
              color="amber"
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </motion.section>
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
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold dark:text-white mb-4">
            Pick your next getaway.
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {DESTINATION_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f ? "bg-sky-600 text-white shadow-lg" : "glass-card-soft dark:bg-slate-950/60 dark:text-slate-300"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden pb-12 pt-4 group rounded-3xl">
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 lg:w-32 bg-gradient-to-r from-sky-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 lg:w-32 bg-gradient-to-l from-sky-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          <div
            className="flex w-max animate-conveyor-belt group-hover:[animation-play-state:paused] px-3 sm:px-6"
            style={{
              animationDuration: `${visible.length * 3}s`,
            }}
          >
            {Array.from({ length: 20 }).flatMap((_, idx) =>
              visible.map((dest, i) => (
                <Link
                  key={`${idx}-${i}`}
                  to="/search"
                  className="group relative aspect-[4/5] w-[220px] sm:w-[280px] lg:w-[350px] shrink-0 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl glass-gloss transition-transform hover:-translate-y-2 duration-500 mr-3 sm:mr-4 lg:mr-6"
                >
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                    <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-1 sm:mb-2">
                      {dest.region}
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-1">{dest.city}</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs sm:text-sm opacity-60 font-bold">
                          {dest.country}
                        </p>
                        <p className="mt-1 sm:mt-2 text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
                          from £{dest.from}
                        </p>
                      </div>
                      <div className="glass-button rounded-full bg-white/20 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/30">
                        Track
                      </div>
                    </div>
                  </div>
                </Link>
              )),
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden"
    >
      <motion.section
        variants={itemVariants}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Discover the best deals
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            BOOK FLIGHTS AT THE <br />
            <span className="text-sky-600 inline-block relative">
              PERFECT MOMENT
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-2 left-0 h-4 bg-amber-400/30 -z-10"
              />
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Set your price. We watch 24/7. Get a ping the moment it drops. Never
            overpay again.
          </motion.p>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/search"
              className="glass-button glass-gloss rounded-full bg-sky-600 text-white px-8 py-4 sm:px-12 sm:py-6 text-base sm:text-xl font-black uppercase tracking-widest shadow-2xl shadow-sky-500/20"
            >
              Find cheap flights
            </Link>
            <Link
              to="/dashboard"
              className="glass-button-light glass-gloss rounded-full bg-white/10 dark:bg-white/5 border border-black/5 dark:border-white/10 px-8 py-4 sm:px-12 sm:py-6 text-base sm:text-xl font-black uppercase tracking-widest backdrop-blur-xl"
            >
              My dashboard
            </Link>
          </motion.div>
        </div>

        {/* Cinematic Plane Animation - Enhanced Entrance */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
          <motion.div
            initial={{ x: "-20%", y: "60%", rotate: 10, opacity: 0 }}
            animate={{ x: "200%", y: "-20%", opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear",
            }}
            className="absolute top-1/2 left-0 text-sky-400/30"
          >
            <div className="relative">
              <Plane className="h-20 w-20 fill-current" />
              <div className="absolute right-[90%] top-1/2 -translate-y-1/2 w-64 h-[3px] bg-gradient-to-l from-current to-transparent opacity-40 blur-[2px]" />
              <div className="absolute right-[90%] top-1/2 -translate-y-1/2 w-32 h-[1px] bg-white opacity-60" />
            </div>
          </motion.div>
        </div>

        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-full -z-0 opacity-50"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 blur-[120px] rounded-full animate-blob-drift" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full animate-blob-drift"
            style={{ animationDelay: "-4s" }}
          />
        </div>
      </motion.section>

      <ProductDemo />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <BentoPriceWatching />
            <div className="glass-card glass-gloss md:col-span-3 group relative rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-950 shadow-2xl text-slate-900 dark:text-white">
              <div>
                <PiggyBank className="h-12 w-12 text-emerald-500 mb-8" />
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-black">£220</span>
                  <span className="text-xs font-black uppercase tracking-widest opacity-40">
                    avg saved
                  </span>
                </div>
                <p className="text-lg opacity-60 leading-relaxed font-bold">
                  Consistent price drops detected daily by our global scanning
                  engine.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-40">
                  Network Total
                </span>
                <span className="text-2xl font-black text-emerald-500">
                  £1.4M+
                </span>
              </div>
            </div>
            <div className="glass-card glass-gloss md:col-span-3 group relative rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden bg-white dark:bg-slate-950 shadow-2xl text-slate-900 dark:text-white">
              <div>
                <Clock className="h-12 w-12 text-amber-500 mb-8" />
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-black">30s</span>
                  <span className="text-xs font-black uppercase tracking-widest opacity-40">
                    Setup
                  </span>
                </div>
                <p className="text-lg opacity-60 leading-relaxed font-bold">
                  Fastest set-and-forget experience in travel technology today.
                </p>
              </div>
              <div className="mt-8 pt-8 border-t dark:border-white/5 flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ delay: 1 + s * 0.2, duration: 0.8 }}
                      className="h-full bg-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card glass-gloss md:col-span-3 group relative rounded-[2.5rem] p-10 bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-950 dark:to-slate-950 shadow-2xl border-none text-slate-900 dark:text-white">
              <Heart className="h-12 w-12 text-rose-500 mb-8" />
              <h3 className="text-3xl font-black mb-6">
                Zero spam. <br />
                That's a promise.
              </h3>
              <p className="text-lg opacity-60 leading-relaxed font-bold mb-10">
                We strictly only send price drop notifications. No newsletters,
                no ads, no data selling.
              </p>
              <div className="rounded-3xl bg-white dark:bg-slate-950/50 p-6 shadow-2xl border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b dark:border-white/5">
                  <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="font-black text-xs uppercase tracking-widest">
                    Price hit target! London → JFK
                  </div>
                </div>
                <div className="space-y-2 opacity-40">
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded" />
                  <div className="h-2 w-2/3 bg-slate-100 dark:bg-white/10 rounded" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
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
        className="py-16 sm:py-24 px-4 sm:px-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card glass-gloss rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 bg-slate-50 dark:bg-slate-950/40 border-none shadow-2xl">
              <Frown className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mb-8 sm:mb-10" />
              <h3 className="text-3xl sm:text-4xl font-black mb-6 sm:mb-8">Hunting Alone</h3>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  "17 Chrome tabs open at once",
                  "Obsessive manual refreshing",
                  "Always missing the best price",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 sm:gap-4 text-base sm:text-xl opacity-40 font-bold"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card glass-gloss rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 bg-white dark:bg-slate-950 border-none shadow-2xl ring-4 ring-sky-500/10">
              <Plane className="h-10 w-10 sm:h-12 sm:w-12 text-sky-500 mb-8 sm:mb-10" />
              <h3 className="text-3xl sm:text-4xl font-black mb-6 sm:mb-8">With Guardian</h3>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  "Set once, forget forever",
                  "Real-time global scanning",
                  "Email the second it drops",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 sm:gap-4 text-base sm:text-xl font-black"
                  >
                    <Check className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 shadow-lg shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-32 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2.5rem] sm:rounded-[4rem] bg-gradient-to-br from-sky-600 via-sky-500 to-indigo-700 p-8 sm:p-14 md:p-20 text-white shadow-2xl overflow-hidden text-center">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 sm:mb-8">
              READY FOR YOUR <br />
              NEXT ADVENTURE?
            </h2>
            <p className="text-base sm:text-xl md:text-2xl opacity-70 mb-10 sm:mb-16 max-w-2xl mx-auto font-bold">
              Join 12,843 travelers who never pay full price for flights. Free
              to start, cancel anytime.
            </p>
            <Link
              to="/search"
              className="glass-button glass-gloss rounded-full bg-white text-sky-700 px-8 py-5 sm:px-16 sm:py-8 text-lg sm:text-2xl font-black uppercase tracking-widest shadow-2xl"
            >
              Start Tracking Now
            </Link>
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 blur-[100px] rounded-full"
            />
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
