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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center text-slate-900 px-6 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          You're all set!
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          We're now watching this flight for you. The moment the price drops to
          your target, we'll send you an email so you can book.
        </p>

        {flight ? (
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 text-left mb-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {flight.origin} → {flight.destination}
                </p>
                <p className="text-sm text-slate-500">
                  {flight.airline} · {flight.duration}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Current price</p>
                <p className="text-lg font-semibold text-slate-900">
                  £{flight.currentPrice}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <Bell className="h-3 w-3" />
                  Your target
                </p>
                <p className="text-lg font-semibold text-sky-600">
                  £{flight.targetPrice}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex items-center gap-3 text-left mb-8">
          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">
            Confirmation sent to your inbox. Check your spam folder if you
            don't see it in a few minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-sm hover:bg-sky-700 transition"
          >
            See my tracked flights
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50 transition"
          >
            Track another flight
          </Link>
        </div>
      </div>
    </div>
  );
}
