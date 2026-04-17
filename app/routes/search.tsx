import { Link } from "react-router";
import { Plane, ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { FLIGHTS, formatRoute } from "~/lib/flights";

export default function FlightSearch() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Find your flight
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Pick a flight below to start tracking — we'll watch the price and
            email you the moment it drops.
          </p>
        </header>

        {/* Search form */}
        <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 md:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-600" /> Flying from
              </span>
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder:text-slate-400"
                placeholder="e.g. London (LHR)"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Plane className="h-4 w-4 text-sky-600" /> Flying to
              </span>
              <input
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder:text-slate-400"
                placeholder="e.g. New York (JFK)"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sky-600" /> When
              </span>
              <input
                type="date"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-700"
              />
            </label>
          </div>
          <button className="mt-6 w-full md:w-auto rounded-full bg-sky-600 text-white px-8 py-3 font-semibold shadow-sm hover:bg-sky-700 transition inline-flex items-center justify-center gap-2">
            Search flights
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        {/* Results */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Today's best deals</h2>
        </div>

        <div className="space-y-3">
          {FLIGHTS.map((flight) => {
            const saved = flight.originalPrice - flight.currentPrice;
            const pct = Math.round((saved / flight.originalPrice) * 100);
            return (
              <Link
                key={flight.id}
                to={`/track/${flight.id}`}
                className="block rounded-2xl bg-white border border-slate-100 p-5 md:p-6 hover:shadow-md hover:border-sky-200 transition"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                      <Plane className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {formatRoute(flight)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {flight.airline} · {flight.duration} · {flight.stops}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Departs {flight.departureDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-right">
                      <div className="flex items-baseline gap-2 justify-end">
                        <span className="text-2xl font-bold text-slate-900">
                          £{flight.currentPrice}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          £{flight.originalPrice}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                        Save £{saved} ({pct}% off)
                      </p>
                    </div>
                    <span className="rounded-full bg-sky-600 text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-sky-700 transition whitespace-nowrap">
                      Track this flight
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          Tracking a flight is free. You can stop watching any time from your
          dashboard.
        </p>
      </div>
    </div>
  );
}
