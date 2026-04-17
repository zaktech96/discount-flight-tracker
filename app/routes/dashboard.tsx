import { Link } from "react-router";
import { Plane, Plus, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Your tracked flights
            </h1>
            <p className="text-slate-600 mt-2 text-lg">
              Here's what we're watching for you. We'll email you the moment a
              price drops.
            </p>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-5 py-2.5 font-semibold shadow-sm hover:bg-sky-700 transition whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            Track a new flight
          </Link>
        </header>

        {/* Empty state */}
        <div className="rounded-2xl bg-white border border-slate-100 p-10 md:p-14 text-center shadow-sm">
          <div className="mx-auto h-16 w-16 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-5">
            <Plane className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            No flights tracked yet
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6">
            Start by searching for a route you'd like to fly. We'll keep an eye
            on the price so you don't have to.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-sm hover:bg-sky-700 transition"
          >
            <Search className="h-4 w-4" />
            Search flights
          </Link>
        </div>
      </div>
    </div>
  );
}
