import { useState } from "react";
import { Link } from "react-router";

export default function FlightSearch() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tighter uppercase">Guardian Radar</h1>
          <p className="text-slate-400 font-mono text-sm">SCANNING_LIVE_DATA_FEED...</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1A1A1A] p-6 border border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-blue-500 mb-1">Origin</span>
            <input className="bg-transparent border-b border-white/20 py-2 font-mono focus:outline-none" defaultValue="LHR" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-blue-500 mb-1">Destination</span>
            <input className="bg-transparent border-b border-white/20 py-2 font-mono focus:outline-none" defaultValue="JFK" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-blue-500 mb-1">Date</span>
            <input type="date" className="bg-transparent border-b border-white/20 py-2 font-mono focus:outline-none" />
          </div>
        </section>

        <div className="space-y-4">
          {[
            { id: "ba-101", price: "£420", drop: "-£80", route: "LHR ➔ JFK" },
            { id: "va-202", price: "£380", drop: "-£110", route: "LHR ➔ JFK" },
          ].map((flight) => (
            <div key={flight.id} className="flex justify-between items-center bg-[#1A1A1A] p-4 border border-white/5 hover:border-blue-500/50 transition-all">
              <div className="font-mono">
                <p className="text-sm text-slate-500">{flight.id}</p>
                <p className="text-lg font-bold">{flight.route}</p>
              </div>
              <div className="text-right flex items-center gap-6">
                <div>
                  <p className="text-emerald-400 text-xs font-bold">{flight.drop}</p>
                  <p className="text-xl font-bold">{flight.price}</p>
                </div>
                <Link
                  to={`/track/confirm?id=${flight.id}`}
                  className="bg-blue-600 px-6 py-2 text-xs font-bold uppercase tracking-tighter hover:bg-blue-500"
                >
                  Intercept
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
