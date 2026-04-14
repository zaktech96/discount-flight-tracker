"use client";
import { memo } from "react";
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
    <div className="flex items-center justify-between py-3 px-5 border-b border-white/5 hover:bg-white/[0.04] transition-colors duration-200">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-white/90 tracking-[0.2em]">
          [{route.origin}]
        </span>
        <span className="text-[#0F7A73]/60 text-xs font-mono">-</span>
        <span className="font-mono text-sm text-white/90 tracking-[0.2em]">
          [{route.dest}]
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-white/30 line-through">
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
        {isDrop ? (
          <span className="hidden sm:inline font-mono text-xs bg-[#00FF41]/10 text-[#00FF41] px-2 py-0.5 rounded border border-[#00FF41]/20">
            -{pct}%
          </span>
        ) : (
          <span className="hidden sm:inline font-mono text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">
            +{Math.abs(pct)}%
          </span>
        )}
      </div>
    </div>
  );
});

export function FlightHero({ isSignedIn }: { isSignedIn?: boolean }) {
  return (
    <div className="relative min-h-screen bg-[#1A1A1A] flex flex-col overflow-hidden">
      {/* 20px square grid at white/5 opacity */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px)",
            "repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.05) 20px)",
          ].join(", "),
          backgroundSize: "20px 20px",
        }}
      />

      {/* Teal radial glow at top */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(15,122,115,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-32 pb-12 text-center">
        {/* Live-scan badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#0F7A73]/40 bg-[#0F7A73]/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF41]" />
          </span>
          <span className="font-mono text-xs text-[#00FF41] tracking-[0.2em] uppercase">
            Live Scan Active
          </span>
        </div>

        {/* Headline - tight kerning sans-serif */}
        <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em] text-white uppercase leading-none mb-4">
          Flight{" "}
          <span className="text-[#0F7A73]">Guardian</span>
        </h1>

        <p className="text-white/45 text-lg md:text-xl max-w-lg mb-14 font-light leading-relaxed tracking-tight">
          Autonomous price surveillance - set a target and we alert you when
          fares drop below radar.
        </p>

        {/* CTA buttons - black bg, teal border, white hover with glow */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={isSignedIn ? "/dashboard" : "/sign-up"}
            prefetch="viewport"
            className="font-mono text-sm font-bold px-8 py-3 rounded-lg bg-black text-white border border-[#0F7A73]/60 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(15,122,115,0.3)] transition-all duration-300 tracking-wider uppercase text-center"
          >
            Activate Guardian
          </Link>
          <Link
            to="#search"
            className="font-mono text-sm font-bold px-8 py-3 rounded-lg bg-transparent text-white/60 border border-white/10 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_15px_rgba(15,122,115,0.3)] transition-all duration-300 tracking-wider uppercase text-center"
          >
            Search Routes
          </Link>
        </div>
      </div>

      {/* Live price-anomaly feed */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-20">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <span className="font-mono text-xs text-white/35 tracking-[0.15em] uppercase">
              Live Feed - Price Anomalies
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
            <div className="px-5 py-10 text-center animate-radar-sweep border border-transparent rounded-b-xl">
              <p className="font-mono text-sm text-white/35 tracking-[0.15em]">
                <span className="text-[#00FF41]">&#9632;</span>&nbsp;SCAN
                COMPLETE - NO RESULTS
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
