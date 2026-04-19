import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { Plane, Plus, Search, Bell, Trash2, TrendingDown } from "lucide-react";
import {
  getTrackedFlights,
  removeTrackedFlight,
  type TrackedFlight,
} from "~/lib/tracked-flights";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/react-router";

export default function Dashboard() {
  const { userId, isSignedIn } = useAuth();
  const backendAlerts = useQuery(
    api.flights.getUserAlerts,
    isSignedIn && userId ? { userId } : "skip",
  );
  const deactivateAlert = useMutation(api.flights.deactivateAlert);

  const [localFlights, setLocalFlights] = useState<TrackedFlight[]>([]);

  useEffect(() => {
    setLocalFlights(getTrackedFlights());
  }, []);

  const handleRemove = async (id: string, isBackend: boolean) => {
    if (isBackend) {
      await deactivateAlert({ alertId: id as any });
    } else {
      removeTrackedFlight(id);
      setLocalFlights(getTrackedFlights());
    }
  };

  const allFlights = useMemo(() => {
    const combined: (TrackedFlight & { isBackend?: boolean; _id?: string })[] =
      [];

    // Add local flights
    localFlights.forEach((f) => combined.push({ ...f, isBackend: false }));

    // Add backend flights
    if (backendAlerts) {
      backendAlerts.forEach((a) => {
        combined.push({
          id: a._id,
          _id: a._id,
          origin: a.origin,
          destination: a.dest,
          originCode: a.originCode,
          destinationCode: a.destCode,
          airline: "Live Tracking",
          departureDate: a.departureDate || "Multiple Dates",
          currentPrice: a.targetPrice + 10, // Mock current price for now
          originalPrice: a.targetPrice + 50, // Mock original price
          targetPrice: a.targetPrice,
          stops: "Direct/1 Stop",
          duration: "Varies",
          trackedAt: new Date(a.createdAt).toISOString(),
          isBackend: true,
        });
      });
    }

    return combined;
  }, [localFlights, backendAlerts]);

  const hasFlights = allFlights.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-white pt-24 pb-16 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Your tracked flights
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              {hasFlights
                ? "We'll email you the moment any of these drops to your target price."
                : "Here's what we're watching for you. Add a flight to get started."}
            </p>
          </div>
          <Link
            to="/search"
            className="glass-button inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-5 py-2.5 font-semibold shadow-md shadow-sky-200 dark:shadow-sky-900/20 hover:bg-sky-700 transition whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Track a new flight
          </Link>
        </header>

        {backendAlerts === undefined && isSignedIn ? (
          <div className="glass-card dark:bg-slate-950/40 dark:border-white/10 rounded-2xl p-10 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Loading your flights…
            </p>
          </div>
        ) : hasFlights ? (
          <div className="space-y-3">
            {allFlights.map((flight) => {
              const diff = flight.currentPrice - flight.targetPrice;
              const hitTarget = diff <= 0;
              return (
                <div
                  key={flight.id}
                  className="glass-card dark:bg-slate-950/40 dark:border-white/10 rounded-2xl p-5 md:p-6 hover:shadow-xl hover:shadow-sky-100 dark:hover:shadow-sky-900/10 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="h-12 w-12 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                        <Plane className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {flight.origin} → {flight.destination}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {flight.airline} · Departs {flight.departureDate}
                          {flight.isBackend && (
                            <span className="ml-2 text-[10px] bg-sky-500/10 text-sky-500 px-1.5 py-0.5 rounded uppercase font-black tracking-tighter">
                              Backend
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Current
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          £{flight.currentPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end">
                          <Bell className="h-3 w-3" />
                          Target
                        </p>
                        <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
                          £{flight.targetPrice}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(flight.id, flight.isBackend || false)
                        }
                        aria-label="Stop tracking"
                        className="h-10 w-10 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-sm">
                    {hitTarget ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full font-medium">
                        <TrendingDown className="h-3.5 w-3.5" />
                        Price hit your target — book now!
                      </span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">
                        {flight.isBackend
                          ? "Watching 24/7 for price drops..."
                          : `£${diff} to go to hit your target price`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card dark:bg-slate-950/40 dark:border-white/10 rounded-2xl p-10 md:p-14 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-5">
              <Plane className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">
              No flights tracked yet
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
              Start by searching for a route you'd like to fly. We'll keep an
              eye on the price so you don't have to.
            </p>
            <Link
              to="/search"
              className="glass-button inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 dark:shadow-sky-900/20 hover:bg-sky-700 transition"
            >
              <Search className="h-4 w-4" />
              Search flights
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
