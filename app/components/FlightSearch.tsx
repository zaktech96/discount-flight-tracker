"use client";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";

type RecentRoute = {
  origin: string;
  dest: string;
  lowestSeen: number;
  lastChecked: string;
};

const RECENT_ROUTES: RecentRoute[] = [
  { origin: "LHR", dest: "JFK", lowestSeen: 287, lastChecked: "2 min ago" },
  { origin: "SFO", dest: "NRT", lowestSeen: 538, lastChecked: "8 min ago" },
  { origin: "BOS", dest: "LIS", lowestSeen: 198, lastChecked: "14 min ago" },
];

export function FlightSearch({ isSignedIn }: { isSignedIn?: boolean }) {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    if (origin.length === 3 && dest.length === 3) {
      navigate(`/track/${origin}-${dest}`);
    }
  }, [origin, dest, navigate]);

  const routeLabel =
    origin.length === 3 && dest.length === 3
      ? `ROUTE: ${origin} - ${dest}`
      : "AWAITING COORDINATES_";

  return (
    <section id="search" className="bg-[#0F172A] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="mb-10 text-center animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-white uppercase mb-3 font-mono">
            Route <span className="text-[#3B82F6]">Scanner</span>
          </h2>
          <p className="font-mono text-sm text-white/35 tracking-[0.1em]">
            ENTER COORDINATES TO INITIATE PRICE SURVEILLANCE
          </p>
        </div>

        {/* Terminal search panel */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden glass-card-dark animate-fade-up delay-75">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
            <span className="ml-3 font-mono text-xs text-white/25 tracking-[0.15em] uppercase">
              guardian://new-alert
            </span>
          </div>

          {/* Input row - transparent cells */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="px-5 py-4 backdrop-blur-md">
              <label className="block font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-1.5">
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
                className="w-full bg-transparent font-mono text-xl text-white placeholder-white/15 outline-none focus:text-[#10B981] transition-colors duration-200 tracking-[0.2em] uppercase"
              />
            </div>
            <div className="px-5 py-4 backdrop-blur-md">
              <label className="block font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-1.5">
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
                className="w-full bg-transparent font-mono text-xl text-white placeholder-white/15 outline-none focus:text-[#10B981] transition-colors duration-200 tracking-[0.2em] uppercase"
              />
            </div>
            <div className="px-5 py-4 backdrop-blur-md">
              <label className="block font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-1.5">
                Target Price (USD)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="299"
                min={0}
                className="w-full bg-transparent font-mono text-xl text-white placeholder-white/15 outline-none focus:text-[#10B981] transition-colors duration-200"
              />
            </div>
          </div>

          {/* CTA bar */}
          <div className="px-5 py-3.5 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
            <span className="font-mono text-xs text-white/25 hidden sm:block tracking-[0.1em]">
              {routeLabel}
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={handleSearch}
                className="font-mono text-sm font-bold px-6 py-2 rounded-lg bg-black text-white border border-[#3B82F6]/60 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(15,122,115,0.3)] transition-all duration-300 tracking-wider uppercase glass-button"
              >
                Scan
              </button>
              <Link
                to={isSignedIn ? "/dashboard" : "/sign-up"}
                prefetch="viewport"
                className="font-mono text-sm font-bold px-6 py-2 rounded-lg bg-[#3B82F6] text-black border border-[#3B82F6] hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(15,122,115,0.3)] transition-all duration-300 tracking-wider uppercase glass-button-light"
              >
                Set Alert
              </Link>
            </div>
          </div>
        </div>

        {/* Recent routes */}
        <div className="mt-10 animate-fade-up delay-150">
          <h3 className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase mb-4">
            Recently Tracked Routes
          </h3>
          <div className="space-y-2">
            {RECENT_ROUTES.map((route) => (
              <div
                key={`${route.origin}-${route.dest}`}
                className="flex items-center justify-between py-3 px-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 glass-card-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-white/80 tracking-[0.2em]">
                    [{route.origin}]
                  </span>
                  <span className="text-[#3B82F6]/50 text-xs font-mono">-</span>
                  <span className="font-mono text-sm text-white/80 tracking-[0.2em]">
                    [{route.dest}]
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-[#10B981] font-semibold">
                    ${route.lowestSeen}
                  </span>
                  <span className="font-mono text-xs text-white/20 hidden sm:block">
                    {route.lastChecked}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
