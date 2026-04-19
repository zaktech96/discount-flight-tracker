import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Check, Mail, ArrowRight, Plane, Bell } from "lucide-react";
import { getTrackedFlight, type TrackedFlight } from "~/lib/tracked-flights";

export default function TrackConfirm() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [flight, setFlight] = useState<TrackedFlight | null>(null);

  useEffect(() => {
    if (!id) return;
    setFlight(getTrackedFlight(id) ?? null);
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 flex items-center justify-center text-slate-900 dark:text-white px-6 py-20 transition-colors duration-300">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          You're all set!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
          We're now watching this flight for you. The moment the price drops to
          your target, we'll send you an email so you can book.
        </p>

        {flight ? (
          <div className="glass-card dark:bg-slate-900/40 dark:border-white/10 rounded-2xl p-6 text-left mb-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="h-10 w-10 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {flight.origin} → {flight.destination}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {flight.airline} · {flight.duration}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Current price
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  £{flight.currentPrice}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  Your target
                </p>
                <p className="text-lg font-semibold text-sky-600 dark:text-sky-400">
                  £{flight.targetPrice}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="glass-card dark:bg-slate-900/40 dark:border-white/10 rounded-2xl p-5 flex items-center gap-3 text-left mb-8">
          <div className="h-10 w-10 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Confirmation sent to your inbox. Check your spam folder if you don't
            see it in a few minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="glass-button inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-200 dark:shadow-sky-900/20 hover:bg-sky-700 transition"
          >
            See my tracked flights
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/search"
            className="glass-button-light dark:bg-white/5 dark:text-white dark:border-white/10 inline-flex items-center justify-center gap-2 rounded-full bg-white/80 text-slate-900 border border-white/70 px-6 py-3 font-semibold hover:bg-white dark:hover:bg-white/10 transition"
          >
            Track another flight
          </Link>
        </div>
      </div>
    </div>
  );
}
