import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Plane, Bell, ArrowLeft, Clock, Calendar } from "lucide-react";
import type { Route } from "./+types/track.$id";
import { getFlight, formatRoute } from "~/lib/flights";
import { addTrackedFlight } from "~/lib/tracked-flights";

export function meta({ params }: Route.MetaArgs) {
  const flight = getFlight(params.id);
  const title = flight
    ? `Track ${formatRoute(flight)} | Flight Guardian`
    : "Flight not found | Flight Guardian";
  return [{ title }];
}

export default function TrackFlight({ params }: Route.ComponentProps) {
  const flight = getFlight(params.id);
  const navigate = useNavigate();
  const [targetPrice, setTargetPrice] = useState<string>(
    flight ? String(Math.max(50, flight.currentPrice - 50)) : "",
  );
  const [saving, setSaving] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center rounded-2xl bg-white border border-slate-100 shadow-sm p-10">
          <h1 className="text-2xl font-bold mb-2">We can't find that flight</h1>
          <p className="text-slate-600 mb-6">
            The link might be out of date. Try picking another deal from the
            search page.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-sm hover:bg-sky-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const saved = flight.originalPrice - flight.currentPrice;
  const pct = Math.round((saved / flight.originalPrice) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(targetPrice);
    if (!price || price <= 0) return;
    setSaving(true);
    addTrackedFlight(flight, price);
    navigate(`/track/confirm?id=${flight.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-16 px-6 pt-24">
      <div className="max-w-lg mx-auto">
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to results
        </Link>

        <div className="rounded-3xl bg-white shadow-xl shadow-sky-100 border border-slate-100 overflow-hidden">
          {/* Route header */}
          <div className="bg-gradient-to-br from-sky-600 to-sky-500 text-white p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-3">
              <Plane className="h-6 w-6" />
            </div>
            <div className="flex items-center justify-center gap-3 text-xl md:text-2xl font-semibold">
              <span>{flight.origin}</span>
              <span className="text-sky-200">→</span>
              <span>{flight.destination}</span>
            </div>
            <p className="text-sky-100 text-sm mt-1">
              {flight.airline} · {flight.originCode} to {flight.destinationCode}
            </p>
          </div>

          {/* Flight details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Departure
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {flight.departureDate}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  Duration
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {flight.duration} · {flight.stops}
                </p>
              </div>
            </div>

            {/* Current price */}
            <div className="text-center border-t border-slate-100 pt-6 mb-6">
              <p className="text-sm text-slate-500 mb-1">Current price</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-slate-900">
                  £{flight.currentPrice}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  £{flight.originalPrice}
                </span>
              </div>
              <span className="inline-block mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Already {pct}% off — we'll watch for it to go even lower
              </span>
            </div>

            {/* Target price form */}
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What price would make you book?
              </label>
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent mb-2">
                <span className="text-xl text-slate-400">£</span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  placeholder="300"
                  min={1}
                  required
                  className="w-full bg-transparent text-xl text-slate-900 font-semibold outline-none placeholder:text-slate-300"
                />
              </div>
              <p className="text-xs text-slate-500 mb-6">
                We'll email you the moment the price drops to this or below.
              </p>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-sky-600 text-white py-3.5 font-semibold shadow-sm hover:bg-sky-700 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Bell className="h-4 w-4" />
                {saving ? "Setting up alert…" : "Start tracking"}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-4">
              Free · Cancel anytime · No spam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
