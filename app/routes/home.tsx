// app/routes/home.tsx
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        <section className="text-center space-y-8">
          <div className="inline-block border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
            System Online: Guardian Radar Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Never miss a <span className="text-blue-500">price drop.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-mono">
            Flight Guardian monitors airline pricing databases 24/7. Set your
            route, define your target price, and let the system intercept the
            best deals automatically.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/search"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 font-bold tracking-widest uppercase transition-colors text-sm"
            >
              Initialize Radar
            </Link>
            <Link
              to="/dashboard"
              className="border border-white/20 hover:border-white/40 bg-transparent px-8 py-3 font-bold tracking-widest uppercase transition-colors text-sm"
            >
              View Intercepts
            </Link>
          </div>
        </section>

        <section className="space-y-12 border-t border-white/10 pt-24">
          <h2 className="text-3xl font-bold tracking-tighter text-center uppercase">
            Flight Guardian Protocols
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "1. Scan Routes",
                desc: "Search global airline databases for your exact origin, destination, and dates.",
              },
              {
                title: "2. Lock Target",
                desc: "Set the maximum price you are willing to pay. The Guardian takes over from here.",
              },
              {
                title: "3. Intercept Email",
                desc: "Receive an instant secure alert the millisecond the price drops below your threshold.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] border border-white/5 p-8 hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center text-blue-500 font-mono text-xl mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-tighter">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-mono">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
