"use client";
import { memo, useState } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

type DemoRoute = {
  origin: string;
  dest: string;
  price: number;
  prev: number;
};

const DEMO_ROUTES: DemoRoute[] = [
  { origin: "LHR", dest: "JFK", price: 287, prev: 450 },
  { origin: "LAX", dest: "CDG", price: 412, prev: 380 },
  { origin: "ORD", dest: "DXB", price: 619, prev: 720 },
  { origin: "SFO", dest: "NRT", price: 538, prev: 612 },
  { origin: "BOS", dest: "LIS", price: 198, prev: 350 },
];

const FlightRow = memo(function FlightRow({ route }: { route: DemoRoute }) {
  const pct = Math.round(((route.prev - route.price) / route.prev) * 100);
  const isDrop = route.price < route.prev;

  return (
    <div className="flex items-center justify-between py-2.5 px-4 border-b border-white/5 hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-white/90 tracking-widest">
          {route.origin}
        </span>
        <span className="text-white/30 text-xs">&#8594;</span>
        <span className="font-mono text-sm text-white/90 tracking-widest">
          {route.dest}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-white/40 line-through">
          ${route.prev}
        </span>
        <span
          className={cn(
            "font-mono text-sm font-semibold",
            isDrop ? "text-[#00FF41]" : "text-orange-400"
          )}
        >
          ${route.price}
        </span>
        {isDrop && (
          <span className="hidden sm:inline font-mono text-xs bg-[#00FF41]/10 text-[#00FF41] px-2 py-0.5 rounded border border-[#00FF41]/20">
            -{pct}%
          </span>
        )}
        {!isDrop && (
          <span className="hidden sm:inline font-mono text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
            +{Math.abs(pct)}%
          </span>
        )}
      </div>
    </div>
  );
});

export function FlightHero({ isSignedIn }: { isSignedIn?: boolean }) {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [price, setPrice] = useState("");

  const routeLabel =
    origin.length === 3 && dest.length === 3
      ? `ROUTE: ${origin} \u2192 ${dest}`
      : "AWAITING COORDINATES_";

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] flex flex-col overflow-hidden">
      {/* Radar grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(15,122,115,0.8) 40px)",
            "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(15,122,115,0.8) 40px)",
          ].join(", "),
          backgroundSize: "40px 40px",
        }}
      />

      {/* Teal radial glow at top */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(15,122,115,0.25) 0%, transparent 70%)",
        }}
      />

      {/* ── Hero copy ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-32 pb-12 text-center">
        {/* Live-scan badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#0F7A73]/40 bg-[#0F7A73]/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]" />
          </span>
          <span className="font-mono text-xs text-[#00FF41] tracking-widest uppercase">
            Live Scan Active
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none mb-4">
          Flight{" "}
          <span className="text-[#0F7A73]">Guardian</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
          Autonomous price surveillance. Set a target&nbsp;&mdash; we alert you
          when fares drop below radar.
        </p>

        {/* ── Docked Terminal Search ── */}
        <div className="w-full max-w-2xl">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            {/* Pseudo-terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF41]/70" />
              <span className="ml-3 font-mono text-xs text-white/30 tracking-widest uppercase">
                guardian://new-alert
              </span>
            </div>

            {/* Input row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="px-4 py-3">
                <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-1">
                  Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) =>
                    setOrigin(e.target.value.toUpperCase().slice(0, 3))
                  }
                  placeholder="LHR"
                  maxLength={3}
                  className="w-full bg-transparent font-mono text-xl text-white placeholder-white/20 outline-none focus:text-[#00FF41] transition-colors tracking-widest uppercase"
                />
              </div>
              <div className="px-4 py-3">
                <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={dest}
                  onChange={(e) =>
                    setDest(e.target.value.toUpperCase().slice(0, 3))
                  }
                  placeholder="JFK"
                  maxLength={3}
                  className="w-full bg-transparent font-mono text-xl text-white placeholder-white/20 outline-none focus:text-[#00FF41] transition-colors tracking-widest uppercase"
                />
              </div>
              <div className="px-4 py-3">
                <label className="block font-mono text-[10px] text-white/30 tracking-widest uppercase mb-1">
                  Target Price (USD)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="299"
                  min={0}
                  className="w-full bg-transparent font-mono text-xl text-white placeholder-white/20 outline-none focus:text-[#00FF41] transition-colors"
                />
              </div>
            </div>

            {/* CTA bar */}
            <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
              <span className="font-mono text-xs text-white/30 hidden sm:block">
                {routeLabel}
              </span>
              <Link
                to={isSignedIn ? "/dashboard" : "/sign-up"}
                prefetch="viewport"
                className="ml-auto"
              >
                <button
                  type="button"
                  className="font-mono text-sm font-bold px-6 py-2 rounded-lg bg-[#0F7A73] text-black hover:bg-white hover:text-black transition-all duration-200 tracking-wider uppercase"
                >
                  Activate Alert
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Live price-anomaly feed ── */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-20">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
              Live Feed&nbsp;&mdash;&nbsp;Price Anomalies
            </span>
            <span className="font-mono text-xs text-[#00FF41] flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF41]" />
              </span>
              SCANNING
            </span>
          </div>

          {DEMO_ROUTES.length > 0 ? (
            DEMO_ROUTES.map((route) => (
              <FlightRow
                key={`${route.origin}-${route.dest}`}
                route={route}
              />
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="font-mono text-sm text-white/40 tracking-widest">
                <span className="text-[#00FF41]">&#9632;</span>&nbsp;SCAN
                COMPLETE: NO RESULTS
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
