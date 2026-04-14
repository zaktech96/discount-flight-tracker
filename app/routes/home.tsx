import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        {/* HERO SECTION */}
        <section className="text-center space-y-8 relative z-10 pt-10">
          <div className="inline-block border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-400 text-xs font-mono uppercase mb-4 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            System Online: Guardian Radar Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Never miss a{" "}
            <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              price drop.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-mono">
            Flight Guardian monitors airline pricing databases 24/7. Set your
            route, define your target price, and let the system intercept the
            best deals automatically.
          </p>

          <div className="flex justify-center gap-6 pt-8">
            <Link
              to="/search"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 font-bold uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] border border-transparent hover:border-blue-400"
            >
              Initialize Radar
            </Link>
            <Link
              to="/dashboard"
              className="bg-transparent border border-white/20 hover:border-white/60 text-white px-8 py-4 font-bold uppercase text-sm tracking-widest transition-all duration-300 hover:bg-white/5"
            >
              View Intercepts
            </Link>
          </div>

          {/* ANIMATED HERO MOCKUP */}
          <div className="relative mt-24 max-w-lg mx-auto pt-12 group cursor-default">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse mt-12"></div>
            <div className="relative bg-[#1A1A1A] border border-white/10 p-6 rounded-lg flex items-center gap-6 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <div className="h-14 w-14 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/30">
                <svg
                  className="w-7 h-7 animate-ping absolute opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                </svg>
                <svg
                  className="w-7 h-7 relative"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </div>
              <div className="text-left w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="text-emerald-400 font-bold text-xs tracking-widest uppercase">
                    Target Intercepted
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    Just now
                  </span>
                </div>
                <p className="text-white font-mono mt-2 text-base">
                  LHR ➔ JFK <span className="text-emerald-400 ml-2">£340</span>
                </p>
                <div className="w-full bg-white/5 h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERCEPT FLOW ANIMATION SECTION */}
        <section className="py-12 border-t border-white/5">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tighter drop-shadow-md">
              The Intercept Flow
            </h2>
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
              Automated end-to-end price tracking
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8 px-2">
            {/* Step 1: Search */}
            <div className="w-full md:w-1/3 bg-[#131B2C] border border-white/5 p-6 rounded relative group hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] hover:bg-[#162032]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#0F172A] border border-white/10 rounded-full flex items-center justify-center font-mono text-blue-500 text-xs transition-colors group-hover:border-blue-500/50 group-hover:bg-blue-500/10">
                1
              </div>
              <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-6">
                Set Parameters
              </h3>
              <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-10 bg-black/40 border border-white/5 rounded px-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Origin
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    LHR
                  </span>
                </div>
                <div className="h-10 bg-black/40 border border-white/5 rounded px-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Dest
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    DXB
                  </span>
                </div>
                <div className="h-10 bg-black/40 border border-white/5 rounded px-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    Target
                  </span>
                  <span className="text-sm font-bold text-blue-400 font-mono">
                    &lt; £400
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Connector 1 */}
            <div className="hidden md:flex flex-col items-center justify-center text-blue-500/30">
              <svg
                className="w-6 h-6 animate-[pulse_1.5s_ease-in-out_infinite]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>

            {/* Step 2: Engine */}
            <div className="w-full md:w-1/3 bg-[#131B2C] border border-white/5 p-6 rounded relative group hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] overflow-hidden hover:bg-[#162032]">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#0F172A] border border-white/10 rounded-full flex items-center justify-center font-mono text-blue-500 text-xs transition-colors group-hover:border-blue-500/50 group-hover:bg-blue-500/10">
                2
              </div>
              <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-6">
                Convex Engine
              </h3>
              <div className="h-[144px] flex items-center justify-center relative bg-black/20 rounded border border-white/5 group-hover:border-blue-500/20 transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border border-blue-500/10 rounded-full animate-ping [animation-duration:3s]"></div>
                  <div className="w-16 h-16 border border-blue-500/20 rounded-full absolute"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full absolute shadow-[0_0_10px_#3B82F6]"></div>
                </div>
                <span className="relative z-10 text-[10px] uppercase tracking-widest font-mono text-blue-300/70 bg-[#131B2C] px-3 py-1 border border-white/5 rounded">
                  Polling API...
                </span>
              </div>
            </div>

            {/* Animated Connector 2 */}
            <div className="hidden md:flex flex-col items-center justify-center text-emerald-500/30">
              <svg
                className="w-6 h-6 animate-[pulse_1.5s_ease-in-out_infinite_0.5s]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </div>

            {/* Step 3: Notification */}
            <div className="w-full md:w-1/3 bg-emerald-950/10 border border-emerald-500/20 p-6 rounded relative group hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)] hover:bg-emerald-950/20">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#0F172A] border border-emerald-500/40 rounded-full flex items-center justify-center font-mono text-emerald-500 text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-shadow group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                3
              </div>
              <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10B981]"></span>
                Drop Detected
              </h3>
              <div className="bg-black/40 border border-emerald-500/10 rounded p-5 h-[144px] flex flex-col justify-between group-hover:border-emerald-500/30 transition-colors">
                <p className="text-white font-mono text-sm tracking-widest">
                  LHR ➔ DXB
                </p>
                <div>
                  <div className="flex items-end gap-3 mt-1">
                    <p className="text-4xl font-black text-emerald-400">£315</p>
                    <p className="text-sm font-mono text-slate-500 line-through mb-1">
                      £450
                    </p>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-emerald-500/60 mt-4 pt-3 border-t border-emerald-500/10 flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Resend Email Dispatched
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM CAPABILITIES SECTION */}
        <section className="space-y-12 border-t border-white/5 pt-24">
          <h2 className="text-3xl font-bold text-center uppercase tracking-tighter drop-shadow-md">
            System Architecture
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#131B2C] to-[#0F172A] border border-white/5 p-10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg rounded-sm">
              <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-white tracking-tight">
                Live Data Synchronization
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                Powered by Convex, our backend doesn't rely on slow, legacy API
                polling. Flight prices are synchronized natively in real-time,
                meaning you see drops the second they are published by the
                airlines.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#131B2C] to-[#0F172A] border border-white/5 p-10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg rounded-sm">
              <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-white tracking-tight">
                Sub-Second Notifications
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                Integrated directly with Resend infrastructure. When your target
                price is breached, an intercept email is compiled and dispatched
                to your inbox in under 400 milliseconds, giving you the edge.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#131B2C] to-[#0F172A] border border-white/5 p-10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg rounded-sm">
              <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.735 11.735 0 00-1.29 11.88c.175.47.408.915.69 1.32a11.952 11.952 0 0011.08 6.458 11.952 11.952 0 0011.08-6.458c.282-.405.515-.85.69-1.32a11.735 11.735 0 00-1.29-11.88z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-white tracking-tight">
                End-to-End Type Safety
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                Built on a rigid TypeScript foundation. From the frontend radar
                interface to the database schema, data is validated strictly,
                ensuring zero missed intercepts due to malformed requests.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#131B2C] to-[#0F172A] border border-white/5 p-10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg rounded-sm">
              <div className="w-10 h-10 bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase text-white tracking-tight">
                Aero-Minimalist Design
              </h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed group-hover:text-slate-300 transition-colors">
                Information density without the clutter. Flight Guardian's
                interface strips away travel agency bloat, focusing entirely on
                raw data, fast filtering, and immediate confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* PROTOCOLS SECTION */}
        <section className="space-y-12 border-t border-white/5 pt-24 pb-12">
          <h2 className="text-3xl font-bold text-center uppercase tracking-tighter drop-shadow-md">
            Guardian Protocols
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#131B2C] border border-white/5 p-8 group hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 uppercase text-blue-500 flex items-center gap-3">
                <span className="font-mono text-sm opacity-50">01</span> Scan
                Routes
              </h3>
              <p className="text-slate-400 text-sm font-mono group-hover:text-slate-300 transition-colors">
                Search global airline databases for your exact origin,
                destination, and dates.
              </p>
            </div>
            <div className="bg-[#131B2C] border border-white/5 p-8 group hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 uppercase text-blue-500 flex items-center gap-3">
                <span className="font-mono text-sm opacity-50">02</span> Lock
                Target
              </h3>
              <p className="text-slate-400 text-sm font-mono group-hover:text-slate-300 transition-colors">
                Set the maximum price you are willing to pay. The Guardian takes
                over from here.
              </p>
            </div>
            <div className="bg-[#131B2C] border border-white/5 p-8 group hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 uppercase text-blue-500 flex items-center gap-3">
                <span className="font-mono text-sm opacity-50">03</span>{" "}
                Intercept Alert
              </h3>
              <p className="text-slate-400 text-sm font-mono group-hover:text-slate-300 transition-colors">
                Receive an instant secure alert the millisecond the price drops
                below your threshold.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="border-t border-white/5 pt-24 pb-24 text-center">
          <h2 className="text-4xl font-black italic tracking-tighter mb-8 uppercase">
            Ready to secure your flight?
          </h2>
          <Link
            to="/search"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 font-bold uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          >
            Activate Guardian Radar
          </Link>
        </section>
      </main>
    </div>
  );
}
