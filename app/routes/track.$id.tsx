import type { Route } from "./+types/track.$id";
import { PriceDisplay } from "~/components/PriceDisplay";
import { Plane, Bell } from "lucide-react";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Track flight ${params.id} | Flight Guardian` }];
}

export default function TrackFlight({ params }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl shadow-sky-100 border border-slate-100 overflow-hidden">
        {/* Route header */}
        <div className="bg-gradient-to-br from-sky-600 to-sky-500 text-white p-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 mb-3">
            <Plane className="h-6 w-6" />
          </div>
          <div className="flex items-center justify-center gap-3 text-xl font-semibold">
            <span>London</span>
            <span className="text-sky-200">→</span>
            <span>New York</span>
          </div>
          <p className="text-sky-100 text-sm mt-1">
            Current lowest price we've seen
          </p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 text-center">
          <PriceDisplay price={450} />

          <div className="mt-8 mb-8 text-left">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What price would make you happy?
            </label>
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent">
              <span className="text-xl text-slate-400">£</span>
              <input
                type="number"
                placeholder="300"
                className="w-full bg-transparent text-xl text-slate-900 font-semibold outline-none placeholder:text-slate-300"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              We'll email you the moment prices drop to this or below.
            </p>
          </div>

          <button className="w-full rounded-full bg-sky-600 text-white py-3.5 font-semibold shadow-sm hover:bg-sky-700 transition inline-flex items-center justify-center gap-2">
            <Bell className="h-4 w-4" />
            Start tracking
          </button>

          <p className="text-xs text-slate-500 mt-4">
            Free · Cancel anytime · No spam
          </p>
        </div>
      </div>
    </div>
  );
}
